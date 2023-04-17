import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex
      minHeight="100vh"
      bgColor="spotify.200"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="spotify.100" />
    </Flex>
  );
};
export default Loading;
