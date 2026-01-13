// SPDX-License-Identifier: MIT
/**
 * @file lib/config.js
 * @fileoverview Defaults do editor, mapa de comandos, mensagens de status e ícones.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

export const DEFAULTS = {
  placeholder: 'Digite seu conteúdo...',
  // i18n
  // language: idioma padrão do editor (ex.: 'pt-BR', 'en-US')
  // autoLanguage: se true, tenta detectar via <html lang="..."> / navigator.language
  language: 'pt-BR',
  autoLanguage: false,
  mediaBasePath: '',
  // Diretório local (no servidor) para a biblioteca de mídia (relativo ao webroot)
  // Ex.: 'uploads/imagens' (filesystem) com mediaBasePath: '/uploads/imagens' (URL)
  // Dica: deixe vazio se seu projeto não expõe uma biblioteca local.
  mediaLocalDir: '',
  // Endpoint que lista as imagens do diretório local e retorna JSON
  // (pode ser substituído por um endpoint real do seu CMS)
  mediaLibraryEndpoint: '',
  allowExternalMedia: true,
  enabledTools: null, // null = todos; lista = apenas IDs informados
  pastePlain: true,
  theme: null, // 'light', 'dark', ou null para herdar
  charCount: true,
  wordCount: false,
  fullscreen: false,
  toolbar: [
    { type: 'dropdown', labelKey: 'toolbar.group.style', label: 'Estilo', icon: '¶', items: ['paragraph', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6'] },
    'separator',
    'bold', 'italic', 'underline', 'strike',
    { type: 'dropdown', labelKey: 'toolbar.group.advanced', label: 'Avançado', icon: '⚙', items: ['subscript', 'superscript', 'inlineCode', 'mark', 'kbd', 'abbr'] },
    'separator',
    'foreColor', 'backColor', 'separator',
    { type: 'dropdown', labelKey: 'toolbar.group.lists', label: 'Listas', icon: '•', items: ['unorderedList', 'separator', 'unorderedListDisc', 'unorderedListCircle', 'unorderedListSquare', 'unorderedListDiamond', 'separator', 'defList'] },
    { type: 'dropdown', labelKey: 'toolbar.group.ordered', label: 'Numeração', icon: '1.', items: ['orderedList', 'separator', 'orderedListDecimal', 'orderedListDecimalLeadingZero', 'orderedListUpperAlpha', 'orderedListLowerAlpha', 'orderedListUpperRoman', 'orderedListLowerRoman', 'orderedListLowerGreek', 'separator', 'orderedListStart', 'orderedListReversed', 'orderedListItemValue'] },
    'indent', 'outdent', 'separator',
    { type: 'dropdown', labelKey: 'toolbar.group.align', label: 'Alinhar', icon: '☰', items: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'] },
    'separator',
    { type: 'dropdown', labelKey: 'toolbar.group.insert', label: 'Inserir', icon: '+', items: ['link', 'image', 'video', 'audio', 'table', 'hr', 'codeBlock'] },
    'unlink', 'separator',
    'quote', 'separator',
    'clear', 'undo', 'redo', 'separator',
    'source', 'fullscreen'
  ]
};

export const COMMANDS = {
  // Blocos
  paragraph: { icon: '¶', label: 'Parágrafo', command: 'formatBlock', value: 'p' },
  heading1: { icon: 'H₁', label: 'Título H1', command: 'formatBlock', value: 'h1' },
  heading2: { icon: 'H₂', label: 'Título H2', command: 'formatBlock', value: 'h2' },
  heading3: { icon: 'H₃', label: 'Título H3', command: 'formatBlock', value: 'h3' },
  heading4: { icon: 'H₄', label: 'Título H4', command: 'formatBlock', value: 'h4' },
  heading5: { icon: 'H₅', label: 'Título H5', command: 'formatBlock', value: 'h5' },
  heading6: { icon: 'H₆', label: 'Título H6', command: 'formatBlock', value: 'h6' },
  
  // Formatação inline
  bold: { icon: '𝐁', label: 'Negrito', command: 'bold' },
  italic: { icon: '𝐼', label: 'Itálico', command: 'italic' },
  underline: { icon: 'U̲', label: 'Sublinhar', command: 'underline' },
  strike: { icon: 'S̶', label: 'Tachado', command: 'strikeThrough' },
  subscript: { icon: 'X₂', label: 'Subscrito', command: 'subscript' },
  superscript: { icon: 'X²', label: 'Sobrescrito', command: 'superscript' },
  mark: { icon: '🖍', label: 'Destacar', command: 'hiliteColor', value: 'yellow' },
  
  // Listas
  unorderedList: { icon: '•', label: 'Lista', command: 'insertUnorderedList' },
  orderedList: { icon: '1.', label: 'Lista ordenada', command: 'insertOrderedList' },
  
  // Indentação
  indent: { icon: '⇥', label: 'Aumentar indentação', command: 'indent' },
  outdent: { icon: '⇤', label: 'Diminuir indentação', command: 'outdent' },
  
  // Citação e código
  quote: { icon: '"', label: 'Citação', command: 'formatBlock', value: 'blockquote' },
  codeBlock: { icon: '</>', label: 'Bloco de código', command: 'formatBlock', value: 'pre' },
  
  // Alinhamento
  alignLeft: { icon: '≡', label: 'Alinhar à esquerda', command: 'justifyLeft' },
  alignCenter: { icon: '≣', label: 'Centralizar', command: 'justifyCenter' },
  alignRight: { icon: '≡', label: 'Alinhar à direita', command: 'justifyRight' },
  alignJustify: { icon: '≣', label: 'Justificar', command: 'justifyFull' },
  
  // Linha horizontal
  hr: { icon: '─', label: 'Linha horizontal', command: 'insertHorizontalRule' },
  
  // Utilitários
  clear: { icon: '🗑', label: 'Limpar formatação', command: 'removeFormat' },
  undo: { icon: '↶', label: 'Desfazer', command: 'undo' },
  redo: { icon: '↷', label: 'Refazer', command: 'redo' }
};

export const STATUS_MESSAGES = {
  ready: 'Pronto para edição',
  code: 'Modo código HTML',
  visual: 'Modo visual',
  fullscreen: 'Modo tela cheia ativo',
  saving: 'Salvando...',
  saved: 'Salvo'
};

export const ICONS = {
  close: '✕',
  check: '✓',
  link: '🔗',
  unlink: '🔗✗',
  image: '🖼',
  video: '🎬',
  audio: '🔊',
  table: '▦',
  code: '</>',
  foreColor: 'A',
  backColor: '🖍',
  fullscreen: '⛶',
  fullscreenExit: '⛶✕',
  kbd: '⌨',
  abbr: 'ᴬᴮ',
  source: '< >'
};
