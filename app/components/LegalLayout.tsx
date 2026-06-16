import Link from 'next/link'

export default function LegalLayout({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#E5D3B3] p-6 md:p-10 font-serif text-[#5C4033]">
      <div className="max-w-3xl mx-auto bg-[#FDF6E3] p-8 md:p-12 border-2 border-[#C5A059] shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-center border-b border-[#C5A059] pb-4">
          {title}
        </h1>
        <div className="leading-relaxed space-y-6">
          {children}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-[#8B5A2B] underline hover:opacity-70">返回首頁</Link>
        </div>
      </div>
    </div>
  )
}