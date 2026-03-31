import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TYPE_IMAGES } from "@/constants/Configs";
import { Colors } from "@/constants/theme";
import { db } from "@/src/services/firebase";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { Bath, Bed, ChevronLeft, MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  useEffect(() => {
    if (id) {
      getDoc(doc(db, "properties", id as string)).then((s) => {
        if (s.exists()) setProperty(s.data());
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !property) {
    return (
      <ThemedView style={styles.center}>
        <Stack.Screen options={{ headerShown: false }} />
        {loading ? (
          <ActivityIndicator size="large" color={theme.tint} />
        ) : (
          <ThemedText>Property not found</ThemedText>
        )}
      </ThemedView>
    );
  }

  if (!property)
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Property not found</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Image Header Section */}
        <View style={styles.imageContainer}>
          <Image
            source={TYPE_IMAGES[property.type] || TYPE_IMAGES.Default}
            style={styles.mainImage}
          />
          {/* Custom Header Over Image */}
          <View style={styles.overlayHeader}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.badge}>
            <ThemedText style={[styles.badgeText, { color: theme.tint }]}>
              {property.type}
            </ThemedText>
          </View>

          <ThemedText style={[styles.mainPrice, { color: theme.text }]}>
            {Number(property.price).toLocaleString()} {property.currency}
          </ThemedText>

          <View style={styles.locationRow}>
            <MapPin size={16} color={theme.tint} />
            <ThemedText style={[styles.locationText, { color: theme.icon }]}>
              Damascus, Syria
            </ThemedText>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: isDark ? "#333" : "#EEE" },
            ]}
          />

          <ThemedText style={[styles.sectionTitle, { color: theme.text }]}>
            Key Features
          </ThemedText>
          <View style={styles.featuresGrid}>
            <View
              style={[
                styles.featureBox,
                { backgroundColor: isDark ? "#2C2C2E" : "#F8F9FA" },
              ]}
            >
              <Bed size={22} color={theme.tint} />
              <ThemedText style={[styles.featureVal, { color: theme.text }]}>
                {property.bedrooms}
              </ThemedText>
              <ThemedText style={styles.featureLabel}>Bedrooms</ThemedText>
            </View>
            <View
              style={[
                styles.featureBox,
                { backgroundColor: isDark ? "#2C2C2E" : "#F8F9FA" },
              ]}
            >
              <Bath size={22} color={theme.tint} />
              <ThemedText style={[styles.featureVal, { color: theme.text }]}>
                {property.bathrooms}
              </ThemedText>
              <ThemedText style={styles.featureLabel}>Bathrooms</ThemedText>
            </View>
          </View>

          <ThemedText
            style={[styles.sectionTitle, { color: theme.text, marginTop: 25 }]}
          >
            Location on Map
          </ThemedText>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              initialRegion={{
                ...property.location,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={property.location} pinColor={theme.tint} />
            </MapView>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageContainer: { width: "100%", height: 350, position: "relative" },
  mainImage: { width: "100%", height: "100%" },
  overlayHeader: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 10,
    borderRadius: 15,
    elevation: 5,
  },
  contentCard: {
    marginTop: -40,
    backgroundColor: "transparent",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
    paddingBottom: 120,
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 25,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgba(34, 197, 94, 0.1)",
  },
  badgeText: { fontSize: 12, fontWeight: "800", textTransform: "uppercase" },
  mainPrice: {
    fontSize: 32,
    paddingVertical: 15,
    fontWeight: "900",
    margin: 5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  locationText: { fontSize: 14 },
  divider: { height: 1, marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  featuresGrid: { flexDirection: "row", gap: 15 },
  featureBox: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    gap: 5,
  },
  featureVal: { fontSize: 18, fontWeight: "800" },
  featureLabel: { fontSize: 12, color: "#8E8E93" },
  mapContainer: {
    height: 200,
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 5,
  },
  map: { flex: 1 },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 35,
    backgroundColor: "white",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 15,
  },
  contactBtn: {
    flex: 1,
    height: 55,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  contactBtnText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});
