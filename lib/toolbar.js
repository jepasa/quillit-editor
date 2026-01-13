// SPDX-License-Identifier: MIT
/**
 * @file lib/toolbar.js
 * @fileoverview Renderização da toolbar (botões, dropdowns, separadores) e comportamento de abertura/fechamento.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

function createButton(icon, label) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'quillit-btn';
  btn.title = label;
  btn.setAttribute('aria-label', label);
  btn.textContent = icon;
  return btn;
}

let globalDropdownListenersAdded = false;

function closeAllDropdowns() {
  document.querySelectorAll('.quillit-dropdown.is-open').forEach(closeDropdown);
}

function createDropdown(config, commandMap, handlers, isEnabled) {
  const dropdown = document.createElement('div');
  dropdown.className = 'quillit-dropdown';
  
  // Botão toggle
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'quillit-btn quillit-dropdown-toggle';
  toggle.title = config.label;
  toggle.setAttribute('aria-label', config.label);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.append(document.createTextNode(`${config.icon} `));
  const arrow = document.createElement('span');
  arrow.className = 'quillit-dropdown-arrow';
  arrow.textContent = '▾';
  toggle.appendChild(arrow);
  
  // Menu dropdown
  const menu = document.createElement('div');
  menu.className = 'quillit-dropdown-menu';
  menu.setAttribute('role', 'menu');
  
  // Adicionar itens
  config.items.forEach(itemKey => {
    if (itemKey === 'separator') {
      const sep = document.createElement('div');
      sep.className = 'quillit-dropdown-separator';
      sep.setAttribute('role', 'separator');
      menu.appendChild(sep);
      return;
    }

    if (!isEnabled(itemKey)) return;
    
    const special = handlers.special || {};
    
    if (special[itemKey]) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'quillit-dropdown-item';
      item.setAttribute('role', 'menuitem');
      item.title = special[itemKey].label;
      item.setAttribute('aria-label', special[itemKey].label);

      const iconSpan = document.createElement('span');
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.textContent = special[itemKey].icon;

      const srOnly = document.createElement('span');
      srOnly.className = 'quillit-visually-hidden';
      srOnly.textContent = special[itemKey].label;

      item.appendChild(iconSpan);
      item.appendChild(srOnly);
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        special[itemKey].handler();
        closeDropdown(dropdown);
      });
      menu.appendChild(item);
    } else if (commandMap[itemKey]) {
      const def = commandMap[itemKey];
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'quillit-dropdown-item';
      item.setAttribute('role', 'menuitem');
      item.title = def.label;
      item.setAttribute('aria-label', def.label);

      const iconSpan = document.createElement('span');
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.textContent = def.icon;

      const srOnly = document.createElement('span');
      srOnly.className = 'quillit-visually-hidden';
      srOnly.textContent = def.label;

      item.appendChild(iconSpan);
      item.appendChild(srOnly);
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        handlers.onCommand(def.command, def.value);
        closeDropdown(dropdown);
      });
      menu.appendChild(item);
    }
  });
  
  // Toggle dropdown
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('is-open');
    
    // Fechar outros dropdowns
    document.querySelectorAll('.quillit-dropdown.is-open').forEach(d => {
      if (d !== dropdown) closeDropdown(d);
    });
    
    if (isOpen) {
      closeDropdown(dropdown);
    } else {
      openDropdown(dropdown);
    }
  });
  
  dropdown.appendChild(toggle);
  dropdown.appendChild(menu);
  
  return dropdown;
}

function openDropdown(dropdown) {
  dropdown.classList.add('is-open');
  const toggle = dropdown.querySelector('.quillit-dropdown-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', 'true');
}

function closeDropdown(dropdown) {
  dropdown.classList.remove('is-open');
  const toggle = dropdown.querySelector('.quillit-dropdown-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

export function buildToolbar(toolbarEl, toolbarItems, commandMap, handlers, isEnabled) {
  const special = handlers.special || {};
  let currentGroup = null;

  toolbarItems.forEach(item => {
    // Se for objeto dropdown
    if (typeof item === 'object' && item.type === 'dropdown') {
      // Cria novo grupo se necessário
      if (!currentGroup) {
        currentGroup = document.createElement('div');
        currentGroup.className = 'quillit-toolbar-group';
        toolbarEl.appendChild(currentGroup);
      }
      
      const dropdown = createDropdown(item, commandMap, handlers, isEnabled);
      currentGroup.appendChild(dropdown);
      return;
    }
    
    const key = item;
    if (!isEnabled(key)) return;

    if (key === 'separator') {
      const sep = document.createElement('div');
      sep.className = 'quillit-separator';
      toolbarEl.appendChild(sep);
      currentGroup = null;
      return;
    }

    // Cria novo grupo se necessário
    if (!currentGroup) {
      currentGroup = document.createElement('div');
      currentGroup.className = 'quillit-toolbar-group';
      toolbarEl.appendChild(currentGroup);
    }

    if (special[key]) {
      const btn = createButton(special[key].icon, special[key].label);
      btn.dataset.action = key;
      btn.addEventListener('click', special[key].handler);
      currentGroup.appendChild(btn);
      return;
    }

    if (commandMap[key]) {
      const def = commandMap[key];
      const btn = createButton(def.icon, def.label);
      btn.dataset.command = def.command;
      if (def.value) btn.dataset.value = def.value;
      btn.addEventListener('click', () => handlers.onCommand(def.command, def.value));
      currentGroup.appendChild(btn);
    }
  });

  const spacer = document.createElement('div');
  spacer.className = 'quillit-spacer';
  toolbarEl.appendChild(spacer);

  // Listeners globais (uma vez) para fechar dropdown ao clicar fora / ESC
  if (!globalDropdownListenersAdded) {
    globalDropdownListenersAdded = true;
    document.addEventListener('click', closeAllDropdowns);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllDropdowns();
    });
  }
}
