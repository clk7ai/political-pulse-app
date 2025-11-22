import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Title, Text, HelperText } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[0-9]{10,}$/.test(phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!role.trim()) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.replace('MainApp');
    }, 1500);
  };

  return (
    <LinearGradient
      colors={['#2196F3', '#1976D2']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Title style={styles.logo}>🎓</Title>
          <Title style={styles.title}>Join Political Pulse</Title>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
            error={!!errors.fullName}
          />
          {errors.fullName && <HelperText type="error">{errors.fullName}</HelperText>}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
            error={!!errors.email}
          />
          {errors.email && <HelperText type="error">{errors.email}</HelperText>}

          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
            error={!!errors.phone}
          />
          {errors.phone && <HelperText type="error">{errors.phone}</HelperText>}

          <TextInput
            label="Role/Position"
            value={role}
            onChangeText={setRole}
            mode="outlined"
            style={styles.input}
            placeholder="e.g., Booth President, District Secretary"
            left={<TextInput.Icon icon="badge-account" />}
            error={!!errors.role}
          />
          {errors.role && <HelperText type="error">{errors.role}</HelperText>}

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            error={!!errors.password}
          />
          {errors.password && <HelperText type="error">{errors.password}</HelperText>}

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && <HelperText type="error">{errors.confirmPassword}</HelperText>}

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Register
          </Button>

          <View style={styles.loginContainer}>
            <Text>Already have an account? </Text>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  logo: {
    fontSize: 70,
    marginBottom: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#fff'
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5
  },
  input: {
    marginBottom: 8
  },
  button: {
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 16
  },
  linkText: {
    color: '#2196F3',
    fontWeight: 'bold'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  }
});

export default RegisterScreen;
