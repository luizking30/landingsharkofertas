// ====== CONFIGURAÇÃO CENTRAL — mude links e ícones aqui ======
const SOCIAL_LINKS = {
  whatsapp: 'https://chat.whatsapp.com/G2jMVIxrk8y8mB4ER1YMgR',
  telegram: 'https://telegram.me/sharkofertass',
  instagram: 'https://www.instagram.com/shark.ofertass'
};

const SOCIAL_ICONS = {
  whatsapp: '<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
  telegram: '<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.668 19.088c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/></svg>',
  instagram: '<svg class="btn__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>'
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
      else if (href.includes('telegram')) target = 'telegram';
      else if (href.includes('instagram')) target = 'instagram';

      // Envia eventos para o Pixel
      switch (target) {
        case 'whatsapp':
          trackPixel('Lead', { content_name: 'whatsapp_group' });
          trackCustomEvent('WhatsAppClick', { location: trackType });
          break;
        case 'telegram':
          trackPixel('Contact', { content_name: 'telegram_group' });
          trackCustomEvent('TelegramClick', { location: trackType });
          break;
        case 'instagram':
          trackCustomEvent('InstagramClick', { location: trackType });
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
});
