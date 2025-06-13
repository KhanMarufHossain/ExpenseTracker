import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
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

  useEffect(() => {
    if (user) {
      dispatch(fetchTransactions());
    }
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (user) {
    return (
      <View style={styles.loggedInContainer}>
        <Text style={styles.welcomeText}>Welcome, {user.name || user.email}!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch(logoutUser())}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.formBox}>
        <Text style={styles.title}>{isRegister ? "Create Account" : "Login"}</Text>
        {isRegister && (
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#888"
          />
        )}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#888"
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            isRegister
              ? dispatch(registerUser({ email, password, name }))
              : dispatch(loginUser({ email, password }));
          }}
        >
          <Text style={styles.primaryButtonText}>
            {isRegister ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsRegister((prev) => !prev)}
        >
          <Text style={styles.switchButtonText}>
            {isRegister
              ? "Already have an account? Login"
              : "No account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#222",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#1976D2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  switchButton: {
    marginTop: 18,
    alignItems: "center",
  },
  switchButtonText: {
    color: "#1976D2",
    fontSize: 15,
    fontWeight: "500",
  },
  error: {
    color: "#e53935",
    marginBottom: 8,
    fontSize: 15,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#1976D2",
  },
  loggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});