import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

function AboutScreen() {
 
  const openURL = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>About Wallet</Text>
        
        <Text style={styles.sectionTitle}>App Version</Text>
        <Text style={styles.text}>1.0.1</Text>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.text}>
          Wallet helps you manage your personal finances by tracking
          your expenses and earnings. Keep an eye on your spending habits and
          take control of your financial health. This app Holds Memory persistence and in-app updates. But the user sync will be here in no time... Stay with Us. Peace💟
        </Text>
        
        <Text style={styles.sectionTitle}>Developer</Text>
        <Text style={styles.text}>Khan Maruf Hossain</Text>
        
        <Text style={styles.sectionTitle}>Contact</Text>
        <Text style={styles.text}>Email - khan.hossain.242@northsouth.edu</Text>
        
       
        <View style={styles.linkContainer}>
          <Text style={styles.linkLabel}>LinkedIn - </Text>
          <TouchableOpacity 
            onPress={() => openURL('https://www.linkedin.com/in/khan-maruf-hossain-3b42b4347/')}>
            <Text style={styles.linkText}>
              Khan Maruf Hossain
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF9800", 
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', 
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkLabel: {
    fontSize: 16,
    color: 'white',
  },
  linkText: {
    fontSize: 16,
    color: '#00BFFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  }
});

export default AboutScreen;