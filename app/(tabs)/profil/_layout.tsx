import { Stack } from 'expo-router'

const ProfilLayout = () => {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="parametres" />
      </Stack>
  )
}
export default ProfilLayout