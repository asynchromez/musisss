// app/about/page.tsx
'use client';

import { useState } from 'react';
import { 
  Music, 
  Headphones, 
  Sparkles, 
  Users, 
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';
import { GlassHeader } from '@/components/GlassHeader';

const faqItems = [
  {
    question: "Что такое Musisss?",
    answer: "Современный музыкальный сервис с минималистичным дизайном и умными рекомендациями. Простота и удобство — наш приоритет."
  },
  {
    question: "Сколько стоит подписка?",
    answer: "Базовые функции бесплатны. Премиум-подписка открывает дополнительные возможности и стоит от 199 рублей в месяц."
  },
  {
    question: "На каких устройствах работает?",
    answer: "На всех современных устройствах: компьютерах, смартфонах, планшетах. Доступ через браузер и мобильные приложения."
  }
];

const stats = [
  { icon: Music, number: "50K+", label: "Треков" },
  { icon: Users, number: "100K+", label: "Пользователей" },
  { icon: Headphones, number: "24/7", label: "Доступность" }
];

const features = [
  {
    icon: Sparkles,
    title: "Умные рекомендации",
    description: "AI подбирает музыку по вашему вкусу"
  },
  {
    icon: Headphones,
    title: "Высокое качество",
    description: "Стриминг в качестве до 320 kbps"
  },
  {
    icon: Heart,
    title: "Простота",
    description: "Минималистичный и интуитивный интерфейс"
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-blue-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 text-left flex items-center justify-between hover:bg-blue-50/50 rounded-lg px-4 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600" />
        )}
      </button>
      {isOpen && (
        <div className="pb-5 px-4">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <GlassHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Music className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            О Musisss
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Простой и красивый способ слушать музыку. Без лишнего, только самое важное.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-blue-100">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Наша философия
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            Мы создали Musisss для тех, кто ценит простоту и качество. 
            Никаких сложных меню и навязчивых функций — только чистая музыка 
            и приятный интерфейс.
          </p>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-50/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Почему Musisss
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Наша история
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Musisss родился из желания создать музыкальный сервис, 
                который будет простым и удобным. Мы убрали всё лишнее, 
                оставив только суть — прекрасную музыку.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Сегодня мы продолжаем развиваться, сохраняя наши принципы 
                минимализма и качества.
              </p>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
              <Heart className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">С любовью к музыке</h3>
              <p className="text-blue-100">Каждая деталь создана с заботой о вашем опыте</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-blue-50/30">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Частые вопросы
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6">
            {faqItems.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Начните слушать сегодня
          </h2>
          <p className="text-gray-600 mb-8">
            Присоединяйтесь к сообществу Musisss и откройте мир музыки заново
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Начать бесплатно
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Music className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Musisss</span>
          </div>
          <p className="text-gray-600 mb-8">
            © 2025 Musisss.ru. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}