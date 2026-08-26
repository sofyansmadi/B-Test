/* ============================================================
   بوضوح — إعدادات الاتصال بـ Supabase
   ------------------------------------------------------------
   بدّلي القيمتين تحت بالقيم الحقيقية من لوحة تحكم Supabase:
   Settings → API → Project URL و anon public key.

   مفتاح anon آمن يظهر بالكود العام للموقع — هذا هو الغرض منه،
   والحماية الحقيقية موجودة على مستوى قاعدة البيانات نفسها
   (Row Level Security) لا في إخفاء هذا المفتاح.
   ============================================================ */

const SUPABASE_URL = 'https://vhsdhskynuwfloonjfec.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_x9K72kDpiGOXcCG2uNqXJg_I80x7-Mb';

const supabaseClient = (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'PASTE_YOUR_PROJECT_URL_HERE')
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

if (!supabaseClient) {
  console.warn('بوضوح: لسا ما تم إدخال بيانات Supabase الحقيقية في supabase-config.js — البيانات الحية (الباقات، الأدمن) لن تعمل حتى تُستبدل القيم.');
}
