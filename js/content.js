/* =====================================================================
   EDIT YOUR CONTENT HERE
   ---------------------------------------------------------------------
   PROJECTS: one entry per piece. Tabs are made from `cat`, in the order
   they first appear. Each entry has a `type`:
     "video": `video` (full, with sound, opens in the viewer), `loop` (short
              muted preview on the card) and `image` (poster).
     "image": `image` (card thumbnail) and `full` (large version for the viewer).
     "pdf":   `image` (cover) and `pages` (count). Pages are image files named
              like the cover plus -p01.webp, -p02.webp …
   `w`/`h` are the card thumbnail size, so the grid can keep each piece's shape.
   `title_ar` is the Arabic title. Tab names are translated in CATS_AR.
   Media lives in work/<category>/. Compress before adding (see CLAUDE.md).
   ===================================================================== */
const PROJECTS = [
  { title:"2D animation", title_ar:"رسوم متحركة 2D", cat:"Motion graphics", type:"video", image:"work/motion/2d-animation.webp", video:"work/motion/2d-animation.mp4", loop:"work/motion/2d-animation-loop.mp4", w:720, h:404 },
  { title:"Solar energy", title_ar:"الطاقة الشمسية", cat:"Motion graphics", type:"video", image:"work/motion/solar-energy.webp", video:"work/motion/solar-energy.mp4", loop:"work/motion/solar-energy-loop.mp4", w:720, h:404 },
  { title:"Mohsen & Hanan series intro", title_ar:"انترو حلقات محسن وحنان", cat:"Motion graphics", type:"video", image:"work/motion/mohsen-hanan-intro.webp", video:"work/motion/mohsen-hanan-intro.mp4", loop:"work/motion/mohsen-hanan-intro-loop.mp4", w:720, h:404 },
  { title:"Ismail's success story", title_ar:"قصة نجاح إسماعيل", cat:"Motion graphics", type:"video", image:"work/motion/ismail-success-story.webp", video:"work/motion/ismail-success-story.mp4", loop:"work/motion/ismail-success-story-loop.mp4", w:720, h:404 },
  { title:"Collage art · Bedaya", title_ar:"كولاج آرت · بداية", cat:"Motion graphics", type:"video", image:"work/motion/bedaya-collage.webp", video:"work/motion/bedaya-collage.mp4", loop:"work/motion/bedaya-collage-loop.mp4", w:720, h:720 },
  { title:"Bedaya reel", title_ar:"ريل بداية", cat:"Reels", type:"video", image:"work/reels/bedaya-3.webp", video:"work/reels/bedaya-3.mp4", loop:"work/reels/bedaya-3-loop.mp4", w:720, h:720 },
  { title:"Men's health · Bedaya", title_ar:"ذكورة · بداية", cat:"Reels", type:"video", image:"work/reels/bedaya-mens-health.webp", video:"work/reels/bedaya-mens-health.mp4", loop:"work/reels/bedaya-mens-health-loop.mp4", w:720, h:720 },
  { title:"Men's health · Bedaya 2", title_ar:"ذكورة · بداية 2", cat:"Reels", type:"video", image:"work/reels/mens-health-bedaya.webp", video:"work/reels/mens-health-bedaya.mp4", loop:"work/reels/mens-health-bedaya-loop.mp4", w:720, h:720 },
  { title:"Fakhr Al-Awani · Ramadan", title_ar:"فخر الأواني · رمضان", cat:"Reels", type:"video", image:"work/reels/fakhr-alawani-ramadan.webp", video:"work/reels/fakhr-alawani-ramadan.mp4", loop:"work/reels/fakhr-alawani-ramadan-loop.mp4", w:720, h:720 },
  { title:"Re7laty landing page", title_ar:"صفحة هبوط رحلتي", cat:"UI/UX", type:"pdf", image:"work/uiux/re7laty-landing.webp", pages:1, w:576, h:720 },
  { title:"Sumou landing page", title_ar:"صفحة هبوط سمو", cat:"UI/UX", type:"image", image:"work/uiux/sumou-landing.webp", full:"work/uiux/sumou-landing-full.webp", w:720, h:680 },
  { title:"Kitchen appliances", title_ar:"أجهزة المطبخ", cat:"Website banners", type:"image", image:"work/banners/kitchen-appliances.webp", full:"work/banners/kitchen-appliances-full.webp", w:720, h:404 },
  { title:"Best sellers", title_ar:"الأفضل مبيعًا", cat:"Website banners", type:"image", image:"work/banners/best-sellers.webp", full:"work/banners/best-sellers-full.webp", w:720, h:404 },
  { title:"Women's makeup", title_ar:"مكياج حريمي", cat:"Website banners", type:"image", image:"work/banners/womens-makeup.webp", full:"work/banners/womens-makeup-full.webp", w:720, h:318 },
  { title:"Men & women", title_ar:"رجالي وحريمي", cat:"Website banners", type:"image", image:"work/banners/men-women.webp", full:"work/banners/men-women-full.webp", w:720, h:318 },
  { title:"Home appliances", title_ar:"الأجهزة المنزلية", cat:"Website banners", type:"image", image:"work/banners/home-appliances.webp", full:"work/banners/home-appliances-full.webp", w:720, h:404 },
  { title:"Men's collection", title_ar:"رجالي", cat:"Website banners", type:"image", image:"work/banners/mens.webp", full:"work/banners/mens-full.webp", w:720, h:404 },
  { title:"Kahraman fabrics", title_ar:"كهرمان أقمشة", cat:"Website banners", type:"image", image:"work/banners/kahraman-fabrics.webp", full:"work/banners/kahraman-fabrics-full.webp", w:720, h:404 },
  { title:"Bedaya Hospital profile", title_ar:"بروفايل مستشفى بداية", cat:"Company profiles", type:"pdf", image:"work/profiles/bedaya-profile.webp", pages:11, w:720, h:514 },
  { title:"IPC brand guidelines", title_ar:"دليل هوية IPC", cat:"Company profiles", type:"pdf", image:"work/profiles/ipc-guidelines.webp", pages:19, w:720, h:508 },
  { title:"Sumou brochure", title_ar:"بروشور سمو", cat:"Company profiles", type:"pdf", image:"work/profiles/sumou-brochure.webp", pages:38, w:720, h:498 },
  { title:"Social media collection", title_ar:"مجموعة أعمال سوشيال ميديا", cat:"Social media", type:"pdf", image:"work/social/social-media-collection.webp", pages:17, w:720, h:540 },
  { title:"10,000 products, 800 brands", title_ar:"10000 منتج 800 براند", cat:"Social media", type:"image", image:"work/social/10000-products.webp", full:"work/social/10000-products-full.webp", w:720, h:720 },
  { title:"Borg Dawa", title_ar:"برج الدواء", cat:"Social media", type:"image", image:"work/social/borg-dawa-3.webp", full:"work/social/borg-dawa-3-full.webp", w:720, h:718 },
  { title:"Borg Dawa", title_ar:"برج الدواء", cat:"Social media", type:"image", image:"work/social/borg-dawa-4.webp", full:"work/social/borg-dawa-4-full.webp", w:720, h:718 },
  { title:"Borg Dawa", title_ar:"برج الدواء", cat:"Social media", type:"image", image:"work/social/borg-dawa-8.webp", full:"work/social/borg-dawa-8-full.webp", w:720, h:718 },
  { title:"Dalia Clinics", title_ar:"Dalia Clinics", cat:"Social media", type:"image", image:"work/social/dalia-clinics-15.webp", full:"work/social/dalia-clinics-15-full.webp", w:576, h:720 },
  { title:"Dalia Clinics", title_ar:"Dalia Clinics", cat:"Social media", type:"image", image:"work/social/dalia-clinics-6.webp", full:"work/social/dalia-clinics-6-full.webp", w:582, h:720 },
  { title:"Derma Point", title_ar:"Derma Point", cat:"Social media", type:"image", image:"work/social/derma-point.webp", full:"work/social/derma-point-full.webp", w:720, h:712 },
  { title:"Dr Zanon", title_ar:"Dr Zanon", cat:"Social media", type:"image", image:"work/social/dr-zanon-2.webp", full:"work/social/dr-zanon-2-full.webp", w:712, h:720 },
  { title:"Dr Zanon", title_ar:"Dr Zanon", cat:"Social media", type:"image", image:"work/social/dr-zanon-3.webp", full:"work/social/dr-zanon-3-full.webp", w:720, h:720 },
  { title:"Dr Zanon", title_ar:"Dr Zanon", cat:"Social media", type:"image", image:"work/social/dr-zanon-4.webp", full:"work/social/dr-zanon-4-full.webp", w:720, h:716 },
  { title:"Dr Zanon", title_ar:"Dr Zanon", cat:"Social media", type:"image", image:"work/social/dr-zanon-6.webp", full:"work/social/dr-zanon-6-full.webp", w:718, h:720 },
  { title:"Naya Saudi", title_ar:"Naya Saudi", cat:"Social media", type:"image", image:"work/social/naya-saudi.webp", full:"work/social/naya-saudi-full.webp", w:720, h:720 },
  { title:"Rehlaty app", title_ar:"تطبيق رحلتي", cat:"Social media", type:"image", image:"work/social/post-1.webp", full:"work/social/post-1-full.webp", w:720, h:720 },
  { title:"Rehlaty app", title_ar:"تطبيق رحلتي", cat:"Social media", type:"image", image:"work/social/post-2.webp", full:"work/social/post-2-full.webp", w:720, h:720 },
  { title:"Sumou", title_ar:"سمو", cat:"Social media", type:"image", image:"work/social/sumou.webp", full:"work/social/sumou-full.webp", w:720, h:720 },
  { title:"Soul Clinics", title_ar:"سول كلينكس", cat:"Social media", type:"image", image:"work/social/soul-clinics-1.webp", full:"work/social/soul-clinics-1-full.webp", w:720, h:616 },
  { title:"Soul Clinics", title_ar:"سول كلينكس", cat:"Social media", type:"image", image:"work/social/soul-clinics-14.webp", full:"work/social/soul-clinics-14-full.webp", w:720, h:614 },
  { title:"Soul Clinics", title_ar:"سول كلينكس", cat:"Social media", type:"image", image:"work/social/soul-clinics-17.webp", full:"work/social/soul-clinics-17-full.webp", w:578, h:720 },
  { title:"Soul Clinics", title_ar:"سول كلينكس", cat:"Social media", type:"image", image:"work/social/soul-clinics-22.webp", full:"work/social/soul-clinics-22-full.webp", w:720, h:610 },
  { title:"Soul Clinics", title_ar:"سول كلينكس", cat:"Social media", type:"image", image:"work/social/soul-clinics.webp", full:"work/social/soul-clinics-full.webp", w:576, h:720 },
  { title:"Tabby & Tamara", title_ar:"تابي وتمارا", cat:"Social media", type:"image", image:"work/social/tabby-tamara-2.webp", full:"work/social/tabby-tamara-2-full.webp", w:576, h:720 },
  { title:"Tabby & Tamara", title_ar:"تابي وتمارا", cat:"Social media", type:"image", image:"work/social/tabby-tamara.webp", full:"work/social/tabby-tamara-full.webp", w:576, h:720 },
  { title:"Dr. Ismail", title_ar:"دكتور إسماعيل", cat:"Social media", type:"image", image:"work/social/dr-ismail.webp", full:"work/social/dr-ismail-full.webp", w:720, h:720 },
  { title:"Championship maker", title_ar:"صانع البطولات", cat:"Social media", type:"image", image:"work/social/champion-maker-3.webp", full:"work/social/champion-maker-3-full.webp", w:720, h:720 },
  { title:"Championship maker", title_ar:"صانع البطولات", cat:"Social media", type:"image", image:"work/social/champion-maker-4.webp", full:"work/social/champion-maker-4-full.webp", w:720, h:720 },
  { title:"Championship maker", title_ar:"صانع البطولات", cat:"Social media", type:"image", image:"work/social/champion-maker-5.webp", full:"work/social/champion-maker-5-full.webp", w:720, h:720 },
  { title:"Perfume", title_ar:"عطر", cat:"Social media", type:"image", image:"work/social/perfume.webp", full:"work/social/perfume-full.webp", w:576, h:720 },
  { title:"Perfume", title_ar:"عطر", cat:"Social media", type:"image", image:"work/social/perfume-2.webp", full:"work/social/perfume-2-full.webp", w:576, h:720 },
  { title:"Mother's Day · Bedaya", title_ar:"عيد الأم · بداية", cat:"Social media", type:"image", image:"work/social/mothers-day-bedaya.webp", full:"work/social/mothers-day-bedaya-full.webp", w:720, h:720 },
  { title:"Fast Booking Travel", title_ar:"فاست بوكينج ترافيل", cat:"Social media", type:"image", image:"work/social/fast-booking-travel.webp", full:"work/social/fast-booking-travel-full.webp", w:720, h:720 },
  { title:"Mirage perfume notes", title_ar:"مكونات عطر ميراج", cat:"Social media", type:"image", image:"work/social/mirage-perfume.webp", full:"work/social/mirage-perfume-full.webp", w:720, h:720 },
  { title:"Video edit 1", title_ar:"مونتاج 1", cat:"Video editing", type:"video", image:"work/video/edit-1.webp", video:"work/video/edit-1.mp4", loop:"work/video/edit-1-loop.mp4", w:720, h:720 },
  { title:"Video edit 2", title_ar:"مونتاج 2", cat:"Video editing", type:"video", image:"work/video/edit-2.webp", video:"work/video/edit-2.mp4", loop:"work/video/edit-2-loop.mp4", w:404, h:720 },
  { title:"Video edit 3", title_ar:"مونتاج 3", cat:"Video editing", type:"video", image:"work/video/edit-3.webp", video:"work/video/edit-3.mp4", loop:"work/video/edit-3-loop.mp4", w:404, h:720 },
  { title:"“One step ahead” campaign", title_ar:"حملة سبقتك بخطوة", cat:"AI productions", type:"video", image:"work/ai/one-step-ahead.webp", video:"work/ai/one-step-ahead.mp4", loop:"work/ai/one-step-ahead-loop.mp4", w:720, h:720 },
  { title:"AI videos on Behance", title_ar:"فيديوهات AI على Behance", cat:"AI productions", type:"video", image:"work/ai/ai-videos-behance.webp", video:"work/ai/ai-videos-behance.mp4", loop:"work/ai/ai-videos-behance-loop.mp4", w:422, h:720 },
  { title:"Hajj Noaman", title_ar:"حج نعمان", cat:"AI productions", type:"video", image:"work/ai/hajj-noaman.webp", video:"work/ai/hajj-noaman.mp4", loop:"work/ai/hajj-noaman-loop.mp4", w:720, h:720 },
  { title:"Bakz ad", title_ar:"إعلان باكز", cat:"AI productions", type:"video", image:"work/ai/bakz-ad.webp", video:"work/ai/bakz-ad.mp4", loop:"work/ai/bakz-ad-loop.mp4", w:720, h:520 },
  { title:"Paris Corner New Year ad", title_ar:"إعلان ركن باريس رأس السنة", cat:"AI productions", type:"video", image:"work/ai/paris-corner-new-year.webp", video:"work/ai/paris-corner-new-year.mp4", loop:"work/ai/paris-corner-new-year-loop.mp4", w:720, h:720 },
  { title:"Jouri video", title_ar:"فيديو جوري", cat:"AI productions", type:"video", image:"work/ai/jouri.webp", video:"work/ai/jouri.mp4", loop:"work/ai/jouri-loop.mp4", w:720, h:520 },
  { title:"Mother's Day", title_ar:"عيد الأم", cat:"AI productions", type:"video", image:"work/ai/mothers-day.webp", video:"work/ai/mothers-day.mp4", loop:"work/ai/mothers-day-loop.mp4", w:720, h:720 },
  { title:"E-learning concepts", title_ar:"أفكار تعليم إلكتروني", cat:"E-learning", type:"pdf", image:"work/elearning/elearning-concepts.webp", pages:13, w:720, h:406 }
];

/* Arabic names for the project tabs (keys must match `cat` above). */
const CATS_AR = {
  "Motion graphics":"موشن جرافيك", "Reels":"ريلز", "UI/UX":"واجهات UI/UX", "Website banners":"بنرات مواقع",
  "Company profiles":"بروفايل شركات", "Social media":"سوشيال ميديا", "Video editing":"مونتاج فيديو",
  "AI productions":"إنتاج بالذكاء الاصطناعي", "E-learning":"تعليم إلكتروني"
};

/* EXPERIENCE: newest first, as on the CV. `what` describes the work, based on the portfolio pieces made for
   each company (see the Selected work tabs). Leave `what` empty ("") when there's nothing confirmed to say. */
const JOBS = [
  { from:"2025", to:"Now", name:"Paris Corner", type:"Full-time",
    what:"Website banners, social media posts and AI-produced video ads for this Saudi online store: perfume, fashion and home appliance campaigns, plus seasonal ones like New Year.",
    what_ar:"بنرات الموقع ومنشورات السوشيال ميديا وإعلانات فيديو بالذكاء الاصطناعي لهذا المتجر السعودي الإلكتروني: حملات العطور والأزياء والأجهزة المنزلية، وحملات المواسم مثل رأس السنة." },
  { from:"2024", to:"Now", name:"Sumou", type:"Full-time",
    what:"Saudi marketing agency. Designed the Sumou landing page, the company brochure and social media posts.",
    what_ar:"وكالة تسويق سعودية. صممت صفحة الهبوط والبروشور التعريفي ومنشورات السوشيال ميديا لسمو." },
  { from:"2023", to:"Now", name:"Bedaya Hospital", type:"Part-time",
    what:"The hospital's company profile, motion graphics and reels for its health campaigns, social media posts, and AI-produced awareness videos.",
    what_ar:"البروفايل التعريفي للمستشفى، وموشن جرافيك وريلز لحملاتها الصحية، ومنشورات السوشيال ميديا، وفيديوهات توعوية بالذكاء الاصطناعي." },
  { from:"2023", to:"2024", name:"Delawy", type:"Full-time", what:"Saudi app.", what_ar:"تطبيق سعودي." },
  { from:"2023", to:"2024", name:"Egyptian Saudi Academy", type:"Part-time", what:"", what_ar:"" },
  { from:"2021", to:"2023", name:"Skillsbank", type:"Part-time", what:"Online courses.", what_ar:"كورسات أونلاين." },
  { from:"2020", to:"2021", name:"Dosor", type:"", what:"", what_ar:"" },
  { from:"2019", to:"Now", name:"Nahdet Misr Publishing House", type:"", what:"Educational publisher.", what_ar:"دار نشر تعليمية." },
  { from:"2018", to:"2019", name:"Infort", type:"", what:"", what_ar:"" }
];

/* SKILLS: values are the bar lengths from the CV (0–100). LANGS: [name, value, Arabic name]. */
const TOOLS = [["Illustrator",93],["Photoshop",83],["After Effects",79],["Adobe XD / Figma",54],["Premiere",48],["InDesign",36]];
const LANGS = [["English",90,"الإنجليزية"],["Français",62,"الفرنسية"],["Türkçe",36,"التركية"]];

/* =====================================================================
   ARABIC TEXT for the page. The English text lives in index.html
   (elements with data-i18n="key"); this is the Arabic for each key.
   Keep any HTML tags (<br>, <span class="hl">, <strong>) as they are.
   ===================================================================== */
const AR = {
  "meta.title": "أنس الشرقاوي · مصمم جرافيك ورسّام رسوم متحركة 2D",
  "meta.desc": "مصمم جرافيك أول ورسّام رسوم متحركة ثنائية الأبعاد في القاهرة. موشن جرافيك، هوية بصرية، تصميم سوشيال ميديا، ورسومات للتعليم الإلكتروني.",

  "nav.mark": "أنس الشرقاوي، العودة إلى الأعلى",
  "nav.markText": "أنس",
  "nav.work": "أعمالي",
  "nav.services": "خدماتي",
  "nav.experience": "خبراتي",
  "nav.skills": "مهاراتي",
  "nav.talk": "لنتحدث",

  "hero.title": "أرسمها.<br>ثم أجعلها <span class=\"hl\">تتحرك.</span>",
  "hero.lede": "مصمم جرافيك أول ورسّام رسوم متحركة ثنائية الأبعاد في القاهرة. منذ ست سنوات أحوّل الأفكار إلى شخصيات وهويات بصرية وحركة لناشري المحتوى التعليمي الإلكتروني ووكالات التسويق السعودية.",
  "hero.seeWork": "شاهد أعمالي",
  "hero.behance": "حسابي على Behance",
  "hero.bubble": "<strong>أهلًا، أنا أنس الشرقاوي.</strong> مصمم جرافيك ورسّام رسوم متحركة ثنائية الأبعاد. أخبرني بالفكرة وسأمنحها شكلًا وصوتًا وحركة.",
  "hero.alt": "بورتريه مرسوم لأنس بأسلوب low-poly وهو ينظر إلى الأعلى",

  "about.title": "نبذة عني",
  "about.text": "أصنع محتوى بصريًا هدفه أن يُعلّم أو يبيع: دروس متحركة، وشخصيات، وهويات بصرية، وحملات على السوشيال ميديا. أبدأ مما يحتاج العميل أن يفهمه جمهوره، ثم أصمم وأحرّك حتى تصبح الفكرة واضحة ولا تُنسى.",
  "about.f1": "خبرة أكثر من 6 سنوات",
  "about.f2": "التعليم الإلكتروني والتسويق",
  "about.f3": "أساسيات UI/UX",
  "about.f4": "أتحدث الإنجليزية والفرنسية والتركية",
  "about.f5": "مقيم في المهندسين، القاهرة",

  "svc.title": "ماذا يمكنني أن أقدّم لك",
  "svc.lede": "أربعة أنواع من العمل أتولاها غالبًا، من منشور واحد على السوشيال ميديا إلى كورس متحرك كامل.",
  "svc.s1.h": "رسوم متحركة 2D وموشن جرافيك",
  "svc.s1.p": "فيديوهات شرح، وتحريك شخصيات، وشعارات متحركة، وأعمال موشن للإعلانات والدروس.",
  "svc.s2.h": "الهوية البصرية",
  "svc.s2.p": "شعارات، وأنظمة ألوان وخطوط، وأدلة هوية تبقى متسقة في المطبوعات وعلى الشاشات.",
  "svc.s3.h": "تصميم السوشيال ميديا",
  "svc.s3.p": "تصاميم حملات، وقوالب منشورات وستوري، وإعلانات موشن قصيرة لعلامات تجارية في مصر والخليج.",
  "svc.s4.h": "رسومات التعليم الإلكتروني",
  "svc.s4.p": "شخصيات ورسومات ومحتوى متحرك للكورسات والناشرين التعليميين.",

  "work.title": "أعمال مختارة",
  "work.lede": "بعض المشاريع في التعليم الإلكتروني والهوية البصرية والتسويق. دراسات الحالة الكاملة على Behance.",
  "work.tabs": "أقسام المشاريع",
  "work.video": "فيديو",
  "work.page": "صفحة",
  "work.pages": "صفحة",
  "work.prev": "المشروع السابق",
  "work.next": "المشروع التالي",
  "work.close": "إغلاق",
  "work.more": "شاهد كل المشاريع على Behance",
  "work.drive": "البورتفوليو كامل على Google Drive",
  "work.placeholder": "أضف صورة مصغرة أو فيديو",

  "exp.title": "أين عملت",
  "exp.lede": "ناشرون وأكاديميات ومستشفى ووكالات تسويق في مصر والسعودية.",
  "exp.now": "حتى الآن",
  "exp.Full-time": "دوام كامل",
  "exp.Part-time": "دوام جزئي",

  "skills.tools": "الأدوات",
  "skills.langs": "اللغات",
  "skills.outOf": "من 100",

  "contact.title": "عندك مشروع؟<br>لنتحدث.",
  "contact.text": "أرسل لي وصفًا مختصرًا: ما الذي تحتاجه، ومتى تحتاجه، وأين سيُستخدم. عادةً أرد خلال يوم.",
  "contact.email": "البريد الإلكتروني",
  "contact.phone": "واتساب / هاتف",
  "contact.portfolio": "معرض الأعمال",

  "footer.name": "أنس الشرقاوي",
  "footer.tagline": "مصمم جرافيك ورسّام رسوم متحركة ثنائية الأبعاد في القاهرة، مصر",

  "ui.toDark": "التبديل إلى الوضع الداكن",
  "ui.toLight": "التبديل إلى الوضع الفاتح"
};
