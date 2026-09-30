/* =====================================================================
   EDIT YOUR CONTENT HERE
   ---------------------------------------------------------------------
   PROJECTS: add a thumbnail as `image` (jpg/png/webp) or a short looping
   `video` (mp4). Put the files next to index.html, e.g. "work/logo.mp4".
   `link` is where the card opens (usually the Behance case study).
   `wide: true` makes a card twice as wide. Use it for your best piece.
   `title_ar` is the Arabic title. Category names are translated in CATS_AR.
   ===================================================================== */
const PROJECTS = [
  { title:"Animated lesson series", title_ar:"سلسلة دروس متحركة", cat:"E-learning", wide:true, video:"", image:"", link:"https://www.behance.net/AnasSkills" },
  { title:"Brand identity", title_ar:"هوية بصرية", cat:"Branding", video:"", image:"", link:"https://www.behance.net/AnasSkills" },
  { title:"Social media campaign", title_ar:"حملة سوشيال ميديا", cat:"Social media", video:"", image:"", link:"https://www.behance.net/AnasSkills" },
  { title:"Character design set", title_ar:"مجموعة تصميم شخصيات", cat:"E-learning", video:"", image:"", link:"https://www.behance.net/AnasSkills" },
  { title:"App explainer video", title_ar:"فيديو شرح لتطبيق", cat:"Animation", wide:true, video:"", image:"", link:"https://www.behance.net/AnasSkills" },
  { title:"Logo animation", title_ar:"شعار متحرك", cat:"Animation", video:"", image:"", link:"https://www.behance.net/AnasSkills" }
];

/* Arabic names for the project categories (keys must match `cat` above). */
const CATS_AR = { "All":"الكل", "E-learning":"تعليم إلكتروني", "Branding":"هوية بصرية", "Social media":"سوشيال ميديا", "Animation":"رسوم متحركة" };

/* EXPERIENCE: newest first. Replace each `what` (and `what_ar`) with one line on what you did there. */
const JOBS = [
  { from:"2025", to:"Now", name:"Paris Corner", type:"Full-time", what:"Saudi marketing agency. Add one line on your role.", what_ar:"وكالة تسويق سعودية. أضف سطرًا عن دورك." },
  { from:"2024", to:"Now", name:"Sumou", type:"Full-time", what:"Saudi marketing agency. Add one line on your role.", what_ar:"وكالة تسويق سعودية. أضف سطرًا عن دورك." },
  { from:"2023", to:"Now", name:"Bedaya Hospital", type:"Part-time", what:"Add one line on your role.", what_ar:"أضف سطرًا عن دورك." },
  { from:"2023", to:"2024", name:"Delawy", type:"Full-time", what:"Saudi app. Add one line on your role.", what_ar:"تطبيق سعودي. أضف سطرًا عن دورك." },
  { from:"2023", to:"2024", name:"Egyptian Saudi Academy", type:"Part-time", what:"Add one line on your role.", what_ar:"أضف سطرًا عن دورك." },
  { from:"2021", to:"2023", name:"Skillsbank", type:"Part-time", what:"Online courses. Add one line on your role.", what_ar:"كورسات أونلاين. أضف سطرًا عن دورك." },
  { from:"2020", to:"2021", name:"Dosor", type:"", what:"Add one line on your role.", what_ar:"أضف سطرًا عن دورك." },
  { from:"2019", to:"Now", name:"Nahdet Misr Publishing House", type:"", what:"Educational publisher. Add one line on your role.", what_ar:"دار نشر تعليمية. أضف سطرًا عن دورك." },
  { from:"2018", to:"2019", name:"Infort", type:"", what:"Add one line on your role.", what_ar:"أضف سطرًا عن دورك." }
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
  "hero.alt": "رسم ذاتي لأنس وهو يرسم على شاشة رسم بالقلم على مكتبه",

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
  "work.filter": "تصفية المشاريع",
  "work.more": "شاهد كل المشاريع على Behance",
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
