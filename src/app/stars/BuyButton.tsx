import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useInvoice } from "@telegram-apps/sdk-react";

type InvoiceData = {
  title: string;
  description: string;
  payload: string;
  currency: string;
  prices: any;
  chatId: string;
};

export const BuyButton = ({ invoiceData }: { invoiceData: InvoiceData }) => {
  const invoice = useInvoice();

  const createInvoiceMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        "https://api.telegram.org/bot7363067639:AAHFz_MysrZbyrLxSF7Bo2EUIJgJMXMN7e8/createInvoiceLink",
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
    onSuccess: (data) => {
      console.log("data on success", data);
      if (!!data && !invoice.isOpened) {
        invoice.open(data.result, "url").then((status) => {
          // Output: 'paid'
          return console.log(status);
        });
      }

      // open the stars payment pop upyarn
      window.open(data.result);
    },
  });

  const handleClick = () => {
    createInvoiceMutation.mutate();
  };

  return (
    <div>
      <button onClick={handleClick} disabled={createInvoiceMutation.isPending}>
        {createInvoiceMutation.isPending
          ? "Creating Invoice..."
          : "Create Invoice"}
      </button>
      {createInvoiceMutation.isError && (
        <div>An error occurred: {createInvoiceMutation.error.message}</div>
      )}
      {createInvoiceMutation.isSuccess && (
        <div>Invoice created successfully!</div>
      )}
    </div>
  );
};
