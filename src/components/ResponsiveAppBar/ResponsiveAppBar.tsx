import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";

interface Route {
  name: string;
  path: string;
  isLogo?: boolean;
}

interface ResponsiveAppBarProps {
  routes: Route[];
}

const StyledAppBar = styled(AppBar)(() => ({
  background: "rgba(0, 0, 0, 0.6)", // Semi-transparent dark background for a modern glassmorphism effect
  backdropFilter: "blur(10px)",
  boxShadow: "none",
}));

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ routes }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar position="sticky" data-testid="responsive-app-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo / Home Button for Desktop */}
          {routes.map((route) =>
            route.isLogo ? (
              <Typography
                key={route.name}
                variant="h6"
                noWrap
                component={RouterLink}
                to={route.path}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  color: "#ffd700",
                  textDecoration: "none",
                }}
                data-testid="home-button"
              >
                {route.name}
              </Typography>
            ) : null
          )}

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                "&:focus": {
                  outline: "none",
                },
                "&.Mui-focusVisible": {
                  outline: "2px solid #ffd700",
                },
              }}
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
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  backdropFilter: "blur(10px)",
                },
              }}
            >
              {routes.map((route) => (
                <MenuItem
                  key={route.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={route.path}
                  data-testid={`${route.name.toLowerCase()}-button`}
                >
                  <Typography textAlign="center" sx={{ color: "#fff" }}>
                    {route.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {routes.map((route) =>
              !route.isLogo ? (
                <Button
                  key={route.name}
                  component={RouterLink}
                  to={route.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "#fff",
                    display: "block",
                    mx: 2,
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                  data-testid={`${route.name.toLowerCase()}-button`}
                >
                  {route.name}
                </Button>
              ) : null
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default ResponsiveAppBar;
