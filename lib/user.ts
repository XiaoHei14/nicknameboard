'use server'
import { createClient } from '@supabase/supabase-js'

export async function createAdminUserAction(email: string, password: string, isSuper: boolean) {  // 檢查環境變數是否存在
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("缺少環境變數");
    return { error: { message: "伺服器配置錯誤" } };
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      app_metadata: { is_super_admin: isSuper }
    })

    if (error) return { error }
    return { data }
  } catch (err) {
    console.error("Action Execution Error:", err);
    return { error: { message: "伺服器內部錯誤" } };
  }
}