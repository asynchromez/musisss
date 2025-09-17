'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, ArrowRight, Headphones, Music, Sparkles } from 'lucide-react';
import { GlassHeader } from '@/components/GlassHeader';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Glass Header */}
      <GlassHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Музыка которая
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              повернет тебя
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Наслаждайтесь музыкой так, как никогда раньше, с нашим аудиоплеером в стиле минимализма. 
            Лаконичный дизайн, интуитивно понятное управление и истинное удовольствие от прослушивания.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/"
              className="group bg-black text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center gap-3"
            >
              Начни слушать
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/about"
              className="group border-2 border-black text-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-black hover:text-white flex items-center gap-3"
            >
              Узнать больше
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Album Covers */}
          <div className="relative">
            <div className="flex justify-center items-center gap-8">
              {/* First Album Cover */}
              <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-2xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-700">
                <Image
                  src="/covers/6.jpg"
                  alt="Album Cover 1"
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>

              {/* Second Album Cover */}
              <div className="w-56 h-56 md:w-72 md:h-72 relative rounded-2xl shadow-2xl transform -rotate-8 hover:-rotate-4 transition-transform duration-700">
                <Image
                  src="/covers/11.jpg"
                  alt="Album Cover 2"
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent rounded-2xl" />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-8 h-8 bg-green-400 rounded-full opacity-60 animate-bounce" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-bounce delay-500" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Почему выбирают
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Musisss?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Предназначен для любителей музыки, которые ценят простоту и элегантность в процессе прослушивания.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Захватывающий звук</h3>
              <p className="text-gray-600">
                Кристально чистое качество звука, позволяющее вам слышать каждую ноту и каждый такт в точности так, как задумал исполнитель.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Минималистичный дизайн</h3>
              <p className="text-gray-600">
                Чистый, не отвлекающий внимание интерфейс, в котором музыка стоит на первом месте. Никакого беспорядка, только чистое удовольствие от прослушивания.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Плейлисты</h3>
              <p className="text-gray-600">
                Разделение треков на плейлисты, позволяет разделять жанры музыки.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Готовы к новому опыту
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {' '}музыкального различия?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Присоединяйтесь к тысячам меломанов, которые уже открыли для себя радость минималистичного звука.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            Начни свое путешествие
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-800">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-400">10K+</div>
              <div className="text-gray-400">Активных слушателей</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400">500+</div>
              <div className="text-gray-400">Плейлистов</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-purple-400">24/7</div>
              <div className="text-gray-400">Работа сервиса</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center mr-2">
              <Music className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold">Musisss</span>
          </div>
          <p className="text-gray-400">
            © 2025 Musisss. Разработано asynchrome с ♡ для любителей музыки.
          </p>
        </div>
      </footer>
    </div>
  );
}