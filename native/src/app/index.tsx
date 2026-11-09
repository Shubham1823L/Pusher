import { Text, View, StyleSheet, Platform } from "react-native";
import * as Notifications from 'expo-notifications'
import { useEffect } from "react";
import { getMessaging, onMessage, onRegistered, onUnregistered, register, registerDeviceForRemoteMessages, unregister } from '@react-native-firebase/messaging'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true
  })
})

export default function Index() {
  useEffect(() => {
    (async () => {
      const cleanup = await initializePushNotifications()

      return cleanup
    })()
    
  }, [])




  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});



const initializePushNotifications = async () => {
  const { granted } = await Notifications.getPermissionsAsync()


  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#b20c097c',
    });
  }

  if (!granted) {
    const { granted } = await Notifications.requestPermissionsAsync()
    if (!granted) alert("Failed to aquire push notifications permissions")
    return () => { }
  }

  const messaging = getMessaging()

  await registerDeviceForRemoteMessages(messaging)

  const unsubscribeRegistered = onRegistered(messaging, fid => {
    console.log('Registered with FID:', fid)
  })

  await register(messaging)

  const unsubscribeUnregistered = onUnregistered(messaging, fid => {
    console.log("Unregistered the FID:,", fid)
  })

  const unsubscribeOnMessage = onMessage(messaging, (e) => {
    console.log("Recevied foreground message")
  })



  const cleanUp = () => {
    unsubscribeRegistered()
    unsubscribeUnregistered()
    unregister(messaging)
    unsubscribeOnMessage()
  }


  return cleanUp
}