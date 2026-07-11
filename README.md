# Shark Ofertas - Landing Page

Landing page de captura para grupos de promoções no WhatsApp e Telegram.

## Links

- WhatsApp: https://chat.whatsapp.com/G2jMVIxrk8y8mB4ER1YMgR
- Telegram: https://t.me/+8mrY68CbArM2ODA5
- Instagram: https://www.instagram.com/shark.ofertass

## Deploy na Vercel

1. Acesse https://vercel.com e faça login com sua conta do GitHub
2. Clique em **Add New Project**
3. Importe o repositório `luizking30/landingsharkofertas`
4. Clique em **Deploy**
5. O link será algo como `https://sharkofertas.vercel.app`

## Como atualizar a página

Edite os arquivos `index.html`, `styles.css` ou `script.js` e depois rode:

```bash
git add .
git commit -m "Atualizacao landing page"
git push origin main
```

A Vercel atualiza automaticamente.

## Como configurar o Meta Pixel (Facebook)

1. Acesse https://business.facebook.com/events_manager
2. Crie um novo Pixel e copie o ID (número de 15 dígitos)
3. Substitua `SEU_PIXEL_ID` em dois lugares:
   - `index.html` (na tag `<script>` do Pixel e no `<noscript>`)
   - `script.js` (na constante `PIXEL_ID`)

### Eventos rastreados automaticamente

- `PageView` - quando a página é carregada
- `Lead` - quando clica no WhatsApp
- `Contact` - quando clica no Telegram
- `ScrollDepth` - quando o usuário rola 25%, 50%, 75% e 100% da página
- `TimeOnPage` - quando o usuário fica 10s, 30s, 60s e 120s na página

## Estrutura de arquivos

```
/
├── index.html          # Estrutura da landing page
├── styles.css          # Estilos visuais
├── script.js           # Rastreamento e animações
├── logo shark ofertas.png  # Logo da marca
└── README.md           # Este arquivo
```

## Personalização

### Trocar o link do WhatsApp

No `index.html`, procure por `https://chat.whatsapp.com/G2jMVIxrk8y8mB4ER1YMgR` e substitua pelo novo link.

### Trocar o link do Telegram

No `index.html`, procure por `https://t.me/+8mrY68CbArM2ODA5` e substitua pelo novo link.

### Trocar o Instagram

No `index.html`, procure por `https://www.instagram.com/shark.ofertass` e substitua.

### Trocar depoimentos

No `index.html`, procure pela seção `<!-- Depoimentos -->` e edite os textos.

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis customizadas
- JavaScript vanilla
- Meta Pixel pronto
- Google Fonts (Inter)
