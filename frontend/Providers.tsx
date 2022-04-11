import React from 'react';
import {MoralisProvider} from 'react-moralis';
import Moralis from 'moralis/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {enableViaWalletConnect} from './Moralis/enableViaWalletConnect';
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from './WalletConnect';
import {Platform} from 'react-native';
import {MoralisDappProvider} from './providers/MoralisDappProvider/MoralisDappProvider';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {
  APP_ID,
  SERVER_URL,
} from '@env';

interface ProvidersProps {
  readonly children: JSX.Element;
}

const appId = APP_ID;
const serverUrl = SERVER_URL;
const environment = 'native';

Moralis.setAsyncStorage(AsyncStorage);

// @ts-ignore
Moralis.enable = enableViaWalletConnect;

const walletConnectOptions: WalletConnectProviderProps = {
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      'rainbow',
      'metamask',
      'argent',
      'trust',
      'imtoken',
      'pillar',
    ],
  },
 
  //renderQrcodeModal: Qrcode,
};

export const Providers = ({children}: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}>
        <MoralisDappProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            {children}
          </ApplicationProvider>
        </MoralisDappProvider>
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
