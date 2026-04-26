import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { ActionGridButton } from '../../components';

export const AbleHomeScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>
              Good morning, {user?.displayName || 'Helper'}
            </Text>
            <Text style={[Typography.h1, { color: colors.text, marginTop: Spacing.xs }]}>
              Yolora
            </Text>
          </View>
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={{ color: colors.error, ...Typography.caption }}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Banner */}
        <View style={[styles.bannerContainer, { backgroundColor: colors.surfaceElevated }]}>
          <Text style={[Typography.h3, { color: colors.text }]}>Ready to help?</Text>
          <Text style={[Typography.body, { color: colors.textSecondary, marginTop: Spacing.xs }]}>
            There are people nearby who need your assistance today.
          </Text>
        </View>

        {/* Actions Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <ActionGridButton 
              title="View Requests" 
              iconName="list" 
              onPress={() => navigation.navigate('RequestsTab')} 
            />
            <ActionGridButton 
              title="Nearby Map" 
              iconName="map" 
              onPress={() => navigation.navigate('MapTab')} 
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  logoutButton: {
    padding: Spacing.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
  },
  bannerContainer: {
    padding: Spacing.lg,
    borderRadius: 24,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gridContainer: {
    flex: 1,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
});
