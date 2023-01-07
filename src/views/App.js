import { Route, Switch } from 'react-router-dom';
import React, { lazy } from 'react';
import { LoginPage, DashboardPage } from '../containers';
import { Header, Loading, ProtectedRoute } from '../components/common';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pathKeys } from '../constants';
import { appActions, loginActions } from '../redux/actions';
import { isEmpty } from '../utils/common';
import { globalKeys } from '../constants';
import { I18nextProvider } from 'react-i18next';
import i18next from '../translations/i18next';
import styled from 'styled-components';
import { DrawerLeft, ModalConnectWallet } from '../components';
import { LAYOUT } from '../constants/common';
const AboutView = lazy(() => import('../views/About/AboutView'));
const HomeView = lazy(() => import('../views/Home/HomeView'));
const NotFoundView = lazy(() => import('../views/NotFound/NotFoundView'));
const AppWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const Layout = ({ layout, props = null, children }) => {
  switch (layout) {
    case LAYOUT.FULLPAGE: {
      return React.createElement(AppWrapper, null, children);
    }
    case LAYOUT.DRAWERLEFT: {
      return React.createElement(DrawerLeft, props, children);
    }
    default: {
      return React.createElement(AppWrapper, null, children);
    }
  }
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      isLoggedIn: false,
    };

    const language = this.props.locale || navigator.language.split(/[-_]/)[0];
    i18next.changeLanguage(language);
    this.checkLogin();
  }

  setRender(isLoggedIn = false) {
    this.setState({ isLoggedIn: isLoggedIn, checked: true });
  }

  checkLogin() {
    this.props.getMemberDetail().then(
      result => {
        if (isEmpty(result) || isEmpty(result.token)) {
          this.setRender(false);
        } else {
          global[globalKeys.AUTH_TOKEN] = result.token;
          this.setRender(true);
        }
      },
      () => {
        this.setRender(false);
      },
    );
  }

  render() {
    const { isLoggedIn } = this.props.loginState;
    const layout = isLoggedIn ? LAYOUT.DRAWERLEFT : LAYOUT.FULLPAGE;
    const { logout } = this.props;
    return (
      <I18nextProvider i18n={i18next}>
        <div>
          <Loading loading={this.props.loading} />
          <ModalConnectWallet isOpenModal={this.props.isOpenModal} toggleModalWallet={this.props.toggleModalWallet} />
          <Layout layout={layout} props={{ logout: logout }}>
            {!isLoggedIn && <Header />}
            <Switch>
              <Route exact path="/" component={HomeView} />
              <Route path={pathKeys.ABOUT} component={AboutView} />
              <Route path={pathKeys.LOGIN} component={LoginPage} />
              <ProtectedRoute path={pathKeys.DASHBOARD} component={DashboardPage} isAuthenticated={isLoggedIn} />
              <Route component={NotFoundView} />
            </Switch>
          </Layout>
        </div>
      </I18nextProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    locale: state.localeReducer.locale,
    loading: state.loadingReducer.loading,
    loginState: state.loginReducer,
    isOpenModal: state.loadingReducer.isOpenModalConnectWallet,
  };
};

const mapDispatchToProps = {
  getMemberDetail: loginActions.getMemberDetail,
  logout: loginActions.logout,
  toggleModalWallet: appActions.toggleConnectWalletModal,
};

App.propTypes = {
  locale: PropTypes.string,
  loading: PropTypes.bool,
  getMemberDetail: PropTypes.func.isRequired,
};

App.defaultProps = {
  locale: '',
  loading: false,
  getMemberDetail: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
