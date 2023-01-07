import React from 'react';
import { loginUserType } from '../../../types';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './LoginForm.scss';
import { Button, TextField } from '@material-ui/core';

const LoginForm = ({ loginInfo, handleLogin, handleFieldChange }) => {
  const onSubmit = () => {
    if (handleLogin) {
      handleLogin(loginInfo);
    }
  };

  const { t } = useTranslation();

  return (
    <div className="loginModule">
      <form>
        <h2>Login Form</h2>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleFieldChange}
          placeholder={t('login.email_placeholder_text')}
          value={loginInfo.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleFieldChange}
          placeholder={t('login.password_placeholder_text')}
          value={loginInfo.password}
        />
        <hr />
        <div className="btnLogin">
          <Button onClick={onSubmit}>Login</Button>
        </div>
      </form>
    </div>
  );
};

const { func } = PropTypes;

LoginForm.propTypes = {
  handleLogin: func.isRequired,
  handleFieldChange: func.isRequired,
  loginInfo: loginUserType.isRequired,
};

export default LoginForm;
