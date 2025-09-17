'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle, Bug } from 'lucide-react';

interface DevLog {
  id: number;
  date: string;
  type: 'error' | 'fix' | 'improvement';
  title: string;
  description: string;
  component?: string;
  solution?: string;
}

const devLogs: DevLog[] = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'error',
    title: 'ReferenceError: playNext не определен',
    description: 'Ошибка времени выполнения при инициализации аудиоплеера',
    component: 'useAudioPlayer.ts',
    solution: 'Перемещен useEffect после объявления всех функций, чтобы избежать обращения к playNext до его инициализации'
  },
  {
    id: 2,
    date: '2024-01-15',
    type: 'fix',
    title: 'Автопереход на следующий трек',
    description: 'После завершения воспроизведения трека не запускался следующий в плейлисте',
    component: 'useAudioPlayer.ts',
    solution: 'Добавлена обработка события ended и функция playNext с цикличным воспроизведением'
  },
  {
    id: 3,
    date: '2024-01-15',
    type: 'error',
    title: 'Белый текст на белом фоне',
    description: 'Текст оставался белым после смены цветовой схемы на светлую',
    component: 'TrackList.tsx, PlaylistHeader.tsx',
    solution: 'Полностью переработана цветовая схема всех компонентов, заменены все text-white на text-gray-900'
  },
  {
    id: 4,
    date: '2024-01-14',
    type: 'improvement',
    title: 'Минималистичный редизайн',
    description: 'Переход с темной темы на светлую минималистичную',
    component: 'Все компоненты',
    solution: 'Убраны градиенты, тени, упрощена цветовая палитра, улучшена типографика'
  },
  {
    id: 5,
    date: '2024-01-14',
    type: 'fix',
    title: 'Некорректное позиционирование элементов',
    description: 'Элементы управления были разбросаны по разным частям интерфейса',
    component: 'PlayerControls.tsx',
    solution: 'Переработана верстка: обложка слева, прогресс по центру, громкость справа с минимальными отступами'
  },
  {
    id: 6,
    date: '2024-01-14',
    type: 'improvement',
    title: 'Упрощение прогресс-бара',
    description: 'Градиентный прогресс-бар выглядел слишком броско для минималистичного дизайна',
    component: 'PlayerControls.tsx, MobilePlayer.tsx',
    solution: 'Замена градиента на простой белый цвет, увеличение толщины ползунка в 1.5 раза'
  },
  {
    id: 7,
    date: '2024-01-13',
    type: 'error',
    title: 'Некорректная работа избранного',
    description: 'При перезагрузке страницы состояние избранных треков сбрасывалось',
    component: 'useFavorites.ts',
    solution: 'Добавлена полная синхронизация с localStorage, проверка типов данных'
  },
  {
    id: 8,
    date: '2024-01-13',
    type: 'fix',
    title: 'Проблемы с адаптивностью',
    description: 'На мобильных устройствах элементы наезжали друг на друга',
    component: 'page.tsx, MobilePlayer.tsx',
    solution: 'Добавлены правильные отступы, учтены safe-area-inset для iPhone'
  }
];

const getTypeIcon = (type: DevLog['type']) => {
  switch (type) {
    case 'error':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'fix':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'improvement':
      return <Bug className="w-4 h-4 text-blue-500" />;
    default:
      return <Bug className="w-4 h-4 text-gray-500" />;
  }
};

const getTypeColor = (type: DevLog['type']) => {
  switch (type) {
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'fix':
      return 'bg-green-100 text-green-800';
    case 'improvement':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function DevLogsPage() {
  const [filter, setFilter] = useState<'all' | DevLog['type']>('all');

  const filteredLogs = filter === 'all' 
    ? devLogs 
    : devLogs.filter(log => log.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            На главную
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Логи разработки</h1>
          <div className="w-20" /> {/* Spacer for balance */}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('error')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Ошибки
          </button>
          <button
            onClick={() => setFilter('fix')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'fix'
                ? 'bg-green-100 text-green-800'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Исправления
          </button>
          <button
            onClick={() => setFilter('improvement')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'improvement'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Улучшения
          </button>
        </div>

        {/* Logs List */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getTypeColor(log.type)}`}>
                    {getTypeIcon(log.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{log.title}</h3>
                    <p className="text-sm text-gray-600">{log.description}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {log.date}
                </span>
              </div>

              <div className="pl-12 space-y-2">
                {log.component && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Компонент:</span>
                    <code className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {log.component}
                    </code>
                  </div>
                )}

                {log.solution && (
                  <div>
                    <span className="text-xs font-medium text-gray-500 block mb-1">Решение:</span>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {log.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Статистика</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {devLogs.filter(log => log.type === 'error').length}
              </div>
              <div className="text-sm text-red-800">Ошибок</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {devLogs.filter(log => log.type === 'fix').length}
              </div>
              <div className="text-sm text-green-800">Исправлений</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {devLogs.filter(log => log.type === 'improvement').length}
              </div>
              <div className="text-sm text-blue-800">Улучшений</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}