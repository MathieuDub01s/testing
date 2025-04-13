import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { PersonneContext } from '../context/PersonneContext'; 

export default function Micro() {
  const context = useContext(PersonneContext);
  if (!context) throw new Error('Contexte Personne non trouvé');

  const { personne, setPersonne } = context;
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error('Erreur en démarrant l’enregistrement', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri ?? null);
      setRecording(null);
      if (uri) {
        setPersonne({ ...personne, son: uri });
      }
      Alert.alert("✅ Enregistrement terminé", uri ?? "Aucune URI trouvée");
    } catch (err) {
      console.error('Erreur à l’arrêt de l’enregistrement', err);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playSound = async () => {
    if (!audioUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      setSound(sound);
      await sound.playAsync();
    } catch (err) {
      console.error('Erreur lors de la lecture', err);
    }
  };

  const deleteSound = async () => {
    if (audioUri) {
      try {
        await FileSystem.deleteAsync(audioUri);
        setAudioUri(null);
        setPersonne({ ...personne, son: '' });
        Alert.alert("🗑️ Fichier supprimé");
      } catch (err) {
        console.error("Erreur lors de la suppression", err);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: personne.couleur }]}>
    
      {/* Nouveau bouton micro circulaire */}
      <TouchableOpacity
        onPress={toggleRecording}
        style={[styles.micButton, recording ? styles.micActive : styles.micInactive]}
      >
        <Ionicons name="mic" size={40} color="#fff" />
      </TouchableOpacity>

      <View style={styles.spacer} />
      <TouchableOpacity
        style={styles.actionButton}
        onPress={playSound}
        disabled={!audioUri}
      >
        <Ionicons name="play" size={40} color={audioUri ? 'green' : 'gray'} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={deleteSound}
        disabled={!audioUri}
      >
        <MaterialIcons name="delete-outline" size={40} color={audioUri ? 'red' : 'gray'} />
      </TouchableOpacity>

      {audioUri && <Text style={styles.uri}>📎 Fichier : {audioUri}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  micInactive: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  micActive: {
    backgroundColor: 'green',
  },
  spacer: {
    height: 20,
  },
  actionButton: {
    marginVertical: 10,
  },
  uri: {
    marginTop: 30,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});
