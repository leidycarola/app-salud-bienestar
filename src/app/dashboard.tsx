import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const [usuario, setUsuario] = useState<{ id: string; nombre: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    obtenerUsuario();
  }, []);

  const obtenerUsuario = async () => {
    try {
      const sesion = await AsyncStorage.getItem('@usuario_sesion');
      if (sesion) {
        setUsuario(JSON.parse(sesion));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('@usuario_sesion');
      router.replace('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcome}>¡Hola, {usuario?.nombre || 'Usuario'}!</Text>
        <Text style={styles.idLabel}>Identificador Único (ID):</Text>
        <Text style={styles.idText}>{usuario?.id || 'Sin ID'}</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    alignItems: 'center',
    elevation: 3,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  idLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  idText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#e8f5e9',
    padding: 8,
    borderRadius: 6,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});