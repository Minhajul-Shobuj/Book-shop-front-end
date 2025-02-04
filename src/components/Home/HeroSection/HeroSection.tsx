import React from "react";
import { Paper, Button, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const slideInLeft = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AnimatedImage = styled("img")(() => ({
  animation: `${slideInRight} 1s ease-in-out`,
}));

const AnimatedContent = styled("div")(() => ({
  animation: `${slideInLeft} 1s ease-in-out`,
}));

const carouselItems = [
  {
    title: "Discover New Worlds",
    description:
      "Explore our collection of books and find your next adventure.",
    imgUrl:
      "https://res.cloudinary.com/dazztziwj/image/upload/v1738253716/The%20Great.png",
    buttonText: "Browse Books",
  },
  {
    title: "Best Sellers",
    description: "Check out our top-rated books loved by readers worldwide.",
    imgUrl:
      "https://res.cloudinary.com/dazztziwj/image/upload/v1738544980/Once%20upon%20a%20time.png",
    buttonText: "Shop Now",
  },
];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Carousel
      indicators={false}
      navButtonsAlwaysVisible={true}
      autoPlay={true}
      interval={3000}
      animation="fade"
      navButtonsProps={{
        style: {
          backgroundColor: "white",
          borderRadius: "50%",
          border: "1px solid #ED553B",
          width: "40px",
          height: "40px",
          color: "#ED553B",
          margin: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
      navButtonsWrapperProps={{
        style: {
          top: "calc(50% - 20px)",
          transform: "translateY(-50%)",
          margin: "0 20px",
        },
      }}
    >
      {carouselItems.map((item, index) => (
        <Paper
          key={index}
          sx={{
            padding: 15,
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(79deg, #FFE5E5 11%, #F5FFFE 69%, white 100%)",
          }}
        >
          <AnimatedContent
            style={{
              flex: 1,
              textAlign: "left",
              paddingLeft: "10%",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "#393280",
                fontSize: "3rem",
                marginBottom: 2,
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#7A7A7A",
                fontSize: "1.2rem",
                marginBottom: 4,
              }}
            >
              {item.description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ED553B",
                color: "white",
                fontWeight: "bold",
                padding: "12px 24px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#D8432E",
                },
              }}
              onClick={() => navigate("/books")}
            >
              {item.buttonText}
            </Button>
          </AnimatedContent>
          <AnimatedImage
            src={item.imgUrl}
            alt={item.title}
            style={{
              width: "400px",
              height: "400px",
              borderRadius: "8px",
              objectFit: "cover",
              marginRight: "10%",
            }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default HeroSection;
