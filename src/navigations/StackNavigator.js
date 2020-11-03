import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {navigationRef} from '../components/RootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Easing} from 'react-native';

import Login from '../screens/Login';
// import Logout from '../screens/Logout';
// import AddTodo from '../screens/AddTodo';
// import Todos from '../screens/Todos';
import SplashScreen from '../screens/SplashScreen';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const Stack = createStackNavigator();

class StackNavigator extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            animation="fade"
            screenOptions={{
              animationEnabled: true,
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              ...TransitionPresets.SlideFromRightIOS,
              transitionSpec: {
                open: config,
                close: closeConfig,
              },
            }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />

            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Logout" component={Logout} />
            <Stack.Screen name="AddTodo" component={AddTodo} />
            <Stack.Screen name="Todos" component={Todos} />
            */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default StackNavigator;
