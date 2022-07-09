import { Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';

interface MovieSearchProps {
  onSearch: (query: string) => void;
  movieQuery: string;
}
const MovieSearch = ({ movieQuery, onSearch }: MovieSearchProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };
  return (
    <Flex
      flexDir="column"
      padding="10px"
      borderRadius="6px"
      width="100%"
      margin="10px"
      boxShadow="0 .5rem 1rem rgba(0,0,0,.15)"
    >
      <Text mb="8px" fontWeight="500">
        Movie Title
      </Text>
      <Input
        value={movieQuery}
        onChange={handleChange}
        placeholder="Search Movies"
      />
    </Flex>
  );
};

export default MovieSearch;
