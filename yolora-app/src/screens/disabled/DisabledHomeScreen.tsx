import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { YoloAIBanner, ActionGridButton } from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';

export const DisabledHomeScreen = () => {
  const { colors } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[Typography.caption, { color: colors.textSecondary }]}>
                Good morning, {user?.displayName || 'Aynur'}
              </Text>
              <Text style={[Typography.h1, { color: colors.text, marginTop: Spacing.xs }]}>
                Yolora
              </Text>
            </View>
          </View>

          {/* Yolo AI Banner */}
          <View style={styles.bannerContainer}>
            <YoloAIBanner />
          </View>

          {/* Actions Grid */}
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              <ActionGridButton 
                title="Sign Lang" 
                iconName="hand-left-outline" 
                onPress={() => {}} 
              />
              <ActionGridButton 
                title="Navigate" 
                iconName="navigate-outline" 
                onPress={() => navigation.navigate('MapTab')} 
              />
            </View>
            <View style={styles.gridRow}>
              <ActionGridButton 
                title="Emergency" 
                iconName="warning-outline" 
                onPress={() => navigation.navigate('YoloTab')} 
              />
              <ActionGridButton 
                title="Communicate" 
                iconName="chatbubble-ellipses-outline" 
                onPress={() => {}} 
              />
            </View>
          </View>
        </ScrollView>

        {/* Floating Tooltips (Matching Presentation) */}
        <View style={styles.floatingRight}>
          <View style={styles.tooltipIconContainer}>
            <Icon name="radio-outline" size={16} color="#3B82F6" />
          </View>
          <View>
            <Text style={[Typography.small, { color: '#1A1A2E', fontWeight: '700' }]}>Elevator Available</Text>
            <Text style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>28th May Metro Station</Text>
          </View>
        </View>

        <View style={styles.floatingLeft}>
          <View style={styles.tooltipIconContainer}>
            <Icon name="sparkles" size={16} color="#3B82F6" />
          </View>
          <View>
            <Text style={[Typography.small, { color: '#1A1A2E', fontWeight: '700' }]}>Yolo AI Active</Text>
            <Text style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>Real-time assistance</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  bannerContainer: {
    marginBottom: Spacing.xl,
  },
  gridContainer: {
    flex: 1,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  floatingRight: {
    position: 'absolute',
    top: 140,
    right: -20,
    backgroundColor: '#FFFFFF',
    padding: 12,
    paddingRight: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  floatingLeft: {
    position: 'absolute',
    bottom: 20,
    left: -20,
    backgroundColor: '#FFFFFF',
    padding: 12,
    paddingLeft: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  tooltipIconContainer: {
    backgroundColor: '#EEF2FF',
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  }
});
