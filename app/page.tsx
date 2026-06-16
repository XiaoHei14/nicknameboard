'use client'
import { useState, useRef } from 'react'
import gsap from 'gsap'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // 新增狀態：控制確認視窗
  const cardRef = useRef(null);

  const handleSend = async () => {
    setIsSending(true);
    setShowConfirm(false); // 關閉彈窗

    const { error } = await supabase
      .from('comments')
      .insert([{ 
        nickname: nickname || '無名使者', 
        content: message 
      }]);

    if (error) {
      alert("信件在途中迷失了...");
      console.error(error);
      setIsSending(false);
      return;
    }

    const tl = gsap.timeline();
    tl.to(cardRef.current, { opacity: 0, y: -100, duration: 0.6, ease: "power2.in" })
      .call(() => { setMessage(''); setNickname(''); setIsSending(false); })
      .set(cardRef.current, { y: 100 })
      .to(cardRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
  };

  return (
    <div className='min-h-screen bg-[#E5D3B3] flex items-center justify-center p-6 font-serif relative'>
      {/* 你的原始 UI 卡片保持不變 */}
      <div ref={cardRef} className='bg-[#FDF6E3] border-4 border-[#C5A059] border-double shadow-2xl p-10 max-w-lg w-full relative'>
        {/* ... (內容保持不變) ... */}
        <h1 className='text-2xl font-bold text-[#5C4033] mb-6 text-center pb-4'>正義之聲</h1>
        <h1 className='text-2xl font-bold text-[#5C4033] mb-6 text-center border-b-2 border-[#C5A059]/30 pb-4'>
          <input type="text" placeholder="您的署名(非強制)" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full bg-transparent text-center focus:outline-none placeholder-[#C5A059]/60" />
        </h1>
        <div className='text-[#5C4033] leading-relaxed space-y-4 italic'>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="請在此處留下您的訊息..." className="w-full h-40 p-4 bg-[#F9EFCF]/30 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 transition-all duration-300" />
          <div className="flex justify-end items-center mt-6">
            <button 
              onClick={() => { if(!message.trim()) return alert("請寫下您的訊息"); setShowConfirm(true); }}
              disabled={isSending}
              className="bg-[#5C4033] text-[#FDF6E3] px-8 py-2 rounded-sm hover:bg-[#3D2B22] transition-all font-sans font-bold shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSending ? '寄送中...' : '封蠟寄出'}
            </button>
          </div>
        </div>
      </div>

      {/* 新增：確認彈窗 (僅在 showConfirm 為 true 時顯示) */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-6 z-50">
          <div className="bg-[#FDF6E3] p-6 border-2 border-[#C5A059] max-w-sm w-full shadow-2xl text-center">
            <div className="mb-6">
              <p className="text-[#5C4033] mb-6">確認要封蠟寄出這份訊息嗎？請確保已閱讀並同意 <a href="/terms" target="_blank" className="underline font-bold">服務條款</a>。</p>
              <p>• 內容嚴禁誹謗、恐嚇或惡意造謠。</p>
              <p>• 本站非官方單位，發言需自負法律責任。</p>
              <p>• 匿名非法律豁免，違法將配合司法調查。</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setShowConfirm(false)} className="flex-1 py-2 border border-[#5C4033] text-[#5C4033]">取消</button>
              <button onClick={handleSend} className="flex-1 py-2 bg-[#5C4033] text-[#FDF6E3]">確認寄出</button>
            </div>
          </div>
        </div>
      )}

      <footer className="absolute bottom-4 w-full text-center text-[#5C4033]/60 text-xs">
        <p className="mb-1">寄出訊息即表示您已閱讀並同意<a href="/terms" target='_blank' className="underline hover:text-[#5C4033] ml-1">《使用者服務條款》</a><a href='/privacy' target="_blank" className="underline hover:text-[#5C4033] ml-1">《隱私權政策》</a></p>
        <p>© 2026 正義之聲工作室</p>
      </footer>
    </div>
  )
}