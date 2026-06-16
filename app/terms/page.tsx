import LegalLayout from '@/app/components/LegalLayout'

export default function TermsPage() {
  return (
    <LegalLayout title="正義之聲 - 使用者服務條款">
      <p className="text-sm text-right mb-8 italic">最後更新日期：2026年6月16日</p>
      
      <section>
        <h2 className="font-bold text-xl mb-2">1. 網站性質宣告</h2>
        <p>本網站為獨立經營之言論交流平台，與相關學校或教育機構並無官方隸屬關係，亦不代表校方立場。</p>
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">2. 使用者行為規範</h2>
        <p>使用者在發表言論時，應遵守下列原則，若有違反，本工作室有權採取刪除、屏蔽或封鎖等必要處理：</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>禁止違法行為：</strong>嚴禁發布任何違反法律、恐嚇、誹謗、公然侮辱或侵害他人名譽之文字。</li>
          <li><strong>禁止造謠：</strong>嚴禁散布未經查證之不實資訊 (Fake News) 或惡意造謠。</li>
          <li><strong>遵守公序良俗：</strong>禁止發布色情、暴力、仇恨言論或任何違反善良風俗之內容。</li>
          <li><strong>法律責任：</strong>本版雖提供匿名功能，但「匿名」不代表具備法律豁免權。對於涉及司法訴訟之案件，本工作室將配合法律規定提供相關存取紀錄。</li>
        </ul>
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">3. 管理權限</h2>
        <p>本工作室擁有對平台上所有貼文及留言之最終審核、篩選、修改及刪除權。若言論經判定不符合版規，將直接處置，恕不另行通知。</p>
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">4. 免責聲明</h2>
        <p>本版所有文章與留言均為發文者個人立場，不代表本版工作室及相關學校之立場。對於使用者個人之發言行為及其所造成之法律責任，本工作室不負任何連帶責任。</p>
      </section>
    </LegalLayout>
  )
}