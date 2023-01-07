import { connectorsByName } from 'utils/connector';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  URI_AVAILABLE,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import * as React from 'react';
import { useEagerConnect, useInactiveListener } from 'hooks';
import { Modal } from '@material-ui/core';
import { Spinner } from 'components/common/index';
import { MetaMaskFunctions } from 'utils';
import chains from 'constants/chains';
import { isMobile } from 'utils/common';

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

function ModalConnectWallet({ isOpenModal, toggleModalWallet }) {
  const context = useWeb3React();
  const {
    connector,
    library,
    // chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    console.log('running');
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  React.useEffect(() => {
    const REQUIRED_CHAIN = chains.find(chain => chain.chainId === process.env.REACT_APP_NETWORK_ID);
    if (error && error instanceof UnsupportedChainIdError) {
      MetaMaskFunctions.switchChain('0x' + Number(REQUIRED_CHAIN.chainId).toString(16)).catch(error => {
        if (error.code === 4902) {
          MetaMaskFunctions.addChain({
            chainId: '0x' + REQUIRED_CHAIN.chainId.toString(16),
            chainName: REQUIRED_CHAIN.chainName,
            nativeCurrency: REQUIRED_CHAIN.nativeCurrency,
            rpcUrls: REQUIRED_CHAIN.rpcUrls,
            blockExplorerUrls: REQUIRED_CHAIN.blockExplorerUrls,
          }).catch(err => {
            alert('Cannot add ' + REQUIRED_CHAIN.chainName + ' to your MetaMask');
          });
        }
      });
    }

    return () => {};
  }, [error]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // set up block listener
  // const [blockNumber, setBlockNumber] = React.useState();
  // React.useEffect(() => {
  //   console.log('running')
  //   if (library) {
  //     let stale = false;

  //     console.log('fetching block number!!')
  //     library
  //       .getBlockNumber()
  //       .then(blockNumber => {
  //         if (!stale) {
  //           setBlockNumber(blockNumber);
  //         }
  //       })
  //       .catch(() => {
  //         if (!stale) {
  //           setBlockNumber(null);
  //         }
  //       });

  //     const updateBlockNumber = blockNumber => {
  //       setBlockNumber(blockNumber);
  //     };
  //     library.on("block", updateBlockNumber);

  //     return () => {
  //       library.removeListener("block", updateBlockNumber);
  //       stale = true;
  //       setBlockNumber(undefined);
  //     };
  //   }
  // }, [library, chainId]);

  // fetch eth balance of the connected account
  // const [ethBalance, setEthBalance] = React.useState();
  // React.useEffect(() => {
  //   console.log('running')
  //   if (library && account) {
  //     let stale = false;

  //     library
  //       .getBalance(account)
  //       .then(balance => {
  //         if (!stale) {
  //           setEthBalance(balance);
  //         }
  //       })
  //       .catch(() => {
  //         if (!stale) {
  //           setEthBalance(null);
  //         }
  //       });

  //     return () => {
  //       stale = true;
  //       setEthBalance(undefined);
  //     };
  //   }
  // }, [library, account, chainId]);

  // log the walletconnect URI

  React.useEffect(() => {
    console.log('running');
    const logURI = uri => {
      console.log('WalletConnect URI', uri);
    };
    connectorsByName.WalletConnect.on(URI_AVAILABLE, logURI);

    return () => {
      connectorsByName.WalletConnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  return (
    <Modal
      open={isOpenModal}
      onClose={() => toggleModalWallet()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <div
          style={{
            display: 'grid',
            gridGap: '1rem',
            gridTemplateColumns: '1fr 1fr',
            maxWidth: '20rem',
            margin: 'auto',
          }}
        >
          {Object.keys(connectorsByName).map(name => {
            const currentConnector = connectorsByName[name];
            const activating = currentConnector === activatingConnector;
            const connected = currentConnector === connector;
            const disabled = !triedEager || !!activatingConnector || connected || !!error;

            return (
              <button
                style={{
                  height: '3rem',
                  borderRadius: '1rem',
                  borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                  cursor: disabled ? 'unset' : 'pointer',
                  position: 'relative',
                }}
                disabled={disabled}
                key={name}
                onClick={() => {
                  if (name === 'Injected' && isMobile.any()) {
                    let DappUrl = window.origin.replace('https://', '');
                    window.open(`https://metamask.app.link/dapp/${DappUrl}`, '_blank');
                  } else {
                    setActivatingConnector(currentConnector);
                    activate(connectorsByName[name]);
                  }
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    margin: '0 0 0 1rem',
                  }}
                >
                  {activating && <Spinner color={'black'} style={{ height: '25%', marginLeft: '-1rem' }} />}
                  {connected && (
                    <span role="img" aria-label="check">
                      ✅
                    </span>
                  )}
                </div>
                {name}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {(active || error) && (
            <button
              style={{
                height: '3rem',
                marginTop: '2rem',
                borderRadius: '1rem',
                borderColor: 'red',
                cursor: 'pointer',
              }}
              onClick={() => {
                deactivate();
              }}
            >
              Deactivate
            </button>
          )}

          {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
        </div>

        <hr style={{ margin: '2rem' }} />

        <div
          style={{
            display: 'grid',
            gridGap: '1rem',
            gridTemplateColumns: 'fit-content',
            maxWidth: '20rem',
            margin: 'auto',
          }}
        >
          {!!(library && account) && (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                library
                  .getSigner(account)
                  .signMessage('👋')
                  .then(signature => {
                    window.alert(`Success!\n\n${signature}`);
                  })
                  .catch(error => {
                    window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''));
                  });
              }}
            >
              Sign Message
            </button>
          )}
          {connector === connectorsByName.WalletConnect && (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                cursor: 'pointer',
              }}
              onClick={() => {
                connector.close();
              }}
            >
              Kill WalletConnect Session
            </button>
          )}
          {/*
        {!!(connector === network && chainId) && (
          <button
            style={{
              height: "3rem",
              borderRadius: "1rem",
              cursor: "pointer"
            }}
            onClick={() => {
              connector.changeChainId(chainId === 1 ? 4 : 1);
            }}
          >
            Switch Networks
          </button>
        )}
        {connector === fortmatic && (
          <button
            style={{
              height: "3rem",
              borderRadius: "1rem",
              cursor: "pointer"
            }}
            onClick={() => {
              connector.close();
            }}
          >
            Kill Fortmatic Session
          </button>
        )}
        {connector === portis && (
          <>
            {chainId !== undefined && (
              <button
                style={{
                  height: "3rem",
                  borderRadius: "1rem",
                  cursor: "pointer"
                }}
                onClick={() => {
                  connector.changeNetwork(chainId === 1 ? 100 : 1);
                }}
              >
                Switch Networks
              </button>
            )}
            <button
              style={{
                height: "3rem",
                borderRadius: "1rem",
                cursor: "pointer"
              }}
              onClick={() => {
                connector.close();
              }}
            >
              Kill Portis Session
            </button>
          </>
        )}
        {connector === torus && (
          <button
            style={{
              height: "3rem",
              borderRadius: "1rem",
              cursor: "pointer"
            }}
            onClick={() => {
              connector.close();
            }}
          >
            Kill Torus Session
          </button>
        )} */}
        </div>
      </>
    </Modal>
  );
}

export default ModalConnectWallet;
