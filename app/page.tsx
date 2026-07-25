import { supabase } from '@/lib/supabase';
import React from 'react';

export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase.from('products').select('*');

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6" dir="rtl">
      {/* رأس الصفحة مع زر لوحة التحكم */}
      <header className="max-w-4xl mx-auto mb-10 text-center bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg relative">
        <a 
          href="/admin" 
          className="absolute top-4 left-4 bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-1.5 rounded-xl text-sm font-semibold transition border border-slate-700 flex items-center gap-1"
        >
          ⚙️ لوحة التحكم
        </a>
        <h1 className="text-3xl font-bold text-amber-400 mb-2">متجر سهيل 📱</h1>
        <p className="text-slate-400">أفضل الأجهزة والمنتجات الأصلية بأفضل الأسعار</p>
      </header>

      {/* قائمة المنتجات */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-slate-200">الأجهزة المتوفرة</h2>
        
        {error && (
          <p className="text-red-500 text-center bg-red-950/50 p-4 rounded-lg">
            حدث خطأ أثناء تحميل المنتجات: {error.message}
          </p>
        )}

        {!products || products.length === 0 ? (
          <p className="text-slate-400 text-center py-10">لا توجد منتجات مضافة حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => {
              // يدعم الحالتين سواء كانت في القاعدة باسم image أو image_url
              const imgSrc = product.image || product.image_url;
              
              return (
                <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between p-5">
                  <div>
                    {imgSrc && (
                      <div className="relative h-48 w-full mb-4 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center">
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
                    <div className="flex gap-2 mb-4 text-sm text-slate-300">
                      {product.storage && (
                        <span className="bg-slate-800 px-3 py-1 rounded-lg">الذاكرة: {product.storage}</span>
                      )}
                      {product.battery && (
                        <span className="bg-slate-800 px-3 py-1 rounded-lg">البطارية: {product.battery}</span>
                      )}
                    </div>
                  </div>

                  {/* زر الطلب عبر واتساب */}
                  <a
                    href={`https://wa.me/966574105090?text=${encodeURIComponent(`مرحباً، أريد طلب هذا الجهاز: ${product.name} بسعر ${product.price}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block w-full bg-green-600 text-center text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
                  >
                    طلب عبر واتساب 📱
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}