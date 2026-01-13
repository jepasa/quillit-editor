# Guia Rápido

## 1) Incluir os arquivos

```html
<link rel="stylesheet" href="/quillit-editor/css/quillit-editor.css">
```

## 2) Adicionar um textarea

```html
<textarea id="conteudo" name="content"></textarea>
```

## 3) Inicializar

```html
<script type="module">
  import { init as initQuillit } from '/quillit-editor/quillit-editor.js';

  initQuillit('#conteudo', {
    autoLanguage: true,
    theme: 'light',
    wordCount: true,
    // placeholder é opcional: se omitido, usa o padrão do idioma ativo
  });
</script>
```

## No-op seguro (sem erros)

Estas chamadas não devem lançar erros nem fazer nada:

```js
initQuillit('');
initQuillit('   ');
initQuillit('#nao-existe');
initQuillit('[seletor CSS inválido');
```

## Licença

MIT — veja: [../LICENSE](../LICENSE)
