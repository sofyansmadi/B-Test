/* ============================================================
   بوضوح — Web Components مشتركة (nav + footer).
   ------------------------------------------------------------
   هذا الملف يُعرّف عنصرين مخصّصين (Custom Elements) أصليين في
   المتصفح، بدون أي مكتبة أو أداة بناء (build tool):

     <site-nav active="blog"></site-nav>
     <site-footer></site-footer>
     <site-footer variant="rich"></site-footer>   (تستخدم في index.html فقط)

   لماذا Web Components وليس مجرد تضمين HTML (fetch)؟
   - المحتوى يُبنى مباشرة داخل الصفحة نفسها (Light DOM)، فما في
     تأخير تحميل أو "ومضة" قبل ظهور الهيدر/الفوتر.
   - كل صفحة تستخدم وسم HTML واحد بسيط بدل عشرات الأسطر المكررة.
   - لاحقاً، لما نربط قاعدة بيانات حقيقية (Supabase مثلاً)، هذا
     بالضبط المكان اللي بيسهل فيه ربط بيانات حيّة: بدل ما تكون
     الروابط والنصوص مكتوبة يدوياً بالأسفل، ممكن تُجلب من قاعدة
     البيانات داخل دالة render() لكل عنصر — الصفحات نفسها ما
     بتحتاج تتغيّر، لأنها أصلاً بتستخدم <site-nav> و<site-footer>
     فقط ولا تعرف كيف يُبنى المحتوى بداخلهما.

   لإضافة مكوّن جديد مستقبلاً (مثل <pricing-cards> أو
   <article-grid>): انسخي نفس النمط بالأسفل — صنف يمتد HTMLElement،
   ودالة render() تحدد innerHTML، ثم customElements.define(...).
   ============================================================ */

class SiteNav extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const links = [
      { href: 'index.html#pillars', label: 'المواضيع', key: '' },
      { href: 'blog.html', label: 'المدونة', key: 'blog' },
      { href: 'quizzes.html', label: 'الاختبارات', key: 'quizzes' },
      { href: 'ai.html', label: 'بوضوح AI', key: 'ai' },
      { href: 'about.html', label: 'من نحن', key: 'about' },
    ];

    const linksHtml = links.map(l => {
      const cls = l.key && l.key === active ? ' class="active"' : '';
      return `<a href="${l.href}"${cls}>${l.label}</a>`;
    }).join('\n      ');

    this.innerHTML = `
    <div class="wrap">
      <a href="index.html" class="brand">بوضوح<span>.</span></a>
      <div class="nav-links">
        ${linksHtml}
        <a href="sales-page.html" class="nav-cta">احجز استشارة</a>
      </div>
    </div>`;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const variant = this.getAttribute('variant') || 'simple';

    if (variant === 'rich') {
      this.innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="brand kufi" style="font-size:20px;">بوضوح<span style="color:var(--clarity);">.</span></span>
          <p>محتوى توعوي حول العلاقات وأنماط الشخصية، باللغة العربية، لكل من يريد أن يرى علاقته بوضوح أكبر.</p>
        </div>
        <div class="footer-col">
          <h4>الموقع</h4>
          <a href="index.html#pillars">المواضيع</a>
          <a href="blog.html">المدونة</a>
          <a href="ai.html">بوضوح AI</a>
          <a href="quizzes.html">الاختبارات</a>
          <a href="about.html">من نحن</a>
          <a href="sales-page.html">احجز استشارة</a>
        </div>
        <div class="footer-col">
          <h4>تواصل</h4>
          <a href="https://instagram.com" target="_blank" rel="noopener">إنستغرام</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener">تيك توك</a>
          <a href="contact.html">راسلنا</a>
        </div>
        <div class="footer-col">
          <h4>قانوني</h4>
          <a href="terms.html">شروط الاستخدام</a>
          <a href="privacy.html">سياسة الخصوصية</a>
        </div>
      </div>
      <p class="footer-bottom">©Bewodouh 2026 بوضوح — كل المحتوى توعوي وليس بديلاً عن استشارة أو علاج نفسي مختص.</p>
    </div>`;
      return;
    }

    this.innerHTML = `
    <div class="wrap">
      <span class="brand kufi">بوضوح<span style="color:var(--clarity);">.</span></span>
      محتوى توعوي حول العلاقات وأنماط الشخصية، باللغة العربية، لكل من يريد أن يرى علاقته بوضوح أكبر.
      <div style="margin-top:18px; display:flex; gap:20px; justify-content:center; flex-wrap:wrap; font-size:12.5px;">
        <a href="index.html" style="color:var(--text-muted-dark);">الرئيسية</a>
        <a href="blog.html" style="color:var(--text-muted-dark);">المدونة</a>
        <a href="quizzes.html" style="color:var(--text-muted-dark);">الاختبارات</a>
        <a href="ai.html" style="color:var(--text-muted-dark);">بوضوح AI</a>
        <a href="about.html" style="color:var(--text-muted-dark);">من نحن</a>
        <a href="sales-page.html" style="color:var(--text-muted-dark);">احجز استشارة</a>
        <a href="terms.html" style="color:var(--text-muted-dark);">شروط الاستخدام</a>
        <a href="privacy.html" style="color:var(--text-muted-dark);">سياسة الخصوصية</a>
      </div>
    </div>`;
  }
}

customElements.define('site-nav', SiteNav);
customElements.define('site-footer', SiteFooter);
