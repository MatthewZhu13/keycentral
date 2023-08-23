import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import Fire, { auth } from './Fire';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = () => {
    const firebase = new Fire();
    firebase
      .signInWithEmail(email, password)
      .then(userCredential => {
        const uid = userCredential.user.uid;

        // Retrieve the user's role (isAdmin)
        firebase.getUserRole(uid).then(isAdmin => {
          // Navigate to the Main screen with isAdmin value
          navigation.replace('Main', { isAdmin: isAdmin });
        });
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/wrong-password':
            Alert.alert('Error', 'The password is incorrect.');
            break;
          case 'auth/user-not-found':
            Alert.alert('Error', 'No user found with this email address.');
            break;
          default:
            Alert.alert('Error', error.message);
            break;
        }
      });
  };

  const handleForgotPassword = () => {
    const firebase = new Fire();
    firebase.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent successfully.');
      })
      .catch(error => {
        Alert.alert('Error', 'An error occurred while sending the password reset email. Please enter your email address in the box to reset your password.');
        console.error(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry style={styles.input} />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.linkText}>Reset Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    color: '#007BFF',
  },
});
