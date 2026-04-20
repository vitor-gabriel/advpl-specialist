# TDN Lookup — Estratégia de Busca Online

## Overview

Estratégia padronizada para buscar documentação no TDN (tdn.totvs.com) quando a referência local não tem a informação. O TDN roda sobre Confluence Data Center 7.19 e expõe a API REST v1 publicamente sem autenticação.

## Quando usar

- Função nativa não encontrada em `native-functions.md`
- Entry point não coberto por `patterns-pontos-entrada.md`
- Erro desconhecido não listado em `common-errors.md`
- Processo de negócio não coberto pelos módulos locais
- Qualquer consulta que exija a documentação oficial da TOTVS

## Estratégia de busca (local + online)

Sempre consultar a referência local antes de qualquer busca online.

### Tier 1: Cache local por domínio

Antes de qualquer busca online, **consultar o catálogo local específico do domínio** — resposta instantânea, custo zero.

| Domínio | Arquivo de cache local |
|---------|------------------------|
| Pontos de entrada | [`skills/advpl-code-generation/catalogo-top-50-pes.md`](../advpl-code-generation/catalogo-top-50-pes.md) |
| Funções nativas | [`skills/protheus-reference/native-functions.md`](../protheus-reference/native-functions.md) |
| Dicionário SX | [`skills/protheus-reference/sx-dictionary.md`](../protheus-reference/sx-dictionary.md) |
| Campos SX3 comuns | [`skills/protheus-reference/sx3-common-fields.md`](../protheus-reference/sx3-common-fields.md) |
| Erros conhecidos | [`skills/advpl-debugging/common-errors.md`](../advpl-debugging/common-errors.md) |
| Funções restritas | [`skills/protheus-reference/restricted-functions.md`](../protheus-reference/restricted-functions.md) |
| Processos de negócio | [`skills/protheus-business/modulo-*.md`](../protheus-business/) |

**Sucesso Tier 1:** termo encontrado no catálogo com metadados completos → usar diretamente, não avançar para busca online.
**Falha Tier 1:** termo não listado, ou listado com informações parciais que exigem complemento → avançar para Tier 2.

### Tier 2: Busca na API REST do Confluence (TDN)

1. Montar a URL:
   ```
   https://tdn.totvs.com/rest/api/search?cql=<CQL_ENCODADO>&expand=body.view&limit=3
   ```
2. Fazer fetch da URL
3. Se retornar JSON válido com `size > 0`:
   - Extrair `results[0].content.title`, `results[0].excerpt`, `results[0].url`
   - Extrair `results[0].content.body.view.value` (HTML do conteúdo completo)
   - Parsear o HTML para extrair: Descrição, Sintaxe, Parâmetros, Retorno, Exemplo
   - **Usar diretamente** (fim)
4. Se `size == 0` → repetir com CQL fuzzy (ver tabela de CQL abaixo)
5. Se falhar (403 Cloudflare, timeout, HTML em vez de JSON) → Tier 3

### Tier 3: Busca na web (fallback)

Se a API REST falhar, buscar na web com query: `site:tdn.totvs.com "<TERMO>" advpl`

1. Se retornar resultados com URL do TDN, acessar a página e extrair o conteúdo
2. Se não retornar resultados → informar ao usuário que a documentação não foi encontrada online

## CQL Patterns por tipo de consulta

**Endpoint:** `GET https://tdn.totvs.com/rest/api/search?cql=<CQL>&expand=body.view&limit=3`

| Tipo | CQL título exato | CQL fuzzy (fallback) |
|------|------------------|----------------------|
| Função | `type=page AND title="{FunctionName}" AND space IN ("tec","framework")` | `type=page AND title~"{FunctionName}"` |
| Entry point | `type=page AND title="{EP_NAME}" AND space IN ("tec","framework")` | `type=page AND text~"{EP_NAME}"` |
| Parâmetro MV | `type=page AND title="{MV_PARAM}"` | `type=page AND title~"{MV_PARAM}"` |
| Tabela SX | `type=page AND title~"{TableAlias}" AND space="tec"` | `type=page AND text~"{TableAlias} dicionario"` |
| API REST | `type=page AND text~"rest api {endpoint}" AND space IN ("tec","framework")` | `type=page AND text~"rest api {endpoint}"` |
| Erro | `type=page AND text~"{erro}" AND space IN ("tec","framework")` | `type=page AND text~"{erro}"` |
| Rotina | `type=page AND title~"{MATA410}"` | `type=page AND text~"{MATA410} protheus"` |
| Processo | `type=page AND text~"{processo} protheus fluxo"` | `type=page AND text~"{processo}"` |
| Módulo | `type=page AND text~"{module} modulo protheus"` | `type=page AND text~"{module}"` |
| Integração | `type=page AND text~"{moduleA} {moduleB} integracao"` | `type=page AND text~"{moduleA} {moduleB}"` |
| Conceito | `type=page AND text~"{concept} protheus" AND space IN ("tec","framework")` | `type=page AND text~"{concept}"` |

## Extração de dados do JSON

```
results[i].content.title       → Título da página
results[i].excerpt             → Resumo em texto puro
results[i].url                 → Path relativo (para Tier 5: https://tdn.totvs.com{url})
results[i].content.body.view.value → HTML do conteúdo (Descrição, Sintaxe, Parâmetros, Retorno, Exemplo)
```

## Detecção de falha

| Tier | Sucesso | Falha → próximo tier |
|------|---------|---------------------|
| **1 (Cache local)** | Termo encontrado no arquivo de cache do domínio com metadados completos | Termo não catalogado ou informações insuficientes |
| **2 (API REST)** | JSON com `"results"` e `size > 0` | HTTP 403, body com `"Attention Required"`, timeout, body vazio, JSON com `size: 0` após fuzzy |
| **3 (Busca na web)** | Resultados com URL do TDN e conteúdo relevante | Nenhum resultado encontrado |

## Informações técnicas do TDN

- **Plataforma:** Confluence Data Center 7.19
- **API:** REST v1 (`/rest/api/`) — v2 não existe em Data Center
- **Autenticação:** Acesso anônimo habilitado
- **Proteção:** Cloudflare managed challenge (pode bloquear requisições diretas)
- **Rate limit:** ~10 requests/min para anônimo
- **Spaces conhecidos:** `tec` (funções nativas), `framework` (framework MVC/REST)

## URL Encoding Reference

| Caractere | Encoded |
|-----------|---------|
| espaço | `%20` |
| `=` | `%3D` |
| `"` | `%22` |
| `(` | `%28` |
| `)` | `%29` |
| `,` | `%2C` |
| `~` | `%7E` |
