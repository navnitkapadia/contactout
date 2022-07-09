import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
interface NominationBannerProps {
  isOpen: boolean;
  onClose: () => void;
  noOfNomination?: number;
}
const NominationBanner = ({
  isOpen,
  onClose,
  noOfNomination,
}: NominationBannerProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Congratulations</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            minHeight="100px"
            justifyContent="center"
            mt="24px"
            textAlign="center"
          >
            <Heading as="h4" size="md">
              You have nominated {noOfNomination} movies
            </Heading>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NominationBanner;
