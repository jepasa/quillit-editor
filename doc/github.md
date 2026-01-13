# GitHub (manutenção do repositório)

Este documento descreve a configuração recomendada do repositório no GitHub para manter um fluxo **restrito** (mais seguro e controlado) na branch `main`.

## Objetivo

- Bloquear push direto na `main`
- Exigir PR + revisão + CI antes de merge
- Evitar force-push e deleção acidental da branch

## Pré-requisitos no repositório

Arquivos já incluídos neste projeto:

- `./.github/CODEOWNERS` (define code owners)
- `./.github/workflows/sanity.yml` (checagem leve)
- Templates: `./.github/pull_request_template.md` e `./.github/ISSUE_TEMPLATE/*`
- `./SECURITY.md`

## Ruleset / Branch protection (recomendado)

No GitHub:

1. `Settings` → `Rules` → `Rulesets`
2. Crie um ruleset para `main` (ex.: `Protect main (PR + reviews + CI)`) e marque `Enforcement status: Active`.
3. **Bypass list**: deixe vazio (mais restrito).
4. **Branch targeting criteria**: `Default branch` (recomendado)

> Importante: evite `All branches`, senão você pode bloquear push em branches de feature/chore (e até travar a atualização de PRs).

### Branch rules sugeridas

- Restrict creations: OFF
- Restrict updates: OFF
- Restrict deletions: ON
- Require linear history: OFF (opcional)
- Require deployments to succeed: OFF
- Require signed commits: OFF (opcional)
- Block force pushes: ON

### Pull request rules sugeridas

- Require a pull request before merging: ON
- Required approvals: 1 (ou 2, se quiser ainda mais rigor)
- Dismiss stale pull request approvals when new commits are pushed: ON
- Require review from Code Owners: ON
- Require approval of the most recent reviewable push: ON
- Require conversation resolution before merging: ON
- Allowed merge methods:
  - Squash: ON
  - Rebase: ON (opcional)
  - Merge commit: OFF

### Status checks

- Require status checks to pass: ON
- Selecione o check (recomendado): `sanity / js-sanity (pull_request)`
- Require branches to be up to date before merging: ON
- Do not require status checks on creation: ON

> Dica: evite selecionar checks de `push` aqui. Se você já exige PR antes do merge, o check do evento `pull_request` é o que realmente bloqueia o merge na `main`.

### Se o GitHub mostrar "Expected — Waiting for status"

Isso geralmente significa que você selecionou algum status check que **não está sendo reportado** (por exemplo, um check antigo ou o check do evento errado).

- Deixe pelo menos 1 check obrigatório, mas mantenha **somente** o `sanity / js-sanity (pull_request)` como requerido.
- Remova qualquer check genérico `sanity` ou variantes duplicadas.

> Observação: se o GitHub não listar o check, rode o workflow ao menos 1 vez em `Actions` → `sanity` → `Run workflow`.

## Notas

- Com esse setup, contribuições externas entram via PR, mas você continua no controle total do merge.
- Se você ficar “travado” por alguma exigência, geralmente é melhor ajustar a regra/check do que liberar bypass.
