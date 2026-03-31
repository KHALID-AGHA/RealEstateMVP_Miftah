import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { QuickPreview } from "@/components/map/QuickPreview";
import { Colors } from "@/constants/theme";
import { useProperties } from "@/hooks/useProperties";
import SvgMarker from "../../components/SvgMarker";

const { width } = Dimensions.get("window");

export default function MapScreen() {
  if (Platform.OS === "web") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Map View is not available on Web. Use Android/iOS.</Text>
      </View>
    );
  }

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const theme = Colors[useColorScheme() ?? "light"];
  const { properties } = useProperties();
  const handleMarkerPress = (property: any) => {
    setSelectedProperty(property);
  };

  const mapPadding = useMemo(
    () =>
      Platform.select({
        ios: { top: 0, right: 0, bottom: 90, left: 0 },
        android: { top: 0, right: 0, bottom: 120, left: 0 },
        default: { top: 0, right: 0, bottom: 90, left: 0 },
      }),
    [],
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 34.736117,
          longitude: 36.712979,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        // عند الضغط على الخريطة في أي مكان فارغ، نغلق الـ Quick Preview
        onPress={() => setSelectedProperty(null)}
      >
        {properties.map((item) => (
          <SvgMarker
            key={item.id}
            coordinate={item.location}
            price={item.price}
            currency={item.currency}
            type={item.type}
            onPress={() => handleMarkerPress(item)}
          />
        ))}
      </MapView>

      {selectedProperty && (
        <QuickPreview
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          theme={theme}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },

  previewWrapper: {
    position: "absolute",
    bottom: 30,
    width,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  previewCard: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 10,
  },
  previewImage: { width: 110, height: 110 },
  previewInfo: { flex: 1, padding: 15, justifyContent: "space-between" },
  previewHeader: { flexDirection: "row", justifyContent: "space-between" },
  previewPrice: { fontSize: 18, fontWeight: "900" },
  previewType: { fontSize: 13, fontWeight: "600", marginTop: -5 },
  previewFeatures: { flexDirection: "row", gap: 15 },
  feature: { flexDirection: "row", alignItems: "center" },
});
