// import React from "react";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { Image } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from "../Home";
// import CategoriesScreen from "../Categories";
// import FilterScreen from "../ServiceProviderFilterPopup";
// import { Images } from "../../theme/images";
// import { Colors } from "../../theme/colors";
// import { Fonts } from "../../Constants";

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}> {/* Wrap entire navigation structure */}
//       <NavigationContainer>
//         <Tab.Navigator
//           tabBarOptions={{
//             labelStyle: {
//               color: Colors.primary_clr,
//               fontSize: 10,
//               fontFamily: Fonts.LEXEND_DECA_REGULAR
//             }
//           }}
//         >
//           <Tab.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{
//               tabBarIcon: ({ focused }) => (
//                 <Image
//                   source={focused ? Images.home_selected : Images.home}
//                   style={{ width: 24, height: 24 }}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="Categories"
//             component={CategoriesScreen}
//             options={{
//               tabBarIcon: ({ focused }) => (
//                 <Image
//                   source={focused ? Images.categories_selected : Images.categories}
//                   style={{ width: 24, height: 24 }}
//                 />
//               ),
//             }}
//           />
//           <Tab.Screen
//             name="About"
//             component={HomeScreen}
//             options={{
//               tabBarIcon: ({ focused }) => (
//                 <Image
//                   source={focused ? Images.about_selected : Images.about}
//                   style={{ width: 24, height: 24 }}
//                 />
//               ),
//             }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }

// export default TabNavigator;
