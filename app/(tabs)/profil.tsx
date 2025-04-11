import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useContext } from 'react';
import { PersonneContext } from '../context/PersonneContext';

export default function TabOneScreen() {
  const context = useContext(PersonneContext);
  if (!context) throw new Error('Contexte Personne non trouvé');

  const { personne } = context;

  return (
    <View style={styles.container}>
    {personne.image && (
      <Image source={personne.image} style={styles.avatar} />
    )}
    <Text style={styles.title}>{personne.nom}</Text>
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Cercle parfait
    borderWidth: 2,
    borderColor: '#ccc',
    resizeMode: 'cover',
  },
});
