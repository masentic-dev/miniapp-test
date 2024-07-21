"use client";
import React, { useMemo } from "react";
import { Box, Text, Grid, Image } from "@chakra-ui/react";
import { BuyButton } from "./BuyButton";
import data from "./products.json";
import { type DisplayDataRow } from "@/components/DisplayData/DisplayData";
import { useInitData, type User } from "@telegram-apps/sdk-react";

function getUserID(user: User): string | undefined {
  return user.id.toString() ?? undefined;
}

export type TProduct = {
  id: number;
  shortName: string;
  description: string;
  price: number;
  image: string;
};

export default function StarsPage() {
  const initData = useInitData();

  const userId = useMemo<string | undefined>(() => {
    return initData && initData.user ? getUserID(initData.user) : undefined;
  }, [initData]);

  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" rowGap={5}>
        {data.products.map((p, index) => (
          <ProducCard product={p} userId={userId ?? ""} key={index} />
        ))}
      </Grid>
    </Box>
  );
}

const ProducCard = ({
  product,
  userId,
}: {
  product: TProduct;
  userId: string;
}) => {
  const { image, shortName, description, price } = product;

  return (
    <Box>
      <Image w="100px" h="100px" src={image} alt={shortName} />
      <Text>{shortName}</Text>
      <Text>{description}</Text>
      <Text>Stars: {price}</Text>
      <BuyButton
        invoiceData={{
          title: "coke",
          description: "this is sample test",
          payload: "test",
          currency: "XTR",
          prices: [{ label: "test2", amount: "1" }],
          chatId: userId,
        }}
      />
    </Box>
  );
};
