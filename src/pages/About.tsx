import { Box, Typography, Container, Grid, Paper, Button } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavBar from "../components/Home/TopBar/Navbar";
import Footer from "../components/Home/Footer/Footer";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          background: "#393280",
          color: "#fff",
          py: 10,
          textAlign: "center",
          pt: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Discover Your Next Favorite Book
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            At <strong>Book Lover</strong>, we're passionate about stories that
            inspire and connect us.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ED553B",
              color: "white",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#D8432E",
              },
            }}
            onClick={() => navigate("/books")}
          >
            Browse Our Collection
          </Button>
        </Container>
      </Box>

      {/* Mission & Features */}
      <Container maxWidth="lg" sx={{ mt: -10, mb: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: "#fff",
              }}
            >
              <LocalLibraryIcon
                fontSize="large"
                sx={{
                  color: "#393280",
                }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Massive Selection
              </Typography>
              <Typography variant="body2">
                Choose from thousands of books in every genre – fiction,
                non-fiction, academic, and more.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: "#fff",
              }}
            >
              <EmojiObjectsIcon
                fontSize="large"
                sx={{
                  color: "#393280",
                }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Inspired Curation
              </Typography>
              <Typography variant="body2">
                Curated collections, personalized recommendations, and seasonal
                picks to help you find the perfect read.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper
              elevation={6}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: "#fff",
              }}
            >
              <FavoriteIcon
                fontSize="large"
                sx={{
                  color: "#393280",
                }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Community Values
              </Typography>
              <Typography variant="body2">
                Support independent authors and eco-conscious packaging. Every
                purchase supports a bigger cause.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Final CTA */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight="medium" gutterBottom>
            Ready to start your reading journey?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Explore our bestsellers, staff picks, and exclusive deals today.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ED553B",
              color: "white",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#D8432E",
              },
            }}
            onClick={() => navigate("/books")}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;
