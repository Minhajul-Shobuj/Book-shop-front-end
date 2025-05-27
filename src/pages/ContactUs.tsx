import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavBar from "../components/Home/TopBar/Navbar";
import Footer from "../components/Home/Footer/Footer";

const ContactUs = () => {
  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          background: "#393280",
          color: "#fff",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="h6">
            Have a question or need support? We're here to help!
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  textAlign: "center",
                }}
                gutterBottom
              >
                Send Us a Message
              </Typography>
              <Box
                component="form"
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField label="Subject" variant="outlined" fullWidth />
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  required
                />
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
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  textAlign: "center",
                }}
                gutterBottom
              >
                Contact Information
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <LocationOnIcon sx={{ mr: 2, color: "#ED553B" }} />
                <Typography>
                  123 Book Street, Knowledge City, BK 10101
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <PhoneIcon sx={{ mr: 2, color: "#ED553B" }} />
                <Typography>+1 (800) 123-4567</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ mr: 2, color: "#ED553B" }} />
                <Typography>support@booklover.com</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default ContactUs;
