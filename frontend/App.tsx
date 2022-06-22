import 'react-native-reanimated'
import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CryptoAuth from "./Components/CryptoAuth";
import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
import Assets from "./Components/Assets/Assets";
import Transfer from "./Components/Transfer/Transfer";
import Learn from "./Components/Learn/Learn";
import Header from "./Components/Graphs/customControls/Header";
import GraphsAssets from "./Components/Graphs/GraphsAssetsMainScreen";
import News from "./Components/Assets/News";
import SendCrypto from './Components/Assets/SendCrypto'

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCoins,
  faUser,
  faChartBar,
  faChalkboardTeacher
} from "@fortawesome/free-solid-svg-icons";

LogBox.ignoreAllLogs();

function Home(): JSX.Element {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#315399"
      barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Assets"
        options={{
          tabBarLabel: "Assets",
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesomeIcon icon={faCoins} color={color} size={20} />;
          },
        }}
        component={Assets}
      />
      <Tab.Screen
        name="Transactions"
        options={{
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCreditCard} color={color} size={20} />
          ),
        }}
        component={RecentTransactions}
      />

      <Tab.Screen
        name="Graphs"
        options={{
          tabBarLabel: "Graphs",
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesomeIcon icon={faChartBar} color={color} size={20} />;
          },
        }}
        component={GraphsAssets}
      />

      <Tab.Screen
        name="Learn"
        options={{
          tabBarLabel: "Learn",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faChalkboardTeacher} color={color} size={20} />
          ),
        }}
        component={Learn}
      />
    </Tab.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={CryptoAuth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={Home}
          options={{ headerTitle: (props) => <Header /> }}
        /> 
        <Stack.Screen
        name="News"
        component={News}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="Send"
        component={SendCrypto}
        options={{ headerTitle: '' }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
