// app.js

lucide.createIcons();

/* Estado de "movimiento permitido" compartido por el scroll suave (Lenis) y las
   animaciones del Hero (GSAP/ScrollTrigger): respeta la preferencia del sistema
   operativo y los interruptores de accesibilidad propios del sitio. */
function siteMotionAllowed() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        && !document.body.classList.contains('motion-stopped')
        && !document.body.classList.contains('minimal-mode');
}

const I18N = {
    es: {
        skip: 'Saltar al contenido principal',
        nav_about: 'Nosotros', nav_freq: 'Frecuencias', nav_therapies: 'Terapias', nav_contact: 'Contacto', nav_access: 'Accesibilidad',
        nav_brand: 'SensoriArte — Arte terapéutico e inclusivo',
        nav_brand_sub: 'Arte terapéutico e inclusivo',
        nav_pop_nosotros: 'Conoce quiénes somos y nuestra experiencia reunida en Padre Hurtado.',
        nav_pop_nosotros_link: 'Ir a Nosotros',
        nav_pop_freq: 'Cinco áreas de trabajo sensorial. Elige una frecuencia:',
        nav_pop_therapies: 'Experiencias terapéuticas gratuitas con calor humano y tecnología segura.',
        nav_pop_therapies_link: 'Ver terapias',
        nav_pop_contact: 'Escríbenos para orientación, talleres o charlas comunitarias.',
        btn_ir: 'ir',
        freq_musical: '40 Hz · Musical Inmersivo', freq_vr: 'VR · Realidad Mixta', freq_neuro: 'Música neurodivergencia',
        freq_cuidadoras: 'Cuidadoras & Familia', freq_cap: 'Capacitación',
        acc_adhd: 'Foco TDAH', acc_motion: 'Frenar animaciones', acc_minimal: 'Sitio minimalista',
        acc_spacing: 'Espaciado', acc_contrast: 'Alto contraste',
        acc_dyslexic: 'Tipografía fácil', acc_giant: 'Letra gigante',
        acc_read: 'Leer página', acc_read_btn: 'Activar', acc_read_stop: 'Detener',
        hero_badge: 'Espacio de Sanación & Inclusión Gratuita',
        hero_title: 'Donde el arte y la tecnología se vuelven <span class="font-display italic font-medium bg-gradient-to-r from-sensori-orangeDeep to-sensori-coralDeep bg-clip-text text-transparent">un abrazo</span>',
        hero_desc: 'Ofrecemos un refugio acogedor de terapias gratuitas, talleres artísticos sensoriales y charlas accesibles en Padre Hurtado. Transformamos la tecnología en puentes de contención para personas con discapacidad, personas mayores y sus cuidadores.',
        hero_cta1: 'Explorar Frecuencias', hero_cta2: 'Solicita información',
        sec_freq_title: 'Cinco Frecuencias de Transformación',
        sec_freq_desc: 'Cinco áreas de trabajo continuo, libres de barreras, diseñadas para estimular, sanar y capacitar. Elige una frecuencia para conocerla en profundidad:',
        sec_therapy_title: 'Experiencias Terapéuticas Sin Costo',
        sec_therapy_desc: 'Nuestras terapias combinan calor humano y tecnología no invasiva. El acceso es gratuito para la comunidad.',
        footer_tagline: 'Arte terapéutico e inclusivo para el florecimiento humano.',
        read_more: 'Seguir leyendo'
    },
    en: {
        skip: 'Skip to main content',
        nav_about: 'About', nav_freq: 'Frequencies', nav_therapies: 'Therapies', nav_contact: 'Contact', nav_access: 'Accessibility',
        nav_brand: 'SensoriArte — Therapeutic & inclusive art',
        nav_brand_sub: 'Therapeutic & inclusive art',
        nav_pop_nosotros: 'Learn about us and our shared experience in Padre Hurtado.',
        nav_pop_nosotros_link: 'Go to About',
        nav_pop_freq: 'Five sensory work areas. Choose a frequency:',
        nav_pop_therapies: 'Free therapeutic experiences with human warmth and safe technology.',
        nav_pop_therapies_link: 'View therapies',
        nav_pop_contact: 'Write to us for guidance, workshops or community talks.',
        btn_ir: 'go',
        freq_musical: '40 Hz · Immersive Music', freq_vr: 'VR · Mixed Reality', freq_neuro: 'Music for neurodivergence',
        freq_cuidadoras: 'Caregivers & Family', freq_cap: 'Training',
        acc_adhd: 'ADHD Focus', acc_motion: 'Stop animations', acc_minimal: 'Minimal site',
        acc_spacing: 'Spacing', acc_contrast: 'High contrast',
        acc_dyslexic: 'Easy typography', acc_giant: 'Giant text',
        acc_read: 'Read page', acc_read_btn: 'Start', acc_read_stop: 'Stop',
        hero_badge: 'Healing & Inclusion Space — Free',
        hero_title: 'Where art and technology become <span class="font-display italic font-medium bg-gradient-to-r from-sensori-orangeDeep to-sensori-coralDeep bg-clip-text text-transparent">an embrace</span>',
        hero_desc: 'We offer a welcoming refuge of free therapies, sensory art workshops and accessible talks in Padre Hurtado. We turn technology into bridges of care for people with disabilities, older adults and their caregivers.',
        hero_cta1: 'Explore Frequencies', hero_cta2: 'Request information',
        sec_freq_title: 'Five Frequencies of Transformation',
        sec_freq_desc: 'Five ongoing areas of work, free of barriers, designed to stimulate, heal and empower. Choose a frequency to learn more:',
        sec_therapy_title: 'Free Therapeutic Experiences',
        sec_therapy_desc: 'Our therapies combine human warmth and non-invasive technology. Access is free for the community.',
        footer_tagline: 'Therapeutic and inclusive art for human flourishing.',
        read_more: 'Read more'
    }
};

let currentLang = localStorage.getItem('sensoriarte-lang') || 'es';

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sensoriarte-lang', lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'es';
    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (key === 'hero_title') el.innerHTML = dict[key];
            else el.textContent = dict[key];
        }
    });
    document.querySelectorAll('.nav-btn-lang, #lang-toggle-mobile').forEach(btn => {
        btn.textContent = lang === 'en' ? 'EN' : 'ES';
        btn.classList.toggle('is-en', lang === 'en');
    });
    document.title = lang === 'en' ? 'SensoriArte — Therapeutic & Inclusive Art' : 'SensoriArte — Arte Terapéutico e Inclusivo';
    if (accessState.adhd) {
        document.querySelectorAll('main section, footer').forEach(block => {
            const orig = bionicSnapshots.get(block);
            if (orig) block.innerHTML = orig;
            bionicSnapshots.delete(block);
        });
        document.body.classList.remove('bionic-read');
        enableBionicReading();
    }
}

function toggleLanguage() {
    applyLanguage(currentLang === 'es' ? 'en' : 'es');
}

const accessState = { adhd: false, motion: false, minimal: false, spacing: false, contrast: false, dyslexic: false, giant: false };
const bionicSnapshots = new WeakMap();
const BIONIC_SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'SVG', 'CANVAS']);

function bionicTransformText(text) {
    return text.split(/(\s+)/).map(part => {
        if (/^\s+$/.test(part)) return part;
        return part.replace(/[\p{L}\p{M}]+/gu, word => {
            const n = Math.max(1, Math.ceil(word.length * 0.5));
            return `<b class="bionic-fixation">${word.slice(0, n)}</b>${word.slice(n)}`;
        });
    }).join('');
}

function walkBionicNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!parent || parent.closest('nav, .access-panel, .access-panel-inner, script, [data-bionic-skip]')) return NodeFilter.FILTER_REJECT;
            if (parent.closest('b.bionic-fixation')) return NodeFilter.FILTER_REJECT;
            if (BIONIC_SKIP.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => {
        const span = document.createElement('span');
        span.setAttribute('data-bionic-wrap', '1');
        span.innerHTML = bionicTransformText(node.textContent);
        node.parentNode.replaceChild(span, node);
    });
}

function enableBionicReading() {
    document.body.classList.add('bionic-read');
    document.querySelectorAll('main section, footer').forEach(block => {
        if (!bionicSnapshots.has(block)) bionicSnapshots.set(block, block.innerHTML);
        walkBionicNodes(block);
    });
}

function disableBionicReading() {
    document.body.classList.remove('bionic-read');
    document.querySelectorAll('main section, footer').forEach(block => {
        const original = bionicSnapshots.get(block);
        if (original !== undefined) {
            block.innerHTML = original;
            bionicSnapshots.delete(block);
        }
    });
    lucide.createIcons();
}

function syncAccessToggles() {
    Object.keys(accessState).forEach(key => {
        document.getElementById(`toggle-${key}`)?.classList.toggle('is-on', accessState[key]);
        document.querySelectorAll(`[data-access="${key}"]`).forEach(btn => {
            btn.classList.toggle('is-on', accessState[key]);
            if (btn.hasAttribute('aria-pressed')) btn.setAttribute('aria-pressed', String(accessState[key]));
        });
    });
    updateAccessButtonState();
}

function updateAccessButtonState() {
    const btn = document.getElementById('nav-access-btn');
    if (!btn) return;
    const anyActive = Object.values(accessState).some(v => v);
    btn.classList.toggle('has-active-options', anyActive);
}

function toggleAccessFeature(feature) {
    accessState[feature] = !accessState[feature];

    if (feature === 'adhd') {
        accessState.adhd ? enableBionicReading() : disableBionicReading();
    }
    if (feature === 'motion') {
        document.body.classList.toggle('motion-stopped', accessState.motion);
        if (accessState.motion) window.zoneParticles?.stop();
        else window.zoneParticles?.start();
    }
    if (feature === 'minimal') {
        document.body.classList.toggle('minimal-mode', accessState.minimal);
        if (accessState.minimal) window.zoneParticles?.stop();
        else window.zoneParticles?.start();
    }
    if (feature === 'spacing') {
        document.body.classList.toggle('extra-spacing', accessState.spacing);
    }
    if (feature === 'contrast') {
        document.body.classList.toggle('high-contrast-mode', accessState.contrast);
    }
    if (feature === 'dyslexic') {
        document.body.classList.toggle('dyslexic-font', accessState.dyslexic);
    }
    if (feature === 'giant') {
        document.body.classList.toggle('giant-text', accessState.giant);
    }

    syncAccessToggles();
}

applyLanguage(currentLang);
updateAccessButtonState();

const terapiasDetalle = {
    vibro: {
        title: "Vibroterapia Celular",
        tag: "30–80 Hz · Masaje vibracional",
        tecnico: "Las camillas táctiles integran transductores de baja frecuencia que transmiten ondas sinusoidales directamente al cuerpo. Estas vibraciones mecánicas atraviesan tejidos blandos y estimulan receptores propioceptivos y mecanorreceptores, induciendo relajación del sistema nervioso autónomo en rangos de 30 a 80 Hz.",
        cognitivo: "A nivel cognitivo, la estimulación rítmica constante ayuda a regular la alerta (sistema activador reticular) y disminuye la hipervigilancia. En personas con espasticidad o dolor crónico, la vibración modula la percepción nociceptiva y favorece estados de calma que facilitan el descanso y la autorregulación emocional.",
        beneficios: [
            "Reducción de tensión muscular y espasmos en 20–30 minutos",
            "Mejora del sueño y disminución del estrés fisiológico",
            "Regulación del sistema nervioso autónomo (parasimpático)",
            "Complemento seguro y no farmacológico para dolor articular"
        ],
        images: [
            { src: "https://placehold.co/600x360/F4F1F8/967BB6?text=Camilla+Vibroac%C3%BAstica", alt: "Camilla táctil con transductores de frecuencia" },
            { src: "https://placehold.co/600x360/F4F1F8/7393B3?text=Sesi%C3%B3n+de+Relajaci%C3%B3n", alt: "Persona en sesión de vibroterapia celular" },
            { src: "https://placehold.co/600x360/F4F1F8/4ECDC4?text=Ondas+30-80+Hz", alt: "Visualización de ondas de frecuencia terapéutica" }
        ]
    },
    visual: {
        title: "Estimulación Visual & Foco",
        tag: "Inmersión controlada · Neuroplasticidad",
        tecnico: "Utilizamos entornos visuales inmersivos de baja intensidad lumínica, con patrones geométricos suaves y ritmos predecibles. La estimulación se calibra según el perfil sensorial de cada persona, evitando sobrecarga y permitiendo entrenamiento progresivo del foco atencional.",
        cognitivo: "La estimulación visual estructurada activa redes de atención ejecutiva y procesamiento espacial. En TEA y daño cerebral adquirido, los estímulos controlados favorecen la integración sensorial, reducen la distractibilidad y fortalecen la propiocepción corporal mediante retroalimentación visual inmediata.",
        beneficios: [
            "Entrenamiento progresivo del foco y la atención sostenida",
            "Reducción de sobrecarga sensorial con estímulos calibrados",
            "Mejora de la propiocepción y orientación espacial",
            "Estimulación creativa segura para perfiles neurodivergentes"
        ],
        images: [
            { src: "https://placehold.co/600x360/F4F1F8/967BB6?text=Entorno+Inmersivo", alt: "Entorno de estimulación visual controlada" },
            { src: "https://placehold.co/600x360/F4F1F8/7393B3?text=Entrenamiento+de+Foco", alt: "Sesión de entrenamiento de foco cognitivo" },
            { src: "https://placehold.co/600x360/F4F1F8/4ECDC4?text=Integraci%C3%B3n+Sensorial", alt: "Integración sensorial visual y espacial" }
        ]
    },
    jamming: {
        title: "Jamming & Expresión Libre",
        tag: "Musicoterapia · Coordinación motriz",
        tecnico: "Sesiones colectivas con instrumentos adaptados de baja fricción física (percusión, teclados sensitivos, arcos de viento simplificados). No exigen lectura musical ni técnica previa: el objetivo es la exploración sonora libre en un entorno seguro y sin juicio.",
        cognitivo: "La improvisación musical activa simultáneamente córtex motor, límbico y áreas de lenguaje. Permite comunicación emocional no verbal, refuerza la coordinación bilateral y genera estados de flow que mejoran autoestima y vínculo social en grupos mixtos de edades y capacidades.",
        beneficios: [
            "Canalización emocional a través del sonido y el ritmo",
            "Desarrollo de coordinación motriz fina y bilateral",
            "Fortalecimiento de vínculos sociales en sesión colectiva",
            "Comunicación alternativa sin barreras verbales"
        ],
        images: [
            { src: "https://placehold.co/600x360/F4F1F8/967BB6?text=Instrumentos+Adaptados", alt: "Instrumentos musicales adaptados e inclusivos" },
            { src: "https://placehold.co/600x360/F4F1F8/7393B3?text=Jamming+Colectivo", alt: "Sesión grupal de jamming musical" },
            { src: "https://placehold.co/600x360/F4F1F8/4ECDC4?text=Expresi%C3%B3n+Libre", alt: "Expresión libre a través de la música" }
        ]
    }
};

function openTherapyModal(id) {
    const data = terapiasDetalle[id];
    if (!data) return;
    document.getElementById('therapy-modal-title').innerText = data.title;
    document.getElementById('therapy-modal-tag').innerText = data.tag;
    document.getElementById('therapy-modal-tecnico').innerText = data.tecnico;
    document.getElementById('therapy-modal-cognitivo').innerText = data.cognitivo;
    document.getElementById('therapy-modal-beneficios').innerHTML = data.beneficios.map(b => `<li>${b}</li>`).join('');
    document.getElementById('therapy-modal-gallery').innerHTML = data.images.map(img =>
        `<img src="${img.src}" alt="${img.alt}" class="flex-shrink-0 w-64 md:w-72 h-44 object-cover rounded-2xl border border-sensori-purple/15 shadow-sm">`
    ).join('');
    document.getElementById('therapy-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeTherapyModal() {
    document.getElementById('therapy-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeTherapyModal();
});


let notices = [
    {
        id: 1,
        author: "Oficina Discapacidad Padre Hurtado",
        type: "emergencia",
        text: "Postulación a credencial de discapacidad municipal abierta todo el año. Teléfono DIDECO: +56 2 2432 1234. ¡Escríbenos para orientarte!",
        date: "Aviso Permanente"
    },
    {
        id: 2,
        author: "CESFAM Juan Pablo II",
        type: "emergencia",
        text: "Horarios de kinesiología y terapia ocupacional para personas mayores los martes de 09:00 a 13:00 hrs. Solicitud directa de hora.",
        date: "Soporte"
    },
    {
        id: 3,
        author: "Vecino Miguel Jara",
        type: "comunidad",
        text: "Comparto andador ortopédico infantil que ya no ocupamos. Lo regalo con mucho cariño a quien lo necesite en Padre Hurtado. Contacto al inbox.",
        date: "Hace 2 días"
    },
    {
        id: 4,
        author: "Agrupación SensoriArte",
        type: "comunidad",
        text: "Próxima pintatón inclusiva de primavera en la plaza de Padre Hurtado. ¡Todos bienvenidos con pinceles y lienzos gratuitos!",
        date: "Próximamente"
    }
];

function renderNotices(filter = 'all') {
    const container = document.getElementById('notices-container');
    container.innerHTML = '';

    const filtered = filter === 'all' ? notices : notices.filter(n => n.type === filter);

    filtered.forEach(n => {
        const isEmergencia = n.type === 'emergencia';
        const cardColor = isEmergencia ? 'border-sensori-orange bg-sensori-orange/5' : 'border-sensori-teal bg-sensori-teal/5';
        const badgeColor = isEmergencia ? 'bg-sensori-orange text-sensori-night' : 'bg-sensori-teal text-sensori-night';
        const badgeText = isEmergencia ? 'Emergencia / Salud' : 'Comunidad / Vecinal';

        container.innerHTML += `
            <div class="p-6 rounded-2xl border-l-4 ${cardColor} bg-white shadow-sm transition-all hover:shadow-md flex flex-col justify-between h-full space-y-4 fade-in-active">
                <div class="space-y-2">
                    <div class="flex justify-between items-start gap-2">
                        <span class="notice-badge ${badgeColor}">${badgeText}</span>
                        <span class="text-base text-gray-500 font-semibold">${n.date}</span>
                    </div>
                    <p class="text-base text-gray-700 leading-relaxed italic">"${n.text}"</p>
                </div>
                <div class="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <div class="w-7 h-7 rounded-full bg-sensori-purple/10 flex items-center justify-center text-sensori-purple">
                        <i data-lucide="user" class="w-4 h-4"></i>
                    </div>
                    <span class="notice-author text-sensori-purpleDeep">${n.author}</span>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function filterNotices(type) {
    ['all', 'comunidad', 'emergencia'].forEach(t => {
        const btn = document.getElementById(`filter-btn-${t}`);
        if(t === type) {
            btn.className = "px-4 py-2 text-base font-bold bg-sensori-teal text-white rounded-lg transition-all focus:ring-2 focus:ring-sensori-teal";
        } else {
            btn.className = "px-4 py-2 text-base font-bold bg-white text-sensori-charcoal border border-gray-300 rounded-lg hover:bg-sensori-teal/10 transition-all";
        }
    });
    renderNotices(type);
}

function addCustomNotice(e) {
    e.preventDefault();
    const author = document.getElementById('notice-author').value;
    const type = document.getElementById('notice-type').value;
    const text = document.getElementById('notice-text').value;

    const newNotice = {
        id: Date.now(),
        author,
        type,
        text,
        date: "Recién colgado"
    };

    notices.unshift(newNotice);
    renderNotices('all');

    document.getElementById('notice-form').reset();

    showGeneralModal("¡Aviso Recibido!", "Revisaremos tu mensaje y en breve será publicado en la cartelera. Te avisaremos por correo cuando esté visible para la comunidad. ¡Gracias por participar!");
}

renderNotices();

/* ─── FLYER CAROUSEL ─── */
(function initFlyerCarousel() {
    const track = document.getElementById('flyer-track');
    const dotsEl = document.getElementById('flyer-dots');
    const prevBtn = document.getElementById('flyer-prev');
    const nextBtn = document.getElementById('flyer-next');
    if (!track) return;
    const slides = track.querySelectorAll('.flyer-slide');
    const dots = dotsEl?.querySelectorAll('.flyer-dot') || [];
    let cur = 0, autoId = null;

    function go(idx) {
        cur = (idx + slides.length) % slides.length;
        track.style.transform = `translateX(-${cur * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('is-active', i === cur));
    }
    prevBtn?.addEventListener('click', () => { go(cur - 1); resetAuto(); });
    nextBtn?.addEventListener('click', () => { go(cur + 1); resetAuto(); });
    dots.forEach(d => d.addEventListener('click', () => { go(+d.dataset.idx); resetAuto(); }));
    function resetAuto() { clearInterval(autoId); autoId = setInterval(() => go(cur + 1), 5200); }
    resetAuto();
})();

/* ─── MODAL EMERGENTE SELECTOR DE CHARLAS ─── */
const CHARLAS_DATA = [
    {
        title: 'Interfaces Sensoriales',
        full: 'Navegación e Interfaces Sensoriales',
        date: '2 de Julio · 2026',
        place: 'Padre Hurtado, RM · Online',
        dateShort: '2 Jul · Online',
        desc: 'Una charla práctica sobre cómo diseñar y usar interfaces que respetan distintos perfiles sensoriales. Revisamos navegación accesible, apoyos táctiles y visuales, y herramientas concretas para que la tecnología deje de ser una barrera en la casa, la escuela o el centro comunitario.',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=900&h=520&fit=crop',
        imageAlt: 'Persona usando una interfaz táctil en una sesión de diseño accesible',
        bg: 'linear-gradient(150deg,#1a3c2a,#2d6b4a)',
        svg: '<path d="M0,50 Q50,10 100,50 T200,50" fill="none" stroke="#a8c49a" stroke-width="2.5"/><path d="M0,72 Q50,32 100,72 T200,72" fill="none" stroke="#a8c49a" stroke-width="1.5"/>'
    },
    {
        title: 'Vibración de Baja Frecuencia',
        full: 'El Poder del Silencio y la Vibración',
        date: '14 de Agosto · 2026',
        place: 'Padre Hurtado, RM · Presencial',
        dateShort: '14 Ago · Presencial',
        desc: 'Exploramos el silencio y las ondas de baja frecuencia como apoyo a la regulación emocional y corporal. Verás cómo la vibroacústica se usa en sesiones terapéuticas, qué se siente en el cuerpo y cómo puede acompañar a personas con discapacidad, personas mayores y quienes cuidan.',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&h=520&fit=crop',
        imageAlt: 'Instrumentos y ambiente sonoro para una sesión de vibración de baja frecuencia',
        bg: 'linear-gradient(150deg,#2a1a3c,#4a2d6b)',
        svg: '<ellipse cx="100" cy="50" rx="75" ry="30" fill="none" stroke="#c5b8de" stroke-width="2.5"/><ellipse cx="100" cy="50" rx="42" ry="17" fill="none" stroke="#c5b8de" stroke-width="1.5"/>'
    },
    {
        title: 'Burnout del Cuidador',
        full: 'Prevención del Agotamiento del Cuidador',
        date: '5 de Septiembre · 2026',
        place: 'Padre Hurtado, RM · Mixta',
        dateShort: '5 Sep · Mixta',
        desc: 'Un espacio para madres, padres y cuidadoras que sostienen el día a día de un familiar. Hablamos de señales de agotamiento, pausas posibles y herramientas de contención comunitaria, sin recetas mágicas: con calor humano y estrategias que sí se pueden aplicar en casa.',
        image: 'https://images.unsplash.com/photo-1576765608535-acee738825b0?w=900&h=520&fit=crop',
        imageAlt: 'Cuidado y acompañamiento entre personas en un entorno cercano',
        bg: 'linear-gradient(150deg,#3c1a1a,#7a3d3d)',
        svg: '<path d="M100,92 C60,70 15,58 100,8 C185,58 140,70 100,92Z" fill="none" stroke="#f5c4bb" stroke-width="2.5"/>'
    },
    {
        title: 'Semana de Inclusión',
        full: 'Semana de Inclusión y Accesibilidad Digital',
        date: 'Octubre · 2026',
        place: 'Padre Hurtado, RM · Presencial y online',
        dateShort: 'Oct · Presencial+Online',
        desc: 'Una semana abierta a vecinos, colegios y organizaciones para erradicar mitos sobre discapacidad y neurodivergencia. Talleres, conversatorios y demostraciones de accesibilidad digital, con estrategias prácticas de crianza, estimulación y resguardo familiar.',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&h=520&fit=crop',
        imageAlt: 'Encuentro comunitario de inclusión y accesibilidad',
        bg: 'linear-gradient(150deg,#1a2e3c,#2d5a6b)',
        svg: '<rect x="12" y="18" width="48" height="48" rx="5" fill="none" stroke="#a8d4e0" stroke-width="1.8"/><rect x="78" y="10" width="48" height="48" rx="5" fill="none" stroke="#a8d4e0" stroke-width="1.8"/><rect x="144" y="22" width="44" height="44" rx="5" fill="none" stroke="#a8d4e0" stroke-width="1.8"/>'
    }
];

function handleRoleChange(val) {
    const sel = document.getElementById('contact-role');
    if (sel) sel.style.color = val ? '#333' : '#888';
    if (val === 'charla') {
        openCharlaModal();
    } else {
        clearCharlaSelection(true);
    }
}

function openCharlaModal() {
    const overlay = document.getElementById('charla-pick-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    requestAnimationFrame(() => overlay.classList.add('is-open'));
}

function closeCharlaModal() {
    const overlay = document.getElementById('charla-pick-overlay');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    setTimeout(() => { overlay.style.display = 'none'; }, 340);
    // Si se cerró sin seleccionar nada, resetear select
    const chip = document.getElementById('charla-chip');
    if (chip && !chip.classList.contains('is-visible')) {
        const sel = document.getElementById('contact-role');
        if (sel) { sel.value = ''; sel.style.color = '#888'; }
    }
}

function selectCharla(idx) {
    const c = CHARLAS_DATA[idx];
    // Actualizar chip
    const chip = document.getElementById('charla-chip');
    const thumb = document.getElementById('charla-chip-thumb');
    const nameEl = document.getElementById('charla-chip-name');
    const dateEl = document.getElementById('charla-chip-date');
    if (thumb) {
        thumb.style.background = c.bg;
        thumb.innerHTML = `<svg style="position:absolute;inset:0;width:100%;height:100%;opacity:0.28" viewBox="0 0 200 100">${c.svg}</svg>`;
    }
    if (nameEl) nameEl.textContent = c.title;
    if (dateEl) dateEl.textContent = c.date;
    if (chip) chip.classList.add('is-visible');
    // Armar borrador de mensaje
    const nombreInput = document.getElementById('contact-name');
    const nombre = (nombreInput && nombreInput.value.trim()) ? nombreInput.value.trim() : '[tu nombre]';
    const msg = document.getElementById('contact-msg');
    if (msg) {
        msg.value = `Soy ${nombre} y quiero asistir a la charla "${c.full}" (${c.date}).\n\n`;
        msg.focus();
        msg.setSelectionRange(msg.value.length, msg.value.length);
    }
    closeCharlaModal();
}

function clearCharlaSelection(silent) {
    const chip = document.getElementById('charla-chip');
    if (chip) chip.classList.remove('is-visible');
    if (!silent) {
        const sel = document.getElementById('contact-role');
        if (sel) { sel.value = ''; sel.style.color = '#888'; }
        const msg = document.getElementById('contact-msg');
        if (msg) msg.value = '';
    }
}

/* ─── LOGO SECRETO (cabeza×5 = punto 0 sobre imagen hero) ─── */
(function initLogoSecret() {
    const pts = document.querySelectorAll('.hero-secret-pt');
    if (!pts.length) return;
    const TARGET = [0, 0, 0, 0, 0]; // cabeza×5
    let seq = [];
    let resetTimer = null;

    function flashPt(ptEl) {
        ptEl.classList.remove('lit');
        void ptEl.offsetWidth;
        ptEl.classList.add('lit');
        setTimeout(() => ptEl.classList.remove('lit'), 700);
    }

    pts.forEach(pt => {
        pt.addEventListener('click', e => {
            e.stopPropagation();
            const idx = +pt.dataset.pt;
            seq.push(idx);
            flashPt(pt);
            clearTimeout(resetTimer);
            if (seq.length > TARGET.length) seq.shift();
            if (seq.join(',') === TARGET.join(',')) {
                seq = [];
                setTimeout(openSafe, 300);
                return;
            }
            resetTimer = setTimeout(() => { seq = []; }, 5000);
        });
    });
})();

/* ─── CAJA FUERTE ─── */
let safePin = '';
const SAFE_CODE = '7771';

function openSafe() {
    safePin = '';
    updateSafeDots();
    document.getElementById('safe-err').textContent = '';
    const el = document.getElementById('safe-overlay');
    el.style.display = 'flex';
    requestAnimationFrame(() => el.classList.add('is-open'));
}
function closeSafe() {
    const el = document.getElementById('safe-overlay');
    el.classList.remove('is-open');
    setTimeout(() => { el.style.display = 'none'; }, 450);
}
function updateSafeDots() {
    for (let i = 0; i < 4; i++) {
        document.getElementById('spd-' + i)?.classList.toggle('filled', i < safePin.length);
    }
}
function safeKeyPress(k) {
    const err = document.getElementById('safe-err');
    if (k === 'backspace') { safePin = safePin.slice(0, -1); updateSafeDots(); err.textContent = ''; return; }
    if (k === 'enter') {
        if (safePin.length < 4) { err.textContent = 'Faltan dígitos.'; return; }
        if (safePin === SAFE_CODE) { closeSafe(); setTimeout(openAdmin, 420); }
        else { err.textContent = '✗ Código incorrecto. Inténtalo de nuevo.'; safePin = ''; updateSafeDots(); }
        return;
    }
    if (safePin.length >= 4) return;
    safePin += k;
    updateSafeDots();
    if (safePin.length === 4) setTimeout(() => { safeKeyPress('enter'); }, 300);
}

/* ─── ADMIN PANEL ─── */
const adminFlyers = [
    { id: 1, titulo: 'Navegación e Interfaces Sensoriales', fecha: 'Julio 2, 2026', desc: 'Adapta mandos, pantallas y lectores de voz.', color: 'teal' },
    { id: 2, titulo: 'El Poder del Silencio y la Vibración', fecha: 'Agosto 14, 2026', desc: 'Vibración 30–120 Hz para espasticidad y dolor.', color: 'purple' },
    { id: 3, titulo: 'Prevención del Burnout del Cuidador', fecha: 'Septiembre 5, 2026', desc: 'Herramientas de autocuidado para familias.', color: 'coral' },
    { id: 4, titulo: 'Semana de Inclusión Digital', fecha: 'Octubre 2026', desc: 'Talleres de accesibilidad y tecnología adaptada.', color: 'green' }
];
let editingFlyerId = null;
let editingAvisoId = null;

function openAdmin() {
    document.getElementById('admin-modal').classList.add('is-open');
    renderAdminFlyers();
    renderAdminAvisos();
}
function closeAdmin() {
    document.getElementById('admin-modal').classList.remove('is-open');
}
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach((t, i) => {
        const tabs = ['flyers', 'avisos', 'bandas', 'correo'];
        t.classList.toggle('is-active', tabs[i] === tab);
    });
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('is-active'));
    document.getElementById('admin-tab-' + tab)?.classList.add('is-active');
}

/* --- FLYERS CRUD --- */
function renderAdminFlyers() {
    const tbody = document.getElementById('admin-flyers-tbody');
    if (!tbody) return;
    const colorMap = { green: '#5A7350', purple: '#967BB6', coral: '#C97064', teal: '#5A8F8F' };
    tbody.innerHTML = adminFlyers.map(f => `
        <tr>
            <td><strong>${f.titulo}</strong></td>
            <td>${f.fecha}</td>
            <td><span style="background:${colorMap[f.color]};color:#fff;padding:2px 8px;border-radius:4px;font-size:0.72rem">${f.color}</span></td>
            <td style="display:flex;gap:0.4rem;flex-wrap:wrap">
                <button class="admin-btn admin-btn--blue" onclick="adminEditFlyer(${f.id})">✏ Editar</button>
                <button class="admin-btn admin-btn--red" onclick="adminDeleteFlyer(${f.id})">✕ Eliminar</button>
            </td>
        </tr>`).join('');
}
function adminAddFlyer() {
    editingFlyerId = null;
    document.getElementById('admin-flyer-form-title').textContent = 'Nueva Charla';
    ['af-titulo','af-fecha','af-desc'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('af-color').value = 'green';
    document.getElementById('admin-flyer-form').style.display = 'block';
}
function adminEditFlyer(id) {
    const f = adminFlyers.find(x => x.id === id);
    if (!f) return;
    editingFlyerId = id;
    document.getElementById('admin-flyer-form-title').textContent = 'Editar Charla';
    document.getElementById('af-titulo').value = f.titulo;
    document.getElementById('af-fecha').value = f.fecha;
    document.getElementById('af-desc').value = f.desc;
    document.getElementById('af-color').value = f.color;
    document.getElementById('admin-flyer-form').style.display = 'block';
}
function adminSaveFlyer() {
    const titulo = document.getElementById('af-titulo').value.trim();
    if (!titulo) return;
    const data = { titulo, fecha: document.getElementById('af-fecha').value, desc: document.getElementById('af-desc').value, color: document.getElementById('af-color').value };
    if (editingFlyerId) {
        const f = adminFlyers.find(x => x.id === editingFlyerId);
        if (f) Object.assign(f, data);
    } else {
        data.id = Date.now();
        adminFlyers.push(data);
    }
    document.getElementById('admin-flyer-form').style.display = 'none';
    renderAdminFlyers();
}
function adminDeleteFlyer(id) {
    if (!confirm('¿Eliminar esta charla?')) return;
    const i = adminFlyers.findIndex(x => x.id === id);
    if (i > -1) adminFlyers.splice(i, 1);
    renderAdminFlyers();
}

/* --- AVISOS CRUD --- */
function renderAdminAvisos() {
    const tbody = document.getElementById('admin-avisos-tbody');
    if (!tbody) return;
    tbody.innerHTML = notices.map((n, i) => `
        <tr>
            <td><strong>${n.author}</strong></td>
            <td>${n.type === 'emergencia' ? '🔴 Emergencia' : '🟢 Comunidad'}</td>
            <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${n.text}</td>
            <td style="display:flex;gap:0.4rem;flex-wrap:wrap">
                <button class="admin-btn admin-btn--blue" onclick="adminEditAviso(${n.id})">✏ Editar</button>
                <button class="admin-btn admin-btn--red" onclick="adminDeleteAviso(${n.id})">✕ Eliminar</button>
            </td>
        </tr>`).join('');
}
function adminAddAviso() {
    editingAvisoId = null;
    document.getElementById('admin-aviso-form-title').textContent = 'Nuevo Aviso';
    ['aa-autor','aa-texto','aa-fecha'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('aa-tipo').value = 'comunidad';
    document.getElementById('admin-aviso-form').style.display = 'block';
}
function adminEditAviso(id) {
    const n = notices.find(x => x.id === id);
    if (!n) return;
    editingAvisoId = id;
    document.getElementById('admin-aviso-form-title').textContent = 'Editar Aviso';
    document.getElementById('aa-autor').value = n.author;
    document.getElementById('aa-tipo').value = n.type;
    document.getElementById('aa-texto').value = n.text;
    document.getElementById('aa-fecha').value = n.date;
    document.getElementById('admin-aviso-form').style.display = 'block';
}
function adminSaveAviso() {
    const author = document.getElementById('aa-autor').value.trim();
    if (!author) return;
    const data = { author, type: document.getElementById('aa-tipo').value, text: document.getElementById('aa-texto').value, date: document.getElementById('aa-fecha').value || 'Recién colgado' };
    if (editingAvisoId) {
        const n = notices.find(x => x.id === editingAvisoId);
        if (n) Object.assign(n, data);
    } else {
        data.id = Date.now();
        notices.push(data);
    }
    document.getElementById('admin-aviso-form').style.display = 'none';
    renderAdminAvisos();
    renderNotices('all');
}
function adminDeleteAviso(id) {
    if (!confirm('¿Eliminar este aviso?')) return;
    const i = notices.findIndex(x => x.id === id);
    if (i > -1) notices.splice(i, 1);
    renderAdminAvisos();
    renderNotices('all');
}

let speechSynth = window.speechSynthesis;
let currentUtterance = null;
let reading = false;

function readAloudPage() {
    const speechBtn = document.getElementById('speech-toggle-btn');
    if (!speechSynth) {
        showGeneralModal(currentLang === 'en' ? 'Unavailable' : 'Función no disponible', currentLang === 'en' ? 'Your browser does not support text-to-speech.' : 'Tu navegador no es compatible con la lectura de voz.');
        return;
    }

    if (reading) {
        speechSynth.cancel();
        reading = false;
        if (speechBtn) speechBtn.textContent = I18N[currentLang].acc_read_btn;
        return;
    }

    const headerText = document.getElementById('text-hero-container')?.innerText || '';
    const fullTextToRead = currentLang === 'en'
        ? `Welcome to SensoriArte. ${headerText}`
        : `Bienvenido a SensoriArte. ${headerText}`;

    currentUtterance = new SpeechSynthesisUtterance(fullTextToRead);
    currentUtterance.lang = currentLang === 'en' ? 'en-US' : 'es-CL';
    currentUtterance.rate = 0.95;

    currentUtterance.onend = () => {
        reading = false;
        if (speechBtn) speechBtn.textContent = I18N[currentLang].acc_read_btn;
    };

    speechSynth.speak(currentUtterance);
    reading = true;
    if (speechBtn) speechBtn.textContent = I18N[currentLang].acc_read_stop;
}


let charlaInfoIdx = 0;

function openCharlaInfo(idx) {
    const c = CHARLAS_DATA[idx];
    if (!c) return;
    charlaInfoIdx = idx;
    const titleEl = document.getElementById('charla-info-title');
    const metaEl = document.getElementById('charla-info-meta');
    const descEl = document.getElementById('charla-info-desc');
    const imgEl = document.getElementById('charla-info-img');
    const modal = document.getElementById('charla-info-modal');
    if (titleEl) titleEl.textContent = c.full;
    if (metaEl) metaEl.textContent = `${c.date} · ${c.place}`;
    if (descEl) descEl.textContent = c.desc;
    if (imgEl) {
        imgEl.src = c.image;
        imgEl.alt = c.imageAlt || c.full;
    }
    if (modal) modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
}

function closeCharlaInfo() {
    const modal = document.getElementById('charla-info-modal');
    if (modal) modal.classList.add('hidden');
}

function asistirCharlaDesdeInfo() {
    const c = CHARLAS_DATA[charlaInfoIdx];
    closeCharlaInfo();
    if (c) openInscripcionModal(c.full);
}

function openInscripcionModal(charlaName) {
    document.getElementById('charla-seleccionada').innerText = charlaName;
    document.getElementById('charla-modal').classList.remove('hidden');
}

function closeInscripcionModal() {
    document.getElementById('charla-modal').classList.add('hidden');
}

function handleCharlaInscripcion(e) {
    e.preventDefault();
    const name = document.getElementById('ins-name').value;
    closeInscripcionModal();
    showGeneralModal("Inscripción Lista", `¡Hola ${name}! Hemos reservado tu cupo gratuito con éxito. Te esperamos.`);
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    showGeneralModal("Mensaje Enviado", `¡Muchas gracias ${name}! Recibimos tu mensaje en SensoriArte. Nos comunicaremos contigo muy pronto con el corazón abierto.`);
    e.target.reset();
}

function showGeneralModal(title, text) {
    document.getElementById('gen-modal-title').innerText = title;
    document.getElementById('gen-modal-text').innerText = text;
    document.getElementById('general-modal').classList.remove('hidden');
}

function closeGeneralModal() {
    document.getElementById('general-modal').classList.add('hidden');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', !isExpanded);
}

(function initFrecuenciasDropdown() {
    const dropdown = document.getElementById('nav-frecuencias-dropdown');
    const btn = document.getElementById('nav-frecuencias-btn');
    if (!dropdown || !btn) return;
    let closeTimer = null;
    function openDropdown() { clearTimeout(closeTimer); dropdown.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    function closeDropdown() { closeTimer = setTimeout(() => { dropdown.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 400); }
    dropdown.addEventListener('mouseenter', openDropdown);
    dropdown.addEventListener('mouseleave', closeDropdown);
    dropdown.addEventListener('focusin', openDropdown);
    dropdown.addEventListener('focusout', (e) => { if (!dropdown.contains(e.relatedTarget)) closeDropdown(); });
    btn.addEventListener('click', (e) => { e.preventDefault(); dropdown.classList.toggle('is-open'); btn.setAttribute('aria-expanded', dropdown.classList.contains('is-open')); });
})();

(function initAccessDropdown() {
    const dropdown = document.getElementById('nav-access-dropdown');
    const btn = document.getElementById('nav-access-btn');
    if (!dropdown || !btn) return;
    let closeTimer = null;
    function openDropdown() { clearTimeout(closeTimer); dropdown.classList.add('is-open'); btn.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    function closeDropdown() { closeTimer = setTimeout(() => { dropdown.classList.remove('is-open'); btn.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }, 450); }
    dropdown.addEventListener('mouseenter', openDropdown);
    dropdown.addEventListener('mouseleave', closeDropdown);
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('is-open');
        btn.classList.toggle('is-open', isOpen);
        btn.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('is-open');
            btn.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown.classList.contains('is-open')) {
            dropdown.classList.remove('is-open');
            btn.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
        }
    });
})();

(function initNavIconHub() {
    const pairs = [
        ['nav-icon-nosotros', 'popover-nosotros'],
        ['nav-icon-frecuencias', 'popover-frecuencias'],
        ['nav-icon-terapias', 'popover-terapias'],
        ['nav-icon-contacto', 'popover-contacto']
    ];
    let heartbeatTimer = null;
    let audioCtx = null;

    function playHeartbeatThump() {
        if (document.body.classList.contains('motion-stopped')) return;
        try {
            audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
            const t = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(58, t);
            osc.frequency.exponentialRampToValueAtTime(42, t + 0.12);
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(t);
            osc.stop(t + 0.25);
        } catch (e) { /* sin audio */ }
    }

    function startHeartbeat() {
        stopHeartbeat();
        playHeartbeatThump();
        heartbeatTimer = setInterval(playHeartbeatThump, 920);
    }

    function stopHeartbeat() {
        if (heartbeatTimer) {
            clearInterval(heartbeatTimer);
            heartbeatTimer = null;
        }
    }

    function closePopover(btn, pop) {
        pop.hidden = true;
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        if (pop.id === 'popover-frecuencias') stopHeartbeat();
    }

    function closeAll(exceptId) {
        pairs.forEach(([btnId, popId]) => {
            if (popId === exceptId) return;
            const btn = document.getElementById(btnId);
            const pop = document.getElementById(popId);
            if (btn && pop && !pop.hidden) closePopover(btn, pop);
        });
    }

    function openPopover(btn, pop) {
        closeAll(pop.id);
        pop.hidden = false;
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        if (pop.id === 'popover-frecuencias') startHeartbeat();
    }

    pairs.forEach(([btnId, popId]) => {
        const btn = document.getElementById(btnId);
        const pop = document.getElementById(popId);
        const wrap = btn?.closest('.nav-icon-wrap');
        if (!btn || !pop || !wrap) return;
        let leaveTimer = null;

        wrap.addEventListener('mouseenter', () => {
            clearTimeout(leaveTimer);
            openPopover(btn, pop);
        });
        wrap.addEventListener('mouseleave', () => {
            leaveTimer = setTimeout(() => closePopover(btn, pop), 180);
        });
        wrap.addEventListener('focusin', () => {
            clearTimeout(leaveTimer);
            openPopover(btn, pop);
        });
        wrap.addEventListener('focusout', (e) => {
            if (!wrap.contains(e.relatedTarget)) {
                leaveTimer = setTimeout(() => closePopover(btn, pop), 180);
            }
        });
        pop.addEventListener('click', (e) => e.stopPropagation());
    });

    document.addEventListener('click', () => closeAll());
})();

(function initZoneParticles() {
    const COLORS = ['rgba(90,122,74,0.42)', 'rgba(201,162,39,0.36)', 'rgba(74,99,64,0.34)'];
    const LINK_COLOR = 'rgba(90,122,74,';
    const instances = [];

    function createInstance(canvas, section) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId = null;
        let running = false;

        function size() {
            return { w: section.clientWidth, h: section.clientHeight };
        }

        function particleCount() {
            const { w, h } = size();
            return Math.min(45, Math.max(18, Math.floor((w * h) / 28000)));
        }

        function resize() {
            const { w, h } = size();
            if (w < 10 || h < 10) return;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function seed() {
            const { w, h } = size();
            particles = Array.from({ length: particleCount() }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.8 + 1,
                c: COLORS[Math.floor(Math.random() * COLORS.length)]
            }));
        }

        function draw() {
            if (!running) return;
            const { w, h } = size();
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x <= 0 || p.x >= w) p.vx *= -1;
                if (p.y <= 0 || p.y >= h) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.c;
                ctx.fill();
            });
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.strokeStyle = LINK_COLOR + (0.14 * (1 - dist / 110)) + ')';
                        ctx.lineWidth = 0.75;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        }

        const api = {
            start() {
                if (document.body.classList.contains('motion-stopped')) return;
                if (document.body.classList.contains('minimal-mode')) return;
                if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                resize();
                seed();
                running = true;
                if (animId) cancelAnimationFrame(animId);
                draw();
            },
            stop() {
                running = false;
                if (animId) cancelAnimationFrame(animId);
                const { w, h } = size();
                ctx.clearRect(0, 0, w, h);
            },
            resize() {
                if (running) { resize(); seed(); }
            }
        };
        return api;
    }

    document.querySelectorAll('.section-zone-2').forEach(section => {
        const canvas = section.querySelector('.zone-particles-canvas');
        if (canvas) instances.push(createInstance(canvas, section));
    });

    window.zoneParticles = {
        start: () => instances.forEach(i => i.start()),
        stop: () => instances.forEach(i => i.stop()),
        resize: () => instances.forEach(i => i.resize())
    };

    window.zoneParticles.start();
    window.addEventListener('resize', () => window.zoneParticles.resize());
})();

(function initVintagePiano() {
    const keysEl = document.getElementById('piano-keys');
    const pianoModal = document.getElementById('piano-modal');
    const floatBtn = document.getElementById('piano-float-btn');
    const closeBtn = document.getElementById('piano-modal-close');
    const backdrop = document.getElementById('piano-modal-backdrop');
    if (!keysEl || !pianoModal || !floatBtn) return;

    const BLACK_NOTES = [
        { n: 'C#4', f: 277.18, wi: 0 }, { n: 'D#4', f: 311.13, wi: 1 },
        { n: 'F#4', f: 369.99, wi: 3 }, { n: 'G#4', f: 415.30, wi: 4 },
        { n: 'A#4', f: 466.16, wi: 5 },
        { n: 'C#5', f: 554.37, wi: 7 }, { n: 'D#5', f: 622.25, wi: 8 },
        { n: 'F#5', f: 739.99, wi: 10 }, { n: 'G#5', f: 830.61, wi: 11 },
        { n: 'A#5', f: 932.33, wi: 12 }
    ];

    const PARTIALS = [
        { ratio: 1, gain: 1 }, { ratio: 2, gain: 0.45 }, { ratio: 3, gain: 0.22 },
        { ratio: 4, gain: 0.12 }, { ratio: 5, gain: 0.07 }, { ratio: 6, gain: 0.04 }
    ];

    let audioCtx = null;
    let reverbNode = null;
    let dryGain = null;
    let wetGain = null;
    const active = new Map();

    function buildReverb(ctx) {
        const rate = ctx.sampleRate;
        const len = rate * 2.2;
        const impulse = ctx.createBuffer(2, len, rate);
        for (let ch = 0; ch < 2; ch++) {
            const data = impulse.getChannelData(ch);
            for (let i = 0; i < len; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.4);
            }
        }
        reverbNode = ctx.createConvolver();
        reverbNode.buffer = impulse;
        dryGain = ctx.createGain();
        wetGain = ctx.createGain();
        dryGain.gain.value = 0.72;
        wetGain.gain.value = 0.38;
        reverbNode.connect(wetGain);
        dryGain.connect(ctx.destination);
        wetGain.connect(ctx.destination);
    }

    function getCtx() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            buildReverb(audioCtx);
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    function playNote(freq, keyEl) {
        try {
            const ctx = getCtx();
            const t = ctx.currentTime;
            const noteGain = ctx.createGain();
            noteGain.gain.setValueAtTime(0.0001, t);
            noteGain.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
            noteGain.gain.exponentialRampToValueAtTime(0.1, t + 0.35);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
            noteGain.connect(dryGain);
            noteGain.connect(reverbNode);

            PARTIALS.forEach((p, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                const f = freq * p.ratio;
                osc.type = i === 0 ? 'triangle' : 'sine';
                osc.frequency.setValueAtTime(f * 0.998, t);
                osc.frequency.exponentialRampToValueAtTime(f, t + 0.02);
                g.gain.setValueAtTime(0.0001, t);
                g.gain.exponentialRampToValueAtTime(0.14 * p.gain, t + 0.01);
                g.gain.exponentialRampToValueAtTime(0.05 * p.gain, t + 0.5);
                g.gain.exponentialRampToValueAtTime(0.0001, t + 3.1);
                osc.connect(g);
                g.connect(noteGain);
                osc.start(t);
                osc.stop(t + 3.2);
            });

            active.set(keyEl, { noteGain });
            keyEl.classList.add('is-pressed');
            if (window.spawnPianoSpore) window.spawnPianoSpore(keyEl);
        } catch (e) { /* sin audio */ }
    }

    function stopNote(keyEl) {
        keyEl.classList.remove('is-pressed');
        active.delete(keyEl);
    }

    function bindKey(btn) {
        const freq = parseFloat(btn.dataset.freq);
        if (!freq) return;
        btn.addEventListener('pointerdown', (e) => { e.preventDefault(); playNote(freq, btn); });
        btn.addEventListener('pointerup', () => stopNote(btn));
        btn.addEventListener('pointerleave', () => stopNote(btn));
    }

    keysEl.querySelectorAll('.piano-key-white').forEach(bindKey);

    const whiteCount = keysEl.querySelectorAll('.piano-key-white').length || 14;
    const whiteW = 100 / whiteCount;
    BLACK_NOTES.forEach(note => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'piano-key-black';
        btn.dataset.freq = note.f;
        btn.setAttribute('aria-label', note.n);
        btn.style.left = `calc(${(note.wi + 1) * whiteW}% - 8px)`;
        keysEl.appendChild(btn);
        bindKey(btn);
    });

    function openPianoModal() {
        pianoModal.hidden = false;
        document.querySelectorAll('.music-float-btn').forEach(b => b.classList.add('is-hidden'));
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => pianoModal.classList.add('is-open'));
        getCtx();
    }

    function closePianoModal() {
        pianoModal.classList.remove('is-open');
        document.querySelectorAll('.music-float-btn').forEach(b => b.classList.remove('is-hidden'));
        document.body.style.overflow = '';
        setTimeout(() => { if (!pianoModal.classList.contains('is-open')) pianoModal.hidden = true; }, 350);
    }

    floatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openPianoModal();
    });
    closeBtn?.addEventListener('click', closePianoModal);
    backdrop?.addEventListener('click', closePianoModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pianoModal.classList.contains('is-open')) closePianoModal();
    });
})();

(function initPianoSpores() {
    const canvas = document.getElementById('spore-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const spores = [];
    const COLORS = [
        'rgba(184,212,168,', 'rgba(229,212,160,', 'rgba(201,184,232,',
        'rgba(168,196,212,', 'rgba(232,184,174,', 'rgba(212,228,200,'
    ];
    let animId = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.spawnPianoSpore = function(keyEl) {
        if (document.body.classList.contains('motion-stopped')) return;
        if (Math.random() > 0.35) return;
        const rect = keyEl.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height * 0.3;
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        spores.push({
            x, y,
            vx: -(0.8 + Math.random() * 1.8),
            vy: (Math.random() - 0.5) * 1.2,
            r: 3 + Math.random() * 7,
            color: c,
            alpha: 0.28 + Math.random() * 0.22,
            life: 1,
            wobble: Math.random() * Math.PI * 2
        });
        if (!animId) draw();
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = spores.length - 1; i >= 0; i--) {
            const s = spores[i];
            s.x += s.vx;
            s.y += s.vy + Math.sin(s.wobble) * 0.3;
            s.wobble += 0.04;
            s.life -= 0.006;
            s.alpha *= 0.996;
            if (s.life <= 0 || s.x < -20) {
                spores.splice(i, 1);
                continue;
            }
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
            ctx.fillStyle = s.color + (s.alpha * s.life) + ')';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(s.x - s.r * 0.3, s.y - s.r * 0.3, s.r * 0.35 * s.life, 0, Math.PI * 2);
            ctx.fillStyle = s.color + (s.alpha * 0.4 * s.life) + ')';
            ctx.fill();
        }
        animId = spores.length ? requestAnimationFrame(draw) : null;
    }
})();

/* ─── FONDO DE PÁGINA: color sólido (cambia con el scroll) + líneas que fluyen.
   Un solo loop (GSAP ticker). Sin Vanta/p5, para que no se peleen con Lenis. ─── */
(function initPageBackground() {
    const SCROLL_STOPS = [
        0xA8C49A,
        0xE8D24A,
        0xE8A86A,
        0xE890A8,
        0xB48AD4,
        0xC4965A,
        0x7EB89A
    ];
    const HERO_SPEED = 5000;

    function lerpColor(a, b, t) {
        const ar = (a >> 16) & 255, ag = (a >> 8) & 255, ab = a & 255;
        const br = (b >> 16) & 255, bg = (b >> 8) & 255, bb = b & 255;
        const r = Math.round(ar + (br - ar) * t);
        const g = Math.round(ag + (bg - ag) * t);
        const bl = Math.round(ab + (bb - ab) * t);
        return (r << 16) | (g << 8) | bl;
    }
    function toCss(hex) {
        return '#' + ('000000' + hex.toString(16)).slice(-6);
    }
    function colorAt(progress) {
        const last = SCROLL_STOPS.length - 1;
        const scaled = Math.max(0, Math.min(1, progress)) * last;
        const i = Math.min(last - 1, Math.floor(scaled));
        return lerpColor(SCROLL_STOPS[i], SCROLL_STOPS[i + 1], scaled - i);
    }
    function scrollProgress() {
        const lenis = window.__lenis && window.__lenis.instance;
        if (lenis && typeof lenis.scroll === 'number' && lenis.limit > 0) {
            return Math.max(0, Math.min(1, lenis.scroll / lenis.limit));
        }
        const el = document.scrollingElement || document.documentElement;
        const max = (el.scrollHeight - window.innerHeight) || 0;
        if (max <= 0) return 0;
        return Math.max(0, Math.min(1, (window.scrollY || el.scrollTop || 0) / max));
    }

    const washEl = document.getElementById('bg-color-wash');
    const host = document.getElementById('vanta-texture');
    const netHost = document.getElementById('bg-fx-net');
    const wavesHost = document.getElementById('bg-fx-waves');
    const cellsHost = document.getElementById('bg-fx-cells');
    if (!host) return;

    const canvas = document.createElement('canvas');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });

    /* El sitio parte en color sólido. Las texturas se activan desde "Jugar con el fondo". */
    let activeFx = null; // null | 'lines' | 'net' | 'waves' | 'cells'
    let netEffect = null;
    let wavesEffect = null;
    let cellsEffect = null;
    let lastWaveColor = -1;
    let lastCellsKey = '';

    let viewW = 0, viewH = 0, time = 0;
    let particles = [];

    function seedParticles() {
        const count = Math.max(900, Math.min(2200, Math.floor((viewW * viewH) / 1200)));
        particles = new Array(count);
        for (let i = 0; i < count; i++) {
            const x = Math.random() * viewW;
            const y = Math.random() * viewH;
            particles[i] = { x: x, y: y, px: x, py: y };
        }
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        viewW = window.innerWidth;
        viewH = window.innerHeight;
        canvas.width = Math.floor(viewW * dpr);
        canvas.height = Math.floor(viewH * dpr);
        canvas.style.width = viewW + 'px';
        canvas.style.height = viewH + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        seedParticles();
        if (netEffect && typeof netEffect.resize === 'function') netEffect.resize();
        if (wavesEffect && typeof wavesEffect.resize === 'function') wavesEffect.resize();
        if (cellsEffect && typeof cellsEffect.resize === 'function') cellsEffect.resize();
    }

    function darkenHex(hex, amount) {
        const r = Math.max(0, ((hex >> 16) & 255) - amount);
        const g = Math.max(0, ((hex >> 8) & 255) - amount);
        const b = Math.max(0, (hex & 255) - amount);
        return (r << 16) | (g << 8) | b;
    }

    /* Paleta CELLS con contraste alto (como el demo teal/amarillo):
       color1 = fondo de celda muy oscuro, color2 = anillo más claro pero acotado. */
    function cellsPalette(hexNum) {
        const c1 = darkenHex(hexNum, 140);
        let r = (hexNum >> 16) & 255;
        let g = (hexNum >> 8) & 255;
        let b = hexNum & 255;
        /* Bajamos luminosidad para que el anillo no quede casi blanco */
        const max = Math.max(r, g, b, 1);
        const target = 118;
        if (max > target) {
            const s = target / max;
            r = Math.round(r * s);
            g = Math.round(g * s);
            b = Math.round(b * s);
        }
        r = Math.max(28, r - 18);
        g = Math.max(28, g - 18);
        b = Math.max(28, b - 18);
        const c2 = (r << 16) | (g << 8) | b;
        return { c1: c1, c2: c2 };
    }

    function syncWaveColor(hexNum) {
        if (!wavesEffect || typeof wavesEffect.setOptions !== 'function') return;
        if (hexNum === lastWaveColor) return;
        lastWaveColor = hexNum;
        wavesEffect.setOptions({ color: hexNum });
    }

    function syncCellsColor(hexNum) {
        if (!cellsEffect || typeof cellsEffect.setOptions !== 'function') return;
        const pal = cellsPalette(hexNum);
        const key = pal.c1 + ':' + pal.c2;
        if (key === lastCellsKey) return;
        lastCellsKey = key;
        cellsEffect.setOptions({ color1: pal.c1, color2: pal.c2 });
    }

    function applyColor() {
        const hex = colorAt(scrollProgress());
        const css = toCss(hex);
        if (washEl) washEl.style.backgroundColor = css;
        document.body.style.backgroundColor = css;
        if (activeFx === 'waves') syncWaveColor(hex);
        if (activeFx === 'cells') syncCellsColor(hex);
    }
    window.__sensoriScrollColor = function (progress) {
        const hex = colorAt(progress);
        const css = toCss(hex);
        if (washEl) washEl.style.backgroundColor = css;
        document.body.style.backgroundColor = css;
        if (activeFx === 'waves') syncWaveColor(hex);
        if (activeFx === 'cells') syncCellsColor(hex);
    };

    function flowAngle(x, y, t) {
        const s = 0.0016;
        return Math.sin(x * s + t * 0.32) + Math.cos(y * s * 1.25 - t * 0.24) + Math.sin((x + y) * s * 0.55 + t * 0.15);
    }

    function drawTexture() {
        time += 0.018;
        ctx.clearRect(0, 0, viewW, viewH);
        ctx.strokeStyle = 'rgba(42, 51, 36, 0.5)';
        ctx.lineWidth = 1.15;
        ctx.lineCap = 'round';
        ctx.beginPath();
        const speed = 1.55;
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.px = p.x;
            p.py = p.y;
            const a = flowAngle(p.x, p.y, time);
            p.x += Math.cos(a) * speed;
            p.y += Math.sin(a) * speed;
            if (p.x < -8) p.x = viewW + 8;
            else if (p.x > viewW + 8) p.x = -8;
            if (p.y < -8) p.y = viewH + 8;
            else if (p.y > viewH + 8) p.y = -8;
            ctx.moveTo(p.px, p.py);
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }

    function destroyNet() {
        if (netEffect && typeof netEffect.destroy === 'function') {
            try { netEffect.destroy(); } catch (e) { /* ignore */ }
        }
        netEffect = null;
        if (netHost) {
            netHost.classList.add('is-off');
            netHost.innerHTML = '';
        }
    }

    function destroyWaves() {
        if (wavesEffect && typeof wavesEffect.destroy === 'function') {
            try { wavesEffect.destroy(); } catch (e) { /* ignore */ }
        }
        wavesEffect = null;
        lastWaveColor = -1;
        if (wavesHost) {
            wavesHost.classList.add('is-off');
            wavesHost.innerHTML = '';
        }
    }

    function destroyCells() {
        if (cellsEffect && typeof cellsEffect.destroy === 'function') {
            try { cellsEffect.destroy(); } catch (e) { /* ignore */ }
        }
        cellsEffect = null;
        lastCellsKey = '';
        if (cellsHost) {
            cellsHost.classList.add('is-off');
            cellsHost.innerHTML = '';
        }
    }

    function createNet() {
        if (!netHost || netEffect) return;
        if (typeof window.VANTA === 'undefined' || typeof VANTA.NET !== 'function') return;
        if (typeof window.THREE === 'undefined') return;
        netHost.classList.remove('is-off');
        netEffect = VANTA.NET({
            el: netHost,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3D5230,
            backgroundColor: 0xffffff,
            points: 10.00,
            maxDistance: 22.00,
            spacing: 16.00,
            showDots: true
        });
    }

    function createWaves() {
        if (!wavesHost || wavesEffect) return;
        if (typeof window.VANTA === 'undefined' || typeof VANTA.WAVES !== 'function') return;
        if (typeof window.THREE === 'undefined') return;
        const startColor = colorAt(scrollProgress());
        wavesHost.classList.remove('is-off');
        wavesEffect = VANTA.WAVES({
            el: wavesHost,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: startColor,
            shininess: 30.00,
            waveHeight: 15.00,
            waveSpeed: 1.00,
            zoom: 1.00
        });
        lastWaveColor = startColor;
    }

    function createCells() {
        if (!cellsHost || cellsEffect) return;
        if (typeof window.VANTA === 'undefined' || typeof VANTA.CELLS !== 'function') return;
        if (typeof window.THREE === 'undefined') return;
        const startColor = colorAt(scrollProgress());
        const pal = cellsPalette(startColor);
        cellsHost.classList.remove('is-off');
        cellsEffect = VANTA.CELLS({
            el: cellsHost,
            THREE: window.THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            color1: pal.c1,
            color2: pal.c2,
            size: 1.35,
            speed: 1.0,
            ringFactor: 1.35,
            amplitudeFactor: 1.15
        });
        lastCellsKey = pal.c1 + ':' + pal.c2;
    }

    function clearLines() {
        host.classList.add('is-off');
        ctx.clearRect(0, 0, viewW, viewH);
    }

    function setFx(fx) {
        const next = (activeFx === fx) ? null : fx;
        activeFx = next;

        destroyNet();
        destroyWaves();
        destroyCells();
        clearLines();

        if (activeFx === 'lines') {
            host.classList.remove('is-off');
            seedParticles();
        } else if (activeFx === 'net' && siteMotionAllowed()) {
            createNet();
        } else if (activeFx === 'waves' && siteMotionAllowed()) {
            createWaves();
        } else if (activeFx === 'cells' && siteMotionAllowed()) {
            createCells();
        }

        document.querySelectorAll('.bg-play-btn[data-fx]').forEach(function (btn) {
            const on = btn.dataset.fx === activeFx;
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    }
    window.__sensoriSetBgFx = setFx;

    function tick() {
        if (siteMotionAllowed() && activeFx === 'lines') drawTexture();
        applyColor();
    }

    function syncFxWithMotion() {
        if (!siteMotionAllowed()) {
            if (activeFx === 'net') destroyNet();
            if (activeFx === 'waves') destroyWaves();
            if (activeFx === 'cells') destroyCells();
            if (activeFx === 'lines') host.classList.add('is-off');
            return;
        }
        if (activeFx === 'net' && !netEffect) createNet();
        if (activeFx === 'waves' && !wavesEffect) createWaves();
        if (activeFx === 'cells' && !cellsEffect) createCells();
        if (activeFx === 'lines') host.classList.remove('is-off');
    }

    resize();
    applyColor();
    host.classList.add('is-off');
    window.addEventListener('resize', resize);

    if (window.gsap) {
        gsap.ticker.add(tick);
    } else {
        (function loop() { tick(); requestAnimationFrame(loop); })();
    }

    const fx1 = document.getElementById('bg-fx-1');
    if (fx1) fx1.addEventListener('click', function () { setFx('cells'); });
    const fx2 = document.getElementById('bg-fx-2');
    if (fx2) fx2.addEventListener('click', function () { setFx('waves'); });
    const fx3 = document.getElementById('bg-fx-3');
    if (fx3) fx3.addEventListener('click', function () { setFx('net'); });
    const fx4 = document.getElementById('bg-fx-4');
    if (fx4) fx4.addEventListener('click', function () { setFx('lines'); });

    let heroGranim = null;
    function syncHeroGranim() {
        const el = document.getElementById('hero-gradient-overlay');
        if (!el || typeof window.Granim === 'undefined') return;
        if (!siteMotionAllowed()) {
            if (heroGranim) heroGranim.pause();
            return;
        }
        if (!heroGranim) {
            heroGranim = new Granim({
                element: '#hero-gradient-overlay',
                direction: 'diagonal',
                isPausedWhenNotInView: true,
                states: {
                    'default-state': {
                        gradients: SCROLL_STOPS.map(function (hex) {
                            const c = toCss(hex);
                            return [c, c];
                        }),
                        transitionSpeed: HERO_SPEED
                    }
                }
            });
        } else {
            heroGranim.play();
        }
    }
    syncHeroGranim();
    const observer = new MutationObserver(function () {
        syncHeroGranim();
        syncFxWithMotion();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', function () {
        syncHeroGranim();
        syncFxWithMotion();
    });
})();

/* ─── HERO STAGE 2.5D/3D — capas con paralaje de scroll + mouse/drag (GSAP) ─── */
/* ─── HERO STAGE — 16 capas PNG reales, paralaje PLANO por profundidad (sin rotación 3D) ───
   Mecánica: cada capa tiene un "multiplicador de profundidad" (data-depth, 0..1). La capa 16
   (fondo) casi no se mueve; la capa 1 (primer plano) se mueve mucho. Hover + Click&Pan usan
   gsap.quickTo para una inercia/suavidad orgánica. Sin rotación de escena ni scroll-scrub,
   para evitar la sensación de mareo. ─── */
/* ── Fase 1: Scroll suave global (Lenis) sincronizado con GSAP/ScrollTrigger ──
   Si el usuario prefiere movimiento reducido o activa "Frenar animaciones" /
   "Sitio minimalista", Lenis se destruye y el scroll nativo del navegador
   (incluida la navegación por teclado y lectores de pantalla) queda intacto. */
(function initSmoothScroll() {
    const hasGSAP = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
    const hasLenis = typeof window.Lenis !== 'undefined';
    if (hasGSAP && hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    if (!hasLenis) return;

    let lenis = null;
    let tickerFn = null;

    function destroyLenis() {
        if (tickerFn && hasGSAP) { gsap.ticker.remove(tickerFn); tickerFn = null; }
        if (lenis) { lenis.destroy(); lenis = null; }
        document.documentElement.classList.remove('lenis-active');
    }

    function createLenis() {
        if (lenis) return;
        lenis = new Lenis({
            duration: 1.05,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            anchors: true
        });
        if (hasGSAP) {
            tickerFn = (time) => lenis.raf(time * 1000);
            gsap.ticker.add(tickerFn);
            gsap.ticker.lagSmoothing(0);
        } else {
            const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
            requestAnimationFrame(raf);
        }
        if (hasScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
        lenis.on('scroll', function (e) {
            const progress = (e && typeof e.progress === 'number')
                ? e.progress
                : (lenis.limit ? lenis.scroll / lenis.limit : 0);
            if (typeof window.__sensoriScrollColor === 'function') {
                window.__sensoriScrollColor(progress);
            }
        });
        document.documentElement.classList.add('lenis-active');
    }

    function sync() {
        if (siteMotionAllowed()) createLenis();
        else destroyLenis();
    }

    window.__lenis = { get instance() { return lenis; } };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    const reduceMotionMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotionMQ.addEventListener?.('change', sync);
})();

(function initHeroScene() {
    const stage = document.getElementById('hero-stage');
    const root = document.getElementById('hero-parallax-root');
    if (!stage || !root) return;

    const hasGSAP = typeof window.gsap !== 'undefined';
    const hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
    const layers = Array.from(root.querySelectorAll('.hero-layer'));
    const monolith = root.querySelector('.hero-layer--monolith');
    if (!layers.length) return;

    function motionAllowed() {
        return siteMotionAllowed();
    }

    /* ── Fallback sin GSAP: deja la escena estática pero visible/legible ── */
    if (!hasGSAP) return;
    if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const HOVER_MAX = 22;       // px — desplazamiento máx. en hover para la capa más cercana (depth=1)
    const PAN_LIMIT = 160;      // px — arrastre necesario para saturar el "pan" al 100%
    const PAN_MAX = 40;         // px — desplazamiento máx. al arrastrar para la capa más cercana
    const EASE_DURATION = 1.2;  // s — inercia/suavidad del movimiento

    let setters = [];
    let entranceTl = null;
    let scrollTl = null;
    let dragging = false;
    let dragStartX = 0, dragStartY = 0;
    let hoverX = 0, hoverY = 0;
    let panX = 0, panY = 0;

    function buildQuickSetters() {
        setters = layers.map(layer => {
            const depth = parseFloat(layer.dataset.depth) || 0;
            return {
                depth,
                x: gsap.quickTo(layer, 'x', { duration: EASE_DURATION, ease: 'power3.out' }),
                y: gsap.quickTo(layer, 'y', { duration: EASE_DURATION, ease: 'power3.out' })
            };
        });
    }

    function render() {
        if (!motionAllowed()) return;
        const sx = dragging ? panX : hoverX;
        const sy = dragging ? panY : hoverY;
        setters.forEach(s => { s.x(sx * s.depth); s.y(sy * s.depth); });
    }

    /* ── Hover parallax: desplazamiento suave según la posición del cursor ── */
    function updateHover(clientX, clientY) {
        const rect = stage.getBoundingClientRect();
        const nx = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
        const ny = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1));
        hoverX = nx * HOVER_MAX;
        hoverY = ny * HOVER_MAX * 0.55;
    }

    /* ── Click & Pan: al arrastrar, la escena se desplaza según el delta del arrastre ── */
    function updatePan(clientX, clientY) {
        const ratioX = Math.max(-1, Math.min(1, (clientX - dragStartX) / PAN_LIMIT));
        const ratioY = Math.max(-1, Math.min(1, (clientY - dragStartY) / PAN_LIMIT));
        panX = ratioX * PAN_MAX;
        panY = ratioY * PAN_MAX * 0.65;
    }

    stage.addEventListener('pointermove', (e) => {
        if (!motionAllowed()) return;
        if (dragging) { updatePan(e.clientX, e.clientY); render(); return; }
        if (window.matchMedia('(hover: hover)').matches) { updateHover(e.clientX, e.clientY); render(); }
    });
    stage.addEventListener('pointerdown', (e) => {
        // No interferir con controles interactivos reales (botones, links, checkbox del
        // interruptor). Ojo: NO excluir todo ".hero-stage-content", porque ese contenedor
        // ahora ocupa el ancho completo del hero y bloquearía el arrastre en casi toda la escena.
        if (e.target.closest('a, button, input, label, select, textarea')) return;
        // Evita que el navegador inicie selección de texto / "drag ghost" nativo de las
        // imágenes al hacer clic-arrastre o doble clic, lo que dejaría en evidencia los
        // bordes rectangulares de cada capa PNG superpuesta.
        e.preventDefault();
        if (!motionAllowed()) return;
        dragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        stage.classList.add('is-panning');
    });
    function endDrag() {
        if (!dragging) return;
        dragging = false;
        stage.classList.remove('is-panning');
        render(); // vuelve con inercia (quickTo) a la posición de hover actual
    }
    window.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);
    stage.addEventListener('pointerleave', () => {
        if (dragging) { endDrag(); return; }
        hoverX = 0; hoverY = 0;
        render();
    });

    /* ── Entrada: las capas aparecen con fundido y el monolito "aterriza" con
       peso orgánico (rebote suave), como si emergiera desde el suelo ── */
    function playEntrance() {
        if (entranceTl) { entranceTl.kill(); entranceTl = null; }
        if (!motionAllowed()) {
            gsap.set(layers, { opacity: 1 });
            if (monolith) gsap.set(monolith, { clearProps: 'transform' });
            return;
        }
        const others = monolith ? layers.filter(l => l !== monolith) : layers;
        const farLayers = others.filter(l => (parseFloat(l.dataset.depth) || 0) < 0.58);
        const nearLayers = others.filter(l => (parseFloat(l.dataset.depth) || 0) >= 0.58);

        gsap.set(layers, { opacity: 0 });
        if (monolith) gsap.set(monolith, { y: 70, scale: 0.9 });

        entranceTl = gsap.timeline({ delay: 0.1 })
            .to(farLayers, { opacity: 1, duration: 1.1, ease: 'power1.out', stagger: 0.04 }, 0);
        if (monolith) {
            entranceTl.to(monolith, { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: 'back.out(1.6)' }, 0.3);
        }
        entranceTl.to(nearLayers, { opacity: 1, duration: 0.9, ease: 'power1.out', stagger: 0.05 }, 0.55);
    }

    /* ── Animación ligada al scroll (ScrollTrigger): a medida que la escena se
       desplaza fuera de vista, las capas escalan y se mueven a distintas
       velocidades según su profundidad, dando sensación de cámara avanzando.
       No usa pin ni perspectiva 3D (evita mareo); solo traslada en Y (%) y
       escala levemente, dentro del alto propio del hero. */
    function buildScrollAnimation() {
        if (scrollTl) { scrollTl.scrollTrigger?.kill(); scrollTl.kill(); scrollTl = null; }
        if (!hasScrollTrigger || !motionAllowed()) return;

        scrollTl = gsap.timeline({
            scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom top', scrub: true }
        });
        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth) || 0;
            if (layer === monolith) {
                // El monolito se mantiene estable (ya "aterrizó" en la entrada); solo un desplazamiento sutil en Y.
                scrollTl.to(layer, { yPercent: -6, ease: 'none' }, 0);
            } else {
                scrollTl.to(layer, { yPercent: -(4 + depth * 16), scale: 1 + depth * 0.07, ease: 'none' }, 0);
            }
        });
    }

    function boot() {
        gsap.killTweensOf(layers);
        buildQuickSetters();
        if (motionAllowed()) {
            playEntrance();
            buildScrollAnimation();
        } else {
            if (scrollTl) { scrollTl.scrollTrigger?.kill(); scrollTl.kill(); scrollTl = null; }
            gsap.set(layers, { clearProps: 'transform,opacity' });
        }
    }

    boot();

    // Reacciona al toggle de accesibilidad "Frenar animaciones" / "Sitio minimalista"
    const observer = new MutationObserver(() => { boot(); });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', boot);
    window.addEventListener('load', () => hasScrollTrigger && ScrollTrigger.refresh());
})();

(function initMoodButtons() {
    const moodInputs = document.querySelectorAll('input[name="hero-mood"][data-mood]');
    const msgModal = document.getElementById('mood-msg-modal');
    const msgCard = document.getElementById('mood-msg-card');
    const msgTitle = document.getElementById('mood-msg-title');
    const msgText = document.getElementById('mood-msg-text');
    const sadOverlay = document.getElementById('mood-sad-overlay');
    const jokeModal = document.getElementById('joke-modal');
    const jokeText = document.getElementById('joke-text');
    if (!moodInputs.length) return;

    const MESSAGES = {
        happy: { title: '¡Qué alegría!', text: '¡Qué alegría saber que hoy te sientes así! Esa luz también contagia. Si te nace, compártela: un mensaje cariñoso, un abrazo o una canción pueden hacer florecer el día de alguien más.' },
        neutral: { title: 'Está bien así', text: 'No sentir mucho a veces también es parte de la vida. No tienes que forzar nada: respira, date tiempo… y cuando quieras, aquí hay nuevas experiencias esperándote con nosotros. ¡Anímate!' },
        sad: { title: 'Tu tristeza también merece espacio', text: 'Lo que sientes es válido. No tienes que apresurarte a «estar bien». Nombrar lo difícil —sin juzgarte— es el primer paso para volver a respirar con calma. Estás en un lugar seguro.' }
    };

    const JOKES = [
        '¿Qué le dice un semáforo a otro? No me mires, que me estoy cambiando.',
        '¿Por qué el libro de matemáticas estaba triste? Porque tenía demasiados problemas.',
        '¿Qué hace una abeja en el gimnasio? Zumba.',
        'Un pez le pregunta a otro: «¿Qué hace tu papá?» — «Nada.»',
        '¿Qué hace una vaca cuando ve una foto? Dice «muuuucho gusto».'
    ];
    let jokeIdx = 0;

    const extra = document.getElementById('mood-msg-extra');

    function openMoodMsg(mood) {
        const m = MESSAGES[mood];
        if (!m || !msgModal) return;
        msgCard.className = 'mood-msg-card mood-msg-card--' + mood + ' one-div';
        msgTitle.textContent = m.title;
        msgText.textContent = m.text;
        if (extra) extra.hidden = mood !== 'sad';
        msgModal.hidden = false;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => msgModal.classList.add('is-open'));
        });
    }
    function closeMoodMsg() {
        msgModal?.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => { if (msgModal && !msgModal.classList.contains('is-open')) msgModal.hidden = true; }, 280);
    }
    function closeSadOverlay() {
        sadOverlay.classList.remove('is-open');
        sadOverlay.hidden = true;
        document.body.style.overflow = '';
    }
    function closeJokeModal() {
        jokeModal.classList.remove('is-open');
        jokeModal.hidden = true;
    }
    function showJoke() {
        jokeText.textContent = JOKES[jokeIdx % JOKES.length];
        jokeIdx++;
        jokeModal.hidden = false;
        requestAnimationFrame(() => jokeModal.classList.add('is-open'));
    }

    function onMood(mood) {
        openMoodMsg(mood);
    }

    moodInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            e.stopPropagation();
            if (input.checked) onMood(input.dataset.mood || input.value);
        });
    });

    document.getElementById('mood-msg-close')?.addEventListener('click', closeMoodMsg);
    msgModal?.addEventListener('click', (e) => { if (e.target === msgModal) closeMoodMsg(); });

    document.getElementById('mood-sad-home')?.addEventListener('click', () => {
        closeSadOverlay(); closeJokeModal();
        document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('mood-sad-joke')?.addEventListener('click', () => { closeMoodMsg(); showJoke(); });
    document.getElementById('joke-another')?.addEventListener('click', showJoke);
    document.getElementById('joke-done')?.addEventListener('click', () => {
        closeJokeModal();
        document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' });
    });
    sadOverlay?.addEventListener('click', (e) => { if (e.target === sadOverlay) closeSadOverlay(); });
    jokeModal?.addEventListener('click', (e) => { if (e.target === jokeModal) closeJokeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeMoodMsg(); closeSadOverlay(); closeJokeModal(); }
    });
})();

(function initFloatingInstruments() {
    let audioCtx = null;
    let orchTimer = null;

    function getCtx() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    function playTone(freq, duration, type, vol) {
        try {
            const ctx = getCtx();
            const t = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type || 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + duration + 0.05);
        } catch (e) { /* */ }
    }

    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.removeAttribute('hidden');
        document.querySelectorAll('.music-float-btn').forEach(b => b.classList.add('is-hidden'));
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => modal.classList.add('is-open'));
        getCtx();
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('is-open');
        document.querySelectorAll('.music-float-btn').forEach(b => b.classList.remove('is-hidden'));
        document.body.style.overflow = '';
        if (id === 'orchestra-modal') {
            if (orchTimer) { clearTimeout(orchTimer); orchTimer = null; }
            document.getElementById('orchestra-stage')?.classList.remove('orchestra-playing');
        }
        setTimeout(() => { if (!modal.classList.contains('is-open')) modal.setAttribute('hidden', ''); }, 350);
    }

    document.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', (e) => { e.stopPropagation(); closeModal(el.getAttribute('data-close-modal')); });
    });

    const GUITAR_STRINGS = [
        { label: 'Mi', f: 82.41 }, { label: 'La', f: 110 }, { label: 'Re', f: 146.83 },
        { label: 'Sol', f: 196 }, { label: 'Si', f: 246.94 }, { label: 'Mi', f: 329.63 }
    ];
    const guitarEl = document.getElementById('guitar-strings');
    GUITAR_STRINGS.forEach(s => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pluck-string';
        btn.textContent = s.label;
        btn.addEventListener('click', () => playTone(s.f, 1.8, 'triangle', 0.14));
        guitarEl?.appendChild(btn);
    });

    const SAX_NOTES = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
    const SAX_LABELS = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'];
    document.querySelectorAll('#sax-keys .sax-key-group').forEach((group) => {
        const i = Number(group.getAttribute('data-note'));
        group.setAttribute('role', 'button');
        group.setAttribute('tabindex', '0');
        group.setAttribute('aria-label', 'Nota ' + (SAX_LABELS[i] || (i + 1)));
        const play = () => {
            const f = SAX_NOTES[i];
            if (!f) return;
            playTone(f, 1.2, 'sawtooth', 0.06);
            group.classList.add('is-pressed');
            window.setTimeout(() => group.classList.remove('is-pressed'), 180);
        };
        group.addEventListener('click', play);
        group.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
        });
    });

    // Cuerdas ya dibujadas en el SVG — solo unimos sonido
    const HARP_NOTES = [349.23, 392, 440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99, 880];
    const HARP_LABELS = ['Fa', 'Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La'];
    document.querySelectorAll('#harp-strings .harp-string-group').forEach((group) => {
        const i = Number(group.getAttribute('data-note'));
        const line = group.querySelector('.harp-string');
        group.setAttribute('role', 'button');
        group.setAttribute('tabindex', '0');
        group.setAttribute('aria-label', 'Cuerda ' + (HARP_LABELS[i] || (i + 1)));
        const pluck = () => {
            const f = HARP_NOTES[i];
            if (!f) return;
            playTone(f, 2.2, 'sine', 0.1);
            line?.classList.remove('is-plucked');
            if (line) void line.getBoundingClientRect();
            line?.classList.add('is-plucked');
            window.setTimeout(() => line?.classList.remove('is-plucked'), 450);
        };
        group.addEventListener('click', pluck);
        group.addEventListener('pointerenter', (e) => { if (e.buttons === 1) pluck(); });
        group.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pluck(); }
        });
    });

    const NEM_MELODY = [
        659.25, 493.88, 392, 493.88, 659.25, 783.99, 987.77, 783.99,
        659.25, 493.88, 392, 329.63, 392, 493.88, 659.25, 783.99,
        987.77, 783.99, 659.25, 523.25, 659.25, 783.99, 987.77, 1174.66
    ];

    function playOrchestraMelody() {
        const stage = document.getElementById('orchestra-stage');
        const status = document.getElementById('orchestra-status');
        stage?.classList.add('orchestra-playing');
        if (status) status.textContent = 'Reproduciendo melodía…';
        let i = 0;
        const step = 0.55;
        function next() {
            if (i >= NEM_MELODY.length) {
                stage?.classList.remove('orchestra-playing');
                if (status) status.textContent = 'Melodía finalizada. Cierra cuando quieras.';
                return;
            }
            const f = NEM_MELODY[i];
            playTone(f, step * 0.9, i % 3 === 0 ? 'triangle' : 'sine', 0.09);
            if (i % 2 === 0) playTone(f * 0.5, step, 'sine', 0.04);
            i++;
            orchTimer = setTimeout(next, step * 1000);
        }
        next();
    }

    const bindFloat = (id, modalId, extra) => {
        document.getElementById(id)?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(modalId);
            extra?.();
        });
    };

    bindFloat('guitar-float-btn', 'guitar-modal');
    bindFloat('sax-float-btn', 'sax-modal');
    bindFloat('harp-float-btn', 'harp-modal');
    bindFloat('orchestra-float-btn', 'orchestra-modal', playOrchestraMelody);

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        ['guitar-modal','sax-modal','harp-modal','orchestra-modal'].forEach(closeModal);
    });
})();

(function initFreqExplore() {
    const modal = document.getElementById('freq-explore-modal');
    const body = document.getElementById('freq-explore-body');
    const fx = document.getElementById('freq-explore-fx');
    if (!modal || !body) return;

    const DATA = {
        musical: {
            title: '40 Hz · Musical Inmersivo',
            fx: '<svg viewBox="0 0 200 100" width="100%" height="100%"><path d="M0,50 Q30,30 60,50 T120,50 T180,50" fill="none" stroke="#8B6914" stroke-width="2"/></svg>',
            html: '<p class="font-hand text-xl text-sensori-greenDeep font-bold">Música Inmersiva con Vibraciones</p><p class="text-base leading-relaxed text-gray-700">Usamos instrumentos reales conectados a un sistema que convierte el sonido en vibraciones suaves que recorren el cuerpo (30–120 Hz). Ayuda a relajar músculos tensos y reducir estrés.</p><p class="text-base leading-relaxed text-gray-700">Sesiones de 30–45 minutos en un espacio cálido de madera. No necesitas saber música.</p><a href="#contacto" class="inline-block mt-2 text-base font-bold text-sensori-greenDeep hover:text-sensori-mustard">Quiero participar gratis →</a>'
        },
        vr: {
            title: 'VR · Realidad Mixta',
            fx: '<svg viewBox="0 0 100 80" width="100%" height="100%"><circle cx="30" cy="40" r="5" fill="none" stroke="#3949AB"/><circle cx="70" cy="40" r="5" fill="none" stroke="#3949AB"/></svg>',
            html: '<p class="font-hand text-xl text-sensori-greenDeep font-bold">Realidad Mixta Accesible</p><p class="text-base leading-relaxed text-gray-700">Exploramos mundos virtuales con mandos adaptados, switches y pantallas calibradas para cada persona. Ideal para entrenar foco, propiocepción y creatividad espacial.</p><a href="#contacto" class="inline-block mt-2 text-base font-bold text-sensori-greenDeep">Consultar horarios →</a>'
        },
        neuro: {
            title: 'Música · Neurodivergencia',
            fx: '<svg viewBox="0 0 200 60" width="100%" height="100%"><path d="M0,30 Q50,15 100,30 T200,30" fill="none" stroke="#6B8F5E" stroke-width="2"/></svg>',
            html: '<p class="font-hand text-xl text-sensori-greenDeep font-bold">Música para la Neurodivergencia</p><p class="text-base leading-relaxed text-gray-700">Clases 100% gratuitas con aprendizaje alternativo: colores, gestos, rutinas visuales y ritmo. Para niñas y niños con autismo, TDAH y perfiles diversos.</p><a href="#contacto" class="inline-block mt-2 text-base font-bold text-sensori-greenDeep">Inscribirme →</a>'
        },
        cuidadoras: {
            title: 'Cuidadoras & Familia',
            fx: '<svg viewBox="0 0 80 80" width="100%" height="100%"><path d="M40,65 C25,50 15,35 40,20 C65,35 55,50 40,65" fill="none" stroke="#C97064" stroke-width="2"/></svg>',
            html: '<p class="font-hand text-xl text-sensori-greenDeep font-bold">Espacio para quienes cuidan</p><p class="text-base leading-relaxed text-gray-700">Talleres y charlas gratuitas de autocuidado, regulación emocional y herramientas para el hogar. Un círculo de apoyo para madres, padres y cuidadores.</p><a href="#contacto" class="inline-block mt-2 text-base font-bold text-sensori-greenDeep">Quiero participar →</a>'
        },
        cap: {
            title: 'Capacitación en Inclusión',
            fx: '<svg viewBox="0 0 80 80" width="100%" height="100%"><circle cx="40" cy="40" r="30" fill="none" stroke="#5A6B8F" stroke-width="1.5"/></svg>',
            html: '<p class="font-hand text-xl text-sensori-greenDeep font-bold">Capacitación Comunitaria</p><p class="text-base leading-relaxed text-gray-700">Formamos a educadores, vecinos y funcionarios en accesibilidad digital, lenguaje respetuoso y planificación de eventos inclusivos en Padre Hurtado.</p><a href="#contacto" class="inline-block mt-2 text-base font-bold text-sensori-greenDeep">Solicitar capacitación →</a>'
        }
    };

    function open(id) {
        const d = DATA[id];
        if (!d) return;
        body.innerHTML = '<h2 class="font-hand text-2xl text-sensori-greenDeep mb-3">' + d.title + '</h2>' + d.html;
        if (fx) fx.innerHTML = d.fx;
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => modal.classList.add('is-open'));
    }
    function close() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => { if (!modal.classList.contains('is-open')) modal.setAttribute('hidden', ''); }, 350);
    }

    document.querySelectorAll('.freq-open-btn').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); open(btn.dataset.freqId); });
    });
    document.getElementById('freq-explore-close')?.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

(function initHeroButterflies() {
    const canvas = document.getElementById('hero-butterflies');
    const frame = canvas?.closest('.hero-stage');
    if (!canvas || !frame) return;
    const ctx = canvas.getContext('2d');
    const COLORS = ['#B8D4A8','#E5D4A0','#C9B8E8','#A8C4D4','#E8B8AE','#D4E4C8'];
    let bugs = [];
    let animId = null;

    function resize() {
        const r = frame.getBoundingClientRect();
        canvas.width = r.width;
        canvas.height = r.height;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn() {
        if (document.body.classList.contains('motion-stopped')) return;
        if (bugs.length >= 4) return;
        if (Math.random() > 0.012) return;
        bugs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.85 + canvas.height * 0.05,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.4,
            size: 3 + Math.random() * 3,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            wing: Math.random() * Math.PI * 2,
            life: 180 + Math.random() * 120
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        spawn();
        bugs = bugs.filter(b => {
            b.x += b.vx;
            b.y += b.vy;
            b.wing += 0.25;
            b.life--;
            const flap = Math.sin(b.wing) * b.size * 0.8;
            ctx.fillStyle = b.color;
            ctx.globalAlpha = 0.65;
            ctx.beginPath();
            ctx.ellipse(b.x - flap, b.y, b.size, b.size * 0.6, -0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(b.x + flap, b.y, b.size, b.size * 0.6, 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            return b.life > 0 && b.x > -10 && b.x < canvas.width + 10;
        });
        animId = requestAnimationFrame(draw);
    }
    if (!document.body.classList.contains('motion-stopped')) draw();
})();

/* ══════════════════════════════════════════════════
   EXPERIENCIA 8 — Gatitos Voladores con Profesiones
   ══════════════════════════════════════════════════ */
(function initKittens() {
    const cvs = document.getElementById('kittens-canvas');
    const ctx = cvs ? cvs.getContext('2d') : null;
    if (!ctx) return;

    let W, H, active = false, rafId = null, prevT = 0;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const PI2 = Math.PI * 2;

    /* ── Profesiones: nombre + función de dibujo del outfit ── */
    const JOBS = [
        {
            name:'Doctor', color:'#E0F0FF',
            draw(x,y,s){ // bata blanca + cruz roja
                ctx.fillStyle='rgba(240,248,255,0.92)';
                ctx.beginPath(); ctx.roundRect(x-s*.28,y-s*.05,s*.56,s*.5,s*.08); ctx.fill();
                ctx.strokeStyle='rgba(180,210,240,0.6)'; ctx.lineWidth=s*.025; ctx.stroke();
                ctx.fillStyle='#E53E3E';
                ctx.fillRect(x-s*.05,y+s*.08,s*.10,s*.26);
                ctx.fillRect(x-s*.13,y+s*.15,s*.26,s*.10);
                // estetoscopio
                ctx.strokeStyle='#4A5568'; ctx.lineWidth=s*.03; ctx.lineCap='round';
                ctx.beginPath(); ctx.arc(x+s*.18,y+s*.02,s*.08,0,Math.PI); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x+s*.1,y+s*.02); ctx.lineTo(x+s*.1,y+s*.25); ctx.stroke();
            }
        },
        {
            name:'Bombero', color:'#FFF0E0',
            draw(x,y,s){ // casco rojo + chaqueta amarilla
                ctx.fillStyle='#F6AD55';
                ctx.beginPath(); ctx.roundRect(x-s*.28,y-s*.05,s*.56,s*.5,s*.08); ctx.fill();
                // franjas reflectantes
                ctx.strokeStyle='rgba(255,255,255,0.7)'; ctx.lineWidth=s*.06;
                ctx.beginPath(); ctx.moveTo(x-s*.28,y+s*.28); ctx.lineTo(x+s*.28,y+s*.28); ctx.stroke();
                // casco
                ctx.fillStyle='#E53E3E';
                ctx.beginPath(); ctx.arc(x,y-s*.42,s*.28,Math.PI,0); ctx.fill();
                ctx.fillRect(x-s*.32,y-s*.42,s*.64,s*.06);
                ctx.fillStyle='#FC8181';
                ctx.beginPath(); ctx.arc(x,y-s*.42,s*.22,Math.PI,0); ctx.fill();
                // visera
                ctx.fillStyle='rgba(0,0,0,0.25)';
                ctx.beginPath(); ctx.arc(x,y-s*.42,s*.28,Math.PI+.3,-.3); ctx.lineTo(x,y-s*.42); ctx.closePath(); ctx.fill();
            }
        },
        {
            name:'Chef', color:'#F0FFF0',
            draw(x,y,s){ // delantal + gorro
                ctx.fillStyle='rgba(245,245,245,0.9)';
                ctx.beginPath(); ctx.roundRect(x-s*.22,y-s*.05,s*.44,s*.5,s*.06); ctx.fill();
                ctx.strokeStyle='rgba(200,200,200,0.5)'; ctx.lineWidth=s*.02; ctx.stroke();
                // bolsillo
                ctx.strokeStyle='#ccc'; ctx.lineWidth=s*.02;
                ctx.strokeRect(x-s*.1,y+s*.22,s*.2,s*.14);
                // gorro de chef
                ctx.fillStyle='white';
                ctx.beginPath(); ctx.roundRect(x-s*.2,y-s*.72,s*.4,s*.32,s*.04); ctx.fill();
                ctx.fillRect(x-s*.14,y-s*.42,s*.28,s*.04);
                // cuadros en el gorro
                ctx.fillStyle='rgba(0,0,0,0.08)';
                for(let ci=0;ci<4;ci++) for(let ri=0;ri<2;ri++)
                    ctx.fillRect(x-s*.2+ci*s*.1+(ri%2?s*.05:0),y-s*.72+ri*s*.1,s*.08,s*.08);
            }
        },
        {
            name:'Astronauta', color:'#E8E8FF',
            draw(x,y,s){ // traje espacial + casco
                ctx.fillStyle='rgba(240,240,255,0.9)';
                ctx.beginPath(); ctx.roundRect(x-s*.3,y-s*.08,s*.6,s*.55,s*.1); ctx.fill();
                ctx.strokeStyle='rgba(180,180,240,0.5)'; ctx.lineWidth=s*.025; ctx.stroke();
                // parche NASA
                ctx.fillStyle='#3182CE';
                ctx.beginPath(); ctx.arc(x-s*.16,y+s*.08,s*.1,0,PI2); ctx.fill();
                ctx.fillStyle='white'; ctx.font=`bold ${s*.09}px sans-serif`; ctx.textAlign='center';
                ctx.fillText('★',x-s*.16,y+s*.12);
                // casco esférico
                ctx.fillStyle='rgba(200,220,255,0.85)';
                ctx.strokeStyle='rgba(150,180,240,0.7)'; ctx.lineWidth=s*.04;
                ctx.beginPath(); ctx.arc(x,y-s*.42,s*.3,0,PI2); ctx.fill(); ctx.stroke();
                // visor oscuro
                ctx.fillStyle='rgba(30,40,80,0.55)';
                ctx.beginPath(); ctx.arc(x,y-s*.42,s*.2,-.7,Math.PI+.7); ctx.fill();
                ctx.fillStyle='rgba(255,255,255,0.3)';
                ctx.beginPath(); ctx.arc(x-s*.06,y-s*.5,s*.07,0,PI2); ctx.fill();
            }
        },
        {
            name:'Policía', color:'#E8F0FF',
            draw(x,y,s){ // uniforme azul + gorra
                ctx.fillStyle='#2B6CB0';
                ctx.beginPath(); ctx.roundRect(x-s*.28,y-s*.05,s*.56,s*.5,s*.08); ctx.fill();
                // insignia dorada
                ctx.fillStyle='#F6E05E';
                ctx.beginPath(); ctx.arc(x,y+s*.12,s*.1,0,PI2); ctx.fill();
                ctx.fillStyle='#2B6CB0'; ctx.font=`bold ${s*.09}px sans-serif`; ctx.textAlign='center';
                ctx.fillText('★',x,y+s*.16);
                // gorra
                ctx.fillStyle='#2C5282';
                ctx.beginPath(); ctx.roundRect(x-s*.26,y-s*.56,s*.52,s*.18,s*.04); ctx.fill();
                ctx.fillStyle='#1A365D';
                ctx.fillRect(x-s*.28,y-s*.4,s*.56,s*.04);
                ctx.fillStyle='#F6E05E';
                ctx.beginPath(); ctx.arc(x,y-s*.47,s*.08,0,PI2); ctx.fill();
            }
        },
        {
            name:'Superhéroe', color:'#FFF0FF',
            draw(x,y,s){ // capa + máscara
                // Capa (detrás, primero)
                ctx.fillStyle='#E53E3E';
                ctx.beginPath(); ctx.moveTo(x-s*.28,y-s*.05);
                ctx.bezierCurveTo(x-s*.5,y+s*.3,x-s*.3,y+s*.55,x,y+s*.6);
                ctx.bezierCurveTo(x+s*.3,y+s*.55,x+s*.5,y+s*.3,x+s*.28,y-s*.05);
                ctx.closePath(); ctx.fill();
                // Traje
                ctx.fillStyle='#3182CE';
                ctx.beginPath(); ctx.roundRect(x-s*.24,y-s*.05,s*.48,s*.45,s*.08); ctx.fill();
                // Símbolo en el pecho
                ctx.fillStyle='#F6E05E';
                ctx.font=`bold ${s*.22}px sans-serif`; ctx.textAlign='center';
                ctx.fillText('★',x,y+s*.28);
                // Máscara
                ctx.fillStyle='#2C5282';
                ctx.fillRect(x-s*.22,y-s*.44,s*.44,s*.14);
                ctx.fillStyle='rgba(255,255,255,0.3)';
                ctx.beginPath(); ctx.arc(x-s*.1,y-s*.38,s*.06,0,PI2); ctx.fill();
                ctx.beginPath(); ctx.arc(x+s*.1,y-s*.38,s*.06,0,PI2); ctx.fill();
            }
        },
        {
            name:'Pirata', color:'#FFF8E8',
            draw(x,y,s){ // parche + bandana + espada
                // Camisa rayada
                ctx.fillStyle='rgba(240,230,210,0.9)';
                ctx.beginPath(); ctx.roundRect(x-s*.26,y-s*.05,s*.52,s*.5,s*.08); ctx.fill();
                ['#C05020','#805018','#C05020'].forEach((c,i)=>{
                    ctx.fillStyle=c; ctx.globalAlpha=0.35;
                    ctx.fillRect(x-s*.26,y-s*.05+i*s*.14,s*.52,s*.1);
                });
                ctx.globalAlpha=1;
                // Sombrero tricornio
                ctx.fillStyle='#2D3748';
                ctx.beginPath(); ctx.moveTo(x-s*.35,y-s*.36);
                ctx.lineTo(x,y-s*.72); ctx.lineTo(x+s*.35,y-s*.36);
                ctx.closePath(); ctx.fill();
                ctx.strokeStyle='#F6E05E'; ctx.lineWidth=s*.03; ctx.stroke();
                ctx.fillStyle='white'; ctx.font=`${s*.14}px sans-serif`; ctx.textAlign='center';
                ctx.fillText('☠',x,y-s*.42);
                // Parche ojo
                ctx.fillStyle='#1A202C';
                ctx.beginPath(); ctx.arc(x+s*.14,y-s*.38,s*.1,0,PI2); ctx.fill();
                ctx.strokeStyle='#1A202C'; ctx.lineWidth=s*.02;
                ctx.beginPath(); ctx.moveTo(x+s*.04,y-s*.38); ctx.lineTo(x+s*.24,y-s*.38); ctx.stroke();
                // Espada mini
                ctx.strokeStyle='#A0AEC0'; ctx.lineWidth=s*.03;
                ctx.beginPath(); ctx.moveTo(x+s*.2,y); ctx.lineTo(x+s*.32,y+s*.3); ctx.stroke();
                ctx.fillStyle='#F6AD55';
                ctx.beginPath(); ctx.arc(x+s*.2,y,s*.05,0,PI2); ctx.fill();
            }
        },
        {
            name:'Científica', color:'#F0FFF8',
            draw(x,y,s){ // bata + gafas + tubo
                ctx.fillStyle='rgba(240,248,240,0.92)';
                ctx.beginPath(); ctx.roundRect(x-s*.28,y-s*.05,s*.56,s*.5,s*.08); ctx.fill();
                ctx.strokeStyle='rgba(180,220,180,0.5)'; ctx.lineWidth=s*.02; ctx.stroke();
                // botones
                ctx.fillStyle='#68D391';
                [y+s*.04,y+s*.18,y+s*.3].forEach(by=>{
                    ctx.beginPath(); ctx.arc(x,by,s*.03,0,PI2); ctx.fill();
                });
                // gafas protectoras
                ctx.strokeStyle='#4299E1'; ctx.lineWidth=s*.035; ctx.fillStyle='rgba(190,230,255,0.5)';
                [-s*.13,s*.08].forEach(ox=>{
                    ctx.beginPath(); ctx.arc(x+ox,y-s*.36,s*.1,0,PI2); ctx.fill(); ctx.stroke();
                });
                ctx.beginPath(); ctx.moveTo(x-s*.03,y-s*.36); ctx.lineTo(x+s*.08-s*.1,y-s*.36); ctx.stroke();
                // tubo de ensayo
                ctx.strokeStyle='#68D391'; ctx.lineWidth=s*.04; ctx.lineCap='round';
                ctx.beginPath(); ctx.moveTo(x+s*.24,y+s*.02); ctx.lineTo(x+s*.24,y+s*.28); ctx.stroke();
                ctx.fillStyle='#68D391'; ctx.globalAlpha=0.6;
                ctx.beginPath(); ctx.arc(x+s*.24,y+s*.28,s*.05,0,PI2); ctx.fill();
                ctx.globalAlpha=1;
            }
        },
    ];

    /* ── Dibujar GATITO base (sin outfit) ── */
    function drawCatBase(x, y, s, t, dir, flap) {
        ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);

        // Alas (detrás del cuerpo)
        const wa = Math.sin(t * 8) * 0.35;
        ctx.fillStyle = 'rgba(255,240,255,0.85)';
        ctx.strokeStyle = 'rgba(220,180,230,0.5)'; ctx.lineWidth = s * .02;
        // ala izquierda
        ctx.save(); ctx.rotate(-wa);
        ctx.beginPath(); ctx.moveTo(0, -s*.1);
        ctx.bezierCurveTo(-s*.5,-s*.3,-s*.6,s*.2,-s*.15,s*.2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
        // ala derecha
        ctx.save(); ctx.rotate(wa);
        ctx.beginPath(); ctx.moveTo(0, -s*.1);
        ctx.bezierCurveTo(s*.5,-s*.3,s*.6,s*.2,s*.15,s*.2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();

        // Cola
        ctx.strokeStyle = '#F9A8D4'; ctx.lineWidth = s*.06; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s*.2, s*.1);
        ctx.bezierCurveTo(s*.4, s*.3 + Math.sin(t*3)*s*.15, s*.5, s*.0, s*.35, -s*.15);
        ctx.stroke();

        // Cuerpo rechoncho
        ctx.fillStyle = '#FECDD3'; ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = s*.025;
        ctx.beginPath(); ctx.ellipse(0, s*.08, s*.3, s*.22, 0, 0, PI2); ctx.fill(); ctx.stroke();

        // Panza
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath(); ctx.ellipse(0, s*.1, s*.18, s*.14, 0, 0, PI2); ctx.fill();

        // Cabeza grande
        ctx.fillStyle = '#FECDD3'; ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = s*.025;
        ctx.beginPath(); ctx.arc(0, -s*.18, s*.26, 0, PI2); ctx.fill(); ctx.stroke();

        // Mejillas
        ctx.fillStyle = 'rgba(255,150,180,0.45)';
        ctx.beginPath(); ctx.arc(-s*.15, -s*.1, s*.09, 0, PI2); ctx.fill();
        ctx.beginPath(); ctx.arc(s*.15, -s*.1, s*.09, 0, PI2); ctx.fill();

        // Orejas triangulares
        [[-s*.17, -s*.38], [s*.17, -s*.38]].forEach(([ex, ey]) => {
            ctx.fillStyle = '#FECDD3';
            ctx.beginPath(); ctx.moveTo(ex-s*.1,ey+s*.1); ctx.lineTo(ex,ey-s*.1); ctx.lineTo(ex+s*.1,ey+s*.1); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.fillStyle = 'rgba(255,150,180,0.6)';
            ctx.beginPath(); ctx.moveTo(ex-s*.06,ey+s*.08); ctx.lineTo(ex,ey-s*.06); ctx.lineTo(ex+s*.06,ey+s*.08); ctx.closePath(); ctx.fill();
        });

        // Ojos grandes brillantes
        ctx.fillStyle = 'white'; ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = s*.02;
        [[-s*.1, -s*.2], [s*.1, -s*.2]].forEach(([ex, ey]) => {
            ctx.beginPath(); ctx.arc(ex, ey, s*.09, 0, PI2); ctx.fill(); ctx.stroke();
        });
        // Iris
        const irisColors = ['#7C3AED', '#059669', '#B45309', '#1D4ED8', '#BE185D'];
        const ic = irisColors[Math.floor(t) % irisColors.length]; // cambia con el tiempo lento
        ctx.fillStyle = ic;
        [[-s*.1,-s*.2],[s*.1,-s*.2]].forEach(([ex,ey])=>{
            ctx.beginPath(); ctx.arc(ex,ey,s*.062,0,PI2); ctx.fill();
            ctx.fillStyle='#1a1a2e'; ctx.beginPath(); ctx.arc(ex,ey,s*.036,0,PI2); ctx.fill();
            ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(ex+s*.022,ey-s*.025,s*.018,0,PI2); ctx.fill();
            ctx.fillStyle=ic;
        });

        // Nariz pequeña
        ctx.fillStyle = '#F472B6';
        ctx.beginPath(); ctx.arc(0, -s*.1, s*.04, 0, PI2); ctx.fill();

        // Boca feliz
        ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = s*.025; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(-s*.06,-s*.07); ctx.quadraticCurveTo(0,-s*.02,s*.06,-s*.07); ctx.stroke();

        // Bigotes
        ctx.strokeStyle = 'rgba(100,80,100,0.4)'; ctx.lineWidth = s*.018;
        [[-s*.08,-s*.1],[-s*.08,-s*.07],[s*.08,-s*.1],[s*.08,-s*.07]].forEach(([wx,wy])=>{
            ctx.beginPath(); ctx.moveTo(wx,wy); ctx.lineTo(wx<0?wx-s*.2:wx+s*.2,wy); ctx.stroke();
        });

        // Etiqueta de profesión
        ctx.restore();
    }

    /* ── Dibujar gatito completo ── */
    function drawKitten(k) {
        const s = k.size;
        ctx.save(); ctx.translate(k.x, k.y);

        // Sombra
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.beginPath(); ctx.ellipse(0, s*.38, s*.28, s*.07, 0, 0, PI2); ctx.fill();

        // Gatito base
        drawCatBase(0, 0, s, k.t, k.dir, k.flapT);

        // Outfit encima
        JOBS[k.job].draw(0, 0, s);

        // Badge de profesión
        ctx.fillStyle = 'rgba(30,20,50,0.75)';
        ctx.beginPath(); ctx.roundRect(-s*.38, s*.38, s*.76, s*.2, s*.06); ctx.fill();
        ctx.fillStyle = 'white'; ctx.font = `bold ${s*.12}px "Caveat",sans-serif`;
        ctx.textAlign = 'center'; ctx.fillText(JOBS[k.job].name, 0, s*.52);

        ctx.restore();
    }

    /* ── Partículas de corazones y estrellas ── */
    const particles = [];
    function spawnParticle(x, y) {
        const emojis = ['💕','✨','⭐','🌟','💫','🎀','🌸'];
        particles.push({
            x, y, t: emojis[Math.floor(Math.random()*emojis.length)],
            vx: rnd(-1.5, 1.5), vy: rnd(-2.5, -0.5),
            life: 1, size: rnd(14, 22)
        });
    }

    /* ── Estado de los gatitos ── */
    let kittens = [];

    function spawnKitten() {
        // Entra desde un borde aleatorio
        const side = Math.floor(Math.random() * 4);
        let x, y, vx, vy;
        const sp = rnd(60, 120);
        if (side === 0) { x=rnd(0,W); y=-80; vx=rnd(-30,30); vy=sp; }
        else if (side === 1) { x=W+80; y=rnd(0,H); vx=-sp; vy=rnd(-30,30); }
        else if (side === 2) { x=rnd(0,W); y=H+80; vx=rnd(-30,30); vy=-sp; }
        else { x=-80; y=rnd(0,H); vx=sp; vy=rnd(-30,30); }

        kittens.push({
            x, y, vx, vy,
            size: rnd(70, 110),
            job: Math.floor(Math.random() * JOBS.length),
            t: 0,
            flapT: 0,
            dir: vx >= 0 ? 1 : -1,
            wobbleAmp: rnd(20, 45),
            wobbleFreq: rnd(1.5, 3),
            wobblePhase: rnd(0, PI2),
            changeJobAt: performance.now() + rnd(3000, 6000),
            sparkTimer: performance.now() + rnd(500, 1500),
        });
    }

    function initKittens8() {
        kittens = []; particles.length = 0;
        for (let i = 0; i < 7; i++) spawnKitten();
    }

    /* ── Loop principal ── */
    function loop(now) {
        if (!active) return;
        const dt = Math.min((now - prevT) / 1000, 0.05); prevT = now;

        ctx.clearRect(0, 0, W, H);

        // Fondo muy tenue
        ctx.fillStyle = 'rgba(255,240,250,0.08)';
        ctx.fillRect(0, 0, W, H);

        kittens.forEach(k => {
            k.t += dt * 0.8;
            k.flapT += dt;

            // Movimiento ondulante perpendicular a la dirección
            const perpX = -k.vy / (Math.hypot(k.vx, k.vy) || 1);
            const perpY =  k.vx / (Math.hypot(k.vx, k.vy) || 1);
            const wobble = Math.sin(now * 0.001 * k.wobbleFreq + k.wobblePhase) * k.wobbleAmp;

            k.x += k.vx * dt + perpX * wobble * dt;
            k.y += k.vy * dt + perpY * wobble * dt;

            // Dirección de cara
            k.dir = k.vx >= 0 ? 1 : -1;

            // Cambiar profesión periódicamente
            if (now >= k.changeJobAt) {
                k.job = (k.job + 1 + Math.floor(Math.random() * (JOBS.length-1))) % JOBS.length;
                k.changeJobAt = now + rnd(3000, 6000);
                spawnParticle(k.x, k.y);
            }

            // Chispas periódicas
            if (now >= k.sparkTimer) {
                spawnParticle(k.x + rnd(-30,30), k.y + rnd(-30,30));
                k.sparkTimer = now + rnd(800, 2000);
            }

            // Reentrar desde el lado opuesto si sale de pantalla
            const pad = 150;
            if (k.x > W+pad) k.x = -pad;
            else if (k.x < -pad) k.x = W+pad;
            if (k.y > H+pad) k.y = -pad;
            else if (k.y < -pad) k.y = H+pad;

            drawKitten(k);
        });

        // Partículas
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.025;
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.font = `${p.size}px serif`;
            ctx.textAlign = 'center';
            ctx.fillText(p.t, p.x, p.y);
            ctx.restore();
        });
        particles.splice(0, particles.length, ...particles.filter(p => p.life > 0));

        rafId = requestAnimationFrame(loop);
    }

    /* ── Toggle ── */
    window.toggleKittens = function() {
        const checkbox = document.getElementById('exp8-checkbox');
        active = checkbox ? checkbox.checked : !active;
        const overlay = document.getElementById('kittens-overlay');
        overlay.classList.toggle('is-active', active);
        overlay.setAttribute('aria-hidden', !active);
        if (active) {
            W = cvs.width  = window.innerWidth;
            H = cvs.height = window.innerHeight;
            initKittens8();
            prevT = performance.now();
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(rafId);
            ctx.clearRect(0, 0, W, H);
        }
    };

    window.addEventListener('resize', () => {
        if (!active) return;
        W = cvs.width  = window.innerWidth;
        H = cvs.height = window.innerHeight;
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && active) {
            const checkbox = document.getElementById('exp8-checkbox');
            if (checkbox) checkbox.checked = false;
            window.toggleKittens();
        }
    });
})();

/* ══════════════════════════════════════════════════
   MOMENTO RELAX 6 — Nylon de burbujas full-site
   ══════════════════════════════════════════════════ */
(function initBubbleWrap() {
    const cvs = document.getElementById('bwrap-canvas');
    const ctx = cvs ? cvs.getContext('2d') : null;
    if (!ctx) return;

    const SZ = 40;  // diámetro de cada burbuja (px)
    const R  = 17;  // radio de la burbuja clickeable
    let W, H, cols, rows, bubbles = [];
    let poppedCount = 0;
    let active = false;

    /* ── Audio: sonido de pop satisfactorio ── */
    let audioCtx = null;
    function getAC() { return audioCtx || (audioCtx = new (window.AudioContext||window.webkitAudioContext)()); }
    function playPop(variation) {
        try {
            const ac = getAC();
            const dur = 0.07 + variation * 0.03;
            const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) {
                const t = i / d.length;
                d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 4) * 0.6;
            }
            const src = ac.createBufferSource();
            src.buffer = buf;
            const gain = ac.createGain();
            gain.gain.setValueAtTime(0.35 + variation * 0.15, ac.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
            const filter = ac.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 800 + variation * 400;
            filter.Q.value = 1.5;
            src.connect(filter); filter.connect(gain); gain.connect(ac.destination);
            src.start(); src.stop(ac.currentTime + dur);
        } catch(e) {}
    }

    /* ── Construir grilla de burbujas ── */
    function buildGrid() {
        W = cvs.width  = window.innerWidth;
        H = cvs.height = window.innerHeight;
        cols = Math.ceil(W / SZ) + 1;
        rows = Math.ceil(H / SZ) + 1;
        bubbles = [];
        poppedCount = 0;
        updateCounter();
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const offset = r % 2 === 0 ? 0 : SZ * 0.5;
                bubbles.push({
                    x: c * SZ + offset + SZ * 0.5,
                    y: r * SZ + SZ * 0.5,
                    popped: false,
                    popAnim: 0   // 0=intact, >0=popping scale anim
                });
            }
        }
        drawAll();
    }

    /* ── Dibujar una burbuja ── */
    function drawBubble(b) {
        if (b.popped) {
            // Burbuja reventada: huella plana
            ctx.save();
            ctx.globalAlpha = 0.35;
            ctx.fillStyle = 'rgba(140,170,200,0.3)';
            ctx.beginPath(); ctx.arc(b.x, b.y, R * 0.8, 0, Math.PI * 2); ctx.fill();
            // Marcas de burbuja reventada (líneas cortas)
            ctx.strokeStyle = 'rgba(100,140,180,0.4)'; ctx.lineWidth = 1;
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2;
                const r1 = R * 0.3, r2 = R * 0.75;
                ctx.beginPath();
                ctx.moveTo(b.x + Math.cos(a) * r1, b.y + Math.sin(a) * r1);
                ctx.lineTo(b.x + Math.cos(a) * r2, b.y + Math.sin(a) * r2);
                ctx.stroke();
            }
            ctx.restore();
        } else {
            // Burbuja intacta: efecto cristal/nylon
            const scale = b.popAnim > 0 ? 1 + b.popAnim * 0.3 : 1;
            ctx.save();
            if (scale !== 1) { ctx.translate(b.x, b.y); ctx.scale(scale, scale); ctx.translate(-b.x, -b.y); }

            // Sombra suave
            ctx.shadowColor = 'rgba(100,140,200,0.2)';
            ctx.shadowBlur = 4; ctx.shadowOffsetY = 2;

            // Cuerpo de la burbuja (gradiente radial)
            const grad = ctx.createRadialGradient(
                b.x - R * 0.3, b.y - R * 0.35, R * 0.04,
                b.x, b.y, R
            );
            grad.addColorStop(0,   'rgba(255,255,255,0.92)');
            grad.addColorStop(0.25,'rgba(220,235,255,0.72)');
            grad.addColorStop(0.6, 'rgba(180,210,245,0.45)');
            grad.addColorStop(1,   'rgba(140,180,230,0.18)');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(b.x, b.y, R, 0, Math.PI * 2); ctx.fill();

            // Borde
            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(160,200,240,0.55)'; ctx.lineWidth = 1.2;
            ctx.stroke();

            // Reflejo principal (arriba-izquierda)
            ctx.fillStyle = 'rgba(255,255,255,0.75)';
            ctx.beginPath();
            ctx.ellipse(b.x - R*0.28, b.y - R*0.32, R*0.28, R*0.16, -0.6, 0, Math.PI*2);
            ctx.fill();

            // Reflejo secundario (abajo-derecha, tenue)
            ctx.fillStyle = 'rgba(255,255,255,0.25)';
            ctx.beginPath();
            ctx.ellipse(b.x + R*0.25, b.y + R*0.3, R*0.15, R*0.08, 0.5, 0, Math.PI*2);
            ctx.fill();

            ctx.restore();
        }
    }

    /* ── Redibujar todo ── */
    function drawAll() {
        ctx.clearRect(0, 0, W, H);
        // Fondo: el sitio se ve detrás; añadimos tinte mínimo
        ctx.fillStyle = 'rgba(220, 235, 250, 0.55)';
        ctx.fillRect(0, 0, W, H);
        // Patrón de líneas de nylon (muy sutil)
        ctx.strokeStyle = 'rgba(180,210,240,0.12)'; ctx.lineWidth = 0.5;
        for (let c = 0; c <= cols; c++) {
            ctx.beginPath(); ctx.moveTo(c*SZ, 0); ctx.lineTo(c*SZ, H); ctx.stroke();
        }
        for (let r = 0; r <= rows; r++) {
            ctx.beginPath(); ctx.moveTo(0, r*SZ); ctx.lineTo(W, r*SZ); ctx.stroke();
        }
        bubbles.forEach(drawBubble);
    }

    /* ── Actualizar contador ── */
    function updateCounter() {
        const el = document.getElementById('bwrap-counter');
        if (!el) return;
        const total = bubbles.length;
        const pct = total ? Math.round(poppedCount / total * 100) : 0;
        const msg = poppedCount === 0   ? '¡Toca las burbujas! 🫧'
                  : poppedCount < 10   ? `${poppedCount} burbujas reventadas 🫧`
                  : pct < 25           ? `${poppedCount} reventadas — ¡sigue! 😄`
                  : pct < 50           ? `${pct}% reventado — ¡ya te relajas! 😌`
                  : pct < 75           ? `${pct}% — ¡qué satisfacción! 🥰`
                  : pct < 100          ? `${pct}% — ¡casi todas! 🎉`
                  : '¡TODAS REVENTADAS! 🎊🎊🎊';
        el.textContent = msg;
    }

    /* ── Click/Touch: reventar burbuja ── */
    function tryPop(clientX, clientY) {
        const rect = cvs.getBoundingClientRect();
        const mx = clientX - rect.left;
        const my = clientY - rect.top;
        for (let i = 0; i < bubbles.length; i++) {
            const b = bubbles[i];
            if (b.popped) continue;
            const dx = b.x - mx, dy = b.y - my;
            if (dx*dx + dy*dy <= R*R) {
                b.popped = true;
                poppedCount++;
                playPop(Math.random());
                updateCounter();
                drawAll();
                // Animación de micro-onda (burbujas vecinas tiemblan)
                bubbles.forEach(nb => {
                    if (nb.popped) return;
                    const d = Math.hypot(nb.x-b.x, nb.y-b.y);
                    if (d < SZ * 2.2) {
                        nb.popAnim = 0.4 * (1 - d/(SZ*2.2));
                        setTimeout(() => { nb.popAnim = 0; drawAll(); }, 120);
                    }
                });
                break;
            }
        }
    }

    /* ── Drag para reventar múltiples ── */
    let dragging = false;
    cvs.addEventListener('mousedown', e => { dragging = true; tryPop(e.clientX, e.clientY); });
    cvs.addEventListener('mousemove', e => { if (dragging) tryPop(e.clientX, e.clientY); });
    cvs.addEventListener('mouseup',   () => { dragging = false; });
    cvs.addEventListener('touchstart', e => {
        e.preventDefault();
        [...e.changedTouches].forEach(t => tryPop(t.clientX, t.clientY));
    }, {passive: false});
    cvs.addEventListener('touchmove', e => {
        e.preventDefault();
        [...e.changedTouches].forEach(t => tryPop(t.clientX, t.clientY));
    }, {passive: false});

    /* ── Toggle ── */
    window.toggleBubbleWrap = function() {
        const checkbox = document.getElementById('relax6-checkbox');
        active = checkbox ? checkbox.checked : !active;
        const overlay = document.getElementById('bwrap-overlay');
        overlay.classList.toggle('is-active', active);
        overlay.setAttribute('aria-hidden', !active);
        if (active) {
            buildGrid();
        } else {
            ctx.clearRect(0, 0, W, H);
        }
    };

    window.addEventListener('resize', () => { if (active) buildGrid(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && active) {
            const checkbox = document.getElementById('relax6-checkbox');
            if (checkbox) checkbox.checked = false;
            window.toggleBubbleWrap();
        }
    });
})();

/* ══════════════════════════════════════════════════
   MOMENTO RELAX 5 — Nube con unicornios paracaidistas
   ══════════════════════════════════════════════════ */
(function initUnicorns() {
    const cvs = document.getElementById('relax5-canvas');
    const ctx = cvs ? cvs.getContext('2d') : null;
    if (!ctx) { console.warn('relax5-canvas no encontrado'); return; }

    let W, H, active = false, rafId = null;
    const rnd = (a,b) => a + Math.random()*(b-a);

    function resize() { W = cvs.width = window.innerWidth; H = cvs.height = window.innerHeight; }
    window.addEventListener('resize', resize);

    /* ── Paletas ── */
    const PALS = [
        {body:'#F472B6',belly:'#FDE8F3',mane:['#C026D3','#F0ABFC','#818CF8'],horn:'#FCD34D',chute:'#F9A8D4',rope:'#EC4899'},
        {body:'#60A5FA',belly:'#DBEAFE',mane:['#2563EB','#93C5FD','#34D399'],horn:'#FDE68A',chute:'#93C5FD',rope:'#3B82F6'},
        {body:'#4ADE80',belly:'#DCFCE7',mane:['#16A34A','#86EFAC','#FCD34D'],horn:'#FBBF24',chute:'#86EFAC',rope:'#22C55E'},
        {body:'#FB923C',belly:'#FFEDD5',mane:['#EA580C','#FED7AA','#F472B6'],horn:'#FDE047',chute:'#FED7AA',rope:'#F97316'},
        {body:'#C084FC',belly:'#F3E8FF',mane:['#9333EA','#E9D5FF','#67E8F9'],horn:'#FEF08A',chute:'#DDD6FE',rope:'#A855F7'},
    ];

    /* ── Dibuja NUBE (grande, esponjosa, cara graciosa) ── */
    function drawCloud(x, y, wobble) {
        ctx.save(); ctx.translate(x, y);
        // Sombra
        ctx.shadowColor='rgba(160,140,200,0.25)'; ctx.shadowBlur=20; ctx.shadowOffsetY=10;
        ctx.fillStyle='#FFFFFF';
        const puffs=[{x:0,y:0,r:52},{x:-44,y:16,r:36},{x:44,y:16,r:38},
                     {x:-72,y:28,r:24},{x:72,y:28,r:26},{x:0,y:24,r:30}];
        puffs.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
        ctx.shadowBlur=0;
        // Borde
        ctx.strokeStyle='rgba(180,160,220,0.3)'; ctx.lineWidth=2;
        puffs.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.stroke(); });
        // Cara graciosa
        const blink = (Math.floor(performance.now()/2500)%8===0);
        ctx.fillStyle='#6B48C8';
        [-18,18].forEach(ex=>{
            ctx.beginPath();
            if(blink){ ctx.fillRect(ex-6,2,12,4); }
            else { ctx.arc(ex,4,6,0,Math.PI*2); ctx.fill(); ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(ex+2,2,2.5,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#6B48C8'; }
        });
        // Sonrisa amplia
        ctx.strokeStyle='#6B48C8'; ctx.lineWidth=3; ctx.lineCap='round';
        ctx.beginPath(); ctx.arc(0,14,14,0.2,Math.PI-0.2); ctx.stroke();
        // Mejillas rosadas
        ctx.fillStyle='rgba(255,150,180,0.4)';
        ctx.beginPath(); ctx.arc(-20,16,8,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(20,16,8,0,Math.PI*2); ctx.fill();
        ctx.restore();
    }

    /* ── Dibuja PARACAÍDAS ── */
    function drawChute(x, y, swing, pal) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(swing*0.15);
        // Cuerdas
        ctx.strokeStyle=pal.rope; ctx.lineWidth=2; ctx.lineCap='round';
        [-24,-8,8,24].forEach(rx=>{ ctx.beginPath(); ctx.moveTo(rx,-50); ctx.lineTo(0,0); ctx.stroke(); });
        // Domo
        ctx.fillStyle=pal.chute; ctx.strokeStyle='rgba(0,0,0,0.15)'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(0,-50,28,Math.PI,0); ctx.closePath(); ctx.fill(); ctx.stroke();
        // Franjas de colores
        ['#FF6B6B','#FFD700','#6BFF9E','#60A5FA'].forEach((c,i)=>{
            const a1=Math.PI+i*(Math.PI/4), a2=a1+Math.PI/4;
            ctx.fillStyle=c; ctx.globalAlpha=0.35;
            ctx.beginPath(); ctx.moveTo(0,-50); ctx.arc(0,-50,28,a1,a2); ctx.closePath(); ctx.fill();
        });
        ctx.globalAlpha=1;
        ctx.restore();
    }

    /* ── Dibuja UNICORNIO (cartoon networks: cabeza gigante, ojos enormes) ── */
    function drawUnicorn(x, y, pal, t) {
        ctx.save(); ctx.translate(x, y);
        const bounce = Math.sin(t*2)*3;
        ctx.translate(0, bounce);

        const legA = Math.sin(t*4)*0.4;

        // Cola florida
        [pal.mane[0],pal.mane[1],pal.mane[2]].forEach((c,i)=>{
            ctx.strokeStyle=c; ctx.lineWidth=5-i; ctx.lineCap='round';
            ctx.beginPath(); ctx.moveTo(24,-2+i*2);
            ctx.bezierCurveTo(38+Math.cos(t+i)*8,-4+i,42,10+Math.sin(t*1.5+i)*8,32,22+i*3);
            ctx.stroke();
        });

        // Patas (4, animadas)
        ctx.strokeStyle=pal.body; ctx.lineWidth=7; ctx.lineCap='round';
        [[-10,legA],[-2,-legA],[10,legA],[18,-legA]].forEach(([lx,a])=>{
            ctx.save(); ctx.translate(lx,16); ctx.rotate(a);
            ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,20);
            ctx.stroke();
            // Pezuña
            ctx.fillStyle='rgba(0,0,0,0.2)';
            ctx.beginPath(); ctx.ellipse(0,20,5,3,0,0,Math.PI*2); ctx.fill();
            ctx.restore();
        });

        // Cuerpo rechoncho (cartoon)
        ctx.fillStyle=pal.body; ctx.strokeStyle='rgba(0,0,0,0.12)'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.ellipse(4,0,26,18,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
        // Panza clara
        ctx.fillStyle=pal.belly;
        ctx.beginPath(); ctx.ellipse(4,3,16,11,0,0,Math.PI*2); ctx.fill();

        // Cuello
        ctx.fillStyle=pal.body;
        ctx.beginPath(); ctx.moveTo(-14,-8); ctx.lineTo(-22,-28); ctx.lineTo(-6,-26); ctx.lineTo(-2,-6); ctx.closePath(); ctx.fill();
        ctx.strokeStyle='rgba(0,0,0,0.1)'; ctx.lineWidth=1.5; ctx.stroke();

        // Cabeza GRANDE (cartoon)
        ctx.fillStyle=pal.body; ctx.strokeStyle='rgba(0,0,0,0.12)'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(-16,-36,22,0,Math.PI*2); ctx.fill(); ctx.stroke();

        // Mejillas redondas rosas
        ctx.fillStyle='rgba(255,150,180,0.5)';
        ctx.beginPath(); ctx.arc(-28,-32,6,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(-4,-32,6,0,Math.PI*2); ctx.fill();

        // Oreja
        ctx.fillStyle=pal.body;
        ctx.beginPath(); ctx.moveTo(-30,-52); ctx.lineTo(-24,-62); ctx.lineTo(-18,-52); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle='rgba(255,200,220,0.7)';
        ctx.beginPath(); ctx.moveTo(-28,-52); ctx.lineTo(-24,-59); ctx.lineTo(-20,-52); ctx.closePath(); ctx.fill();

        // Cuerno espiral dorado
        ctx.save(); ctx.translate(-16,-58); ctx.rotate(-0.2);
        for(let i=0;i<4;i++){
            ctx.fillStyle=i%2===0?pal.horn:'#FFF176';
            ctx.beginPath(); ctx.ellipse(0,-i*7,5-i*1,3,0,0,Math.PI*2); ctx.fill();
        }
        // Brillito del cuerno
        ctx.fillStyle='white'; ctx.globalAlpha=0.7;
        ctx.beginPath(); ctx.arc(2,-22,2,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha=1;
        ctx.restore();

        // Crin exuberante
        ctx.lineCap='round';
        [0,1,2].forEach(i=>{
            ctx.strokeStyle=pal.mane[i]; ctx.lineWidth=6-i*1.5;
            const wv=Math.sin(t*2+i)*0.3;
            ctx.beginPath(); ctx.moveTo(-6,-8+i*3);
            ctx.bezierCurveTo(-12+wv*5,-20,-22+wv*3,-30,-26,-42+i*3);
            ctx.stroke();
        });

        // OJOS GRANDES (cartoon networks style)
        // Blanco del ojo
        ctx.fillStyle='white'; ctx.strokeStyle='rgba(0,0,0,0.15)'; ctx.lineWidth=1;
        [-22,-4].forEach(ex=>{
            ctx.beginPath(); ctx.arc(ex,-37,8,0,Math.PI*2); ctx.fill(); ctx.stroke();
        });
        // Iris de colores
        ['#7C3AED','#2563EB'].forEach((c,i)=>{
            ctx.fillStyle=c;
            ctx.beginPath(); ctx.arc([-22,-4][i],-37,5.5,0,Math.PI*2); ctx.fill();
        });
        // Pupila
        ctx.fillStyle='#1a1a2e';
        [-22,-4].forEach(ex=>{ ctx.beginPath(); ctx.arc(ex,-37,3,0,Math.PI*2); ctx.fill(); });
        // Brillo del ojo
        ctx.fillStyle='white';
        [-22,-4].forEach(ex=>{ ctx.beginPath(); ctx.arc(ex+2,-39,1.5,0,Math.PI*2); ctx.fill(); });

        // Boca expresiva (sonrisa grande)
        ctx.strokeStyle='rgba(0,0,0,0.6)'; ctx.lineWidth=2.5; ctx.lineCap='round';
        ctx.beginPath(); ctx.arc(-13,-28,6,0.3,Math.PI-0.3); ctx.stroke();
        // Diente gracioso
        ctx.fillStyle='white';
        ctx.fillRect(-16,-29,5,4);
        ctx.fillRect(-10,-29,4,4);

        ctx.restore();
    }

    /* ── Estrellas brillantes ── */
    const sparks=[];
    function addSparks(x,y,pal){
        for(let i=0;i<4;i++) sparks.push({x,y,vx:rnd(-3,3),vy:rnd(-4,-1),r:rnd(3,6),c:pal.mane[i%3],life:1});
    }

    /* ── Estado ── */
    let cloudX=0, cloudY=0, cloudT=0;
    let unis=[];
    let nextDrop=0; // timestamp absoluto del próximo drop
    let dropIdx=0;
    let prevT=0;

    function reset() {
        cloudX = -130; cloudY = H*0.15; cloudT = 0;
        unis=[]; sparks.length=0;
        dropIdx=0;
        // CORRECCIÓN: nextDrop basado en tiempo real, NO en 0
        nextDrop = performance.now() + 800; // primer drop a 0.8s de inicio
    }

    /* ── Loop ── */
    function loop(now) {
        if(!active) return;
        const dt = Math.min((now-prevT)/1000, 0.05); prevT=now;
        cloudT += dt;

        ctx.clearRect(0,0,W,H);

        // Fondo semi-transparente lúdico
        ctx.fillStyle='rgba(255,240,255,0.18)'; ctx.fillRect(0,0,W,H);

        // Mover nube (velocidad constante fija, no dependiente de DURATION)
        cloudX += dt * (W+260) / 12; // cruza en ~12s
        cloudY = H*0.15 + Math.sin(cloudT*0.7)*18;

        // Reiniciar nube al salir (loop continuo hasta que el usuario pare)
        if(cloudX > W+130){ cloudX=-130; dropIdx=0; nextDrop=now+800; }

        // Drop unicornio: timer FIJO, no aleatorio en cada frame
        if(dropIdx < 6 && now >= nextDrop && cloudX > 60 && cloudX < W-60){
            const pal = PALS[dropIdx % PALS.length];
            unis.push({
                x: cloudX + rnd(-20,20),
                y: cloudY + 55,
                vy: rnd(60,90),   // px/s
                swing: 0,
                swingDir: rnd(-1,1)>0?1:-1,
                pal, t:0,
                life:1, done:false
            });
            dropIdx++;
            nextDrop = now + rnd(900,1400); // FIJO hasta el próximo drop
            addSparks(cloudX, cloudY+40, pal);
        }

        // Actualizar y dibujar unicornios
        unis.forEach(u=>{
            if(!u.done){
                u.y += u.vy * dt;
                u.t += dt;
                u.swing += u.swingDir * dt * 1.2;
                if(Math.abs(u.swing)>0.35) u.swingDir*=-1;
                u.x += Math.sin(u.swing)*1.8;
                if(Math.random()<0.04) addSparks(u.x+rnd(-15,15), u.y-30, u.pal);
                if(u.y > H+80) u.done=true;
            }
            if(!u.done){
                drawChute(u.x, u.y-70, u.swing, u.pal);
                drawUnicorn(u.x-16, u.y, u.pal, u.t);
            }
        });
        unis = unis.filter(u=>!u.done);

        // Chispas
        sparks.forEach(s=>{ s.x+=s.vx; s.y+=s.vy; s.vy+=0.15; s.life-=0.03; });
        sparks.splice(0,sparks.length,...sparks.filter(s=>s.life>0));
        sparks.forEach(s=>{
            ctx.beginPath(); ctx.arc(s.x,s.y,s.r*s.life,0,Math.PI*2);
            ctx.fillStyle=s.c; ctx.globalAlpha=s.life*0.9; ctx.fill();
        });
        ctx.globalAlpha=1;

        // Nube al frente
        drawCloud(cloudX, cloudY, cloudT);

        rafId = requestAnimationFrame(loop);
    }

    window.toggleUnicorns = function() {
        const checkbox = document.getElementById('relax5-checkbox');
        active = checkbox ? checkbox.checked : !active;
        const overlay = document.getElementById('relax5-overlay');
        overlay.classList.toggle('is-active', active);
        if(active){
            resize();
            reset();
            prevT = performance.now();
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(rafId);
            ctx.clearRect(0,0,W,H);
        }
    };

    document.addEventListener('keydown', e=>{
        if(e.key==='Escape'&&active){
            const checkbox = document.getElementById('relax5-checkbox');
            if(checkbox) checkbox.checked = false;
            window.toggleUnicorns();
        }
    });
})();

/* ══════════════════════════════════════════════════
   MOMENTO RELAX 4 — Gato persigue ratón (canvas cartoon)
   ══════════════════════════════════════════════════ */
(function initChase() {
    const cvs = document.getElementById('chase-canvas');
    const ctx = cvs ? cvs.getContext('2d') : null;
    if (!ctx) return;

    let active = false, rafId = null;
    let W, H;

    /* ── Resize ── */
    function resize() {
        W = cvs.width  = window.innerWidth;
        H = cvs.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    /* ── Utilidades ── */
    const r = (a,b) => a + Math.random()*(b-a);
    function star(cx,cy,ro,ri,pts,color) {
        ctx.beginPath();
        for(let i=0;i<pts*2;i++){
            const a=(i/(pts*2))*Math.PI*2-Math.PI/2;
            const rad=i%2===0?ro:ri;
            i===0?ctx.moveTo(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad)
                 :ctx.lineTo(cx+Math.cos(a)*rad,cy+Math.sin(a)*rad);
        }
        ctx.closePath(); ctx.fillStyle=color; ctx.fill();
    }

    /* ── Dibujar RATÓN ── */
    function drawMouse(x, y, dir, walk, expr) {
        ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
        const b = Math.sin(walk*Math.PI)*3; // bounce
        ctx.translate(0, b);

        // Cola
        ctx.strokeStyle='#aaa'; ctx.lineWidth=3; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(8,8);
        ctx.bezierCurveTo(28,4,30,-12,18,-18); ctx.stroke();

        // Patas (animadas)
        const la = Math.sin(walk*Math.PI*2)*0.45;
        ctx.strokeStyle='#b0b0b8'; ctx.lineWidth=5;
        [[-5,la],[5,-la]].forEach(([ox,a])=>{
            ctx.save(); ctx.translate(ox,18); ctx.rotate(a);
            ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,14); ctx.lineTo(ox<0?-4:4,17); ctx.stroke();
            ctx.restore();
        });

        // Cuerpo
        ctx.fillStyle='#c0c0c8'; ctx.strokeStyle='#9090a0'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.ellipse(0,8,13,17,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
        // Panza
        ctx.fillStyle='#e0dde8';
        ctx.beginPath(); ctx.ellipse(0,10,8,11,0,0,Math.PI*2); ctx.fill();

        // Brazos
        const aa=Math.sin(walk*Math.PI*2+Math.PI)*0.5;
        ctx.strokeStyle='#b0b0b8'; ctx.lineWidth=4;
        [[-12,aa+0.3],[ 12,-aa-0.3]].forEach(([ox,a])=>{
            ctx.save(); ctx.translate(ox,4); ctx.rotate(a);
            ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(ox<0?-7:7,12); ctx.stroke();
            ctx.restore();
        });

        // Cabeza
        ctx.fillStyle='#c0c0c8'; ctx.strokeStyle='#9090a0'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.arc(0,-14,15,0,Math.PI*2); ctx.fill(); ctx.stroke();

        // Orejas grandes
        [-11,11].forEach(ex=>{
            ctx.fillStyle='#c8b8c8'; ctx.strokeStyle='#9090a0'; ctx.lineWidth=1.5;
            ctx.beginPath(); ctx.arc(ex,-27,10,0,Math.PI*2); ctx.fill(); ctx.stroke();
            ctx.fillStyle='#f0a0b8';
            ctx.beginPath(); ctx.arc(ex,-27,6.5,0,Math.PI*2); ctx.fill();
        });

        // Ojos
        if(expr==='wink'){
            ctx.fillStyle='#1a1a2e';
            ctx.beginPath(); ctx.arc(-5,-15,3.5,0,Math.PI*2); ctx.fill();
            // ojo cerrado
            ctx.strokeStyle='#1a1a2e'; ctx.lineWidth=2.5;
            ctx.beginPath(); ctx.arc(5,-13,3.5,0.2,Math.PI-0.2); ctx.stroke();
        } else if(expr==='laugh'){
            ctx.strokeStyle='#1a1a2e'; ctx.lineWidth=2.5;
            [-5,5].forEach(ex=>{ ctx.beginPath(); ctx.arc(ex,-13,4,0.1,Math.PI-0.1); ctx.stroke(); });
        } else if(expr==='scared'){
            ctx.fillStyle='white';
            [-5,5].forEach(ex=>{ctx.beginPath();ctx.arc(ex,-15,5.5,0,Math.PI*2);ctx.fill();});
            ctx.fillStyle='#1a1a2e';
            [-5,5].forEach(ex=>{ctx.beginPath();ctx.arc(ex,-15,3.5,0,Math.PI*2);ctx.fill();});
        } else {
            ctx.fillStyle='#1a1a2e';
            [-5,5].forEach(ex=>{
                ctx.beginPath(); ctx.arc(ex,-15,3.5,0,Math.PI*2); ctx.fill();
                ctx.fillStyle='white'; ctx.beginPath(); ctx.arc(ex+1.2,-16,1,0,Math.PI*2); ctx.fill();
                ctx.fillStyle='#1a1a2e';
            });
        }
        // Nariz
        ctx.fillStyle='#e0a0b8'; ctx.beginPath(); ctx.arc(0,-11,2.5,0,Math.PI*2); ctx.fill();
        // Boca
        if(expr==='laugh'){
            ctx.strokeStyle='#442233'; ctx.lineWidth=2;
            ctx.beginPath(); ctx.arc(0,-7,5,0,Math.PI); ctx.stroke();
            ctx.fillStyle='white'; ctx.fillRect(-3,-8,6,3);
        } else {
            ctx.strokeStyle='#442233'; ctx.lineWidth=1.5;
            ctx.beginPath(); ctx.moveTo(-3,-8); ctx.quadraticCurveTo(0,-5,3,-8); ctx.stroke();
        }
        // Bigotes
        ctx.strokeStyle='rgba(120,120,130,0.55)'; ctx.lineWidth=1;
        [[-14,-12,1],[-14,-10,1],[14,-12,-1],[14,-10,-1]].forEach(([wx,wy,d])=>{
            ctx.beginPath(); ctx.moveTo(wx,wy); ctx.lineTo(wx+d*18,wy); ctx.stroke();
        });
        ctx.restore();
    }

    /* ── Dibujar GATO ── */
    function drawCat(x, y, dir, walk, expr) {
        ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
        const b = Math.sin(walk*Math.PI)*4;
        ctx.translate(0, b);

        // Cola con movimiento
        const tw = Math.sin(walk*Math.PI*2)*0.35;
        ctx.strokeStyle='#D4884A'; ctx.lineWidth=7; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(15,5);
        ctx.bezierCurveTo(32+Math.cos(tw)*10,-8,36,-22+Math.sin(tw)*12,24,-32);
        ctx.stroke();
        ctx.strokeStyle='#f5d0a0'; ctx.lineWidth=4;
        ctx.beginPath(); ctx.moveTo(23,-30); ctx.lineTo(21,-38); ctx.stroke();

        // Patas
        const la=Math.sin(walk*Math.PI*2)*0.45;
        ctx.strokeStyle='#D4884A'; ctx.lineWidth=7;
        [[-8,la,5],[8,-la,-5]].forEach(([ox,a,foot])=>{
            ctx.save(); ctx.translate(ox,18); ctx.rotate(a);
            ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,20); ctx.lineTo(foot,24); ctx.stroke();
            ctx.restore();
        });

        // Cuerpo
        ctx.fillStyle='#E89848'; ctx.strokeStyle='#C07030'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.ellipse(0,10,18,22,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle='#F5C898';
        ctx.beginPath(); ctx.ellipse(0,13,10,14,0,0,Math.PI*2); ctx.fill();
        // Rayas cuerpo
        ctx.strokeStyle='#b06820'; ctx.lineWidth=2;
        [-4,4,12].forEach(sy=>{
            ctx.beginPath(); ctx.moveTo(-15,sy); ctx.lineTo(-8,sy+4); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(15,sy); ctx.lineTo(8,sy+4); ctx.stroke();
        });

        // Brazos
        const aa=Math.sin(walk*Math.PI*2+Math.PI)*0.45;
        ctx.strokeStyle='#D4884A'; ctx.lineWidth=6;
        [[-16,aa+0.25,-10],[16,-aa-0.25,10]].forEach(([ox,a,hand])=>{
            ctx.save(); ctx.translate(ox,2); ctx.rotate(a);
            ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(hand,14); ctx.stroke();
            ctx.restore();
        });

        // Cabeza
        ctx.fillStyle='#E89848'; ctx.strokeStyle='#C07030'; ctx.lineWidth=2;
        ctx.beginPath(); ctx.arc(0,-16,21,0,Math.PI*2); ctx.fill(); ctx.stroke();

        // Orejas triangulares
        [-14,14].forEach(ex=>{
            ctx.fillStyle='#E89848';
            ctx.beginPath(); ctx.moveTo(ex-9,-22); ctx.lineTo(ex,-37); ctx.lineTo(ex+9,-22); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.fillStyle='#f0a0b0';
            ctx.beginPath(); ctx.moveTo(ex-5,-24); ctx.lineTo(ex,-33); ctx.lineTo(ex+5,-24); ctx.closePath(); ctx.fill();
        });
        // Rayas cabeza
        ctx.strokeStyle='#b06820'; ctx.lineWidth=2;
        [[-6,-35,-4,-24],[0,-37,0,-26],[6,-35,4,-24]].forEach(([x1,y1,x2,y2])=>{
            ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
        });

        // Ojos según expresión
        if(expr==='bonked'||expr==='dizzy'){
            ctx.strokeStyle='#2a1a0e'; ctx.lineWidth=2.5;
            [-7,7].forEach(ex=>{
                ctx.beginPath(); ctx.moveTo(ex-4,-22); ctx.lineTo(ex+4,-14); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(ex+4,-22); ctx.lineTo(ex-4,-14); ctx.stroke();
            });
        } else if(expr==='determined'){
            ctx.fillStyle='#2a6030';
            [-7,7].forEach(ex=>{
                ctx.beginPath(); ctx.ellipse(ex,-17,4,5,ex<0?-0.3:0.3,0,Math.PI*2); ctx.fill();
                ctx.fillStyle='black'; ctx.beginPath(); ctx.ellipse(ex,-17,2,3.5,0,0,Math.PI*2); ctx.fill();
                ctx.fillStyle='#2a6030';
            });
            ctx.strokeStyle='#801c10'; ctx.lineWidth=2.5;
            ctx.beginPath(); ctx.moveTo(-13,-25); ctx.lineTo(-4,-22); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(13,-25); ctx.lineTo(4,-22); ctx.stroke();
        } else if(expr==='surprised'){
            ctx.fillStyle='white';
            [-7,7].forEach(ex=>{ctx.beginPath(); ctx.arc(ex,-17,6.5,0,Math.PI*2); ctx.fill();});
            ctx.fillStyle='#2a6030';
            [-7,7].forEach(ex=>{ctx.beginPath(); ctx.arc(ex,-17,4,0,Math.PI*2); ctx.fill();});
            ctx.fillStyle='black';
            [-7,7].forEach(ex=>{ctx.beginPath(); ctx.arc(ex,-17,2,0,Math.PI*2); ctx.fill();});
        } else {
            ctx.fillStyle='#2a6030';
            [-7,7].forEach(ex=>{
                ctx.beginPath(); ctx.ellipse(ex,-17,4,5,0,0,Math.PI*2); ctx.fill();
                ctx.fillStyle='black'; ctx.beginPath(); ctx.ellipse(ex,-17,2,3.5,0,0,Math.PI*2); ctx.fill();
                ctx.fillStyle='#2a6030';
            });
        }
        // Nariz
        ctx.fillStyle='#e06080'; ctx.beginPath(); ctx.arc(0,-11,2.5,0,Math.PI*2); ctx.fill();
        // Boca
        if(expr==='bonked'){
            ctx.strokeStyle='#801c10'; ctx.lineWidth=2;
            ctx.beginPath(); ctx.arc(0,-6,4,0,Math.PI); ctx.stroke();
        } else if(expr==='determined'){
            ctx.strokeStyle='#801c10'; ctx.lineWidth=2.5;
            ctx.beginPath(); ctx.moveTo(-5,-7); ctx.lineTo(5,-7); ctx.stroke();
        } else {
            ctx.strokeStyle='#801c10'; ctx.lineWidth=1.5;
            ctx.beginPath(); ctx.moveTo(-3,-8); ctx.quadraticCurveTo(0,-5,3,-8); ctx.stroke();
        }
        // Bigotes
        ctx.strokeStyle='rgba(90,60,30,0.5)'; ctx.lineWidth=1.2;
        [[-20,-14,1],[-20,-11,1],[-20,-8,1.5],[20,-14,-1],[20,-11,-1],[20,-8,-1.5]].forEach(([wx,wy,d])=>{
            ctx.beginPath(); ctx.moveTo(wx<0?wx+4:wx-4,wy); ctx.lineTo(wx<0?wx-16:wx+16,wy+d); ctx.stroke();
        });
        ctx.restore();
    }

    /* ── Trampa (ratonera con queso) ── */
    function drawTrap(x, y, sprung) {
        ctx.save(); ctx.translate(x, y);
        // Base madera
        ctx.fillStyle='#8B5E3C'; ctx.strokeStyle='#5a3a20'; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.roundRect(-22,-6,44,10,3); ctx.fill(); ctx.stroke();
        if(!sprung){
            // Barra tensada
            ctx.strokeStyle='#888'; ctx.lineWidth=3.5; ctx.lineCap='round';
            ctx.beginPath(); ctx.moveTo(-20,-6); ctx.lineTo(-20,-24); ctx.lineTo(20,-24); ctx.stroke();
            // Queso
            ctx.fillStyle='#FFD700'; ctx.strokeStyle='#C8A000'; ctx.lineWidth=2;
            ctx.beginPath(); ctx.moveTo(0,-24); ctx.lineTo(-12,-36); ctx.lineTo(12,-36); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.fillStyle='#C8A000';
            [{x:-4,y:-30,r:2},{x:4,y:-28,r:1.5},{x:0,y:-33,r:1.3}].forEach(h=>{
                ctx.beginPath(); ctx.arc(h.x,h.y,h.r,0,Math.PI*2); ctx.fill();
            });
            // Letrero "¡GRATIS!" encima del queso
            ctx.font='bold 8px "Caveat",cursive';
            ctx.fillStyle='#FF4444'; ctx.textAlign='center';
            ctx.fillText('¡GRATIS!',0,-38);
        } else {
            // Barra disparada
            ctx.strokeStyle='#888'; ctx.lineWidth=3.5; ctx.lineCap='round';
            ctx.beginPath(); ctx.moveTo(-20,-6); ctx.lineTo(-20,-6); ctx.lineTo(20,-6); ctx.stroke();
        }
        ctx.restore();
    }

    /* ── Polvo ── */
    const dustPuffs = [];
    function spawnDust(x,y) {
        for(let i=0;i<6;i++) dustPuffs.push({x:x+r(-20,20),y:y+r(-10,10),r:r(8,18),life:1,vx:r(-2,2),vy:r(-3,-1)});
    }
    function updateDust() {
        dustPuffs.forEach((d,i)=>{ d.x+=d.vx; d.y+=d.vy; d.r+=0.5; d.life-=0.05; });
        dustPuffs.splice(0,dustPuffs.length,...dustPuffs.filter(d=>d.life>0));
    }
    function drawDust() {
        dustPuffs.forEach(d=>{
            ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
            ctx.fillStyle=`rgba(200,195,210,${d.life*0.45})`; ctx.fill();
        });
    }

    /* ── Onomatopeyas en canvas ── */
    const onoms = [];
    const ONOM_LIST=[
        {t:'¡ZOOM!',c:'#FFD700'},{t:'¡CRASH!',c:'#FF6B8A'},
        {t:'¡MIAU!',c:'#A29BFE'},{t:'¡EEK!',c:'#48DBFB'},
        {t:'¡BONK!',c:'#FF9F43'},{t:'¡ZAAAAS!',c:'#FF9FF3'},
        {t:'¡AHHHH!',c:'#1DD1A1'}
    ];
    function spawnOnom(x,y,idx){ const o=ONOM_LIST[idx??Math.floor(Math.random()*ONOM_LIST.length)]; onoms.push({x,y,c:o.c,t:o.t,life:1,vy:-1.5,scale:0.3}); }
    function updateOnoms() { onoms.forEach(o=>{ o.life-=0.025; o.y+=o.vy; o.scale=Math.min(1.3,o.scale+0.12); }); onoms.splice(0,onoms.length,...onoms.filter(o=>o.life>0)); }
    function drawOnoms() {
        onoms.forEach(o=>{
            ctx.save(); ctx.translate(o.x,o.y); ctx.scale(o.scale,o.scale);
            ctx.font=`900 28px "Caveat",cursive`;
            ctx.strokeStyle='rgba(0,0,0,0.5)'; ctx.lineWidth=4; ctx.strokeText(o.t,0,0);
            ctx.fillStyle=o.c; ctx.globalAlpha=o.life; ctx.fillText(o.t,0,0);
            ctx.restore();
        });
        ctx.globalAlpha=1;
    }

    /* ── Estrellas orbitando ── */
    function drawOrbitStars(cx,cy,angle,count=5) {
        for(let i=0;i<count;i++){
            const a=angle+i*(Math.PI*2/count);
            const sx=cx+Math.cos(a)*32, sy=cy+Math.sin(a)*28;
            star(sx,sy,7,3,5,'#FFD700');
        }
    }

    /* ── Líneas de velocidad ── */
    function drawSpeedLines(x,y,dir) {
        ctx.strokeStyle='rgba(255,255,255,0.22)'; ctx.lineCap='round';
        for(let i=0;i<6;i++){
            const ly=y+r(-25,25), len=r(30,80);
            ctx.lineWidth=r(1,2.5);
            ctx.beginPath(); ctx.moveTo(x,ly); ctx.lineTo(x-dir*len,ly); ctx.stroke();
        }
    }

    /* ── MÁQUINA DE ESTADOS ── */
    // Escena: ratón → corre → pone trampa → gato cae → ratón ríe → loop
    const S = {CHASE:0,MOUSE_STOP:1,PLACE_TRAP:2,MOUSE_ESCAPE:3,CAT_APPROACH:4,BONK:5,DIZZY:6,MOUSE_LAUGH:7,WAIT:8};
    let state=S.CHASE, stateT=0;
    let mx=0,my=0,mdir=1, mwalk=0, mexpr='normal';
    let cx2=0,cy2=0,cdir=1, cwalk=0, cexpr='determined';
    let trapX=0,trapY=0,trapPlaced=false,trapSprung=false;
    let starAngle=0, bonkTimer=0;
    let prevT=0;

    function setState(s){ state=s; stateT=performance.now(); }

    /* ── Loop principal ── */
    function loop(now){
        if(!active) return;
        const dt=Math.min((now-prevT)/1000,0.05); prevT=now;
        const elapsed=now-stateT;

        ctx.clearRect(0,0,W,H);

        // Fondo cómico con líneas radiales
        ctx.save();
        const cx0=W/2, cy0=H/2;
        const grad=ctx.createRadialGradient(cx0,cy0,0,cx0,cy0,Math.max(W,H)*0.8);
        grad.addColorStop(0,'rgba(250,235,180,0.18)');
        grad.addColorStop(1,'rgba(200,180,120,0.06)');
        ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);
        ctx.strokeStyle='rgba(220,200,130,0.06)'; ctx.lineWidth=1;
        for(let i=0;i<24;i++){
            const a=i/24*Math.PI*2;
            ctx.beginPath(); ctx.moveTo(cx0,cy0); ctx.lineTo(cx0+Math.cos(a)*W,cy0+Math.sin(a)*H); ctx.stroke();
        }
        ctx.restore();

        const groundY = H*0.75;

        /* ───── Estado: CHASE ───── */
        if(state===S.CHASE){
            mwalk=(mwalk+dt*8)%2; cwalk=(cwalk+dt*6)%2;
            mx+=mdir*5.5; my=groundY;
            cx2+=(mdir*(mx-cx2)>0?mdir:mdir)*4.2;
            cx2+=mdir*4.2; cy2=groundY;
            // Líneas de velocidad
            drawSpeedLines(mx,my,-mdir);
            drawSpeedLines(cx2,cy2,-mdir);
            // Wrap
            if(mdir===1 && mx>W+80){ mx=-80; cx2=-140; }
            if(mdir===-1 && mx<-80){ mx=W+80; cx2=W+140; }
            // Poner trampa cuando el ratón llega al centro (con algo de aleatoriedad)
            if(elapsed > r(2000,3500) && Math.abs(mx-W/2)<180) {
                trapX=mx+mdir*30; trapY=groundY; trapPlaced=false; trapSprung=false;
                setState(S.MOUSE_STOP);
            }
            drawMouse(mx,my,mdir,mwalk,mexpr);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            // Onomatopeya ocasional
            if(Math.random()<0.008) spawnOnom(mx+r(-30,30),my-80);
        }

        /* ───── Estado: MOUSE_STOP (ratón se detiene) ───── */
        else if(state===S.MOUSE_STOP){
            cwalk=(cwalk+dt*6)%2; cx2+=mdir*4.2; cy2=groundY;
            mexpr='wink'; mwalk=0;
            // Ratón mira a cámara y guiña
            if(elapsed>800) setState(S.PLACE_TRAP);
            drawSpeedLines(cx2,cy2,-mdir);
            drawMouse(mx,my,mdir,mwalk,mexpr);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            if(elapsed>300) drawTrap(trapX,trapY,false);
            if(elapsed===0||Math.random()<0.005) spawnOnom(mx,my-80,0); // ¡ZOOM!
        }

        /* ───── Estado: PLACE_TRAP (coloca trampa) ───── */
        else if(state===S.PLACE_TRAP){
            cwalk=(cwalk+dt*6)%2; cx2+=mdir*4.2; cy2=groundY;
            trapPlaced=true; mexpr='wink'; mwalk=0;
            drawSpeedLines(cx2,cy2,-mdir);
            drawTrap(trapX,trapY,false);
            drawMouse(mx,my,mdir,mwalk,mexpr);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            if(elapsed>900) setState(S.MOUSE_ESCAPE);
        }

        /* ───── Estado: MOUSE_ESCAPE ───── */
        else if(state===S.MOUSE_ESCAPE){
            mx+=mdir*7; my=groundY; mwalk=(mwalk+dt*10)%2; mexpr='normal';
            cwalk=(cwalk+dt*6)%2; cx2+=mdir*4.2; cy2=groundY;
            drawSpeedLines(mx,my,-mdir);
            drawSpeedLines(cx2,cy2,-mdir);
            drawTrap(trapX,trapY,false);
            drawMouse(mx,my,mdir,mwalk,mexpr);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            if(elapsed>600) setState(S.CAT_APPROACH);
        }

        /* ───── Estado: CAT_APPROACH (gato se acerca a la trampa) ───── */
        else if(state===S.CAT_APPROACH){
            mx+=mdir*7; my=groundY; mwalk=(mwalk+dt*10)%2;
            // Gato desacelera cerca de la trampa
            const distToTrap=Math.abs(cx2-trapX);
            const catSpd = distToTrap<120 ? Math.max(1, distToTrap*0.04) : 4.5;
            cx2+=mdir*catSpd; cy2=groundY;
            cwalk=(cwalk+dt*(catSpd*1.5))%2;
            cexpr=distToTrap<80?'surprised':'determined';
            drawTrap(trapX,trapY,false);
            drawMouse(mx,my,mdir,mwalk,mexpr);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            if(Math.abs(cx2-trapX)<22){ bonkTimer=now; setState(S.BONK); }
        }

        /* ───── Estado: BONK ───── */
        else if(state===S.BONK){
            trapSprung=true;
            cexpr='bonked'; mwalk=0;
            // Gato salta un poco
            const tSince=(now-bonkTimer)/1000;
            cy2=groundY-Math.max(0,Math.sin(tSince*Math.PI)*60);
            drawTrap(trapX,trapY,true);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            drawMouse(mx+mdir*50,my,-mdir,0,'laugh'); // ratón se asoma desde el borde
            // ¡BONK! grande
            if(elapsed<50){ spawnOnom(cx2,cy2-80,4); spawnDust(cx2,groundY); }
            starAngle+=dt*5;
            drawOrbitStars(cx2,cy2-80,starAngle,5);
            if(elapsed>1800) setState(S.DIZZY);
        }

        /* ───── Estado: DIZZY ───── */
        else if(state===S.DIZZY){
            cexpr='dizzy'; cx2+=Math.sin(elapsed/150)*2; cy2=groundY; cwalk=0;
            drawTrap(trapX,trapY,true);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            starAngle+=dt*3;
            drawOrbitStars(cx2,cy2-80,starAngle,4);
            if(elapsed>1200) setState(S.MOUSE_LAUGH);
        }

        /* ───── Estado: MOUSE_LAUGH ───── */
        else if(state===S.MOUSE_LAUGH){
            cexpr='dizzy'; cwalk=0;
            // Ratón entra de costado
            const targetMx=W/2+mdir*80;
            mx+=(targetMx-mx)*0.1; my=groundY;
            mwalk=(mwalk+dt*12)%2; mexpr='laugh';
            // Ratón salta de alegría
            const bounce=Math.sin(elapsed/180)*15;
            drawTrap(trapX,trapY,true);
            drawCat(cx2,cy2,mdir,cwalk,cexpr);
            ctx.save(); ctx.translate(0,-bounce); drawMouse(mx,my,-mdir,mwalk,mexpr); ctx.restore();
            starAngle+=dt*2;
            drawOrbitStars(cx2,cy2-80,starAngle,3);
            if(elapsed>2000) setState(S.WAIT);
        }

        /* ───── Estado: WAIT (pausa breve antes de reiniciar) ───── */
        else if(state===S.WAIT){
            drawTrap(trapX,trapY,true);
            drawCat(cx2,cy2,mdir,0,'dizzy');
            drawMouse(mx,my,-mdir,0,'laugh');
            if(elapsed>1200){
                // Reiniciar en dirección opuesta
                mdir*=-1; cdir=mdir;
                mx=mdir===1?-80:W+80; my=groundY;
                cx2=mdir===1?-140:W+140; cy2=groundY;
                mexpr='normal'; cexpr='determined';
                mwalk=0; cwalk=0;
                trapPlaced=false; trapSprung=false;
                onoms.length=0; dustPuffs.length=0;
                setState(S.CHASE);
            }
        }

        updateDust(); drawDust();
        updateOnoms(); drawOnoms();
        rafId=requestAnimationFrame(loop);
    }

    /* ── Toggle ── */
    window.toggleChase = function() {
        const checkbox = document.getElementById('relax4-checkbox');
        active = checkbox ? checkbox.checked : !active;
        const overlay = document.getElementById('chase-overlay');
        overlay.classList.toggle('is-active', active);
        if(active){
            resize();
            mdir=1; cdir=1;
            mx=-80; my=H*0.75;
            cx2=-140; cy2=H*0.75;
            mexpr='normal'; cexpr='determined';
            mwalk=0; cwalk=0;
            onoms.length=0; dustPuffs.length=0;
            setState(S.CHASE);
            prevT=performance.now();
            cancelAnimationFrame(rafId);
            rafId=requestAnimationFrame(loop);
        } else {
            cancelAnimationFrame(rafId);
            ctx.clearRect(0,0,W,H);
        }
    };

    document.addEventListener('keydown', e=>{
        if(e.key==='Escape'&&active){
            const checkbox = document.getElementById('relax4-checkbox');
            if(checkbox) checkbox.checked = false;
            window.toggleChase();
        }
    });
})();

/* ══════════════════════════════════════════════════
   MOMENTO RELAX 3 — Pinchar Globos
   ══════════════════════════════════════════════════ */
(function initBalloonGame() {
    const COLORS = [
        ['#FF6B8A','#FF8FA3'],['#FF9F43','#FFB570'],['#48DBFB','#74E9FF'],
        ['#FF9FF3','#FFBEF7'],['#1DD1A1','#5EE8C0'],['#FECA57','#FFD97D'],
        ['#A29BFE','#C3BCF8'],['#FD79A8','#FEA8C8']
    ];
    const MSGS = ['¡Genial! 🎉','¡Eso! 🌟','¡Crack! 💥','¡Boom! 🔥','¡Increíble! ✨'];

    let score = 0, escaped = 0, running = false;
    let spawnTimer = null, balloons = [], rafId = null;
    let spawnInterval = 1800; // ms between spawns (speeds up)
    let spawnCount = 0;
    let audioCtx = null;

    function getCtx() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    function popSound() {
        try {
            const ctx = getCtx(); const t = ctx.currentTime;
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
            const src = ctx.createBufferSource();
            const g = ctx.createGain(); const f = ctx.createBiquadFilter();
            f.type = 'bandpass'; f.frequency.value = 800; f.Q.value = 0.5;
            src.buffer = buf;
            src.connect(f); f.connect(g); g.connect(ctx.destination);
            g.gain.setValueAtTime(0.4, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
            src.start(t);
        } catch(e) {}
    }

    function escapedSound() {
        try {
            const ctx = getCtx(); const t = ctx.currentTime;
            const osc = ctx.createOscillator(); const g = ctx.createGain();
            osc.type = 'sine'; osc.frequency.setValueAtTime(300, t);
            osc.frequency.exponentialRampToValueAtTime(150, t + 0.4);
            g.gain.setValueAtTime(0.1, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(t); osc.stop(t + 0.4);
        } catch(e) {}
    }

    function buildBalloonSVG(c1, c2) {
        return `<svg viewBox="0 0 64 90" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="bg${c1.slice(1)}" cx="38%" cy="32%" r="60%">
                    <stop offset="0%" stop-color="${c2}"/>
                    <stop offset="100%" stop-color="${c1}"/>
                </radialGradient>
            </defs>
            <ellipse cx="32" cy="33" rx="26" ry="32" fill="url(#bg${c1.slice(1)})"/>
            <ellipse cx="24" cy="22" rx="7" ry="6" fill="rgba(255,255,255,0.28)"/>
            <path d="M28 65 Q32 72 36 65" fill="none" stroke="${c1}" stroke-width="2" stroke-linecap="round"/>
            <line x1="32" y1="65" x2="32" y2="88" stroke="rgba(100,100,100,0.5)" stroke-width="1.2"/>
        </svg>`;
    }

    function spawnBalloon() {
        if (!running) return;
        const layer = document.getElementById('balloon-layer');
        const [c1, c2] = COLORS[Math.floor(Math.random() * COLORS.length)];
        const el = document.createElement('div');
        el.className = 'balloon';
        el.innerHTML = buildBalloonSVG(c1, c2);
        const xPct = 5 + Math.random() * 85;
        el.style.left = xPct + 'vw';
        const speed = 1.4 + Math.random() * 1.8; // px/frame at 60fps → vh/s
        const size  = 56 + Math.random() * 32;
        el.style.width = size + 'px';
        el.dataset.y = window.innerHeight + 10;
        el.dataset.speed = speed;
        el.style.bottom = 'auto';
        el.style.top = window.innerHeight + 10 + 'px';

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (el.classList.contains('popping')) return;
            el.classList.add('popping');
            popSound();
            score++;
            document.getElementById('bg-score').textContent = score;
            spawnPlus(e.clientX, e.clientY);
            setTimeout(() => { el.remove(); balloons = balloons.filter(b => b !== el); }, 300);
        });
        el.addEventListener('touchstart', (e) => {
            e.preventDefault();
            el.click();
        }, { passive: false });

        layer.appendChild(el);
        balloons.push(el);
        spawnCount++;

        // Aumentar dificultad gradualmente
        spawnInterval = Math.max(700, 1800 - spawnCount * 40);
        spawnTimer = setTimeout(spawnBalloon, spawnInterval);
    }

    function spawnPlus(x, y) {
        const el = document.createElement('div');
        el.className = 'bg-plus';
        el.textContent = '+1';
        el.style.left = x + 'px';
        el.style.top  = y + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 950);
    }

    function gameLoop() {
        if (!running) return;
        balloons.forEach(el => {
            if (!el.isConnected) return;
            let y = parseFloat(el.dataset.y) - parseFloat(el.dataset.speed);
            el.dataset.y = y;
            el.style.top = y + 'px';
            if (y < -100) {
                el.remove();
                balloons = balloons.filter(b => b !== el);
                escaped++;
                escapedSound();
                document.getElementById('bg-escaped').textContent = escaped + '/3';
                if (escaped >= 3) { endGame(); return; }
            }
        });
        rafId = requestAnimationFrame(gameLoop);
    }

    function spawnConfetti() {
        const confColors = ['#FF6B8A','#FFD700','#48DBFB','#A29BFE','#1DD1A1','#FF9F43'];
        for (let i = 0; i < 80; i++) {
            const el = document.createElement('div');
            el.className = 'confetti-piece';
            el.style.background = confColors[Math.floor(Math.random() * confColors.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.top  = '-20px';
            el.style.animationDuration = (1.5 + Math.random() * 2.5) + 's';
            el.style.animationDelay    = (Math.random() * 1.2) + 's';
            el.style.width  = (6 + Math.random() * 8) + 'px';
            el.style.height = (6 + Math.random() * 8) + 'px';
            el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 4500);
        }
    }

    function endGame() {
        running = false;
        clearTimeout(spawnTimer);
        cancelAnimationFrame(rafId);
        balloons.forEach(b => b.remove());
        balloons = [];
        const finalScore = document.getElementById('bg-final-score');
        const finalMsg   = document.getElementById('bg-final-msg');
        finalScore.textContent = score;
        finalMsg.textContent   = score === 1 ? 'globo pinchado 🎈' : 'globos pinchados 🎈';
        document.getElementById('bg-hud').style.display   = 'none';
        document.getElementById('bg-start').classList.add('hidden');
        document.getElementById('bg-end').classList.remove('hidden');
        spawnConfetti();
    }

    window.openBalloonGame = function() {
        document.getElementById('balloon-layer').classList.add('is-active');
        document.getElementById('bg-start').classList.remove('hidden');
        document.getElementById('bg-end').classList.add('hidden');
        document.getElementById('bg-hud').style.display = 'none';
    };

    window.startBalloonGame = function() {
        score = 0; escaped = 0; running = true; spawnCount = 0;
        spawnInterval = 1800;
        balloons.forEach(b => b.remove()); balloons = [];
        clearTimeout(spawnTimer); cancelAnimationFrame(rafId);
        document.getElementById('bg-start').classList.add('hidden');
        document.getElementById('bg-end').classList.add('hidden');
        document.getElementById('bg-score').textContent   = '0';
        document.getElementById('bg-escaped').textContent = '0/3';
        document.getElementById('bg-hud').style.display   = 'flex';
        getCtx();
        spawnBalloon();
        rafId = requestAnimationFrame(gameLoop);
    };

    window.stopBalloonGame = function() {
        running = false;
        clearTimeout(spawnTimer); cancelAnimationFrame(rafId);
        balloons.forEach(b => b.remove()); balloons = [];
        closeBalloonGame();
    };

    window.closeBalloonGame = function() {
        running = false;
        clearTimeout(spawnTimer); cancelAnimationFrame(rafId);
        balloons.forEach(b => b.remove()); balloons = [];
        document.getElementById('balloon-layer').classList.remove('is-active');
        const checkbox = document.getElementById('relax3-checkbox');
        if (checkbox) checkbox.checked = false;
    };

    /* Interruptor (hojita) que abre/cierra el juego */
    window.toggleBalloonGame = function() {
        const checkbox = document.getElementById('relax3-checkbox');
        if (checkbox && checkbox.checked) openBalloonGame(); else closeBalloonGame();
    };

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeBalloonGame();
    });
})();

/* ══════════════════════════════════════════════════
   MOMENTO RELAX 2 — Tres en raya vs máquina
   ══════════════════════════════════════════════════ */
(function initTTT() {
    const WINS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    let board, locked, score = { p:0, m:0, d:0 };

    function cells()  { return document.querySelectorAll('.ttt-cell'); }
    function status() { return document.getElementById('ttt-status'); }

    function render() {
        cells().forEach((c, i) => {
            c.textContent  = board[i] ? (board[i] === 'X' ? '✕' : '○') : '';
            c.dataset.val  = board[i] || '';
            c.classList.toggle('ttt-cell--locked', locked || !!board[i]);
        });
    }

    function checkWinner(b, mark) {
        return WINS.find(([a,c,d]) => b[a] === mark && b[c] === mark && b[d] === mark) || null;
    }

    function highlightWin(trio) {
        cells().forEach((c, i) => c.classList.toggle('win-cell', trio.includes(i)));
    }

    /* Minimax sin profundidad máx — tablero pequeño, siempre óptimo */
    function minimax(b, isMax) {
        if (checkWinner(b,'O')) return  10;
        if (checkWinner(b,'X')) return -10;
        const empty = b.map((v,i) => v ? -1 : i).filter(i => i >= 0);
        if (!empty.length) return 0;
        let best = isMax ? -Infinity : Infinity;
        for (const i of empty) {
            b[i] = isMax ? 'O' : 'X';
            const score = minimax(b, !isMax);
            b[i] = null;
            best = isMax ? Math.max(best, score) : Math.min(best, score);
        }
        return best;
    }

    function aiMove() {
        const empty = board.map((v,i) => v ? -1 : i).filter(i => i >= 0);
        if (!empty.length) return;
        let best = -Infinity, move = empty[0];
        for (const i of empty) {
            board[i] = 'O';
            const s = minimax(board, false);
            board[i] = null;
            if (s > best) { best = s; move = i; }
        }
        board[move] = 'O';
        render();
        const winTrio = checkWinner(board, 'O');
        if (winTrio) {
            highlightWin(winTrio);
            score.m++;
            updateScore();
            locked = true;
            setStatus('😬 La máquina ganó esta vez... ¡revanche!', 'lose');
        } else if (!board.includes(null)) {
            locked = true;
            score.d++;
            updateScore();
            setStatus('🤝 ¡Empate! Bien jugado.', 'draw');
        } else {
            setStatus('Tu turno — coloca una ✕');
        }
    }

    function setStatus(msg, cls = '') {
        const el = status();
        el.textContent = msg;
        el.className = 'ttt-status ' + cls;
    }

    function updateScore() {
        document.getElementById('ttt-score-p').textContent = score.p;
        document.getElementById('ttt-score-m').textContent = score.m;
        document.getElementById('ttt-score-d').textContent = score.d;
    }

    window.tttMove = function(i) {
        if (locked || board[i]) return;
        board[i] = 'X';
        render();
        const winTrio = checkWinner(board, 'X');
        if (winTrio) {
            highlightWin(winTrio);
            score.p++;
            updateScore();
            locked = true;
            setStatus('🎉 ¡Ganaste! ¡Bien hecho!', 'win');
            return;
        }
        if (!board.includes(null)) {
            locked = true;
            score.d++;
            updateScore();
            setStatus('🤝 ¡Empate! Bien jugado.', 'draw');
            return;
        }
        setStatus('Máquina pensando…');
        locked = true;
        setTimeout(() => { locked = false; aiMove(); }, 420);
    };

    window.tttRestart = function() {
        board  = Array(9).fill(null);
        locked = false;
        cells().forEach(c => c.classList.remove('win-cell'));
        render();
        setStatus('Tu turno — coloca una ✕');
    };

    window.openTTT = function() {
        tttRestart();
        const ov = document.getElementById('ttt-overlay');
        ov.style.display = 'flex';
        requestAnimationFrame(() => ov.classList.add('is-open'));
    };

    window.closeTTT = function() {
        const ov = document.getElementById('ttt-overlay');
        ov.classList.remove('is-open');
        setTimeout(() => { ov.style.display = 'none'; }, 320);
        const checkbox = document.getElementById('relax2-checkbox');
        if (checkbox) checkbox.checked = false;
    };

    /* Interruptor (hojita) que abre/cierra el juego */
    window.toggleTTT = function() {
        const checkbox = document.getElementById('relax2-checkbox');
        if (checkbox && checkbox.checked) openTTT(); else closeTTT();
    };

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeTTT();
    });
})();

/* ══════════════════════════════════════════════════
   MOMENTO RELAX 1 — Burbujas flotantes con instrumentos
   ══════════════════════════════════════════════════ */
(function initMomentoRelax1() {

    /* ── Configuración de los 6 instrumentos ── */
    const INSTRUMENTS = [
        {
            id: 'piano', label: 'Piano', color: '#5A7350',
            notes: [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25],
            noteIdx: 0,
            svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="10" width="18" height="10" rx="1.5"/><path d="M5 10V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/><line x1="7" y1="14" x2="7" y2="17"/><line x1="10" y1="14" x2="10" y2="17"/><line x1="14" y1="14" x2="14" y2="17"/><line x1="17" y1="14" x2="17" y2="17"/></svg>`
        },
        {
            id: 'guitar', label: 'Guitarra', color: '#8B6914',
            notes: [82.41, 110, 146.83, 196, 246.94, 329.63],
            noteIdx: 0,
            svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M11.5 3l1 2 2 1-1 3 3 1-2 8a3 3 0 0 1-5.2 0l-2-8 3-1-1-3 2-1-1-2z"/><circle cx="12" cy="17" r="2.5"/></svg>`
        },
        {
            id: 'harp', label: 'Arpa', color: '#967BB6',
            notes: [392, 440, 493.88, 523.25, 587.33, 659.25, 698.46, 783.99],
            noteIdx: 0,
            svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 4c0 14 2 16 6 16s6-2 6-16"/><line x1="8" y1="6" x2="8" y2="18"/><line x1="11" y1="5" x2="11" y2="19"/><line x1="14" y1="5" x2="14" y2="19"/><line x1="17" y1="6" x2="17" y2="18"/></svg>`
        },
        {
            id: 'sax', label: 'Saxo', color: '#6B8F9A',
            notes: [233.08, 261.63, 293.66, 329.63, 369.99, 415.30, 466.16, 523.25],
            noteIdx: 0,
            svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 4v12c0 2 1.5 4 4 4s4-2 4-4V8"/><circle cx="16" cy="6" r="1.2" fill="currentColor"/><circle cx="17" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="14" r="1" fill="currentColor"/></svg>`
        },
        {
            id: 'flute', label: 'Flauta', color: '#3D8A7A',
            notes: [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5],
            noteIdx: 0,
            svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"/><circle cx="7" cy="12" r="1.2" fill="currentColor"/><circle cx="11" cy="12" r="1.2" fill="currentColor"/><circle cx="15" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></svg>`
        },
        {
            id: 'marimba', label: 'Marimba', color: '#C0564A',
            notes: [261.63, 311.13, 369.99, 415.30, 493.88, 554.37, 659.25, 739.99],
            noteIdx: 0,
            svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="8" width="4" height="10" rx="1"/><rect x="8.5" y="6" width="4" height="12" rx="1"/><rect x="14" y="9" width="4" height="9" rx="1"/><rect x="19" y="7" width="2" height="11" rx="1"/></svg>`
        }
    ];

    const NOTE_EMOJIS = ['♪','♫','♬','🎵','🎶'];
    let relax1Active = false;
    let bubbleNodes = [];
    let activeNodes = {}; // instrId → {osc, gain, lfo, ctx}
    let audioCtx = null;

    function getCtx() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        return audioCtx;
    }

    /* ── Síntesis mejorada por instrumento ── */
    function startNote(instr) {
        stopNote(instr.id);
        const ctx = getCtx();
        const t = ctx.currentTime;
        const freq = instr.notes[instr.noteIdx % instr.notes.length];

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, t);
        masterGain.connect(ctx.destination);

        let nodes = { gain: masterGain, ctx };

        if (instr.id === 'piano') {
            // Piano: fundamental + 3 harmónicos con decaimiento
            const harmonics = [1, 2, 3, 4];
            const volumes  = [0.55, 0.25, 0.12, 0.06];
            harmonics.forEach((mult, i) => {
                const osc = ctx.createOscillator();
                const g   = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq * mult;
                g.gain.value = volumes[i] * 0.15;
                osc.connect(g); g.connect(masterGain);
                osc.start(t);
                nodes['osc' + i] = osc;
            });
            masterGain.gain.linearRampToValueAtTime(1, t + 0.012);
            masterGain.gain.setTargetAtTime(0.5, t + 0.05, 0.7); // natural sustain decay

        } else if (instr.id === 'guitar' || instr.id === 'harp') {
            // Pluck: ataque rápido + decaimiento largo (simula cuerda pulsada)
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            osc1.type = 'sawtooth'; osc1.frequency.value = freq;
            osc2.type = 'sine';     osc2.frequency.value = freq * 2;
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(freq * 8, t);
            filter.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 1.2);
            filter.Q.value = instr.id === 'harp' ? 6 : 2;
            const g1 = ctx.createGain(); g1.gain.value = 0.12;
            const g2 = ctx.createGain(); g2.gain.value = 0.05;
            osc1.connect(filter); osc2.connect(g2);
            filter.connect(g1); g1.connect(masterGain); g2.connect(masterGain);
            osc1.start(t); osc2.start(t);
            masterGain.gain.linearRampToValueAtTime(1, t + 0.003);
            masterGain.gain.exponentialRampToValueAtTime(0.001, t + (instr.id === 'harp' ? 3.5 : 2.2));
            nodes.osc1 = osc1; nodes.osc2 = osc2; nodes.filter = filter;

        } else if (instr.id === 'sax') {
            // Saxo: sawtooth + bandpass resonante + vibrato LFO
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth'; osc.frequency.value = freq;
            const bpf = ctx.createBiquadFilter();
            bpf.type = 'bandpass'; bpf.frequency.value = freq * 2.2; bpf.Q.value = 4;
            const lfo = ctx.createOscillator();
            const lfoG = ctx.createGain();
            lfo.frequency.value = 5.5; lfoG.gain.value = freq * 0.018;
            lfo.connect(lfoG); lfoG.connect(osc.frequency);
            osc.connect(bpf); bpf.connect(masterGain);
            masterGain.gain.linearRampToValueAtTime(1, t + 0.08);
            osc.start(t); lfo.start(t);
            nodes.osc = osc; nodes.lfo = lfo;

        } else if (instr.id === 'flute') {
            // Flauta: sine puro + vibrato suave + ruido de soplo
            const osc = ctx.createOscillator();
            osc.type = 'sine'; osc.frequency.value = freq;
            const lfo = ctx.createOscillator();
            const lfoG = ctx.createGain();
            lfo.frequency.value = 5; lfoG.gain.value = freq * 0.008;
            lfo.connect(lfoG); lfoG.connect(osc.frequency);
            // Breath noise
            const bufSize = audioCtx.sampleRate * 2;
            const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
            const nd = noiseBuf.getChannelData(0);
            for (let i = 0; i < bufSize; i++) nd[i] = (Math.random() * 2 - 1) * 0.025;
            const noiseS = ctx.createBufferSource();
            noiseS.buffer = noiseBuf; noiseS.loop = true;
            const noiseF = ctx.createBiquadFilter();
            noiseF.type = 'bandpass'; noiseF.frequency.value = freq * 1.5; noiseF.Q.value = 0.8;
            noiseS.connect(noiseF); noiseF.connect(masterGain);
            osc.connect(masterGain);
            masterGain.gain.linearRampToValueAtTime(1, t + 0.15); // flute has soft attack
            osc.start(t); lfo.start(t); noiseS.start(t);
            nodes.osc = osc; nodes.lfo = lfo; nodes.noiseS = noiseS;

        } else if (instr.id === 'marimba') {
            // Marimba: sine corto + resonancia + decay rápido
            [1, 2, 4].forEach((mult, i) => {
                const osc = ctx.createOscillator();
                const g   = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = freq * mult;
                g.gain.value = [0.6, 0.2, 0.08][i] * 0.18;
                osc.connect(g); g.connect(masterGain);
                osc.start(t);
                nodes['osc' + i] = osc;
            });
            masterGain.gain.linearRampToValueAtTime(1, t + 0.003);
            masterGain.gain.exponentialRampToValueAtTime(0.001, t + 1.1); // marimba decays
        }

        activeNodes[instr.id] = nodes;
    }

    function stopNote(instrId) {
        const n = activeNodes[instrId];
        if (!n) return;
        try {
            const t = n.ctx.currentTime;
            n.gain.gain.cancelScheduledValues(t);
            n.gain.gain.setValueAtTime(n.gain.gain.value, t);
            n.gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
            // Detener osciladores después del fade
            setTimeout(() => {
                ['osc','osc0','osc1','osc2','osc3','lfo','noiseS'].forEach(k => {
                    try { if (n[k]) n[k].stop(); } catch(e) {}
                });
            }, 300);
        } catch(e) {}
        delete activeNodes[instrId];
    }

    /* ── Avanzar nota para efecto glissando al rebotar ── */
    function nextNote(instr) {
        instr.noteIdx = (instr.noteIdx + 1) % instr.notes.length;
    }

    /* ── Partícula musical flotante ── */
    function spawnNotePop(el) {
        const pop = document.createElement('div');
        pop.className = 'relax-note-pop';
        pop.textContent = NOTE_EMOJIS[Math.floor(Math.random() * NOTE_EMOJIS.length)];
        const rect = el.getBoundingClientRect();
        pop.style.left = (rect.left + rect.width / 2) + 'px';
        pop.style.top  = (rect.top  + rect.height / 2) + 'px';
        pop.style.position = 'fixed';
        pop.style.zIndex = '9999';
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 1450);
    }

    /* ── Posiciones repartidas por la pantalla para las 6 burbujas ── */
    const BUBBLE_POSITIONS = [
        { left: '10%', top: '20%' },
        { left: '80%', top: '16%' },
        { left: '15%', top: '68%' },
        { left: '84%', top: '64%' },
        { left: '46%', top: '12%' },
        { left: '50%', top: '78%' }
    ];

    /* ── Crear burbuja DOM: instrumento tocable con rebote e ícono propio ── */
    function createBubble(instr, idx) {
        const el = document.createElement('div');
        el.className = 'relax-bubble';
        el.dataset.bi = String(idx);
        el.dataset.instr = instr.id;
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('aria-label', instr.label);
        const pos = BUBBLE_POSITIONS[idx % BUBBLE_POSITIONS.length];
        el.style.left = pos.left;
        el.style.top = pos.top;
        el.innerHTML = instr.svg + `<span class="relax-bubble-label">${instr.label}</span>`;

        const press = (e) => {
            e.preventDefault();
            el.classList.add('is-pressed');
            startNote(instr);
            spawnNotePop(el);
            nextNote(instr);
        };
        const release = () => {
            el.classList.remove('is-pressed');
            stopNote(instr.id);
        };
        el.addEventListener('pointerdown', press);
        el.addEventListener('pointerup', release);
        el.addEventListener('pointerleave', release);
        el.addEventListener('pointercancel', release);
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                press(e);
                setTimeout(release, 260);
            }
        });

        return el;
    }

    function buildBubbles(overlay) {
        if (bubbleNodes.length) return;
        INSTRUMENTS.forEach((instr, idx) => {
            const bubble = createBubble(instr, idx);
            overlay.appendChild(bubble);
            bubbleNodes.push(bubble);
        });
    }

    function stopAllNotes() {
        Object.keys(activeNodes).forEach(stopNote);
    }

    /* ── Activa/desactiva el "Momento Relax": muestra/oculta las burbujas
       musicales flotantes sobre toda la pantalla ── */
    function toggleRelax1() {
        const checkbox = document.getElementById('relax1-checkbox');
        const overlay = document.getElementById('relax1-overlay');
        if (!overlay || !checkbox) return;
        relax1Active = checkbox.checked;

        if (relax1Active) {
            buildBubbles(overlay);
            overlay.classList.add('is-active');
            overlay.setAttribute('aria-hidden', 'false');
        } else {
            overlay.classList.remove('is-active');
            overlay.setAttribute('aria-hidden', 'true');
            stopAllNotes();
        }
    }
    window.toggleRelax1 = toggleRelax1;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && relax1Active) {
            const checkbox = document.getElementById('relax1-checkbox');
            if (checkbox) checkbox.checked = false;
            toggleRelax1();
        }
    });
})();

/* ── ADN musical: xilófono de vidrio (iframe) activado por el logo ── */
(function initXylophoneOverlay() {
    const power = document.getElementById('nav-logo-power');
    const overlay = document.getElementById('xylophone-overlay');
    const frame = document.getElementById('xylophone-frame');
    const closeBtn = document.getElementById('xylo-close');
    const fileWarn = document.getElementById('xylo-file-warn');
    if (!power || !overlay || !frame) return;

    const SRC = 'xylophone/dist/'; // barra final: evita que ./assets apunte a xylophone/assets/
    const isFileProto = location.protocol === 'file:';
    let open = false;

    function setOpen(next) {
        open = !!next;
        power.checked = open;
        document.body.classList.toggle('xylo-open', open);

        if (open) {
            overlay.hidden = false;
            overlay.setAttribute('aria-hidden', 'false');
            if (isFileProto) {
                /* ES modules / WebGL del build Vite no cargan en file:// → pantalla negra */
                frame.hidden = true;
                frame.setAttribute('src', 'about:blank');
                if (fileWarn) fileWarn.hidden = false;
            } else {
                if (fileWarn) fileWarn.hidden = true;
                frame.hidden = false;
                if (frame.getAttribute('src') !== SRC) {
                    frame.setAttribute('src', SRC);
                }
            }
            if (window.lucide) lucide.createIcons();
        } else {
            overlay.hidden = true;
            overlay.setAttribute('aria-hidden', 'true');
            if (fileWarn) fileWarn.hidden = true;
            frame.hidden = false;
            /* Descarga el iframe para pausar WebGL / audio */
            frame.setAttribute('src', 'about:blank');
        }
    }

    power.addEventListener('change', () => setOpen(power.checked));
    closeBtn?.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && open) {
            e.preventDefault();
            setOpen(false);
        }
    });
})();