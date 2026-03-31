import { LocationPicker } from "@/components/forms/LocationPicker";
import { CURRENCIES, PROPERTY_TYPES } from "@/constants/Configs";
import { Colors } from "@/constants/theme";
import { db } from "@/src/services/firebase";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function CreateScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialState = {
    type: "Home",
    price: "",
    currency: "SYP",
    bedrooms: "",
    bathrooms: "",
    location: { latitude: 34.736117, longitude: 36.712979 },
  };

  const [form, setForm] = useState(initialState);

  const handleSubmit = async () => {
    if (!form.price || !form.bedrooms || !form.bathrooms) {
      Alert.alert("Missing Info", "Please fill all numerical fields.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "properties"), {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        createdAt: new Date(),
      });

      Alert.alert("Success", "Listing Published!");
      setForm(initialState);

      router.push("/(tabs)/map");
    } catch (e) {
      Alert.alert("Error", "Failed to save data.");
    } finally {
      setLoading(false);
    }
  };

  const dropdownProps = {
    placeholderStyle: { color: isDark ? "#888" : "#666" },
    selectedTextStyle: { color: theme.text },
    containerStyle: {
      backgroundColor: theme.background,
      borderColor: theme.icon,
    },
    itemTextStyle: { color: theme.text },
    activeColor: isDark ? "#333" : "#F0F0F0",
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.label, { color: theme.text }]}>Property Type</Text>
      <Dropdown
        {...dropdownProps}
        style={[styles.dropdown, { borderColor: theme.icon }]}
        data={PROPERTY_TYPES}
        labelField="label"
        valueField="value"
        value={form.type}
        onChange={(item) => setForm({ ...form, type: item.value })}
      />

      <View style={styles.row}>
        <View style={{ flex: 2 }}>
          <Text style={[styles.label, { color: theme.text }]}>Price</Text>
          <TextInput
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.icon },
            ]}
            placeholder="0.00"
            placeholderTextColor={isDark ? "#555" : "#CCC"}
            keyboardType="numeric"
            value={form.price}
            onChangeText={(v) => setForm({ ...form, price: v })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: theme.text }]}>Currency</Text>
          <Dropdown
            {...dropdownProps}
            style={[styles.dropdown, { borderColor: theme.icon }]}
            data={CURRENCIES.map((c) => ({ label: c, value: c }))}
            labelField="label"
            valueField="value"
            value={form.currency}
            onChange={(item) => setForm({ ...form, currency: item.value })}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: theme.text }]}>Bedrooms</Text>
          <TextInput
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.icon },
            ]}
            keyboardType="numeric"
            placeholder="Count"
            placeholderTextColor={isDark ? "#555" : "#CCC"}
            value={form.bedrooms}
            onChangeText={(v) => setForm({ ...form, bedrooms: v })}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.label, { color: theme.text }]}>Bathrooms</Text>
          <TextInput
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.icon },
            ]}
            keyboardType="numeric"
            placeholder="Count"
            placeholderTextColor={isDark ? "#555" : "#CCC"}
            value={form.bathrooms}
            onChangeText={(v) => setForm({ ...form, bathrooms: v })}
          />
        </View>
      </View>

      <LocationPicker
        theme={theme}
        location={form.location}
        onSelect={(coords: any) => setForm({ ...form, location: coords })}
      />

      <TouchableOpacity
        style={[
          styles.btn,
          { backgroundColor: theme.tint, opacity: loading ? 0.6 : 1 },
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "Saving..." : "Submit Listing"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 5, marginTop: 15 },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: { height: 50, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12 },
  row: { flexDirection: "row", gap: 15 },
  btn: {
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
