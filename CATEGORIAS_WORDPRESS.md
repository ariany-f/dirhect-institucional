# Configuração de Categorias no WordPress

Para que o sistema funcione corretamente, é necessário criar as seguintes categorias no WordPress:

## Categorias Necessárias

### 1. Categoria "Roadmap"
- **Nome**: Roadmap
- **Slug**: roadmap
- **Descrição**: Itens do roadmap de desenvolvimento
- **Uso**: Posts que representam funcionalidades em desenvolvimento

### 2. Categoria "Banco de Conhecimento"
- **Nome**: Banco de Conhecimento
- **Slug**: banco-conhecimento
- **Descrição**: Artigos do banco de conhecimento
- **Uso**: Posts com tutoriais, guias e documentação

## Como Criar as Categorias

### Via Painel Administrativo do WordPress

1. Acesse o painel administrativo do WordPress
2. Vá para **Posts > Categorias**
3. Crie cada categoria com os dados acima

### Via API REST (Automático)

O sistema tentará criar as categorias automaticamente quando necessário, mas é recomendado criá-las manualmente para garantir a organização.

## Estrutura de Posts

### Posts do Blog
- **Categoria**: Qualquer categoria EXCETO roadmap e banco-conhecimento
- **Conteúdo**: Artigos gerais sobre RH, tecnologia, tendências
- **Exemplo**: "Como reduzir 90% dos erros em processos de RH"

### Itens do Roadmap
- **Categoria**: Roadmap
- **Campos ACF**: roadmap_status, roadmap_priority, roadmap_quarter, etc.
- **Exemplo**: "IA Generativa para Descrições de Cargos"

### Artigos do Banco de Conhecimento
- **Categoria**: Banco de Conhecimento
- **Campos ACF**: knowledge_category, knowledge_views, knowledge_featured, etc.
- **Exemplo**: "Como configurar integração com ERP"

## Como o Sistema Funciona

### Blog
- **Busca**: Todos os posts EXCETO os das categorias roadmap e banco-conhecimento
- **Lógica**: Exclui categorias específicas em vez de incluir uma categoria específica

### Roadmap
- **Busca**: Apenas posts da categoria roadmap
- **Lógica**: Inclui apenas posts da categoria roadmap

### Banco de Conhecimento
- **Busca**: Apenas posts da categoria banco-conhecimento
- **Lógica**: Inclui apenas posts da categoria banco-conhecimento

## Verificação

Para verificar se as categorias estão configuradas corretamente:

1. Acesse `/wp-json/wp/v2/categories` no seu WordPress
2. Verifique se as categorias aparecem com os slugs corretos
3. Teste a criação de posts em cada categoria

## Solução de Problemas

### Categoria não encontrada
- Verifique se o slug está correto
- Certifique-se de que a categoria foi criada
- Limpe o cache do WordPress se necessário

### Posts aparecendo na categoria errada
- Verifique a categoria atribuída ao post
- Certifique-se de que o post está na categoria correta
- Use a API REST para verificar: `/wp-json/wp/v2/posts?categories=ID_DA_CATEGORIA` 