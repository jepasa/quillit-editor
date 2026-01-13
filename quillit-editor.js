// SPDX-License-Identifier: MIT
/**
 * @file quillit-editor.js
 * @fileoverview Core do Quillit Editor: inicialização, wiring de UI/toolbar, sanitização e API pública.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see LICENSE
 */

import { DEFAULTS, COMMANDS, STATUS_MESSAGES, ICONS } from './lib/config.js';
import { sanitize } from './lib/sanitizer.js';
import { buildEditorStructure } from './lib/layout.js';
import { buildToolbar } from './lib/toolbar.js';
import { createI18n } from './lang/index.js';
import { 
  execAction, linkAction, unlinkAction, imageAction, inlineCodeAction, 
  tableAction, foreColorAction, backColorAction, kbdAction, abbrAction, 
  defListAction, videoAction, audioAction, markAction,
  orderedListDecimalAction, orderedListDecimalLeadingZeroAction,
  orderedListUpperAlphaAction, orderedListLowerAlphaAction,
  orderedListUpperRomanAction, orderedListLowerRomanAction,
  orderedListLowerGreekAction,
  orderedListStartAction, orderedListReversedAction, orderedListItemValueAction,
  unorderedListDiscAction, unorderedListCircleAction, unorderedListSquareAction, unorderedListDiamondAction
} from './lib/actions.js';

class QuillitEditor {
  constructor(el, opts = {}) {
    this.sourceEl = el;
    const userProvidedPlaceholder = Object.prototype.hasOwnProperty.call(opts, 'placeholder');
    this.options = { ...DEFAULTS, ...opts };

    const i18n = createI18n({
      language: this.options.language,
      autoLanguage: this.options.autoLanguage
    });
    this.language = i18n.language;
    this.t = i18n.t;

    // Placeholder padrão por idioma (apenas quando o usuário não definiu explicitamente)
    if (!userProvidedPlaceholder) {
      this.options.placeholder = this.t('placeholder.default', null, DEFAULTS.placeholder);
    }

    // Auto-resolve do endpoint da biblioteca de mídia (evita hardcode no projeto consumidor)
    // Só roda se o usuário não definiu explicitamente.
    if (!this.options.mediaLibraryEndpoint) {
      try {
        const resolved = new URL('./php/quillit-media-library.php', import.meta.url);
        // Mantém pathname quando for mesma origem, senão usa href completo.
        this.options.mediaLibraryEndpoint = (resolved.origin === window.location.origin)
          ? resolved.pathname
          : resolved.href;
      } catch (_) {
        // Sem auto-resolve (ex.: ambiente que não suporta import.meta.url)
      }
    }
    this.isSource = false;
    this.isFullscreen = false;
    this.enabledTools = Array.isArray(this.options.enabledTools) && this.options.enabledTools.length
      ? new Set(this.options.enabledTools)
      : null;

    const structure = buildEditorStructure(this.sourceEl, this.options, sanitize, this.t);
    this.wrapper = structure.wrapper;
    this.toolbar = structure.toolbar;
    this.content = structure.content;
    this.source = structure.source;
    this.status = structure.status;
    this.charCount = structure.charCount;

    const translatedCommands = Object.fromEntries(
      Object.entries(COMMANDS).map(([id, def]) => [
        id,
        {
          ...def,
          label: this.t(`tool.${id}`, null, def.label)
        }
      ])
    );

    const translatedToolbar = (Array.isArray(this.options.toolbar) ? this.options.toolbar : DEFAULTS.toolbar).map((item) => {
      if (!item || typeof item !== 'object') return item;
      if (item.type !== 'dropdown') return item;

      const key = item.labelKey;
      if (key) {
        return {
          ...item,
          label: this.t(key, null, item.label || '')
        };
      }
      return item;
    });

    buildToolbar(
      this.toolbar,
      translatedToolbar,
      translatedCommands,
      {
        onCommand: (cmd, value) => execAction(this, cmd, value),
        special: {
          source: { icon: ICONS.source, label: this.t('tool.source', null, 'Código HTML'), handler: () => this.toggleSource() },
          link: { icon: ICONS.link, label: this.t('tool.link', null, 'Inserir link'), handler: () => linkAction(this) },
          unlink: { icon: ICONS.unlink, label: this.t('tool.unlink', null, 'Remover link'), handler: () => unlinkAction(this) },
          image: { icon: ICONS.image, label: this.t('tool.image', null, 'Inserir imagem'), handler: () => imageAction(this) },
          video: { icon: ICONS.video, label: this.t('tool.video', null, 'Inserir vídeo'), handler: () => videoAction(this) },
          audio: { icon: ICONS.audio, label: this.t('tool.audio', null, 'Inserir áudio'), handler: () => audioAction(this) },
          inlineCode: { icon: ICONS.code, label: this.t('tool.inlineCode', null, 'Código inline'), handler: () => inlineCodeAction(this) },
          table: { icon: ICONS.table, label: this.t('tool.table', null, 'Inserir tabela'), handler: () => tableAction(this) },
          kbd: { icon: ICONS.kbd, label: this.t('tool.kbd', null, 'Tecla de teclado'), handler: () => kbdAction(this) },
          abbr: { icon: ICONS.abbr, label: this.t('tool.abbr', null, 'Abreviação'), handler: () => abbrAction(this) },
          defList: { icon: '⁝', label: this.t('tool.defList', null, 'Lista de definição'), handler: () => defListAction(this) },
          mark: { icon: '🖍', label: this.t('tool.mark', null, 'Destacar'), handler: () => markAction(this) },
          foreColor: { icon: ICONS.foreColor, label: this.t('tool.foreColor', null, 'Cor do texto'), handler: () => foreColorAction(this) },
          backColor: { icon: ICONS.backColor, label: this.t('tool.backColor', null, 'Cor de fundo'), handler: () => backColorAction(this) },
          orderedListDecimal: { icon: '1.', label: this.t('tool.orderedListDecimal', null, 'Numeração: 1,2,3'), handler: () => orderedListDecimalAction(this) },
          orderedListDecimalLeadingZero: { icon: '01', label: this.t('tool.orderedListDecimalLeadingZero', null, 'Numeração: 01,02,03'), handler: () => orderedListDecimalLeadingZeroAction(this) },
          orderedListUpperAlpha: { icon: 'A', label: this.t('tool.orderedListUpperAlpha', null, 'Numeração: A,B,C'), handler: () => orderedListUpperAlphaAction(this) },
          orderedListLowerAlpha: { icon: 'a', label: this.t('tool.orderedListLowerAlpha', null, 'Numeração: a,b,c'), handler: () => orderedListLowerAlphaAction(this) },
          orderedListUpperRoman: { icon: 'I', label: this.t('tool.orderedListUpperRoman', null, 'Numeração: I,II,III'), handler: () => orderedListUpperRomanAction(this) },
          orderedListLowerRoman: { icon: 'i', label: this.t('tool.orderedListLowerRoman', null, 'Numeração: i,ii,iii'), handler: () => orderedListLowerRomanAction(this) },
          orderedListLowerGreek: { icon: 'α', label: this.t('tool.orderedListLowerGreek', null, 'Numeração: α,β,γ'), handler: () => orderedListLowerGreekAction(this) },
          orderedListStart: { icon: '↦', label: this.t('tool.orderedListStart', null, 'Começar numeração...'), handler: () => orderedListStartAction(this) },
          orderedListReversed: { icon: '⇵', label: this.t('tool.orderedListReversed', null, 'Alternar numeração reversa'), handler: () => orderedListReversedAction(this) },
          orderedListItemValue: { icon: '#', label: this.t('tool.orderedListItemValue', null, 'Definir número do item...'), handler: () => orderedListItemValueAction(this) },
          unorderedListDisc: { icon: '●', label: this.t('tool.unorderedListDisc', null, 'Marcador: disc'), handler: () => unorderedListDiscAction(this) },
          unorderedListCircle: { icon: '○', label: this.t('tool.unorderedListCircle', null, 'Marcador: circle'), handler: () => unorderedListCircleAction(this) },
          unorderedListSquare: { icon: '■', label: this.t('tool.unorderedListSquare', null, 'Marcador: square'), handler: () => unorderedListSquareAction(this) },
          unorderedListDiamond: { icon: '◆', label: this.t('tool.unorderedListDiamond', null, 'Marcador: diamond'), handler: () => unorderedListDiamondAction(this) },
          fullscreen: { icon: ICONS.fullscreen, label: this.t('tool.fullscreen', null, 'Tela cheia'), handler: () => this.toggleFullscreen() }
        }
      },
      (id) => this.isToolEnabled(id)
    );

    this.bindContentSync();
    this.bindSourceSync();
    this.bindPaste();
    this.updateCharCount();
  }

  toggleSource() {
    this.isSource = !this.isSource;

    if (this.isSource) {
      this.source.value = this.content.innerHTML.trim();
      this.content.classList.add('quillit-hidden');
      this.source.classList.remove('quillit-hidden');
      this.updateStatus(this.t('status.code', null, STATUS_MESSAGES.code));
      return;
    }

    this.content.innerHTML = sanitize(this.source.value);
    this.content.classList.remove('quillit-hidden');
    this.source.classList.add('quillit-hidden');
    this.updateStatus(this.t('status.visual', null, STATUS_MESSAGES.visual));
    this.syncToTextarea();
    this.updateCharCount();
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    
    if (this.isFullscreen) {
      this.wrapper.style.position = 'fixed';
      this.wrapper.style.top = '0';
      this.wrapper.style.left = '0';
      this.wrapper.style.width = '100%';
      this.wrapper.style.height = '100%';
      this.wrapper.style.zIndex = '9999';
      this.content.style.minHeight = 'calc(100vh - 150px)';
      this.updateStatus(this.t('status.fullscreen', null, STATUS_MESSAGES.fullscreen));
      
      // Atualiza ícone do botão
      const btn = this.toolbar.querySelector('[data-action="fullscreen"]');
      if (btn) btn.innerHTML = ICONS.fullscreenExit;
    } else {
      this.wrapper.style.position = '';
      this.wrapper.style.top = '';
      this.wrapper.style.left = '';
      this.wrapper.style.width = '';
      this.wrapper.style.height = '';
      this.wrapper.style.zIndex = '';
      this.content.style.minHeight = '';
      this.updateStatus(this.t('status.ready', null, STATUS_MESSAGES.ready));
      
      const btn = this.toolbar.querySelector('[data-action="fullscreen"]');
      if (btn) btn.innerHTML = ICONS.fullscreen;
    }
  }

  bindContentSync() {
    this.content.addEventListener('keyup', () => {
      this.syncToTextarea();
      this.updateCharCount();
    });
    this.content.addEventListener('blur', () => {
      this.syncToTextarea();
      this.updateCharCount();
    });
  }

  bindSourceSync() {
    this.source.addEventListener('input', () => {
      if (this.isSource) {
        this.sourceEl.value = this.source.value;
        this.updateCharCount();
      }
    });
  }

  bindPaste() {
    if (!this.options.pastePlain) return;
    this.content.addEventListener('paste', (event) => {
      event.preventDefault();
      const text = (event.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertText', false, text);
      this.syncToTextarea();
      this.updateCharCount();
    });
  }

  syncToTextarea() {
    const html = sanitize(this.content.innerHTML);
    this.sourceEl.value = html;
    if (!this.isSource) this.source.value = html;
  }

  updateStatus(message) {
    if (this.status) {
      this.status.textContent = message;
    }
  }

  updateCharCount() {
    if (!this.options.charCount || !this.charCount) return;
    
    const text = this.isSource 
      ? this.source.value 
      : this.content.textContent || '';
    
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    const charsLabel = this.t('unit.character', { count: chars }, 'caracteres');
    const wordsLabel = this.t('unit.word', { count: words }, 'palavras');
    
    if (this.options.wordCount) {
      this.charCount.textContent = `${chars} ${charsLabel} · ${words} ${wordsLabel}`;
    } else {
      this.charCount.textContent = `${chars} ${charsLabel}`;
    }
  }

  isToolEnabled(id) {
    if (id === 'separator') return true;
    if (!this.enabledTools || this.enabledTools.size === 0) return true;
    return this.enabledTools.has(id);
  }
}

function normalizeElements(selectorOrElements) {
  if (typeof selectorOrElements === 'string') {
    const sel = selectorOrElements.trim();
    if (!sel) return [];
    try {
      return [...document.querySelectorAll(sel)];
    } catch (_) {
      // Selector inválido: no-op sem lançar erro
      return [];
    }
  }
  if (selectorOrElements instanceof HTMLElement) {
    return [selectorOrElements];
  }
  if (Array.isArray(selectorOrElements)) {
    return selectorOrElements;
  }
  return [];
}

function init(selectorOrElements, opts = {}) {
  const elements = normalizeElements(selectorOrElements);
  return elements.map(el => new QuillitEditor(el, opts));
}

if (typeof window !== 'undefined') {
  window.QuillitEditor = window.QuillitEditor || {};
  window.QuillitEditor.init = init;
}

export { init, QuillitEditor };
