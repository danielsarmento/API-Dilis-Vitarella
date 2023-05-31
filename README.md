# API-Dilis-Vitarella

Api para envio de mensagens utilizando o WhatsApp.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Swagger

## Pré-requisitos

- Node.js (versão 18.16.0): [Link para download](https://nodejs.org)

## Instalação

1. Clone este repositório: `git clone https://github.com/Impulse-Business/API-Dilis-Vitarella.git`
2. Acesse o diretório do projeto: `cd API-Dilis-Vitarella`
3. Instale as dependências: `npm install`

## Configuração

Há a necessidade da configuração do arquivo `.env` com as seguintes variáveis:
1.CELL_PHONE_NUMBER
2.TOKEN_ZENVIA
3.TEMPLATE_ID
4.URL_SEND
5.URL_DILIS

## Estrutura do Projeto

├── src/ # Código-fonte do projeto
│ ├── env/ # Variáveis de ambiente
│ ├── services/ # Serviços da aplicação
│ └── http/ # Utilitários
│   ├── controllers/ # Controladores
│   ├── routes/ # Rotas da API
└──
