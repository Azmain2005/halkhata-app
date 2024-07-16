import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MyComponent from './Screen/View';
import Add from './Screen/Add';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Update from './Screen/Update';
import ImgLink from './Screen/ImgLink';
import DetailsScreen from "./Screen/DetailsScreen"
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MyComponent} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      swipeEnabled={false}
      tabBarOptions={{
      gestureEnabled: false, // Disable swipe gesture for navigation
    }}>
        <Tab.Screen options={{ headerShown: false }} name="in stock" component={HomeStack} />
        <Tab.Screen options={{ headerShown: false }} name="Update" component={Update} />
        <Tab.Screen options={{ headerShown: false }} name="Add" component={Add} />
        <Tab.Screen options={{ headerShown: false }} name="img import" component={ImgLink} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
