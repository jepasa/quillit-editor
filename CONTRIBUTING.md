# Contribuindo com o Quillit Editor

Obrigado por contribuir com o **Quillit WYSIWYG Editor**. Este guia descreve o fluxo recomendado para abrir issues e pull requests (PRs), além de como testar e manter consistência no código.

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Setup do repositório](#setup-do-repositório)
- [Rodando a demo localmente](#rodando-a-demo-localmente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Abrindo issues](#abrindo-issues)
- [Fluxo de desenvolvimento](#fluxo-de-desenvolvimento)
- [Padrões de código](#padrões-de-código)
- [i18n (Idiomas)](#i18n-idiomas)
- [Documentação](#documentação)
- [Checklist de PR](#checklist-de-pr)
- [Segurança](#segurança)
- [Licença](#licença)

## Pré-requisitos

- Git
- Um servidor local simples para abrir a demo (recomendado): `php` (embarcado no sistema) ou qualquer servidor HTTP.
- VS Code (recomendado), com a extensão **GitHub Pull Requests and Issues** (`github.vscode-pull-request-github`).

## Setup do repositório

Clone e entre no diretório:

```bash
git clone https://github.com/jepasa/quillit-editor.git
cd quillit-editor
```

Se estiver usando VS Code:

1. Abra a pasta do projeto.
2. Instale a extensão **GitHub Pull Requests and Issues**.
3. Faça login: `Ctrl+Shift+P` → **GitHub: Sign in**.

> Dica: este repositório inclui configurações recomendadas do VS Code em `./.vscode/`.

## Rodando a demo localmente

O projeto não depende de bundlers. Você pode servir os arquivos estáticos e abrir a demo.

### Opção A: PHP embutido (recomendado)

```bash
php -S localhost:8085
# Acesse: http://localhost:8085/demo/quillit-demo.html
```

### Opção B: qualquer servidor HTTP

Use qualquer servidor simples (ex.: `python -m http.server`) e abra `demo/quillit-demo.html`.

> Observação: alguns navegadores bloqueiam recursos quando você abre via `file://`. Por isso, prefira servir via HTTP.

## Estrutura do projeto

- `quillit-editor.js`: entrada principal (ESM) do editor.
- `css/quillit-editor.css`: estilos do editor.
- `lib/`: módulos internos (toolbar, modals, sanitizer, layout, etc.).
- `lang/`: arquivos de idioma.
- `demo/`: páginas e exemplos de demonstração.
- `php/`: endpoints opcionais (ex.: biblioteca de mídia).
- `doc/`: documentação detalhada.

## Abrindo issues

Use issues para:

- Relatar bugs (com passos para reproduzir)
- Sugerir melhorias/novas features
- Pedir suporte de uso (quando fizer sentido)

Ao abrir uma issue, inclua:

- O que você esperava vs. o que aconteceu
- Passos para reproduzir (idealmente com um HTML mínimo)
- Navegador/OS (ex.: Chrome 121 / Linux)
- Se possível, um print/gravação curta

## Fluxo de desenvolvimento

### Branches

Crie branches a partir de `main`:

- `feat/nome-curto` para features
- `fix/nome-curto` para correções
- `docs/nome-curto` para documentação

Exemplo:

```bash
git checkout main
git pull
git checkout -b feat/toolbar-item-x
```

### Commits

Prefira mensagens diretas e descritivas. Exemplo:

- `Fix: sanitize paste events`
- `Feat: add table header option`
- `Docs: clarify media library setup`

### Push e PR

```bash
git push -u origin feat/toolbar-item-x
```

Abra um PR pelo VS Code (aba GitHub) ou pelo site.

## Padrões de código

O projeto é **vanilla JS** e tenta manter complexidade baixa.

- **Sem dependências externas**: evite adicionar bibliotecas sem necessidade.
- **Compatibilidade**: mantenha compatível com navegadores modernos.
- **Estilo**: mantenha o estilo existente do código (indentação, nomes e organização).
- **Mudanças pequenas e focadas**: evite refactors grandes junto com features.
- **Não quebre APIs** sem discutir antes (ex.: opções públicas, nomes exportados).

### Sanitização e segurança

- O editor possui sanitização básica. Mudanças nessa área devem ser conservadoras.
- Nunca permita execução de scripts/handlers (`on*`) vindos do conteúdo.

## i18n (Idiomas)

Arquivos em `lang/`.

Regras gerais:

- Não remova chaves existentes (isso quebra idiomas).
- Ao adicionar um texto novo na UI, inclua a chave no idioma padrão (`pt-BR`) e, se possível, faça fallback seguro.
- Evite textos “hardcoded” fora do sistema de idioma.

## Documentação

Quando alterar comportamento público:

- Atualize o `README.md` (visão geral)
- Atualize a doc correspondente em `doc/` (detalhes)

## Checklist de PR

Antes de abrir/solicitar review:

- A demo abre e funciona em `demo/quillit-demo.html`
- Você testou no mínimo em 1 navegador moderno
- Não existem arquivos acidentais no commit (ex.: logs, caches)
- Docs atualizadas quando necessário
- PR descreve claramente o *porquê* e o *como*

## Segurança

Se você encontrou uma vulnerabilidade (XSS, bypass de sanitização, etc.), evite abrir issue pública com detalhes sensíveis.

- Abra uma issue com descrição mínima e peça um canal privado, ou
- Entre em contato com o mantenedor (ver autor no `README.md`).

## Licença

Ao contribuir, você concorda que seu código será distribuído sob a licença MIT do projeto. Veja: [LICENSE](LICENSE)
