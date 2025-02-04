/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import {
  useUpdateBookDescriptionMutation,
  useUpdateBookPriceMutation,
  useUpdateBookStockMutation,
} from "../../../redux/features/admin/productManagement.api";

const UpdateBookModal = ({ handleCloseModal, bookId }: any) => {
  const {
    control: priceControl,
    handleSubmit: handlePriceSubmit,
    formState: { errors: priceErrors },
  } = useForm();

  const {
    control: stockControl,
    handleSubmit: handleStockSubmit,
    formState: { errors: stockErrors },
  } = useForm();
  const {
    control: descriptionControl,
    handleSubmit: handledescriptionSubmit,
    formState: { errors: descriptionError },
  } = useForm();
  const [updateBookPrice] = useUpdateBookPriceMutation();
  const [updateBookStock] = useUpdateBookStockMutation();
  const [updateBookDescription] = useUpdateBookDescriptionMutation();

  const updatePrice: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("...updating price");
    const newPrice = Number(data.price);
    try {
      const res = await updateBookPrice({ bookId, newPrice }).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Successfully updated price", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId });
    }
  };

  const updateStock: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("...updating stock");

    const newStock = Number(data.stock);
    try {
      const res = await updateBookStock({ bookId, newStock }).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Successfully updated stock", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId });
    }
  };
  const updateDescription: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("...updating description");

    const newDescription = data.description;
    try {
      const res = await updateBookDescription({
        bookId,
        newDescription,
      }).unwrap();
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Successfully updated description", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message, { id: toastId });
    }
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        width="100%"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: 600 },
          maxWidth: "100%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          overflow: "auto",
          maxHeight: "90vh",
        }}
      >
        <Box
          component="form"
          onSubmit={handlePriceSubmit(updatePrice)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: "#fafafa",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" mb={2} color="primary">
            Update Price
          </Typography>
          <Controller
            name="price"
            control={priceControl}
            rules={{
              required: "Price is required",
              min: { value: 0, message: "Price must be a positive number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                error={!!priceErrors.price}
                variant="outlined"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Update Price
          </Button>
        </Box>
        <Box
          component="form"
          onSubmit={handleStockSubmit(updateStock)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: "#fafafa",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" mb={2} color="primary">
            Update Stock
          </Typography>
          <Controller
            name="stock"
            control={stockControl}
            rules={{
              required: "Stock is required",
              min: { value: 0, message: "Stock must be a positive number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Stock"
                type="number"
                fullWidth
                error={!!stockErrors.stock}
                variant="outlined"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Update Stock
          </Button>
        </Box>
        <Box
          component="form"
          onSubmit={handledescriptionSubmit(updateDescription)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 2,
            bgcolor: "#fafafa",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h6" mb={2} color="primary">
            Update Description
          </Typography>
          <Controller
            name="description"
            control={descriptionControl}
            rules={{
              required: "Stock is required",
              min: { value: 0, message: "Stock must be a positive number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                type="text"
                fullWidth
                error={!!descriptionError.stock}
                variant="outlined"
              />
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Update Description
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 2, width: "40%" }}
          onClick={handleCloseModal}
        >
          Close
        </Button>
      </Box>
    </>
  );
};

export default UpdateBookModal;
