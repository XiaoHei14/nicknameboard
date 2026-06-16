'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client'
import Link from 'next/link'

export default function AdminPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSuper, setIsSuper] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function init() {
      // 1. 檢查權限 (透過 app_metadata)
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.app_metadata?.is_super_admin === true) {
        setIsSuper(true)
      }

      // 2. 獲取留言
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) console.error("無法讀取信件:", error)
      else setMessages(data || [])
      
      setIsLoading(false)
    }
    init()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const handleDelete = async (id: string) => {
    if (!confirm('確認要焚毀這封信件嗎？')) return;

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      alert('刪除失敗：' + error.message);
    } else {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  return (
    <div className='min-h-screen bg-[#E5D3B3] p-10 font-serif text-[#5C4033]'>
      <div className="text-center mb-8">
        <h1 className='text-3xl font-bold border-b border-[#C5A059] pb-4 mb-4'>
          使者收件匣
        </h1>
        
        {/* 操作選單 */}
        <div className="flex justify-center gap-6 text-sm">
          <button onClick={handleSignOut} className="text-[#8B5A2B] hover:text-[#5C4033] underline">
            [ 登出 ]
          </button>
          
          {/* 只有超級管理員顯示新增帳號連結 */}
          {isSuper && (
            <Link href="/admin/add-user" className="text-[#8B5A2B] hover:text-[#5C4033] underline font-bold">
              [ 新增使者帳號 ]
            </Link>
          )}
        </div>
      </div>

      <div className='max-w-2xl mx-auto'>
        {isLoading ? (
          <div className='text-center py-20'>
            <p className='text-[#C5A059] italic animate-pulse'>拆信中...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className='text-center py-20 border-2 border-dashed border-[#C5A059]/50 bg-[#FDF6E3]/50'>
            <p className='text-xl text-[#8B5A2B] italic mb-2'>目前尚無信件</p>
            <p className='text-sm text-[#C5A059]'>靜候飛鴿傳書...</p>
          </div>
        ) : (
          <div className='grid gap-6'>
            {messages.map((msg) => (
              <div key={msg.id} className='bg-[#FDF6E3] p-6 border-2 border-[#C5A059] shadow-md relative group'>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  className='absolute top-2 right-3 text-[#C5A059] hover:text-red-700 transition-colors'
                  title="焚毀信件"
                >
                  ✕
                </button>
                
                <div className="absolute top-2 left-3 text-[#C5A059] opacity-50">✦</div>
                
                <p className='text-sm text-[#C5A059] italic mb-2 pl-4'>來自：{msg.nickname}</p>
                <p className='leading-relaxed'>{msg.content}</p>
                <p className='text-[10px] text-right mt-4 opacity-50'>
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}