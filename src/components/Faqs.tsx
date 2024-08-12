import { Container } from "@/components/Container";

const faqs = [
  [
    {
      question: "Como sei se as dicas de tarefas são eficazes?",
      answer:
        "Nossa aplicação depende da eficácia das nossas dicas, por isso garantimos que sejam precisas. Os resultados dos nossos usuários falam por si mesmos, confie em nós.",
    },
    {
      question: "Isso não é um tipo de manipulação de informações?",
      answer:
        "Não, nossas dicas são baseadas em análises e melhores práticas para a gestão de tarefas. A nossa aplicação visa ajudar na organização e eficiência, não na manipulação.",
    },
    {
      question: "Mas não há risco de segurança na gestão de tarefas?",
      answer:
        "Nosso objetivo é fornecer ferramentas e dicas para melhorar a produtividade, não para comprometer a segurança. Estamos aqui para ajudar a gerenciar suas tarefas de forma segura e eficaz.",
    },
  ],
  [
    {
      question:
        "As pessoas que fornecem dicas na aplicação sabem o que estão fazendo?",
      answer:
        "Sim, as dicas são baseadas em práticas recomendadas e feedback de especialistas na área de gerenciamento de tarefas. Cada dica é projetada para ajudar a melhorar sua organização e produtividade.",
    },
    {
      question: "Onde está localizada a nossa aplicação?",
      answer:
        "A nossa aplicação está disponível globalmente, mas garantimos que estamos em conformidade com as regulamentações locais de privacidade e segurança.",
    },
    {
      question: "Há alguma restrição de idade para usar a aplicação?",
      answer:
        "Não há restrição de idade para usar a aplicação. Ela está disponível para qualquer pessoa que deseja melhorar sua organização e gerenciamento de tarefas.",
    },
  ],
  [
    {
      question:
        "Como vocês conseguiram lançar a aplicação nas lojas de aplicativos?",
      answer:
        "Trabalhamos arduamente para atender aos requisitos das lojas de aplicativos e garantir que nossa aplicação ofereça uma experiência excepcional. A aprovação é uma prova de nossa dedicação e qualidade.",
    },
    {
      question:
        "Como explico o uso da aplicação para minha equipe ou supervisores?",
      answer:
        "A aplicação é uma ferramenta de produtividade projetada para melhorar a gestão de tarefas e a eficiência. Se você precisar justificar o uso, destaque como ela ajuda a organizar e priorizar o trabalho.",
    },
    {
      question: "Como posso contribuir para melhorar a aplicação?",
      answer:
        "Entre em contato conosco com suas sugestões e feedback. Valorizamos a contribuição dos nossos usuários para tornar a aplicação ainda melhor e mais eficaz para todos.",
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Se você tiver mais alguma dúvida,{" "}
            <a href="lf.system@outlook.com" className="text-gray-900 underline">
              entre em contato conosco
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-electric-violet-600">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
