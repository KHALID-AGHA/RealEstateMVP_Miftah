import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MapPin, Bed, Bath } from "lucide-react-native";
import { TYPE_IMAGES } from "@/constants/Configs";
import { ThemedText } from "../themed-text";

export const PropertyCard = ({ item, theme }: any) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.background }]}
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <Image source={TYPE_IMAGES[item.type]} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.price, { color: theme.text }]}>
          {Number(item.price).toLocaleString()} {item.currency}
        </Text>

        <View style={styles.footer}>
          <View style={styles.tag}>
            <Bed color={theme.tint} size={14} /> 
            <ThemedText> | {item.bedrooms}</ThemedText>
          </View>
          <View style={styles.tag}>
            <Bath color={theme.tint} size={14} />
            <ThemedText> | {item.bathrooms}</ThemedText>
          </View>
          <Text style={styles.typeTag}>{item.type}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowOpacity: 0.1,
  },
  image: { width: "100%", height: 200 },
  content: { padding: 15 },
  price: { fontSize: 20, fontWeight: "bold" },
  location: { fontSize: 13, color: "#666", marginLeft: 4 },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  footer: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
    alignItems: "center",
  },
  tag: { flexDirection: "row", alignItems: "center" },
  typeTag: {
    marginLeft: "auto",
    backgroundColor: "#e8f5e9",
    padding: 5,
    borderRadius: 5,
    color: "#13cb7b",
    fontWeight: "bold",
  },
});
