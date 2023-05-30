import { playlistUrl } from "@/lib/state";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

export const UrlModal = () => {
  const url = useRecoilValue(playlistUrl);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal isOpen={url.length !== 0} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
};
