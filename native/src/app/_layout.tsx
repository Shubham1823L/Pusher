import { getInitialNotification, getMessaging, setBackgroundMessageHandler } from "@react-native-firebase/messaging";
import { Stack } from "expo-router";
import { AppRegistry } from "react-native";
import { expo } from '@/../app.json'

// const messaging = getMessaging()

// setBackgroundMessageHandler(messaging, async (e) => {
//   console.log("Background message here ig:", e)
// })

// const initial = getInitialNotification(messaging)
// console.log(initial)

// const firebaseHeadlessMessageHandler = async (e: unknown) => {
//   console.log("Headless Handler triggered", e)
// }

// AppRegistry.registerComponent(expo.name, () => RootLayout)
// AppRegistry.registerHeadlessTask('ReactNativeFirebaseMessagingHeadlessTask', () => firebaseHeadlessMessageHandler)

export default function RootLayout() {
  return <Stack />;
}
