'use client'
import { useState, useRef } from 'react'
import gsap from 'gsap'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSending, setIsSending] = useState(false); // 新增：防止重複點擊
  const cardRef = useRef(null);

  const handleSend = async () => {
    if (!message.trim()) return alert("請寫下您的訊息");
    
    setIsSending(true);

    // 1. 寫入 Supabase
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

    // 2. 寫入成功，執行動畫
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      opacity: 0,
      y: -100,
      duration: 0.6,
      ease: "power2.in",
    })
    .call(() => {
      setMessage('');
      setNickname('');
      setIsSending(false);
    })
    .set(cardRef.current, { y: 100 })
    .to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  return (
    <div className='min-h-screen bg-[#E5D3B3] flex items-center justify-center p-6 font-serif'>
      <div 
        ref={cardRef} 
        className='bg-[#FDF6E3] border-4 border-[#C5A059] border-double shadow-2xl p-10 max-w-lg w-full relative'
      >
        <div className="absolute top-2 left-2 text-[#C5A059]">✦</div>
        <div className="absolute bottom-2 right-2 text-[#C5A059]">✦</div>

        <h1 className='text-2xl font-bold text-[#5C4033] mb-6 text-center pb-4'>
        忠信靠杯板
        </h1>
        <h1 className='text-2xl font-bold text-[#5C4033] mb-6 text-center border-b-2 border-[#C5A059]/30 pb-4'>
          <input 
            type="text"
            placeholder="您的署名(非強制)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full bg-transparent text-center focus:outline-none placeholder-[#C5A059]/60"
          />
        </h1>
        
        <div className='text-[#5C4033] leading-relaxed space-y-4 italic'>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="請在此處留下您的訊息..."
            className="w-full h-40 p-4 bg-[#F9EFCF]/30 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#C5A059]/30 transition-all duration-300"
          />

          <div className="flex justify-end items-center mt-6">
            <button 
              onClick={handleSend}
              disabled={isSending}
              className="bg-[#5C4033] text-[#FDF6E3] px-8 py-2 rounded-sm hover:bg-[#3D2B22] transition-all font-sans font-bold shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSending ? '寄送中...' : '封蠟寄出'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}