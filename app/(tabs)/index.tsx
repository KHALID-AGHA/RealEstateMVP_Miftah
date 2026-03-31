import { PropertyCard } from "@/components/cards/PropertyCard";
import { ThemedView } from "@/components/themed-view";
import { PROPERTY_TYPES } from "@/constants/Configs";
import { Colors } from "@/constants/theme";
import { db } from "@/src/services/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
  Search,
  SlidersHorizontal
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View
} from "react-native";

export default function HomeScreen() {
  const [list, setList] = useState<any[]>([]);
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setList(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <PropertyCard item={item} theme={theme} />
  );

  return (
    <ThemedView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchSection}>
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colorScheme === "dark" ? "#1c1e1f" : "#F1F5F9" },
          ]}
        >
          <Search size={20} color={theme.icon} />
          <TextInput
            placeholder="Look for properties.."
            placeholderTextColor={theme.icon}
            style={[styles.searchInput, { color: theme.text }]}
          />
          <TouchableOpacity
            style={[styles.filterBtn, { backgroundColor: theme.tint }]}
          >
            <SlidersHorizontal size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Categories Scroll */}
      <View style={{ marginBottom: 15 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {PROPERTY_TYPES.map((filter, index) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                index === 0 && {
                  backgroundColor: theme.tint,
                  borderColor: theme.tint,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterChipText,
                  index === 0 && { color: "#FFF" },
                ]}
              >
                {filter.value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchSection: { paddingHorizontal: 20, paddingTop: 50, marginBottom: 15 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    borderRadius: 15,
    height: 55,
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 14 },
  filterBtn: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  filterScroll: { paddingHorizontal: 20, gap: 10 },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  filterChipText: { fontSize: 13, fontWeight: "600", color: "#64748B" },

  listPadding: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: { width: "100%", height: 220 },
  image: { width: "100%", height: "100%" },
  priceTag: {
    position: "absolute",
    bottom: 15,
    left: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  priceText: { color: "#FFF", fontWeight: "800", fontSize: 14 },
  favoriteBtn: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 8,
    borderRadius: 50,
  },

  cardContent: { padding: 16 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: { fontSize: 17, fontWeight: "700" },
  typeTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeTagText: { fontSize: 10, fontWeight: "bold" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationText: { fontSize: 13 },
  divider: { height: 1, marginVertical: 12 },
  infoRow: { flexDirection: "row", gap: 20 },
  iconGroup: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoText: { fontSize: 13, fontWeight: "600" },
});
