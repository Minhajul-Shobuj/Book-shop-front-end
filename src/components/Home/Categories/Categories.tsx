import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../../redux/features/admin/productManagement.api";
import { TCategory } from "../../../types/global";

const CategorySlider = () => {
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  return (
    <Box
      sx={{
        mt: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 10, lg: 2 },
        mb: { xs: 6, md: 10 },
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
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
            mt: 1.5,
          }}
        >
          Explore our Top Categories
        </Typography>
      </Box>
      <style>
        {`
      .swiper-button-next,
      .swiper-button-prev {
        color: #ED553B; 
      }
    `}
      </style>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          1200: { slidesPerView: 4 },
          900: { slidesPerView: 3 },
          600: { slidesPerView: 2 },
          0: { slidesPerView: 1 },
        }}
      >
        {categories?.data?.map((item: TCategory) => (
          <SwiperSlide key={item._id}>
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
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.subtitle}
                </Typography>
              </Paper>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <Link style={{ textDecoration: "none" }} to={"/categories"}>
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
        </Link>
      </Box>
    </Box>
  );
};

export default CategorySlider;
