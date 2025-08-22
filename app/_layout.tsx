import API from "aws-amplify/api";
import awsconfig from "../src/aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure(awsconfig);

import { Slot, useRouter } from "expo-router";
import { Button, View, StyleSheet } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Layout() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Clear DataStore
      await DataStore.clear();

      // Clear all user-related AsyncStorage keys
      await AsyncStorage.multiRemove(["userName", "userEmail", "userPhone", "signed_out"]);

      // Set signed_out flag to true for safety
      await AsyncStorage.setItem("signed_out", "true");

      // Navigate to welcome/login screen and reset navigator state
      router.replace("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Home" onPress={() => router.replace("/")} />
      <Button title="Sign Out" color="red" onPress={handleSignOut} />
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
