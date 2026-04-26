import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Platform, PermissionsAndroid } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';

Mapbox.setAccessToken('YOUR_PUBLIC_MAPBOX_TOKEN');

export const DisabledHomeScreen = () => {
  // Start in Baku by default
  const [location, setLocation] = useState<{ latitude: number, longitude: number }>({ latitude: 40.4093, longitude: 49.8671 });

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'Yolo AI needs access to your location for navigation.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission denied');
            setLocation({ latitude: 40.4093, longitude: 49.8671 });
            return;
          }
        }
        
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error.code, error.message);
            setLocation({ latitude: 40.4093, longitude: 49.8671 });
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, []);

  const routeCoordinates = location ? [
    location,
    { latitude: location.latitude + 0.002, longitude: location.longitude + 0.002 },
    { latitude: location.latitude + 0.004, longitude: location.longitude + 0.003 },
    { latitude: location.latitude + 0.006, longitude: location.longitude + 0.002 },
    { latitude: location.latitude + 0.008, longitude: location.longitude + 0.004 },
  ] : [];

  return (
    <View style={styles.container}>
      {/* Map Layer */}
      {location ? (
        <Mapbox.MapView
          style={styles.map}
          styleURL={Mapbox.StyleURL.Street}
          scaleBarEnabled={false}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <Mapbox.Camera
            defaultSettings={{
              zoomLevel: 15,
              centerCoordinate: [location.longitude, location.latitude],
            }}
          />
          
          {/* User Location Marker */}
          <Mapbox.PointAnnotation id="user" coordinate={[location.longitude, location.latitude]}>
            <View style={styles.userMarkerContainer}>
              <View style={styles.userMarkerInner} />
            </View>
          </Mapbox.PointAnnotation>

          {/* Route Line */}
          {routeCoordinates.length > 0 && (
            <Mapbox.ShapeSource id="routeSource" shape={{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates.map(c => [c.longitude, c.latitude])
              }
            }}>
              <Mapbox.LineLayer
                id="routeFill"
                style={{
                  lineColor: '#3B82F6',
                  lineWidth: 5,
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />
            </Mapbox.ShapeSource>
          )}

          {/* Route Waypoints */}
          {routeCoordinates.map((coord, index) => (
            index > 0 && index < routeCoordinates.length - 1 ? (
              <Mapbox.PointAnnotation key={index} id={`waypoint-${index}`} coordinate={[coord.longitude, coord.latitude]}>
                <View style={styles.waypointMarker} />
              </Mapbox.PointAnnotation>
            ) : null
          ))}

          {/* Destination Marker */}
          {routeCoordinates.length > 0 && (
            <Mapbox.PointAnnotation id="destination" coordinate={[routeCoordinates[routeCoordinates.length - 1].longitude, routeCoordinates[routeCoordinates.length - 1].latitude]}>
              <View style={styles.accessibleMarker}>
                <FontAwesome5 name="wheelchair" size={16} color="#FFFFFF" />
              </View>
            </Mapbox.PointAnnotation>
          )}

          {/* Other POI Markers */}
          {location && (
            <>
              <Mapbox.PointAnnotation id="poi-1" coordinate={[location.longitude - 0.003, location.latitude + 0.005]}>
                <View style={styles.accessibleMarker}>
                  <FontAwesome5 name="wheelchair" size={16} color="#FFFFFF" />
                </View>
              </Mapbox.PointAnnotation>
              <Mapbox.PointAnnotation id="poi-2" coordinate={[location.longitude + 0.006, location.latitude + 0.001]}>
                <View style={styles.parkingMarker}>
                  <Text style={styles.parkingText}>P</Text>
                </View>
              </Mapbox.PointAnnotation>
            </>
          )}
        </Mapbox.MapView>
      ) : (
        <View style={styles.mapPlaceholder} />
      )}

      {/* Top Header */}
      <SafeAreaView style={styles.headerContainer} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="menu-outline" size={28} color="#1A1A2E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Yolo AI</Text>
          <TouchableOpacity>
            <Icon name="notifications-outline" size={24} color="#1A1A2E" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Navigation Options */}
        <View style={styles.navOptionsContainer}>
          <TouchableOpacity style={styles.navOption}>
            <Icon name="navigate-outline" size={24} color="#1A1A2E" />
            <Text style={styles.navOptionText}>Naviqasiya</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navOption}>
            <Icon name="bus-outline" size={24} color="#1A1A2E" />
            <Text style={styles.navOptionText}>Dayanacaqlar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navOption, styles.navOptionActive]}>
            <Icon name="people-outline" size={24} color="#1A1A2E" />
            <Text style={styles.navOptionText}>Könüllülər</Text>
          </TouchableOpacity>
        </View>

        {/* Volunteers List */}
        <View style={styles.volunteersContainer}>
          <Text style={styles.sectionTitle}>Yaxın könüllülər</Text>
          
          <View style={styles.volunteerItem}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
              style={styles.avatar} 
            />
            <View style={styles.volunteerInfo}>
              <Text style={styles.volunteerName}>Aysel H.</Text>
              <Text style={styles.volunteerDistance}>0.2 km uzaqda</Text>
            </View>
          </View>

          <View style={styles.volunteerItem}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
              style={styles.avatar} 
            />
            <View style={styles.volunteerInfo}>
              <Text style={styles.volunteerName}>Murad Ə.</Text>
              <Text style={styles.volunteerDistance}>0.4 km uzaqda</Text>
            </View>
          </View>

          {/* Request Help Button */}
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText}>Kömək istə</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: Platform.OS === 'android' ? 20 : 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight background so it's readable over map
    borderRadius: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  userMarkerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userMarkerInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3B82F6',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  waypointMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  accessibleMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  parkingMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  parkingText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  navOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  navOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  navOptionActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  navOptionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
  volunteersContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },
  volunteerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  volunteerInfo: {
    flex: 1,
  },
  volunteerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  volunteerDistance: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  requestButton: {
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
