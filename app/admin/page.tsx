'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/client'
import Link from 'next/link'
import { toPng } from 'html-to-image'


export default function AdminPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSuper, setIsSuper] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.app_metadata?.is_super_admin === true) {
        setIsSuper(true)
      }

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

    const handleDownload = async (id: string) => {
    try {
        const element = document.getElementById(`msg-${id}`);

        if (!element) return;

        const actions = element.querySelector('.card-actions') as HTMLElement;

        if (actions) {
        actions.style.display = 'none';
        }

        const dataUrl = await toPng(element, {
        pixelRatio: 2,
        backgroundColor: '#FDF6E3',
        });

        if (actions) {
        actions.style.display = '';
        }

        const link = document.createElement('a');
        link.download = `正義之聲_信件_${id}.png`;
        link.href = dataUrl;
        link.click();
    } catch (e) {
        console.error(e);
    }
    };
  return (
    <div className='min-h-screen bg-[#E5D3B3] p-10 font-serif text-[#5C4033]'>
      <div className="text-center mb-8">
        <h1 className='text-3xl font-bold border-b border-[#C5A059] pb-4 mb-4'>使者收件匣</h1>
        <div className="flex justify-center gap-6 text-sm">
          <button onClick={handleSignOut} className="text-[#8B5A2B] hover:text-[#5C4033] underline">[ 登出 ]</button>
          {isSuper && (
            <Link href="/admin/add-user" className="text-[#8B5A2B] hover:text-[#5C4033] underline font-bold">[ 新增使者帳號 ]</Link>
          )}
        </div>
      </div>

      <div className='max-w-2xl mx-auto'>
        {isLoading ? (
          <div className='text-center py-20 italic text-[#C5A059]'>拆信中...</div>
        ) : messages.length === 0 ? (
          <div className='text-center py-20 border-2 border-dashed border-[#C5A059]/50 bg-[#FDF6E3]/50'>
            <p className='text-xl text-[#8B5A2B] italic mb-2'>目前尚無信件</p>
          </div>
        ) : (
          <div className='grid gap-8'>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                id={`msg-${msg.id}`}
                className='bg-[#FDF6E3] p-8 border-[3px] border-[#C5A059] shadow-xl relative group'
              >
                {/* 裝飾圖示 */}
                <div className="absolute top-3 left-3 text-[#C5A059] opacity-30">✦</div>
                
                {/* 管理動作區 */}
                <div className="card-actions absolute top-2 right-3 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDownload(msg.id)} className="text-[#C5A059] hover:text-[#5C4033] font-bold text-xs underline">存為卡片</button>
                  <button onClick={() => handleDelete(msg.id)} className='text-[#C5A059] hover:text-red-700 font-bold text-xs'>✕ 焚毀</button>
                </div>
                
                <p className='text-sm text-[#C5A059] italic mb-4 border-b border-[#C5A059]/30 pb-2 pl-6'>來自：{msg.nickname}</p>
                <p className='leading-relaxed text-lg text-[#5C4033] whitespace-pre-wrap'>{msg.content}</p>
                <p className='text-[10px] text-right mt-6 opacity-40'>
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