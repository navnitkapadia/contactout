import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useNominationContext } from '../../context/NominationContext';
import useMoviesList from '../../hooks/useMoviesList';
import { Movie } from '../../services/moviesApi';

interface MoviesListProps {
  movieSearch: string;
}

const MoviesList = ({ movieSearch = '' }: MoviesListProps) => {
  const { moviesList, isMoviesListLoading, setSize } =
    useMoviesList(movieSearch);
  const { nominations, updateNomination, setShowPopup } =
    useNominationContext();

  return (
    <Flex
      flexDir="column"
      padding="24px"
      borderRadius="6px"
      width="100%"
      margin="10px"
      boxShadow="0 .5rem 1rem rgba(0,0,0,.15)"
    >
      <Heading as="h1" size="lg" mb="20px">
        Movie list
      </Heading>
      {!movieSearch && <Flex justifyContent="center">Please search movie</Flex>}
      {movieSearch && <Text fontWeight="500">Results for {movieSearch}</Text>}
      {movieSearch && !isMoviesListLoading && !moviesList.length && (
        <Flex justifyContent="center">No Movies found</Flex>
      )}
      {moviesList?.map((movie: Movie) => {
        return (
          <Flex
            key={movie.imdbID}
            justifyContent="space-between"
            p="10px"
            _hover={{
              bgColor: '#ebebeb',
              padding: '10px',
              borderRadius: '4px',
            }}
          >
            <Box> {movie.Title}</Box>
            <Button
              marginLeft="12px"
              disabled={!!nominations.find((m) => m.imdbID === movie.imdbID)}
              onClick={() => {
                if (nominations.length >= 5) {
                  setShowPopup && setShowPopup(true);
                  return;
                }
                updateNomination && updateNomination(movie);
              }}
            >
              Nominate
            </Button>
          </Flex>
        );
      })}
      <Flex alignItems="center" justifyContent="center">
        {isMoviesListLoading ? (
          <Spinner size={'lg'} m="8px" />
        ) : moviesList?.length ? (
          <Button
            onClick={() => {
              setSize((prevSize) => prevSize + 1);
            }}
          >
            Load more
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default MoviesList;
