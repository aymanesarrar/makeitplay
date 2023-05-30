import { userId } from "@/lib/state";
import { supabase, SUPABASE_ANON_KEY, SUPABSE_URL } from "@/lib/supabase";
import { fetcher, sendRequest } from "@/lib/utils";
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { CreatePlaylistModal } from "./Modal";
import { UrlModal } from "./UrlModal";
const MakeItLayout = ({
  children,
  picture,
  name,
  token,
}: {
  children: ReactNode;
  picture: string;
  name: string;
  token?: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: SUPABSE_URL,
      supabaseKey: SUPABASE_ANON_KEY,
    })
  );
  const router = useRouter();
  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <Flex
      bgColor="spotify.200"
      minHeight="100vh"
      color="spotify.600"
      flexDirection="column"
    >
      <HStack justifyContent="flex-end" padding="1rem">
        <Menu>
          <MenuButton
            backgroundColor="spotify.300"
            _hover={{ backgroundColor: "spotify.400" }}
            _active={{ backgroundColor: "spotify.400" }}
            as={Button}
            rightIcon={<BiChevronDown />}
          >
            Actions
          </MenuButton>
          <MenuList backgroundColor="spotify.300" border="none">
            <MenuItem
              onClick={handleLogout}
              _hover={{ backgroundColor: "spotify.400" }}
              backgroundColor="spotify.300"
              fontWeight="bold"
            >
              Log Out
            </MenuItem>
            <MenuItem
              _hover={{ backgroundColor: "spotify.400" }}
              backgroundColor="spotify.300"
              fontWeight="bold"
              onClick={onOpen}
            >
              Make it
            </MenuItem>
          </MenuList>
        </Menu>
        <WrapItem>
          <Avatar name={name} src={picture} />
        </WrapItem>
      </HStack>
      <CreatePlaylistModal isOpen={isOpen} onClose={onClose} />
      <UrlModal />
      {children}
    </Flex>
  );
};
export { MakeItLayout as default };
