# advpl-specialist

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-GitHub%20Copilot-blueviolet)
![TOTVS](https://img.shields.io/badge/TOTVS-Protheus-orange)
![ADVPL](https://img.shields.io/badge/lang-ADVPL%20%7C%20TLPP-yellow)

Extensao de instrucoes para **GitHub Copilot** especializada em **ADVPL** e **TLPP** para desenvolvimento no ecossistema **TOTVS Protheus** — para **desenvolvedores** e **consultores funcionais**.

**Documentacao completa:** [https://thalysjuvenal.github.io/advpl-specialist](https://thalysjuvenal.github.io/advpl-specialist)

## Indice

- [Quick Start](#quick-start)
- [Funcionalidades](#funcionalidades)
- [Instalacao](#instalacao)
- [Commands](#commands)
- [Exemplos](#exemplos)
- [Agents](#agents)
- [Referencia Interna](#referencia-interna)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Referencia Embutida](#referencia-embutida)
- [Contribuindo](#contribuindo)
- [Changelog](#changelog)
- [Licenca](#licenca)

## Quick Start

Repositorio: [https://github.com/thalysjuvenal/advpl-specialist](https://github.com/thalysjuvenal/advpl-specialist)

```bash
# 1. Clone o repositorio na raiz do seu projeto Protheus (ou como submodulo)
git clone https://github.com/thalysjuvenal/advpl-specialist.git

# 2. Copie os arquivos do GitHub Copilot para o seu projeto
cp -r advpl-specialist/.github/copilot-instructions.md .github/
cp -r advpl-specialist/.github/prompts/ .github/prompts/
cp -r advpl-specialist/agents/ agents/
cp -r advpl-specialist/skills/ skills/

# 3. Abra o VS Code no seu projeto e use os slash commands no Copilot Chat
/generate function FATA050 --module FAT
/diagnose "Variable does not exist: cCodCli"
/docs FWExecView
```

### Opcao alternativa: Submodulo Git

```bash
# Adicione como submodulo na raiz do projeto
git submodule add https://github.com/thalysjuvenal/advpl-specialist.git .advpl-specialist

# Copie apenas os arquivos .github para o seu projeto
cp .advpl-specialist/.github/copilot-instructions.md .github/
cp -r .advpl-specialist/.github/prompts/ .github/prompts/
```

## Funcionalidades

### Para Desenvolvedores

- **Geracao de codigo** - Funcoes, classes TLPP, MVC, REST APIs, Web Services, pontos de entrada, TReport, FWFormBrowse, Jobs, Workflow
- **Migracao ADVPL -> TLPP** - Conversao de codigo procedural para orientado a objetos
- **Diagnostico de erros** - Analise de erros de compilacao, runtime, performance e locks
- **Revisao de codigo** - Analise com 24 regras de boas praticas, performance, seguranca e modernizacao (inclui deteccao de funcoes restritas da TOTVS e variaveis reservadas do sistema)
- **Testes ProBat** - Geracao de testes unitarios para codigo TLPP
- **Referencia de documentacao** - Funcoes nativas, dicionario SX, APIs REST, parametros MV_*, funcoes FW* de empresa/filial, lista de funcoes restritas da TOTVS
- **Processos de negocio** - Consulta de rotinas, tabelas, integracoes e fluxos de 8 modulos ERP
- **Explicacao de codigo** - Explicacao em linguagem simples com niveis junior, senior e funcional
- **Refatoracao** - Sugestoes de melhoria de estrutura com 6 padroes (RF-001 a RF-006)
- **Documentacao automatica** - Cabecalho Protheus.doc, documentacao completa e documentacao de API
- **Changelog** - Geracao de changelog a partir do git diff com classificacao de impacto

### Para Consultores Funcionais

- **Explicacao de codigo** - Nivel funcional: entenda customizacoes sem ler codigo
- **Geracao de dicionario SX** - Descreva campos em linguagem natural e gere scripts SX3, SIX, SX1, SX5 e SX7
- **Changelog** - Documento de mudancas pronto para entregar ao cliente

## Instalacao

### Opcao 1: Copiar arquivos para o projeto (recomendado)

Copie a pasta `.github/` (com `copilot-instructions.md` e `prompts/`), a pasta `agents/` e a pasta `skills/` para a raiz do seu projeto Protheus:

```bash
git clone https://github.com/thalysjuvenal/advpl-specialist.git /tmp/advpl-specialist

# Copiar instrucoes e prompts do Copilot
cp /tmp/advpl-specialist/.github/copilot-instructions.md .github/
cp -r /tmp/advpl-specialist/.github/prompts/ .github/prompts/

# Copiar agents e skills (referenciados pelos prompts)
cp -r /tmp/advpl-specialist/agents/ agents/
cp -r /tmp/advpl-specialist/skills/ skills/
```

### Opcao 2: Submodulo Git

```bash
git submodule add https://github.com/thalysjuvenal/advpl-specialist.git .advpl-specialist
```

### Requisitos

- **VS Code** com a extensao **GitHub Copilot** instalada
- **GitHub Copilot Chat** habilitado
- Recomendado: habilitar "Agent Mode" no Copilot Chat para acesso completo a ferramentas

## Commands

Os comandos estao disponiveis como **slash commands** no GitHub Copilot Chat (pasta `.github/prompts/`):

| Comando | Descricao |
|---------|-----------|
| `/generate` | Gerar codigo ADVPL/TLPP (funcoes, classes, MVC, REST, PE, TReport, FWFormBrowse, Jobs, Workflow) |
| `/migrate` | Migrar codigo ADVPL procedural para TLPP orientado a objetos |
| `/diagnose` | Diagnosticar erros e problemas em codigo ADVPL/TLPP |
| `/docs` | Consultar documentacao de funcoes, APIs e dicionario Protheus |
| `/review` | Revisar codigo ADVPL/TLPP (boas praticas, performance, seguranca, modernizacao) |
| `/test` | Gerar testes unitarios ProBat para codigo TLPP |
| `/process` | Consultar processos de negocio, rotinas e integracoes entre modulos |
| `/explain` | Explicar codigo em linguagem simples (nivel junior, senior ou funcional) |
| `/refactor` | Sugerir refatoracoes de estrutura sem mudar comportamento |
| `/document` | Gerar documentacao tecnica automatica (header, full, api) |
| `/changelog` | Gerar changelog formatado a partir do git diff |
| `/sxgen` | Gerar scripts de dicionario SX a partir de descricao em linguagem natural |

### Exemplos

```bash
# Gerar uma User Function para o modulo de faturamento
/generate function FATA050 --module FAT

# Gerar uma classe TLPP
/generate class PedidoService

# Gerar estrutura MVC completa
/generate mvc CadProduto --module EST

# Migrar arquivo ADVPL para TLPP
/migrate src/FATA001.prw

# Diagnosticar um erro
/diagnose "Variable does not exist: cCodCli"

# Consultar documentacao de funcao
/docs FWExecView

# Explicar codigo para consultor funcional
/explain src/MATA461.prw --level funcional

# Sugerir refatoracoes
/refactor src/FATA001.prw

# Gerar documentacao completa
/document src/MATA461.prw --type full

# Gerar changelog desde uma data
/changelog --since 2026-03-01 --format markdown

# Gerar script de dicionario SX3
/sxgen --type sx3
```

## Exemplos

Consulte a pasta [examples/](examples/) para seis cenarios end-to-end prontos para executar, com prompts exatos, output esperado e variacoes.

| # | Cenario | Comando principal |
|---|---------|-------------------|
| 01 | Gerar MVC completo para tabela customizada ZA1 | `/generate` |
| 02 | Migrar ADVPL procedural (FATA001) para TLPP | `/migrate` |
| 03 | Diagnosticar erro de lock infinito em `RecLock` | `/diagnose` |
| 04 | Criar endpoint REST em TLPP com namespace | `/generate` |
| 05 | Revisar codigo focando em performance | `/review` |
| 06 | Gerar dicionario SX3 + SIX + SX1 para nova tabela | `/sxgen` |

## Agents

| Agent | Descricao |
|-------|-----------|
| `code-generator` | Gera codigo ADVPL/TLPP seguindo convencoes e boas praticas |
| `migrator` | Converte codigo procedural ADVPL para TLPP com classes e namespaces |
| `debugger` | Diagnostica erros de compilacao, runtime, performance e locks |
| `docs-reference` | Consulta referencia local + TDN para funcoes, tabelas SX e APIs |
| `code-reviewer` | Analisa codigo existente para boas praticas, performance, seguranca e modernizacao |
| `process-consultant` | Consulta processos de negocio, rotinas, tabelas e integracoes entre modulos |
| `refactorer` | Analisa codigo e sugere refatoracoes de estrutura com before/after |
| `doc-generator` | Gera documentacao tecnica automatica a partir do codigo-fonte |
| `changelog-generator` | Analisa git diff e gera changelog formatado com classificacao de impacto |
| `sx-configurator` | Gera scripts de dicionario SX a partir de descricao em linguagem natural |

## Referencia Interna

Os prompts e agents carregam automaticamente bases de conhecimento internas (`skills/*/reference.md`) conforme necessario. Estas referencias sao incluidas como contexto via `#file:` nos prompts — o usuario interage exclusivamente pelos [Commands](#commands) acima.

| Referencia | Descricao |
|------------|-----------|
| `advpl-code-generation` | Padroes e templates para geracao de codigo (MVC, REST, PE, SOAP, TReport, FWFormBrowse, Jobs, Workflow) |
| `advpl-to-tlpp-migration` | Regras de conversao, checklist e exemplos before/after |
| `advpl-debugging` | Top 50 erros comuns, metodologia de debug, dicas de performance |
| `advpl-code-review` | 24 regras de revisao de codigo (boas praticas, performance, seguranca, modernizacao) |
| `probat-testing` | Framework ProBat para testes unitarios TLPP (annotations, assertions, patterns) |
| `protheus-reference` | 190+ funcoes nativas, dicionario SX, referencia REST API, funcoes FW*, lista de funcoes restritas |
| `protheus-business` | 8 modulos ERP com tabelas, rotinas, parametros MV_* e integracoes |
| `embedded-sql` | BeginSQL/EndSQL, macros %table%, %notDel%, %xfilial%, %exp%, column types |
| `code-explanation` | Metodologia de explicacao de codigo com 3 niveis de audiencia |
| `advpl-refactoring` | 6 padroes de refatoracao com before/after e regras de seguranca |
| `documentation-patterns` | Templates para Protheus.doc header, documentacao completa e API REST |
| `changelog-patterns` | Tipos de mudanca, niveis de impacto e formatos markdown/texto |
| `sx-configuration` | Definicoes completas SX3/SIX/SX1/SX5/SX7 com validacoes e pictures |
| `tdn-lookup` | Estrategia de busca online no TDN via API REST do Confluence (3 tiers) |

## Estrutura do Projeto

```
advpl-specialist/
├── .github/
│   ├── copilot-instructions.md    # Instrucoes gerais do Copilot (carregadas automaticamente)
│   ├── prompts/                   # 12 slash commands para o Copilot Chat
│   │   ├── generate.prompt.md
│   │   ├── migrate.prompt.md
│   │   ├── diagnose.prompt.md
│   │   ├── docs.prompt.md
│   │   ├── review.prompt.md
│   │   ├── test.prompt.md
│   │   ├── process.prompt.md
│   │   ├── explain.prompt.md
│   │   ├── refactor.prompt.md
│   │   ├── document.prompt.md
│   │   ├── changelog.prompt.md
│   │   └── sxgen.prompt.md
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md          # Template para reportar bugs
│   │   └── feature_request.md     # Template para sugestoes
│   └── pull_request_template.md   # Template para PRs
├── agents/                        # 10 agents especializados (referenciados pelos prompts)
│   ├── code-generator.md
│   ├── code-reviewer.md
│   ├── migrator.md
│   ├── debugger.md
│   ├── docs-reference.md
│   ├── process-consultant.md
│   ├── refactorer.md
│   ├── doc-generator.md
│   ├── changelog-generator.md
│   └── sx-configurator.md
├── commands/                      # 12 commands (referencia legacy, usados pelos prompts)
│   ├── generate.md
│   ├── migrate.md
│   ├── diagnose.md
│   ├── docs.md
│   ├── review.md
│   ├── test.md
│   ├── process.md
│   ├── explain.md
│   ├── refactor.md
│   ├── document.md
│   ├── changelog.md
│   └── sxgen.md
├── skills/                        # 14 referencias internas (reference.md + supporting files)
│   ├── advpl-code-generation/     # Padroes MVC, REST, SOAP, PE, TReport, FWFormBrowse, Jobs, Workflow
│   ├── advpl-to-tlpp-migration/   # Regras e checklist de migracao
│   ├── advpl-debugging/           # Erros comuns e performance
│   ├── advpl-code-review/         # 24 regras de revisao de codigo
│   ├── probat-testing/            # Testes unitarios ProBat (TLPP)
│   ├── protheus-business/         # 8 modulos ERP (COM, EST, FAT, FIN, CTB, FIS, PCP, MNT)
│   ├── embedded-sql/              # BeginSQL/EndSQL, macros, patterns
│   ├── protheus-reference/        # 190+ funcoes nativas, SX, REST API, funcoes restritas
│   ├── code-explanation/          # Explicacao de codigo com 3 niveis de audiencia
│   ├── advpl-refactoring/         # 6 padroes de refatoracao com before/after
│   ├── documentation-patterns/    # Templates Protheus.doc, documentacao completa, API
│   ├── changelog-patterns/        # Tipos de mudanca, impacto, formatos
│   ├── sx-configuration/          # Dicionario SX3/SIX/SX1/SX5/SX7 completo
│   └── tdn-lookup/                # Busca online no TDN via API Confluence
├── CHANGELOG.md                   # Historico de versoes
├── CODE_OF_CONDUCT.md             # Codigo de conduta
├── CONTRIBUTING.md                # Guia de contribuicao
├── LICENSE                        # Licenca MIT
├── SECURITY.md                    # Politica de seguranca
└── README.md
```

## Referencia Embutida

O projeto inclui referencia local para consulta rapida:

- **190+ funcoes nativas** documentadas com sintaxe, parametros e exemplos
- **10 funcoes FW*** de gestao de empresa/filial (FWCodFil, FWCodEmp, FWFilial, FWCompany, etc.)
- **195+ funcoes restritas** da TOTVS catalogadas com alternativas documentadas
- **9 tabelas SX** (SX1-SX9, SIX) com campos e uso programatico
- **REST API patterns** completos para WsRestFul e TLPP annotations
- **50 erros comuns** com causa e solucao
- **10 categorias de otimizacao** de performance com before/after
- **16 pontos de entrada** mais usados por modulo
- **Templates de classes TLPP** (Service, Repository, DTO)
- **MVC completo** com MenuDef, ModelDef, ViewDef e FWMVCRotAuto
- **Embedded SQL** completo com BeginSQL/EndSQL, macros, JOINs, aggregations

Para casos nao cobertos localmente, os prompts orientam o Copilot a buscar no TDN (TOTVS Developer Network) automaticamente via fetch de paginas web.

## Contribuindo

Contribuicoes sao bem-vindas! Leia o [CONTRIBUTING.md](CONTRIBUTING.md) para saber como participar.

## Changelog

Veja o [CHANGELOG.md](CHANGELOG.md) para o historico completo de versoes.

## Licenca

[MIT](LICENSE)
