import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { logout, useCurrentUser } from "../../../redux/features/auth/AuthSlice";
import {
  AccountCircle,
  Book,
  Facebook,
  Instagram,
  LinkedIn,
  ShoppingCart,
  Twitter,
} from "@mui/icons-material";

const pages = [
  { name: "HOME", path: "/" },
  { name: "BOOKS", path: "/books" },
  { name: "ABOUT US", path: "/" },
  { name: "NEW RELEASE", path: "/new-books" },
  { name: "CONTACT US", path: "/" },
  { name: "BLOG", path: "/" },
];
const settings = ["Profile", "Dashboard", "Logout"];

function NavBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "500",
    textTransform: "capitalize",
    letterSpacing: 2.16,
    margin: "0 10px",
    textDecoration: "none",
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: "#393280",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          color: "white",
        }}
      >
        <Typography
          sx={{
            fontSize: 22,
            fontFamily: "Inter",
            fontWeight: 600,
            letterSpacing: 0.44,
          }}
        >
          +91 8374902234
        </Typography>
        <Box>
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
      <AppBar position="sticky" sx={{ backgroundColor: "rgb(245, 245, 245)" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
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
                  fontSize: "1.5rem",
                  color: "#ED553B",
                  fontFamily: "Inter",
                  textTransform: "uppercase",
                }}
              >
                BOOK LOVER
              </Typography>
            </Box>
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
                  <Button
                    style={navItemsStyle}
                    key={page.name}
                    onClick={() => navigate(page?.path)}
                  >
                    {page.name}
                  </Button>
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
            <NavLink to={"/my-cart"}>
              <ShoppingCart
                style={{
                  color: "#ED553B",
                  marginRight: "15px",
                }}
              />
            </NavLink>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatar"
                      src="https://via.placeholder.com/40"
                    />
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
                {" "}
                <AccountCircle
                  style={{
                    color: "#ED553B",
                  }}
                />
              </NavLink>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
