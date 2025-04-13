import { Stack } from 'expo-router'
import { PersonneContext } from '../../context/PersonneContext';
import { useContext } from 'react';
import{ Link, router } from'expo-router';
import { Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfilLayout = () => {
  const context = useContext(PersonneContext);
  if (!context) throw new Error('Contexte Personne non trouvé');
  
  const { personne } = context;
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="parametres" 
        options={{ headerShown: true,
          title:personne.nom,
          headerStyle: {
            backgroundColor: 'white', // ta couleur
          },
          headerTintColor: 'black',
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Pressable>
          ),

        }}   />
      </Stack>
  )
}
export default ProfilLayout