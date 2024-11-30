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

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const validateInputs = () => {
    if (!username.trim()) {
      showError('⚠️ Username is required!');
      return false;
    } else if (username.length < 4) {
      showError('⚠️ Username must be at least 4 characters long!');
      return false;
    }

    if (!email.trim()) {
      showError('⚠️ Email is required!');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('⚠️ Please enter a valid email address!');
      return false;
    }

    if (!password.trim()) {
      showError('⚠️ Password is required!');
      return false;
    } else if (password.length < 6) {
      showError('⚠️ Password must be at least 6 characters!');
      return false;
    }

    if (confirmPassword !== password) {
      showError('⚠️ Passwords do not match!');
      return false;
    }

    showError('✅ Registration successful!', 'success');
    return true;
  };

  const handleSignUp = () => {
    if (validateInputs()) {
      setTimeout(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigation.navigate('card', { username }); // Navigate to Card screen and pass username
      }, 1000);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/free-vector/transportation-merchandise-logistic-cargo-cartoon_18591-52466.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Animated Message Popup */}
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
          <Text style={styles.title}>Create Account</Text>

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
              placeholder="Email"
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Sign In Text */}
          <View style={styles.signInContainer}>
  <Text style={styles.signInText}>Already have an account?</Text>
  <TouchableOpacity onPress={() => navigation.navigate('Home')}>
    <Text style={styles.signInLink}> Sign in now.</Text>
  </TouchableOpacity>
</View>
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
  signUpButton: {
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
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 14,
  },
  signInLink: {
    fontWeight: 'bold',
    color: '#0F3464FF',
    fontSize: 14, // Ensure consistent font size
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
