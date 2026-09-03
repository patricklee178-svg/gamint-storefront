import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260903150303 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "capacity_account" ("id" text not null, "product_id" text not null, "product_title" text not null, "label" text not null, "status" text check ("status" in ('active', 'pending', 'expired', 'suspended')) not null default 'pending', "customer_id" text null, "order_id" text null, "notes" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "capacity_account_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_capacity_account_deleted_at" ON "capacity_account" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "capacity_account" cascade;`);
  }

}
