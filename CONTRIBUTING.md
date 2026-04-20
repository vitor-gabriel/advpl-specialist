# Contributing

Obrigado pelo interesse em contribuir com o **advpl-specialist**! Este guia explica como participar do projeto.

## Como contribuir

### Reportar bugs

1. Verifique se o bug ja nao foi reportado em [Issues](https://github.com/thalysjuvenal/advpl-specialist/issues)
2. Crie uma nova issue usando o template **Bug Report**
3. Inclua: versao do VS Code, versao do GitHub Copilot, passos para reproduzir, comportamento esperado vs atual

### Sugerir melhorias

1. Crie uma issue usando o template **Feature Request**
2. Descreva o caso de uso e o beneficio para a comunidade ADVPL/TLPP

### Enviar codigo

1. Fork o repositorio
2. Crie uma branch a partir de `main`: `git checkout -b feat/minha-feature`
3. Faca suas alteracoes seguindo as convencoes abaixo
4. Commit com mensagens [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` para novas funcionalidades
   - `fix:` para correcoes
   - `docs:` para documentacao
   - `chore:` para tarefas de manutencao
5. Abra um Pull Request usando o template disponivel

## Convencoes do projeto

### Estrutura de arquivos

| Diretorio | Conteudo |
|-----------|----------|
| `commands/` | Comandos de referencia (logica dos slash commands) |
| `agents/` | Agents especializados com workflows definidos |
| `skills/` | References com reference.md + arquivos de suporte |

### Exemplos de codigo ADVPL/TLPP

- Arquivos `.prw` usam `#Include "TOTVS.CH"` (nunca `Protheus.ch` — esta obsoleto)
- Arquivos `.tlpp` usam includes `.th` (`tlpp-core.th`, `tlpp-rest.th`, etc.)
- Nenhum `using namespace tlpp.*` nos exemplos — sempre usar includes `.th`
- `using namespace` e valido apenas para namespaces custom (ex: `custom.vendas`)
- Variaveis sempre `Local` (nunca `Private`/`Public` em codigo novo)
- Notacao Hungara em todas as variaveis (`cNome`, `nValor`, `lOk`, etc.)

### Markdown

- Frontmatter YAML em commands e agents
- Tabelas para referencia rapida
- Blocos de codigo com linguagem especificada (` ```advpl ` ou ` ```tlpp `)

## Ambiente de desenvolvimento

```bash
# Clone o repositorio
git clone https://github.com/thalysjuvenal/advpl-specialist.git

# Copie para um projeto Protheus e teste no VS Code com GitHub Copilot
cp -r advpl-specialist/.github/ seu-projeto/.github/
cp -r advpl-specialist/agents/ seu-projeto/agents/
cp -r advpl-specialist/skills/ seu-projeto/skills/
```

## Licenca

Ao contribuir, voce concorda que suas contribuicoes serao licenciadas sob a [MIT License](LICENSE).
