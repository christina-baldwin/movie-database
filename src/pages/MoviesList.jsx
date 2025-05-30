// rafce

import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 0.5rem;
  background-color: black;

  @media (min-width: 550px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 570px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 820px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("No network response");
        }
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("There was a problem fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <div>Loading movies...</div>;

  return (
    <MoviesGrid>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          movieTitle={movie.title}
          releaseDate={movie.release_date}
          overview={movie.overview}
          poster={movie.poster_path}
          backdrop={movie.backdrop_path}
          rating={movie.vote_average}
        />
      ))}
    </MoviesGrid>
  );
};

export default MoviesList;
