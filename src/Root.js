import React, { Component, Fragment, Suspense } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { App } from './views';
import { Provider as ReduxProvider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import { Web3ReactProvider } from '@web3-react/core';

import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <GlobalStyles />
              <Suspense fallback={<Fragment />}>
                <App />
              </Suspense>
            </MuiThemeProvider>
          </BrowserRouter>

          <ReduxToastr
            timeOut={2000}
            newestOnTop={false}
            preventDuplicates
            position="bottom-right"
            getState={state => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar={false}
            closeOnToastrClick
          />
        </ReduxProvider>
      </Web3ReactProvider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
