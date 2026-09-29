# Site Antônia Moreira

Site institucional, com o layout e o conteúdo da versão revisada, fotos em WebP e carregamento prioritário da imagem principal.

## Build

Requer Node.js 22 ou superior. Execute `npm ci` e `npm run build`.
O resultado é gerado em `dist/`. O build verifica se todos os arquivos locais referenciados pelo HTML existem. Não há dependências externas de build.

Edite o conteúdo em `index.html` e mantenha as imagens em `public/assets/`. Não edite nem versione a pasta gerada `dist/`.

## Cloudflare Pages — ativação inicial

A conexão com o Cloudflare precisa ser feita na conta de hospedagem uma vez. Os arquivos do repositório, sozinhos, não ativam essa conexão.

1. Em Workers & Pages, crie um projeto **Pages** usando **Import an existing Git repository / Connect to Git**.
2. Autorize o aplicativo Cloudflare Workers and Pages a acessar `Ravyt-Digital/site-antonia-moreira`.
3. Selecione este repositório e a branch de produção `main`.
4. Nome do projeto: `site-antonia-moreira`; framework: `None`; comando de build: `npm run build`; diretório de saída: `dist`; diretório raiz: raiz do repositório.
5. Use Node.js 22 (`NODE_VERSION=22`, se necessário) e mantenha **Enable automatic production branch deployments** habilitado.
6. Salve e confirme que o primeiro deploy termina com sucesso no painel.

Depois de ativar a integração Git, cada novo commit enviado à `main` dispara o build e a publicação no Cloudflare automaticamente. Alterações ainda não enviadas ao GitHub não disparam publicação. Use a integração Git de Pages, pois um projeto criado somente por Direct Upload não recebe automaticamente novos commits.

O workflow do GitHub Actions verifica o build a cada push e pull request. A publicação fica a cargo da integração nativa Cloudflare Pages; não é necessário cadastrar um token Cloudflare no repositório.

Documentação: https://developers.cloudflare.com/pages/get-started/git-integration/
