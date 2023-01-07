import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import './header.scss';
import { pathKeys } from '../../../constants';

const Header = () => {
  const activeStyle = { color: 'white', fontWeight: 'bold' };
  const menuHeader = [
    {
      name: 'Home',
      pathName: pathKeys.ROOT,
    },
    {
      name: 'Login',
      pathName: pathKeys.LOGIN,
    },
    {
      name: 'About',
      pathName: pathKeys.ABOUT,
    },
  ];
  return (
    <AppBar position="static" className="header-wrapper">
      <Toolbar className="toolBar">
        {menuHeader.map((item, index) => {
          if (item.pathName === pathKeys.ROOT) {
            return (
              <NavLink exact to={item.pathName} className="item-menu" activeStyle={activeStyle} key={`${index}`}>
                {item.name}
              </NavLink>
            );
          } else {
            return (
              <NavLink exact to={item.pathName} className="item-menu" activeStyle={activeStyle} key={`${index}`}>
                {item.name}
              </NavLink>
            );
          }
        })}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
