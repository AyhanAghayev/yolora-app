import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { UserRole } from '../../types';
import Geolocation from 'react-native-geolocation-service';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';

export const MapScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
        // Fallback to a default location (e.g., Baku, Azerbaijan)
        setLocation({ latitude: 40.4093, longitude: 49.8671 });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  // Mock nearby users
  const nearbyUsers = location ? [
    { id: '1', latitude: location.latitude + 0.002, longitude: location.longitude + 0.002, role: UserRole.DISABLED },
    { id: '2', latitude: location.latitude - 0.003, longitude: location.longitude + 0.001, role: UserRole.ABLE },
    { id: '3', latitude: location.latitude + 0.001, longitude: location.longitude - 0.004, role: UserRole.ABLE },
  ] : [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[Typography.h2, { color: colors.text }]}>Map</Text>
      </View>
      
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          userInterfaceStyle="dark"
          customMapStyle={mapStyleDark} // Custom dark map style
        >
          {/* Self Marker (Optional if showsUserLocation is true, but good for custom styling) */}
          <Marker
            coordinate={location}
            title="You"
            pinColor={colors.mapMarkerSelf}
          />
          
          {/* Nearby Users */}
          {nearbyUsers.map(u => (
            <Marker
              key={u.id}
              coordinate={{ latitude: u.latitude, longitude: u.longitude }}
              title={u.role === UserRole.DISABLED ? "Needs Help" : "Helper"}
              pinColor={u.role === UserRole.DISABLED ? colors.mapMarkerDisabled : colors.mapMarkerAble}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={[Typography.body, { color: colors.textSecondary }]}>Loading map...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

// A basic dark mode style for Google Maps
const mapStyleDark = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#242f3e" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#746855" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#242f3e" }]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#263c3f" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#6b9a76" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#38414e" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#212a37" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9ca5b3" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#746855" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{ "color": "#1f2835" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#f3d19c" }]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{ "color": "#2f3948" }]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#d59563" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#17263c" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#515c6d" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#17263c" }]
  }
];
