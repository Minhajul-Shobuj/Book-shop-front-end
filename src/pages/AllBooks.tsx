/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetAllbooksQuery } from "../redux/features/admin/productManagement.api";
import { Link } from "react-router-dom";
import NavBar from "../components/Home/TopBar/Navbar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addToCart } from "../redux/features/cart/CartSlice";
import { toast } from "sonner";
import { useCurrentUser } from "../redux/features/auth/AuthSlice";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Home/Footer/Footer";

const AllBooks = () => {
  const { data: bookData, isLoading } = useGetAllbooksQuery(undefined);
  const allBooks = bookData?.data;
  console.log(allBooks);
  const [filteredBooks, setFilteredBooks] = useState(allBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const totalPages = bookData?.meta?.totalPage || 1;

  const handleFilterChange = (filters: any) => {
    let result = allBooks;

    // Category filter
    if (filters.selectedCategories?.length) {
      result = result?.filter((book: any) =>
        filters.selectedCategories.includes(book.category)
      );
    }

    // Price range filter
    if (filters.priceRange?.length === 2) {
      const [min, max] = filters.priceRange;
      result = result?.filter(
        (book: any) => book.price >= min && book.price <= max
      );
    }

    setFilteredBooks(result);
    setCurrentPage(1);
  };
  useEffect(() => {
    setFilteredBooks(allBooks);
  }, [allBooks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = async (bookId: string) => {
    const book = allBooks?.find((book) => book._id === bookId);
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
            }}
          >
            Your Book Journey Starts Here
          </Typography>
        </Box>

        <Box display="flex" px={2} pt={4}>
          <Sidebar
            currentPage={currentPage}
            totalPages={totalPages}
            onFilterChange={handleFilterChange}
            onPageChange={handlePageChange}
          />

          <Box flexGrow={1} pl={4}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress color="secondary" />
              </Box>
            ) : filteredBooks?.length === 0 ? (
              <Box textAlign="center" ml={4}>
                <Typography variant="h6" color="text.secondary">
                  No books found. Try a different search.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3} pb={5}>
                {filteredBooks?.map((item, index) => (
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

export default AllBooks;
