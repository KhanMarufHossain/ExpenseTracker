import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, checkUserSession, logoutUser } from "../Store/authThunks";
import { fetchTransactions } from "../Store/transactionThunks";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  if (user) {
    return (
      <View style={styles.container}>
        <Text>Welcome, {user.name || user.email}</Text>
        <Button title="Logout" onPress={() => dispatch(logoutUser())} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isRegister && (
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button
        title={isRegister ? "Register" : "Login"}
        onPress={() => {
          isRegister
            ? dispatch(registerUser({ email, password, name }))
            : dispatch(loginUser({ email, password }));
          dispatch(fetchTransactions());
        }}
      />
      <Button
        title={isRegister ? "Already have an account? Login" : "No account? Register"}
        onPress={() => setIsRegister((prev) => !prev)}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
  error: { color: "red", marginTop: 10 },
});