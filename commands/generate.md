---
description: Generate ADVPL/TLPP code - functions, classes, MVC structures, REST APIs, Web Services, and entry points for TOTVS Protheus
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, Skill, WebSearch, WebFetch
argument-hint: "<type> [name] [--module module]"
---

# /advpl-specialist:generate

**IMPORTANT:** Always respond in the same language the user is writing in. If the user writes in Portuguese, respond in Portuguese. If in English, respond in English. Adapt all explanations and suggestions to the user's language. Code comments may remain in English or match the user's language.

Generate new ADVPL or TLPP code following Protheus conventions and best practices.

## Usage

```bash
/advpl-specialist:generate <type> [name] [--module <module>]
```

## Types

| Type | Description | Output |
|------|------------|--------|
| `function` | User Function | .prw file |
| `class` | TLPP class | .tlpp file |
| `mvc` | MVC structure (MenuDef, ModelDef, ViewDef) | .prw file |
| `rest` | REST API endpoint | .prw or .tlpp file |
| `ponto-entrada` | Entry point | .prw file |
| `webservice` | SOAP Web Service | .prw file |
| `treport` | TReport report | .prw file |
| `fwformbrowse` | FWFormBrowse/FWExecView screen | .prw file |
| `job` | Batch job / scheduled process | .prw or .tlpp file |
| `workflow` | Approval workflow process | .prw file |

## Options

| Flag | Description | Default |
|------|------------|---------|
| `--module` | Module prefix (COM, FAT, FIN, etc.). For TLPP output, also used as the namespace agrupador: `custom.<module>.<servico>` | Ask user |
| `--lang` | Language: advpl or tlpp | advpl for function/mvc/pe, tlpp for class |
| `--output` | Output file path | Auto-generated based on name |

> **TLPP namespace (mandatory for `.tlpp` files):** every generated `.tlpp` file declares a `namespace custom.<agrupador>.<servico>` line right after the includes. The generator derives the namespace from `--module` (as agrupador) plus the service/class name (as servico), all lowercase with no underscores. If `--module` is not provided, the generator asks the user for the agrupador during the Planning Phase. See [advpl-code-generation skill — TLPP Namespace Rules](../skills/advpl-code-generation/SKILL.md) for the complete rule.

## Process

**MANDATORY: Always enter planning mode before generating code. Never skip planning.**

### Planning Phase (REQUIRED)
1. **Parse arguments** - Extract type, name, and flags
2. **Ask missing details** - If name or module not provided, ask the user. **For TLPP generation (`.tlpp` output), also collect the namespace agrupador: if `--module <agrupador>` is provided, infer `namespace custom.<agrupador>.<servico>` automatically; if `--module` is missing, ask the user explicitly for the agrupador before entering plan mode. Never silently omit the namespace and never invent a default.**
3. **Ask business requirements** - What should the code do?
4. **Load skill** - Invoke `advpl-code-generation` skill
5. **Load patterns** - Read appropriate supporting file for the type
6. **Search TDN for entry points** - **If the type is `ponto-entrada`**, ALWAYS search the TDN (TOTVS Developer Network) for the entry point name before generating code. Use `WebSearch` to find the official documentation page (e.g., search for `"ENTRY_POINT_NAME site:tdn.totvs.com"`). Extract from the TDN page: PARAMIXB parameters (types, positions, descriptions), expected return type and value, which standard routine calls this entry point, and any caveats or version-specific behavior. This ensures the generated code uses the correct parameters and return type as defined by TOTVS.
7. **Enter plan mode** - Use `EnterPlanMode` to create a structured implementation plan
8. **Present plan** - Show the user a clear plan including:
   - File(s) to be created (name, path, extension)
   - Code structure (functions, classes, methods to implement)
   - **Explicit declaration of the function keyword** to be used for every function in the plan: `User Function` (default for customer-callable code), `Static Function` (internal helper), or `Method ... Class` (TLPP class). **Never** plan a bare `Function` keyword for customer code — it is reserved for the TOTVS core RPO and will not compile in a customer RPO.
   - **For every `.tlpp` file, the exact `namespace` declaration to be emitted**, following the convention `custom.<agrupador>.<servico>` (all lowercase, dots as separators, no underscores). Show it as a literal line (e.g., `namespace custom.compras.purchase`) derived from `--module` + the service/class name. If `--module` was not provided, this must have been resolved in step 2.
   - Includes and dependencies
   - Key patterns to apply (MVC, REST, SOAP, etc.)
   - Naming conventions to follow (Hungarian notation, module prefix)
   - Error handling and DB operation patterns
   - **For entry points:** TDN documentation found (PARAMIXB parameters, return type, calling routine)
   - **For REST endpoints (TLPP annotation-based):** confirm the plan uses `User Function` with `@Get/@Post/@Put/@Patch/@Delete` annotations, following the official TOTVS sample `totvs/tlpp-sample-rest/rest-mod02.tlpp`. The class-based variant (`rest-mod03.tlpp`) is also supported — use it when multiple methods share state. **Both variants require the `namespace` declaration.**
9. **Wait for approval** - The user must approve the plan before any code is written. If the user requests changes, revise the plan.
10. **Exit plan mode** - Use `ExitPlanMode` after approval

### Implementation Phase (only after approval)
11. **Generate code** - Create complete, production-ready code following the approved plan
12. **Write file** - Save with correct extension (.prw or .tlpp)
13. **Report** - Show what was created and key decisions

## Examples

```bash
# Create a User Function for billing module
/advpl-specialist:generate function FATA050 --module FAT

# Create a TLPP service class
/advpl-specialist:generate class PedidoService

# Create complete MVC CRUD
/advpl-specialist:generate mvc CadProduto --module EST

# Create a REST API endpoint
/advpl-specialist:generate rest ClienteAPI --lang tlpp

# Create an entry point
/advpl-specialist:generate ponto-entrada MT100LOK

# Create a SOAP Web Service
/advpl-specialist:generate webservice WSPedido

# Create a TReport report
/advpl-specialist:generate treport RelProdutos --module EST

# Create a FWFormBrowse screen
/advpl-specialist:generate fwformbrowse CadFornecedores --module COM

# Create a batch processing job
/advpl-specialist:generate job JobProcessaNotas --module FAT

# Create an approval workflow
/advpl-specialist:generate workflow AprovacaoPedido --module COM
```

## Output

A complete, compilable source file saved to the project directory with:
- Protheus.doc documentation header
- Proper includes (`TOTVS.CH` for `.prw`, `tlpp-core.th` / `tlpp-rest.th` for `.tlpp`)
- **Mandatory `namespace custom.<agrupador>.<servico>` line for every generated `.tlpp` file**
- Full implementation following conventions
- Error handling
- Area save/restore for DB operations
