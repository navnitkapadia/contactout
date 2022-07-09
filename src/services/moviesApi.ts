import axios from "axios";

export interface Movie {
  Poster:string;
  Title: string;
  Year: string;
  imdbID: string;
}
const apikey = "477e8b3c";

export interface MovieResponse {
  Search: Movie[];
  totalResults: number;
}

export const getMovies = async (search: string, page:number=1): Promise<MovieResponse> => {
  const url = `https://www.omdbapi.com/?apikey=${apikey}&page=${page}&s=${search}&type=movie`;
   const response =  await axios.get(url);
   return response.data;
}