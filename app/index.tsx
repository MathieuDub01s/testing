import { StyleSheet, Pressable, TextInput, View, Text, Image } from 'react-native';
import { useState } from 'react';
import { Stack, router } from 'expo-router';
import { useContext } from 'react';
import { PersonneContext } from './context/PersonneContext';
import { Dimensions } from 'react-native';

export default function MonInputTexte() {
    const [nom, setNom] = useState('');
    const [password, setPassword] = useState('');
    const screenWidth = Dimensions.get('window').width;
    const logoSize = screenWidth * 0.65;

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
            router.replace('/(tabs)/profil/profil');
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
            <Image 
                source={require('../assets/images/logo.webp')} 
                style={{ width: logoSize, height: logoSize, marginBottom: 24 }} 
            />
            <TextInput
                placeholder="Entrez votre nom"
                value={nom}
                onChangeText={setNom}
                style={styles.inputs}
                placeholderTextColor="#888" 
            />
            <TextInput
                placeholder="Mot de passe"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={styles.inputs}
                placeholderTextColor="#888" 
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
            <View style={styles.footer}>
                <Text style={{fontSize:16}}>
                    Mathieu Dubois, 
                    Kéven B. Boisclair et
                    Rosalie Boyer
                </Text>
                
            </View>

        
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
    footer: {
        position: 'absolute',
        bottom: 20, // ou 0 pour vraiment tout en bas
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'gray',
        height:40,
        padding:10,
        
    },
    
});