// ====== CONFIGURAÇÃO CENTRAL — mude links e ícones aqui ======
const SOCIAL_LINKS = {
  whatsapp: 'https://chat.whatsapp.com/G2jMVIxrk8y8mB4ER1YMgR'
};

const SOCIAL_ICONS = {
  whatsapp: '<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>'
};
// ====== FIM DA CONFIGURAÇÃO CENTRAL ======

// Configuração do Pixel
const PIXEL_ID = '1973919269976475';

// Rastreamento de eventos do Meta Pixel
function trackPixel(event, params = {}) {
  if (typeof fbq === 'function') {
    fbq('track', event, params);
  }
}

// Rastreamento de eventos customizados
function trackCustomEvent(eventName, params = {}) {
  if (typeof fbq === 'function') {
    fbq('trackCustom', eventName, params);
  }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  // Atualiza o Pixel ID se necessário
  if (PIXEL_ID !== 'SEU_PIXEL_ID') {
    // O Pixel já foi inicializado no HTML, mas aqui você pode adicionar lógica extra
  }

  // Injeta links centralizados em todos os botões [data-track]
  document.querySelectorAll('a[data-track]').forEach(link => {
    const type = link.getAttribute('data-track');
    if (SOCIAL_LINKS[type]) {
      link.setAttribute('href', SOCIAL_LINKS[type]);
    }
  });

  // Injeta ícones centralizados em todos os placeholders [data-icon]
  document.querySelectorAll('[data-icon]').forEach(placeholder => {
    const type = placeholder.getAttribute('data-icon');
    if (SOCIAL_ICONS[type]) {
      placeholder.innerHTML = SOCIAL_ICONS[type];
    }
  });

  // Rastreamento de cliques nos botões
  const trackableLinks = document.querySelectorAll('[data-track]');

  trackableLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const trackType = link.getAttribute('data-track');
      const href = link.getAttribute('href') || '';

      // Evento específico do banner de cookies
      if (trackType === 'cookie-accept') {
        trackCustomEvent('CookieAccept', { location: 'cookie-banner' });
        return;
      }

      // Limpa o target para pegar apenas o domínio
      let target = 'link';
      if (href.includes('whatsapp')) target = 'whatsapp';

      // Envia eventos para o Pixel
      switch (target) {
        case 'whatsapp':
          trackPixel('Lead', { content_name: 'whatsapp_group' });
          trackCustomEvent('WhatsAppClick', { location: trackType });
          break;
        default:
          trackCustomEvent('LinkClick', { location: trackType, href: href });
      }
    });
  });

  // Animação de scroll (reveal elements)
  const revealElements = document.querySelectorAll('.step-card, .about-card, .benefit-card, .faq__item, .tip__card, .testimonials__img, .compare__card, .section__title, .section__subtitle');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Rastreamento de scroll (25%, 50%, 75%, 100%)
  const scrollMarks = [25, 50, 75, 100];
  const reachedMarks = new Set();

  const trackScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 100;

    scrollMarks.forEach(mark => {
      if (scrollPercent >= mark && !reachedMarks.has(mark)) {
        reachedMarks.add(mark);
        trackCustomEvent('ScrollDepth', { percent: mark });
      }
    });
  };

  let scrollTimer;
  window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => {
      trackScroll();
      scrollTimer = null;
    }, 250);
  });

  // Rastreamento de tempo na página
  const timeMarks = [10, 30, 60, 120];
  const reachedTimeMarks = new Set();

  timeMarks.forEach(seconds => {
    setTimeout(() => {
      if (!reachedTimeMarks.has(seconds)) {
        reachedTimeMarks.add(seconds);
        trackCustomEvent('TimeOnPage', { seconds: seconds });
      }
    }, seconds * 1000);
  });

  // Atualiza o ano no footer dinamicamente
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Verifica se há Pixel ID real
  if (PIXEL_ID === 'SEU_PIXEL_ID') {
    console.warn('[Shark Ofertas] Meta Pixel ID não configurado. Substitua SEU_PIXEL_ID em script.js e index.html');
  }

  // Banner de Cookies / LGPD
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const stickySocial = document.querySelector('.sticky-social');

  if (cookieBanner && cookieAccept) {
    const cookiesAccepted = localStorage.getItem('shark_cookies_accepted');

    if (!cookiesAccepted) {
      cookieBanner.classList.add('cookie-banner--visible');
      if (stickySocial) stickySocial.style.bottom = '4.5rem';
    }

    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('shark_cookies_accepted', 'true');
      cookieBanner.classList.remove('cookie-banner--visible');
      if (stickySocial) stickySocial.style.bottom = '1rem';
    });
  }

  // ====== ANIMAÇÕES DE CONVERSÃO ======

  // Estado central: uma única fonte de verdade para "pessoas entrando"
  const memberCountEl = document.getElementById('member-count');
  const joinedTodayEl = document.getElementById('joined-today');
  const spotsLeftEl = document.getElementById('spots-left');
  const toastContainer = document.getElementById('toast-container');

  let currentMembers = 7600;
  const targetMembers = 7650;
  let joinedToday = parseInt(joinedTodayEl ? joinedTodayEl.textContent : '127', 10) || 127;
  let spotsLeft = parseInt(spotsLeftEl ? spotsLeftEl.textContent : '8', 10) || 8;

  function formatNumber(n) {
    return n.toLocaleString('pt-BR');
  }

  // Inicializa display
  if (memberCountEl) memberCountEl.textContent = formatNumber(currentMembers);
  if (joinedTodayEl) joinedTodayEl.textContent = joinedToday;
  if (spotsLeftEl) spotsLeftEl.textContent = spotsLeft;

  // Dados para toast
  const names = [
    'João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Juliana', 'Lucas', 'Patrícia',
    'Rafael', 'Camila', 'Bruno', 'Fernanda', 'Gabriel', 'Larissa', 'Thiago',
    'Beatriz', 'Felipe', 'Amanda', 'Ricardo', 'Letícia', 'Marcelo', 'Vanessa',
    'Diego', 'Carla', 'Eduardo', 'Bruna', 'Vinícius', 'Tatiane', 'Gustavo',
    'Mariana', 'André', 'Cristiane', 'Leandro', 'Daniela', 'Paulo', 'Renata',
    'Marcos', 'Simone', 'Fábio', 'Priscila', 'Roberto', 'Jéssica', 'Rodrigo',
    'Aline', 'Gerson', 'Natália', 'Sérgio', 'Bianca', 'Cláudio', 'Vivian'
  ];

  const cities = [
    'São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR',
    'Porto Alegre, RS', 'Salvador, BA', 'Recife, PE', 'Fortaleza, CE',
    'Brasília, DF', 'Goiânia, GO', 'Manaus, AM', 'Belém, PA',
    'Campinas, SP', 'Florianópolis, SC', 'Natal, RN', 'Cuiabá, MT'
  ];

  const emojis = ['🦈', '💰', '🔥', '✅', '👏', '🛒'];

  // Único evento: "uma nova pessoa entrou no grupo"
  // Dispara todos os 3 contadores ao mesmo tempo
  function simulateNewMember() {
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    // 1. Incrementa contador principal (se ainda não chegou no limite)
    if (currentMembers < targetMembers) {
      currentMembers++;
      if (memberCountEl) memberCountEl.textContent = formatNumber(currentMembers);
    }

    // 2. Incrementa "entraram hoje"
    joinedToday++;
    if (joinedTodayEl) joinedTodayEl.textContent = joinedToday;

    // 3. Decrementa vagas disponíveis (para em 1 para não zerar)
    if (spotsLeft > 1) {
      spotsLeft--;
      if (spotsLeftEl) spotsLeftEl.textContent = spotsLeft;
    }

    // 3. Mostra toast com nome + cidade
    if (toastContainer) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML =
        '<div class="toast__avatar">' + emoji + '</div>' +
        '<div class="toast__body">' +
          '<div class="toast__name">' + name + '</div>' +
          '<div class="toast__action"><strong>entrou no grupo</strong> · ' + city + '</div>' +
        '</div>';

      toastContainer.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.add('toast--visible');
      });

      setTimeout(() => {
        toast.classList.remove('toast--visible');
        toast.classList.add('toast--hide');
        setTimeout(() => toast.remove(), 400);
      }, 5000);
    }
  }

  // Agenda o próximo evento de "nova pessoa entrou"
  function scheduleNextMember() {
    const delay = 8000 + Math.random() * 12000;
    setTimeout(() => {
      simulateNewMember();
      scheduleNextMember();
    }, delay);
  }

  // Primeira entrada após 4s, depois continua no loop
  setTimeout(() => {
    simulateNewMember();
    scheduleNextMember();
  }, 4000);

  // Timer de escassez: contagem regressiva de 24h (independente)
  const urgencyClockEl = document.getElementById('urgency-clock');
  if (urgencyClockEl) {
    const STORAGE_KEY = 'shark_urgency_end';
    let endTime;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      endTime = parseInt(saved, 10);
      if (endTime <= Date.now()) {
        endTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, endTime.toString());
      }
    } else {
      endTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, endTime.toString());
    }

    function updateTimer() {
      const remaining = Math.max(0, endTime - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      urgencyClockEl.textContent =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

      if (remaining <= 0) {
        endTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, endTime.toString());
      }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ====== FIM DAS ANIMAÇÕES DE CONVERSÃO ======
});
