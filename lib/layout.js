// SPDX-License-Identifier: MIT
/**
 * @file lib/layout.js
 * @fileoverview Monta a estrutura DOM do editor (wrapper, toolbar, área contentEditable, textarea source e statusbar).
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

import { STATUS_MESSAGES } from './config.js';

export function buildEditorStructure(sourceEl, options, sanitizeFn, t = null) {
  const tt = typeof t === 'function' ? t : (_key, _params, fallback) => fallback;
  const wrapper = document.createElement('div');
  wrapper.className = 'quillit-editor';
  if (options.theme) {
    wrapper.setAttribute('data-quillit-theme', options.theme);
  }

  const toolbar = document.createElement('div');
  toolbar.className = 'quillit-toolbar';

  const content = document.createElement('div');
  content.className = 'quillit-content';
  content.contentEditable = 'true';
  content.dataset.placeholder = options.placeholder;
  content.innerHTML = sanitizeFn(sourceEl.value || '');

  const source = document.createElement('textarea');
  source.className = 'quillit-source quillit-hidden';
  source.value = sourceEl.value || '';

  const status = document.createElement('div');
  status.className = 'quillit-status';
  
  const statusLeft = document.createElement('div');
  statusLeft.className = 'quillit-status-left';
  const statusMessage = document.createElement('span');
  statusMessage.textContent = tt('status.ready', null, STATUS_MESSAGES.ready);
  statusLeft.appendChild(statusMessage);
  
  const statusRight = document.createElement('div');
  statusRight.className = 'quillit-status-right';
  const charCount = document.createElement('span');
  charCount.className = 'quillit-char-count';
  // o valor real será atualizado pelo editor; aqui só inicializa
  charCount.textContent = '0';
  statusRight.appendChild(charCount);
  
  status.appendChild(statusLeft);
  status.appendChild(statusRight);

  sourceEl.classList.add('quillit-hidden');
  sourceEl.insertAdjacentElement('afterend', wrapper);

  wrapper.append(toolbar, content, source, status);

  return { wrapper, toolbar, content, source, status: statusMessage, charCount };
}
