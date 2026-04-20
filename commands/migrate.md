---
description: Migrate ADVPL procedural code to TLPP object-oriented code with classes, namespaces, and modern patterns
---

# /migrate

**IMPORTANT:** Always respond in the same language the user is writing in. If the user writes in Portuguese, respond in Portuguese. If in English, respond in English. Adapt all explanations and suggestions to the user's language. Code comments may remain in English or match the user's language.

Convert ADVPL procedural code to TLPP with object-oriented patterns.

## Usage

```bash
/migrate <file.prw> [options]
```

## Options

| Flag | Description | Default |
|------|------------|---------|
| `--output` | Output .tlpp file path | Same name with .tlpp extension |
| `--dry-run` | Show migration plan without generating files | false |
| `--keep-original` | Keep the original .prw file | true |
| `--wrapper` | Generate backward compatibility wrapper | true |
| `--namespace` | Override namespace | Auto-detect from module |

## Process

**MANDATORY: Always enter planning mode before migrating code. Never skip planning.**

### Analysis Phase
1. **Read source file** - Read the .prw file completely
2. **Analyze structure** - Identify functions, dependencies, shared variables
3. **Search for callers** - Search codebase for references to the function

### Planning Phase (REQUIRED)
4. **Load reference** - Read `skills/advpl-to-tlpp-migration/reference.md` for rules and checklist
5. **Design class structure** - Map functions to classes and methods
6. **Present plan** - Show the user a detailed migration plan including:
   - Source file analysis (functions found, dependencies, shared variables)
   - External callers that will be impacted
   - Target class structure (class name, namespace, properties, methods)
   - Mapping: which function becomes which method (public/private)
   - Private/Public variables to convert to class properties
   - Includes to update (TOTVS.CH -> tlpp-core.th, etc.)
   - Whether a backward compatibility wrapper is needed
   - Any risks or breaking changes
7. **Wait for approval** - The user must approve the plan before any code is written. If the user requests changes, revise the plan.
8. **If --dry-run** - Stop here after showing the plan

### Implementation Phase (only after approval)
11. **Execute migration** - Generate .tlpp file(s) following the approved plan and `skills/advpl-to-tlpp-migration/reference.md`
12. **Generate wrapper** - Create backward compatibility .prw wrapper if --wrapper
13. **Run checklist** - Validate against migration-checklist.md
14. **Report** - Show summary of changes

## Examples

```bash
# Migrate a file (shows plan first, then generates)
/migrate src/FATA001.prw

# Preview migration without generating files
/migrate src/FATA001.prw --dry-run

# Specify output path and namespace
/migrate src/FATA001.prw --output src/tlpp/PedidoService.tlpp --namespace mycompany.faturamento

# Migrate without backward compatibility wrapper
/migrate src/FATA001.prw --wrapper false
```

## Output

- `.tlpp` file with migrated class-based code
- Optional `.prw` wrapper for backward compatibility
- Migration summary with what changed and why
