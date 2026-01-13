# Biblioteca de Mídia (Local)

## Visão geral

O Quillit pode abrir uma biblioteca local (sobremodal) para selecionar imagens do servidor.

## Configurações

- `mediaLocalDir`: diretório no filesystem (relativo ao webroot)
- `mediaLibraryEndpoint`: endpoint que lista arquivos e retorna JSON
- `mediaBasePath`: prefixo de URL usado para montar o `src` quando o caminho é relativo

Exemplo:

```js
initQuillit('#editor', {
  mediaLocalDir: 'uploads/imagens',
  mediaBasePath: '/uploads/imagens',
  // pode omitir: o Quillit tenta auto-resolver
  // mediaLibraryEndpoint: '/quillit-editor/php/quillit-media-library.php'
});
```

## Plug-and-play / fallback

- Se `mediaLocalDir` ou `mediaLibraryEndpoint` não estiverem disponíveis, o botão da biblioteca fica desabilitado e o usuário pode digitar o caminho manualmente.
- Se o endpoint não responder (projeto sem PHP/backend), o Quillit detecta e mostra mensagem, sem quebrar o editor.

## Segurança

O endpoint deve impedir path traversal e restringir listagem ao webroot.
