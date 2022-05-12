import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { ChakraProvider, Button } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import CoinDetails from "./Components/CoinDetails/CoinDetails";
import ListTable from "./Components/ListTable/ListTable";

function App() {
  const [coinID, setCoinID] = useState("");
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const showCryptoSpecificDetails = (id) => {
    setCoinID(id);
  };
  useEffect(() => {
    console.log("coinID", coinID);
    if (coinID !== "") navigate("coinInfo/" + coinID);
  }, [coinID]);
  return (
    <ChakraProvider>
      <div style={{ float: "right", fontSize: "10px" }}>
        <Alert>
          <AlertIcon />
          <AlertTitle>Developed by :</AlertTitle>
          <AlertDescription>Ashutosh Shukla</AlertDescription>
        </Alert>
      </div>
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <ListTable
                showCryptoSpecificDetails={showCryptoSpecificDetails}
              />
            }
          />
          <Route
            path={"coinInfo/" + coinID}
            element={<CoinDetails coinID={coinID} />}
          />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
