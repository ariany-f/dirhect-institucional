# Dirhect - Página Institucional

Uma página institucional moderna desenvolvida em React com Vite.js para a Dirhect, ferramenta de gestão de RH com foco em automação de elegibilidade, benefícios e ATS.

## 🚀 Funcionalidades

- **Design Moderno**: Interface inspirada no design do Nubank com cores da marca Dirhect
- **Responsivo**: Adaptado para desktop, tablet e mobile
- **Página Inicial**: Hero section, soluções e benefícios
- **Blog Integrado**: Conexão com WordPress via API REST
- **Performance**: Construído com Vite.js para desenvolvimento rápido

## 🎨 Design System

### Cores
- **Primária**: `#0c004c`
- **Secundária**: `#5d0b62`
- **Gradiente**: `linear-gradient(to left, #0c004c, #5d0b62)`
- **Branco**: `#FAFAFA`

### Componentes
- Header com navegação responsiva
- Hero section com cards 3D
- Cards de soluções com hover effects
- Footer com informações de contato
- Blog com integração WordPress

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd dirhect-website
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm run dev
```

## 🔌 Configuração do WordPress

Para conectar com seu WordPress, edite o arquivo `src/pages/Blog.jsx`:

```javascript
// Linha 15 - Substitua pela URL da sua API do WordPress
const response = await fetch('https://seu-wordpress.com/wp-json/wp/v2/posts?per_page=6')
```

### Requisitos do WordPress
- WordPress com API REST habilitada
- CORS configurado se o domínio for diferente
- Posts públicos para exibição

### Exemplo de configuração CORS (functions.php):
```php
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── Header.jsx          # Navegação principal
│   ├── Hero.jsx           # Seção principal
│   ├── Solutions.jsx      # Soluções e benefícios
│   └── Footer.jsx         # Rodapé
├── pages/
│   ├── Home.jsx           # Página inicial
│   └── Blog.jsx           # Página de blog
└── App.jsx                # Roteamento principal
```

## 🎯 Soluções Destacadas

### Automação de Elegibilidade
- Verificação automática de critérios
- Redução de 90% em erros manuais
- Integração com sistemas existentes

### ATS Completo
- Gestão completa de vagas
- Triagem inteligente de candidatos
- Relatórios avançados de performance

### Admissão Digital
- Assinatura eletrônica
- Onboarding automatizado
- Redução de 70% no tempo de admissão

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: até 767px

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework principal
- **Vite.js**: Build tool e dev server
- **React Router DOM**: Roteamento
- **Lucide React**: Ícones modernos
- **CSS3**: Animações e layouts avançados

## 📈 Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Otimização de Imagens**: Formatos modernos
- **Code Splitting**: Bundle otimizado
- **SEO Friendly**: Meta tags e estrutura semântica

## 🚀 Deploy

### Build de Produção
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- Email: contato@dirhect.com
- Website: [https://dirhect.com](https://dirhect.com)

---

Desenvolvido com ❤️ para revolucionar a gestão de RH
