import MovieList from "./_components/MovieList";
import Search from "./_components/Search";
import Footer from "./_components/Footer"

 export default function Home() {
  return (
    <div className="p-2">
      <Search/>
      <MovieList title="Em Alta 🔥" endpoint="movie/popular"/>
      <MovieList title="Bem Avaliados 🧐" endpoint="movie/top_rated"/>
      <MovieList title="Nos Cinemas 🍿" endpoint="movie/now_playing" />
      <MovieList title="Em Breve 🚀" endpoint="movie/upcoming"/>
      <Footer/>
    </div>
  )
 }