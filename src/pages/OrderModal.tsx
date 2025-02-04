/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useMakeOrderMutation } from "../redux/features/order/OrderApi";
import { TResponse } from "../types/global";
import { toast } from "sonner";

const OrderModal = ({
  cart,
  handleCloseModal,
  totalPrice,
  tableSellStyle,
  user,
}: any) => {
  const { control, handleSubmit } = useForm();
  const email = user?.email;
  const [makeOrder] = useMakeOrderMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("...palcing your order");
    const orderData = {
      customer: { ...data },
      products: cart?.books,
      totalPrice,
    };
    try {
      const res = (await makeOrder(orderData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error?.data.message, { id: toastId });
      } else {
        toast.success("Thank's for palcing an Order", { id: toastId });
        handleCloseModal();
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };
  return (
    <>
      <Box
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
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Order Details
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Email:</strong> {email}
        </Typography>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#393280",
                }}
              >
                <TableCell style={tableSellStyle}>Product</TableCell>
                <TableCell style={tableSellStyle} align="right">
                  Price
                </TableCell>
                <TableCell style={tableSellStyle} align="right">
                  Quantity
                </TableCell>
                <TableCell style={tableSellStyle} align="right">
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.books.map((book: any) => (
                <TableRow
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  key={book.id}
                >
                  <TableCell>{book.name}</TableCell>
                  <TableCell align="right">${book.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{book.quantity}</TableCell>
                  <TableCell align="right">
                    ${(book.price * book.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Name is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Your Full Name"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={user?.email}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                value={user?.email}
                disabled
                label="Your Email"
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{
              required: "Address is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Your Address"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="contactNo"
            control={control}
            defaultValue=""
            rules={{
              required: "Contact No is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Your Contact No"
                type="text"
                fullWidth
                variant="outlined"
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "#ED553B",
              color: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: "12px 24px",
              borderRadius: 2,
              "&:hover": {
                background: "#ED553B",
              },
            }}
          >
            Make Your Order
          </Button>
        </form>
        <Typography variant="h6" sx={{ marginTop: 2, textAlign: "right" }}>
          <strong>Total:</strong> ${totalPrice.toFixed(2)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OrderModal;
