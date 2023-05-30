import useClient from "@/hooks/useClient";
import { playlistUrl, spotifyUris, userId } from "@/lib/state";
import { fetchLikedSongs } from "@/lib/utils";
import {
  Button,
  FormControl,
  FormLabel,
  VStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const CreatePlaylistModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const id = useRecoilValue(userId);
  const token = useClient();
  const toast = useToast();
  const [newPlaylist, setNewPlaylist] = useState<{
    name: string;
    description: string;
    isPublic: boolean;
  }>({ name: "", description: "", isPublic: false });
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useRecoilState(playlistUrl);
  const createPlaylist = async () => {
    setLoading(true);
    const data: Awaited<ReturnType<typeof fetch>> = await fetch(
      `https://api.spotify.com/v1/users/${id}/playlists`,
      {
        method: "POST",
        body: JSON.stringify({
          name: newPlaylist.name,
          description: newPlaylist.description,
          public: newPlaylist.isPublic,
        }),
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.status === 201) {
      const res = await data.json();
      setUrl(res.href);
      const uris = await fetchLikedSongs(token);
      let addSongs;
      while (uris.length !== 0) {
        addSongs = await fetch(
          `https://api.spotify.com/v1/playlists/${res.id}/tracks`,
          {
            method: "POST",
            body: JSON.stringify({
              uris:
                uris.length > 100
                  ? uris.splice(0, 100)
                  : uris.splice(0, uris.length),
            }),
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      }
      if (addSongs?.status === 201) {
        toast({
          title: "Playlist created.",
          description: "We've created your playlist for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Playlist creation failed",
        description: "We could not create the playlist for you",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md" bg="gray.700">
        <ModalHeader color="white">Create playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color="white">Playlist Name</FormLabel>
              <Input
                value={newPlaylist.name}
                onChange={(e) =>
                  setNewPlaylist({ ...newPlaylist, name: e.target.value })
                }
                placeholder="Enter playlist name"
                size="lg"
                bg="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white">Playlist Description</FormLabel>
              <Input
                value={newPlaylist.description}
                onChange={(e) =>
                  setNewPlaylist({
                    ...newPlaylist,
                    description: e.target.value,
                  })
                }
                placeholder="Enter playlist description"
                size="lg"
                bg="gray.600"
                color="white"
                _placeholder={{ color: "gray.400" }}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="public" mb="0" color="white">
                Public?
              </FormLabel>
              <Switch
                id="public"
                onChange={(e) =>
                  setNewPlaylist({
                    ...newPlaylist,
                    isPublic: e.target.checked,
                  })
                }
                colorScheme="teal"
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            isLoading={loading}
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            onClick={createPlaylist}
          >
            Create Playlist
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export { CreatePlaylistModal };
