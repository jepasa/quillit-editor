// SPDX-License-Identifier: MIT
/**
 * @file lang/index.js
 * @fileoverview i18n do Quillit: seleção de idioma (language/autoLanguage), aliases e função de tradução (t).
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

import ptBR from './pt-BR.js';
import enUS from './en-US.js';
import esES from './es-ES.js';
import frFR from './fr-FR.js';
import deDE from './de-DE.js';
import zhCN from './zh-CN.js';

const DICTS = {
  'pt-BR': ptBR,
  'en-US': enUS,
  'es-ES': esES,
  'fr-FR': frFR,
  'de-DE': deDE,
  'zh-CN': zhCN
};

const ALIASES = {
  pt: 'pt-BR',
  'pt-br': 'pt-BR',
  en: 'en-US',
  'en-us': 'en-US',
  es: 'es-ES',
  'es-es': 'es-ES',
  fr: 'fr-FR',
  'fr-fr': 'fr-FR',
  de: 'de-DE',
  'de-de': 'de-DE',
  zh: 'zh-CN',
  'zh-cn': 'zh-CN'
};

function normalizeLang(code) {
  if (!code) return '';
  return String(code).trim();
}

function resolveLanguage(code) {
  const raw = normalizeLang(code);
  if (!raw) return 'pt-BR';

  if (DICTS[raw]) return raw;

  const lower = raw.toLowerCase();
  if (ALIASES[lower]) return ALIASES[lower];

  // tenta por base (ex.: en-GB -> en)
  const base = lower.split('-')[0];
  if (ALIASES[base]) return ALIASES[base];

  return 'pt-BR';
}

function getByPath(obj, path) {
  if (!obj) return undefined;
  const parts = String(path || '').split('.').filter(Boolean);
  let current = obj;
  for (const p of parts) {
    if (current && Object.prototype.hasOwnProperty.call(current, p)) {
      current = current[p];
    } else {
      return undefined;
    }
  }
  return current;
}

function formatTemplate(template, params) {
  if (typeof template !== 'string') return template;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_m, key) => {
    const value = params[key];
    return value === undefined || value === null ? '' : String(value);
  });
}

function pickPlural(locale, pluralObj, count) {
  if (!pluralObj || typeof pluralObj !== 'object') return undefined;
  const n = Number(count);
  if (!Number.isFinite(n)) return pluralObj.other ?? pluralObj.one;

  try {
    const rules = new Intl.PluralRules(locale);
    const cat = rules.select(n);
    return pluralObj[cat] ?? pluralObj.other ?? pluralObj.one;
  } catch (_) {
    return n === 1 ? (pluralObj.one ?? pluralObj.other) : (pluralObj.other ?? pluralObj.one);
  }
}

export function createI18n({ language = 'pt-BR', autoLanguage = false } = {}) {
  const detected = (() => {
    if (!autoLanguage) return '';
    const htmlLang = typeof document !== 'undefined'
      ? (document.documentElement && document.documentElement.lang)
      : '';
    if (htmlLang) return htmlLang;
    if (typeof navigator !== 'undefined' && navigator.language) return navigator.language;
    return '';
  })();

  const resolved = resolveLanguage(detected || language);
  const dict = DICTS[resolved] || DICTS['pt-BR'];
  const fallbackDict = DICTS['pt-BR'];

  /**
   * @param {string} key
   * @param {object|null} params
   * @param {string=} fallback
   */
  function t(key, params = null, fallback = '') {
    const primary = getByPath(dict, key);
    const fallbackValue = getByPath(fallbackDict, key);

    let value = primary !== undefined ? primary : (fallbackValue !== undefined ? fallbackValue : undefined);

    if (value && typeof value === 'object' && params && Object.prototype.hasOwnProperty.call(params, 'count')) {
      value = pickPlural(resolved, value, params.count);
    }

    if (value === undefined) return fallback || key;

    const formatted = formatTemplate(value, params);
    if (typeof formatted === 'string' && formatted.length) return formatted;

    return fallback || String(formatted ?? '');
  }

  return {
    language: resolved,
    t
  };
}

export const AVAILABLE_LANGUAGES = Object.keys(DICTS);
