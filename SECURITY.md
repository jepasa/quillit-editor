# Security Policy

Este documento descreve como reportar vulnerabilidades de segurança do **Quillit Editor** de forma responsável.

## Reportando uma vulnerabilidade

Por favor, **não** abra issues públicas com detalhes de exploração (ex.: payloads de XSS) antes de existir correção.

Use um dos caminhos abaixo:

1. **Email (recomendado)**: envie para `jepasa@jepasa.com`
2. Se preferir iniciar via GitHub: abra uma issue com **descrição mínima** e peça um canal privado para compartilhar detalhes.

Inclua, se possível:

- Descrição do problema e impacto (ex.: XSS, bypass de sanitização, CSRF, path traversal no endpoint PHP)
- Passos para reproduzir (idealmente com exemplo mínimo)
- Versão/commit afetado e navegador/OS
- Sugestão de correção, se você tiver

## Escopo

Exemplos de itens no escopo:

- XSS / injeção de HTML
- Bypass de sanitização
- Execução de código via endpoints em `php/`
- Vazamento de arquivos na biblioteca de mídia

## Divulgação responsável

- Vamos confirmar o recebimento e tentar dar uma primeira resposta em até **7 dias**.
- Se confirmado, vamos trabalhar numa correção e combinar um prazo de divulgação.

Obrigado por ajudar a manter o projeto seguro.
