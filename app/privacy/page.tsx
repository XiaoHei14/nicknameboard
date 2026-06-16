import LegalLayout from '@/app/components/LegalLayout'

export default function PrivacyPage() {
  return (
    <LegalLayout title="隱私權政策">
      <section>
        <h2 className="font-bold text-xl mb-2">1. 資料收集</h2>
        <p>本版採最小化收集原則，僅記錄必要的連線資訊（如 IP、時間）以供網站防護及防堵惡意攻擊使用。</p>
      </section>
      <section>
        <h2 className="font-bold text-xl mb-2">2. 資料揭露</h2>
        <p>除收到司法機關依法開立之正式公文外，我們不會主動向任何第三方洩漏您的個人識別資訊。</p>
      </section>
      <section>
        <h2 className="font-bold text-xl mb-2">3. 匿名性警告</h2>
        <p>若言論觸犯刑法（如妨害名譽），本工作室將配合執法機關提供必要之技術數據，以協助還原事實。</p>
      </section>
    </LegalLayout>
  )
}