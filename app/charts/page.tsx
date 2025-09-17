// app/charts/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Music } from 'lucide-react';
import { GlassHeader } from '@/components/GlassHeader';

// Рандомные trap треки для чартов
const trapSongs = [
  { id: 1, rank: 1, title: "Sicko Mode", artist: "Travis Scott", streams: "1.2B", change: "up" },
  { id: 2, rank: 2, title: "God's Plan", artist: "Drake", streams: "1.1B", change: "stable" },
  { id: 3, rank: 3, title: "Bad and Boujee", artist: "Migos", streams: "980M", change: "up" },
  { id: 4, rank: 4, title: "Mask Off", artist: "Future", streams: "920M", change: "down" },
  { id: 5, rank: 5, title: "HUMBLE.", artist: "Kendrick Lamar", streams: "890M", change: "up" },
  { id: 6, rank: 6, title: "Rockstar", artist: "Post Malone", streams: "850M", change: "stable" },
  { id: 7, rank: 7, title: "Goosebumps", artist: "Travis Scott", streams: "810M", change: "up" },
  { id: 8, rank: 8, title: "XO TOUR Llif3", artist: "Lil Uzi Vert", streams: "780M", change: "down" },
  { id: 9, rank: 9, title: "Money Longer", artist: "Lil Uzi Vert", streams: "750M", change: "up" },
  { id: 10, rank: 10, title: "No Limit", artist: "G-Eazy", streams: "720M", change: "stable" }
];

export default function ChartsPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <GlassHeader />
      
      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Чарты
          </h1>
          
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Самые популярные trap-треки этого месяца. Открой для себя новую музыку, 
            которая захватывает мир.
          </p>

          {/* ГИФКА 400x400 */}
          <div className="flex justify-center mb-16">
            <div className="w-[400px] h-[400px] relative">
              <Image
                src="/charts_square_400x400.gif"
                alt="Анимированная стрелка вправо"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>

          {/* Превью видео — БЕЗ подписи */}
          <div className="mx-auto max-w-4xl">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/video-preview.jpg"
                alt="Превью музыкального видео"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Charts Table Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Топ-10 Trap Треков
            </h2>
            <p className="text-gray-600 mt-2">Рейтинг обновляется еженедельно</p>
          </div>

          {/* Простая таблица */}
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">#</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Трек</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-right">Прослушивания</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500 text-right">Тренд</th>
                </tr>
              </thead>
              <tbody>
                {trapSongs.map((song) => (
                  <tr key={song.id} className="border-t border-gray-100">
                    <td className="px-6 py-4 text-gray-900 font-medium">
                      {song.rank === 1 ? '👑' : song.rank}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{song.title}</div>
                        <div className="text-sm text-gray-600">{song.artist}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-700">{song.streams}</td>
                    <td className="px-6 py-4 text-right">
                      {song.change === 'up' && <span className="text-green-600">↑</span>}
                      {song.change === 'down' && <span className="text-red-600">↓</span>}
                      {song.change === 'stable' && <span className="text-gray-400">→</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Слушать все треки →
            </Link>
          </div>
        </div>
      </section>

      {/* Минималистичный Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Music className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">Musisss</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Musisss. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}