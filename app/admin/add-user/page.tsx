'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/client'
import { createAdminUserAction } from '@/lib/user' // 確保路徑正確

export default function AddUserPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  
  // 表單狀態
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuper, setIsSuper] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function checkPermission() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || user.app_metadata?.is_super_admin !== true) {
        router.push('/admin')
      } else {
        setLoading(false)
      }
    }
    checkPermission()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await createAdminUserAction(email, password, isSuper)
      if (result?.error) {
        alert('建立失敗：' + result.error.message)
      } else {
        alert('使者新增成功！')
        router.push('/admin')
      }
    } catch (err) {
      alert('發生未知錯誤')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-[#E5D3B3] flex items-center justify-center text-[#5C4033] italic">驗證身分中...</div>

  return (
    <div className='min-h-screen bg-[#E5D3B3] p-10 font-serif text-[#5C4033]'>
      <div className="max-w-md mx-auto bg-[#FDF6E3] p-8 border-2 border-[#C5A059] shadow-lg">
        <h1 className='text-2xl font-bold mb-6 text-center border-b border-[#C5A059] pb-4'>招募新使者</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">信箱</label>
            <input 
              type="email" 
              required
              className="w-full p-2 border border-[#C5A059] bg-transparent"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm mb-1">初始密碼</label>
            <input 
              type="password" 
              required
              className="w-full p-2 border border-[#C5A059] bg-transparent"
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isSuper} 
              onChange={(e) => setIsSuper(e.target.checked)} 
              className="accent-[#C5A059]"
            />
            <span className="text-sm">授予超級管理員權限</span>
          </label>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#C5A059] text-[#FDF6E3] py-2 hover:bg-[#A68845] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '建立中...' : '確認招募'}
          </button>
        </form>
        
        <button 
          onClick={() => router.push('/admin')}
          className="w-full mt-4 text-xs text-[#8B5A2B] underline opacity-70"
        >
          返回收件匣
        </button>
      </div>
    </div>
  )
}