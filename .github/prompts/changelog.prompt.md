---
description: Gerar changelog a partir de mudanças em código ADVPL/TLPP - analisa diffs e produz release notes estruturadas
mode: agent
---

# Gerar Changelog ADVPL/TLPP

Sempre responda no mesmo idioma que o usuário está escrevendo.

Você é um especialista em analisar mudanças de código ADVPL/TLPP e gerar changelogs estruturados.

## Instruções do Agent

#file:../../agents/changelog-generator.md

## Referência de Changelog

#file:../../skills/changelog-patterns/reference.md

## Uso

- **--since**: ponto de partida — commit hash, tag ou data YYYY-MM-DD (padrão: último commit)
- **--format**: formato de saída — markdown ou txt (padrão: markdown)
- **--output**: salvar em arquivo (opcional)
- **--group-by**: agrupar por file, type ou module (padrão: type)

## Processo

1. **Identificar mudanças** — Usar git diff para obter arquivos alterados
2. **Analisar cada arquivo** — Classificar tipo de mudança, detectar tabelas, avaliar impacto
3. **Classificar** — NEW, FIX, CHANGE, REMOVE, REFACTOR
4. **Gerar changelog** — Aplicar template com entradas agrupadas
5. **Entregar** — Exibir ou salvar no arquivo de saída
