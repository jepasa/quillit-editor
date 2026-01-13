# Quillit Editor — Documentação

Esta pasta contém a documentação detalhada do componente Quillit Editor (WYSIWYG, zero dependências).

## Índice

- [Guia Rápido](quickstart.md)
- [Configuração Completa (opções e defaults)](configuration.md)
- [Toolbar (IDs, dropdowns e fallback)](toolbar.md)
- [i18n (idiomas, autoLanguage e chaves)](i18n.md)
- [Biblioteca de Mídia (endpoint e diretórios)](media-library.md)

## Convenções do Componente

- **Progressive enhancement**: o editor não deve quebrar a página se algo estiver ausente.
- **No-op seguro**: seletores inválidos/sem elementos não geram erros.
- **Ignora IDs desconhecidos**: toolbars podem conter IDs inexistentes sem quebrar.
- **Acessibilidade**: botões com `aria-label`/`title`; dropdowns fecham com ESC/clique fora.

## Licença e Atribuição

- Licença: MIT (permite usar, alterar e criar derivados, mantendo aviso e licença).
- Autor principal: Jeferson Paidilha — https://jepasa.com
- Arquivo de licença: [../LICENSE](../LICENSE)
