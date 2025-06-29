import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Button,
  Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Title from "../Components/Title";
import { setIncome } from "../Store/CurrencySlice";
import { addTransaction } from "../Store/transactionThunks"; 
const Income = () => {
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.Currency);

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  
  const buttonhandler = () => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("Invalid Input", "Please enter a positive number.");
      return;
    }
    
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    
    const income = (numAmount + parseFloat(currency.income.number || 0)).toFixed(2);
    
    dispatch(setIncome({number: income}));
    dispatch(addTransaction({
      amount: parseFloat(numAmount), // Ensure this is a float, not a string
      message: description,
      date: currentDate,
      time: currentTime,
      isIncome: true // or false
    }));
    
    setAmount('');
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <Title name="Income Tracker" style={styles.title} />
      <Text style={styles.instructionText}>Add Money to track:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>{currency.code}</Text>
        <TextInput
          style={styles.textInput}
          maxLength={10}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={(text) => setAmount(text)}
          value={amount}
        />
      </View>
        <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Income description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="What's this income for?"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={(text) => setDescription(text)}
          value={description}
          multiline={true}
          maxLength={100}
        />
      </View>
      
      <View style={styles.button}>
        <Button 
          title="Add" 
          onPress={buttonhandler} 
          color="#2E7D32"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
  },
  title: {
    backgroundColor: "#2E7D32",
    borderRadius: 15,
    marginTop: 30,
    marginHorizontal: 30,
    paddingVertical: 18,
    elevation: 4,
  },
  instructionText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 25,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 5,
  },
  textInput: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 50,
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    textAlign: "center",
    minWidth: 150,
    paddingBottom: 8,
  },
  descriptionContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  descriptionInput: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  button: {
    marginTop: 30,
    width: 150,
    height: 100,
    alignSelf: "flex-end",
    marginRight: 30,
  },
});

export default Income;
