import { View, TextInput, StyleSheet, Button, Text, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { useState } from "react";
import { setCurrencyCode } from "../Store/CurrencySlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ChooseCurrency() {
  const [enteredText, setEnteredText] = useState('');
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.Currency);
  const navigation = useNavigation();

  const handleSetCurrency = () => {
    if (enteredText.trim()) {
      dispatch(setCurrencyCode(enteredText));
      navigation.navigate('Home');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Change Currency Code</Text>
        <Text style={styles.subheaderText}>Select the currency you want to use for tracking expenses</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Currency Code:</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., USD,Tk,INR etc."
          onChangeText={(text) => setEnteredText(text)}
          value={enteredText}
          maxLength={3}
          autoCapitalize="none"
        />
        {currency?.code && (
          <Text style={styles.currentCurrency}>
            Current currency: <Text style={styles.currencyCode}>{currency.code}</Text>
          </Text>
        )}
      </View>
      
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleSetCurrency}
      >
        <Text style={styles.buttonText}>Set Currency</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.secondaryButtonText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 40,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginBottom: 8,
  },
  subheaderText: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#424242',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    marginBottom: 15,
  },
  currentCurrency: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
  },
  currencyCode: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#757575',
    fontSize: 16,
  },
});
