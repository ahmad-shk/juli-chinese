"use client"

import { useState, useEffect } from "react"
import { MenuIcon, X, Sun, Moon, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const { lang, toggleLang } = useLanguage()

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const t = translations[lang].header

  return (
    <header className="fixed w-full top-6 z-50 px-3 sm:px-4 md:px-4">
      <nav className="max-w-7xl mx-auto relative">
        {/* Main Pill Bar */}
        <div className="bg-white dark:bg-black text-black dark:text-white rounded-full px-3 sm:px-6 md:px-12 py-2 sm:py-3 flex items-center justify-between shadow-2xl border border-gray-200 dark:border-white/10 min-h-[60px] sm:min-h-[75px] transition-all duration-300">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          {/* Desktop Left Side Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-1">
            {[
              { name: t.home, href: "#" },
              { name: t.menu, href: "#menu" },
              { name: t.booking, href: "#reservation" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-xs sm:text-sm font-semibold group py-1 transition-colors duration-200 hover:text-amber-600"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center bg-inherit px-2 sm:px-4 py-2 rounded-lg z-10">
            <div className="flex items-center gap-1 sm:gap-3 group cursor-pointer transition-transform hover:scale-105 duration-300">
              {!isDark ? (
                <svg
                  width="120"
                  height="45"
                  viewBox="0 0 188 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 sm:w-28"
                >
                  <path
                    d="M6.64517 8.14207C6.64517 8.14207 3 8.14207 3 11.781V58.0815C3 58.0815 3 61.7267 6.64517 61.7267H52.9456C52.9456 61.7267 56.5908 61.7267 56.5908 58.0815V11.781C56.5908 11.781 56.5908 8.13586 52.9456 8.13586H6.64517V8.14207Z"
                    fill="#D20910"
                  />
                  <path
                    d="M7.90689 9.40282C7.90689 9.40282 4.26172 9.40282 4.26172 13.048V56.8273C4.26172 56.8273 4.26172 60.4724 7.90689 60.4724H51.6924C51.6924 60.4724 55.3375 60.4724 55.3375 56.8273V13.0418C55.3375 13.0418 55.3375 9.39661 51.6924 9.39661H7.90689V9.40282Z"
                    stroke="white"
                    strokeWidth="0.385009"
                  />
                </svg>
              ) : (
                <svg
                  width="120"
                  height="45"
                  viewBox="0 0 188 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 sm:w-28"
                >
                  <path
                    d="M6.64517 8.14207C6.64517 8.14207 3 8.14207 3 11.781V58.0815C3 58.0815 3 61.7267 6.64517 61.7267H52.9456C52.9456 61.7267 56.5908 61.7267 56.5908 58.0815V11.781C56.5908 11.781 56.5908 8.13586 52.9456 8.13586H6.64517V8.14207Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M7.90689 9.40282C7.90689 9.40282 4.26172 9.40282 4.26172 13.048V56.8273C4.26172 56.8273 4.26172 60.4724 7.90689 60.4724H51.6924C51.6924 60.4724 55.3375 60.4724 55.3375 56.8273V13.0418C55.3375 13.0418 55.3375 9.39661 51.6924 9.39661H7.90689V9.40282Z"
                    stroke="#D20910"
                    strokeWidth="0.385009"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 sm:px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-300 text-xs sm:text-sm font-medium"
            >
              <Globe size={18} />
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-3 bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-4 space-y-3">
              {[
                { name: t.home, href: "#" },
                { name: t.menu, href: "#menu" },
                { name: t.booking, href: "#reservation" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-900 text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
