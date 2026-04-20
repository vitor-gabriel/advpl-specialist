---
description: Consult Protheus ERP business processes, module workflows, routines and integrations
---

# /process

**IMPORTANT:** Always respond in the same language the user is writing in. If the user writes in Portuguese, respond in Portuguese. If in English, respond in English. Adapt all explanations, process descriptions, and references to the user's language.

Consult Protheus ERP business processes, module workflows, routines, and integrations.

## Usage

```bash
/process <query> [options]
```

## Options

| Flag | Description | Default |
|------|------------|---------|
| `--type` | Query type: `process`, `routine`, `module`, `integration` | auto-detect |

## Process

1. **Load reference** - Read `skills/protheus-business/reference.md`
2. **Parse query** - Extract search term and options
3. **Classify query type** - If `--type` not specified, auto-detect:
   - Contains routine code (e.g. MATA410, FINA040) -> routine
   - Contains module name (Compras, Faturamento, Estoque, etc.) -> module
   - Contains two module names or keywords like "integracao" / "integration" -> integration
   - Otherwise -> process
4. **Search local reference** - Check `skills/protheus-business/` module files (modulo-compras.md, modulo-estoque.md, etc.)
5. **Search TDN** - If not found locally, search TDN online:
   - Process: `site:tdn.totvs.com "<process>" protheus fluxo`
   - Routine: `site:tdn.totvs.com "<ROUTINE_CODE>" rotina`
   - Module: `site:tdn.totvs.com "<module>" modulo protheus`
   - Integration: `site:tdn.totvs.com "<moduleA>" "<moduleB>" integracao`
6. **Deliver answer** - Format response based on query type

## Response Format

Adaptive based on query type:

**Process query:**
- Description of the process
- Step-by-step flow with routines and tables at each step
- Integrations with other modules
- Available entry points

**Routine query:**
- What the routine does
- Tables it reads/writes
- MV parameters it uses
- Which process it belongs to
- Available entry points

**Module query:**
- Module overview
- Main tables
- Main routines
- Key business processes
- Integrations with other modules

**Integration query:**
- Data flow between modules
- Linking tables
- Routines involved at each side
- Direction of data flow

## Cross-References

When the user needs more detail, read additional references:
- **protheus-reference** - for native function details (syntax, parameters, return values)
- **advpl-code-generation** - for code examples and implementation patterns
- **embedded-sql** - for query examples using Embedded SQL

## Examples

```bash
# Understand a business process
/process fluxo de compras

# Look up a specific routine
/process MATA410

# Understand a module
/process modulo Faturamento --type module

# Understand integration between modules
/process integracao Compras Estoque --type integration

# Ask in natural language
/process como funciona o processo de faturamento no Protheus?

# Look up financial process
/process contas a pagar
```

## Output

- Clear, structured explanation adapted to query type
- References to routines, tables, and entry points
- Source citation (local reference or TDN)
- Suggestions for related references when further detail is needed
