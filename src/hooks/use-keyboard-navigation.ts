'use client'

import { useEffect, useCallback } from 'react'

interface UseKeyboardNavigationProps {
  onEscape?: () => void
  onEnter?: () => void
  trapFocus?: boolean
  autoFocus?: boolean
  focusableSelector?: string
}

export function useKeyboardNavigation({
  onEscape,
  onEnter,
  trapFocus = false,
  autoFocus = false,
  focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
}: UseKeyboardNavigationProps = {}) {
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        if (onEscape) {
          event.preventDefault()
          onEscape()
        }
        break
      case 'Enter':
        if (onEnter && event.target === document.activeElement) {
          // Only trigger if the focused element is not a button or form element
          const target = event.target as HTMLElement
          if (!['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
            event.preventDefault()
            onEnter()
          }
        }
        break
      case 'Tab':
        if (trapFocus) {
          const focusableElements = document.querySelectorAll(focusableSelector)
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
          
          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault()
              lastElement?.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault()
              firstElement?.focus()
            }
          }
        }
        break
    }
  }, [onEscape, onEnter, trapFocus, focusableSelector])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    
    // Auto focus first focusable element if requested
    if (autoFocus) {
      const firstFocusable = document.querySelector(focusableSelector) as HTMLElement
      firstFocusable?.focus()
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, autoFocus, focusableSelector])

  const focusFirst = useCallback(() => {
    const firstFocusable = document.querySelector(focusableSelector) as HTMLElement
    firstFocusable?.focus()
  }, [focusableSelector])

  const focusLast = useCallback(() => {
    const focusableElements = document.querySelectorAll(focusableSelector)
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
    lastElement?.focus()
  }, [focusableSelector])

  return {
    focusFirst,
    focusLast
  }
}