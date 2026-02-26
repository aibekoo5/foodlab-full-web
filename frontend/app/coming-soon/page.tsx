// app/coming-soon/page.tsx or any other page component
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { Language } from "@/lib/language-context"

export default function ComingSoonPage() {
  const router = useRouter();
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: 'linear-gradient(145deg, #f5f0ff 0%, #e9e1ff 100%)',
      }}
    >
      {/* Негізгі карточка / Основная карточка */}
      <div 
        ref={ref}
        className={`max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        
        {/* Икона / Иконка */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-70"
              style={{ backgroundColor: '#9473ff' }}
            ></div>
            <div 
              className="relative bg-white p-4 rounded-full shadow-lg"
              style={{ color: '#9473ff' }}
            >
              <Clock size={48} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Басты тақырып / Главный заголовок - тек қолданыстағы тілде */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {language === 'kk' ? 'Әлі қолжетімсіз' : 'Скоро появится'}
        </h1>
        
        <p className="text-gray-600 mb-2 text-lg flex items-center justify-center gap-2">
          <Sparkles size={20} className="text-purple-400" />
          {language === 'kk' ? 'Жақын арада қосылады' : 'В разработке'}
          <Sparkles size={20} className="text-purple-400" />
        </p>
        
        {/* Бөлу сызығы / Разделитель */}
        <div className="w-24 h-1 mx-auto my-6 rounded-full" style={{ backgroundColor: '#9473ff' }}></div>
        
        {/* Қосымша мәлімет / Дополнительная информация */}
        <p className="text-gray-500 mt-8 max-w-md mx-auto">
          {language === 'kk' 
            ? 'Біз осы бөлімді дайындап жатырмыз. Көп күттірмейміз!' 
            : 'Мы готовим этот раздел для вас. Скоро всё заработает!'}
        </p>

        {/* Артқа қайту батырмасы / Кнопка "Назад" */}
        <a href="/">
            <button
              onClick={handleGoBack}
              className="mt-10 inline-flex items-center gap-3 px-6 py-3 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              style={{ backgroundColor: '#9473ff' }}
            >
              <ArrowLeft 
                size={20} 
                className="transition-transform duration-300 group-hover:-translate-x-1" 
              />
              <span>{language === 'kk' ? 'Артқа қайту' : 'Назад'}</span>
            </button>
        </a>

        {/* Ескерту / Примечание */}
        <p className="text-xs text-gray-400 mt-8">
          {language === 'kk' ? 'Бет әзірлену үстінде' : 'Страница в разработке'}
        </p>
      </div>
    </div>
  );
}