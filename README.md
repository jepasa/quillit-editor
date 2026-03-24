# Quillit Editor

Converta qualquer textarea em um editor WYSIWYG moderno em minutos.

Sem dependências de runtime, sem lock-in de framework e com UX pronta para produção.

## Por que escolher o Quillit

- Instalação rápida com 1 CSS + 1 JS
- Toolbar completa e totalmente personalizável
- Suporte a mídia local, links, tabelas e modo código
- i18n flexível para usar idiomas prontos ou criar o seu
- Build modular (`dist`) e monolítico (`bundle`) para cenários diferentes

## Instalação em 2 passos

### 1. Inclua os arquivos

```html
<link rel="stylesheet" href="/quillit/public-mirror/dist/assets/css/quillit-editor.min.css" />

<script type="module">
  import { init } from '/quillit/public-mirror/dist/quillit-editor.min.js';

  init('#meu-textarea', {
    language: 'pt-BR',
    placeholder: 'Comece a escrever...',
    charCount: true,
  });
</script>
```

### 2. Tenha um textarea

```html
<textarea id="meu-textarea" name="conteudo"></textarea>
```

Pronto. Seu editor já está funcional.

## Configuração simples e poderosa

```js
init('#meu-textarea', {
  language: 'pt-BR',
  autoLanguage: true,
  theme: 'light',
  charCount: true,
  wordCount: true,
  minHeight: 280,
  resizable: true,
});
```

### Personalize a toolbar para seu produto

```js
init('#meu-textarea', {
  toolbar: ['bold', 'italic', 'underline', 'separator', 'unorderedList', 'orderedList', 'link'],
  disabledTools: ['video', 'audio'],
  isToolEnabled: (toolId) => toolId !== 'table',
});
```

### Integre mídia local com endpoint PHP

```js
init('#meu-textarea', {
  mediaLibraryEndpoint: '/dist/assets/php/quillit-media-library.php',
  mediaLocalDir: 'uploads',
  mediaBasePath: '/uploads/',
});
```

## i18n: use pronto ou crie seus próprios dicionários

No `dist`, o build publica dicionários oficiais em `public-mirror/dist/locales/` no formato JSON.

Você pode:

- usar os arquivos oficiais como estão,
- copiar um deles como base,
- traduzir e publicar novos idiomas no mesmo padrão.

### Estrutura recomendada para novo idioma

1. Copie um arquivo base, por exemplo `public-mirror/dist/locales/en-US.json`.
2. Renomeie para seu locale (ex.: `pt-PT.json` ou `it-CH.json`).
3. Mantenha as mesmas chaves e traduza os valores.

### Resolução automática de idioma (dist)

1. callback/objeto do usuário (`resolveLocaleDictionary`, `loadLocaleDictionary`, `localeDictionaries`)
2. `dist/locales/<locale>.json`
3. `defaultLanguage`
4. `en-US`
5. erro explícito

### Resolução no bundle

No `bundle`, dicionários extras devem ser informados via callback/objeto. O fallback final é `en-US` embutido.

Exemplo:

```js
init('#meu-textarea', {
  language: 'it-IT',
  defaultLanguage: 'pt-BR',
  localesBasePath: '/dist/locales/',
  resolveLocaleDictionary: (lang) => {
    if (lang === 'it-IT') return '/custom/locales/it-IT.json';
    return null;
  },
});
```

## Distribuições disponíveis

- `public-mirror/dist/`: modular, ideal para aplicações ES Modules
- `public-mirror/bundle/`: monolítico, ideal para integração rápida em ambientes legados

## Experiência final para seu usuário

Com Quillit, você entrega:

- edição rica com aparência profissional,
- menos tempo de desenvolvimento,
- mais controle sobre branding, idioma e comportamento.

## Links úteis

- Repositório: https://github.com/jepasa/quillit-editor
- Issues: https://github.com/jepasa/quillit-editor/issues
- Autor: https://jepasa.com

---

Quillit Editor. Rápido para começar, forte para escalar.
