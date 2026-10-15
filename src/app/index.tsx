import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function IndexPage() {
  const [nombre, setNombre] = useState('');
  const router = useRouter();

  const handleIngresar = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu nombre o usuario.');
      return;
    }

    try {
      // Genera un ID único para la persona
      const userId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const datosUsuario = {
        id: userId,
        nombre: nombre.trim(),
        fechaRegistro: new Date().toISOString(),
      };

      // Guardar localmente la sesión del usuario
      await AsyncStorage.setItem('@usuario_sesion', JSON.stringify(datosUsuario));
      
      // Navegar hacia el Dashboard
      router.push('/dashboard');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la información del usuario.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Salud y Bienestar</Text>
        <Text style={styles.subtitle}>Lleva el control de tus hábitos diarios</Text>

        <Text style={styles.label}>¿Cuál es tu nombre o usuario?</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Leidy Lizcano"
          placeholderTextColor="#aaa"
          value={nombre}
          onChangeText={setNombre}
        />

        <TouchableOpacity style={styles.button} onPress={handleIngresar}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f9f6',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});