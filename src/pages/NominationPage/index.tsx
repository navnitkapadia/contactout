import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import MovieSearch from '../../components/MovieSearch';
import MoviesList from '../../components/MoviesList';
import NominationList from '../../components/NominationList';
const StyledContainer = styled(Box)`
  margin: 6%;
`;

const NominationPage = () => {
  const [movieQuery, setMovieQuery] = useState<string>('');
  const [debounceMovieQuery, setDebounceMovieQuery] = useState('');

  useEffect(() => {
    const debounceJob = debounce(() => {
      setDebounceMovieQuery(movieQuery);
    }, 500);
    debounceJob();
    return () => {
      debounceJob.cancel();
    };
  }, [movieQuery]);

  return (
    <StyledContainer>
      <Flex alignItems="center" justifyContent="center">
        <MovieSearch onSearch={setMovieQuery} movieQuery={movieQuery} />
      </Flex>
      <Flex justifyContent="space-around" mt="24px">
        <MoviesList movieSearch={debounceMovieQuery} />
        <NominationList />
      </Flex>
    </StyledContainer>
  );
};

export default NominationPage;
