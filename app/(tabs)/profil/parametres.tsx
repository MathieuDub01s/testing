import { StyleSheet, Image, Pressable} from 'react-native';
import { Text, View } from '@/components/Themed';
import { PersonneContext } from '../../context/PersonneContext';
import { useContext,useState } from 'react';
import{ Link, router } from'expo-router';
import { Picker } from '@react-native-picker/picker';

export default function TabOneScreen() {
  
  const context = useContext(PersonneContext);
  if (!context) throw new Error('Contexte Personne non trouvé');
  const { personne, setPersonne } = context;
  
  const [color, setColor] = useState(personne.couleur || 'aquamarine');  // Initialisez la couleur avec celle de la personne

  const handleColorChange = (itemValue) => {
    setColor(itemValue);         // Mettez à jour la couleur localement
    setPersonne(prev => ({ ...prev, couleur: itemValue }));
  };

  return (
    <View style={[styles.container, { backgroundColor: personne.couleur }]}>

    <Text style={styles.title}>Paramètres pour {personne.nom}</Text>
    
      <Text>Sélectionnez votre couleur de fond</Text>
      <Picker
          selectedValue={color}
          onValueChange={(itemValue) => handleColorChange(itemValue)}
          style={[styles.picker, { backgroundColor: personne.couleur }]}
        >
          <Picker.Item label="blanc" value="white" />
          <Picker.Item label="bleu alice" value="aliceblue" />
          <Picker.Item label="rose pâle" value="pink" />
          <Picker.Item label="crème menthe" value="mintcream" />
          <Picker.Item label="aquamarine" value="aquamarine" />
      </Picker>
   
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
 
  picker: {
    width: 200,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  }
});
