import { List, ListItem, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { MenuLeft } from '../../constants/common';
import { pathKeys } from '../../constants';

const ContentMenuLeft = () => {
  const arrMenuLeft = MenuLeft;
  const activeStyle = { color: 'blue' };
  return (
    <List>
      {arrMenuLeft.map(item => (
        <ListItem button key={item.name}>
          {item.pathName === pathKeys.ROOT ? (
            <NavLink exact to={item.pathName} activeStyle={activeStyle}>
              <ListItemText primary={item.name} />
            </NavLink>
          ) : (
            <NavLink to={item.pathName} activeStyle={activeStyle}>
              <ListItemText primary={item.name} />
            </NavLink>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default ContentMenuLeft;
