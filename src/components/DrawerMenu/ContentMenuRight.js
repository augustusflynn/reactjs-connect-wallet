import { IconButton, Menu, MenuItem } from '@material-ui/core';
import React from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';

const ContentMenuRight = ({ logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenuRight = Boolean(anchorEl);
  const handleMenuRight = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRight = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleCloseRight();
  };

  const handleLogout = () => {
    handleCloseRight();
    if (logout instanceof Function) {
      logout();
    }
  };
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuRight}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openMenuRight}
        onClose={handleCloseRight}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
export default ContentMenuRight;
