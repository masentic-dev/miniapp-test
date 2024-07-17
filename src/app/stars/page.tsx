"use client";
import React, { useState, useEffect } from "react";
import { Box, Text, Grid, Image, Button } from "@chakra-ui/react";
import data from "./products.json";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInvoice } from "@telegram-apps/sdk-react";

export type TProduct = {
  id: number;
  shortName: string;
  description: string;
  price: number;
  image: string;
};

const useCreateInvoiceLink = (invoiceData: any) => {
  return useQuery({
    queryKey: ["createInvoice", invoiceData],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.telegram.org/bot7225340755:AAHHC_ggP9Ji5zBAhDNk6BD3MDdgX4Q9DHQ/createInvoiceLink",
        {
          params: {
            title: invoiceData.title,
            description: invoiceData.description,
            payload: invoiceData.payload,
            currency: invoiceData.currency,
            prices: JSON.stringify(invoiceData.prices),
            chat_id: invoiceData.chatId,
          },
        }
      );
      return response.data;
    },
    enabled: !!invoiceData, // Only run the query when invoiceData is available
  });
};

export default function StarsPage() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" rowGap={5}>
      {data.products.map((p, index) => (
        <ProducCard product={p} key={index} />
      ))}
    </Grid>
  );
}

const ProducCard = ({ product }: { product: TProduct }) => {
  const { image, shortName, description, price } = product;
  const [invoiceData, setInvoiceData] = useState<any>();
  const { data, isLoading, isError, error } = useCreateInvoiceLink(invoiceData);
  const invoice = useInvoice();

  const handleCreateInvoice = () => {
    setInvoiceData({
      title: "coke",
      description: "this is sample test",
      payload: "test",
      currency: "XTR",
      prices: [{ label: "test2", amount: "1" }],
      chatId: "6379748172",
    });
  };

  useEffect(() => {
    if (data && !invoice.isOpened) {
      window.open(data.result);
      invoice.open(data.result, "url").then((status) => {
        // Output: 'paid'
        console.log("status", status);
        return console.log("status", status);
      });
    }
  }, [data]);

  console.log("data", data);

  return (
    <Box>
      <Image w="100px" h="100px" src={image} alt={shortName} />
      <Text>{shortName}</Text>
      <Text>{description}</Text>
      <Text>Stars: {price}</Text>
      <Button onClick={() => handleCreateInvoice()} w="100px" h="30px">
        Buy
      </Button>
    </Box>
  );
};
