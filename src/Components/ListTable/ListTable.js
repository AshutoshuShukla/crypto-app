import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Button,
  Text,
} from "@chakra-ui/react";

import apiList from "../../Constant/API";

const ListTable = ({ showCryptoSpecificDetails }) => {
  const [listData, setListData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const { marketData } = apiList;

  useEffect(() => {
    axios.get(marketData).then((response) => setListData(response.data));
  }, []);

  const headerTableData = [
    {
      name: "Name",
      current_price: "Price",
      market_cap: "Market Cap",

      high_24h: "Last 24 hour's highest",
      low_24h: "Last 24 hour's lowest",
      price_change_24h: "Price Change",
      price_change_percentage_24h: "Price Change Percentage",
    },
  ];

  return (
    <>
      <div>
        <Text fontSize="3xl">Cryptocurrency Prices by Market Cap</Text>
        <Text fontSize="sm">
          The global cryptocurrency market cap today is $1.28 Trillion,a -6.0%
          change in the last 24 hours.
          {!showMore && (
            <Button
              onClick={() => setShowMore(true)}
              colorScheme="gray"
              size="xs">
              Show More
            </Button>
          )}
          {showMore &&
            `Hide Total cryptocurrency trading volume in the last day is at $265
        Billion. Bitcoin dominance is at 42.7% and Ethereum dominance is at
        18.4%. CoinGecko is now tracking 13,419 cryptocurrencies. Popular trends
        of the industry right now are DeFi and Play to Earn.`}
          {showMore && (
            <Button
              onClick={() => setShowMore(false)}
              colorScheme="gray"
              size="xs">
              Show Less
            </Button>
          )}
        </Text>
      </div>
      <TableContainer maxWidth={1200}>
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          <TableCaption placement={"top"}>
            Crypto Market All Information
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              {Object.values(headerTableData[0]).map((header) => {
                return <Th>{header}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {listData.length !== 0 &&
              listData.map((data) => {
                return (
                  <Tr
                    key={data.id}
                    onClick={() => showCryptoSpecificDetails(data.id)}>
                    <Td>
                      <Center>
                        {data.market_cap_rank}
                        &nbsp;&nbsp;
                        <img src={data.image} width={20} height={20} />
                      </Center>
                    </Td>
                    <Td>{data.name}</Td>

                    <Td>${data.current_price}</Td>
                    <Td>${data.market_cap}</Td>
                    <Td color={"green"}>${data.high_24h}</Td>
                    <Td color={"red"}>${data.low_24h}</Td>
                    <Td>${data.price_change_24h}</Td>
                    <Td
                      style={{
                        color:
                          data.price_change_percentage_24h < 0
                            ? "red"
                            : "green",
                      }}>
                      {data.price_change_percentage_24h}%
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListTable;
