/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  RemoveShoppingCart,
} from "@mui/icons-material";

import NavBar from "../components/Home/TopBar/Navbar";
import React, { useState } from "react";
import { useGetMyOrdersQuery } from "../redux/features/order/OrderApi";

const UserDashBoard = () => {
  const [openOrderId, setOpenOrderId] = useState(null);
  const { data, isLoading } = useGetMyOrdersQuery(undefined);
  const orders = data?.data || [];

  const handleToggleProducts = (orderId: any) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  return (
    <>
      <NavBar />
      <Box sx={{ padding: 3 }}>
        <Typography
          style={{
            textAlign: "center",
            color: "#7A7A7A",
            fontSize: 48,
            fontFamily: "Inter",
            fontWeight: "600",
            textTransform: "capitalize",
            wordWrap: "break-word",
          }}
          variant="h4"
          gutterBottom
        >
          YOUR-ORDERS
        </Typography>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : orders.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="50vh"
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
              You have Zeroo Orders.
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ED553B" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Order ID
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Total
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Products
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order: any) => (
                  <React.Fragment key={order._id}>
                    <TableRow>
                      <TableCell
                        sx={{
                          color: "black",
                          fontSize: 15,
                          fontFamily: "Inter",
                          fontWeight: "600",
                        }}
                      >
                        {order._id}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "black",
                          fontSize: 15,
                          fontFamily: "Inter",
                          fontWeight: "600",
                        }}
                      >
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "black",
                          fontSize: 15,
                          fontFamily: "Inter",
                          fontWeight: "600",
                        }}
                      >
                        ${order.totalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "black",
                          fontSize: 15,
                          fontFamily: "Inter",
                          fontWeight: "600",
                        }}
                      >
                        {order.status}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleProducts(order._id)}
                        >
                          {openOrderId === order._id ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={openOrderId === order._id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ backgroundColor: "#393280" }}>
                                  <TableCell
                                    sx={{
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Product
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Quantity
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Price
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.products.map((product: any) => (
                                  <TableRow key={product._id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>
                                      ${product.price.toFixed(2)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default UserDashBoard;
