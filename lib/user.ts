// app/actions/user.ts
'use server'
import { createClient } from '@supabase/supabase-js'

// 使用 Service Role Key 才能進行管理操作
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
)

export async function createAdminUserAction(email: string, password: string, isAdmin: boolean) {
  // 1. 獲取當前呼叫者的 Session (注意：這裡的 createClient 應指向你的 server 版 client)
  // 建議使用你專案 lib/supabase/server.ts 裡定義的 client 邏輯
  const { data: { user } } = await supabaseAdmin.auth.getUser(); 

  const isSuper = user?.app_metadata?.is_super_admin === true;
  if (!isSuper) {
    throw new Error("你沒有權限建立新的使者");
  }

  // 2. 根據需求判斷是否給予超級管理員權限
  const app_metadata = isAdmin ? { is_super_admin: true } : {};

  // 3. 建立使用者
  return await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    app_metadata,
    email_confirm: true,
  });
}