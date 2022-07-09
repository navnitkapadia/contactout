import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useNominationContext } from '../../context/NominationContext';
import NominationBanner from '../NominationBanner';

interface NominationListProps {}

const NominationList: React.FC<NominationListProps> = ({}) => {
  const { showPopup, setShowPopup, nominations, removeNomination } =
    useNominationContext();
  return (
    <Flex
      flexDir="column"
      padding="24px"
      borderRadius="6px"
      margin="10px"
      width="100%"
      boxShadow="0 .5rem 1rem rgba(0,0,0,.15)"
    >
      <Heading as="h1" size="lg" mb="20px">
        Nominations
      </Heading>
      {nominations.map((movie) => (
        <Flex key={movie.imdbID} justifyContent="space-between" margin="8px 0">
          <Box>{movie.Title}</Box>
          <Button
            marginLeft="12px"
            onClick={() => {
              removeNomination && removeNomination(movie.imdbID);
            }}
          >
            Remove
          </Button>
        </Flex>
      ))}
      <NominationBanner
        isOpen={showPopup}
        noOfNomination={nominations.length}
        onClose={() => {
          setShowPopup && setShowPopup(false);
        }}
      />
    </Flex>
  );
};

export default NominationList;
