import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { UserRole } from '../types';

// Auth Screens
import { OnboardingScreen } from '../screens/auth/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';

// Disabled User Screens
import { DisabledHomeScreen } from '../screens/disabled/DisabledHomeScreen';
import { RequestHelpScreen } from '../screens/disabled/RequestHelpScreen';
import { TrackingScreen } from '../screens/disabled/TrackingScreen';

// Able User Screens
import { AbleHomeScreen } from '../screens/able/AbleHomeScreen';
import { HelpRequestsScreen } from '../screens/able/HelpRequestsScreen';
import { NavigateScreen } from '../screens/able/NavigateScreen';

// Shared Screens
import { MapScreen } from '../screens/shared/MapScreen';

const AuthStack = createNativeStackNavigator();
const DisabledTab = createBottomTabNavigator();
const AbleTab = createBottomTabNavigator();
const DisabledStack = createNativeStackNavigator();
const AbleStack = createNativeStackNavigator();

const AuthNavigator = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const TabIcon = ({ focused, iconName, label }: any) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
    <Icon 
      name={iconName} 
      size={24} 
      color={focused ? '#6366F1' : '#9CA3AF'} 
      style={{ marginBottom: 4 }}
    />
    <Text style={{ 
      color: focused ? '#6366F1' : '#9CA3AF', 
      fontSize: 10, 
      fontWeight: focused ? '600' : '500',
      marginBottom: 4 
    }}>
      {label}
    </Text>
  </View>
);

const MicTabIcon = () => (
  <View style={{
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F1', // Primary purple
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Push it up to float
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  }}>
    <Icon name="mic" size={32} color="#FFFFFF" />
  </View>
);

const DisabledTabNavigator = () => {
  return (
    <DisabledTab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#FFFFFF', // Light theme for bottom bar
          borderTopColor: '#F3F4F6',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <DisabledTab.Screen 
        name="HomeTab" 
        component={DisabledHomeScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="home" label="Əsas" /> }} 
      />
      <DisabledTab.Screen 
        name="MapTab" 
        component={MapScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="bookmark-outline" label="Xəritə" /> }} 
      />
      <DisabledTab.Screen 
        name="VoiceTab" 
        component={RequestHelpScreen} 
        options={{ tabBarIcon: () => <MicTabIcon /> }} 
      />
      <DisabledTab.Screen 
        name="ChatTab" 
        component={DisabledHomeScreen} // Placeholder
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="chatbubble-ellipses-outline" label="Söhbət" /> }} 
      />
      <DisabledTab.Screen 
        name="ProfileTab" 
        component={DisabledHomeScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="person-outline" label="Profil" /> }} 
      />
    </DisabledTab.Navigator>
  );
};

const AbleTabNavigator = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <AbleTab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#0B0F19', 
          borderTopColor: '#1A1A2E',
          height: 80,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <AbleTab.Screen 
        name="HomeTab" 
        component={AbleHomeScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="home-outline" label="Home" colors={colors} /> }} 
      />
      <AbleTab.Screen 
        name="MapTab" 
        component={MapScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="map-outline" label="Map" colors={colors} /> }} 
      />
      <AbleTab.Screen 
        name="RequestsTab" 
        component={HelpRequestsScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="list-outline" label="Requests" colors={colors} /> }} 
      />
      <AbleTab.Screen 
        name="ProfileTab" 
        component={AbleHomeScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="person-outline" label="Profile" colors={colors} /> }} 
      />
    </AbleTab.Navigator>
  );
};

export const RootNavigator = () => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);
  const { colors } = useContext(ThemeContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <DisabledTabNavigator />
    </NavigationContainer>
  );
};
