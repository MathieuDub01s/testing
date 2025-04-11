import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useContext, useState, useEffect } from 'react';
import { PersonneContext } from '../../context/PersonneContext';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function TabOneScreen() {
  const context = useContext(PersonneContext);
  if (!context) throw new Error('Contexte Personne non trouvé');

  const { personne } = context;
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  console.log("Son de la personne :", personne.son);
  
  const playSound = async () => {
    if (!personne?.son) return;

    // Décharge un ancien son
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: personne.son },
        { shouldPlay: true } // joue dès le chargement
      );
      setSound(newSound);
    } catch (err) {
      console.error('Erreur lecture du son:', err);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  return (
    <View style={styles.container}>
    {personne.image && (
      <Image source={personne.image} style={styles.avatar} />
    )}
    <Text style={styles.title}>{personne.nom}</Text>

    <View style={styles.iconRow}>
    <TouchableOpacity onPress={playSound} disabled={!personne?.son}>
          <Ionicons
            name="volume-high-outline"
            size={50}
            color={personne?.son ? 'white' : 'gray'}
          />
        </TouchableOpacity>
      <Ionicons name="settings-outline" size={50} color={'white'} />
    </View>
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  iconRow: {
    flexDirection: 'row',     
    justifyContent: 'center',  
    alignItems: 'center',     
    gap: 120,       
    marginTop:100            
  }
  
});
