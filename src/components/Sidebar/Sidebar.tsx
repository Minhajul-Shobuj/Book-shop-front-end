/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Pagination,
  useMediaQuery,
  Divider,
  IconButton,
} from "@mui/material";
import { FilterList, Category, MenuBook, Menu } from "@mui/icons-material";

const categories = ["Fiction", "Non-Fiction", "Biography", "Sci-Fi", "Comics"];

const Sidebar = ({
  currentPage,
  totalPages,
  onFilterChange,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onFilterChange: (filters: any) => void;
  onPageChange: (page: number) => void;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelection);
  };

  const handleFilterApply = () => {
    onFilterChange({ priceRange, selectedCategories });
    if (isMobile) setDrawerOpen(false);
  };

  const sidebarContent = (
    <Box
      sx={{
        p: 3,
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <FilterList sx={{ color: "#ED553B", mr: 1 }} />
        <Typography variant="h6" color="#393280" fontWeight="bold">
          Filter Books
        </Typography>
      </Box>

      <Box mb={2}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Min: ${priceRange[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Max: ${priceRange[1]}
          </Typography>
        </Box>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          sx={{
            color: "#ED553B",
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box mb={3}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Category sx={{ color: "#393280", mr: 1 }} />
          <Typography variant="subtitle1">Categories</Typography>
        </Box>
        <FormGroup>
          {categories.map((cat) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  sx={{ color: "#ED553B" }}
                />
              }
              label={cat}
            />
          ))}
        </FormGroup>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={handleFilterApply}
        sx={{
          backgroundColor: "#ED553B",
          color: "#fff",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#d44733",
          },
          mb: 3,
        }}
      >
        Apply
      </Button>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <MenuBook sx={{ color: "#393280", mr: 1 }} />
        <Typography variant="subtitle1">Pages</Typography>
      </Box>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        sx={{
          ".MuiPaginationItem-root": {
            color: "#393280",
            "&.Mui-selected": {
              backgroundColor: "#ED553B",
              color: "#fff",
            },
          },
        }}
      />
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}
            color="inherit"
          >
            <Menu />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            width: 260,
            borderRight: "1px solid #eee",
            position: "sticky",
            top: 70,
            alignSelf: "flex-start",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
};

export default Sidebar;
