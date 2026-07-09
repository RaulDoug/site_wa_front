import { FaRegFileAlt, FaCity, FaFileUpload, FaCalculator, FaChartLine, FaSearchDollar, FaHandHoldingUsd, FaUmbrella } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { LuBriefcaseBusiness, LuCompass, LuFileBadge } from 'react-icons/lu';

export const servicesList = [
  {
    id: 1,
    icon: FaRegFileAlt,
    title: 'Escrituração Fiscal',
    description: 'Organização, processamento de documentos financeiros e apuração mensal de impostos.'
  },
  {
    id: 2,
    icon: FaUsers,
    title: 'Departamento Pessoal',
    description: 'Gestão de folha de pagamento, férias, rescisões e envio de obrigações ao eSocial.'
  },
  {
    id: 3,
    icon: FaCity,
    title: 'Legalização de Empresas',
    description: 'Abertura, alteração contratual, escolha de CNAE e encerramento de CNPJ.'
  },
  {
    id: 4,
    icon: FaFileUpload,
    title: 'Obrigações Acessórias',
    description: 'Elaboração e entrega de declarações fiscais (SPED, DEFIS) e relatórios de faturamento.'
  },
  {
    id: 5,
    icon: LuFileBadge,
    title: 'Regularização Fiscal',
    description: 'Monitoramento de pendências, emissão de certidões (CND) e parcelamento de débitos.'
  },
  {
    id: 6,
    icon: FaHandHoldingUsd,
    title: 'Distribuição de Lucros',
    description: 'Cálculo e emissão de relatórios de dividendos e pró-labore para os sócios.'
  }
];

export const consultanciesList = [
  {
    id: 1,
    icon: FaCalculator,
    title: 'Planejamento Tributário',
    description: 'Estudo para redução legal de impostos (Simples Nacional, Lucro Presumido ou Real).'
  },
  {
    id: 2,
    icon: FaChartLine,
    title: 'BPO Financeiro',
    description: 'Gestão terceirizada do fluxo de caixa, conciliação e indicadores de decisão.'
  },
  {
    id: 3,
    icon: LuBriefcaseBusiness,
    title: 'Evolução de MPEs',
    description: 'Suporte estratégico no crescimento e transição segura de MEI para Microempresa.'
  },
  {
    id: 4,
    icon: LuCompass,
    title: 'Viabilidade Econômica',
    description: 'Análise de retorno sobre investimento (ROI) para novos projetos e expansões.'
  },
  {
    id: 5,
    icon: FaSearchDollar,
    title: 'Controladoria e Custos',
    description: 'Auditoria interna de processos, precificação correta e otimização de margens.'
  },
  {
    id: 6,
    icon: FaUmbrella,
    title: 'Proteção Patrimonial',
    description: 'Estruturação de Holdings para blindagem de bens e planejamento sucessório.'
  }
];
