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
import { setExpense } from "../Store/CurrencySlice";
import { addTransaction } from "../Store/transactionThunks";

const Expense = () => {
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
    
    
    const expense = (numAmount + parseFloat(currency.expense.number || 0)).toFixed(2);
    
    dispatch(setExpense({number: expense}));
    dispatch(addTransaction({
      amount: numAmount.toFixed(2), 
      message: description, 
      date: currentDate, 
      time: currentTime, 
      isIncome: false
    }));
    
    setAmount('');
    setDescription('');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content" />
      <Title name="Expense Count" style={styles.title} />
      <Text style={styles.instructionText}>Spent :</Text>
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
        <Text style={styles.descriptionTitle}>Expense description</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder="What did you spend on?"
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
          color="#c0392b" 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e74c3c",
    paddingHorizontal: 16,
  },
  title: {
    backgroundColor: "#c0392b",
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

export default Expense;
