import { StyleSheet, Pressable, TextInput, View, Text, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';
import { Stack, router } from 'expo-router';
import { useContext } from 'react';
import { PersonneContext } from './context/PersonneContext';
import { Dimensions } from 'react-native';

export default function MonInputTexte() {
    const [nom, setNom] = useState('');
    const [password, setPassword] = useState('');
    const screenWidth = Dimensions.get('window').width;
    const logoSize = screenWidth * 0.65;
    const screenHeight = Dimensions.get('window').height;

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
            router.replace('/profil');
        }
        else {
            alert('Champs Invalide');
        }
    };

    
    // Détecte clavier ouvert/fermé
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={keyboardVisible} // Actif seulement lorsque clavier ouvert
            >
                <View style={styles.container}>
                    
                    <Stack.Screen
                        options={{
                            title: 'Connexion',
                            headerBackVisible: false,
                        }}
                    />
                    <Image 
                        source={require('../assets/images/logo.webp')} 
                        style={{ width: logoSize, height: logoSize, marginBottom: 0 }} 
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
                            margin: 8,
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const screenHeight = Dimensions.get('window').height;
const downOffset = screenHeight * 0.17;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: downOffset,
    },
    inputs: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 8,
        borderRadius: 8,
        width: 300,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
        backgroundColor: 'gray',
        height:40,
        width: '100%',
        padding:10,
        
    },
});