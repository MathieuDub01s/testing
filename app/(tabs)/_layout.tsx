import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PersonneContext } from '../context/PersonneContext';
import { Link, Tabs } from 'expo-router';
import { useContext } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const context = useContext(PersonneContext);
  if (!context) throw new Error('Contexte Personne non trouvé');
  const { personne, setPersonne } = context;
      
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        sceneContainerStyle: {
          backgroundColor: personne.couleur,
        },
      }}>
      <Tabs.Screen
        name="profil" // Un seul nom pour les deux composants
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
         
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          headerShown: false,
         
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="micro"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="microphone" color={color} />,
          
        }}
      />
       
    </Tabs>
  );
}
