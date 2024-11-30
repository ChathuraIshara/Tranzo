import * as React from 'react';
import { HeartCountProvider } from '../../contexts/HeartCountContext';  // Import the HeartCountProvider
import HomeScreen from '../../screens/HomeScreen';
import CardScreen from '../../screens/CardScreen';
import SignUpScreen from '../../screens/signUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // Wrap the navigator with the HeartCountProvider
    <HeartCountProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          component={HomeScreen}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={CardScreen}
          name="card"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={SignUpScreen}
          name="signup"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={CardScreen} />
      </Stack.Navigator>
    </HeartCountProvider>
  );
};

export default App;
