import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { PersonneContext } from '../context/PersonneContext'; 
import { useContext } from 'react';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [zoom, setZoom] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);

  const context = useContext(PersonneContext);
  if (!context) throw new Error('Contexte Personne non trouvé');
  const { personne, setPersonne } = context;
  
    
  if (!permission || !mediaPermission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
      </View>
    );
  }
  if (!mediaPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need access to media library</Text>
        <Button onPress={requestMediaPermission} title="Grant Media Permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash((current) => (current === 'off' ? 'on' : 'off'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      
      if (photo?.uri) {
        await MediaLibrary.createAssetAsync(photo.uri);
        alert('📸 Photo sauvegardée dans la galerie !');
      } else {
        alert("❌ Échec de la capture de photo.");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flash}
        zoom={zoom}
        ref={cameraRef}
      >
        <View style={styles.controls}>
          {/* Switch Camera */}
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={40} color={personne.couleur}/>
          </TouchableOpacity>

          {/* Take Photo */}
          <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
            <Entypo name="circle" size={70} color={personne.couleur} />
          </TouchableOpacity>

          {/* Flash Toggle */}
          <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <MaterialCommunityIcons
              name={flash === 'on' ? 'flash' : 'flash-off'}
              size={40}
              color={personne.couleur}
            />
          </TouchableOpacity>
        </View>

        {/* Zoom */}
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: 250, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={zoom}
            onValueChange={setZoom}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#888"
            thumbTintColor="#fff"
          />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 50,
  },
  captureButton: {
    padding: 12,
    borderRadius: 50,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
});
