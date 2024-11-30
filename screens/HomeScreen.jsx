import React, { useState } from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageType, setMessageType] = useState('error'); // 'error' or 'success'
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity for animation

  const showError = (message, type = 'error') => {
    setErrorMessage(message);
    setMessageType(type);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setErrorMessage(''));
      }, 3000);
    });
  };

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      showError('⚠️ Please enter both username and password!');
      return;
    }

    if (username.length < 4) {
      showError('⚠️ Username must be at least 4 characters long!');
      return;
    }

    if (password.length < 6) {
      showError('⚠️ Password must be at least 6 characters long!');
      return;
    }

    // Simulate successful login and reset the form
    showError('✅ Login successful!', 'success');
    setTimeout(() => {
      setUsername('');
      setPassword('');
      navigation.navigate('card', { username });
    }, 1000);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-vector/transportation-merchandise-logistic-cargo-cartoon_18591-52466.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Message Popup */}
      {errorMessage ? (
        <Animated.View
          style={[
            styles.messagePopup,
            messageType === 'error' ? styles.errorPopup : styles.successPopup,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.errorText}>{errorMessage}</Text>
        </Animated.View>
      ) : null}

      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/Tranzo.png')}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>Tranzo Travelers</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              onChangeText={(text) => setUsername(text)}
              value={username}
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
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Sign Up Text */}
          <Text style={styles.signupText}>
            Are you a new user?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('signup')}
            >
              Sign up now.
            </Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
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
    color: '#fff',
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
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#0F3464FF',
  
  },
  messagePopup: {
    position: 'absolute',
    top: 50,
    width: '90%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  errorPopup: {
    backgroundColor: '#FF6B6B',
  },
  successPopup: {
    backgroundColor: '#4CAF50',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
