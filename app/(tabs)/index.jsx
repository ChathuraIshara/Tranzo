import React, { useState } from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-vector/transportation-merchandise-logistic-cargo-cartoon_18591-52466.jpg',
      }} // Replace with your image URL
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/Tranzo.png')} // Path to your image
              style={styles.logo}
              resizeMode="cover" // Fill the circle
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Tranzo Travelers</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="user@gmail.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Text */}
          <Text style={styles.signupText}>
            Are you a new user? <Text style={styles.signupLink}>Sign up now.</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adds a semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    borderRadius: 10,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100, // Adjust the width of the logo as needed
    height: 100, // Adjust the height of the logo as needed
    borderRadius: 50, // Makes the image circular
    borderWidth: 2, // Optional: adds a border around the circle
    borderColor: '#fff', // Optional: border color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F3464FF',
    marginBottom: 30,
    
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  forgotPassword: {
    color: '#ffff',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#0F3464FF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#ffff',
    fontSize: 14,
    marginTop: 20,
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#0F3464FF',
  },
});
