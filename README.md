📘 README – Gerador de Redações com IA
📌 Descrição
-Este projeto é uma aplicação web que permite gerar redações dissertativas com inteligência artificial, com base em temas informados pelo usuário. -O objetivo é facilitar o desenvolvimento de textos argumentativos, especialmente voltados para estudantes.

-A aplicação combina um front-end leve com um back-end em Python (Flask) que se conecta à API do modelo Gemini, da Google, para gerar textos de forma automatizada e responsiva.

🎯 Objetivo
-Auxiliar estudantes na construção de redações.

-Estimular o uso responsável de inteligência artificial na educação.

-Praticar integração entre front-end, back-end e serviços de IA externos.

-Servir como exemplo de projeto completo no curso Técnico em Desenvolvimento de Sistemas.
-
🛠️ Tecnologias Utilizadas
-Python 3.x

-Flask e Flask-CORS

-JavaScript (puro)

HTML + TailwindCSS

-dotenv (gerenciamento de variáveis de ambiente)

-google-genai (integração com a API Gemini)

🧠 Sobre a Geração com IA
-O modelo utilizado é o Gemini 2.0 Flash, que gera textos com base em prompts estruturados. O sistema:

-Solicita uma redação com base em temas fornecidos.

-Gera um texto com introdução, desenvolvimento e conclusão.

-Retorna o conteúdo em formato JSON para fácil exibição no front-end.

-Ignora ou alerta o usuário caso temas ofensivos sejam detectados.

📁 Estrutura do Projeto
-bash
-Copiar
-Editar
📦 gerador-redacoes
├── app.py           # Back-end em Flask
├── .env             # Chave da API do Gemini (NÃO versionar)
├── index.html       # Interface de usuário
├── script.js        # Lógica do front-end (envio e resposta da IA)
└── README.md        # Documentação do projeto
🧩 Possibilidades de Expansão
✅ Selecionar tipo de redação (ENEM, vestibular, criativa)

✅ Exportar a redação em PDF ou .docx

✅ Contador de palavras

✅ Detecção de plágio (API externa)

✅ Histórico de redações geradas por usuário (com login)

✅ Integração com banco de dados (SQLite, Firebase, etc.)

⚠️ Considerações Importantes
-A IA pode gerar textos variados para os mesmos temas.

-O conteúdo gerado deve ser revisado por um humano, especialmente para fins avaliativos.

-O uso da chave da API deve ser feito de forma segura (nunca expor publicamente).

-O sistema é apenas um apoio educacional, não substitui a escrita manual.

📄 Licença
-Este projeto é de uso educacional e experimental.
-Você pode utilizá-lo livremente, mas é responsável pelo uso ético da IA e pela proteção da chave da API.