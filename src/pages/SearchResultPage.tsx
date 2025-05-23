import { useLocation, Link } from "react-router-dom";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import NavBar from "../components/Home/TopBar/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addToCart } from "../redux/features/cart/CartSlice";
import { useCurrentUser } from "../redux/features/auth/AuthSlice";
import { toast } from "sonner";
import { TBook } from "../types/global";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchResults = location.state?.results || [];
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);

  const handleAddToCart = async (id: string) => {
    const book = searchResults?.find((book: TBook) => book._id === id);
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
      <NavBar />
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          height: "auto",
          background: "#FCECEC",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          overflowX: "hidden",
        }}
      >
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
            Tales for Every Taste
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
            Your Book Journey Starts Here
          </div>
        </div>

        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={2}>
            {searchResults.length > 0 ? (
              searchResults.map((item: TBook, index: number) => (
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
                    <Card
                      sx={{
                        width: 320,
                        height: 450,
                        background: "white",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        border: "1px solid #EAE8DF",
                        borderRadius: 2,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.25)",
                        },
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="60%"
                        style={{
                          padding: "20px",
                          objectFit: "contain",
                        }}
                        image={item?.bookImg}
                        alt={item.title}
                      />
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          padding: "16px",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold", marginBottom: 1 }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ marginBottom: 1 }}
                        >
                          <strong>Author:</strong> {item.author}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ marginBottom: 1 }}
                        >
                          <strong>Price:</strong> ${item.price}
                        </Typography>
                        <Typography
                          variant="body2"
                          color={item.stock > 0 ? "success.main" : "error.main"}
                          sx={{ marginBottom: 2 }}
                        >
                          <strong>Stock:</strong>{" "}
                          {item.stock > 0
                            ? `${item.stock} available`
                            : "Out of stock"}
                        </Typography>
                      </CardContent>
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
                            padding: "12px 24px",
                            borderRadius: 2,
                            "&:hover": {
                              background: "#ED553B",
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
                    </Card>
                  </Link>
                </Grid>
              ))
            ) : (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ padding: 4, textAlign: "center", width: "100%" }}
              >
                No search results found.
              </Typography>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default SearchResultsPage;
