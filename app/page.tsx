import React from 'react';

// بيانات الأجهزة لـ سهيل للاتصالات
const products = [
  {
    id: '1',
    name: 'آيفون 16 برو ماكس',
    price: 3960,
    isUsed: true,
    battery: '94%',
    storage: '256GB',
    color: 'أسود تيتانيوم',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'آيفون 15 برو',
    price: 2420,
    isUsed: true,
    battery: '85%',
    storage: '128GB',
    color: 'أزرق تيتانيوم',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'سامسونج S24 ألترا',
    price: 3200,
    isUsed: false,
    storage: '512GB',
    color: 'تيتانيوم رمادي',
    image: 'https://images.unsplash.com/photo-1707227155442-4f9bd0ec3672?q=80&w=600&auto=format&fit=crop',
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900" dir="rtl">
      {/* الهيدر / الشريط العلوي */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter">سهيل للاتصالات 📱</h1>
        <div className="bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
          دفع مباشر (مدى / Apple Pay)
        </div>
      </header>

      {/* قسم البانر الترويجي */}
      <section className="max-w-5xl mx-auto mt-8 bg-gradient-to-r from-blue-600 to-indigo-800 text-white rounded-2xl p-10 shadow-lg mx-4">
        <h2 className="text-3xl font-extrabold mb-3">سهيل للاتصالات | أجهزة مضمونة بأسعار منافسة</h2>
        <p className="text-blue-100 text-lg">جوالات جديدة ومستعملة مفحوصة بالكامل مع شحن سريع ودفع آمن.</p>
      </section>

      {/* قائمة المنتجات */}
      <section className="max-w-5xl mx-auto my-12 px-4">
        <h3 className="text-xl font-bold mb-6 border-b-2 border-blue-600 pb-2 inline-block">أحدث الأجهزة المتاحة</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 relative">
              
              {/* شارة المستعمل / الجديد */}
              <span className={`absolute top-4 right-4 text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm z-10 ${item.isUsed ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {item.isUsed ? 'مستعمل مضمون' : 'جديد كلياً'}
              </span>

              {/* صورة المنتج */}
              <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={item.image} alt={item.name} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
              </div>

              {/* تفاصيل المنتج */}
              <div className="p-5">
                <h4 className="font-extrabold text-lg mb-2">{item.name}</h4>
                
                {/* المواصفات */}
                <div className="flex flex-wrap gap-2 my-3 text-xs font-medium text-gray-600">
                  <span className="bg-gray-100 px-2.5 py-1.5 rounded-md">{item.storage}</span>
                  <span className="bg-gray-100 px-2.5 py-1.5 rounded-md">{item.color}</span>
                  {item.isUsed && (
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-md">
                      البطارية {item.battery}
                    </span>
                  )}
                </div>

                {/* السعر وأزرار الشراء */}
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through mb-1">{item.price + 300} ر.س</span>
                    <div>
                      <span className="text-2xl font-black text-blue-600">{item.price}</span>
                      <span className="text-sm text-gray-500 mr-1 font-bold">ر.س</span>
                    </div>
                  </div>
                  <button className="bg-gray-900 hover:bg-blue-600 text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors shadow-sm">
                    شراء الآن
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}