import React, { useState } from 'react';
import { LoginForm } from '../../components';
import { object, func } from 'prop-types';
import { common } from '../../utils';
import { toastr } from 'react-redux-toastr';
import { pathKeys, toastrTypes } from '../../constants';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

const LoginView = ({ loginUser, loginManual, loginManualMock, setMemberDetail, getMemberDetail, ...props }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { from } = props.location.state || {
    from: { pathname: pathKeys.LOGIN },
  };
  function onPressLogin(loginInfo) {
    if (validateInputs(loginInfo)) {
      loginManual(loginInfo).then(
        resp => {
          if (resp.success) {
            setMemberDetail(resp.data).then(
              () => {
                props.history.replace(pathKeys.DASHBOARD);
              },
              error => {
                toastr.error(toastrTypes.ERROR, error.message || error);
              },
            );
          } else {
            toastr.error(toastrTypes.ERROR, resp.message);
          }
        },
        error => {
          toastr.error(toastrTypes.ERROR, error);
          console.warn('LOGIN VIEW ERROR:', error);
        },
      );
    }
  }

  function validateInputs({ email, password }) {
    if (!common.validateEmail(email)) {
      toastr.warning(toastrTypes.INVALID, t('login.validate_invalid_email'));
      return false;
    }
    if (common.isEmpty(password)) {
      toastr.warning(toastrTypes.EMPTY, t('login.validate_missing_password'));
      return false;
    }

    return true;
  }

  function handleFieldChange(event) {
    event.preventDefault();
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }

  if (loginUser.isLoggedIn && from.pathname !== pathKeys.LOGIN) {
    return <Redirect to={from} />;
  } else if (loginUser.isLoggedIn) {
    return <Redirect to={{ pathname: pathKeys.ROOT }} />;
  }

  return <LoginForm handleLogin={onPressLogin} handleFieldChange={handleFieldChange} loginInfo={{ email, password }} />;
};

LoginView.propTypes = {
  loginManualMock: func.isRequired,
  loginManual: func.isRequired,
  setMemberDetail: func.isRequired,
  getMemberDetail: func.isRequired,
  loginUser: object.isRequired,
};

LoginView.defaultProps = {
  loginUser: {
    userName: '',
    password: '',
  },
  loginManualMock: () => {},

  loginManual: () => {},
  setMemberDetail: () => {},
  getMemberDetail: () => {},
};

export default LoginView;
