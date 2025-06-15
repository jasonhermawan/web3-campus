import { Box, Flex, Image } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

interface IHeaderProps {
  withBorder: boolean;
}

const Header: React.FC<IHeaderProps> = ({ withBorder }) => {
  return (
    <Box
      py="18px"
      className="bg-white-100"
      style={withBorder ? { borderBottom: "solid 1px rgb(237, 237, 237)" } : {}}
    >
      <Flex className="layout" align="center" justify="space-between">
        <Image
          src="/logo.png"
          alt="Web3 Campus Logo"
          h={55}
          w="auto"
          fit="contain"
        />
        <ConnectButton />
      </Flex>
    </Box>
  );
};

export default Header;