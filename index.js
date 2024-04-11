/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import React , {useEffect} from 'react';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import Home from './src/screens/Home';
import Categories from './src/screens/Categories';
import ServiceProviderList from './src/screens/ServiceProvidersList';
import ServiceProviderDetails from './src/screens/ServiceProviderDetails';
import ServiceProviderFilterPopup from './src/screens/ServiceProviderFilterPopup';
import TabNavigator from './src/screens/TabNavigator';
import About from './src/screens/About';
import SignUp from './src/screens/Signup';
import Login from './src/screens/Login';

async function bootstrap() {
  await inAppMessaging().setMessagesDisplaySuppressed(true);
}

async function onSetup(user) {
  await setupUser(user);
  // Allow user to receive messages now setup is complete
  inAppMessaging().setMessagesDisplaySuppressed(false);
}

const AppNavigator = () => {
  useEffect(() => {
    bootstrap(); 
  }, []);

  return <App />;
};


messaging().setBackgroundMessageHandler(async remotemessage => {
  console.log('killed state notification message' , remotemessage);
});

AppRegistry.registerComponent(appName, () => AppNavigator);

// const firebaseConfig = {
//     apiKey: "AIzaSyCFECExyq1QY_MkDpdM02bQU5O0hMI8dgw",
//     authDomain: "poc-project-25db5.firebaseapp.com",
//     projectId: "poc-project-25db5",
//     storageBucket: "poc-project-25db5.appspot.com",
//     messagingSenderId: "745324114422",
//     appId: "1:745324114422:web:3464e56f22df3f06ebd7d7",
//     measurementId: "G-TEG6YX8NTH"
//   };

  //const app = initializeApp(firebaseConfig);