# Deploy na Hostinger - Instruções

## Problema Resolvido
O problema com as rotas `/admin`, `/blog`, etc. não funcionarem na Hostinger foi resolvido com a criação do arquivo `.htaccess`.

## Passos para Deploy

### 1. Build da Aplicação
```bash
npm run build:hostinger
```

### 2. Upload dos Arquivos
Faça upload de **TODOS** os arquivos da pasta `dist/` para a raiz do seu domínio na Hostinger.

### 3. Verificar o .htaccess
Certifique-se de que o arquivo `.htaccess` foi enviado junto com os outros arquivos. Este arquivo é **ESSENCIAL** para o funcionamento das rotas.

### 4. Estrutura de Arquivos na Hostinger
A estrutura deve ficar assim na raiz do seu domínio:
```
/
├── .htaccess
├── index.html
├── manifest.json
├── vite.svg
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── images/
    └── ...
```

## Por que o .htaccess é necessário?

A Hostinger usa Apache como servidor web. Quando você acessa uma URL como `seudominio.com/admin`, o servidor Apache procura por um arquivo ou pasta chamada "admin". Como não existe, ele retorna erro 404.

O arquivo `.htaccess` configura o Apache para redirecionar todas as requisições para o `index.html`, permitindo que o React Router (no lado do cliente) gerencie as rotas.

## Configurações do .htaccess

O arquivo `.htaccess` criado inclui:

1. **Rewrite Rules**: Redireciona todas as rotas para index.html
2. **Security Headers**: Adiciona headers de segurança
3. **Cache Control**: Configura cache para arquivos estáticos
4. **Compression**: Comprime arquivos para melhor performance

## Testando

Após o upload, teste as seguintes URLs:
- `seudominio.com/` (página inicial)
- `seudominio.com/admin` (deve funcionar)
- `seudominio.com/blog` (deve funcionar)
- `seudominio.com/demo` (deve funcionar)
- `seudominio.com/roadmap` (deve funcionar)

## Solução de Problemas

Se ainda não funcionar:

1. **Verifique se o .htaccess foi enviado**: O arquivo deve estar na raiz do domínio
2. **Limpe o cache do navegador**: Ctrl+F5 ou Ctrl+Shift+R
3. **Verifique as permissões**: O arquivo .htaccess deve ter permissão 644
4. **Contate o suporte da Hostinger**: Se o problema persistir, pode ser uma configuração específica do servidor

## Nota Importante

O arquivo `vercel.json` é específico para a Vercel e não funciona na Hostinger. Por isso criamos o `.htaccess` que é o padrão para servidores Apache. 