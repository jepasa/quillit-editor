// SPDX-License-Identifier: MIT
/**
 * @file lib/actions.js
 * @fileoverview Actions especiais (modais e manipulação DOM) para ferramentas como link, imagem, tabela, cores e listas avançadas.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

import { createModal, openModal, closeModal, createFormGroup } from './modals.js';

function getT(editor) {
  return (editor && typeof editor.t === 'function')
    ? editor.t
    : (_key, _params, fallback) => fallback ?? '';
}

async function fetchMediaLibrary(endpoint, dir, path = '', t = null) {
  const tt = typeof t === 'function' ? t : (_key, _params, fallback) => fallback ?? '';
  const url = new URL(endpoint, window.location.origin);
  url.searchParams.set('dir', dir);
  if (path) url.searchParams.set('path', path);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });

  if (!res.ok) {
    throw new Error(tt('errors.mediaLibraryHttp', { status: res.status }, `Falha ao carregar biblioteca (HTTP ${res.status})`));
  }
  const data = await res.json();
  if (!data || data.ok !== true || !Array.isArray(data.items)) {
    throw new Error(tt('errors.mediaLibraryInvalid', null, 'Resposta inválida da biblioteca de mídia'));
  }
  return data;
}

function openImageLibraryModal(editor, { onPick }) {
  const t = getT(editor);
  const endpoint = editor.options.mediaLibraryEndpoint;
  const dir = editor.options.mediaLocalDir;

  const { modal, body, submitBtn } = createModal(
    t('modal.imageLibrary.title', null, 'Biblioteca de Imagens'),
    () => {
    // Sem submit explícito; seleção acontece por clique.
    return false;
    },
    { t }
  );

  // Sobremodal: coloca acima do modal principal
  modal.style.zIndex = '10000';

  // Usa o botão "Inserir" como "Fechar" (o modal é fechado por clique/ESC/outside também)
  submitBtn.textContent = t('modal.imageLibrary.close', null, 'Fechar');
  submitBtn.onclick = () => closeModal(modal);
  submitBtn.style.backgroundColor = '';
  submitBtn.style.color = '';

  const info = document.createElement('div');
  info.className = 'quillit-media-info';
  const dirLabel = t('modal.imageLibrary.directory', null, 'Diretório:');
  const folderLabel = t('modal.imageLibrary.folder', null, 'Pasta:');
  info.innerHTML = `
    <div><strong>${escapeHtml(dirLabel)}</strong> <code>${escapeHtml(dir || '')}</code></div>
    <div><strong>${escapeHtml(folderLabel)}</strong> <code data-quillit-media-path>/</code></div>
  `;
  body.appendChild(info);

  const pathEl = info.querySelector('[data-quillit-media-path]');

  const toolbar = document.createElement('div');
  toolbar.className = 'quillit-media-toolbar';
  const filterPlaceholder = t('modal.imageLibrary.filterPlaceholder', null, 'Filtrar imagens...');
  const filterAria = t('modal.imageLibrary.filterAria', null, 'Filtrar imagens');
  toolbar.innerHTML = `
    <input class="quillit-input" type="search" placeholder="${escapeHtml(filterPlaceholder)}" aria-label="${escapeHtml(filterAria)}">
  `;
  body.appendChild(toolbar);

  const searchInput = toolbar.querySelector('input');

  const grid = document.createElement('div');
  grid.className = 'quillit-media-grid';
  grid.innerHTML = `<div class="quillit-media-status">${escapeHtml(t('modal.imageLibrary.loadingImages', null, 'Carregando imagens...'))}</div>`;
  body.appendChild(grid);

  let currentPath = '';
  let allItems = [];

  const setPathLabel = () => {
    if (!pathEl) return;
    pathEl.textContent = '/' + (currentPath ? currentPath : '');
  };

  const load = async (path) => {
    currentPath = path || '';
    setPathLabel();
    grid.innerHTML = `<div class="quillit-media-status">${escapeHtml(t('modal.imageLibrary.loading', null, 'Carregando...'))}</div>`;

    const data = await fetchMediaLibrary(endpoint, dir, currentPath, t);
    allItems = Array.isArray(data.items) ? data.items : [];
    return allItems;
  };

  const render = (items, filterText = '') => {
    const q = (filterText || '').trim().toLowerCase();
    const filtered = q
      ? items.filter(it => String(it.name || '').toLowerCase().includes(q))
      : items;

    if (!filtered.length) {
      grid.innerHTML = `<div class="quillit-media-status">${escapeHtml(t('modal.imageLibrary.none', null, 'Nenhuma imagem encontrada.'))}</div>`;
      return;
    }

    const dirs = filtered.filter(it => it.type === 'dir');
    const files = filtered.filter(it => it.type === 'file');

    grid.innerHTML = '';

    if (currentPath) {
      const up = document.createElement('button');
      up.type = 'button';
      up.className = 'quillit-media-item quillit-media-up';
      up.title = t('modal.imageLibrary.backTitle', null, 'Voltar');
      up.innerHTML = `<div class="quillit-media-thumb" style="display:flex;align-items:center;justify-content:center;">↩</div><div class="quillit-media-name">..</div>`;
      up.addEventListener('click', async () => {
        const parts = currentPath.split('/').filter(Boolean);
        parts.pop();
        const newPath = parts.join('/');
        const newItems = await load(newPath);
        render(newItems, searchInput?.value || '');
      });
      grid.appendChild(up);
    }

    [...dirs, ...files].forEach((it) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'quillit-media-item';
      if (it.type === 'dir') item.classList.add('is-dir');
      item.title = it.name;

      let thumb;
      if (it.type === 'dir') {
        thumb = document.createElement('div');
        thumb.className = 'quillit-media-thumb';
        thumb.style.display = 'flex';
        thumb.style.alignItems = 'center';
        thumb.style.justifyContent = 'center';
        thumb.style.fontSize = '28px';
        thumb.textContent = '📁';
      } else {
        thumb = document.createElement('img');
        thumb.className = 'quillit-media-thumb';
        thumb.loading = 'lazy';
        thumb.alt = it.name;
        thumb.src = it.url;
      }

      const label = document.createElement('div');
      label.className = 'quillit-media-name';
      label.textContent = it.name;

      item.appendChild(thumb);
      item.appendChild(label);

      item.addEventListener('click', () => {
        if (it.type === 'dir') {
          const next = (it.path || '').trim();
          if (!next) return;
          load(next)
            .then((newItems) => render(newItems, searchInput?.value || ''))
            .catch((err) => {
              grid.innerHTML = `<div class="quillit-media-status">${escapeHtml(t('modal.imageLibrary.openFolderError', { message: err.message || String(err) }, `Erro ao abrir pasta: ${err.message || String(err)}`))}</div>`;
            });
          return;
        }

        // Arquivo: preenche com o caminho relativo, para continuar respeitando mediaBasePath.
        const valueForInput = (it.relative || it.name || '').trim();
        if (valueForInput) onPick(valueForInput);
        closeModal(modal);
      });

      grid.appendChild(item);
    });
  };

  if (!endpoint || !dir) {
    grid.innerHTML = `<div class="quillit-media-status">${t('modal.imageLibrary.notConfigured', null, 'Biblioteca não configurada. Defina <code>mediaLibraryEndpoint</code> e <code>mediaLocalDir</code> nas opções do editor.')}</div>`;
    openModal(modal);
    return;
  }

  load('')
    .then((items) => {
      render(items);
      searchInput?.addEventListener('input', () => render(allItems, searchInput.value));
    })
    .catch((err) => {
      grid.innerHTML = `<div class="quillit-media-status">${escapeHtml(t('modal.imageLibrary.loadItemsError', { message: err.message || String(err) }, `Erro ao carregar itens: ${err.message || String(err)}`))}</div>`;
    });

  openModal(modal);
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function probeMediaLibrary(endpoint, dir) {
  if (!endpoint || !dir) return false;

  try {
    const url = new URL(endpoint, window.location.origin);
    url.searchParams.set('dir', dir);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!res.ok) return false;
    const data = await res.json().catch(() => null);
    return Boolean(data && data.ok === true);
  } catch (_) {
    return false;
  }
}

function getMediaLibraryProbeCached(editor, endpoint, dir) {
  const key = `${endpoint || ''}|${dir || ''}`;
  const cached = editor._quillitMediaLibraryProbe;
  const now = Date.now();
  const ttlMs = 5 * 60 * 1000;

  if (cached && cached.key === key && (now - cached.ts) < ttlMs) {
    return cached.ok;
  }
  return null;
}

async function ensureMediaLibraryAvailable(editor) {
  const endpoint = editor.options.mediaLibraryEndpoint;
  const dir = editor.options.mediaLocalDir;

  const cachedOk = getMediaLibraryProbeCached(editor, endpoint, dir);
  if (cachedOk !== null) return cachedOk;

  const ok = await probeMediaLibrary(endpoint, dir);
  editor._quillitMediaLibraryProbe = {
    key: `${endpoint || ''}|${dir || ''}`,
    ok,
    ts: Date.now()
  };
  return ok;
}

export function execAction(editor, command, value = null) {
  if (editor.isSource) return;
  document.execCommand(command, false, value);
  editor.syncToTextarea();
  editor.updateCharCount();
}

function getSelectionRoot(editor) {
  const sel = window.getSelection();
  const node = sel && sel.anchorNode ? sel.anchorNode : null;

  let el = null;
  if (node && node.nodeType === Node.ELEMENT_NODE) el = node;
  if (node && node.nodeType === Node.TEXT_NODE) el = node.parentElement;

  if (!editor || !editor.content) return el;
  if (!el || !editor.content.contains(el)) {
    editor.content.focus();
    return editor.content;
  }
  return el;
}

function closestWithin(el, selector, root) {
  if (!el) return null;
  let current = el;
  while (current) {
    if (current.nodeType === Node.ELEMENT_NODE && current.matches && current.matches(selector)) return current;
    if (root && current === root) break;
    current = current.parentElement;
  }
  return null;
}

function ensureOrderedList(editor) {
  if (editor && editor.content) editor.content.focus();
  document.execCommand('insertOrderedList', false, null);
}

function ensureUnorderedList(editor) {
  if (editor && editor.content) editor.content.focus();
  document.execCommand('insertUnorderedList', false, null);
}

function getCurrentOl(editor) {
  const root = editor && editor.content ? editor.content : null;
  const from = getSelectionRoot(editor);
  let ol = closestWithin(from, 'ol', root);
  if (!ol) {
    ensureOrderedList(editor);
    const after = getSelectionRoot(editor);
    ol = closestWithin(after, 'ol', root);
  }
  return ol;
}

function getCurrentUl(editor) {
  const root = editor && editor.content ? editor.content : null;
  const from = getSelectionRoot(editor);
  let ul = closestWithin(from, 'ul', root);
  if (!ul) {
    ensureUnorderedList(editor);
    const after = getSelectionRoot(editor);
    ul = closestWithin(after, 'ul', root);
  }
  return ul;
}

function getCurrentLiInOl(editor, ol) {
  const root = editor && editor.content ? editor.content : null;
  const from = getSelectionRoot(editor);
  const li = closestWithin(from, 'li', root);
  if (li && ol && ol.contains(li)) return li;
  return ol ? (ol.querySelector('li') || null) : null;
}

function applyOrderedListStyle(editor, styleType, typeAttr = '') {
  if (editor.isSource) return;
  const ol = getCurrentOl(editor);
  if (!ol) return;

  if (styleType) {
    ol.style.listStyleType = styleType;
  } else {
    ol.style.removeProperty('list-style-type');
  }

  if (typeAttr) ol.setAttribute('type', typeAttr);
  else ol.removeAttribute('type');

  editor.syncToTextarea();
  editor.updateCharCount();
}

export function orderedListDecimalAction(editor) {
  applyOrderedListStyle(editor, 'decimal', '1');
}

export function orderedListDecimalLeadingZeroAction(editor) {
  // não existe no atributo type; usa CSS
  applyOrderedListStyle(editor, 'decimal-leading-zero', '1');
}

export function orderedListUpperAlphaAction(editor) {
  applyOrderedListStyle(editor, 'upper-alpha', 'A');
}

export function orderedListLowerAlphaAction(editor) {
  applyOrderedListStyle(editor, 'lower-alpha', 'a');
}

export function orderedListUpperRomanAction(editor) {
  applyOrderedListStyle(editor, 'upper-roman', 'I');
}

export function orderedListLowerRomanAction(editor) {
  applyOrderedListStyle(editor, 'lower-roman', 'i');
}

export function orderedListLowerGreekAction(editor) {
  // não existe no atributo type; usa CSS
  applyOrderedListStyle(editor, 'lower-greek', '');
}

function applyUnorderedListStyle(editor, styleType, { diamond = false } = {}) {
  if (editor.isSource) return;
  const ul = getCurrentUl(editor);
  if (!ul) return;

  // limpa classe custom
  ul.classList.remove('quillit-ul-diamond');

  if (diamond) {
    ul.classList.add('quillit-ul-diamond');
    ul.style.listStyleType = 'none';
  } else if (styleType) {
    ul.style.listStyleType = styleType;
  } else {
    ul.style.removeProperty('list-style-type');
  }

  editor.syncToTextarea();
  editor.updateCharCount();
}

export function unorderedListDiscAction(editor) {
  applyUnorderedListStyle(editor, 'disc');
}

export function unorderedListCircleAction(editor) {
  applyUnorderedListStyle(editor, 'circle');
}

export function unorderedListSquareAction(editor) {
  applyUnorderedListStyle(editor, 'square');
}

export function unorderedListDiamondAction(editor) {
  applyUnorderedListStyle(editor, '', { diamond: true });
}

export function orderedListReversedAction(editor) {
  if (editor.isSource) return;
  const ol = getCurrentOl(editor);
  if (!ol) return;

  if (ol.hasAttribute('reversed')) ol.removeAttribute('reversed');
  else ol.setAttribute('reversed', '');

  editor.syncToTextarea();
  editor.updateCharCount();
}

export function orderedListStartAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);

  const { modal, body } = createModal(
    t('modal.orderedListStart.title', null, 'Início da lista numerada'),
    (modalBody) => {
      const input = modalBody.querySelector('input');
      const raw = input ? String(input.value || '').trim() : '';
      const ol = getCurrentOl(editor);
      if (!ol) return false;

      if (!raw) {
        ol.removeAttribute('start');
      } else {
        const n = Number.parseInt(raw, 10);
        if (!Number.isFinite(n) || n < 1) return false;
        ol.setAttribute('start', String(n));
      }

      editor.syncToTextarea();
      editor.updateCharCount();
      return true;
    },
    { t }
  );

  const { group } = createFormGroup(
    t('modal.orderedListStart.label', null, 'Começar em:'),
    'number',
    '1',
    ''
  );
  body.appendChild(group);

  openModal(modal);
}

export function orderedListItemValueAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);

  const { modal, body } = createModal(
    t('modal.orderedListItemValue.title', null, 'Número do item'),
    (modalBody) => {
      const input = modalBody.querySelector('input');
      const raw = input ? String(input.value || '').trim() : '';

      const ol = getCurrentOl(editor);
      if (!ol) return false;

      const li = getCurrentLiInOl(editor, ol);
      if (!li) return false;

      if (!raw) {
        li.removeAttribute('value');
      } else {
        const n = Number.parseInt(raw, 10);
        if (!Number.isFinite(n) || n < 1) return false;
        li.setAttribute('value', String(n));
      }

      editor.syncToTextarea();
      editor.updateCharCount();
      return true;
    },
    { t }
  );

  const { group } = createFormGroup(
    t('modal.orderedListItemValue.label', null, 'Definir número do item:'),
    'number',
    '1',
    ''
  );
  body.appendChild(group);

  openModal(modal);
}

export function inlineCodeAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  const selection = window.getSelection();
  const text = selection && selection.toString ? selection.toString() : '';
  const safeText = text || t('insertDefaults.inlineCode', null, 'code');
  document.execCommand('insertHTML', false, `<code>${safeText}</code>`);
  editor.syncToTextarea();
  editor.updateCharCount();
}

export function foreColorAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.foreColor.title', null, 'Cor do Texto'), (modalBody) => {
    const color = modalBody.querySelector('input').value;
    document.execCommand('foreColor', false, color);
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  const { group } = createFormGroup(t('modal.foreColor.pick', null, 'Escolha a cor:'), 'color', '', '#000000');
  body.appendChild(group);
  
  openModal(modal);
}

export function backColorAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.backColor.title', null, 'Cor de Fundo'), (modalBody) => {
    const color = modalBody.querySelector('input').value;
    const ok = document.execCommand('backColor', false, color);
    if (!ok) document.execCommand('hiliteColor', false, color);
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  const { group } = createFormGroup(t('modal.backColor.pick', null, 'Escolha a cor:'), 'color', '', '#ffff00');
  body.appendChild(group);
  
  openModal(modal);
}

export function linkAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.link.title', null, 'Inserir Link'), (modalBody) => {
    const inputs = modalBody.querySelectorAll('input');
    const url = inputs[0].value.trim();
    const text = inputs[1].value.trim();
    const target = inputs[2].checked;
    
    if (!url) return false;
    
    const selection = window.getSelection();
    const hasSelection = selection && selection.toString();
    
    if (hasSelection || text) {
      document.execCommand('createLink', false, url);
      const link = selection.anchorNode.parentElement.closest('a');
      if (link && target) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    } else {
      const linkHtml = `<a href="${url}"${target ? ' target="_blank" rel="noopener noreferrer"' : ''}>${url}</a>`;
      document.execCommand('insertHTML', false, linkHtml);
    }
    
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  const selection = window.getSelection();
  const selectedText = selection && selection.toString ? selection.toString() : '';
  
  const urlGroup = createFormGroup(t('modal.link.url', null, 'URL:'), 'url', 'https://exemplo.com', '');
  const textGroup = createFormGroup(
    t('modal.link.text', null, 'Texto (opcional):'),
    'text',
    t('modal.link.textPlaceholder', null, 'Texto do link'),
    selectedText
  );
  
  const checkboxDiv = document.createElement('div');
  checkboxDiv.className = 'quillit-form-group';
  checkboxDiv.innerHTML = `
    <label class="quillit-label">
      <input type="checkbox" id="linkTarget"> ${escapeHtml(t('modal.link.newTab', null, 'Abrir em nova aba'))}
    </label>
  `;
  
  body.appendChild(urlGroup.group);
  body.appendChild(textGroup.group);
  body.appendChild(checkboxDiv);
  
  openModal(modal);
}

export function unlinkAction(editor) {
  if (editor.isSource) return;
  document.execCommand('unlink', false, null);
  editor.syncToTextarea();
  editor.updateCharCount();
}

export function imageAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.image.title', null, 'Inserir Imagem'), (modalBody) => {
    const activeTab = modalBody.querySelector('.quillit-tab.active')?.dataset.tab || 'remote';
    const inputs = modalBody.querySelectorAll('.quillit-tab-content.active input');
    let url = (inputs[0]?.value || '').trim();
    const alt = (inputs[1]?.value || '').trim();
    const width = (inputs[2]?.value || '').trim();

    if (!url) return false;

    // Local: prefixa com mediaBasePath (diretório padrão), se for caminho relativo
    if (activeTab === 'local') {
      if (!/^https?:\/\//i.test(url) && !url.startsWith('/') && editor.options.mediaBasePath) {
        url = editor.options.mediaBasePath.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
      }
    }

    url = escapeHtml(url);
    const safeAlt = escapeHtml(alt || '');
    let imgHtml = `<img src="${url}" alt="${safeAlt}"`;
    if (width) imgHtml += ` style="max-width: ${width}px;"`;
    imgHtml += ' />';
    
    document.execCommand('insertHTML', false, imgHtml);
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  // Tabs
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'quillit-tabs';
  tabsContainer.innerHTML = `
    <div class="quillit-tab active" data-tab="remote">${escapeHtml(t('modal.image.tabRemote', null, '🌐 Remoto'))}</div>
    <div class="quillit-tab" data-tab="local">${escapeHtml(t('modal.image.tabLocal', null, '📁 Local'))}</div>
  `;
  body.appendChild(tabsContainer);

  // Remoto
  const remoteContent = document.createElement('div');
  remoteContent.className = 'quillit-tab-content active';
  remoteContent.dataset.tab = 'remote';
  remoteContent.appendChild(createFormGroup(t('modal.image.url', null, 'URL da imagem:'), 'url', 'https://exemplo.com/imagem.jpg', '').group);
  remoteContent.appendChild(createFormGroup(
    t('modal.image.alt', null, 'Texto alternativo:'),
    'text',
    t('modal.image.altPlaceholder', null, 'Descrição da imagem'),
    ''
  ).group);
  remoteContent.appendChild(createFormGroup(t('modal.image.width', null, 'Largura máxima (px, opcional):'), 'number', '800', '').group);
  body.appendChild(remoteContent);

  // Local
  const localContent = document.createElement('div');
  localContent.className = 'quillit-tab-content';
  localContent.dataset.tab = 'local';
  const localPathGroup = createFormGroup(
    t('modal.image.localPath', null, 'Caminho do arquivo:'),
    'text',
    t('modal.image.localPathPlaceholder', null, 'imagens/minha-imagem.jpg'),
    ''
  );
  localContent.appendChild(localPathGroup.group);

  const browseRow = document.createElement('div');
  browseRow.className = 'quillit-form-group';
  const hasLocalDir = Boolean(editor.options.mediaLocalDir);
  const hasEndpoint = Boolean(editor.options.mediaLibraryEndpoint);
  const canAttemptLibrary = hasLocalDir && hasEndpoint;
  const browseTitle = t('modal.image.browseTitle', null, 'Abrir biblioteca de imagens');
  const browseChecking = t('modal.image.browseChecking', null, '📂 Verificando...');
  const browseOpen = t('modal.image.browseOpen', null, '📂 Abrir biblioteca');
  const dirLabel = t('modal.image.dirLabel', null, 'Diretório');
  const dirNotConfigured = t('modal.image.dirNotConfigured', null, 'não configurado');
  browseRow.innerHTML = `
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
      <button type="button" class="quillit-btn" data-quillit-browse-local title="${escapeHtml(browseTitle)}" disabled>${escapeHtml(canAttemptLibrary ? browseChecking : browseOpen)}</button>
      <small style="opacity:0.8;">${escapeHtml(dirLabel)}: <code>${escapeHtml(editor.options.mediaLocalDir || dirNotConfigured)}</code></small>
    </div>
    <small data-quillit-library-status style="opacity:0.8;display:block;margin-top:6px;"></small>
  `;
  localContent.appendChild(browseRow);

  localContent.appendChild(createFormGroup(
    t('modal.image.alt', null, 'Texto alternativo:'),
    'text',
    t('modal.image.altPlaceholder', null, 'Descrição da imagem'),
    ''
  ).group);
  localContent.appendChild(createFormGroup(t('modal.image.width', null, 'Largura máxima (px, opcional):'), 'number', '800', '').group);
  body.appendChild(localContent);

  const browseBtn = browseRow.querySelector('[data-quillit-browse-local]');
  const statusEl = browseRow.querySelector('[data-quillit-library-status]');

  // Feedback/estado do botão (plug-and-play)
  if (!hasLocalDir) {
    if (statusEl) statusEl.innerHTML = t('modal.image.statusNeedLocalDir', null, 'Defina <code>mediaLocalDir</code> nas opções do editor para habilitar a biblioteca local.');
    browseBtn.disabled = true;
  } else if (!hasEndpoint) {
    if (statusEl) statusEl.innerHTML = t('modal.image.statusNeedEndpoint', null, 'Biblioteca indisponível: defina <code>mediaLibraryEndpoint</code> (ou mantenha o endpoint junto do componente para auto-resolve).');
    browseBtn.disabled = true;
  } else {
    // Checa se o endpoint realmente responde (ex.: projeto sem PHP)
    ensureMediaLibraryAvailable(editor).then((ok) => {
      if (ok) {
        browseBtn.disabled = false;
        browseBtn.textContent = t('modal.image.browseOpen', null, '📂 Abrir biblioteca');
        if (statusEl) statusEl.textContent = '';
        return;
      }

      browseBtn.disabled = true;
      browseBtn.textContent = t('modal.image.browseUnavailable', null, '📂 Biblioteca indisponível');
      if (statusEl) statusEl.textContent = t('modal.image.statusUnavailableHint', null, 'Este projeto não está servindo o endpoint da biblioteca. Você ainda pode informar o caminho manualmente.');
    });
  }

  browseBtn?.addEventListener('click', () => {
    if (!editor.options.mediaLocalDir) return;
    openImageLibraryModal(editor, {
      onPick: (relativePath) => {
        localPathGroup.input.value = relativePath;
        localPathGroup.input.focus();
      }
    });
  });

  // Alternância de tabs
  const tabs = tabsContainer.querySelectorAll('.quillit-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      body.querySelectorAll('.quillit-tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = body.querySelector(`.quillit-tab-content[data-tab="${tab.dataset.tab}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
  
  openModal(modal);
}

export function tableAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.table.title', null, 'Inserir Tabela'), (modalBody) => {
    const inputs = modalBody.querySelectorAll('input');
    const rows = Math.min(Math.max(parseInt(inputs[0].value, 10) || 2, 1), 20);
    const cols = Math.min(Math.max(parseInt(inputs[1].value, 10) || 2, 1), 10);
    const hasHeader = inputs[2].checked;
    
    let html = '<table>';
    
    if (hasHeader) {
      html += '<thead><tr>';
      for (let c = 0; c < cols; c++) {
        html += '<th>' + escapeHtml(t('modal.table.headerPrefix', { n: (c + 1) }, `Cabeçalho ${c + 1}`)) + '</th>';
      }
      html += '</tr></thead>';
    }
    
    html += '<tbody>';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) {
        html += '<td>&nbsp;</td>';
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    
    document.execCommand('insertHTML', false, html);
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  body.appendChild(createFormGroup(t('modal.table.rows', null, 'Linhas:'), 'number', '2', '2').group);
  body.appendChild(createFormGroup(t('modal.table.cols', null, 'Colunas:'), 'number', '2', '2').group);
  
  const checkboxDiv = document.createElement('div');
  checkboxDiv.className = 'quillit-form-group';
  checkboxDiv.innerHTML = `
    <label class="quillit-label">
      <input type="checkbox" id="tableHeader" checked> ${escapeHtml(t('modal.table.includeHeader', null, 'Incluir cabeçalho'))}
    </label>
  `;
  body.appendChild(checkboxDiv);
  
  openModal(modal);
}

export function kbdAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.kbd.title', null, 'Tecla de Teclado'), (modalBody) => {
    const input = modalBody.querySelector('input');
    const key = input.value.trim();
    
    if (!key) return false;
    
    document.execCommand('insertHTML', false, `<kbd>${escapeHtml(key)}</kbd>`);
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  const selection = window.getSelection();
  const selectedText = selection && selection.toString ? selection.toString() : '';
  
  body.appendChild(createFormGroup(t('modal.kbd.key', null, 'Tecla:'), 'text', 'Ctrl', selectedText).group);
  
  openModal(modal);
}

export function abbrAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.abbr.title', null, 'Abreviação'), (modalBody) => {
    const inputs = modalBody.querySelectorAll('input');
    const abbr = inputs[0].value.trim();
    const title = inputs[1].value.trim();
    
    if (!abbr || !title) return false;
    
    document.execCommand('insertHTML', false, `<abbr title="${escapeHtml(title)}">${escapeHtml(abbr)}</abbr>`);
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  const selection = window.getSelection();
  const selectedText = selection && selection.toString ? selection.toString() : '';
  
  body.appendChild(createFormGroup(t('modal.abbr.abbr', null, 'Abreviação:'), 'text', 'HTML', selectedText).group);
  body.appendChild(createFormGroup(t('modal.abbr.meaning', null, 'Significado completo:'), 'text', 'HyperText Markup Language', '').group);
  
  openModal(modal);
}

export function defListAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.defList.title', null, 'Lista de Definição'), (modalBody) => {
    const items = parseInt(modalBody.querySelector('input').value, 10) || 2;
    
    let html = '<dl>';
    for (let i = 0; i < items; i++) {
      html += `<dt>${escapeHtml(t('modal.defList.term', { n: (i + 1) }, `Termo ${i + 1}`))}</dt>`;
      html += `<dd>${escapeHtml(t('modal.defList.def', { n: (i + 1) }, `Definição ${i + 1}`))}</dd>`;
    }
    html += '</dl>';
    
    document.execCommand('insertHTML', false, html);
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  body.appendChild(createFormGroup(t('modal.defList.count', null, 'Número de itens:'), 'number', '2', '2').group);
  
  openModal(modal);
}

export function markAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  const selection = window.getSelection();
  const text = selection && selection.toString ? selection.toString() : '';
  const safeText = escapeHtml(text || t('insertDefaults.mark', null, 'destaque'));
  document.execCommand('insertHTML', false, `<mark>${safeText}</mark>`);
  editor.syncToTextarea();
  editor.updateCharCount();
}

export function videoAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.video.title', null, 'Inserir Vídeo'), (modalBody) => {
    const activeTab = modalBody.querySelector('.quillit-tab.active').dataset.tab;
    const inputs = modalBody.querySelectorAll(`.quillit-tab-content.active input`);
    
    if (activeTab === 'local') {
      let url = inputs[0].value.trim();
      if (!url) return false;
      
      if (!/^https?:\/\//i.test(url) && editor.options.mediaBasePath) {
        url = editor.options.mediaBasePath.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
      }
      
      url = escapeHtml(url);
      const videoHtml = `<video controls style="max-width: 100%;"><source src="${url}" type="video/mp4">${escapeHtml(t('browser.noVideo', null, 'Seu navegador não suporta vídeos.'))}</video>`;
      document.execCommand('insertHTML', false, videoHtml);
    } else {
      const url = inputs[0].value.trim();
      if (!url) return false;

      // Se for link direto para arquivo de vídeo, insere <video>
      if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
        const safeUrl = escapeHtml(url);
        const videoHtml = `<video controls style="max-width: 100%;"><source src="${safeUrl}">${escapeHtml(t('browser.noVideo', null, 'Seu navegador não suporta vídeos.'))}</video>`;
        document.execCommand('insertHTML', false, videoHtml);
        editor.syncToTextarea();
        editor.updateCharCount();
        return true;
      }
      
      let embedUrl = url;
      
      // YouTube
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('youtu.be') 
          ? url.split('youtu.be/')[1]?.split('?')[0]
          : url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      // Vimeo
      else if (url.includes('vimeo.com')) {
        const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      }
      
      const iframeHtml = `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      document.execCommand('insertHTML', false, iframeHtml);
    }
    
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  // Criar tabs
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'quillit-tabs';
  tabsContainer.innerHTML = `
    <div class="quillit-tab active" data-tab="local">${escapeHtml(t('modal.video.tabLocal', null, '📁 Local'))}</div>
    <div class="quillit-tab" data-tab="remote">${escapeHtml(t('modal.video.tabRemote', null, '🌐 Remoto'))}</div>
  `;
  
  body.appendChild(tabsContainer);
  
  // Conteúdo da tab local
  const localContent = document.createElement('div');
  localContent.className = 'quillit-tab-content active';
  localContent.dataset.tab = 'local';
  localContent.appendChild(createFormGroup(
    t('modal.video.localPath', null, 'Caminho do arquivo:'),
    'text',
    t('modal.video.localPathPlaceholder', null, 'videos/meu-video.mp4'),
    ''
  ).group);
  body.appendChild(localContent);
  
  // Conteúdo da tab remota
  const remoteContent = document.createElement('div');
  remoteContent.className = 'quillit-tab-content';
  remoteContent.dataset.tab = 'remote';
  remoteContent.appendChild(createFormGroup(
    t('modal.video.remoteUrl', null, 'URL (YouTube, Vimeo ou direto):'),
    'url',
    t('modal.video.remoteUrlPlaceholder', null, 'https://www.youtube.com/watch?v=...'),
    ''
  ).group);
  body.appendChild(remoteContent);
  
  // Event listeners para tabs
  const tabs = tabsContainer.querySelectorAll('.quillit-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      body.querySelectorAll('.quillit-tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const targetContent = body.querySelector(`.quillit-tab-content[data-tab="${tab.dataset.tab}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
  
  openModal(modal);
}

export function audioAction(editor) {
  if (editor.isSource) return;
  const t = getT(editor);
  
  const { modal, body } = createModal(t('modal.audio.title', null, 'Inserir Áudio'), (modalBody) => {
    const activeTab = modalBody.querySelector('.quillit-tab.active').dataset.tab;
    const input = modalBody.querySelector(`.quillit-tab-content.active input`);
    let url = input.value.trim();
    
    if (!url) return false;
    
    if (activeTab === 'local' && !/^https?:\/\//i.test(url) && editor.options.mediaBasePath) {
      url = editor.options.mediaBasePath.replace(/\/$/, '') + '/' + url.replace(/^\//, '');
    }
    
    const audioHtml = `<audio controls><source src="${url}" type="audio/mpeg">${escapeHtml(t('browser.noAudio', null, 'Seu navegador não suporta áudio.'))}</audio>`;
    document.execCommand('insertHTML', false, audioHtml);
    
    editor.syncToTextarea();
    editor.updateCharCount();
    return true;
  }, { t });
  
  // Criar tabs
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'quillit-tabs';
  tabsContainer.innerHTML = `
    <div class="quillit-tab active" data-tab="local">${escapeHtml(t('modal.audio.tabLocal', null, '📁 Local'))}</div>
    <div class="quillit-tab" data-tab="remote">${escapeHtml(t('modal.audio.tabRemote', null, '🌐 Remoto'))}</div>
  `;
  
  body.appendChild(tabsContainer);
  
  // Conteúdo da tab local
  const localContent = document.createElement('div');
  localContent.className = 'quillit-tab-content active';
  localContent.dataset.tab = 'local';
  localContent.appendChild(createFormGroup(
    t('modal.audio.localPath', null, 'Caminho do arquivo:'),
    'text',
    t('modal.audio.localPathPlaceholder', null, 'audio/musica.mp3'),
    ''
  ).group);
  body.appendChild(localContent);
  
  // Conteúdo da tab remota
  const remoteContent = document.createElement('div');
  remoteContent.className = 'quillit-tab-content';
  remoteContent.dataset.tab = 'remote';
  remoteContent.appendChild(createFormGroup(
    t('modal.audio.remoteUrl', null, 'URL do áudio:'),
    'url',
    t('modal.audio.remoteUrlPlaceholder', null, 'https://exemplo.com/audio.mp3'),
    ''
  ).group);
  body.appendChild(remoteContent);
  
  // Event listeners para tabs
  const tabs = tabsContainer.querySelectorAll('.quillit-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      body.querySelectorAll('.quillit-tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const targetContent = body.querySelector(`.quillit-tab-content[data-tab="${tab.dataset.tab}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
  
  openModal(modal);
}
