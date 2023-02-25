import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box
          mr="4"
          textAlign="right"
        >
          <Text>Alfiado Constantino</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            alfiado@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Alfiado Constantino"
        src="https://avatars.githubusercontent.com/u/61153857?v=4"
      />
    </Flex>
  );
}
