import React, { useState, useEffect } from "react";
import axios from "axios";
import apiList from "../../Constant/API";
import { Box, Image, Badge, Center } from "@chakra-ui/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

const CoinDetails = ({ coinID }) => {
  const [coinData, setCoinData] = useState("");
  const { coinInfo } = apiList;

  useEffect(() => {
    axios.get(coinInfo + coinID).then((response) => setCoinData(response.data));
  }, []);

  return (
    <>
      <div>
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={coinID}>{coinID}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      {Object.keys(coinData).length !== 0 && (
        <Center style={{ paddingTop: "10%" }}>
          <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={coinData.image.large} alt={"logo"} />

            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {`Rank #${coinData.coingecko_rank}`}
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2">
                  {coinData.coingecko_score} score &bull;{" "}
                  {coinData.community_data.twitter_followers} twitter followers
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                noOfLines={1}>
                {coinData.description.en}
              </Box>

              <Box>
                ${coinData.market_data.current_price.usd}
                <Box as="span" color="gray.600" fontSize="sm">
                  / per coin
                </Box>
              </Box>

              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {parseInt(Math.random() * 1000)} reviews
              </Box>
            </Box>
          </Box>
        </Center>
      )}
    </>
  );
};

export default CoinDetails;
