import React from 'react';
import { useTranslation } from 'react-i18next';
import { toastrTypes } from '../../constants';
import { toastr } from 'react-redux-toastr';
import { func } from 'prop-types';
import { Button } from '@material-ui/core';

const DashboardView = props => {
  const { logout } = props;
  const { t } = useTranslation();
  const handleLogOut = () => {
    logout().then(
      resp => {
        console.log('logout ', resp);
      },
      error => {
        toastr.error(toastrTypes.ERROR, error);
        console.warn('LOG OUT ERROR:', error);
      },
    );
  };
  return (
    <div>
      <h1>{t('dashboard.header')}</h1>
      <Button variant="contained" color="primary" onClick={handleLogOut}>
        Logout
      </Button>
    </div>
  );
};

DashboardView.propTypes = {
  logout: func.isRequired,
};

DashboardView.defaultProps = {
  logout: () => {},
};

export default DashboardView;
