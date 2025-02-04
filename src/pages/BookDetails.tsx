import { useParams } from "react-router-dom";
import { useGetsingleBookQuery } from "../redux/features/admin/productManagement.api";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { addToCart } from "../redux/features/cart/CartSlice";
import { useCurrentUser } from "../redux/features/auth/AuthSlice";
import { toast } from "sonner";
import NavBar from "../components/Home/TopBar/Navbar";

const BookDetails = () => {
  const { bookId } = useParams();
  const { data } = useGetsingleBookQuery(bookId);
  const book = data?.data;
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
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
      <>
        <NavBar />
        <Box
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              maxWidth: 800,
              width: "100%",
              background: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              border: "1px solid #EAE8DF",
              borderRadius: 2,
              padding: 3,
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
              gap: 3,
            }}
          >
            {/* Book Image */}
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", md: "40%" },
                height: "auto",
                borderRadius: 2,
                objectFit: "contain",
              }}
              image={book?.bookImg}
              alt={book?.title}
            />

            {/* Book Details */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {book?.title}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Author:</strong> {book?.author}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Price:</strong> ${book?.price}
              </Typography>
              <Typography
                variant="body1"
                color={(book?.stock ?? 0) > 0 ? "success.main" : "error.main"}
                sx={{ marginBottom: 2 }}
              >
                <strong>Stock:</strong>{" "}
                {(book?.stock ?? 0) > 0
                  ? `${book?.stock} available`
                  : "Out of stock"}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 3 }}>
                <strong>Description:</strong> {book?.description}
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
                  "&:hover": {
                    background: "#ED553B",
                  },
                }}
                disabled={(book?.stock ?? 0) <= 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    </>
  );
};

export default BookDetails;
