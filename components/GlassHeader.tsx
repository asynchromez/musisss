// components/GlassHeader.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, Menu, X } from 'lucide-react';

export function GlassHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Music className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Musisss</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/home" className="text-gray-800 hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-blue-600 transition-colors">
              О нас
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors">
              Контакты
            </Link>
            <Link href="/charts" className="text-gray-800 hover:text-blue-600 transition-colors">
              Чарты
            </Link>
            <Link href="/devlogs" className="text-gray-800 hover:text-blue-600 transition-colors">
              DevLogs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>

          {/* Desktop CTA Button */}
          <Link
            href="/"
            className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Начать слушать
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/home"
                className="block text-gray-800 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Главная
              </Link>
              <Link
                href="/about"
                className="block text-gray-800 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                О нас
              </Link>
              <Link
                href="/contact"
                className="block text-gray-800 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакты
              </Link>
              <Link
                href="/charts"
                className="block text-gray-800 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Чарты
              </Link>
              <Link
                href="/devlogs"
                className="block text-gray-800 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                DevLogs
              </Link>
              
              {/* Mobile CTA Button */}
              <Link
                href="/"
                className="block bg-blue-600 text-white text-center px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Начать слушать
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}