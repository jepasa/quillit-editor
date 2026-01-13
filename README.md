# Quillit WYSIWYG Editor

Editor leve e **100% independente** para sistemas de gerenciamento de conteúdo. Suporta múltiplas instâncias, múltiplos idiomas, barra de ferramentas completa, modo código e personalização total via opções.

Autor principal: Jeferson Paidilha — https://jepasa.com

Repositório: https://github.com/jepasa/quillit-editor

## 🎯 Recursos

### Core
- ✅ Inicialização de múltiplas instâncias via `QuillitEditor.init(seletor, opções)`
- ✅ **CSS totalmente independente** - sem Bootstrap ou frameworks externos
- ✅ Modo código HTML para edição direta do markup
- ✅ Limpeza de colagem opcional (`pastePlain`) para texto puro
- ✅ Sanitização básica (remove script/style/iframe e eventos inline)
- ✅ Config `enabledTools` para whitelist de ferramentas, ignorando IDs inexistentes
- ✅ Feedback na barra de status e layout responsivo

### Ferramentas de Formatação
- **Blocos**: P, H1-H6
- **Inline**: Negrito, Itálico, Sublinhado, Tachado, Subscrito, Sobrescrito
- **Código**: Bloco de código (pre) e código inline
- **Cores**: Seletor de cor para texto e fundo
- **Listas**: Não-ordenadas e ordenadas (com estilos e controles extras)
- **Indentação**: Aumentar/diminuir
- **Alinhamento**: Esquerda, Centro, Direita, Justificado
- **Citações e HR**

### Mídia e Links
- 🔗 Modal avançado para links com target e rel
- 🔗 Remover link (unlink)
- 🖼️ Modal para imagens com alt text e largura
- 🖼️ Suporte a `mediaBasePath` para URLs relativas
- ▦ Modal para tabelas com cabeçalho configurável

### Interface
- 🌓 Tema claro/escuro via data-attribute
- 📊 Contador de caracteres e palavras
- ⛶ Modo tela cheia
- 🎨 Design moderno e profissional
- 📱 Responsivo mobile-first
- ♿ ARIA labels e navegação por teclado

## 📦 Instalação

1. Copie a pasta do projeto para um caminho público do seu site (ex.: `public/quillit-editor/`).

2. Incluir arquivos (sem dependências externas):
   ```html
  <link rel="stylesheet" href="/quillit-editor/css/quillit-editor.css">
   ```

   ```html
  <script type="module">
    import { init as initQuillit } from '/quillit-editor/quillit-editor.js';
    // ...
  </script>
   ```

3. Adicionar um textarea:
   ```html
   <textarea id="meuEditor" name="content"></textarea>
   ```

4. Inicializar:
   ```html
   <script type="module">
  import { init as initQuillit } from '/quillit-editor/quillit-editor.js';

     initQuillit('#meuEditor', {
       placeholder: 'Digite seu conteúdo...',
       theme: 'light', // 'light', 'dark' ou null
       charCount: true,
       wordCount: true,
       mediaBasePath: '/uploads',
       pastePlain: true,
       enabledTools: null // null = todas; ou array com IDs
     });
   </script>
   ```

## ⚙️ Opções

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `placeholder` | string | (por idioma) | Placeholder no editor vazio. Se omitido, usa `placeholder.default` do idioma ativo |
| `language` | string | 'pt-BR' | Idioma padrão do editor (ex.: 'pt-BR', 'en-US') |
| `autoLanguage` | boolean | false | Se true, detecta idioma via `<html lang>` / `navigator.language` |
| `mediaBasePath` | string | '' | Prefixo para URLs de imagem relativas |
| `mediaLocalDir` | string | '' | Diretório local (filesystem) relativo ao webroot, usado pela biblioteca de imagens |
| `mediaLibraryEndpoint` | string | '' | Endpoint (JSON) da biblioteca. Se vazio, o Quillit tenta resolver automaticamente |
| `allowExternalMedia` | boolean | true | Reservado para futura validação |
| `pastePlain` | boolean | true | Cola como texto puro |
| `theme` | string\|null | null | 'light', 'dark' ou null para herdar |
| `charCount` | boolean | true | Exibe contador de caracteres |
| `wordCount` | boolean | false | Exibe contador de palavras |
| `enabledTools` | array\|null | null | Whitelist de IDs. Null = todas |
| `toolbar` | array | [...] | Ordem e agrupamento. Use `separator` |

### Biblioteca local de imagens

- `mediaLocalDir`: caminho no servidor (filesystem), ex.: `uploads/imagens`
- `mediaBasePath`: caminho público de URL, ex.: `/uploads/imagens`

Mesmo quando parecem “iguais”, eles podem (e muitas vezes vão) ser diferentes em um CMS.

O `mediaLibraryEndpoint` é opcional: quando você não define, o Quillit tenta resolver automaticamente para `./php/quillit-media-library.php` relativo ao próprio componente.

### Idiomas (i18n)

Arquivos em `./lang/`.

Idiomas disponíveis atualmente:
- `pt-BR`, `en-US`, `es-ES`, `fr-FR`, `de-DE`, `zh-CN`

Se `autoLanguage: true`, o editor tenta usar `document.documentElement.lang` e faz fallback para `navigator.language`.

## 🛠️ IDs de Ferramentas Suportados

### Blocos
`paragraph`, `heading1`, `heading2`, `heading3`, `heading4`, `heading5`, `heading6`

### Formatação Inline
`bold`, `italic`, `underline`, `strike`, `subscript`, `superscript`, `inlineCode`

### Cores
`foreColor`, `backColor`

### Listas e Indentação
`unorderedList`, `orderedList`, `defList`, `indent`, `outdent`

Estilos de marcadores (listas não-ordenadas):

- `unorderedListDisc`
- `unorderedListCircle`
- `unorderedListSquare`
- `unorderedListDiamond`

### Numeração (Listas Ordenadas)
Estilos úteis:

- `orderedListDecimal` (1,2,3)
- `orderedListDecimalLeadingZero` (01,02,03)
- `orderedListUpperAlpha` (A,B,C)
- `orderedListLowerAlpha` (a,b,c)
- `orderedListUpperRoman` (I,II,III)
- `orderedListLowerRoman` (i,ii,iii)
- `orderedListLowerGreek` (α,β,γ)

Controles extras:

- `orderedListStart` (define `start` no `<ol>`)
- `orderedListReversed` (toggle `reversed` no `<ol>`)
- `orderedListItemValue` (define `value` no `<li>` atual)

### Blocos Especiais
`quote`, `codeBlock`, `hr`

### Alinhamento
`alignLeft`, `alignCenter`, `alignRight`, `alignJustify`

### Mídia e Links
`link`, `unlink`, `image`, `table`

### Utilitários
`clear`, `undo`, `redo`, `source`, `fullscreen`

## 📋 Exemplo Completo

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/quillit-editor/css/quillit-editor.css">
</head>
<body>
  <textarea id="editor"></textarea>

  <script type="module">
    import { init } from '/quillit-editor/quillit-editor.js';

    // Editor CMS completo
    init('#editor', {
      placeholder: 'Escreva aqui...',
      theme: 'light',
      charCount: true,
      wordCount: true,
      toolbar: [
        'heading1', 'heading2', 'heading3', 'paragraph', 'separator',
        'bold', 'italic', 'underline', 'strike', 'separator',
        'foreColor', 'backColor', 'separator',
        'unorderedList', 'orderedList', 'indent', 'outdent', 'separator',
        'link', 'image', 'table', 'separator',
        'alignLeft', 'alignCenter', 'alignRight', 'separator',
        'quote', 'codeBlock', 'hr', 'separator',
        'clear', 'undo', 'redo', 'separator',
        'fullscreen', 'source'
      ]
    });
  </script>
</body>
</html>
```

## 🎨 Temas

Aplique tema via opção ou alterando dinamicamente:

```javascript
// Via opção
init('#editor', { theme: 'dark' });

// Dinamicamente
document.querySelector('.quillit-editor').setAttribute('data-quillit-theme', 'dark');
```

## 🧪 Demonstração

Arquivo de teste completo em `./demo/quillit-demo.html`.

## 📄 Licença

Este componente usa licença MIT (permite uso, alteração e derivação, desde que mantenha o aviso e a licença). Veja: [LICENSE](LICENSE)

Abra em servidor local:
```bash
php -S localhost:8085
# Acesse: http://localhost:8085/demo/quillit-demo.html
```

## 📝 Observações

- Utiliza `document.execCommand` (obsoleto mas amplamente suportado)
- Sanitização mínima intencional - estenda conforme necessário
- **Zero dependências externas** - CSS e JS 100% próprios
- Compatível com navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🗺️ Roadmap

Ver `doc/tasks.md` para lista completa de funcionalidades planejadas.
