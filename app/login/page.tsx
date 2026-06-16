'use client' // 必須在最上方
import { useState } from 'react'
import { createClient } from '@/lib/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert("身分驗證失敗：" + error.message)
    } else {
      window.location.href = '/admin' // 登入成功後跳轉至首頁
    }
  }

  return (
    <div className="min-h-screen bg-[#E5D3B3] flex items-center justify-center p-6 font-serif">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#FDF6E3] p-8 border-2 border-[#5C4033] shadow-xl">
        <h1 className="text-2xl font-bold text-[#5C4033] mb-6 text-center">使者認證</h1>
        
        <input 
          type="email" 
          placeholder="信箱" 
          className="w-full p-2 mb-4 bg-transparent border-b border-[#C5A059] focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="密碼" 
          className="w-full p-2 mb-6 bg-transparent border-b border-[#C5A059] focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" className="w-full bg-[#5C4033] text-[#FDF6E3] py-2 font-bold hover:bg-[#3D2B22]">
          開啟信函管理
        </button>
      </form>
    </div>
  )
}