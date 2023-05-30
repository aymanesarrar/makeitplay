import { Box, Flex, Text } from "@chakra-ui/react";

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
    <Box
      maxW="sm"
      overflow="hidden"
      borderRadius="lg"
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Box position="relative" h="0" pb="56.25%">
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bgImage={`url(${picture})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        />
      </Box>
      <Box
        p="4"
        position="relative"
        bgGradient="linear(to-t, rgba(0,0,0,0.6), transparent)"
      >
        <Flex flexDirection="column" alignItems="center" mt="2">
          <Text
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            color="white"
            textShadow="1px 1px 2px rgba(0,0,0,0.6)"
            lineHeight="shorter"
          >
            {artist}
          </Text>
          <Text
            fontSize="lg"
            color="white"
            fontWeight="extrabold"
            textAlign="center"
            textShadow="1px 1px 2px rgba(0,0,0,0.6)"
            lineHeight="shorter"
          >
            {name}
          </Text>
        </Flex>
        <Text
          color="white"
          textAlign="center"
          mt="4"
          textShadow="1px 1px 2px rgba(0,0,0,0.6)"
          fontSize="sm"
          fontStyle="italic"
        >
          Added on: {currentDate.toLocaleDateString()}
        </Text>
      </Box>
    </Box>
  );
};
