import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

export default function IndexScreen() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const checkProfileAndSignedOut = async () => {
        const [signedOut, userName, userPhone, userEmail] = await Promise.all([
          AsyncStorage.getItem("signed_out"),
          AsyncStorage.getItem("user_name"),
          AsyncStorage.getItem("user_phone"),
          AsyncStorage.getItem("user_email"),
        ]);
        if (signedOut || !userName || !userPhone || !userEmail) {
          if (signedOut) {
            await AsyncStorage.removeItem("signed_out");
          }
          router.replace("/");
        }
      };
      checkProfileAndSignedOut();
    }, [router])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to The CarryOut</Text>
      <Pressable
        style={styles.card}
        onPress={() => router.replace("/ServiceList")}
      >
        <Text style={styles.name}>View Available Services</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  name: { fontSize: 18, fontWeight: "600" },
  details: { fontSize: 14, color: "#666", marginTop: 4 },
});
