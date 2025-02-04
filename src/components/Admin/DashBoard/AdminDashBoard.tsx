import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AddBox as AddBoxIcon,
  LibraryBooks as LibraryBooksIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  ListAlt as ListAltIcon,
} from "@mui/icons-material";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import AddBook from "./AddBook";
import ManageUser from "./ManageUser";
import AllBooks from "../../../pages/AllBooks";
import AdminOrders from "./AdminOrders";

const drawerWidth = 240;
const adminMenuItems = [
  {
    name: "Add Book",
    icon: <AddBoxIcon />,
    path: "add-book",
    component: AddBook,
  },
  {
    name: "Manage Book",
    icon: <LibraryBooksIcon />,
    path: "update-book",
    component: AllBooks,
  },
  {
    name: "Manage User",
    icon: <PeopleIcon />,
    path: "manage-users",
    component: ManageUser,
  },
  {
    name: "Manage Orders",
    icon: <ShoppingCartIcon />,
    path: "manage-orders",
    component: ManageUser,
  },
  {
    name: "Your Orders",
    icon: <ListAltIcon />,
    path: "admin-orders",
    component: AdminOrders,
  },
];

interface Props {
  window?: () => Window;
}

const AdminDashBoard = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        {" "}
        <Typography variant="h6" noWrap>
          <Link style={{ color: "#ED553B", fontWeight: "bolder" }} to={"/"}>
            --HOME--
          </Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {adminMenuItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileOpen(false);
                navigate(`/dashboard/admin/${item.path}`);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <h1>Admin Dashboard</h1>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="admin menu"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
        <Routes>
          {adminMenuItems.map((item) => (
            <Route key={item.path} path={`/dashboard/admin/${item.path}`} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashBoard;
