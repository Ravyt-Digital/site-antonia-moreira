# Site Antônia Moreira

Site institucional, com o layout e o conteúdo da versão revisada, fotos em WebP e carregamento prioritário da imagem principal.

## Build

Requer Node.js 22 ou superior. Execute `npm ci` e `npm run build`.
O resultado é gerado em `dist/`. O build verifica se todos os arquivos locais referenciados pelo HTML existem. Não há dependências externas de build.

Edite o conteúdo em `index.html` e mantenha as imagens em `public/assets/`. Não edite nem versione a pasta gerada `dist/`.

## Cloudflare Workers — publicação automática

A integração Git já identificada no projeto Cloudflare é **Workers Builds**. A configuração `wrangler.jsonc` publica o conteúdo estático de `dist/` no Worker `site-antonia-moreira`.

Configurações do projeto existente:

- Repositório: `Ravyt-Digital/site-antonia-moreira`.
- Branch de produção: `main`.
- Diretório raiz: raiz do repositório.
- Comando de build: `npm run build` (opcional no painel, pois Wrangler também executa esse build).
- Comando de deploy: `npx wrangler deploy`.
- Node.js: 22 ou superior.

O comando de build definido no Wrangler gera `dist/` antes da publicação, mesmo quando o comando de build do painel estiver vazio. Não use `wrangler pages deploy` neste projeto, que foi criado como Worker.

Cada novo commit enviado à `main` dispara Workers Builds na integração existente. A publicação só está confirmada quando o check Cloudflare termina com sucesso. Alterações ainda não enviadas ao GitHub não disparam publicação.

O workflow do GitHub Actions verifica o build a cada push e pull request. A publicação fica a cargo da integração nativa Workers Builds; não é necessário cadastrar um token Cloudflare no repositório.

Documentação: https://developers.cloudflare.com/workers/static-assets/
