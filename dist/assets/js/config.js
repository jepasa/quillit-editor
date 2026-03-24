// SPDX-License-Identifier: PROPRIETARY
/**
 * @file src/lib/js/config.js
 * @fileoverview Configurações públicas do Quillit Editor (customizáveis pelo usuário final).
 * @author Jeferson Padilha (https://jepasa.com)
 * @license Proprietary - All Rights Reserved
 * @see ../../../LICENSE
 */

/**
 * Nome da chave global usada para override de config em runtime.
 *
 * Exemplo:
 * window.__QUILLIT_EDITOR_CONFIG__ = { language: 'en-US' }
 */
export const USER_CONFIG_GLOBAL_KEY = '__QUILLIT_EDITOR_CONFIG__';

/**
 * @typedef {Object} QuillitToolContext
 * @property {HTMLElement|null} editorElement - Textarea original usada na inicialização.
 * @property {Object} options - Opções resolvidas do editor (após merge).
 */

/**
 * @callback QuillitToolEnabledFn
 * @param {string} toolId - ID da ferramenta (ex.: 'bold', 'image', 'fullscreen').
 * @param {QuillitToolContext} context - Contexto da instância atual.
 * @returns {boolean} Retorne false para ocultar/desabilitar a ferramenta.
 */

/**
 * @callback QuillitOnSyncFn
 * @param {string} html - HTML sanitizado sincronizado no textarea.
 * @param {Object} [editor] - Instância do editor (quando fornecida pelo runtime).
 * @returns {void}
 */

/**
 * @callback QuillitOnSaveFn
 * @param {string} html - HTML atual no momento do save.
 * @param {Object} [editor] - Instância do editor (quando fornecida pelo runtime).
 * @returns {void}
 */

/**
 * @callback QuillitResolveLocaleDictionaryFn
 * @param {string} language - Idioma solicitado (ex.: 'it-IT').
 * @returns {Object|string|null} Dicionário direto ou caminho para dicionário externo.
 */

/**
 * @callback QuillitLoadLocaleDictionaryFn
 * @param {string} path - Caminho retornado por QuillitResolveLocaleDictionaryFn.
 * @param {string} language - Idioma solicitado.
 * @returns {Object|null} Dicionário carregado.
 */

/**
 * Configuração pública padrão do Quillit Editor.
 *
 * Precedência de resolução no runtime:
 * 1) callback/opções do init(...)
 * 2) window.__QUILLIT_EDITOR_CONFIG__
 * 3) DEFAULTS (este objeto)
 */
export const DEFAULTS = {
  /**
   * Placeholder exibido quando o editor está vazio.
   *
   * Opções:
   * - string vazia: usa fallback por idioma.
   * - string customizada: usa exatamente o texto informado.
   */
  placeholder: '',

  /**
   * Idioma base da interface.
   *
   * Opções comuns:
   * - 'pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'zh-CN'
   */
  language: 'pt-BR',

  /**
   * Se true, tenta detectar idioma via <html lang> / navigator.language.
   * Se false, usa sempre o valor de `language`.
   */
  autoLanguage: true,

  /**
   * Prefixo URL para mídia local renderizada no conteúdo.
   *
   * Exemplo: '/media/' ou '/uploads/images/'.
   */
  mediaBasePath: '',

  /**
   * Diretório local (filesystem no servidor) usado pela biblioteca de mídia.
   *
   * Exemplo: 'media' ou 'uploads/images'.
   */
  mediaLocalDir: '',

  /**
   * Endpoint que retorna JSON da biblioteca de mídia local.
   *
   * Exemplo: '/dist/assets/php/quillit-media-library.php'.
   */
  mediaLibraryEndpoint: '',

  /**
   * Permite inserção de mídia por URL externa.
   * false = restringe apenas à biblioteca/local path.
   */
  allowExternalMedia: true,

  /**
   * Estratégia de descoberta de fontes.
   *
   * Opções suportadas no runtime atual:
   * - 'site': detecta fontes carregadas no host (recomendado).
   */
  fontSource: 'site',

  /**
   * Se true, cola texto puro (remove formatação de clipboard).
   */
  pastePlain: true,

  /**
   * Tema inicial da UI do editor.
   *
   * Opções:
   * - null: herda/auto
   * - 'light'
   * - 'dark'
   */
  theme: null,

  /**
   * Exibe contador de caracteres na status bar.
   */
  charCount: true,

  /**
   * Exibe contador de palavras (junto ao de caracteres).
   */
  wordCount: false,

  /**
   * Estado inicial de fullscreen.
   */
  fullscreen: false,

  /**
   * Persiste estado do editor (fullscreen/source/tema etc.) em storage.
   */
  persistState: true,

  /**
   * Chave customizada para persistência.
   *
   * Se vazio, runtime gera chave a partir de id/name do textarea.
   */
  persistStateKey: '',

  /**
   * Altura principal do editor.
   *
   * Opções:
   * - null: automático
   * - 'auto' ou '100%'
   * - number (px)
   * - string CSS válida (ex.: '60vh')
   */
  editorHeight: null,

  /**
   * Altura mínima do editor.
   *
   * Opções:
   * - null
   * - number (px)
   * - string CSS válida
   */
  minHeight: null,

  /**
   * Altura máxima do editor.
   *
   * Opções:
   * - null
   * - number (px)
   * - string CSS válida
   */
  maxHeight: null,

  /**
   * Habilita redimensionamento manual da área de edição.
   */
  resizable: true,

  /**
   * Callback disparado a cada sincronização de conteúdo.
   *
   * Assinatura esperada: QuillitOnSyncFn
   */
  onSync: null,

  /**
   * Callback disparado em ação de save.
   *
   * Assinatura esperada: QuillitOnSaveFn
   */
  onSave: null,

  /**
   * Dicionários externos pré-carregados por idioma.
   *
   * Exemplo: { 'it-IT': { tool: { bold: 'Grassetto' } } }
   */
  localeDictionaries: null,

  /**
   * Idioma de fallback principal quando o solicitado não é encontrado.
   *
   * No dist, a ordem é: solicitado -> defaultLanguage -> en-US -> erro.
   */
  defaultLanguage: 'pt-BR',

  /**
   * Diretório base de dicionários no runtime dist.
   *
   * Exemplo: '/dist/locales/'
   * Formato esperado de arquivo padrão: <idioma>.json (ex.: pt-BR.json).
   */
  localesBasePath: '',

  /**
   * Resolve dicionário externo para idiomas não embutidos.
   *
   * Assinatura esperada: QuillitResolveLocaleDictionaryFn
   */
  resolveLocaleDictionary: null,

  /**
   * Carrega o dicionário a partir do caminho retornado por resolveLocaleDictionary.
   *
   * Assinatura esperada: QuillitLoadLocaleDictionaryFn
   */
  loadLocaleDictionary: null,

  /**
   * Lista de ferramentas para desativar/ocultar.
   *
   * Exemplo: ['image', 'video', 'audio']
   */
  disabledTools: [],

  /**
   * Callback para decidir em tempo de inicialização se a ferramenta fica ativa.
   *
   * Assinatura: QuillitToolEnabledFn
   */
  isToolEnabled: null,

  /**
   * Toolbar padrão (completa).
   *
   * Itens aceitos:
   * - string com ID de ferramenta (ex.: 'bold')
   * - 'separator'
   * - objeto dropdown: { type, labelKey, icon, items, menuLayout? }
   */
  toolbar: [
    'undo',
    'redo',
    'separator',
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.style',
      icon: 'fonts.svg',
      items: ['paragraph', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6'],
    },
    'separator',
    'bold',
    'italic',
    'underline',
    'strike',
    'separator',
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.advanced',
      icon: 'flask.svg',
      items: [
        'foreColor',
        'backColor',
        'subscript',
        'superscript',
        'abbr',
        'separator',
        'inlineCode',
        'mark',
        'kbd',
        'quote',
        'clear',
      ],
    },
    'separator',
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.fontFamily',
      icon: 'text-font.svg',
      menuLayout: 'list',
      items: [
        'fontFamilyArial',
        'fontFamilyGeorgia',
        'fontFamilyTimes',
        'fontFamilyCourier',
        'fontFamilyVerdana',
      ],
    },
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.fontSize',
      icon: 'text-size.svg',
      menuLayout: 'list',
      items: [
        'fontSize10',
        'fontSize12',
        'fontSize14',
        'fontSize16',
        'fontSize18',
        'fontSize20',
        'fontSize24',
        'fontSize32',
        'separator',
        'fontSizeCustom',
      ],
    },
    'separator',
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.lists',
      icon: 'list-ul.svg',
      items: [
        'unorderedList',
        'separator',
        'unorderedListDisc',
        'unorderedListCircle',
        'unorderedListSquare',
        'unorderedListDiamond',
        'separator',
        'defList',
      ],
    },
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.ordered',
      icon: 'list-ol.svg',
      items: [
        'orderedList',
        'separator',
        'orderedListDecimal',
        'orderedListDecimalLeadingZero',
        'orderedListUpperAlpha',
        'orderedListLowerAlpha',
        'orderedListUpperRoman',
        'orderedListLowerRoman',
        'orderedListLowerGreek',
        'separator',
        'orderedListStart',
        'orderedListReversed',
        'orderedListItemValue',
      ],
    },
    'indent',
    'outdent',
    'separator',
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.align',
      icon: 'text-left.svg',
      items: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
    },
    'separator',
    {
      type: 'dropdown',
      labelKey: 'toolbar.group.insert',
      icon: 'insert.svg',
      items: ['link', 'image', 'video', 'audio', 'table', 'hr', 'specialChars', 'codeBlock'],
    },
    'separator',
    'source',
    'fullscreen',
    'toggleTheme',
  ],
};

/**
 * Lê configuração global opcional definida pelo host (window.__QUILLIT_EDITOR_CONFIG__).
 * O objetivo é permitir override sem alterar código-fonte do plugin.
 *
 * @returns {object}
 */
export function getGlobalUserConfig() {
  if (typeof window === 'undefined') {
    return {};
  }

  const value = window[USER_CONFIG_GLOBAL_KEY];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return value;
}

// Inicializa objeto global apenas quando o host ainda não definiu overrides.
if (typeof window !== 'undefined' && typeof window[USER_CONFIG_GLOBAL_KEY] === 'undefined') {
  window[USER_CONFIG_GLOBAL_KEY] = { ...DEFAULTS };
}
