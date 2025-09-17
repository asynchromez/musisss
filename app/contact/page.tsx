// app/contact/page.tsx
'use client';

import { GlassHeader } from '@/components/GlassHeader';
import { Mail, Phone, MessageSquare, Heart, Code, Palette, Music } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <GlassHeader />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Готовы создать что-то удивительное вместе? Давайте обсудим ваш проект!
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Telegram Card */}
            <div className="bg-gradient-to-br from-blue-400 to-cyan-400 text-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Telegram</h3>
              <p className="text-blue-100 mb-6">Быстрый и удобный способ связи</p>
              <a
                href="https://t.me/asynchrome"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                @asynchrome
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 text-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Email</h3>
              <p className="text-purple-100 mb-6">Для официальных запросов</p>
              <a
                href="mailto:asynchrome@proton.me"
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                asynchrome@mail.ru
              </a>
            </div>

            {/* Project Info Card */}
            <div className="bg-gradient-to-br from-green-400 to-teal-400 text-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">О проекте</h3>
              <p className="text-green-100">
                Весь проект Musisss был разработан с нуля asynchrome
              </p>
            </div>
          </div>

          {/* Developer Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">asynchrome</h2>
              <p className="text-gray-600 text-lg mb-6">
                Full-stack разработчик и дизайнер
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">React</span>
                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium">Next.js</span>
                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">TypeScript</span>
              </div>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Специализируюсь на создании современных веб-приложений с красивым дизайном 
                и безупречной производительностью. Musisss — это проект, созданный с любовью 
                к музыке и технологиям.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Музыка</h3>
              <p className="text-gray-600">Страсть к созданию идеального звучания</p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Код</h3>
              <p className="text-gray-600">Чистый и эффективный код</p>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Дизайн</h3>
              <p className="text-gray-600">Внимание к каждой детали</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Готовы к сотрудничеству?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Давайте создадим что-то удивительное вместе. Я всегда открыт для новых проектов и идей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/asynchrome"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-shadow"
              >
                Написать в Telegram
              </a>
              <Link
                href="/"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-blue-400 transition-colors"
              >
                Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Music className="w-8 h-8 text-blue-400 mr-3" />
            <span className="text-2xl font-bold">Musisss</span>
          </div>
          <p className="text-gray-400 mb-6">
            Разработано с ♡ asynchrome • 2025
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              О нас
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Контакты
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Конфиденциальность
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}