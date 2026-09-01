#!/usr/bin/env bash
set -Eeuo pipefail

APP="/opt/gamint/app"
DEPLOY_SCRIPT="/usr/local/sbin/gamint-auto-deploy"
SERVICE_FILE="/etc/systemd/system/gamint-auto-deploy.service"
TIMER_FILE="/etc/systemd/system/gamint-auto-deploy.timer"
NGINX_ENABLED="/etc/nginx/sites-enabled/gamint.ir"
NGINX_SNIPPET="/etc/nginx/snippets/gamint-storefront-active.conf"
STATE_DIR="/var/lib/gamint-deploy"
ACTIVE_FILE="$STATE_DIR/active-slot"
DEPLOYED_FILE="$STATE_DIR/deployed-sha"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="/opt/gamint/zero-downtime-backup-$STAMP"

if [ "${EUID:-$(id -u)}" -ne 0 ]; then
  echo "ERROR: این نصب باید با کاربر root اجرا شود."
  exit 1
fi

for command_name in docker git curl nginx systemctl flock; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    echo "ERROR: دستور $command_name نصب نیست."
    exit 1
  fi
done

if [ ! -d "$APP/.git" ] || [ ! -f "$APP/docker-compose.yml" ]; then
  echo "ERROR: پروژه GAMINT در $APP پیدا نشد."
  exit 1
fi

if [ ! -e "$NGINX_ENABLED" ]; then
  echo "ERROR: تنظیم Nginx در $NGINX_ENABLED پیدا نشد."
  exit 1
fi

NGINX_CONF="$(readlink -f "$NGINX_ENABLED")"
mkdir -p "$BACKUP" "$STATE_DIR" /etc/nginx/snippets
chmod 0755 "$STATE_DIR"

systemctl stop gamint-auto-deploy.timer >/dev/null 2>&1 || true

echo "WAITING_FOR_CURRENT_DEPLOY..."
for _ in $(seq 1 360); do
  if ! systemctl is-active --quiet gamint-auto-deploy.service; then
    break
  fi
  sleep 5
done

if systemctl is-active --quiet gamint-auto-deploy.service; then
  echo "ERROR: انتشار قبلی بعد از ۳۰ دقیقه هنوز تمام نشده است."
  systemctl start gamint-auto-deploy.timer >/dev/null 2>&1 || true
  exit 1
fi

cd "$APP"

CURRENT_PORT="8000"
if grep -Fq "include $NGINX_SNIPPET;" "$NGINX_CONF"; then
  if [ ! -s "$NGINX_SNIPPET" ]; then
    echo "ERROR: فایل سوییچ Nginx وجود ندارد یا خالی است: $NGINX_SNIPPET"
    systemctl start gamint-auto-deploy.timer >/dev/null 2>&1 || true
    exit 1
  fi
  CURRENT_PORT="$(sed -nE 's/.*127\.0\.0\.1:([0-9]+).*/\1/p' "$NGINX_SNIPPET" | head -n 1)"
fi

case "$CURRENT_PORT" in
  8000|8001|8002) ;;
  *)
    echo "ERROR: پورت فعال Nginx معتبر نیست: $CURRENT_PORT"
    systemctl start gamint-auto-deploy.timer >/dev/null 2>&1 || true
    exit 1
    ;;
esac

CURRENT_STATUS="$(curl -sS -o /dev/null --max-time 20 -w '%{http_code}' "http://127.0.0.1:$CURRENT_PORT/ir" 2>/dev/null || true)"
if [ "$CURRENT_STATUS" != "200" ] && [ "$CURRENT_PORT" = "8000" ]; then
  echo "STARTING_CURRENT_STOREFRONT..."
  docker compose up -d --no-deps storefront
  for _ in $(seq 1 120); do
    CURRENT_STATUS="$(curl -sS -o /dev/null --max-time 10 -w '%{http_code}' http://127.0.0.1:8000/ir 2>/dev/null || true)"
    [ "$CURRENT_STATUS" = "200" ] && break
    sleep 2
  done
fi

if [ "$CURRENT_STATUS" != "200" ]; then
  echo "ERROR: نسخه فعلی روی پورت $CURRENT_PORT سالم نیست؛ نصب برای جلوگیری از قطعی متوقف شد."
  if [ "$CURRENT_PORT" = "8000" ]; then
    docker compose logs --tail=100 storefront || true
  else
    docker logs --tail=100 "gamint-storefront-$( [ "$CURRENT_PORT" = "8001" ] && printf 'blue' || printf 'green' )" || true
  fi
  systemctl start gamint-auto-deploy.timer >/dev/null 2>&1 || true
  exit 1
fi

cp -a "$DEPLOY_SCRIPT" "$BACKUP/gamint-auto-deploy.old" 2>/dev/null || true
cp -a "$SERVICE_FILE" "$BACKUP/gamint-auto-deploy.service.old" 2>/dev/null || true
cp -a "$TIMER_FILE" "$BACKUP/gamint-auto-deploy.timer.old" 2>/dev/null || true
cp -aL "$NGINX_CONF" "$BACKUP/gamint.ir.nginx.old"

if ! grep -Fq "include $NGINX_SNIPPET;" "$NGINX_CONF"; then
  if ! grep -Eq 'proxy_pass[[:space:]]+http://127\.0\.0\.1:8000;' "$NGINX_CONF"; then
    echo "ERROR: proxy_pass فعلی GAMINT پیدا نشد؛ هیچ تغییری اعمال نشد."
    systemctl start gamint-auto-deploy.timer >/dev/null 2>&1 || true
    exit 1
  fi

  printf 'proxy_pass http://127.0.0.1:8000;\n' > "$NGINX_SNIPPET"
  chmod 0644 "$NGINX_SNIPPET"
  perl -0pi -e "s#proxy_pass[[:space:]]+http://127\\.0\\.0\\.1:8000;#include $NGINX_SNIPPET;#" "$NGINX_CONF"
fi

ACTIVE_PORT="$(sed -nE 's/.*127\.0\.0\.1:([0-9]+).*/\1/p' "$NGINX_SNIPPET" | head -n 1)"
case "$ACTIVE_PORT" in
  8001) printf 'blue\n' > "$ACTIVE_FILE" ;;
  8002) printf 'green\n' > "$ACTIVE_FILE" ;;
  *) printf 'legacy\n' > "$ACTIVE_FILE" ;;
esac

if [ ! -s "$DEPLOYED_FILE" ]; then
  git rev-parse HEAD > "$DEPLOYED_FILE"
fi

if ! nginx -t; then
  cp -a "$BACKUP/gamint.ir.nginx.old" "$NGINX_CONF"
  nginx -t && systemctl reload nginx
  systemctl start gamint-auto-deploy.timer >/dev/null 2>&1 || true
  echo "ERROR: تست Nginx ناموفق بود و تنظیم قبلی بازیابی شد."
  exit 1
fi
systemctl reload nginx

cat > "$DEPLOY_SCRIPT" <<'DEPLOY'
#!/usr/bin/env bash
set -Eeuo pipefail

APP="/opt/gamint/app"
REMOTE_NAME="gamint"
BRANCH="main"
LOCK_FILE="/run/lock/gamint-auto-deploy.lock"
STATE_DIR="/var/lib/gamint-deploy"
ACTIVE_FILE="$STATE_DIR/active-slot"
DEPLOYED_FILE="$STATE_DIR/deployed-sha"
BLOCKED_FILE="$STATE_DIR/blocked-sha"
NGINX_SNIPPET="/etc/nginx/snippets/gamint-storefront-active.conf"

mkdir -p "$STATE_DIR"
exec 9>"$LOCK_FILE"
flock -n 9 || exit 0

cd "$APP"
git fetch --quiet "$REMOTE_NAME" "$BRANCH"

SOURCE_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git rev-parse "$REMOTE_NAME/$BRANCH")"
DEPLOYED_SHA="$(cat "$DEPLOYED_FILE" 2>/dev/null || printf '%s' "$SOURCE_SHA")"

if ! git cat-file -e "$DEPLOYED_SHA^{commit}" 2>/dev/null; then
  DEPLOYED_SHA="$SOURCE_SHA"
fi

if [ "$DEPLOYED_SHA" = "$REMOTE_SHA" ]; then
  exit 0
fi

if [ -f "$BLOCKED_FILE" ] && [ "$(cat "$BLOCKED_FILE")" = "$REMOTE_SHA" ]; then
  echo "DEPLOY_SKIPPED_BLOCKED_SHA=$REMOTE_SHA"
  exit 0
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "DEPLOY_STOPPED: تغییر محلی ثبت‌نشده در سرور وجود دارد."
  git status --short
  exit 1
fi

CHANGED_FILES="$(git diff --name-only "$DEPLOYED_SHA" "$REMOTE_SHA")"
if printf '%s\n' "$CHANGED_FILES" | grep -Eq '^(apps/backend/|Dockerfile$|docker-compose\.yml$|start-backend\.sh$)'; then
  printf '%s\n' "$REMOTE_SHA" > "$BLOCKED_FILE"
  echo "BACKEND_DEPLOY_BLOCKED: تغییر backend باید جداگانه و برنامه‌ریزی‌شده منتشر شود."
  printf '%s\n' "$CHANGED_FILES"
  exit 1
fi

rm -f "$BLOCKED_FILE"

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$APP/.gamint-backups/blue-green-$STAMP"
mkdir -p "$BACKUP"
git archive "$DEPLOYED_SHA" | gzip -9 > "$BACKUP/source-$DEPLOYED_SHA.tar.gz"

echo "BLUE_GREEN_DEPLOYING_COMMIT=$REMOTE_SHA"
git merge --ff-only "$REMOTE_NAME/$BRANCH"

if ! printf '%s\n' "$CHANGED_FILES" | grep -Eq '^(apps/storefront/|package\.json$|pnpm-lock\.yaml$|pnpm-workspace\.yaml$|turbo\.json$|\.npmrc$)'; then
  printf '%s\n' "$REMOTE_SHA" > "$DEPLOYED_FILE.tmp"
  mv "$DEPLOYED_FILE.tmp" "$DEPLOYED_FILE"
  echo "SOURCE_SYNC_ONLY_OK commit=$REMOTE_SHA"
  exit 0
fi

if ! docker compose build storefront; then
  printf '%s\n' "$REMOTE_SHA" > "$BLOCKED_FILE"
  git reset --hard "$SOURCE_SHA"
  echo "BUILD_FAILED_OLD_STOREFRONT_STILL_ACTIVE backup=$BACKUP"
  exit 1
fi

ACTIVE_PORT="$(sed -nE 's/.*127\.0\.0\.1:([0-9]+).*/\1/p' "$NGINX_SNIPPET" | head -n 1)"
case "$ACTIVE_PORT" in
  8001) OLD_SLOT="blue" ;;
  8002) OLD_SLOT="green" ;;
  *) OLD_SLOT="legacy" ;;
esac
printf '%s\n' "$OLD_SLOT" > "$ACTIVE_FILE"

case "$OLD_SLOT" in
  blue)
    NEW_SLOT="green"
    NEW_PORT="8002"
    OLD_CONTAINER="gamint-storefront-blue"
    ;;
  green)
    NEW_SLOT="blue"
    NEW_PORT="8001"
    OLD_CONTAINER="gamint-storefront-green"
    ;;
  *)
    NEW_SLOT="blue"
    NEW_PORT="8001"
    OLD_CONTAINER="$(docker compose ps -q storefront | head -n 1)"
    ;;
esac

NEW_CONTAINER="gamint-storefront-$NEW_SLOT"
docker rm -f "$NEW_CONTAINER" >/dev/null 2>&1 || true

if ! docker compose run -d --no-deps --name "$NEW_CONTAINER" -p "127.0.0.1:$NEW_PORT:8000" storefront >/dev/null; then
  printf '%s\n' "$REMOTE_SHA" > "$BLOCKED_FILE"
  git reset --hard "$SOURCE_SHA"
  echo "CANDIDATE_START_FAILED_OLD_STOREFRONT_STILL_ACTIVE"
  exit 1
fi
docker update --restart unless-stopped "$NEW_CONTAINER" >/dev/null

NEW_STATUS="000"
for _ in $(seq 1 120); do
  NEW_STATUS="$(curl -sS -o /dev/null --max-time 10 -w '%{http_code}' "http://127.0.0.1:$NEW_PORT/ir" 2>/dev/null || true)"
  [ "$NEW_STATUS" = "200" ] && break
  sleep 2
done

if [ "$NEW_STATUS" != "200" ]; then
  docker logs --tail=120 "$NEW_CONTAINER" || true
  docker rm -f "$NEW_CONTAINER" >/dev/null 2>&1 || true
  printf '%s\n' "$REMOTE_SHA" > "$BLOCKED_FILE"
  git reset --hard "$SOURCE_SHA"
  echo "HEALTHCHECK_FAILED_OLD_STOREFRONT_STILL_ACTIVE status=$NEW_STATUS"
  exit 1
fi

SNIPPET_BACKUP="$(mktemp)"
cp -a "$NGINX_SNIPPET" "$SNIPPET_BACKUP"
printf 'proxy_pass http://127.0.0.1:%s;\n' "$NEW_PORT" > "$NGINX_SNIPPET"
chmod 0644 "$NGINX_SNIPPET"

if ! nginx -t; then
  cp -a "$SNIPPET_BACKUP" "$NGINX_SNIPPET"
  rm -f "$SNIPPET_BACKUP"
  docker rm -f "$NEW_CONTAINER" >/dev/null 2>&1 || true
  printf '%s\n' "$REMOTE_SHA" > "$BLOCKED_FILE"
  git reset --hard "$SOURCE_SHA"
  echo "NGINX_TEST_FAILED_OLD_STOREFRONT_STILL_ACTIVE"
  exit 1
fi

systemctl reload nginx

PUBLIC_STATUS="000"
for _ in $(seq 1 20); do
  PUBLIC_STATUS="$(curl -ksS --resolve gamint.ir:443:127.0.0.1 -o /dev/null --max-time 15 -w '%{http_code}' https://gamint.ir/ir 2>/dev/null || true)"
  [ "$PUBLIC_STATUS" = "200" ] && break
  sleep 1
done

if [ "$PUBLIC_STATUS" != "200" ]; then
  cp -a "$SNIPPET_BACKUP" "$NGINX_SNIPPET"
  nginx -t && systemctl reload nginx
  rm -f "$SNIPPET_BACKUP"
  docker rm -f "$NEW_CONTAINER" >/dev/null 2>&1 || true
  printf '%s\n' "$REMOTE_SHA" > "$BLOCKED_FILE"
  git reset --hard "$SOURCE_SHA"
  echo "PUBLIC_CHECK_FAILED_SWITCH_ROLLED_BACK status=$PUBLIC_STATUS"
  exit 1
fi

rm -f "$SNIPPET_BACKUP" "$BLOCKED_FILE"
printf '%s\n' "$NEW_SLOT" > "$ACTIVE_FILE.tmp"
mv "$ACTIVE_FILE.tmp" "$ACTIVE_FILE"
printf '%s\n' "$REMOTE_SHA" > "$DEPLOYED_FILE.tmp"
mv "$DEPLOYED_FILE.tmp" "$DEPLOYED_FILE"

sleep 60
if [ -n "$OLD_CONTAINER" ] && docker inspect "$OLD_CONTAINER" >/dev/null 2>&1; then
  docker rm -f "$OLD_CONTAINER" >/dev/null 2>&1 || true
fi

find "$APP/.gamint-backups" -type f -name 'source-*.tar.gz' -mtime +30 -delete 2>/dev/null || true
docker image prune -f --filter 'until=168h' >/dev/null 2>&1 || true

echo "ZERO_DOWNTIME_DEPLOY_OK commit=$REMOTE_SHA slot=$NEW_SLOT port=$NEW_PORT page=200 backup=$BACKUP"
DEPLOY

chmod 0755 "$DEPLOY_SCRIPT"

cat > "$SERVICE_FILE" <<EOF
[Unit]
Description=GAMINT zero-downtime automatic deployment
After=network-online.target docker.service nginx.service
Wants=network-online.target
Requires=docker.service nginx.service

[Service]
Type=oneshot
User=root
WorkingDirectory=$APP
ExecStart=$DEPLOY_SCRIPT
TimeoutStartSec=1800
Nice=5
EOF

cat > "$TIMER_FILE" <<'EOF'
[Unit]
Description=Check GitHub for GAMINT updates every minute

[Timer]
OnBootSec=30s
OnUnitActiveSec=60s
AccuracySec=5s
Persistent=true
Unit=gamint-auto-deploy.service

[Install]
WantedBy=timers.target
EOF

systemctl daemon-reload
systemctl enable --now gamint-auto-deploy.timer

PUBLIC_STATUS="$(curl -ksS --resolve gamint.ir:443:127.0.0.1 -o /dev/null --max-time 20 -w '%{http_code}' https://gamint.ir/ir 2>/dev/null || true)"
if [ "$PUBLIC_STATUS" != "200" ]; then
  echo "ERROR: تست نهایی Nginx موفق نبود؛ تنظیم قبلی را از $BACKUP بازیابی کنید."
  exit 1
fi

cat > /root/GAMINT-ZERO-DOWNTIME-INFO.txt <<EOF
Installed: $(date -Is)
Deploy script: $DEPLOY_SCRIPT
Active slot file: $ACTIVE_FILE
Deployed commit file: $DEPLOYED_FILE
Nginx switch file: $NGINX_SNIPPET
Backup: $BACKUP
Timer: gamint-auto-deploy.timer
Blue port: 8001
Green port: 8002
Legacy port during migration: 8000
EOF

echo "ZERO_DOWNTIME_INSTALL_OK"
echo "PUBLIC_STATUS=$PUBLIC_STATUS"
echo "ACTIVE_SLOT=$(cat "$ACTIVE_FILE")"
echo "BACKUP=$BACKUP"
echo "INFO=/root/GAMINT-ZERO-DOWNTIME-INFO.txt"
