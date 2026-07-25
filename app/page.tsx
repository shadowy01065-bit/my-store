import { supabase } from '@/lib/supabase';
import React from 'react';

export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase.from('products').select('*');

  // خريطة أسماء الأقسام باللغة العربية
  const categories = [
    { key: 'iphone', title: '📱 أيفون جديد' },
    { key: 'iphone_used', title: '📱 أيفون مستعمل' },
    { key: 'ipad', title: '💻 آي باد' },
    { key: 'watches', title: '⌚ ساعات ذكية' },
    { key: 'android_tab', title: '📑 تابلت أندرويد' },
    { key: 'android_phone', title: '📱 موبايل أندرويد' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12" dir="rtl">
      {/* رأس الصفحة مع زر لوحة التحكم */}
      <header className="max-w-4xl mx-auto mb-12 text-center bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl relative">
        <a 
          href="/admin" 
          className="absolute top-4 left-4 bg-slate-800 hover:bg-slate-700 text-amber-400 px-4 py-2 rounded-2xl text-sm font-semibold transition border border-slate-700 flex items-center gap-1.5 shadow"
        >
          ⚙️ لوحة التحكم
        </a>
        <h1 className="text-3xl md:text-4xl font-black text-amber-400 mb-2">متجر سهيل 📱</h1>
        <p className="text-slate-400 text-sm">أفضل الأجهزة والمنتجات الأصلية بأفضل الأسعار</p>
      </header>

      {error && (
        <p className="text-red-500 text-center bg-red-950/50 p-4 rounded-2xl max-w-4xl mx-auto mb-8">
          حدث خطأ أثناء تحميل المنتجات: {error.message}
        </p>
      )}

      {!products || products.length === 0 ? (
        <p className="text-slate-400 text-center py-16">لا توجد منتجات مضافة حالياً.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((cat) => {
            // تصفية المنتجات حسب القسم (مع دعم الأجهزة القديمة التي ليس لها قسم وتوضع في أيفون تلقائياً)
            const catProducts = products.filter((p) => (p.category || 'iphone') === cat.key);

            if (catProducts.length === 0) return null; // لا تظهر القسم إذا لم تكن فيه منتجات

            return (
              <div key={cat.key} className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h2 className="text-2xl font-black text-amber-400 flex items-center gap-2">
                    {cat.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {catProducts.map((product) => {
                    const imgSrc = product.image || product.image_url;

                    return (
                      <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between p-5 hover:border-slate-700 transition">
                        <div>
                          {imgSrc && (
                            <div className="relative h-48 w-full mb-4 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
                              <img 
                                src={imgSrc} 
                                alt={product.name} 
                                className="object-cover h-full w-full"
                              />
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                          <div className="text-2xl font-black text-amber-400 mb-4">
                            {product.price}
                          </div>
                          
                          {/* المواصفات إن وجدت */}
                          <div className="flex flex-wrap gap-2 mb-4 text-sm text-slate-300">
                            {product.storage && (
                              <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">الذاكرة: {product.storage}</span>
                            )}
                            {product.battery && (
                              <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">البطارية: {product.battery}</span>
                            )}
                          </div>
                        </div>

                        {/* زر الطلب عبر واتساب */}
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
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}