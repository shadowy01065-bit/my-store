'use client'

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const categories = [
    { key: 'all', title: '🔥 جميع الأجهزة' },
    { key: 'iphone', title: '📱 أيفون جديد' },
    { key: 'iphone_used', title: '📱 أيفون مستعمل' },
    { key: 'ipad', title: '💻 آي باد' },
    { key: 'watches', title: '⌚ ساعات ذكية' },
    { key: 'android_tab', title: '📑 تابلت أندرويد' },
    { key: 'android_phone', title: '📱 موبايل أندرويد' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => (p.category || 'iphone') === selectedCategory);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12" dir="rtl">
      {/* رأس الصفحة */}
      <header className="max-w-4xl mx-auto mb-8 text-center bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl relative">
        <a 
          href="/admin" 
          className="absolute top-4 left-4 bg-slate-800 hover:bg-slate-700 text-amber-400 px-4 py-2 rounded-2xl text-sm font-semibold transition border border-slate-700 flex items-center gap-1.5 shadow"
        >
          ⚙️ لوحة التحكم
        </a>
        <h1 className="text-3xl md:text-4xl font-black text-amber-400 mb-2">متجر سهيل 📱</h1>
        <p className="text-slate-400 text-sm">أفضل الأجهزة والمنتجات الأصلية بأفضل الأسعار</p>
      </header>

      {/* شريط الأقسام التفاعلي */}
      <div className="max-w-4xl mx-auto mb-10 overflow-x-auto pb-2 flex gap-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`whitespace-nowrap px-5 py-3 rounded-2xl font-bold text-sm transition border ${
              selectedCategory === cat.key
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-400 text-center py-16">جاري تحميل الأجهزة... ⏳</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-slate-400 text-center py-16">لا توجد أجهزة مضافة في هذا القسم حالياً.</p>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const imgSrc = product.image || product.image_url;

            return (
              <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between p-5 hover:border-slate-700 transition">
                <div>
                  {imgSrc && (
                    <div className="relative h-48 w-full mb-4 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
                      <img 
                        src={imgSrc} 
                        alt={product.name} 
                        className="object-contain h-full w-full"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                    <span className="text-xs bg-slate-950 px-2.5 py-1 rounded-xl text-amber-400 border border-slate-800">
                      {categories.find(c => c.key === (product.category || 'iphone'))?.title || 'جهاز'}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-amber-400 mb-4">
                    {product.price}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4 text-sm text-slate-300">
                    {product.storage && (
                      <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">الذاكرة: {product.storage}</span>
                    )}
                    {product.battery && (
                      <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">البطارية: {product.battery}</span>
                    )}
                  </div>
                </div>

                <a
                  href={`https://wa.me/966574105090?text=${encodeURIComponent(`مرحباً، أريد طلب هذا الجهاز: ${product.name} بسعر ${product.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full bg-green-600 text-center text-white py-3 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg text-sm"
                >
                  طلب عبر واتساب 📱
                </a>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}