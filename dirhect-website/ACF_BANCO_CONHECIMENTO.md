# Configuração ACF para Banco de Conhecimento

## 1. Criar Categoria no WordPress

Primeiro, crie uma nova categoria no WordPress:
- **Nome**: Banco de Conhecimento
- **Slug**: banco-conhecimento
- **Descrição**: Artigos e tutoriais do banco de conhecimento

## 2. Configurar ACF (Advanced Custom Fields)

### 2.1 Criar Novo Grupo de Campos

1. Vá para **Custom Fields > Add New**
2. Nome do grupo: "Banco de Conhecimento Fields"

### 2.2 Configurar Localização

- **Show this field group if**: Post Type is equal to Post
- **AND**: Post Category is equal to Banco de Conhecimento

### 2.3 Adicionar Campos

#### Campo 1: Categoria do Artigo
- **Field Label**: Categoria do Artigo
- **Field Name**: knowledge_category
- **Field Type**: Select
- **Choices**:
  ```
  tutorial : Tutorial
  guia : Guia
  faq : FAQ
  dica : Dica
  troubleshooting : Solução de Problemas
  best-practices : Melhores Práticas
  ```
- **Default Value**: tutorial
- **Return Format**: Value

#### Campo 2: Tags
- **Field Label**: Tags
- **Field Name**: knowledge_tags
- **Field Type**: Text
- **Instructions**: Digite as tags separadas por vírgula
- **Placeholder**: tag1, tag2, tag3

#### Campo 3: Visualizações
- **Field Label**: Visualizações
- **Field Name**: knowledge_views
- **Field Type**: Number
- **Default Value**: 0
- **Minimum Value**: 0

#### Campo 4: Em Destaque
- **Field Label**: Em Destaque
- **Field Name**: knowledge_featured
- **Field Type**: True/False
- **Default Value**: 0 (False)
- **UI**: 1 (Yes)

#### Campo 5: Nível de Dificuldade
- **Field Label**: Nível de Dificuldade
- **Field Name**: knowledge_difficulty
- **Field Type**: Select
- **Choices**:
  ```
  beginner : Iniciante
  intermediate : Intermediário
  advanced : Avançado
  expert : Especialista
  ```
- **Default Value**: beginner
- **Return Format**: Value

#### Campo 6: Tempo de Leitura
- **Field Label**: Tempo de Leitura (minutos)
- **Field Name**: knowledge_read_time
- **Field Type**: Number
- **Default Value**: 5
- **Minimum Value**: 1

#### Campo 7: Autor Original
- **Field Label**: Autor Original
- **Field Name**: knowledge_original_author
- **Field Type**: Text
- **Instructions**: Nome do autor original do conteúdo

#### Campo 8: Data de Atualização
- **Field Label**: Data de Atualização
- **Field Name**: knowledge_last_updated
- **Field Type**: Date Picker
- **Display Format**: d/m/Y
- **Return Format**: Y-m-d

### 2.4 Configurações do Grupo

- **Position**: Normal (after content)
- **Style**: Seamless
- **Active**: Yes

## 3. Como Usar

### 3.1 Criar Artigo
1. Vá para **Posts > Add New**
2. Selecione a categoria "Banco de Conhecimento"
3. Preencha os campos ACF que aparecerão
4. Publique o post

### 3.2 Estrutura do Artigo
- **Título**: Nome do artigo/tutorial
- **Conteúdo**: Conteúdo principal do artigo
- **Resumo**: Breve descrição do que o artigo aborda
- **Categoria do Artigo**: Tipo de conteúdo (tutorial, guia, etc.)
- **Tags**: Palavras-chave para busca
- **Nível de Dificuldade**: Para quem o conteúdo é destinado
- **Tempo de Leitura**: Estimativa em minutos

## 4. Exemplo de Artigo

**Título**: Como Configurar Integração com ERP

**Categoria do Artigo**: Tutorial
**Nível de Dificuldade**: Intermediário
**Tempo de Leitura**: 15
**Tags**: integração, erp, configuração, api
**Em Destaque**: Sim

**Conteúdo**: 
```
## Introdução
Este tutorial mostra como configurar a integração...

## Pré-requisitos
- Acesso ao painel administrativo
- Credenciais do ERP

## Passo a Passo
1. Acesse as configurações...
2. Configure as credenciais...
3. Teste a conexão...

## Solução de Problemas
Se encontrar erros...
```

## 5. Benefícios

- **Organização**: Artigos organizados por categoria e dificuldade
- **Busca**: Tags facilitam a busca de conteúdo
- **Destaque**: Artigos importantes podem ser destacados
- **Métricas**: Controle de visualizações e tempo de leitura
- **Qualidade**: Controle de autor e data de atualização 