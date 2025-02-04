import {
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useGetAllbooksQuery } from "../../../redux/features/admin/productManagement.api";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/features/cart/CartSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/AuthSlice";
import { toast } from "sonner";
const Products = () => {
  const { data } = useGetAllbooksQuery([{ name: "sort", value: "-createdAt" }]);
  const book = data?.data?.slice(0, 4);
  const cardItems = book;
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const handleAddToCart = async (bookId: string) => {
    const book = cardItems?.find((book) => book._id === bookId);

    if (book) {
      dispatch(
        addToCart({
          id: book._id,
          quantity: 1,
          email: user?.email as string,
          name: book.title,
          price: Number(book.price),
        })
      );

      toast.success(`${book.title} added to cart`);
    }
  };
  return (
    <>
      <div style={{ width: "100%", height: "100%", background: "#FCECEC" }}>
        <div>
          <div
            style={{
              paddingTop: "70px",
              textAlign: "center",
              color: "#7A7A7A",
              fontSize: 13,
              fontFamily: "Inter",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: 1.56,
              wordWrap: "break-word",
            }}
          >
            Some quality books
          </div>
          <div
            style={{
              textAlign: "center",
              color: "#393280",
              fontSize: 48,
              fontFamily: "Inter",
              fontWeight: "600",
              textTransform: "capitalize",
              wordWrap: "break-word",
            }}
          >
            New Release Books
          </div>
        </div>
        <div>
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={2}>
              {cardItems?.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Link
                    to={`/details/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingBottom: 2,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 310,
                          height: 430,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "white",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item?.bookImg}
                          alt={item.title}
                          sx={{
                            width: "100%",
                            objectFit: "contain",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "50%",
                            left: "50%",
                            transform: "translate(-50%, 50%)",
                            width: "80%",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              opacity: 0,
                              transition: "opacity 0.3s ease",
                              "&:hover": {
                                opacity: 1,
                              },
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                background: "#ED553B",
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                padding: "10px 0",
                                width: "100%",
                                borderRadius: 1,
                                boxShadow: "none",
                                "&:hover": {
                                  background: "#D84331",
                                },
                              }}
                              disabled={item.stock <= 0}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToCart(item._id);
                              }}
                            >
                              Add to Cart
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                      <CardContent sx={{ textAlign: "center", paddingTop: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: "#393280",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.author}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: "#ED553B", fontWeight: "bold" }}
                        >
                          ${item.price}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Products;
