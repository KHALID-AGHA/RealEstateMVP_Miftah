import { TYPE_IMAGES } from '@/constants/Configs';
import { useRouter } from 'expo-router';
import { Bath, Bed, X } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed-text';

const { width } = Dimensions.get('window');

export const QuickPreview = ({ property, onClose, theme }: any) => {
  const router = useRouter();

  if (!property) return null;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.card, { backgroundColor: theme.background }]}
        onPress={() => router.push({ pathname: "/details/[id]", params: { id: property.id } })}
      >
        <Image 
          source={TYPE_IMAGES[property.type] || TYPE_IMAGES.Default} 
          style={styles.image} 
        />
        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={[styles.price, { color: theme.tint }]}>
              {Number(property.price).toLocaleString()} {property.currency}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#CCC" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.type, { color: theme.icon }]}>{property.type}</Text>
          <View style={styles.features}>
            <View style={styles.feature}><Bed size={14} color={theme.tint} /><ThemedText> {property.bedrooms}</ThemedText></View>
            <View style={styles.feature}><Bath size={14} color={theme.tint} /><ThemedText> {property.bathrooms}</ThemedText></View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: "absolute", bottom: 100, width, alignItems: "center", paddingHorizontal: 20 },
  card: { width: "100%", flexDirection: "row", borderRadius: 20, overflow: "hidden", elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12, justifyContent: "space-between" },
  header: { flexDirection: "row", justifyContent: "space-between" },
  price: { fontSize: 17, fontWeight: "900" },
  type: { fontSize: 12, fontWeight: "600", marginTop: -5 },
  features: { flexDirection: "row", gap: 15 },
  feature: { flexDirection: "row", alignItems: "center" },
});