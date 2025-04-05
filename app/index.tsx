import {StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function MonInputTexte() {
    const [texte, setTexte] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
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
    inputs:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        margin: 10,
        borderRadius: 8,
        width:300,
    }
  });