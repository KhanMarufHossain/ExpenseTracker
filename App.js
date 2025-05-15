import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Home from './Screens/Home';
import ChooseCurrency from './Screens/Currency';
import { Store } from './Store/store.js';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


function MainNavigation() {
  const currency = useSelector((store) => store.Currency);
  const initialRoute = currency?.code ? "Home" : "Currency";
  
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#f9f9f9',
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen 
        name="Currency"
        component={ChooseCurrency}
        options={{
          headerShown: false,
          title: "Select Currency"
        }}
      />
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          title: "Expense Tracker",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <MainNavigation />
      </NavigationContainer>
    </Provider>
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
