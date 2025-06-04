import { Link, useParams } from "react-router-dom";
import { useGetAllbooksQuery } from "../redux/features/admin/productManagement.api";
import NavBar from "../components/Home/TopBar/Navbar";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addToCart } from "../redux/features/cart/CartSlice";
import { useCurrentUser } from "../redux/features/auth/AuthSlice";
import Footer from "../components/Home/Footer/Footer";

const BookByCategory = () => {
  const { category } = useParams();
  const searchQuery = category ? [{ name: "category", value: category }] : [];
  const { data: bookData, isLoading } = useGetAllbooksQuery(searchQuery);
  const cardItems = bookData?.data;
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  //     const filterQuery: TQueryParam[] = [
  //       { name: "minPrice", value: filters.priceRange[0].toString() },
  //       { name: "maxPrice", value: filters.priceRange[1].toString() },
  //     ];

  //     if (filters.selectedCategories.length) {
  //       filterQuery.push({
  //         name: "categories",
  //         value: filters.selectedCategories.join(","),
  //       });
  //     }

  //     setSearchQuery((prev) => {
  //       const searchTerm = prev?.find((q) => q.name === "searchTerm");
  //       return searchTerm ? [searchTerm, ...filterQuery] : [...filterQuery];
  //     });
  //   };

  //   const handlePageChange = (page: number) => {
  //     setCurrentPage(page);
  //     setSearchQuery((prev) => [
  //       ...(prev || []).filter((q) => q.name !== "page"),
  //       { name: "page", value: page.toString() },
  //     ]);
  //   };

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
      <NavBar />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          background: "#FCECEC",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          overflowX: "hidden",
        }}
      >
        <Box textAlign="center" pt={9}>
          <Typography
            sx={{
              color: "#7A7A7A",
              fontSize: 13,
              fontFamily: "Inter",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: 1.56,
            }}
          >
            Tales for Every Taste
          </Typography>

          <Typography
            sx={{
              color: "#393280",
              fontSize: 48,
              fontFamily: "Inter",
              fontWeight: 600,
              textTransform: "capitalize",
              mb: 1,
            }}
          >
            Your Book Journey Starts Here
          </Typography>
          <Typography
            sx={{
              display: "inline-block",
              mt: 1,
              px: 2.5,
              py: 0.5,
              backgroundColor: "#ED553B",
              color: "#ffffff",
              fontSize: 14,
              fontFamily: "Inter",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              borderRadius: "8px",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Category: {category}
          </Typography>
        </Box>

        <Box display="flex" px={2} pt={4}>
          <Box flexGrow={1} pl={4}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress color="secondary" />
              </Box>
            ) : cardItems?.length === 0 ? (
              <Box textAlign="center" ml={4}>
                <Typography variant="h6" color="text.secondary">
                  No books found. Try a different search.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3} pb={5}>
                {cardItems?.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Link
                      to={`/details/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        sx={{
                          width: "100%",
                          maxWidth: 320,
                          height: 450,
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          border: "1px solid #eee",
                          overflow: "hidden",
                          mx: "auto",
                          display: "flex",
                          flexDirection: "column",
                          transition:
                            "box-shadow 0.3s ease, transform 0.3s ease",
                          position: "relative",
                          "&:hover": {
                            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                            transform: "translateY(-4px)",
                          },
                        }}
                      >
                        {item.stock === 0 && (
                          <Chip
                            label="SOLDOUT"
                            color="error"
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              fontWeight: "bold",
                              borderRadius: "20px",
                              zIndex: 5,
                            }}
                          />
                        )}
                        <Box
                          sx={{
                            height: 320,
                            background: "#fbf1f1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 3,
                            position: "relative",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={item.bookImg}
                            alt={item.title}
                            sx={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              objectFit: "contain",
                              zIndex: 1,
                            }}
                          />
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
                              zIndex: 2,
                              "&:hover": {
                                opacity: 1,
                              },
                            }}
                          >
                            <Button
                              variant="contained"
                              sx={{
                                background: "#ED553B",
                                color: "#fff",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                px: 4,
                                py: 1.5,
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
                        <CardContent
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            py: 2,
                            px: 2,
                          }}
                        >
                          <Typography
                            variant="body1"
                            fontSize={18}
                            fontWeight={500}
                            sx={{ mb: 0.5 }}
                          >
                            {item?.title}
                          </Typography>

                          <Typography
                            variant="h6"
                            fontSize={20}
                            fontWeight={700}
                            sx={{ color: "#ED553B" }}
                          >
                            ${item.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default BookByCategory;
