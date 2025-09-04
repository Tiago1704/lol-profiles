import React from 'react';
import { useNavigate } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import LogoutIcon from '@mui/icons-material/Logout';
import AlbumIcon from '@mui/icons-material/Album';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout as logoutAction } from '../../features/auth/authSlice';

const useStyles = makeStyles({
  navbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px',
    backgroundColor: '#ff4081',
  },
  iconButton: {
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#d81b60',
    },
  },
});

const Header: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className={classes.navbar}>
      {token ? (
        <>
          <IconButton
            onClick={() => handleNavigation('/dashboard')}
            className={classes.iconButton}
            aria-label="Home"
          >
            <HouseIcon />
          </IconButton>

          <IconButton
            onClick={() => userId && handleNavigation(`/profile/${userId}`)}
            className={classes.iconButton}
            aria-label="Mi Perfil"
          >
            <AccountCircleIcon />
          </IconButton>

          <IconButton
            onClick={() =>
              window.open('https://armador-de-equipos-aquj.vercel.app/', '_blank')
            }
            className={classes.iconButton}
            aria-label="Logout"
          >
            <AlbumIcon />
          </IconButton>

          <IconButton
            onClick={handleLogout}
            className={classes.iconButton}
            aria-label="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => handleNavigation('/register')}
            className={classes.iconButton}
            aria-label="Register"
          >
            <AppRegistrationIcon />
          </IconButton>
          <IconButton
            onClick={() => handleNavigation('/login')}
            className={classes.iconButton}
            aria-label="Login"
          >
            <LoginIcon />
          </IconButton>
        </>
      )}
    </nav>
  );
};

export default Header;
