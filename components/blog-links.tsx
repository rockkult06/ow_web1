"use client"

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

interface BlogLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  eventName: string
  eventData: Record<string, any>
}

export function BlogLink({ href, children, className, eventName, eventData }: BlogLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, eventData)
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
} 