import { Mail } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const Subscribe = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FCEBEA",
          padding: { xs: 4, md: 8 },
          textAlign: "center",
          color: "#ED553B",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/pattern.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            opacity: 0.2,
            zIndex: 0,
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Subscribe to Our Newsletter
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#7A7A7A",
              marginBottom: 3,
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            Get the latest book updates, exclusive deals, and exciting literary
            news delivered straight to your inbox.
          </Typography>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: { xs: "100%", sm: "450px" },
              margin: "auto",
              padding: "10px",
              borderRadius: 2,
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="youremail123@gmail.com"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail color="disabled" />
                  </InputAdornment>
                ),
                sx: { paddingLeft: 1 },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ED553B",
                color: "white",
                fontWeight: "bold",
                borderRadius: 1,
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#d94330",
                },
              }}
            >
              SUBSCRIBE
            </Button>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Subscribe;
