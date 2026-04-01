import { MapPin } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export const LocationPicker = ({ location, onSelect, theme }: any) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Property Location</Text>
      <View style={styles.mapWrapper}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.miniMap}
          region={{
            ...location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) => onSelect(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={location} pinColor={theme.tint} />
        </MapView>
        <View style={styles.overlay}>
          <MapPin size={20} color={theme.tint} />
          <Text style={styles.hint}>Tap map to set location</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 15 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  mapWrapper: { height: 180, borderRadius: 15, overflow: 'hidden', backgroundColor: '#eee' },
  miniMap: { flex: 1 },
  overlay: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255,255,255,0.8)', padding: 5, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  hint: { fontSize: 10, fontWeight: 'bold' }
});