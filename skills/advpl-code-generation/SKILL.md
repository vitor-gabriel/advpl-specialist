---
name: advpl-code-generation
description: Use when creating ADVPL/TLPP code - functions, classes, MVC structures, REST APIs, Web Services, or entry points for TOTVS Protheus
---

# ADVPL/TLPP Code Generation

## Overview

Patterns and templates for generating clean, standardized ADVPL and TLPP code for TOTVS Protheus. Covers User Functions, classes, MVC, REST APIs, Web Services, and entry points (pontos de entrada).

## When to Use

- Creating new functions (User Function, Static Function)
- Creating TLPP classes with methods
- Building MVC structures (Model/View/Controller)
- Implementing REST API endpoints
- Writing entry points (pontos de entrada)
- Creating SOAP Web Services
- Any new .prw or .tlpp file creation

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| User Function | Module prefix + descriptive name | `FATA001` (Faturamento), `COMA100` (Compras) |
| Static Function | Descriptive, camelCase or PascalCase | `ValidaCampo`, `GravaRegistro` |
| Class (TLPP) | PascalCase, suffix with purpose | `PedidoService`, `ClienteController` |
| Method | camelCase | `getTotal`, `validarDados` |
| Variable Local | c/n/d/l/a/o prefix + PascalCase | `cNome`, `nTotal`, `dData`, `lOk`, `aItens`, `oObj` |
| Parameter | Same as variable | `cCodCli`, `nQuantidade` |
| Constant | UPPER_SNAKE_CASE | `MAX_RETRIES`, `DEFAULT_TIMEOUT` |

**Type prefixes (Hungarian notation):**
| Prefix | Type | Example |
|--------|------|---------|
| c | Character/String | `cNome`, `cEndereco` |
| n | Numeric | `nValor`, `nQuantidade` |
| d | Date | `dEmissao`, `dVencimento` |
| l | Logical/Boolean | `lOk`, `lContinua` |
| a | Array | `aItens`, `aCampos` |
| o | Object | `oModel`, `oView` |
| b | Code Block | `bBloco`, `bCondic` |
| x | Indefinido (any) | `xRetorno`, `xParam` |

**Module prefixes:**
| Prefix | Module |
|--------|--------|
| COM | Compras |
| EST | Estoque |
| FAT | Faturamento |
| FIN | Financeiro |
| CTB | Contabilidade |
| FIS | Fiscal |
| GFE | Gestao de Frete |
| HCM | Capital Humano |
| MNT | Manutencao de Ativos |
| PCP | Planejamento e Controle de Producao |

## Mandatory Structure - User Function

Every User Function MUST follow this pattern:

```advpl
#Include "TOTVS.CH"
#Include "TopConn.ch"

/*/{Protheus.doc} FATA001
Descricao breve da funcao
@type User Function
@author Nome do Autor
@since DD/MM/YYYY
@version 1.0
@param cParam1, Caractere, Descricao do parametro
@return lRet, Logico, Retorno da funcao
@example
    u_FATA001("001")
/*/
User Function FATA001(cParam1)
    Local lRet := .T.
    Local cAlias := "SA1"

    // Salva area de trabalho
    Local aArea := GetArea()

    Begin Sequence

        // Logica principal aqui
        DbSelectArea(cAlias)
        DbSetOrder(1)

        If DbSeek(xFilial(cAlias) + cParam1)
            // Processamento
        Else
            lRet := .F.
            MsgAlert("Registro nao encontrado")
        EndIf

    Recover Using oError
        lRet := .F.
        Conout("Erro em FATA001: " + oError:Description)
    End Sequence

    // Restaura area
    RestArea(aArea)

Return lRet
```

## Variable Scope Rules

| Scope | Keyword | Visibility | Use Case |
|-------|---------|-----------|----------|
| Local | `Local` | Current function only | **Always prefer this** |
| Static | `Static` | Current PRW file | Shared state within file |
| Private | `Private` | Current function + called functions | **Avoid - use parameters** |
| Public | `Public` | Entire application | **Never use in new code** |

**Best practice:** Always use `Local`. Pass data via parameters, never via Private/Public.

## Error Handling Pattern

```advpl
Local oError
Local bErrorOld := ErrorBlock({|e| oError := e, Break(e)})

Begin Sequence

    // Codigo que pode falhar

Recover Using oError
    Conout("Erro: " + oError:Description)
    Conout("Linha: " + cValToChar(oError:GenCode))
    // Tratar erro ou re-raise

End Sequence

ErrorBlock(bErrorOld)
```

## Quick Reference - Code Types

| Type | File Extension | Pattern File |
|------|---------------|-------------|
| User Function | .prw | Inline above |
| Static Function | .prw | Inline above (same file as User Function) |
| Class TLPP | .tlpp | templates-classes.md |
| MVC | .prw | patterns-mvc.md |
| REST API | .prw or .tlpp | patterns-rest.md |
| Ponto de Entrada | .prw | patterns-pontos-entrada.md |
| Web Service SOAP | .prw | patterns-soap.md |

## Function Keyword Rules (CRITICAL)

Customer code compiled into a customer RPO **must** use `User Function` (or `Static Function` for internal helpers, or class `Method` for TLPP classes). The bare `Function` keyword is reserved for the TOTVS core RPO and will fail to compile in customer environments.

| Keyword | Valid in customer RPO? | Callable as | Typical use |
|---------|------------------------|-------------|-------------|
| `User Function NAME()` | Yes (always) | `u_NAME()` | Any customer-callable entry point, REST endpoint, job, workflow, entry point (ponto de entrada) |
| `user function NAME()` | Yes (TLPP, lowercase = same thing) | `u_NAME()` | TLPP REST endpoints with annotations (`@Get`, `@Post`, etc.) |
| `Static Function NAME()` | Yes | direct call within file | Private helper inside the same `.prw`/`.tlpp` |
| `Method NAME() Class XXX` | Yes | `oObj:NAME()` | TLPP classes |
| `Function NAME()` (bare) | **NO — fails in customer RPO** | N/A | Reserved for TOTVS core only |

### TLPP REST with annotations

The official TOTVS pattern (from `totvs/tlpp-sample-rest/rest-mod02.tlpp`) is:

```tlpp
#include "tlpp-core.th"
#include "tlpp-rest.th"

@Get("/api/v1/customers")
User Function getCustomers()
    // implementation
return oRest:setResponse(cData)
```

The class-based variant (`rest-mod03.tlpp`) is also supported — use `class ... from LongClassName` with `@Get/@Post` decorators on methods. Both patterns compile in customer RPOs. Never use bare `Function` with TLPP REST annotations.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| **Using bare `Function` keyword in customer code** | **Always use `User Function` (customer RPO requires it; invoked as `u_NAME()`)** |
| Using Private instead of Local | Always declare as Local, pass via parameters |
| Not saving/restoring area (GetArea/RestArea) | Always wrap DB operations with area save/restore |
| Missing error handling | Always use Begin Sequence / Recover / End Sequence |
| Not closing RecLock | Always use MsUnlock() after RecLock() |
| Hardcoded branch (filial) | Use xFilial(cAlias) for multi-branch compatibility |
| Missing TOTVS.CH include | Always include at minimum: #Include "TOTVS.CH" |
| Not validating function parameters | Check ValType() and empty values at function start |
| TLPP REST endpoint with bare `Function` | Use `User Function` with `@Get/@Post/...` annotation (official `rest-mod02.tlpp` pattern) |
