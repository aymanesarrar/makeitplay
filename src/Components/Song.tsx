import { Avatar, Flex, WrapItem, Text } from "@chakra-ui/react";

export const Song = ({
  name,
  artist,
  picture,
  date,
}: {
  name?: string;
  artist?: string;
  picture?: string;
  date?: string;
}) => {
  const currentDate = new Date(date as string);
  return (
    <Flex
      width="full"
      padding="1rem"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex gap="2rem" alignItems="center">
        <WrapItem>
          <Avatar name={artist} src={picture} size="lg" />
        </WrapItem>
        <Flex flexDirection="column">
          <Text fontSize="xl" fontWeight="bold">
            {artist}
          </Text>
          <Text color="spotify.500" fontWeight="extrabold">
            {name}
          </Text>
        </Flex>
      </Flex>
      <Text color="spotify.500">
        added on : {currentDate.toLocaleDateString()}
      </Text>
    </Flex>
  );
};
