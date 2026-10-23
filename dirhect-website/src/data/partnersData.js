/**
 * partnersData.js
 * Base de dados estruturada de empresas parceiras comerciais da Dirhect.
 * 
 * Campos obrigatórios para cada parceiro:
 * - id: Identificador único
 * - name: Nome completo da empresa
 * - slug: Identificador amigável da URL (/parceria/:slug)
 * - logo: Caminho para a imagem do logotipo
 * - city: Cidade
 * - state: Estado (UF)
 * - country: País
 * - website: URL oficial do site da empresa
 * - shortDescription: Resumo curto exibido no card do diretório e cabeçalho do perfil
 * - fullDescription: Descrição completa detalhada na seção "Sobre a Empresa"
 * - primaryAreas: Coleção de áreas de atuação principais (etiquetas laranja)
 * - secondaryAreas: Coleção de áreas secundárias (etiquetas grafite/azul-acinzentado)
 * - isActive: Booleano indicando se o parceiro está ativo e visível no diretório
 * - createdAt: Data de cadastro (YYYY-MM-DD)
 */

export const PARTNERS_DATA = [
  {
    id: 'partner_ativary_001',
    name: 'Ativary Consultoria',
    brandName: 'Ativary',
    slug: 'ativary',
    logo: '/images/logos/ativary-logo.png',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    website: 'https://ativary.com',
    shortDescription: 'Canal Homologado TOTVS especializado em soluções integradas, consultoria em ERP TOTVS RM, inteligência de dados e automação de processos de RH.',
    fullDescription: `A Ativary Consultoria é especializada em soluções integradas com foco no ERP TOTVS RM, inteligência de negócios, integração de dados, automação de processos (RPA), serviços em nuvem e cibersegurança.

Com mais de 28 anos de sólida trajetória de mercado, a Ativary atua como Canal Homologado TOTVS e parceira de referência na implementação, sustentação e otimização de módulos corporativos de ponta, tais como RM Labore (Folha de Pagamento), RM Chronus (Ponto Eletrônico), RM Vitae (Gestão de Pessoas) e Backoffice integrado.

Em parceria com a Dirhect, a Ativary potencializa a transformação dos departamentos de Recursos Humanos de seus clientes, conectando de forma nativa o TOTVS RM com soluções modernas de Admissão Digital, Gestão de Benefícios flexíveis, Workflows inteligentes de aprovação e autosserviço para colaboradores. Essa sinergia elimina gargalos operacionais e retrabalhos manuais, assegurando total conformidade legal, redução de custos e alta agilidade nos processos de RH.`,
    primaryAreas: [
      'TOTVS RM',
      'Consultoria e Implantação',
      'Automação de RH',
      'Integrações ERP',
      'Gestão de Pessoas'
    ],
    secondaryAreas: [
      'Folha de Pagamento',
      'RPA e Workflows',
      'BI e Analytics',
      'Sustentação de Sistemas'
    ],
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: 'partner_solange_002',
    name: 'Sol Tecnologia para RH',
    brandName: 'Sol Tecnologia',
    slug: 'solange',
    aliases: ['sol-tecnologia', 'soltecnologia'],
    logo: '/images/logos/solange-logo.jpg',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    website: 'https://dirhect.com.br/parceria/solange',
    shortDescription: 'Consultoria especializada em soluções integradas, otimização de processos de Recursos Humanos, implantação e sustentação no ecossistema TOTVS RM e parceira homologada Dirhect.',
    fullDescription: `Sol Tecnologia para RH é especialista em soluções integradas com foco profundo no ERP TOTVS RM e integrações, inteligência de processos, conformidade trabalhista e automação de rotinas de Recursos Humanos.

Com 26 anos de sólida trajetória no mercado corporativo, atua de forma estratégica na implementação, sustentação e otimização de arquiteturas de RH, combinando especialização técnica em Departamento Pessoal a uma visão integrada da Gestão de Pessoas.

Transforma a gestão de Recursos Humanos combinando a inteligência do TOTVS RM com a agilidade do Dirhect:
• Eficiência Operacional: Eliminação de processos manuais, gargalos e retrabalhos.
• Performance: Redução expressiva de custos e máxima rapidez nos fechamentos de folha, nas admissões e rotinas do RH.`,
    primaryAreas: [
      'TOTVS RM (Labore, Chronus, Vitae)',
      'Consultoria e Implantação',
      'Otimização de Processos de RH',
      'Admissão Digital & Benefícios',
      'Orquestrador de Tarefas'
    ],
    secondaryAreas: [
      'Folha de Pagamento & Ponto',
      'Conformidade Trabalhista & eSocial',
      'SST e Segurança Ocupacional',
      'App Meu RH',
      'Treinamentos Especializados'
    ],
    isActive: true,
    createdAt: '2026-10-22'
  },
  /*
   * =======================================================================
   * MODELO PARA ADICIONAR NOVAS EMPRESAS PARCEIRAS NO FUTURO:
   * =======================================================================
   * Basta duplicar a estrutura abaixo e preencher com os dados da empresa.
   * O grid no diretório suporta automaticamente 4 empresas por linha.
   * 
   * {
   *   id: 'partner_nome_002',
   *   name: 'Nome da Empresa Parceira',
   *   slug: 'slug-da-empresa',
   *   logo: '/images/logos/nome-logo.png',
   *   city: 'Cidade',
   *   state: 'UF',
   *   country: 'Brasil',
   *   website: 'https://empresa.com.br',
   *   shortDescription: 'Descrição resumida exibida no card...',
   *   fullDescription: `Descrição completa institucional...`,
   *   primaryAreas: ['Área Principal 1', 'Área Principal 2'],
   *   secondaryAreas: ['Área Secundária 1', 'Área Secundária 2'],
   *   isActive: true,
   *   createdAt: '2026-01-01'
   * }
   */
]

/**
 * Retorna todos os parceiros cadastrados.
 */
export function getAllPartners() {
  return [...PARTNERS_DATA]
}

/**
 * Retorna apenas parceiros ativos ordenados por ordem alfabética.
 */
export function getActivePartners() {
  return PARTNERS_DATA
    .filter((partner) => partner.isActive)
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' }))
}

/**
 * Busca um parceiro pelo slug da URL (ex: 'ativary').
 * Case-insensitive.
 */
export function getPartnerBySlug(slug) {
  if (!slug) return null
  const cleanSlug = String(slug).trim().toLowerCase()
  return PARTNERS_DATA.find(
    (p) => (p.slug.toLowerCase() === cleanSlug || (p.aliases && p.aliases.includes(cleanSlug))) && p.isActive
  ) || null
}

/**
 * Busca um parceiro pelo ID único interno.
 */
export function getPartnerById(id) {
  if (!id) return null
  return PARTNERS_DATA.find((p) => p.id === id) || null
}

/**
 * Filtra parceiros por termo de busca (nome, localização, descrição, áreas)
 * e opcionalmente por área de atuação.
 */
export function searchPartners(query = '', areaFilter = '') {
  const active = getActivePartners()
  const q = String(query).trim().toLowerCase()
  const area = String(areaFilter).trim().toLowerCase()

  return active.filter((partner) => {
    // Filtro por área de atuação
    if (area && area !== 'todas' && area !== 'todos') {
      const allAreas = [...(partner.primaryAreas || []), ...(partner.secondaryAreas || [])]
      const matchesArea = allAreas.some((a) => a.toLowerCase().includes(area))
      if (!matchesArea) return false
    }

    // Busca textual por nome, localização, áreas ou descrição
    if (!q) return true

    const textToMatch = [
      partner.name,
      partner.city,
      partner.state,
      partner.country,
      partner.shortDescription,
      ...(partner.primaryAreas || []),
      ...(partner.secondaryAreas || [])
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return textToMatch.includes(q)
  })
}
