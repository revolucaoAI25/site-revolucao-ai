export type TipoAgente = "agendamento" | "venda-direta" | "ambos";

export type OnboardingData = {
  contato: {
    nomeResponsavel: string;
    email: string;
    telefone: string;
  };
  tipoAgente: TipoAgente | "";
  calcom: {
    email: string;
    senha: string;
  };
  negocio: {
    nomeEmpresa: string;
    historia: string;
    site: string;
    redesSociais: string;
    comoFunciona: string;
    endereco: string;
    estruturaFisica: string;
    horarios: string;
    valor: string;
    extras: string;
    depoimentos: string;
    linkArquivos: string;
  };
  leadsFunil: {
    origemLeads: string;
    estrategiaFunil: string;
    perfilLead: string;
    objetivosLead: string;
    icpObrigatorio: string;
  };
  fluxoAtendimento: {
    scriptPrincipal: string;
    comoLidarForaDoScript: string;
    quandoAcionarHumano: string;
    celularNotificar: string;
    mensagemHumano: string;
    comoFuncionaAgendamento: string;
    pagamentoAntecipado: string;
  };
  followUps: {
    enviarFollowUp: string;
    quantidadeFollowUp: string;
    primeiroFollowUpApos: string;
    cadenciaProximos: string;
    jaTemRoteiros: string;
    enviarLembretes: string;
  };
  personalidade: {
    nomeAssistente: string;
    comportamento: string;
    assuntosEvitar: string;
    mensagemAssuntoEvitado: string;
  };
  faq: string;
  consideracoesAdicionais: string;
};

export const emptyOnboardingData: OnboardingData = {
  contato: { nomeResponsavel: "", email: "", telefone: "" },
  tipoAgente: "",
  calcom: { email: "", senha: "" },
  negocio: {
    nomeEmpresa: "",
    historia: "",
    site: "",
    redesSociais: "",
    comoFunciona: "",
    endereco: "",
    estruturaFisica: "",
    horarios: "",
    valor: "",
    extras: "",
    depoimentos: "",
    linkArquivos: "",
  },
  leadsFunil: {
    origemLeads: "",
    estrategiaFunil: "",
    perfilLead: "",
    objetivosLead: "",
    icpObrigatorio: "",
  },
  fluxoAtendimento: {
    scriptPrincipal: "",
    comoLidarForaDoScript: "",
    quandoAcionarHumano: "",
    celularNotificar: "",
    mensagemHumano: "",
    comoFuncionaAgendamento: "",
    pagamentoAntecipado: "",
  },
  followUps: {
    enviarFollowUp: "",
    quantidadeFollowUp: "",
    primeiroFollowUpApos: "",
    cadenciaProximos: "",
    jaTemRoteiros: "",
    enviarLembretes: "",
  },
  personalidade: {
    nomeAssistente: "",
    comportamento: "",
    assuntosEvitar: "",
    mensagemAssuntoEvitado: "",
  },
  faq: "",
  consideracoesAdicionais: "",
};
