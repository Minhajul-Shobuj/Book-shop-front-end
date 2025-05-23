/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import NavBar from "../components/Home/TopBar/Navbar";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../redux/features/admin/productManagement.api";

const AllCategories = () => {
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  return (
    <>
      <NavBar />
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
            Explore our All Categories
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <Grid container spacing={4}>
            {categories?.data?.map((item: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={item._id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Link
                  to={`/categories/${item.title}`}
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    display: "block",
                  }}
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
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AllCategories;
