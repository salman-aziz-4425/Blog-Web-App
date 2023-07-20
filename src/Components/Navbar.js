import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, addAllData } from '../redux/postSlicer';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsersData = useSelector((state) => state.postHandler.allUsersData);

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: 'Arial', fontSize: '1.5rem' }}
          >
            Post Manager
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.setItem('ActiveUser', 0);
              localStorage.setItem('usersData', JSON.stringify(allUsersData));
              dispatch(addUsers(0));
              dispatch(addAllData([]));
              navigate('/');
            }}
            sx={{ fontFamily: 'Arial', fontSize: '1rem', fontWeight: 'bold' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
