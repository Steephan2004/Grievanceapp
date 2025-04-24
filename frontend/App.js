import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  View,
  StyleSheet,
  Text,
} from "react-native";
import MainLogin from "./Screens/MainLogin";
import Login from "./Screens/Login";
import GuestLogin from "./Screens/GuestLogin";
import QueryForm from "./Screens/QueryForm";
import Status from "./Screens/Status";
import Status_admin from "./Screens/Status_admin";
import AdminLogin from "./Screens/AdminLogin"
import { useTranslation } from 'react-i18next';
import './i18n';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

const Stack = createStackNavigator();

const App = () => {
  
  const {t}=useTranslation();  

  return (
    <I18nextProvider i18n={i18n}>
    <NavigationContainer>
     
        <Stack.Navigator initialRouteName="Mainlogin">
          <Stack.Screen
            name="Mainlogin"
            component={MainLogin}
            options={{
              headerShown:false
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "",
              headerStyle: { backgroundColor: "#F5FEFD" },
              headerTintColor: "#2ba5be",
              headerTitleStyle: {
                textAlign: "center",
                left: 100,
              },
            }}
          />
          <Stack.Screen
            name="GuestLogin"
            component={GuestLogin}
            options={{
              title: "",
              headerStyle: { backgroundColor: "#F5FEFD" },
              headerTintColor: "#2ba5be",
              headerTitleStyle: {
                textAlign: "center",
                left: 70,
              },
            }}
          />
          <Stack.Screen
            name="QueryForm"
            component={QueryForm}
            options={{
              title: t("Queryform"),
              headerStyle: { backgroundColor: "#F5FEFD" },
              headerTintColor: "#2ba5be",
              headerTitleStyle: {
                textAlign: "center",
                left: 80,
              },
            }}
          />
          <Stack.Screen
            name="Status"
            component={Status}
            options={{
              title: t("status"),
              headerStyle: { backgroundColor: "#F5FEFD" },
              headerTintColor: "#2ba5be",
              headerTitleStyle: {
                textAlign: "center",
                left: 80,
              },
            }}
          />
          <Stack.Screen
            name="Status_admin"
            component={Status_admin}
            options={{
              title: t("admin"),
              headerStyle: { backgroundColor: "#F5FEFD" },
              headerTintColor: "#2ba5be",
              headerTitleStyle: {
                textAlign: "center",
                left: 80,
              },
            }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLogin}
            options={{
              title: t("adminLog"),
              headerStyle: { backgroundColor: "#F5FEFD" },
              headerTintColor: "#2ba5be",
              headerTitleStyle: {
                textAlign: "center",
                left: 80,
              },
            }}
          />
        </Stack.Navigator>
    
    </NavigationContainer>
    </I18nextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});

export default App;
