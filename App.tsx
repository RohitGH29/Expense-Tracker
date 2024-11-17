import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
// Import other screens as you create them
import CategoryDetailScreen from './src/screens/CategoryDetailScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
