import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'


import { createStore, applyMiddleware } from "redux"
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './stores/root/rootReducer'

import Tabs from './navigation/tabs'

const Stack = createStackNavigator();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const App = () => {

  const [loaded] = useFonts({
    RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf')
  });

  if(!loaded) return null;

  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={'MainLayout'}
        >
          <Stack.Screen 
            name="MainLayout"
            component={Tabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  )
}

export default App;
