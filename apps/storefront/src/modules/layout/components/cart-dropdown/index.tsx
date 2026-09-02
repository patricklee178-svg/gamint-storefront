"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { deleteLineItem } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden="true">
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5" aria-hidden="true">
    <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" />
  </svg>
)

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  const handleRemove = async (id: string) => {
    setRemovingId(id)
    await deleteLineItem(id).catch(() => {})
    setRemovingId(null)
  }

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="text-white/70 transition-colors hover:text-white"
            href="/cart"
            data-testid="nav-cart-link"
          >{`سبد خرید (${totalItems})`}</LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+12px)] right-0 w-[400px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0d14] text-white shadow-[0_20px_60px_rgba(0,0,0,.5)]"
            data-testid="nav-cart-dropdown"
            dir="rtl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h3 className="text-sm font-bold text-white">سبد خرید</h3>
              {totalItems > 0 && (
                <span className="rounded-full border border-purple-400/25 bg-purple-500/10 px-2 py-0.5 text-[11px] font-bold text-purple-300">
                  {totalItems.toLocaleString("fa-IR")} کالا
                </span>
              )}
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="max-h-[380px] overflow-y-scroll px-4 py-3 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="flex items-start gap-3 border-b border-white/[0.06] py-3 last:border-0"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]"
                        >
                          {item.thumbnail && (
                            <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
                          )}
                        </LocalizedClientLink>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              data-testid="product-link"
                              className="line-clamp-1 text-xs font-bold text-white hover:text-purple-300"
                            >
                              {item.title}
                            </LocalizedClientLink>
                            <span className="shrink-0 text-xs font-bold text-white/80" data-testid="product-price">
                              {convertToLocale({
                                amount: item.total ?? 0,
                                currency_code: cartState.currency_code,
                              })}
                            </span>
                          </div>

                          {item.variant?.title && (
                            <p className="mt-0.5 text-[11px] text-white/40">{item.variant.title}</p>
                          )}

                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="text-[11px] text-white/40" data-testid="cart-item-quantity">
                              تعداد: {item.quantity.toLocaleString("fa-IR")}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              disabled={removingId === item.id}
                              data-testid="cart-item-remove-button"
                              className="flex items-center gap-1 text-[11px] text-white/40 transition hover:text-rose-400"
                            >
                              <TrashIcon />
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex flex-col gap-y-3 border-t border-white/10 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-white/60">
                      جمع سبد <span className="font-normal text-white/35">(بدون احتساب مالیات)</span>
                    </span>
                    <span
                      className="text-sm font-bold text-white"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <button
                      data-testid="go-to-cart-button"
                      className="w-full rounded-xl bg-purple-600 py-3 text-sm font-bold text-white transition hover:bg-purple-500"
                    >
                      مشاهده سبد خرید
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-14">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/30">
                  <CartIcon />
                </span>
                <span className="text-xs text-white/40">سبد خرید شما خالی است.</span>
                <LocalizedClientLink href="/store">
                  <button
                    onClick={close}
                    className="rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-purple-500"
                  >
                    مشاهده محصولات
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
