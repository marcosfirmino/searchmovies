# 🎬 O Buscador

Um site de filmes desenvolvido com Next.js que consome a API do TMDB para exibir informações completas sobre filmes, incluindo trailers, elenco, recomendações e muito mais. Ideal para quem curte explorar o mundo do cinema com uma interface rápida e moderna.

## 🚀 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)

## 🔧 Funcionalidades

- 🔍 Pesquisa de filmes por nome
- 🎥 Exibição de trailers via YouTube
- 🧑‍🤝‍🧑 Lista de elenco principal
- 📊 Informações detalhadas como orçamento, receita e muito mais!
- 🎞️ Filmes recomendados com base no atual
- 📂 Componentização com carrosséis reutilizáveis

## 🧰 Requisitos para rodar

- Node.js 18+
- npm ou yarn
- Chave da API do TMDB (inserida em um `.env.local`)

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/marcosfirmino/searchmovies.git
cd searchmovies

npm install
# ou
yarn install

Crie um arquivo .env.local na raiz do projeto com sua chave da API:

NEXT_PUBLIC_TMDB_API_KEY=sua_chave_aqui
