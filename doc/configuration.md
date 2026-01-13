# Configuração Completa

## Como o Quillit resolve defaults

O Quillit possui um conjunto de defaults internos (ex.: toolbar padrão, tema, contadores etc). A resolução segue esta regra:

1. Defaults internos (código)
2. Opções passadas no `initQuillit(..., opts)` sobrescrevem defaults
3. Alguns valores dependem de i18n (idioma) quando **não** forem passados

### Placeholder por idioma

- Se você **não** passar `placeholder` nas opções, o Quillit usa `placeholder.default` do idioma ativo.
- Se você passar `placeholder`, o valor passado é respeitado exatamente (mesmo vazio).

Exemplo:

```js
// Usa placeholder do idioma detectado
initQuillit('#editor', { autoLanguage: true });

// Força placeholder custom
initQuillit('#editor', { placeholder: 'Escreva aqui…' });
```

## Opções

### i18n
- `language` (string): idioma padrão, ex.: `pt-BR`, `en-US`
- `autoLanguage` (boolean): se `true`, usa `<html lang>` e fallback para `navigator.language`

### UI
- `theme`: `light`, `dark` ou `null`
- `charCount`: exibe contagem de caracteres
- `wordCount`: exibe contagem de palavras (se `true`, aparece junto com caracteres)
- `fullscreen`: habilita botão/modo tela cheia (via toolbar)

### Cola (paste)
- `pastePlain` (boolean): cola como texto puro

### Toolbar
- `toolbar` (array): ordem e agrupamento (ver [toolbar.md](toolbar.md))
- `enabledTools` (array|null): whitelist de IDs. `null` = todas.

### Biblioteca local de imagens
- `mediaLocalDir`: caminho no filesystem (relativo ao webroot)
- `mediaBasePath`: caminho público (URL) para prefixar quando o usuário escolhe um arquivo local
- `mediaLibraryEndpoint`: endpoint JSON (se vazio, tenta auto-resolve)

## Recomendações

- Prefira `autoLanguage: true` em projetos multilíngues.
- Em CMS, mantenha `mediaLocalDir` (filesystem) separado de `mediaBasePath` (URL).
- Use `enabledTools` para perfis (ex.: minimalista vs completo).
