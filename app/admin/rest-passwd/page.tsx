'use client'
import { useState } from 'react'
import { createClient } from '@/lib/client'
import { useRouter } from 'next/navigation'

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()
  const router = useRouter()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      setMessage('錯誤：' + error.message)
    } else {
      setMessage('密碼已成功更新！')
      setTimeout(() => router.push('/admin'), 2000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#E5D3B3] flex items-center justify-center p-6 font-serif">
      <form onSubmit={handleUpdatePassword} className="bg-[#FDF6E3] p-8 border-4 border-[#C5A059] shadow-2xl max-w-sm w-full">
        <h1 className="text-xl font-bold text-[#5C4033] mb-6 border-b border-[#C5A059] pb-2">修改使者密碼</h1>
        <input
          type="password"
          placeholder="輸入新密碼"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 bg-[#F9EFCF] border border-[#C5A059] mb-4"
          required
        />
        <button 
          disabled={loading}
          className="w-full bg-[#5C4033] text-[#FDF6E3] py-2 font-bold hover:bg-[#3D2B22]"
        >
          {loading ? '更新中...' : '確認變更'}
        </button>
        {message && <p className="mt-4 text-sm text-center text-[#8B5A2B]">{message}</p>}
      </form>
    </div>
  )
}