import type { BlogPost } from "../types";

export const clusterEPosts: BlogPost[] = [
  {
    slug: "quanto-custa-agente-de-ia-para-whatsapp",
    cluster: "comercial",
    title: "Quanto custa um agente de IA para WhatsApp",
    metaDescription:
      "Não existe um preço fixo de mercado — o valor muda com volume, integrações e nível de personalização. Veja o que realmente movimenta essa conta.",
    keyword: "quanto custa agente de ia",
    date: "2026-08-19",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "o-que-esta-incluido-no-preco-de-um-agente-de-ia",
      "servicos-agente-de-ia-integracao-whatsapp",
      "como-comparar-propostas-de-fornecedores-de-agente-de-ia",
    ],
    intro:
      "Quem pesquisa esse preço geralmente encontra respostas bem diferentes entre si — e a diferença não é aleatória, é reflexo de quatro fatores que mudam o custo de verdade: volume de conversa, complexidade das integrações, nível de personalização e o formato de contratação escolhido. Entender esses fatores importa mais do que perguntar por um número fechado, porque o número certo pra um negócio pode ser errado pra outro do mesmo tamanho.",
    body: [
      { type: "h2", text: "Os quatro fatores que realmente definem o preço" },
      {
        type: "ul",
        items: [
          [
            { text: "Volume de conversa: ", bold: true },
            "quanto mais mensagens o agente precisa processar por mês, maior tende a ser o investimento — tanto pelo custo de infraestrutura quanto pelo nível de robustez exigido da configuração.",
          ],
          [
            { text: "Complexidade de integração: ", bold: true },
            "um agente que só responde dúvida custa diferente de um que também consulta agenda, CRM e sistema de pagamento em tempo real.",
          ],
          [
            { text: "Nível de personalização: ", bold: true },
            "um script genérico adaptado é mais barato do que uma configuração levantada do zero com o funil comercial real da empresa, tom de voz específico e base de conhecimento sob medida.",
          ],
          [
            { text: "Formato de contratação: ", bold: true },
            "plataforma self-service, projeto fechado ou assinatura com acompanhamento contínuo — cada modelo distribui o custo de um jeito diferente ao longo do tempo.",
          ],
        ],
      },
      {
        type: "callout",
        text: "Duas empresas do mesmo tamanho podem pagar valores bem diferentes por um agente de IA — uma vende um produto simples com poucas objeções, a outra precisa de qualificação complexa integrada a três sistemas. O tamanho da empresa importa menos do que a complexidade real da conversa.",
      },
      { type: "h2", text: "Por que \"self-service\" costuma ser mais barato — e por que nem sempre compensa" },
      {
        type: "p",
        content: [
          "Ferramentas onde a própria empresa monta o agente têm mensalidade mais baixa, porque o trabalho de configuração fica por conta de quem contrata. Isso funciona bem pra quem tem tempo e perfil pra aprender a ferramenta e manter o agente ajustado. Quando ",
          { text: "ninguém internamente tem esse tempo sobrando", bold: true },
          ", o preço mais baixo do plano vira custo escondido: o agente fica configurado pela metade e nunca chega a performar como poderia.",
        ],
      },
      { type: "h2", text: "Por que uma implementação sob medida custa mais — e o que esse valor cobre" },
      {
        type: "p",
        content:
          "O ticket mais alto de uma implementação sob medida cobre o trabalho especializado de levantamento, configuração, integração com os sistemas que a empresa já usa, e o acompanhamento contínuo depois do lançamento — não é só \"a mesma coisa, só que mais caro\". Esse acompanhamento é o que faz o agente continuar performando bem mesmo depois que o negócio muda preço, processo ou produto.",
      },
      { type: "h3", text: "Um jeito prático de pensar nisso" },
      {
        type: "p",
        content:
          "Em vez de comparar só o valor mensal entre propostas, vale comparar o valor dividido pelo que está incluso: quantas horas de configuração inicial, se o acompanhamento pós-lançamento está incluso ou é cobrado à parte, e se integrações fazem parte do escopo ou são um adicional. Duas propostas com preços parecidos podem estar cobrindo escopos bem diferentes.",
      },
      {
        type: "p",
        content: [
          "Vale também considerar o custo de mensageria cobrado pela própria Meta quando a conexão é pela API oficial — ele é separado do valor pago ao fornecedor, e alguns fornecedores deixam isso de fora da proposta inicial. Detalhamos isso com mais profundidade em ",
          { text: "quais serviços oferecem agente de IA com integração para WhatsApp", href: "/blog/servicos-agente-de-ia-integracao-whatsapp" },
          ".",
        ],
      },
      {
        type: "cta",
        lead: "Quer entender quanto isso custaria pro seu volume e tipo de negócio específico?",
        label: "Conversar com o Revolução AI",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "Existe um preço fixo de mercado pra um agente de IA?",
        answer:
          "Não. O valor muda com volume de conversa, complexidade de integração, nível de personalização e formato de contratação — duas empresas do mesmo tamanho podem pagar valores bem diferentes.",
      },
      {
        question: "Self-service é sempre mais barato no fim das contas?",
        answer:
          "É mais barato na mensalidade, mas só compensa de verdade quando alguém internamente tem tempo pra configurar e manter o agente ajustado. Sem isso, o valor menor vira custo escondido.",
      },
      {
        question: "O que justifica o preço mais alto de uma implementação sob medida?",
        answer:
          "O trabalho especializado de levantamento, configuração, integração com sistemas e acompanhamento contínuo pós-lançamento — não só a configuração inicial do agente.",
      },
      {
        question: "O custo de mensageria da Meta entra no preço cobrado pelo fornecedor?",
        answer:
          "Nem sempre — em conexões pela API oficial, esse custo é cobrado separadamente pela própria Meta, e vale confirmar se ele já está considerado na proposta.",
      },
    ],
  },

  {
    slug: "custo-atendente-humano-vs-agente-de-ia",
    cluster: "comercial",
    title: "Quanto custa um atendente vs um agente de IA: a conta real",
    metaDescription:
      "Um funcionário CLT custa entre 1,6x e 1,8x o salário bruto. Veja a conta real de custo — e o que continua exigindo uma pessoa, mesmo com o agente no ar.",
    keyword: "custo atendente humano vs agente de ia",
    date: "2026-08-20",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "agente-de-ia-substitui-atendente-humano",
      "agente-de-ia-reduz-custo-atendimento",
      "quanto-custa-agente-de-ia-para-whatsapp",
    ],
    intro:
      "Um funcionário CLT custa pra empresa entre 1,6 e 1,8 vez o salário bruto, segundo levantamentos que somam FGTS, 13º, férias, INSS patronal e demais encargos — um atendente com salário de R$ 1.800, por exemplo, custa algo entre R$ 2.900 e R$ 3.240 por mês pra empresa, antes mesmo de contar treinamento e turnover. É essa conta, e não só o salário anunciado na vaga, que precisa entrar na comparação com o investimento num agente de IA.",
    body: [
      { type: "h2", text: "De onde vem o custo real de um atendente CLT" },
      {
        type: "ul",
        items: [
          [
            { text: "FGTS: ", bold: true },
            "8% sobre o salário bruto, depositado todo mês.",
          ],
          [
            { text: "Provisão de férias + 1/3: ", bold: true },
            "cerca de 11,11% do salário, guardado ao longo do ano.",
          ],
          [
            { text: "Provisão de 13º salário: ", bold: true },
            "8,33% do salário, mesma lógica.",
          ],
          [
            { text: "INSS patronal e outras entidades: ", bold: true },
            "em torno de 28,8% sobre a folha, pra empresas do Lucro Real ou Presumido.",
          ],
        ],
      },
      {
        type: "callout",
        text: "Somando tudo, o custo total de um funcionário CLT costuma ficar entre 1,6x e 1,8x o salário bruto — a média salarial de um atendente SAC no Brasil gira em torno de R$ 1.509, o que já representa um custo real próximo de R$ 2.500 por mês pra empresa, só de um atendente.",
      },
      { type: "h2", text: "O que essa conta ainda não inclui" },
      {
        type: "p",
        content: [
          "O valor acima é só o custo direto de folha. Ainda entram: tempo de treinamento de gente nova, ",
          { text: "cobertura de férias e afastamento", bold: true },
          " (que exige plantão extra ou hora extra de outro colega), turnover — atendente de call center costuma ter rotatividade alta —, e a inconsistência natural de qualidade entre quem está de plantão num dia e no outro.",
        ],
      },
      { type: "h2", text: "Como fica a comparação com um agente de IA" },
      {
        type: "p",
        content:
          "Um agente de IA bem implementado não tem 13º, férias, nem rotatividade — ele atende no mesmo padrão de qualidade todos os dias do mês, inclusive fins de semana e madrugada, sem custo adicional por isso. O investimento mensal costuma ficar bem abaixo do custo real de um único atendente CLT — em muitos casos, menos da metade —, cobrindo ainda por cima um volume que, dependendo da operação, exigiria dois, três ou mais atendentes humanos pra dar conta.",
      },
      {
        type: "h3", text: "O que essa comparação não deveria virar" },
      {
        type: "p",
        content: [
          "Isso não significa demitir o time inteiro. Como já detalhamos em ",
          { text: "agente de IA substitui atendente humano", href: "/blog/agente-de-ia-substitui-atendente-humano" },
          ", o padrão mais comum é o time humano passar a cuidar do que realmente exige julgamento — negociação, exceção, retenção de cliente importante — enquanto o agente absorve o volume repetitivo. A conta de custo não é \"zero humano\", é \"menos horas humanas gastas em repetição\".",
        ],
      },
      {
        type: "p",
        content:
          "Vale notar também que essa conta de custo, sozinha, já ignora o lado que costuma pesar mais no resultado final: quanto uma resposta mais rápida e mais consistente converte a mais, não só quanto ela economiza. Olhar só a economia de folha é ver metade da equação.",
      },
      {
        type: "cta",
        lead: "Quer fazer essa conta com o número real da sua operação, dos dois lados?",
        label: "Fazer essa conta com o Revolução AI",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "Quanto custa realmente um funcionário CLT pra empresa, além do salário?",
        answer:
          "Entre 1,6 e 1,8 vez o salário bruto, somando FGTS, 13º, férias e INSS patronal — um atendente de R$ 1.800 de salário custa algo entre R$ 2.900 e R$ 3.240 por mês pra empresa.",
      },
      {
        question: "O custo de um atendente humano inclui só a folha de pagamento?",
        answer:
          "Não. Também entram treinamento de gente nova, cobertura de férias e afastamento, turnover e a variação de qualidade entre quem está de plantão em dias diferentes.",
      },
      {
        question: "Um agente de IA substitui totalmente o time de atendimento?",
        answer:
          "Depende da operação. O padrão mais comum é o time humano passar a cuidar do que exige julgamento, enquanto o agente absorve o volume repetitivo — não é uma substituição total.",
      },
      {
        question: "Vale a pena decidir só olhando a economia de custo?",
        answer:
          "Não é o ideal. A economia de folha é só metade da conta — o ganho de conversão de um atendimento mais rápido e consistente costuma pesar tanto ou mais no resultado final.",
      },
    ],
  },

  {
    slug: "agencia-de-ia-ou-plataforma-self-service-comparacao",
    cluster: "comercial",
    title: "Agência de IA ou plataforma self-service: qual escolher",
    metaDescription:
      "Fazer sozinho numa plataforma ou contratar uma implementação completa: veja o comparativo real de tempo, custo e resultado antes de decidir.",
    keyword: "agencia de ia ou plataforma self-service",
    date: "2026-08-20",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "servicos-agente-de-ia-integracao-whatsapp",
      "erros-comuns-automatizar-atendimento-com-ia",
      "quanto-custa-agente-de-ia-para-whatsapp",
    ],
    intro:
      "Essa decisão não tem uma resposta certa universal — depende de quanto tempo a empresa tem pra dedicar a isso, e de quanto o negócio depende de um agente que realmente performe bem desde o início. As duas opções são legítimas; a diferença é o que cada uma pede de quem contrata.",
    body: [
      { type: "h2", text: "O que muda entre os dois caminhos" },
      {
        type: "ul",
        items: [
          [
            { text: "Quem configura: ", bold: true },
            "numa plataforma self-service, a própria empresa monta o agente; numa agência, um especialista faz o levantamento e a configuração.",
          ],
          [
            { text: "Tempo até estar no ar: ", bold: true },
            "self-service costuma ser mais rápido de sair do papel; uma implementação sob medida leva mais tempo porque inclui levantamento e ajuste fino.",
          ],
          [
            { text: "Quem mantém depois: ", bold: true },
            "no self-service, a própria empresa; numa implementação completa, o fornecedor cuida do ajuste contínuo.",
          ],
          [
            { text: "Curva de aprendizado: ", bold: true },
            "self-service exige aprender a ferramenta; numa implementação completa, a empresa só participa validando informação.",
          ],
        ],
      },
      {
        type: "callout",
        text: "A pergunta que realmente decide entre os dois não é \"qual é mais barato\" — é \"quem, dentro da empresa, vai efetivamente sentar e configurar isso direito, e vai continuar ajustando depois?\".",
      },
      { type: "h2", text: "Quando a plataforma self-service faz sentido" },
      {
        type: "p",
        content: [
          "Faz sentido pra quem já tem alguém internamente disposto a aprender a ferramenta, testar cenários e revisar conversas com frequência — e pra quem quer manter controle direto sobre a configuração. A ",
          { text: "Chatflux", href: "/plataforma" },
          ", por exemplo, é a plataforma por trás dos resultados do Revolução AI disponível também em formato self-service, com planos a partir de algumas centenas de reais por mês e treinamento guiado — pensada exatamente pra esse perfil de empresa.",
        ],
      },
      { type: "h2", text: "Quando a implementação completa faz mais sentido" },
      {
        type: "p",
        content: [
          "Faz mais sentido quando ninguém internamente tem tempo sobrando pra dedicar à configuração — ou quando o volume e a complexidade da operação exigem um nível de acerto que ",
          { text: "leva tempo de aprendizado pra atingir sozinho", bold: true },
          ". Um erro comum, detalhado em ",
          { text: "erros mais comuns ao automatizar atendimento com IA", href: "/blog/erros-comuns-automatizar-atendimento-com-ia" },
          ", é subestimar quanto tempo configurar e manter um agente bem realmente consome — o self-service não é errado, mas o tempo que ele exige costuma ser maior do que a empresa imagina no início.",
        ],
      },
      { type: "h3", text: "Um jeito de decidir na prática" },
      {
        type: "p",
        content:
          "Vale perguntar: se essa mesma pessoa fosse contratar e treinar um atendente humano novo, ela teria tempo e disposição pra isso? A resposta costuma indicar se faz mais sentido aprender a ferramenta sozinha ou contratar quem já faz esse levantamento e ajuste como ofício.",
      },
      {
        type: "cta",
        lead: "Quer decidir qual caminho faz mais sentido pro seu momento?",
        label: "Falar com o Revolução AI",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "Self-service é sempre mais barato que uma implementação completa?",
        answer:
          "Na mensalidade, sim — mas o tempo interno gasto configurando e mantendo o agente é um custo que não aparece na fatura, e pode compensar o valor menor de plano.",
      },
      {
        question: "Dá pra começar self-service e migrar pra implementação completa depois?",
        answer:
          "Sim, é comum — muitas empresas começam testando por conta própria e migram quando o volume ou a complexidade passam do que dá pra manter internamente.",
      },
      {
        question: "Qual exige menos tempo da empresa?",
        answer:
          "A implementação completa — o fornecedor cuida do levantamento, configuração e ajuste; a empresa participa só validando informação.",
      },
      {
        question: "Como saber se minha empresa tem perfil pra self-service?",
        answer:
          "Pergunte se há alguém internamente com tempo e disposição pra aprender a ferramenta e revisar conversas com frequência — sem isso, o agente tende a ficar configurado pela metade.",
      },
    ],
  },

  {
    slug: "quanto-tempo-leva-para-ter-retorno-com-agente-de-ia",
    cluster: "comercial",
    title: "Quanto tempo leva pra ter retorno com um agente de IA (payback)",
    metaDescription:
      "Não existe um prazo universal, mas dá pra estimar. Veja os fatores que aceleram (ou atrasam) o retorno de um agente de IA, com exemplo de conta.",
    keyword: "retorno agente de ia payback",
    date: "2026-08-21",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "agente-de-ia-whatsapp-vale-a-pena-pequenas-empresas",
      "quanto-agente-de-ia-vendas-aumenta-conversao",
      "custo-atendente-humano-vs-agente-de-ia",
    ],
    intro:
      "Quem pergunta \"em quanto tempo isso se paga\" geralmente quer um número único — mas o prazo real depende de quanto volume repetitivo a operação já tem hoje, e de quão rápido o agente é ajustado depois do lançamento. O que dá pra fazer é entender os fatores que aceleram ou atrasam esse retorno, e estimar com os próprios números, não com uma média de mercado que não foi medida na sua operação.",
    body: [
      { type: "h2", text: "Os dois lados que compõem o retorno" },
      {
        type: "p",
        content: [
          "O payback de um agente de IA soma dois efeitos que acontecem em ritmos diferentes: a ",
          { text: "economia de custo", bold: true },
          " (hora humana que deixa de ser gasta em pergunta repetida) costuma aparecer já no primeiro mês, assim que o agente entra no ar. O ",
          { text: "ganho de conversão", bold: true },
          " (mais gente fechando por causa da resposta rápida e consistente) costuma levar mais algumas semanas pra se consolidar, porque depende do agente estar ajustado e do ciclo de venda da operação.",
        ],
      },
      { type: "h2", text: "O que acelera o retorno" },
      {
        type: "ul",
        items: [
          "Alto volume de mensagens repetidas — quanto mais repetição, mais rápido a economia de tempo aparece",
          "Ciclo de venda curto — operações que fecham rápido sentem o ganho de conversão logo nas primeiras semanas",
          "Base de conhecimento bem levantada desde o início, com menos ajuste necessário depois do lançamento",
          "Acompanhamento ativo nas primeiras semanas, corrigindo rápido o que não estava previsto",
        ],
      },
      { type: "h2", text: "O que atrasa o retorno" },
      {
        type: "ul",
        items: [
          "Volume baixo de mensagens, onde o ganho de tempo é pequeno em termos absolutos",
          "Ciclo de venda longo (como consultoria ou produto de ticket alto), onde o efeito em conversão demora mais pra aparecer",
          "Levantamento inicial raso, que gera mais ajuste (e mais tempo até o agente performar bem) depois do lançamento",
          "Falta de acompanhamento pós-lançamento, deixando problemas sem correção por semanas",
        ],
      },
      {
        type: "callout",
        text: "Uma operação com alto volume de repetição e ciclo de venda curto costuma ver o investimento se pagar já nos primeiros um ou dois meses; uma operação de ticket alto e ciclo longo pode levar um pouco mais — mas o ganho, quando vem, costuma ser proporcionalmente maior por venda.",
      },
      { type: "h3", text: "Um exemplo de como fazer essa conta" },
      {
        type: "p",
        content:
          "Uma forma simples de estimar: some quanto tempo humano é liberado por mês (em horas, multiplicado pelo custo dessa hora) com uma estimativa conservadora de quantas vendas a mais viriam de uma resposta mais rápida. Se a soma dos dois já cobre o investimento mensal do agente nos primeiros meses, o payback está dentro do esperado — o resto vira ganho puro.",
      },
      {
        type: "p",
        content: [
          "Detalhamos esse tipo de conta com mais profundidade em ",
          { text: "agente de IA no WhatsApp vale a pena pra pequenas empresas", href: "/blog/agente-de-ia-whatsapp-vale-a-pena-pequenas-empresas" },
          " — a lógica de cálculo é a mesma, independente do porte da operação.",
        ],
      },
      {
        type: "cta",
        lead: "Quer estimar esse prazo com os números reais do seu negócio?",
        label: "Conhecer os agentes de IA do Revolução AI",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "Existe um prazo médio de payback pra um agente de IA?",
        answer:
          "Não existe um prazo universal — depende do volume de repetição, do ciclo de venda e de quão bem o agente foi levantado desde o início.",
      },
      {
        question: "O retorno vem mais da economia de custo ou do ganho de conversão?",
        answer:
          "Os dois compõem o retorno, em ritmos diferentes — a economia de custo aparece já no primeiro mês; o ganho de conversão costuma levar mais algumas semanas pra se consolidar.",
      },
      {
        question: "O que mais atrasa o retorno de um agente de IA?",
        answer:
          "Levantamento inicial raso (que gera mais ajuste depois) e falta de acompanhamento pós-lançamento são os dois fatores que mais atrasam o payback.",
      },
      {
        question: "Operação de ticket alto demora mais pra ter retorno?",
        answer:
          "Tende a demorar um pouco mais, porque o ciclo de venda é mais longo — mas o ganho por venda, quando vem, costuma ser proporcionalmente maior.",
      },
    ],
  },

  {
    slug: "agente-de-ia-por-assinatura-ou-projeto-fechado",
    cluster: "comercial",
    title: "Agente de IA por assinatura ou projeto fechado: qual modelo faz mais sentido",
    metaDescription:
      "Pagar uma vez pelo projeto ou manter uma mensalidade com acompanhamento contínuo? Veja o que cada modelo de contrato inclui, e quando cada um compensa.",
    keyword: "agente de ia assinatura ou projeto",
    date: "2026-08-21",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "o-que-esta-incluido-no-preco-de-um-agente-de-ia",
      "erros-comuns-automatizar-atendimento-com-ia",
      "quanto-custa-agente-de-ia-para-whatsapp",
    ],
    intro:
      "Existem basicamente dois modelos de contrato no mercado: um projeto fechado, com valor único pela configuração inicial, e uma assinatura mensal, que inclui acompanhamento contínuo. A diferença entre os dois não é só de preço — é sobre o que acontece depois que o agente entra no ar.",
    body: [
      { type: "h2", text: "Projeto fechado: o que costuma incluir e o que não inclui" },
      {
        type: "p",
        content: [
          "Um projeto fechado cobra um valor único pelo levantamento, configuração e lançamento do agente. É previsível no orçamento, mas o ",
          { text: "acompanhamento pós-lançamento costuma ficar de fora", bold: true },
          " — se o negócio muda preço, lança produto novo ou percebe que uma pergunta comum não estava prevista, o ajuste tende a ser cobrado à parte, ou simplesmente não acontece.",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { text: "O que costuma vir incluso: ", bold: true },
            "levantamento inicial, configuração da base de conhecimento, testes internos e o lançamento em si.",
          ],
          [
            { text: "O que costuma ficar de fora: ", bold: true },
            "qualquer ajuste depois de um período curto inicial, atualização de preço ou catálogo, e acompanhamento de resultado ao longo do tempo.",
          ],
        ],
      },
      { type: "h2", text: "Assinatura: o que costuma incluir" },
      {
        type: "ul",
        items: [
          [
            { text: "Ajuste contínuo: ", bold: true },
            "revisão periódica das conversas reais, corrigindo o que não performa bem.",
          ],
          [
            { text: "Atualização da base de conhecimento: ", bold: true },
            "preço novo, produto descontinuado, política alterada — tudo entra sem custo adicional.",
          ],
          [
            { text: "Acompanhamento de resultado: ", bold: true },
            "relatório ou painel mostrando como o agente está performando, não só se está no ar.",
          ],
        ],
      },
      {
        type: "callout",
        text: "Um agente configurado uma vez e nunca mais revisado é um dos erros mais comuns do setor — e é justamente esse risco que o modelo de assinatura resolve, colocando o ajuste contínuo dentro do próprio contrato, não como algo que a empresa precisa lembrar de contratar depois.",
      },
      { type: "h2", text: "Quando cada modelo faz mais sentido" },
      {
        type: "p",
        content:
          "Projeto fechado costuma fazer sentido pra operações muito simples, com pouca variação de produto ou preço ao longo do tempo — onde o ajuste contínuo tem menos trabalho pra fazer. Assinatura faz mais sentido pra qualquer negócio que muda com frequência (preço, catálogo, campanha) ou que depende do agente performar cada vez melhor com o tempo, não só continuar no ar.",
      },
      { type: "h3", text: "Um exemplo de onde o projeto fechado costuma travar" },
      {
        type: "p",
        content:
          "Uma loja lança uma coleção nova três meses depois de contratar um projeto fechado. O agente continua respondendo com base no catálogo antigo, porque ninguém incluiu atualização de base de conhecimento no contrato — e o ajuste vira uma cobrança avulsa, ou fica esquecido até alguém perceber que o agente está dando informação desatualizada pro cliente.",
      },
      {
        type: "p",
        content: [
          "É por isso que uma implementação do Revolução AI trabalha principalmente no modelo de assinatura: o ajuste contínuo já faz parte do que é vendido, não um extra que a empresa precisa lembrar de contratar depois. Vale entender exatamente o que está incluso em cada proposta antes de comparar valores — detalhamos isso item a item em ",
          { text: "o que costuma estar incluído no preço de um agente de IA", href: "/blog/o-que-esta-incluido-no-preco-de-um-agente-de-ia" },
          ".",
        ],
      },
      {
        type: "cta",
        lead: "Quer entender qual modelo faz mais sentido pro seu tipo de operação?",
        label: "Conversar com o Revolução AI",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "Um projeto fechado inclui ajuste depois do lançamento?",
        answer:
          "Geralmente não, ou só por um período curto — o ajuste contínuo costuma ser cobrado à parte, ou simplesmente não estar incluso no valor único do projeto.",
      },
      {
        question: "O que uma assinatura mensal costuma incluir além da configuração inicial?",
        answer:
          "Ajuste contínuo com base em conversas reais, atualização da base de conhecimento e acompanhamento de resultado — não só manter o agente tecnicamente no ar.",
      },
      {
        question: "Qual modelo é melhor pra um negócio que muda preço e catálogo com frequência?",
        answer:
          "Assinatura, porque o custo de manter a base de conhecimento atualizada já está incluso, em vez de virar um pedido avulso toda vez que algo muda.",
      },
      {
        question: "Projeto fechado é sempre mais barato no total?",
        answer:
          "Não necessariamente — se o negócio muda com frequência e precisa de ajuste recorrente cobrado à parte, o custo total pode acabar ficando parecido ou até maior do que uma assinatura.",
      },
    ],
  },

  {
    slug: "o-que-esta-incluido-no-preco-de-um-agente-de-ia",
    cluster: "comercial",
    title: "O que costuma estar incluído no preço de um agente de IA (e o que fica de fora)",
    metaDescription:
      "Levantamento, configuração, integração, ajuste: veja item por item o que costuma entrar no preço de uma implementação, e o que costuma ficar de fora.",
    keyword: "o que está incluído no preço agente de ia",
    date: "2026-08-24",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "quanto-custa-agente-de-ia-para-whatsapp",
      "agente-de-ia-por-assinatura-ou-projeto-fechado",
      "como-comparar-propostas-de-fornecedores-de-agente-de-ia",
    ],
    intro:
      "Duas propostas com o mesmo valor mensal podem estar cobrindo escopos completamente diferentes — e é só olhando item por item que essa diferença aparece. Aqui vai o que costuma entrar no preço de uma implementação séria, e o que costuma ficar de fora, mesmo em contratos bem redigidos.",
    body: [
      { type: "h2", text: "O que costuma estar incluído" },
      {
        type: "ul",
        items: [
          [
            { text: "Levantamento inicial: ", bold: true },
            "conversa com o time que já atende, mapeando dúvidas frequentes, objeções e o funil real do negócio.",
          ],
          [
            { text: "Configuração e testes internos: ", bold: true },
            "montagem da base de conhecimento e simulação de cenários antes de qualquer cliente real ver o agente.",
          ],
          [
            { text: "Integração com o número existente: ", bold: true },
            "conexão com o WhatsApp que a empresa já divulga, sem trocar o contato que os clientes conhecem.",
          ],
          [
            { text: "Ajuste com conversas reais: ", bold: true },
            "revisão nas primeiras semanas, corrigindo o que ninguém previu no levantamento inicial.",
          ],
        ],
      },
      { type: "h2", text: "O que costuma ficar de fora, mesmo em bons contratos" },
      {
        type: "ul",
        items: [
          "Custo de mensageria cobrado pela própria Meta quando a conexão é pela API oficial — é separado do valor pago ao fornecedor",
          "Produção de conteúdo novo, como fotos de catálogo ou textos de campanha, quando o agente também participa de divulgação",
          "Integrações mais profundas com sistemas específicos da empresa (ERP, CRM proprietário), que costumam ser orçadas à parte",
          "Treinamento do time humano pra usar o painel de acompanhamento das conversas, quando ele existe",
        ],
      },
      {
        type: "callout",
        text: "Vale alinhar esses pontos antes de assinar, não depois — são exatamente os itens que mais geram surpresa de custo no meio do contrato.",
      },
      { type: "h3", text: "Um exemplo de custo escondido comum" },
      {
        type: "p",
        content: [
          "Uma empresa contrata um agente achando que o valor mensal cobre tudo, e só descobre um mês depois que a mensageria da Meta é cobrada à parte — porque ninguém perguntou isso antes de assinar. Não é má-fé do fornecedor, na maioria dos casos: é ",
          { text: "um item que simplesmente não estava explícito na proposta", bold: true },
          ", porque proposta nenhuma lista tudo de forma espontânea. Cabe a quem contrata perguntar.",
        ],
      },
      { type: "h2", text: "Como usar essa lista pra comparar propostas" },
      {
        type: "p",
        content: [
          "Pegue duas propostas e marque, item por item, o que cada uma inclui explicitamente. É comum uma proposta mais barata simplesmente ter deixado mais itens de fora — não necessariamente ser mais eficiente. Detalhamos um roteiro completo de perguntas pra fazer antes de assinar em ",
          { text: "como comparar propostas de fornecedores de agente de IA", href: "/blog/como-comparar-propostas-de-fornecedores-de-agente-de-ia" },
          ".",
        ],
      },
      {
        type: "p",
        content: [
          "Numa implementação completa do Revolução AI, esses itens entram alinhados desde a proposta inicial — levantamento, configuração, integração com o número existente e ajuste com conversas reais fazem parte do escopo, e o que fica de fora (como a mensageria da própria Meta) é dito com transparência antes de fechar, não descoberto depois.",
        ],
      },
      {
        type: "cta",
        lead: "Quer uma proposta que já deixa claro o que está incluído, sem letra miúda?",
        label: "Falar com o Revolução AI",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "O custo de mensageria da Meta já vem incluso no preço do fornecedor?",
        answer:
          "Normalmente não — em conexões pela API oficial, esse custo é cobrado separadamente pela Meta, e vale confirmar isso antes de assinar.",
      },
      {
        question: "Ajuste pós-lançamento costuma estar incluído no preço?",
        answer:
          "Depende do modelo de contrato — assinaturas costumam incluir, projetos fechados costumam cobrar isso à parte ou não incluir de forma alguma.",
      },
      {
        question: "Por que duas propostas com o mesmo valor podem ser tão diferentes?",
        answer:
          "Porque cada uma pode estar cobrindo um escopo diferente — uma pode incluir integração e ajuste contínuo, a outra só a configuração inicial do agente.",
      },
      {
        question: "Integração com CRM ou ERP da empresa costuma estar inclusa?",
        answer:
          "Geralmente não em integrações mais profundas ou sistemas proprietários — esse tipo de integração costuma ser orçado à parte, e vale perguntar isso antes de fechar.",
      },
    ],
  },

  {
    slug: "como-comparar-propostas-de-fornecedores-de-agente-de-ia",
    cluster: "comercial",
    title: "Como comparar propostas de fornecedores de agente de IA (sem cair no mais barato)",
    metaDescription:
      "Um roteiro de perguntas pra comparar propostas de verdade — além do valor mensal — e não descobrir depois que faltava metade do escopo.",
    keyword: "como comparar propostas agente de ia",
    date: "2026-08-24",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "servicos-agente-de-ia-integracao-whatsapp",
      "erros-comuns-automatizar-atendimento-com-ia",
      "o-que-esta-incluido-no-preco-de-um-agente-de-ia",
    ],
    intro:
      "Comparar só o valor mensal de duas propostas é como comparar dois carros só pelo preço, sem olhar o que vem de série. O fornecedor mais barato às vezes é simplesmente o que deixou mais coisa de fora do escopo — e isso só aparece depois de contratado, quando alguém precisa efetivamente configurar e manter o agente.",
    body: [
      { type: "h2", text: "Seis perguntas que valem mais do que o valor da proposta" },
      {
        type: "ul",
        items: [
          [
            { text: "Quem escreve e revisa as respostas que o agente vai dar: ", bold: true },
            "a empresa, o fornecedor, ou os dois juntos?",
          ],
          [
            { text: "O que acontece quando o agente não sabe responder algo: ", bold: true },
            "ele admite e escala, ou arrisca uma resposta inventada?",
          ],
          [
            { text: "Quanto tempo de ajuste está incluso depois do lançamento: ", bold: true },
            "com base em conversas reais dos primeiros clientes atendidos?",
          ],
          [
            { text: "A integração é com a API oficial ou uma solução paralela mais instável: ", bold: true },
            "e quem cuida da configuração técnica dessa conexão?",
          ],
          [
            { text: "Existe algum tipo de acompanhamento ou relatório do que está sendo conversado: ", bold: true },
            "ou o contrato só entrega o agente e some?",
          ],
          [
            { text: "O fornecedor consegue explicar um caso real parecido com o seu: ", bold: true },
            "ou aplica o mesmo script genérico pra qualquer tipo de negócio?",
          ],
        ],
      },
      {
        type: "callout",
        text: "A pergunta mais reveladora costuma ser \"o que acontece quando o agente não sabe responder\" — é ali que dá pra perceber se o fornecedor pensou em qualidade de verdade, ou só em automação bruta.",
      },
      { type: "h2", text: "Sinais de que o fornecedor não está preparado" },
      {
        type: "ul",
        items: [
          "Não sabe explicar o que acontece quando o agente erra ou não sabe responder algo",
          "Empurra pra WhatsApp comum ou pessoal, sem falar de conexão oficial nem de estabilidade",
          "Não menciona nenhum processo de ajuste depois do lançamento — entrega e some",
          "Aplica o mesmo script genérico pra qualquer negócio, sem levantamento real da empresa",
        ],
      },
      { type: "h2", text: "Como montar a comparação na prática" },
      {
        type: "p",
        content:
          "Faça uma tabela simples com as seis perguntas acima em uma coluna, e uma coluna por proposta. Preencha com a resposta literal que cada fornecedor deu — não com a impressão geral. É comum que, ao preencher isso, a proposta mais barata mostre visivelmente menos linhas preenchidas, o que já indica onde o preço foi cortado.",
      },
      {
        type: "p",
        content: [
          "Detalhamos também os três formatos mais comuns de contratar isso — self-service, sob medida e pré-configurado por nicho — em ",
          { text: "quais serviços oferecem agente de IA com integração para WhatsApp", href: "/blog/servicos-agente-de-ia-integracao-whatsapp" },
          ", que ajuda a entender em qual categoria cada proposta se encaixa antes mesmo de comparar valores.",
        ],
      },
      {
        type: "cta",
        lead: "Quer uma proposta que já responde essas seis perguntas de cara?",
        label: "Conhecer os agentes de IA do Revolução AI",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "Qual a pergunta mais importante pra fazer antes de contratar um agente de IA?",
        answer:
          "O que acontece quando o agente não sabe responder algo — a resposta revela se o fornecedor pensou em qualidade de verdade ou só em automação bruta.",
      },
      {
        question: "Como saber se um fornecedor está aplicando o mesmo script pra todo mundo?",
        answer:
          "Peça pra ele explicar um caso real parecido com o seu negócio — quem tem experiência de verdade consegue detalhar, quem não tem, generaliza.",
      },
      {
        question: "Vale a pena escolher só pelo valor mais baixo?",
        answer:
          "Não isoladamente — o fornecedor mais barato às vezes só deixou mais itens de fora do escopo, o que aparece depois de contratado.",
      },
      {
        question: "Como organizar a comparação entre propostas diferentes?",
        answer:
          "Monte uma tabela com as mesmas perguntas em todas as propostas, preenchendo com a resposta literal de cada fornecedor — isso revela onde o preço foi cortado.",
      },
    ],
  },

  {
    slug: "vale-a-pena-pagar-mais-caro-por-uma-implementacao-completa",
    cluster: "comercial",
    title: "Vale a pena pagar mais caro por uma implementação completa de agente de IA?",
    metaDescription:
      "Compare duas empresas do mesmo porte que contrataram agentes diferentes — uma só o script, outra a operação completa — e o que mudou no resultado.",
    keyword: "vale a pena implementação completa agente de ia",
    date: "2026-08-25",
    destino: { label: "Agentes de IA para Pré-Vendas", href: "/agentes-de-ia" },
    relatedSlugs: [
      "servicos-agente-de-ia-integracao-whatsapp",
      "custo-atendente-humano-vs-agente-de-ia",
      "como-comparar-propostas-de-fornecedores-de-agente-de-ia",
    ],
    intro:
      "Duas empresas do mesmo porte, no mesmo segmento, contratam agentes de IA em datas parecidas. Uma escolhe a proposta mais barata, que entrega só o script de conversa. A outra paga um pouco mais por uma implementação completa. Seis meses depois, o resultado das duas conta uma história bem diferente — e não é sobre a tecnologia em si, é sobre tudo que rodeia ela.",
    body: [
      { type: "h2", text: "Empresa A: o script sozinho" },
      {
        type: "p",
        content:
          "Contrata o fornecedor mais barato, que entrega um agente configurado com respostas padrão sobre produto, preço e prazo. Funciona nas primeiras semanas — as dúvidas simples são respondidas rápido. Mas o agente não está integrado à agenda, então marcar horário ainda depende de alguém copiar manualmente pra planilha. Não há follow-up automático, então quem some no meio da conversa simplesmente não recebe retorno. E ninguém revisa as conversas depois do primeiro mês, então erros de configuração vão se acumulando sem que ninguém perceba.",
      },
      { type: "h2", text: "Empresa B: a implementação completa" },
      {
        type: "p",
        content: [
          "Paga um pouco mais por uma implementação que inclui ",
          { text: "integração com agenda", bold: true },
          ", ",
          { text: "follow-up automático", bold: true },
          " de quem sumiu, e ",
          { text: "revisão periódica", bold: true },
          " das conversas reais. O agendamento acontece direto na conversa, sem ninguém copiar nada manualmente. Quem para de responder recebe um retorno com contexto, algumas horas depois. E o time de quem implementou revisa uma amostra de conversas toda semana no primeiro mês, corrigindo o que ninguém tinha previsto no levantamento inicial.",
        ],
      },
      {
        type: "callout",
        text: "As duas empresas pagaram por \"um agente de IA\". Só uma pagou pela operação inteira em volta dele — e é essa diferença que aparece no resultado, não no nome do produto contratado.",
      },
      { type: "h2", text: "Onde a diferença aparece no resultado" },
      {
        type: "ul",
        items: [
          [
            { text: "Comparecimento: ", bold: true },
            "a Empresa B reduz falta de agendamento com lembrete automático; a Empresa A depende de alguém lembrar de mandar manualmente.",
          ],
          [
            { text: "Recuperação de lead: ", bold: true },
            "a Empresa B recupera parte de quem sumiu com follow-up; a Empresa A simplesmente perde esses contatos.",
          ],
          [
            { text: "Qualidade ao longo do tempo: ", bold: true },
            "a Empresa B melhora com o ajuste contínuo; a Empresa A vai acumulando erro silencioso até virar reclamação visível.",
          ],
        ],
      },
      { type: "h2", text: "A diferença de preço, olhada de outro ângulo" },
      {
        type: "p",
        content: [
          "Se a diferença de valor entre as duas propostas for, por exemplo, de algumas centenas de reais por mês, e a implementação completa recupera mesmo que poucas vendas a mais por mês através do follow-up e da redução de falta, essa diferença de preço se paga sozinha — sem contar o tempo que a Empresa A ainda vai gastar, mais cedo ou mais tarde, corrigindo os problemas que ninguém revisou. Detalhamos ",
          { text: "a diferença entre os formatos de contratação", href: "/blog/servicos-agente-de-ia-integracao-whatsapp" },
          " com mais profundidade, incluindo os sinais de que um fornecedor só entrega o script sem a operação em volta.",
        ],
      },
      {
        type: "cta",
        lead: "Quer ser a Empresa B da sua própria história?",
        label: "Conhecer a implementação completa",
        href: "/agentes-de-ia",
      },
    ],
    faq: [
      {
        question: "Qual a diferença entre um agente \"só o script\" e uma implementação completa?",
        answer:
          "A implementação completa inclui integração com sistemas (como agenda), follow-up automático e revisão contínua das conversas — não só a configuração inicial de respostas.",
      },
      {
        question: "Um agente mais barato funciona pelo menos no começo?",
        answer:
          "Costuma funcionar nas primeiras semanas pra dúvidas simples, mas problemas de integração, follow-up e ajuste tendem a aparecer com o tempo, sem ninguém corrigindo.",
      },
      {
        question: "A diferença de preço entre as duas propostas costuma se pagar?",
        answer:
          "Frequentemente sim — a recuperação de poucas vendas a mais por mês, via follow-up e redução de falta, já costuma cobrir a diferença de investimento.",
      },
      {
        question: "Como saber se uma proposta é \"só o script\" antes de contratar?",
        answer:
          "Pergunte diretamente sobre integração com agenda ou CRM, follow-up automático de quem sumiu, e revisão periódica das conversas — quem só entrega o script raramente tem resposta pronta pra isso.",
      },
    ],
  },
];
