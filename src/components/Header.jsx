import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          component={Link}
          to="https://falzzze.github.io/devices-react-mui"
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 5 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component={Link}
          to={"/"}
          variant="h6"
          style={{ textDecoration: "none" }}
          color="inherit"
          sx={{ mr: 5 }}
        >
          Главная
        </Typography>
        <Typography
          component={Link}
          to={"/devices"}
          style={{ textDecoration: "none" }}
          color="inherit"
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Объекты
        </Typography>
        <Button component={Link} to={"/login"} color="inherit">
          Войти
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
