import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { UserRole } from '../../types';
import Geolocation from 'react-native-geolocation-service';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';

Mapbox.setAccessToken('YOUR_PUBLIC_MAPBOX_TOKEN');

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
        <Mapbox.MapView
          style={styles.map}
          styleURL={Mapbox.StyleURL.Dark}
          scaleBarEnabled={false}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <Mapbox.Camera
            zoomLevel={14}
            centerCoordinate={[location.longitude, location.latitude]}
            animationMode={'flyTo'}
            animationDuration={0}
          />

          {/* Self Marker */}
          <Mapbox.PointAnnotation id="self" coordinate={[location.longitude, location.latitude]}>
            <View style={[styles.marker, { backgroundColor: colors.mapMarkerSelf }]} />
          </Mapbox.PointAnnotation>
          
          {/* Nearby Users */}
          {nearbyUsers.map(u => (
            <Mapbox.PointAnnotation
              key={u.id}
              id={`user-${u.id}`}
              coordinate={[u.longitude, u.latitude]}
            >
              <View style={[styles.marker, { backgroundColor: u.role === UserRole.DISABLED ? colors.mapMarkerDisabled : colors.mapMarkerAble }]} />
            </Mapbox.PointAnnotation>
          ))}
        </Mapbox.MapView>
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
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  }
});
