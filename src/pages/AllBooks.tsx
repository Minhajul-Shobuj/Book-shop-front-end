/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
                          height: 420,
                          background: "#fff",
                          border: "1px solid #EAE8DF",
                          borderRadius: 2,
                          position: "relative",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: 4,
                          },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="60%"
                          image={item?.bookImg}
                          alt={item.title}
                          sx={{
                            objectFit: "contain",
                            p: 2,
                            borderBottom: "1px solid #eee",
                          }}
                        />

                        <CardContent
                          sx={{ textAlign: "left", px: 3, pt: 2, pb: 3 }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="#393280"
                            gutterBottom
                            noWrap
                          >
                            {item.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            <strong>Author:</strong> {item.author}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="textSecondary"
                            gutterBottom
                          >
                            <strong>Price:</strong>{" "}
                            <Typography
                              component="span"
                              fontWeight="bold"
                              color="#ED553B"
                            >
                              ${item.price}
                            </Typography>
                          </Typography>

                          <Typography
                            variant="body2"
                            color={
                              item.stock > 0 ? "success.main" : "error.main"
                            }
                          >
                            <strong>Stock:</strong>{" "}
                            {item.stock > 0
                              ? `${item.stock} available`
                              : "Out of stock"}
                          </Typography>
                        </CardContent>

                        {/* Hover overlay for Add to Cart */}
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
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            opacity: 0,
                            transition: "opacity 0.3s",
                            borderRadius: 2,
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        >
                          <Button
                            variant="contained"
                            disabled={item.stock <= 0}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(item._id);
                            }}
                            sx={{
                              backgroundColor: "#ED553B",
                              color: "#fff",
                              textTransform: "none",
                              fontWeight: "bold",
                              px: 4,
                              py: 1,
                              "&:hover": {
                                backgroundColor: "#d44733",
                              },
                            }}
                          >
                            Add to Cart
                          </Button>
                        </Box>
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
