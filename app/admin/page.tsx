'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const ADMIN_PASSWORD = 'Moka2011'

  useEffect(() => {
    const auth = sessionStorage.getItem('isAdminAuth')
    if (auth === 'true') setIsAuthenticated(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('isAdminAuth', 'true')
    } else {
      alert('كلمة المرور غير صحيحة! ❌')
      setPasswordInput('')
    }
  }

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [battery, setBattery] = useState('')
  const [storage, setStorage] = useState('')
  const [category, setCategory] = useState('iphone')
  const [imageBase64, setImageBase64] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false })
    if (data) setProducts(data)
  }

  useEffect(() => {
    if (isAuthenticated) fetchProducts()
  }, [isAuthenticated])

  // دالة تحويل الصورة المرفوعة من الجهاز إلى Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageBase64(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleStartEdit = (product: any) => {
    setEditingId(product.id)
    setName(product.name || '')
    setPrice(product.price || '')
    setBattery(product.battery || '')
    setStorage(product.storage || '')
    setCategory(product.category || 'iphone')
    setImageBase64(product.image || '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setName('')
    setPrice('')
    setBattery('')
    setStorage('')
    setCategory('iphone')
    setImageBase64('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price) {
      alert('يرجى إدخال اسم الجهاز والسعر على الأقل!')
      return
    }

    setLoading(true)
    try {
      if (editingId) {
        const { error: updateError } = await supabase
          .from('products')
          .update({ name, price, battery, storage, category, image: imageBase64 })
          .eq('id', editingId)

        if (updateError) throw updateError
        alert('تم تحديث بيانات الجهاز بنجاح! ✏️')
      } else {
        const { error: insertError } = await supabase.from('products').insert([
          { name, price, battery, storage, category, image: imageBase64 }
        ])

        if (insertError) throw insertError
        alert('تم إضافة الجهاز للمتجر بنجاح! 🎉')
      }

      handleCancelEdit()
      fetchProducts()
    } catch (error: any) {
      alert('حدث خطأ: ' + (error.message || error))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الجهاز؟')) {
      const { error } = await supabase.from('products').delete().eq('id', id)
      if (!error) fetchProducts()
      else alert('حدث خطأ أثناء الحذف')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-6" dir="rtl">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">⚙️</div>
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Admin Panel</span>
            <h1 className="text-2xl font-black text-white mt-3">لوحة تحكم متجر سهيل</h1>
            <p className="text-slate-400 text-sm mt-1">المنطقة محمية، يرجى إدخال كلمة المرور للمتابعة</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="أدخل كلمة المرور..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 text-center tracking-widest focus:outline-none focus:border-amber-500"
              required
            />
            <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black py-3.5 rounded-2xl shadow-lg transition active:scale-[0.99]">
              دخول Admin 🚀
            </button>
          </form>
          <div className="pt-2">
            <a href="/" className="text-slate-500 hover:text-slate-400 text-xs font-semibold transition">← العودة إلى المتجر الرئيسي</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-12" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">Admin</span>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-1">لوحة تحكم متجر سهيل ⚙️</h1>
            <p className="text-slate-400 text-sm mt-1">إضافة، تعديل وإدارة أجهزة المتجر بكل سهولة</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { sessionStorage.removeItem('isAdminAuth'); setIsAuthenticated(false); }} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-4 py-3 rounded-2xl border border-red-500/25 transition text-sm flex items-center gap-2">
              <span>🚪</span><span>خروج</span>
            </button>
            <a href="/" className="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-5 py-3 rounded-2xl border border-slate-700 transition text-sm flex items-center gap-2">
              <span>🏠</span><span>عرض المتجر</span>
            </a>
          </div>
        </div>

        <div className={`bg-slate-900/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border shadow-xl transition ${editingId ? 'border-amber-500/50 ring-2 ring-amber-500/20' : 'border-slate-800'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{editingId ? '✏️' : '➕'}</span>
              <span>{editingId ? `تعديل بيانات الجهاز (ID: ${editingId})` : 'إضافة جهاز جديد'}</span>
            </h2>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 transition">
                إلغاء التعديل ✕
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">اسم الجهاز</label>
                <input type="text" placeholder="مثال: iPhone 15 Pro" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">اختر القسم</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white focus:outline-none focus:border-amber-500">
                  <option value="iphone">📱 أيفون جديد</option>
                  <option value="iphone_used">📱 أيفون مستعمل</option>
                  <option value="ipad">💻 آي باد</option>
                  <option value="watches">⌚ ساعات</option>
                  <option value="android_tab">📑 تابلت أندرويد</option>
                  <option value="android_phone">📱 موبايل أندرويد</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">السعر</label>
                <input type="text" placeholder="مثال: 3800 ر.س" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">الذاكرة</label>
                <input type="text" placeholder="مثال: 128GB" value={storage} onChange={(e) => setStorage(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">نسبة البطارية</label>
                <input type="text" placeholder="مثال: 100%" value={battery} onChange={(e) => setBattery(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">اختر صورة الجهاز من الجهاز</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-slate-300 file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-slate-955 hover:file:bg-amber-400 cursor-pointer focus:outline-none" />
              {imageBase64 && (
                <div className="mt-3 flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <img src={imageBase64} alt="Preview" className="w-12 h-12 object-cover rounded-xl" />
                  <span className="text-xs text-green-400 font-bold">تم اختيار وفحص الصورة بنجاح ✅</span>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} className={`w-full font-black py-4 rounded-2xl shadow-lg transition active:scale-[0.99] disabled:opacity-50 text-base ${editingId ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950' : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950'}`}>
              {loading ? 'جاري المعالجة... ⏳' : editingId ? '💾 حفظ التعديلات' : '🚀 إضافة الجهاز للمتجر'}
            </button>
          </form>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">الأجهزة المسجلة في قاعدة البيانات ({products.length})</h2>
          <div className="space-y-4">
            {products.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover bg-slate-900 rounded-xl" />
                  ) : (
                    <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center text-xl">📱</div>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-base">{item.name} <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-amber-400 mr-2">{item.category}</span></h3>
                    <p className="text-amber-400 font-semibold text-sm">
                      {item.price} {item.storage ? ` | 💾 ${item.storage}` : ''} {item.battery ? ` | 🔋 ${item.battery}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleStartEdit(item)} className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/20 text-sm transition">
                    تعديل ✏️
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-4 py-2 rounded-xl border border-red-500/20 text-sm transition">
                    حذف 🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}