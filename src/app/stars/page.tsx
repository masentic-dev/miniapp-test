"use client";
import React, { useMemo } from "react";
import { Box, Text, Grid, Image } from "@chakra-ui/react";
import { BuyButton } from "./BuyButton";
import data from "./products.json";
import { type DisplayDataRow } from "@/components/DisplayData/DisplayData";
import { useInitData, type User } from "@telegram-apps/sdk-react";

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: "id", value: user.id.toString() },
    { title: "username", value: user.username },
    { title: "photo_url", value: user.photoUrl },
    { title: "last_name", value: user.lastName },
    { title: "first_name", value: user.firstName },
    { title: "is_bot", value: user.isBot },
    { title: "is_premium", value: user.isPremium },
    { title: "language_code", value: user.languageCode },
    { title: "allows_to_write_to_pm", value: user.allowsWriteToPm },
    { title: "added_to_attachment_menu", value: user.addedToAttachmentMenu },
  ];
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

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

  const userId = userRows
    ?.find((user) => user.title === "id")
    ?.value?.toString();

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
