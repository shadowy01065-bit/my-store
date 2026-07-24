'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })
      
      if (data) setProducts(data)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-amber-400">متجر سهيل 📱</h1>
            <p className="text-slate-400 text-sm mt-1">أفضل الأجهزة والمنتجات الأصلية بأفضل الأسعار</p>
          </div>
          <a
            href="/admin"
            className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-5 py-3 rounded-2xl border border-slate-700 transition text-sm flex items-center gap-2"
          >
            <span>⚙️</span>
            <span>لوحة التحكم</span>
          </a>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">الأجهزة المتوفرة</h2>

          {loading ? (
            <p className="text-center text-slate-500 py-12">جاري تحميل الأجهزة... ⏳</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    {product.image ? (
                      <div className="w-full h-48 bg-slate-950 rounded-2xl overflow-hidden mb-4 p-2 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-slate-950 rounded-2xl mb-4 flex items-center justify-center text-4xl">
                        📱
                      </div>
                    )}

                    <h3 className="font-bold text-white text-lg mb-2">{product.name}</h3>
                  </div>

                  <div className="space-y-3 mt-4 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-black text-lg">{product.price}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.storage && (
                        <span className="bg-slate-950 text-slate-300 text-xs px-3 py-1.5 rounded-xl border border-slate-800 font-medium">
                          💾 الذاكرة: {product.storage}
                        </span>
                      )}
                      {product.battery && (
                        <span className="bg-slate-950 text-slate-300 text-xs px-3 py-1.5 rounded-xl border border-slate-800 font-medium">
                          🔋 البطارية: {product.battery}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center bg-slate-900 border border-slate-800 rounded-3xl p-12 text-slate-500">
              لا توجد أجهزة معروضة في المتجر حالياً. قم بإضافة أجهزة من لوحة التحكم!
            </div>
          )}
        </div>

      </div>
    </div>
  )
}