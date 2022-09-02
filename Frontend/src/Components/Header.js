import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import apiConfig from './config';
import AppContext from "./context/appcontext"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';


const pages = ['Home', 'Watchlist', 'About Us'];
const settings = ['Profile', 'Edit Profile', 'Change Password', 'Logout'];



export default function (user) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { state, dispatch } = React.useContext(AppContext);


  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    if (string === null) {

    }
    else {
      for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  //String Avatar 
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const navigate = useNavigate();
  const name = () => {
    return localStorage.getItem('name')
  }
  const logout = () => {
    // if (localStorage.getItem("type") === "google") {
    //   dispatch({type:"LOGOUT"})
    //   localStorage("verification", false)
    //   window.open("http://localhost:3001/auth/logout", "_self")
    // }
    // else {
    localStorage.setItem('verification', "false")
    dispatch({ type: 'LOGOUT' });
    fetch(`${apiConfig.authapi}/logout`, {
      method: "POST"
    }).then(data => data.json()).then(data => {
      // console.log(data)
      if (data.status === 200) {
        // console.log("clearing local storage")
        //delete_cookie();

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem('name');
        localStorage.removeItem('type');



        //console.log(localStorage.getItem("email"))

        //console.log(localStorage("verification"))
        navigate("/")
      }
    })





    // }

  }
  return (
    <AppBar position="static">
      <Container maxWidth="xxl" >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Job-Hunt
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/">
                <Typography textAlign="center" sx={{ color: 'black' }}>Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/watchlist">
                <Typography textAlign="center" sx={{ color: 'black' }}>WatchList</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/careeradvice">
                <Typography textAlign="center" sx={{ color: 'black' }}>Career Advice</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} component={Link} to="/aboutus">
                <Typography textAlign="center" sx={{ color: 'black' }}>About Us</Typography>
              </MenuItem>

            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            className="nav-425"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Job-Hunt
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Button
              component={Link} to="/"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              component={Link} to="/watchlist"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              WatchList
            </Button>
            <Button
              component={Link} to="/careeradvice"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              CareerAdvice
            </Button>
            <Button
              component={Link} to="/aboutus"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              About Us
            </Button>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {
              (state === true && localStorage.getItem("name") !== null && localStorage.getItem("email") !== null) ? <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* {
                    (user!==null)?<img src={user._json.picture} />:<Avatar {...stringAvatar(name())} />
                    } */}

                    <div class="l-username">
                      <span class="f-username">Hi!</span>
                      <span class="m-username">{localStorage.getItem("name")}</span>
                    </div>

                    <Avatar {...stringAvatar(name())} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                    <Typography textAlign="center" sx={{ color: 'black' }}>Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/editprofile">

                    <Typography textAlign="center" sx={{ color: 'black' }}>Edit Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/editpassword">

                    <Typography textAlign="center" sx={{ color: 'black' }}>Change Password</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/">

                    <Typography textAlign="center" onClick={logout} sx={{ color: 'black' }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </div> :
                <div>

                  <IconButton component={Link} to="/login" sx={{ p: 0, color: 'white' }}>
                    Login<LoginIcon sx={{ fontSize: 30, color: 'white' }} />
                  </IconButton>
                </div>
            }

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

