import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/screens/Home';
import Categories from './src/screens/Categories';
import About from './src/screens/About';
import ServiceProviderList from './src/screens/ServiceProvidersList';
import ServiceProviderDetails from './src/screens/ServiceProviderDetails';
import ServiceProviderFilterPopup from './src/screens/ServiceProviderFilterPopup';
import { Colors } from './src/theme/colors';
import { Fonts } from './src/Constants';
import { Images } from './src/theme/images';
import SplashScreen from 'react-native-splash-screen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ServiceProviderList" component={ServiceProviderList} />
      <Stack.Screen name="ServiceProviderDetails" component={ServiceProviderDetails} />
      <Stack.Screen name="ServiceProviderFilterPopup" component={ServiceProviderFilterPopup} />
    </Stack.Navigator>
  );
};

const CategoriesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Categories" component={Categories} />
    </Stack.Navigator>
  );
};

const AboutStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          color: Colors.primary_clr,
          fontSize: 10,
          fontFamily: Fonts.LEXEND_DECA_REGULAR,
          marginVertical:5
        },
        tabBarStyle:{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius:20,
          borderBottomLeftRadius:20,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          position: 'absolute',
          overflow: 'hidden',
          minHeight:60,
          height:'auto',
        },
        tabBarIconStyle:{
          marginTop:15,
          marginBottom:10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? Images.home_selected : Images.home}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? Images.categories_selected : Images.categories}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? Images.about_selected : Images.about}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() =>{
    if(Platform.OS === 'android'){
      SplashScreen.hide();
    }
  }, [])
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
          <TabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
