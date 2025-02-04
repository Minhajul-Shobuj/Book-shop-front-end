import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";

const cardItems = [
  {
    title: "Fiction",
    description: "This is a description for card 1.",
    imgUrl:
      "https://res.cloudinary.com/dazztziwj/image/upload/v1738537746/jmfevuzyropz4xxcsfjx.jpg",
  },
  {
    title: "Science",
    description: "This is a description for card 2.",
    imgUrl:
      "https://res.cloudinary.com/dazztziwj/image/upload/v1738537747/vheagce4wfpnusmmgwnf.jpg",
  },
  {
    title: "History",
    description: "This is a description for card 3.",
    imgUrl:
      "https://res.cloudinary.com/dazztziwj/image/upload/v1738537597/wvronkj2hc7xxsy1xcyb.jpg",
  },
];

const Categories = () => {
  return (
    <Box
      sx={{
        marginTop: "60px",
        marginInline: { xs: "20px", sm: "40px", md: "80px" },
        marginBottom: "60px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "#ED553B",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 1.4,
            textTransform: "uppercase",
          }}
        >
          Categories
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "#393280",
            fontSize: { xs: 24, sm: 28, md: 32 },
            fontWeight: 700,
            marginTop: 1,
          }}
        >
          Explore our Top Categories
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={4}>
          {cardItems.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  maxWidth: 400,
                  width: "100%",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imgUrl}
                  alt={item.title}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    textAlign: "center",
                    padding: "24px",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                      color: "#393280",
                      fontSize: 24,
                      fontFamily: "Inter",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderRadius: "8px",
            border: "2px solid #393280",
            color: "#393280",
            fontSize: 16,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1.6,
            padding: "12px 24px",
            "&:hover": {
              backgroundColor: "#393280",
              color: "white",
              borderColor: "#393280",
            },
          }}
        >
          View More
        </Button>
      </Box>
    </Box>
  );
};

export default Categories;
