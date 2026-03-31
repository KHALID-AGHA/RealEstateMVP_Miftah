import { PropertyCard } from "@/components/cards/PropertyCard";
import { PAGE_SIZE } from "@/constants/Configs";
import { Colors } from "@/constants/theme";
import { db } from "@/src/services/firebase";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function ExploreScreen() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const theme = Colors[useColorScheme() ?? "light"];
  const isDark = useColorScheme() === "dark";

  const fetchProperties = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else if (!loadingMore) setLoading(true);

      const q = query(
        collection(db, "properties"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE),
      );

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setList(items);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchMore = async () => {
    if (!lastVisible || loadingMore) return;

    setLoadingMore(true);
    const nextQ = query(
      collection(db, "properties"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(PAGE_SIZE),
    );

    const snapshot = await getDocs(nextQ);
    if (!snapshot.empty) {
      const newItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setList([...list, ...newItems]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } else {
      setLastVisible(null);
    }
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const SkeletonCard = () => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#2C2C2E" : "#E1E1E1",
          height: 280,
          opacity: 0.5,
        },
      ]}
    />
  );

  const renderItem = ({ item }: { item: any }) => (
    <PropertyCard item={item} theme={theme} />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Miftah Explore
        </Text>
      </View>

      {loading ? (
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <SkeletonCard />}
          contentContainerStyle={styles.listPadding}
        />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listPadding}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchProperties(true)}
              tintColor={theme.tint}
            />
          }
          onEndReached={fetchMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color={theme.tint}
                style={{ margin: 20 }}
              />
            ) : null
          }
          ListEmptyComponent={
            <Text style={styles.center}>No properties found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "800" },
  listPadding: { paddingHorizontal: 20, paddingBottom: 30 },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  center: { textAlign: "center", marginTop: 50, opacity: 0.5 },
});
