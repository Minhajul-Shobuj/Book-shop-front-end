import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import {
  Book,
  Facebook,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#E44D26", color: "white", py: 4, px: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4} textAlign="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              <Book
                sx={{
                  color: "inherit",
                }}
              />
              BookLover
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ maxWidth: 300, mx: "auto" }}>
            Discover a world of knowledge with BookLover. Your go-to place for
            amazing books and stories.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IconButton sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <YouTube />
            </IconButton>
          </Box>
        </Grid>

        {/* Company Section */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontWeight="bold">
            COMPANY
          </Typography>
          {[
            "Home",
            "Books",
            "Category",
            "New Release",
            "About Us",
            "Contact Us",
          ].map((item) => (
            <Typography key={item} variant="body2" sx={{ mt: 1 }}>
              <Link href={item} color="inherit" underline="hover">
                {item}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Important Links */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" fontWeight="bold">
            IMPORTANT LINKS
          </Typography>
          {["Privacy Policy", "FAQs", "Terms of Service"].map((item) => (
            <Typography key={item} variant="body2" sx={{ mt: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                {item}
              </Link>
            </Typography>
          ))}
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2">
          © 2025 BookLover. All Rights Reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link href="#" color="inherit" underline="hover">
            Privacy
          </Link>{" "}
          |{" "}
          <Link href="#" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
