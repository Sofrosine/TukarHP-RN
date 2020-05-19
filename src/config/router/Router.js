import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabRouter} from '@react-navigation/native';
import SplashScreen from '../../containers/pages/SplashScreen';
import Home from '../../containers/pages/Home';
import Testing from '../../containers/pages/Testing';
import Result from '../../containers/pages/Result';
import Choice from '../../containers/pages/Choice';
import Trade from '../../containers/pages/Trade';
import SearchMarket from '../../containers/pages/SearchMarket';
import Market from '../../containers/pages/Market';
import Transaction from '../../containers/pages/Transaction';

const First = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Choice" headerMode="none">
      <Stack.Screen name="Choice" component={Choice} />
      <Stack.Screen name="Trade" component={Trade} />
      <Stack.Screen name="SearchMarket" component={SearchMarket} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="Transaction" component={Transaction} />
    </Stack.Navigator>
  );
};

const Router = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Testing" component={Testing} />
      <Stack.Screen name="Result" component={Result} />

      <Stack.Screen name="First" component={First} />
    </Stack.Navigator>
  );
};

export default Router;
