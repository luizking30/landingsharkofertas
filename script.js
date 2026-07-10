// Configuração do Pixel
const PIXEL_ID = 'SEU_PIXEL_ID';

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

  // Rastreamento de cliques nos botões
  const trackableLinks = document.querySelectorAll('[data-track]');

  trackableLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const trackType = link.getAttribute('data-track');
      const href = link.getAttribute('href') || '';

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
  const revealElements = document.querySelectorAll('.step-card, .testimonial, .compare__card, .section__title, .section__subtitle');

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
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

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

  // Verifica se há Pixel ID real
  if (PIXEL_ID === 'SEU_PIXEL_ID') {
    console.warn('[Shark Ofertas] Meta Pixel ID não configurado. Substitua SEU_PIXEL_ID em script.js e index.html');
  }
});
