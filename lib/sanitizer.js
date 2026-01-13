// SPDX-License-Identifier: MIT
/**
 * @file lib/sanitizer.js
 * @fileoverview Sanitização defensiva do HTML (remove scripts/handlers) e validação básica de URLs/iframes.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

function isSafeUrl(url) {
  const value = (url || '').trim();
  if (!value) return false;
  if (/^javascript:/i.test(value)) return false;

  // Permite relativo (/caminho) e relativo simples (caminho/arquivo)
  if (!/^[a-z][a-z0-9+.-]*:/i.test(value)) return true;

  // Permite somente http/https
  return /^https?:/i.test(value);
}

function isAllowedIframeSrc(url) {
  if (!isSafeUrl(url)) return false;
  try {
    const u = new URL(url, window.location.origin);
    const host = (u.hostname || '').toLowerCase();
    // Embeds comuns (mantém o editor seguro por padrão)
    return host === 'www.youtube.com' || host === 'youtube.com' || host === 'player.vimeo.com';
  } catch {
    return false;
  }
}

export function sanitize(html = '') {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const forbidden = ['script', 'style'];

  forbidden.forEach(tag => doc.querySelectorAll(tag).forEach(node => node.remove()));

  doc.querySelectorAll('*').forEach(node => {
    // Remove handlers inline
    [...node.attributes].forEach(attr => {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) node.removeAttribute(attr.name);
    });

    const tag = node.tagName.toLowerCase();

    // Normaliza URLs perigosas
    if (tag === 'a') {
      const href = node.getAttribute('href');
      if (href && !isSafeUrl(href)) node.removeAttribute('href');
    }

    if (tag === 'img' || tag === 'video' || tag === 'audio' || tag === 'source') {
      const src = node.getAttribute('src');
      if (src && !isSafeUrl(src)) node.removeAttribute('src');
    }

    if (tag === 'iframe') {
      const src = node.getAttribute('src');
      if (!src || !isAllowedIframeSrc(src)) {
        node.remove();
        return;
      }

      // Mantém apenas atributos seguros
      const allowed = new Set([
        'src',
        'width',
        'height',
        'title',
        'frameborder',
        'allow',
        'allowfullscreen',
        'loading',
        'referrerpolicy'
      ]);
      [...node.attributes].forEach(attr => {
        if (!allowed.has(attr.name.toLowerCase())) node.removeAttribute(attr.name);
      });
    }
  });

  return doc.body.innerHTML;
}
