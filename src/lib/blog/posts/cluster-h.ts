import type { BlogPost } from "../types";

export const clusterHPosts: BlogPost[] = [
  {
    slug: "como-criar-um-agente-de-ia-para-whatsapp-do-zero",
    cluster: "como-criar",
    title: "Como criar um agente de IA para WhatsApp do zero (passo a passo)",
    metaDescription:
      "Da base de conhecimento à conexão com o WhatsApp: veja as etapas reais de montar seu próprio agente de IA numa plataforma self-service.",
    keyword: "como criar um agente de ia para whatsapp",
    date: "2026-09-10",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "como-escrever-base-de-conhecimento-do-seu-agente",
      "como-escrever-instrucoes-para-agente-de-ia-soar-como-sua-marca",
      "agencia-de-ia-ou-plataforma-self-service-comparacao",
    ],
    intro:
      "Montar um agente de IA sozinho, numa plataforma self-service, é um processo com etapas bem definidas — não é escrever código, é configurar informação e comportamento. Este passo a passo cobre a ordem que costuma funcionar melhor, do zero até o agente respondendo de verdade no WhatsApp.",
    body: [
      { type: "h2", text: "As cinco etapas, na ordem certa" },
      {
        type: "ul",
        items: [
          [
            { text: "1. Reunir a informação do negócio: ", bold: true },
            "preço, prazo, política de cancelamento, perguntas que os clientes mais fazem — antes de abrir a plataforma, é melhor ter isso organizado num documento.",
          ],
          [
            { text: "2. Montar a base de conhecimento em formato de perguntas e respostas: ", bold: true },
            "transformar essa informação em pares de pergunta e resposta, incluindo como quebrar as objeções mais comuns.",
          ],
          [
            { text: "3. Escrever as instruções de comportamento: ", bold: true },
            "definir o tom de voz, o que o agente pode e não pode prometer, e quando ele deve transferir pra um humano.",
          ],
          [
            { text: "4. Testar internamente: ", bold: true },
            "simular perguntas comuns e casos difíceis antes de qualquer cliente real ver o agente.",
          ],
          [
            { text: "5. Conectar ao WhatsApp e lançar: ", bold: true },
            "vincular o número e acompanhar de perto os primeiros dias de conversa real.",
          ],
        ],
      },
      {
        type: "callout",
        text: "A ordem importa: escrever instruções de comportamento antes de ter a base de conhecimento pronta costuma gerar um agente que \"sabe se comportar\" mas não tem o que responder — o resultado ainda sai raso.",
      },
      { type: "h2", text: "O que uma plataforma self-service já resolve por você" },
      {
        type: "p",
        content: [
          "Numa plataforma como a ",
          { text: "Chatflux", href: "/plataforma" },
          ", boa parte da complexidade técnica já vem pronta: conexão nativa com WhatsApp e Instagram, agendamento integrado com Google Agenda, ",
          { text: "uma IA de apoio própria da plataforma que ajuda a escrever e ajustar o prompt", bold: true },
          ", painel de acompanhamento em tempo real, e até suporte a múltiplos agentes na mesma conta. O trabalho que sobra pra quem monta é o de conteúdo e comportamento — não o de infraestrutura.",
        ],
      },
      {
        type: "p",
        content: [
          "Vale um alerta honesto: nem toda integração vem pronta assim. Sistemas que já são suportados nativamente (como Google Agenda) funcionam direto; um sistema diferente — outra agenda, um CRM específico, um ERP interno — costuma depender de ter uma API disponível e de construir uma integração customizada em cima dela. Detalhamos esse caso específico do agendamento em ",
          { text: "como configurar agendamento integrado", href: "/blog/como-configurar-agendamento-integrado-agente-de-ia" },
          ".",
        ],
      },
      { type: "h2", text: "Quanto tempo isso costuma levar" },
      {
        type: "p",
        content:
          "Reunir a informação do negócio costuma ser a etapa que mais consome tempo, principalmente se ninguém organizou isso antes. Uma vez com a informação em mãos, montar a base de conhecimento e as instruções costuma levar de algumas horas a um dia, dependendo da complexidade do negócio — e o ajuste fino continua acontecendo nas primeiras semanas, com base em conversas reais.",
      },
      {
        type: "p",
        content: [
          "Detalhamos cada uma dessas etapas com mais profundidade nos próximos artigos — a partir de ",
          { text: "como escrever a base de conhecimento do seu agente", href: "/blog/como-escrever-base-de-conhecimento-do-seu-agente" },
          ".",
        ],
      },
      {
        type: "cta",
        lead: "Quer montar seu agente com uma plataforma que já resolve a parte técnica?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "Preciso saber programar pra criar um agente de IA numa plataforma self-service?",
        answer:
          "Não. O trabalho é de configurar informação (base de conhecimento) e comportamento (instruções), não de escrever código.",
      },
      {
        question: "Qual a ordem certa pra montar um agente do zero?",
        answer:
          "Reunir a informação do negócio, montar a base de conhecimento, escrever as instruções de comportamento, testar internamente, e só então conectar e lançar.",
      },
      {
        question: "Quanto tempo leva pra montar um agente sozinho?",
        answer:
          "Reunir a informação costuma ser a etapa mais demorada; com ela em mãos, a configuração em si leva de algumas horas a um dia, com ajuste contínuo nas primeiras semanas.",
      },
      {
        question: "Uma plataforma self-service ajuda a escrever o prompt do agente?",
        answer:
          "Sim, plataformas como a Chatflux incluem uma IA de apoio própria que ajuda a escrever e ajustar o prompt e as configurações, mesmo pra quem nunca fez isso antes.",
      },
    ],
  },

  {
    slug: "como-escrever-base-de-conhecimento-do-seu-agente",
    cluster: "como-criar",
    title: "Como escrever a base de conhecimento do seu agente de IA (perguntas e respostas)",
    metaDescription:
      "A base de conhecimento é o que decide se seu agente responde bem ou improvisa. Veja como transformar informação solta em perguntas e respostas de verdade.",
    keyword: "como escrever base de conhecimento agente de ia",
    date: "2026-09-03",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "como-criar-um-agente-de-ia-para-whatsapp-do-zero",
      "o-que-e-base-de-conhecimento-agente-de-ia",
      "como-escrever-instrucoes-para-agente-de-ia-soar-como-sua-marca",
    ],
    intro:
      "Como já detalhamos no artigo sobre o que é uma base de conhecimento, esse material é o que o agente consulta antes de responder. Aqui o foco é prático: como efetivamente escrever isso, no formato de perguntas e respostas que a maioria das plataformas usa hoje.",
    body: [
      { type: "h2", text: "De onde tirar as perguntas de verdade" },
      {
        type: "ul",
        items: [
          [
            { text: "Histórico de conversas do WhatsApp: ", bold: true },
            "as perguntas que já aparecem há meses são as mais importantes de cobrir primeiro.",
          ],
          [
            { text: "O time que já atende: ", bold: true },
            "uma conversa de 30 minutos com quem responde no dia a dia revela mais do que qualquer questionário genérico preenchido sozinho.",
          ],
          [
            { text: "Comentários e mensagens de redes sociais: ", bold: true },
            "dúvidas que aparecem em posts e anúncios costumam se repetir no WhatsApp depois.",
          ],
        ],
      },
      { type: "h2", text: "Como escrever uma boa pergunta e resposta" },
      {
        type: "p",
        content: [
          "Escreva a pergunta do jeito que o cliente realmente escreveria — com a informalidade real, não uma versão \"revisada\" e formal demais. E ",
          { text: "escreva a resposta completa", bold: true },
          ", incluindo a informação que normalmente vem numa segunda mensagem (\"e o preço inclui instalação?\") já dentro da primeira resposta, quando fizer sentido.",
        ],
      },
      {
        type: "callout",
        text: "Um erro comum é escrever a pergunta \"Qual o preço?\" e parar por aí — sem cobrir as variações reais: \"quanto custa\", \"qual o valor\", \"tem desconto à vista\". O agente entende linguagem livre, mas uma base mais rica de exemplos ajuda a calibrar melhor as respostas.",
      },
      { type: "h2", text: "Não esqueça as objeções" },
      {
        type: "p",
        content: [
          "Além de responder dúvida, uma boa base de conhecimento já inclui como ",
          { text: "quebrar as objeções mais comuns", bold: true },
          " daquele negócio — \"achei caro\", \"vou pensar\", \"vi mais barato em outro lugar\". Sem isso, o agente até responde bem, mas não avança a conversa quando ela esbarra numa objeção real.",
        ],
      },
      { type: "h2", text: "O que fazer com perguntas que a base não cobre" },
      {
        type: "p",
        content:
          "Nas primeiras semanas de uso real, vão aparecer perguntas que ninguém previu. O ideal é revisar o histórico de conversas periodicamente e adicionar essas novas perguntas à base — é assim que ela vai ficando cada vez mais completa, em vez de travada no que foi pensado no primeiro dia.",
      },
      {
        type: "cta",
        lead: "Quer ajuda pra estruturar essa base direito desde o início?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "De onde tirar as perguntas mais importantes pra cobrir primeiro?",
        answer:
          "Do histórico de conversas reais do WhatsApp e de uma conversa direta com quem já atende — são as fontes mais confiáveis, muito mais do que um questionário genérico.",
      },
      {
        question: "A base de conhecimento precisa cobrir objeções, ou só dúvidas?",
        answer:
          "Precisa cobrir os dois. Uma base que só responde dúvida não ajuda o agente a avançar a conversa quando ela esbarra numa objeção real de preço ou hesitação.",
      },
      {
        question: "Como escrever a pergunta certa numa base de perguntas e respostas?",
        answer:
          "Do jeito que o cliente realmente escreveria, com a informalidade real — não uma versão formal e revisada que ninguém usaria de verdade.",
      },
      {
        question: "O que fazer quando aparece uma pergunta que a base não cobre?",
        answer:
          "Revisar o histórico de conversas periodicamente e adicionar a pergunta nova à base — é assim que ela fica mais completa com o tempo.",
      },
    ],
  },

  {
    slug: "como-escrever-instrucoes-para-agente-de-ia-soar-como-sua-marca",
    cluster: "como-criar",
    title: "Como escrever instruções pro seu agente de IA soar como sua marca",
    metaDescription:
      "Instruções de comportamento (o prompt) decidem o tom, os limites e a personalidade do agente. Veja como escrever isso sem soar genérico.",
    keyword: "como escrever prompt agente de ia",
    date: "2026-09-04",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "como-escrever-base-de-conhecimento-do-seu-agente",
      "como-manter-atendimento-humanizado-com-agente-de-ia",
      "como-testar-agente-de-ia-antes-de-colocar-no-ar",
      "chatbot-com-ia-entende-girias-e-erros-de-portugues",
    ],
    intro:
      "Se a base de conhecimento é o que o agente sabe, as instruções são como ele se comporta — o tom de voz, os limites do que pode prometer, e quando deve chamar um humano. Escrever isso bem é diferente de escrever uma base de conhecimento: aqui o trabalho é definir personalidade e regra, não conteúdo.",
    body: [
      { type: "h2", text: "O que costuma entrar nas instruções" },
      {
        type: "ul",
        items: [
          [
            { text: "Tom de voz: ", bold: true },
            "formal ou descontraído, uso de emoji ou não, frases curtas ou mais elaboradas.",
          ],
          [
            { text: "Apresentação inicial: ", bold: true },
            "se o agente se identifica como assistente virtual ou responde de forma natural, sem se apresentar como IA.",
          ],
          [
            { text: "Limites de negociação: ", bold: true },
            "até onde pode oferecer desconto ou condição especial, sem precisar escalar.",
          ],
          [
            { text: "Gatilhos de transferência: ", bold: true },
            "em que situações ele deve parar e chamar um humano, em vez de insistir sozinho.",
          ],
        ],
      },
      {
        type: "callout",
        text: "Instruções vagas geram comportamento genérico. \"Seja simpático\" é vago; \"use frases curtas, sem emoji, trate o cliente pelo primeiro nome depois da segunda mensagem\" é uma instrução que realmente molda o comportamento.",
      },
      { type: "h2", text: "Um exemplo de instrução bem escrita vs. vaga" },
      {
        type: "p",
        content: [
          "Instrução vaga: \"responda de forma profissional e amigável\". Instrução específica: \"",
          { text: "use um tom direto e objetivo, frases curtas, sem gírias; nunca prometa desconto acima de 10% sem antes perguntar se a pessoa já decidiu comprar", bold: true },
          "\". A segunda dá ao agente algo concreto pra seguir; a primeira deixa espaço demais pra interpretação genérica.",
        ],
      },
      { type: "h2", text: "Escreva com base no que sua empresa já fala" },
      {
        type: "p",
        content: [
          "A melhor fonte pra escrever instruções de tom não é imaginar como o agente \"deveria\" soar — é olhar como o time já fala de verdade com os clientes. Detalhamos essa lógica de humanização com mais profundidade em ",
          { text: "como manter atendimento humanizado com agente de IA", href: "/blog/como-manter-atendimento-humanizado-com-agente-de-ia" },
          ".",
        ],
      },
      { type: "h2", text: "Ajuste depois de ver conversas reais" },
      {
        type: "p",
        content:
          "As instruções que parecem certas no papel nem sempre soam certas na prática — é normal revisar formalidade, tamanho de resposta e até expressões específicas depois de ver como o agente conversa de verdade com os primeiros clientes.",
      },
      {
        type: "cta",
        lead: "Quer ajuda pra calibrar o tom certo desde a primeira versão?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "Qual a diferença entre base de conhecimento e instruções de comportamento?",
        answer:
          "A base de conhecimento é o que o agente sabe (preço, prazo, política); as instruções são como ele se comporta (tom, limites, quando transferir pra humano).",
      },
      {
        question: "Por que instruções vagas não funcionam bem?",
        answer:
          "Porque deixam espaço demais pra interpretação genérica — instruções específicas, com exemplo concreto de comportamento, moldam melhor a resposta do agente.",
      },
      {
        question: "De onde tirar o tom de voz certo pras instruções?",
        answer:
          "Do jeito que o time já fala de verdade com os clientes — não de uma ideia abstrata de como o agente \"deveria\" soar.",
      },
      {
        question: "As instruções ficam prontas na primeira versão?",
        answer:
          "Raramente. É normal ajustar formalidade e expressões depois de ver como o agente conversa de verdade com os primeiros clientes reais.",
      },
    ],
  },

  {
    slug: "como-configurar-follow-up-automatico-agente-de-ia",
    cluster: "como-criar",
    title: "Como configurar follow-up automático pra recuperar leads que sumiram",
    metaDescription:
      "Uma sequência de mensagens bem espaçada recupera parte de quem parou de responder. Veja como configurar isso sem soar insistente.",
    keyword: "como configurar follow-up automatico agente de ia",
    date: "2026-09-18",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "agente-de-ia-recuperar-clientes-que-sumiram",
      "como-configurar-agendamento-integrado-agente-de-ia",
      "como-criar-um-agente-de-ia-para-whatsapp-do-zero",
    ],
    intro:
      "Como já detalhamos no artigo sobre recuperar clientes que sumiram, a maioria dos leads convertidos precisa de mais de um contato — e follow-up automático é o que garante que essa segunda (ou terceira) tentativa realmente aconteça. Aqui o foco é a configuração prática: como montar essa sequência sem soar como cobrança chata.",
    body: [
      { type: "h2", text: "A cadência que costuma funcionar" },
      {
        type: "ul",
        items: [
          [
            { text: "Primeiro follow-up (30 minutos a 1 hora depois): ", bold: true },
            "ainda dentro da janela em que o interesse está quente — um lembrete leve, sem soar apressado.",
          ],
          [
            { text: "Segundo follow-up (1 dia depois): ", bold: true },
            "trazendo algo novo — responder uma dúvida que ficou solta, ou reforçar um ponto que não foi resolvido.",
          ],
          [
            { text: "Terceiro follow-up (alguns dias depois): ", bold: true },
            "última tentativa, com um tom mais leve de \"encerrar\" a conversa, deixando a porta aberta.",
          ],
        ],
      },
      {
        type: "callout",
        text: "A sequência deve parar sozinha assim que o objetivo é cumprido — se a pessoa responde, agenda ou diz que não tem mais interesse, o follow-up automático não deveria continuar disparando.",
      },
      { type: "h2", text: "Como escrever cada mensagem da sequência" },
      {
        type: "p",
        content: [
          "Evite repetir a mesma frase genérica (\"oi, ainda tem interesse?\") em todas as tentativas. Cada mensagem deveria trazer ",
          { text: "algo específico da conversa anterior", bold: true },
          " — o que a pessoa perguntou, o que ficou pendente — em vez de uma cobrança sem contexto.",
        ],
      },
      { type: "h3", text: "Um exemplo de mensagem configurada com contexto" },
      {
        type: "p",
        content: [
          "Em vez de configurar só \"Oi! Ainda tem interesse?\", uma mensagem melhor referencia o que ficou pendente na variável da conversa: \"",
          { text: "Oi! Vi que você tinha perguntado sobre [assunto] — separei essa informação aqui, faz sentido continuar de onde paramos?", bold: true },
          "\". A maioria das plataformas permite inserir esse tipo de variável dinâmica na mensagem de follow-up, puxando algo que realmente foi dito na conversa, em vez de um texto fixo igual pra todo mundo.",
        ],
      },
      { type: "h2", text: "Quando parar de insistir" },
      {
        type: "p",
        content:
          "Configure o agente pra reconhecer sinais claros de desinteresse — um \"não\" direto, um pedido pra não receber mais mensagem — e parar a sequência imediatamente nesses casos, em vez de continuar até o número de tentativas configurado.",
      },
      { type: "h2", text: "Conectando com o restante do funil" },
      {
        type: "p",
        content: [
          "Follow-up funciona melhor combinado com ",
          { text: "agendamento integrado", href: "/blog/como-configurar-agendamento-integrado-agente-de-ia" },
          " — quando a pessoa responde ao follow-up demonstrando interesse, o agente já pode oferecer um horário disponível na mesma mensagem, em vez de reiniciar a conversa do zero.",
        ],
      },
      {
        type: "cta",
        lead: "Quer configurar essa cadência certa desde o início?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "Qual a cadência ideal de follow-up automático?",
        answer:
          "Um primeiro contato de 30 minutos a 1 hora, um segundo no dia seguinte com algo novo, e um terceiro alguns dias depois com tom mais leve — sempre parando quando o objetivo é cumprido.",
      },
      {
        question: "O follow-up automático continua mesmo depois que a pessoa responde?",
        answer:
          "Não deveria. A sequência precisa parar assim que a pessoa responde, agenda, ou sinaliza desinteresse — continuar depois disso soa como cobrança chata.",
      },
      {
        question: "Como evitar que o follow-up soe repetitivo?",
        answer:
          "Trazendo algo específico da conversa anterior em cada mensagem, em vez de repetir a mesma frase genérica de \"ainda tem interesse?\".",
      },
      {
        question: "O agente reconhece quando a pessoa não quer mais receber mensagem?",
        answer:
          "Sim, configurado corretamente ele reconhece sinais claros de desinteresse e para a sequência imediatamente, sem esperar o número de tentativas configurado se esgotar.",
      },
      {
        question: "Dá pra personalizar a mensagem de follow-up com dado da conversa anterior?",
        answer:
          "Sim, a maioria das plataformas permite inserir variáveis dinâmicas que puxam algo que a pessoa realmente disse, em vez de um texto fixo igual pra todo mundo.",
      },
    ],
  },

  {
    slug: "como-conectar-agente-de-ia-whatsapp-instagram",
    cluster: "como-criar",
    title: "Como conectar seu agente de IA ao WhatsApp e Instagram",
    metaDescription:
      "Antes de lançar, o agente precisa estar conectado aos canais certos. Veja o processo prático de conexão, e os detalhes que costumam ser esquecidos.",
    keyword: "como conectar agente de ia whatsapp instagram",
    date: "2026-09-17",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "numero-comum-ou-api-oficial-agente-de-ia-whatsapp",
      "como-criar-um-agente-de-ia-para-whatsapp-do-zero",
      "como-testar-agente-de-ia-antes-de-colocar-no-ar",
    ],
    intro:
      "Conectar o agente ao canal certo é uma das últimas etapas antes do lançamento, mas costuma ter mais detalhes do que parece à primeira vista — principalmente quando a empresa já usa esse número ou perfil com os clientes há anos e não pode perder o histórico.",
    body: [
      { type: "h2", text: "Conectando ao WhatsApp" },
      {
        type: "p",
        content: [
          "O número que a empresa já usa normalmente é ",
          { text: "mantido", bold: true },
          " — o que muda é a forma de conexão. Detalhamos as opções (Cloud API tradicional, coexistência, conexão não oficial) em ",
          { text: "número comum ou API oficial", href: "/blog/numero-comum-ou-api-oficial-agente-de-ia-whatsapp" },
          ". Numa plataforma self-service, a conexão costuma ser guiada passo a passo, geralmente via ",
          { text: "QR code", bold: true },
          ", parecido com conectar o WhatsApp Web.",
        ],
      },
      { type: "h3", text: "Um exemplo de como o passo a passo costuma acontecer" },
      {
        type: "p",
        content: [
          "A plataforma mostra um QR code na tela; alguém do time abre o WhatsApp Business no celular, vai na opção de ",
          { text: "conectar dispositivo", bold: true },
          " e escaneia o código. Em poucos segundos, a conta fica vinculada — sem precisar mexer em configuração técnica de API, sem depender de aprovação da Meta pra começar a testar.",
        ],
      },
      { type: "h2", text: "Conectando ao Instagram" },
      {
        type: "p",
        content: [
          "Plataformas com ",
          { text: "integração nativa aos dois canais", bold: true },
          " permitem que o mesmo agente responda tanto no WhatsApp quanto no Instagram, usando a mesma base de conhecimento e o mesmo tom configurado — sem precisar duplicar a configuração pra cada canal separadamente. A conexão costuma envolver autorizar o acesso à conta profissional do Instagram diretamente pelo painel da plataforma, algo parecido com conectar qualquer outra ferramenta de gestão de redes sociais.",
        ],
      },
      {
        type: "callout",
        text: "Um erro comum é configurar o agente só pensando no WhatsApp e esquecer que uma boa parte do interesse inicial, principalmente em nichos mais visuais, chega primeiro pelo direct do Instagram.",
      },
      { type: "h2", text: "O que verificar antes de considerar a conexão pronta" },
      {
        type: "ul",
        items: [
          [
            { text: "Número ou perfil correto: ", bold: true },
            "confirme que é realmente o que os clientes já conhecem, não um número ou perfil novo criado só pra teste.",
          ],
          [
            { text: "Horário de funcionamento: ", bold: true },
            "bate com o que a empresa realmente quer cobrir — fora desse horário, o comportamento configurado (responder ou não) precisa estar certo.",
          ],
          [
            { text: "Teste com número externo: ", bold: true },
            "uma mensagem enviada de um número que não é da própria equipe chega e recebe resposta normalmente, sem atraso nem erro.",
          ],
        ],
      },
      { type: "h2", text: "Depois de conectado, ainda falta testar" },
      {
        type: "p",
        content: [
          "Conectar não é o mesmo que estar pronto pra receber cliente real — o passo seguinte é testar cenários antes do lançamento oficial, como detalhamos em ",
          { text: "como testar um agente de IA antes de colocar no ar", href: "/blog/como-testar-agente-de-ia-antes-de-colocar-no-ar" },
          ".",
        ],
      },
      {
        type: "cta",
        lead: "Quer conectar seus canais numa plataforma que já guia esse processo?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "Preciso trocar de número pra conectar meu agente de IA?",
        answer:
          "Não. O número que a empresa já usa normalmente é mantido — o que muda é a forma técnica de conexão, não o contato que os clientes conhecem.",
      },
      {
        question: "O mesmo agente pode responder no WhatsApp e no Instagram ao mesmo tempo?",
        answer:
          "Sim, com integração nativa aos dois canais, o mesmo agente usa a mesma base de conhecimento e tom configurado nos dois lugares, sem duplicar a configuração.",
      },
      {
        question: "Como testar se a conexão está funcionando de verdade?",
        answer:
          "Enviando uma mensagem de teste de um número externo (não o da própria equipe) e conferindo se ela chega e recebe resposta normalmente.",
      },
      {
        question: "Conectar o agente já significa que ele está pronto pra clientes reais?",
        answer:
          "Não. Depois de conectado, ainda vale testar cenários e perguntas comuns antes do lançamento oficial, pra pegar problemas antes que um cliente real veja.",
      },
      {
        question: "Como funciona o passo a passo de conexão numa plataforma self-service?",
        answer:
          "Geralmente por QR code — alguém do time abre o WhatsApp Business no celular, escaneia o código mostrado na plataforma, e a conta fica vinculada em poucos segundos, sem precisar de configuração técnica de API.",
      },
    ],
  },

  {
    slug: "como-testar-agente-de-ia-antes-de-colocar-no-ar",
    cluster: "como-criar",
    title: "Como testar seu agente de IA antes de colocar no ar",
    metaDescription:
      "Testar antes do lançamento evita que o primeiro cliente real encontre um erro que ninguém viu. Veja um roteiro prático de cenários pra simular.",
    keyword: "como testar agente de ia antes de lançar",
    date: "2026-08-28",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "como-conectar-agente-de-ia-whatsapp-instagram",
      "como-escrever-instrucoes-para-agente-de-ia-soar-como-sua-marca",
      "como-acompanhar-desempenho-agente-de-ia-metricas",
    ],
    intro:
      "Testar antes de lançar não é sobre garantir que o agente nunca vai errar — é sobre pegar os erros mais óbvios antes que um cliente real seja quem descobre. Um roteiro simples de cenários, testado internamente, evita boa parte das surpresas ruins da primeira semana.",
    body: [
      { type: "h2", text: "Os cenários que vale simular antes de lançar" },
      {
        type: "ul",
        items: [
          [
            { text: "Pergunta simples e direta: ", bold: true },
            "confirma que a base de conhecimento básica está respondendo certo.",
          ],
          [
            { text: "Duas perguntas na mesma mensagem: ", bold: true },
            "testa se o agente realmente entende texto livre, ou trava em fluxo fixo.",
          ],
          [
            { text: "Objeção comum ('achei caro', 'vou pensar'): ", bold: true },
            "verifica se o agente sabe argumentar, ou só repete o preço.",
          ],
          [
            { text: "Pedido de desconto fora da política: ", bold: true },
            "confirma se o agente sabe até onde pode ceder, e se escala quando deveria.",
          ],
          [
            { text: "Pergunta totalmente fora do escopo: ", bold: true },
            "verifica se ele admite não saber, em vez de inventar uma resposta.",
          ],
          [
            { text: "Mensagem de áudio: ", bold: true },
            "testa se a transcrição e a interpretação funcionam bem com o sotaque e o vocabulário reais do seu público.",
          ],
        ],
      },
      {
        type: "callout",
        text: "O teste mais revelador costuma ser o de pergunta fora do escopo — é ali que aparece se o agente foi configurado pra admitir limite, ou vai arriscar uma resposta inventada quando não sabe.",
      },
      { type: "h2", text: "Quem deveria participar desse teste" },
      {
        type: "p",
        content: [
          "O ideal é que ",
          { text: "alguém que não participou da configuração", bold: true },
          " faça parte dos testes — quem escreveu a base de conhecimento já sabe o que esperar e tende a testar só o que já sabe que funciona. Uma pessoa de fora encontra as perguntas estranhas que realmente aparecem na vida real.",
        ],
      },
      { type: "h2", text: "O que fazer com o que der errado no teste" },
      {
        type: "p",
        content:
          "Cada falha encontrada deveria virar um ajuste direto na base de conhecimento ou nas instruções — não adianta só anotar o problema, é preciso corrigir antes do lançamento. Depois de corrigir, vale repetir o mesmo teste pra confirmar que a correção realmente funcionou.",
      },
      { type: "h2", text: "O teste não substitui o ajuste pós-lançamento" },
      {
        type: "p",
        content: [
          "Mesmo com um bom teste interno, sempre aparece pergunta que ninguém previu nas primeiras semanas reais — isso é normal, não sinal de teste malfeito. O ajuste contínuo, acompanhando as ",
          { text: "métricas reais do agente", href: "/blog/como-acompanhar-desempenho-agente-de-ia-metricas" },
          ", continua sendo parte do processo depois do lançamento.",
        ],
      },
      {
        type: "cta",
        lead: "Quer um roteiro de teste guiado antes de lançar seu agente?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "Quais cenários testar antes de lançar um agente de IA?",
        answer:
          "Pergunta simples, duas perguntas na mesma mensagem, objeção comum, pedido de desconto fora da política, pergunta fora do escopo, e mensagem de áudio.",
      },
      {
        question: "Quem deveria participar dos testes do agente?",
        answer:
          "O ideal é incluir alguém que não participou da configuração — quem montou a base já sabe o que esperar e tende a testar só o óbvio.",
      },
      {
        question: "O que fazer quando o teste encontra um erro?",
        answer:
          "Corrigir direto na base de conhecimento ou nas instruções, e repetir o mesmo teste depois pra confirmar que a correção funcionou.",
      },
      {
        question: "Testar bem elimina a necessidade de ajuste depois do lançamento?",
        answer:
          "Não. Mesmo com bom teste interno, é normal aparecer pergunta nova nas primeiras semanas reais — o ajuste contínuo depois do lançamento continua fazendo parte do processo.",
      },
    ],
  },

  {
    slug: "como-configurar-agendamento-integrado-agente-de-ia",
    cluster: "como-criar",
    title: "Como configurar agendamento integrado no seu agente de IA",
    metaDescription:
      "Um agente que agenda sozinho, direto na conversa, elimina o vai e vem manual. Veja como configurar essa integração com sua agenda.",
    keyword: "como configurar agendamento integrado agente de ia",
    date: "2026-09-03",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "ferramentas-de-agendamento-com-ia",
      "como-configurar-follow-up-automatico-agente-de-ia",
      "agente-de-ia-para-clinica-medica",
    ],
    intro:
      "Um agente que conduz a conversa até o interesse de agendar, mas depois pede pra pessoa \"aguardar confirmação\", ainda deixa a parte mais frustrante do processo sem resolver. Configurar o agendamento integrado — conectado à sua agenda de verdade — fecha esse ciclo, do interesse ao horário confirmado, sem intervenção manual no meio.",
    body: [
      { type: "h2", text: "O que a integração de agenda precisa fazer" },
      {
        type: "ul",
        items: [
          [
            { text: "Consultar disponibilidade real: ", bold: true },
            "conectado à sua agenda (por exemplo, Google Agenda), o agente vê os horários realmente livres, sem chutar.",
          ],
          [
            { text: "Reservar na hora: ", bold: true },
            "confirma o agendamento dentro da própria conversa, sem esperar alguém validar depois.",
          ],
          [
            { text: "Enviar confirmação e lembrete: ", bold: true },
            "reforça o compromisso já marcado, reduzindo falta e aumentando comparecimento.",
          ],
        ],
      },
      {
        type: "callout",
        text: "Sem essa integração, o agente resolve metade do problema — conduz bem a conversa, mas reintroduz a mesma demora manual no momento em que o cliente mais quer uma resposta rápida: a confirmação do horário.",
      },
      { type: "h2", text: "A primeira pergunta a responder: qual agenda você usa" },
      {
        type: "p",
        content: [
          "Antes de configurar qualquer coisa, vale checar qual sistema de agenda o negócio já usa — porque a resposta muda completamente o trabalho pela frente. ",
          { text: "Se for Google Agenda, a Chatflux, por exemplo, já vem com essa integração pronta", bold: true },
          ": conectar a conta e configurar duração do compromisso costuma ser o suficiente, sem nada além disso pra fazer. Isso não é garantia em toda plataforma self-service, mas quando existe, é a opção mais simples de configurar.",
        ],
      },
      {
        type: "callout",
        text: "Ter Google Agenda não garante integração nativa em qualquer plataforma — isso varia de ferramenta pra ferramenta. Vale confirmar diretamente com quem oferece a plataforma antes de assumir que ela já vem pronta.",
      },
      { type: "h3", text: "E se o negócio usa outra agenda?" },
      {
        type: "p",
        content: [
          "Se o sistema é outro — Outlook, Calendly, uma agenda própria de um software de gestão, ou um sistema interno da empresa —, o caminho depende de duas coisas: ",
          { text: "se esse sistema tem uma API pública", bold: true },
          " (uma forma programável de outros sistemas conversarem com ele) e se a plataforma que você está usando permite construir uma integração customizada em cima dela.",
        ],
      },
      {
        type: "ul",
        items: [
          [
            { text: "Se o sistema tem API: ", bold: true },
            "dá pra construir uma função específica que conecta o agente a essa agenda — na Chatflux, isso entra no recurso de código customizado, que permite configurar chamadas a sistemas externos disparadas no momento certo da conversa.",
          ],
          [
            { text: "Se o sistema não tem API: ", bold: true },
            "a integração direta não é possível — nesses casos, a alternativa costuma ser usar Google Agenda como intermediária (sincronizando com o sistema antigo) ou manter uma etapa de confirmação manual só pra essa parte.",
          ],
        ],
      },
      { type: "h3", text: "Um exemplo de como isso soa na conversa" },
      {
        type: "p",
        content: [
          "Alguém confirma interesse em agendar. Em vez de responder \"vou verificar e te retorno\", o agente já consulta a agenda conectada e responde: \"",
          { text: "tenho horário quinta às 10h ou sexta às 15h, qual fica melhor pra você?", bold: true },
          "\". A pessoa escolhe, o agente confirma, e o compromisso já aparece na agenda real — sem ninguém do time precisar abrir nada manualmente depois.",
        ],
      },
      { type: "h2", text: "Testando antes de confiar de olhos fechados" },
      {
        type: "p",
        content: [
          "Antes de lançar, vale simular um agendamento de teste completo — do interesse até a confirmação — pra garantir que o horário realmente aparece na agenda certa. Isso entra no mesmo roteiro de ",
          { text: "testes antes do lançamento", href: "/blog/como-testar-agente-de-ia-antes-de-colocar-no-ar" },
          " que vale rodar em qualquer configuração nova.",
        ],
      },
      { type: "h2", text: "Onde isso faz mais diferença" },
      {
        type: "p",
        content: [
          "Negócios com volume alto de agendamento — como ",
          { text: "clínicas", href: "/blog/agente-de-ia-para-clinica-medica" },
          " e prestadores de serviço — sentem o maior ganho aqui, porque o gargalo de copiar horário manualmente pra uma agenda separada é o que mais consome tempo do time nesse tipo de operação.",
        ],
      },
      {
        type: "cta",
        lead: "Quer que o agendamento feche o ciclo sem depender de ninguém confirmar manualmente?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "O agente consegue agendar sozinho, sem intervenção manual?",
        answer:
          "Sim, com a integração de agenda configurada, ele consulta disponibilidade real e reserva o horário dentro da própria conversa.",
      },
      {
        question: "Como configurar essa integração numa plataforma self-service?",
        answer:
          "Depende da agenda usada e da plataforma escolhida. Com Google Agenda, algumas plataformas (como a Chatflux) já vêm com isso nativo — conectar a conta e definir duração do compromisso já basta, mas vale confirmar, porque não é garantido em qualquer ferramenta. Com outra agenda, depende dela ter uma API e a plataforma permitir construir uma integração customizada em cima dela.",
      },
      {
        question: "O que fazer se a empresa usa uma agenda diferente do Google?",
        answer:
          "Verificar se esse sistema tem API pública. Se tiver, dá pra construir uma integração customizada (na Chatflux, via código customizado); se não tiver API, a integração direta não é possível, e a alternativa costuma ser sincronizar com o Google Agenda ou manter uma confirmação manual só nessa etapa.",
      },
      {
        question: "Vale testar o agendamento antes de lançar?",
        answer:
          "Sim, simular um agendamento de teste completo garante que o horário realmente aparece na agenda certa, antes de qualquer cliente real usar essa função.",
      },
      {
        question: "Que tipo de negócio sente mais diferença com agendamento integrado?",
        answer:
          "Negócios com volume alto de agendamento, como clínicas e prestadores de serviço, onde o gargalo manual de marcar horário é o que mais consome tempo do time.",
      },
      {
        question: "O agente responde na hora com horário disponível, ou só depois?",
        answer:
          "Na hora — ele consulta a agenda conectada e já responde com opções reais de horário dentro da própria conversa, em vez de dizer que vai verificar e retornar depois.",
      },
    ],
  },

  {
    slug: "como-acompanhar-desempenho-agente-de-ia-metricas",
    cluster: "como-criar",
    title: "Como acompanhar o desempenho do seu agente de IA (métricas que importam)",
    metaDescription:
      "Além de saber se o agente está no ar, é preciso saber se ele está performando. Veja quais métricas acompanhar, e o que fazer quando algo foge do esperado.",
    keyword: "metricas agente de ia desempenho",
    date: "2026-09-09",
    destino: { label: "Plataforma Chatflux", href: "/plataforma" },
    relatedSlugs: [
      "como-testar-agente-de-ia-antes-de-colocar-no-ar",
      "erros-comuns-automatizar-atendimento-com-ia",
      "agencia-de-ia-ou-plataforma-self-service-comparacao",
    ],
    intro:
      "\"O agente está funcionando\" e \"o agente está performando bem\" são coisas diferentes — o primeiro só confirma que ele responde; o segundo exige olhar números reais. Um dashboard de métricas resolve isso, mas só se alguém realmente olhar pra ele com regularidade.",
    body: [
      { type: "h2", text: "As métricas que valem acompanhar toda semana" },
      {
        type: "ul",
        items: [
          [
            { text: "Conversas iniciadas: ", bold: true },
            "quantas pessoas realmente começaram uma conversa, pra entender o volume real que o agente está lidando.",
          ],
          [
            { text: "Taxa de resposta: ", bold: true },
            "quantas mensagens do cliente efetivamente receberam uma resposta útil, não uma falha silenciosa.",
          ],
          [
            { text: "Agendamentos realizados: ", bold: true },
            "quantas conversas viraram compromisso marcado — o indicador mais direto de resultado comercial.",
          ],
          [
            { text: "Transferências pra humano: ", bold: true },
            "quantas vezes e por quê, pra identificar se algum motivo se repete e merece entrar na base de conhecimento.",
          ],
        ],
      },
      {
        type: "callout",
        text: "Um dashboard de métricas em tempo real, com filtro por período, só gera valor se vira hábito — revisar uma vez e nunca mais voltar é quase o mesmo que não ter métrica nenhuma.",
      },
      { type: "h2", text: "O que fazer quando um número foge do esperado" },
      {
        type: "p",
        content: [
          "Se a taxa de resposta cai, é sinal de revisar se apareceu algum tipo de pergunta nova que a base não cobre. Se as transferências pra humano aumentam muito num tipo específico de situação, vale considerar se aquele cenário merece um ",
          { text: "ajuste na base de conhecimento ou nas instruções", href: "/blog/como-testar-agente-de-ia-antes-de-colocar-no-ar" },
          ", em vez de continuar escalando manualmente pra sempre.",
        ],
      },
      { type: "h2", text: "Cruzando as métricas com o Kanban" },
      {
        type: "p",
        content:
          "Numa plataforma com Kanban integrado, cada etapa do funil também vira um dado — quantos leads travam num ponto específico, por exemplo, é um sinal tão importante quanto o número absoluto de conversas. Essa automação nos dois sentidos (ação na conversa move o Kanban, e vice-versa) ajuda a enxergar onde o funil realmente está travando, não só se o agente está \"funcionando\".",
      },
      { type: "h2", text: "Métrica não substitui revisão de conversa real" },
      {
        type: "p",
        content: [
          "Números mostram o quê, mas não sempre o porquê — vale complementar a métrica com uma leitura periódica de conversas reais, principalmente as que geraram transferência ou abandono. É esse hábito que ",
          { text: "separa uma implementação que melhora com o tempo de uma que fica estagnada", href: "/blog/agencia-de-ia-ou-plataforma-self-service-comparacao" },
          ", seja ela self-service ou não.",
        ],
      },
      {
        type: "cta",
        lead: "Quer acompanhar tudo isso num painel pensado pra facilitar essa rotina?",
        label: "Conhecer a Plataforma Chatflux",
        href: "/plataforma",
      },
    ],
    faq: [
      {
        question: "Quais métricas de um agente de IA vale acompanhar toda semana?",
        answer:
          "Conversas iniciadas, taxa de resposta, agendamentos realizados e transferências pra humano — cada uma revela um aspecto diferente da performance.",
      },
      {
        question: "O que fazer quando a taxa de resposta cai?",
        answer:
          "Revisar se apareceu algum tipo de pergunta nova que a base de conhecimento ainda não cobre, e atualizar a partir disso.",
      },
      {
        question: "Um dashboard de métricas sozinho já garante um bom agente?",
        answer:
          "Não, só se alguém realmente olhar pra ele com regularidade e agir sobre o que encontra — métrica sem revisão periódica não muda nada sozinha.",
      },
      {
        question: "Vale revisar conversas reais além de olhar números?",
        answer:
          "Sim, métricas mostram o quê, mas não sempre o porquê — revisar conversas reais, principalmente as que geraram transferência, complementa o que o número sozinho não explica.",
      },
    ],
  },
];
