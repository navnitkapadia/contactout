import { forEach } from 'lodash';
import useSWRInfinite from 'swr/infinite';
import { getMovies, Movie } from '../services/moviesApi';

type TPageData = {
  Search: Movie[];
  totalResults: number;
};

interface GetMoviesListFetchApiKeyParams {
  pageIndex: number;
  previousPageData: TPageData | null;
  query: string;
}

const getMovieListFetchApiKey = (config: GetMoviesListFetchApiKeyParams) => {
  const { pageIndex, previousPageData, query } = config;
  if (previousPageData && !previousPageData?.Search?.length) {
    return null;
  }

  return ['movie_list', pageIndex, query];
};

const useMoviesList = (search: string) => {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      return getMovieListFetchApiKey({
        pageIndex,
        previousPageData,
        query: search,
      });
    },
    (...args) => {
      const [, index] = args;
      const pageIndex = Number(index ?? 0) + 1;
      return getMovies(search, pageIndex);
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const moviePaginateData = data ?? [];
  let moviesList: Movie[] = [];

  forEach(moviePaginateData, (item) => {
    const result = item?.Search ?? [];
    moviesList = moviesList.concat(result);
  });

  const lastPaginatedData = moviePaginateData[moviePaginateData?.length - 1];
  const totalCount = lastPaginatedData?.totalResults ?? 0;
  const isReachAtTheEnd = moviesList.length >= totalCount;
  const isMoviesListLoading =
    isValidating && moviePaginateData[size - 1] === undefined;

  return {
    moviesList,
    size,
    setSize,
    totalCount,
    isReachAtTheEnd,
    isMoviesListLoading,
  };
};

export default useMoviesList;
