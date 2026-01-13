// SPDX-License-Identifier: MIT
/**
 * @file lib/modals.js
 * @fileoverview Utilitários de modal (criar/abrir/fechar) e helpers de formulário usados pelas actions.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

import { ICONS } from './config.js';

export function createModal(title, onSubmit, options = {}) {
  const t = typeof options.t === 'function'
    ? options.t
    : (_key, _params, fallback) => fallback ?? '';
  const labels = options.labels || {};

  const closeLabel = labels.close ?? t('common.close', null, 'Fechar');
  const cancelText = labels.cancel ?? t('common.cancel', null, 'Cancelar');
  const submitText = labels.submit ?? t('common.insert', null, 'Inserir');

  const modal = document.createElement('div');
  modal.className = 'quillit-modal';
  
  const content = document.createElement('div');
  content.className = 'quillit-modal-content';
  
  const header = document.createElement('div');
  header.className = 'quillit-modal-header';
  
  const titleEl = document.createElement('h3');
  titleEl.className = 'quillit-modal-title';
  titleEl.textContent = title;
  
  const closeBtn = document.createElement('button');
  closeBtn.className = 'quillit-modal-close';
  closeBtn.innerHTML = ICONS.close;
  closeBtn.setAttribute('aria-label', closeLabel);
  closeBtn.onclick = () => closeModal(modal);
  
  header.appendChild(titleEl);
  header.appendChild(closeBtn);
  
  const body = document.createElement('div');
  body.className = 'quillit-modal-body';
  
  const footer = document.createElement('div');
  footer.className = 'quillit-modal-footer';
  
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'quillit-btn';
  cancelBtn.textContent = cancelText;
  cancelBtn.onclick = () => closeModal(modal);
  
  const submitBtn = document.createElement('button');
  submitBtn.className = 'quillit-btn';
  submitBtn.textContent = submitText;
  submitBtn.style.backgroundColor = 'var(--quillit-primary)';
  submitBtn.style.color = 'white';
  submitBtn.onclick = () => {
    if (onSubmit(body)) {
      closeModal(modal);
    }
  };
  
  footer.appendChild(cancelBtn);
  footer.appendChild(submitBtn);
  
  content.appendChild(header);
  content.appendChild(body);
  content.appendChild(footer);
  modal.appendChild(content);
  
  modal.onclick = (e) => {
    if (e.target === modal) closeModal(modal);
  };
  
  return { modal, body, submitBtn };
}

export function openModal(modal) {
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('is-open'), 10);
}

export function closeModal(modal) {
  modal.classList.remove('is-open');
  setTimeout(() => modal.remove(), 200);
}

export function createFormGroup(label, inputType = 'text', placeholder = '', value = '') {
  const group = document.createElement('div');
  group.className = 'quillit-form-group';
  
  const labelEl = document.createElement('label');
  labelEl.className = 'quillit-label';
  labelEl.textContent = label;
  
  let input;
  if (inputType === 'textarea') {
    input = document.createElement('textarea');
    input.className = 'quillit-textarea';
    input.rows = 3;
  } else if (inputType === 'select') {
    input = document.createElement('select');
    input.className = 'quillit-select';
  } else if (inputType === 'color') {
    input = document.createElement('input');
    input.type = 'color';
    input.className = 'quillit-input';
  } else {
    input = document.createElement('input');
    input.type = inputType;
    input.className = 'quillit-input';
  }
  
  input.placeholder = placeholder;
  input.value = value;
  
  group.appendChild(labelEl);
  group.appendChild(input);
  
  return { group, input };
}
