/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AccountCircle,
  Book,
  Facebook,
  Instagram,
  LinkedIn,
  Person,
  ShoppingCart,
  Twitter,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { logout, useCurrentUser } from "../../../redux/features/auth/AuthSlice";
import { TBook, TQueryParam } from "../../../types/global";
import {
  useGetAllbooksQuery,
  useGetAllCategoriesQuery,
} from "../../../redux/features/admin/productManagement.api";

const pages = [
  { name: "HOME", path: "/" },
  { name: "BOOKS", path: "/books" },
  { name: "CATEGORY", path: "/" },
  { name: "NEW RELEASE", path: "/new-books" },
  { name: "ABOUT US", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];
const settings = ["Profile", "Dashboard", "Logout"];

function NavBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState<
    TQueryParam[] | undefined
  >([]);
  const { data: bookData, isLoading } = useGetAllbooksQuery(searchQuery);
  const { data: categories } = useGetAllCategoriesQuery(undefined);
  const [showResults, setShowResults] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [showMobileSearch, setShowMobileSearch] = React.useState(false);
  const [bookMenuAnchor, setBookMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      dispatch(logout());
    }
    if (setting === "Dashboard") {
      navigate(`/dashboard/${user?.role}`);
    }
    if (setting === "Profile") {
      navigate(`/my-profile`);
    }
  };

  const navItemsStyle: React.CSSProperties = {
    color: "#111111",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    textTransform: "capitalize",
    letterSpacing: 2.16,
    margin: "0 10px",
    textDecoration: "none",
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setSearchQuery([{ name: "searchTerm", value }]);
      setShowResults(true);
    } else {
      setSearchQuery(undefined);
      setShowResults(false);
    }
  };
  const searchData = bookData?.data || [];
  const handleSearchSubmit = () => {
    if (searchData?.length > 0) {
      navigate("/search-results", { state: { results: searchData } });
      setShowResults(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <Box
        sx={{
          width: "100%",
          background: "#393280",
          color: "white",
          px: 2,
          py: 1.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            width: "100%",
          }}
        >
          {/* Contact */}
          <Typography
            sx={{
              mr: { xs: 0, sm: 2 },
              fontSize: { xs: 12, sm: 14, md: 22 },
              fontFamily: "Inter",
              fontWeight: 600,
              letterSpacing: 0.44,
              whiteSpace: "nowrap",
            }}
          >
            +91 8374902234
          </Typography>

          {/* Search box only showed for larger devices */}
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: 500,
              mx: 2,
              display: { xs: "none", md: "block" },
              position: "relative",
            }}
          >
            <TextField
              placeholder="Search by title or author"
              variant="outlined"
              fullWidth
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#393280",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#393280",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#7A7A7A",
                  "&.Mui-focused": {
                    color: "#393280",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  color: "#393280",
                  fontSize: "1rem",
                  fontWeight: 500,
                },
              }}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleSearchSubmit()}>
                      <SearchIcon
                        sx={{
                          color: "#393280",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* showing searchData */}
            {isLoading ? (
              <Box
                sx={{ display: "flex", justifyContent: "center", padding: 4 }}
              >
                <CircularProgress color="secondary" />
              </Box>
            ) : (
              showResults &&
              searchData?.length > 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    boxShadow: 3,
                    borderRadius: 2,
                    mt: 1,
                    zIndex: 1301,
                    width: "100%",
                    maxHeight: 300,
                    overflowY: "auto",
                  }}
                >
                  {searchData?.map((book: TBook) => (
                    <Box
                      key={book._id}
                      sx={{
                        px: 2,
                        py: 1,
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#f9f9f9" },
                      }}
                      onClick={() => {
                        navigate(`/details/${book._id}`);
                        setShowResults(false);
                      }}
                    >
                      <Typography color="text.primary" fontWeight={600}>
                        {book.title}
                      </Typography>
                      <Typography fontSize="0.875rem" color="text.secondary">
                        {book.author}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )
            )}
          </Box>

          {/* Social Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {/* Main Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: "rgb(245, 245, 245)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <NavLink
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  color: "#393280",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Book sx={{ fontSize: 40 }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                      md: "1.75rem",
                    },
                    color: "#ED553B",
                    fontFamily: "Inter",
                    textTransform: "uppercase",
                    textAlign: {
                      xs: "center",
                      md: "left",
                    },
                    mb: { xs: 1, md: 0 },
                  }}
                >
                  BOOK LOVER
                </Typography>
              </Box>
            </NavLink>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "#111111" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page?.name}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.path);
                    }}
                  >
                    <Typography style={navItemsStyle} textAlign="center">
                      {page?.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Nav Items */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pages.map((page, index) => (
                <React.Fragment key={page.name}>
                  {page.name === "CATEGORY" ? (
                    <Box
                      sx={{ position: "relative" }}
                      onMouseEnter={(e) => setBookMenuAnchor(e.currentTarget)}
                      onMouseLeave={() => setBookMenuAnchor(null)}
                    >
                      <Button style={navItemsStyle}>{page.name}</Button>
                      <Menu
                        anchorEl={bookMenuAnchor}
                        open={Boolean(bookMenuAnchor)}
                        onClose={() => setBookMenuAnchor(null)}
                        MenuListProps={{
                          onMouseEnter: () => setBookMenuAnchor(bookMenuAnchor),
                          onMouseLeave: () => setBookMenuAnchor(null),
                        }}
                        sx={{ mt: 1 }}
                      >
                        {categories?.data?.map((cat: any) => (
                          <MenuItem
                            key={cat._id}
                            onClick={() => {
                              navigate(`/categories/${cat.title}`);
                              setBookMenuAnchor(null);
                            }}
                          >
                            {cat.title}
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    <Button
                      style={navItemsStyle}
                      onClick={() => navigate(page?.path)}
                    >
                      {page.name}
                    </Button>
                  )}
                  {index < pages.length - 1 && (
                    <Box
                      sx={{
                        mx: 1.5,
                        height: "20px",
                        width: "1px",
                        backgroundColor: "#111111",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>

            {/* Cart & Icons */}
            <NavLink to={"/my-cart"}>
              <ShoppingCart style={{ color: "#ED553B", marginRight: "15px" }} />
            </NavLink>

            {/* Mobile Search Icon */}
            <IconButton
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "#393280",
              }}
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <SearchIcon />
            </IconButton>

            {/* Auth/Profile */}
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#393280",
                        fontSize: "2rem",
                      }}
                      alt="User Avatar"
                    >
                      <Person />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <NavLink to="/login">
                <AccountCircle style={{ color: "#ED553B" }} />
              </NavLink>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Search Input (Below Navbar) */}
      {showMobileSearch && (
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            px: 2,
            py: 2,
            display: { xs: "block", md: "none" },
            position: "relative",
          }}
        >
          <TextField
            placeholder="Search by title or author"
            variant="outlined"
            fullWidth
            size="small"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderColor: "#E0E0E0",
                },
                "&:hover fieldset": {
                  borderColor: "#393280",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#393280",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#7A7A7A",
                "&.Mui-focused": {
                  color: "#393280",
                },
              },
              "& .MuiOutlinedInput-input": {
                color: "#393280",
                fontSize: "1rem",
                fontWeight: 500,
              },
            }}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleSearchSubmit()}>
                    <SearchIcon
                      sx={{
                        color: "#393280",
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* showing searchData */}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            showResults &&
            searchData?.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#fff",
                  boxShadow: 3,
                  borderRadius: 2,
                  mt: 1,
                  zIndex: 1301,
                  width: "100%",
                  maxHeight: 300,
                  overflowY: "auto",
                }}
              >
                {searchData?.map((book: TBook) => (
                  <Box
                    key={book._id}
                    sx={{
                      px: 2,
                      py: 1,
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f9f9f9" },
                    }}
                    onClick={() => {
                      navigate(`/details/${book._id}`);
                      setShowResults(false);
                    }}
                  >
                    <Typography color="text.primary" fontWeight={600}>
                      {book.title}
                    </Typography>
                    <Typography fontSize="0.875rem" color="text.secondary">
                      {book.author}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )
          )}
        </Box>
      )}
    </>
  );
}

export default NavBar;
