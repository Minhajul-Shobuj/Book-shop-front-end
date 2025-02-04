import {
  Box,
  Button,
  IconButton,
  Modal,
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
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";
import {
  removeFromCart,
  updateQuantity,
  useCurrentCart,
} from "../redux/features/cart/CartSlice";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import OrderModal from "./OrderModal";
import { useCurrentUser } from "../redux/features/auth/AuthSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector(useCurrentCart);
  const user = useAppSelector(useCurrentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalPrice = cart.books.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const tableSellStyle: React.CSSProperties = {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
  };

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Typography
          style={{
            textAlign: "center",
            color: "#ED553B",
            fontSize: 48,
            fontFamily: "Inter",
            fontWeight: "600",
            textTransform: "capitalize",
            wordWrap: "break-word",
          }}
          variant="h5"
          sx={{ marginBottom: 4 }}
        >
          <ShoppingCart
            style={{
              color: "#393280",
              fontSize: 48,
              verticalAlign: "middle",
              marginRight: 16,
            }}
          />{" "}
          Your Cart
        </Typography>

        {cart.email !== user?.email || cart.books.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="50vh" // Centers it in the viewport
          >
            <RemoveShoppingCart sx={{ fontSize: 80, color: "red" }} />
            <Typography
              variant="h4"
              sx={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
                mt: 2,
              }}
            >
              Your cart is empty.
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#393280",
                    }}
                  >
                    <TableCell sx={tableSellStyle}>Product</TableCell>
                    <TableCell align="right" sx={tableSellStyle}>
                      Price
                    </TableCell>
                    <TableCell align="right" sx={tableSellStyle}>
                      Quantity
                    </TableCell>
                    <TableCell align="right" sx={tableSellStyle}>
                      Total
                    </TableCell>
                    <TableCell align="right" sx={tableSellStyle}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.books?.map((book) => (
                    <TableRow
                      key={book?.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body1">{book?.name}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        ${book?.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={book?.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              book?.id,
                              parseInt(e.target.value)
                            )
                          }
                          inputProps={{ min: 1 }}
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        ${(book?.price * book?.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleRemoveItem(book?.id)}>
                          <GridDeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ marginTop: 4, textAlign: "right" }}>
              <Typography variant="h6">
                Total: ${totalPrice.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: "#ED553B",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  borderRadius: 2,
                  marginTop: 2,
                  "&:hover": {
                    background: "#ED553B",
                  },
                }}
                onClick={handleOpenModal}
              >
                Proceed to Checkout
              </Button>
            </Box>
            <Modal
              open={isModalOpen}
              onClose={handleCloseModal}
              aria-labelledby="order-details-modal"
              aria-describedby="order-details-description"
            >
              <OrderModal
                cart={cart}
                handleCloseModal={handleCloseModal}
                totalPrice={totalPrice}
                tableSellStyle={tableSellStyle}
                user={user}
              />
            </Modal>
          </>
        )}
      </Box>
    </>
  );
};

export default Cart;
