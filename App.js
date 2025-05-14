import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Screens/Home';
import ChooseCurrency from './Screens/Currency';
import {Store} from './Store/store.js';
import { Provider } from 'react-redux';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
export default function App() {
  const Stack= createNativeStackNavigator();
  return (
    <Provider store={Store}>
    <NavigationContainer><Stack.Navigator>
      <Stack.Screen name='Currency' component={ChooseCurrency}/>
      <Stack.Screen name= "Home" component={Home}/>
      </Stack.Navigator></NavigationContainer> </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
