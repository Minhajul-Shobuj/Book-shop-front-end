import { Box, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Home/TopBar/Navbar";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../redux/features/admin/productManagement.api";
import { TCategory } from "../types/global";

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
            {categories?.data?.map((item: TCategory) => (
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
                  <Paper
                    elevation={1}
                    sx={{
                      height: 200,
                      borderRadius: 2,
                      overflow: "visible",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      p: 2,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <Typography fontSize={50} mb={1}>
                      {item.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.subtitle}
                    </Typography>
                  </Paper>
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
