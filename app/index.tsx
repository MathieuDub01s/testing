import { StyleSheet, Pressable, TextInput, View, Text } from 'react-native';
import { useState } from 'react';
import { Stack, router } from 'expo-router';
import { useContext } from 'react';
import { PersonneContext } from './context/PersonneContext';

export default function MonInputTexte() {
    const [nom, setNom] = useState('');
    const [password, setPassword] = useState('');

    const context = useContext(PersonneContext);
    if (!context) throw new Error('Contexte Personne non trouvé');
    const { personne, setPersonne } = context;
    
    const changerNom = () => {
        setPersonne(prev => ({ ...prev, nom: nom }));
      };
      const changerMP = () => {
        setPersonne(prev => ({ ...prev, motDePasse: password }));
      };
      const changerCouleur = () => {
        setPersonne(prev => ({ ...prev, couleur: "#fff" }));
      };
      const changerImage = () => {
        setPersonne(prev => ({
            ...prev,
            image: require('../assets/images/pfp-base.jpg'), 
          }));          
      };      
    const handleLogin = () => {
        if (nom.toLocaleLowerCase() == "math" && password == "123") {
            changerNom();
            changerMP();
            changerCouleur();
            changerImage();
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
                value={nom}
                onChangeText={setNom}
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