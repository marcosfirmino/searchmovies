import MovieList from "./_components/MovieList"
import Search from "./_components/Search"
import Footer from "./_components/Footer"
import GenreMovieSection from "./_components/GenreMovieSection"

 export default function Home() {
  return (
    <div className="p-4">
      <Search/>
      <GenreMovieSection/>
      <MovieList title="Em Alta 🔥" endpoint="movie/popular"/>
      <MovieList title="Bem Avaliados 🧐" endpoint="movie/top_rated"/>
      <MovieList title="Nos Cinemas 🍿" endpoint="movie/now_playing" />
      <Footer/>
    </div>
  )
 }