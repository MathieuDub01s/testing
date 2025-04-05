import { StyleSheet, Pressable, TextInput, View , Text} from 'react-native';
import { useState } from 'react';
import { Stack,router } from 'expo-router';

type Personne = {
    nom: string;
    motDePasse: string;
    image: string;  
    son: string;    
    couleur: string;
  };

export default function MonInputTexte() {
    const [texte, setTexte] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (texte.toLocaleLowerCase() == "math" && password == "123") {
          router.replace('/(tabs)/profil');
        }
        else {
          alert('Champs Invalide');
        }
      };

    return (
        <View style={styles.container}>
            <Stack.Screen
            options={{
            title: 'Connexion',
            headerBackVisible: false,
            }}
            />
            <TextInput
                placeholder="Entrez votre nom"
                value={texte}
                onChangeText={setTexte}
                style={styles.inputs}
            />
            <TextInput
                placeholder="Mot de passe"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={styles.inputs}
            />
            <Pressable
            onPress={handleLogin}
            style={({ pressed }) => ({
            backgroundColor: pressed ? '#aaa' : '#007AFF',
            padding: 12,
            borderRadius: 8,
            })}
        >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
                Se connecter
            </Text>
      </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        width: 300,
    },
});