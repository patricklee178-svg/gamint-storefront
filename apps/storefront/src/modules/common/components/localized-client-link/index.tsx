"use client"

import Link from "next/link"
import React from "react"

/**
 * The country code is an internal routing detail resolved by middleware and
 * never shown in the URL, so this is just a thin wrapper around `<Link />`.
 */
const LocalizedClientLink = ({
  children,
  href,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: unknown
}) => {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
