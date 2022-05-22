import React, { useState, useEffect } from "react";
import {StyleSheet,View,Text,ScrollView,Image,TouchableOpacity,KeyboardAvoidingView,Linking} from "react-native";
import {Button,Paragraph,Dialog,Portal,Provider,ActivityIndicator} from "react-native-paper";
import {useMoralis} from "react-moralis";
import { useWalletConnect } from "../WalletConnect";
import LottieView from "lottie-react-native";
import Animation from "../lottie.json";
import Popover from 'react-native-popover-view';

const LoginScreen = ({ navigation }) => {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated
  } = useMoralis();

  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const showDialog = () => setIsVisible(true);
  const hideDialog = () => setIsVisible(false);


  const handleCryptoWalletLogin = () => {
    authenticate({ connector })
      .then(() => {
        if (authError) {
          setError(authError.message);
          setIsVisible(true);
        } else {
          if (isAuthenticated) {
            navigation.replace("DrawerNavigationRoutes");
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    isAuthenticated && navigation.replace("DrawerNavigationRoutes");
  }, [isAuthenticated]);

  return (
    <Provider>
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}>
          <Image
            style={{ flex: 1, maxWidth: '100%', alignSelf: 'center' }}
            source={require("../ethereum.png")}
          />
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: "center", backgroundColor: "#4CA987" }}>
                <LottieView source={Animation} style={{ alignItems: "center", backgroundColor: "#4CA987" }} loop autoPlay />
                <Image source={require("../paw.png")} style={{width: "50%", height: 100, resizeMode: "contain", margin: 30}}/>
              </View>

              <View>
                {authError && (
                  <Portal>
                    <Dialog visible={isVisible} onDismiss={hideDialog}>
                      <Dialog.Title>Authentication error:</Dialog.Title>
                      <Dialog.Content>
                        <Paragraph>
                          {authError ? authError.message : ""}
                        </Paragraph>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                )}
                {isAuthenticating && (
                  <ActivityIndicator animating={true} color={"white"} />
                )}
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleCryptoWalletLogin}>
                <Text style={{color: "#FFFFFF", paddingVertical: 10, fontSize: 16, fontWeight: "600"}}>Login into Paw Wallet</Text>
              </TouchableOpacity>
              <Text
                style={styles.infoButton}
                onPress={() =>
                  Linking.openURL("https://www.coindesk.com/learn/your-first-crypto-wallet-how-to-use-it-and-why-you-need-one/")
                }>
                What is a wallet and how to use one?
              </Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4CA987",
    alignContent: "center",
  },
  loginButton: {
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: "#F1AF63",
    color: "#8F375E",
    height: 45,
  },
  infoButton: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
