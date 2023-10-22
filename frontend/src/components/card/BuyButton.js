import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

const BuyButton = () => {
  const handleBuy = () => {
    // handle buy logic here
  };

  return (
    <ActionButton
      title="Buy"
      icon={<CurrencyBitcoinIcon style={{ color: "white" }} />}
    >
      <Flex direction="column">
        <Button
          variant="darkBrand"
          color="white"
          fontSize="sm"
          fontWeight="500"
          borderRadius="70px"
          px="16px"
          py="5px"
          ml="10px"
          onClick={handleBuy}
        >
          Buy
        </Button>
      </Flex>
    </ActionButton>
  );
};

export default BuyButton;
