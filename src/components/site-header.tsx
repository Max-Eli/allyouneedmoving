'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { business } from '@/config/business'
import { primaryNav } from '@/config/site'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Close on route change so a tap-through doesn't leave the drawer open.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // While the drawer is open: lock scroll, close on Escape, and keep focus inside.
  useEffect(() => {
    if (!open) return

    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    // The drawer and scrim start below the header so the close button is never
    // covered. The header's offset changes with the announce bar, so measure it
    // rather than hardcoding a height.
    const setDrawerTop = () => {
      const bottom = headerRef.current?.getBoundingClientRect().bottom ?? 0
      document.documentElement.style.setProperty('--drawer-top', `${Math.max(0, Math.round(bottom))}px`)
    }
    setDrawerTop()
    window.addEventListener('resize', setDrawerTop)

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !navRef.current) return

      const focusable = navRef.current.querySelectorAll<HTMLElement>('a[href], button')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', setDrawerTop)
      body.style.overflow = previousOverflow
      document.documentElement.style.removeProperty('--drawer-top')
    }
  }, [open])

  function isCurrent(href: string) {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="site-header" ref={headerRef}>
      <Link href="/" className="brand" aria-label={`${business.name} home`}>
        <span className="brand__mark" aria-hidden="true">
          AYN
        </span>
        <span className="brand__text">
          <span className="brand__name">{business.name}</span>
          <span className="brand__tag">SOUTH FLORIDA · NATIONWIDE</span>
        </span>
      </Link>

      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        {open ? 'Close' : 'Menu'}
      </button>

      {open ? (
        <button
          type="button"
          className="nav-scrim"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        ref={navRef}
        id="primary-navigation"
        className="site-nav"
        data-open={open}
        aria-label="Primary"
      >
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="navlink"
            aria-current={isCurrent(item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/quote" className="btn btn--rust navlink-cta">
          Get my free quote
        </Link>
      </nav>
    </header>
  )
}
