import React, {useEffect, useMemo, useState} from 'react';
import {useMoralis} from 'react-moralis';
import MoralisDappContext from './context';

function MoralisDappProvider({children}) {
  const {web3, Moralis, user} = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useMemo(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get('ethAddress'),
      ),
    [web3, user],
  );

  return (
//0x373e5BE61CA80B1eac9696b8A9A7bB438fb643Af
//0xc0bA89aF7C7c98C4Beb2a1f00d2502CF433BFdE0 -: mumbai
//0xc0bA89aF7C7c98C4Beb2a1f00d2502CF433BFdE0 - ethereum
    <MoralisDappContext.Provider
      value={{
        walletAddress: '0x373e5BE61CA80B1eac9696b8A9A7bB438fb643Af',
        //chainId: '0x13881'
        chainId: '0x3',
      }}>
      {children}
    </MoralisDappContext.Provider>

    // <MoralisDappContext.Provider value={{walletAddress, chainId: '0x1'}}>
    //   {children}
    // </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error('useMoralisDapp must be used within a MoralisDappProvider');
  }
  return context;
}

export {MoralisDappProvider, useMoralisDapp};
