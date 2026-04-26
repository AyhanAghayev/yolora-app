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

const TabIcon = ({ focused, iconName, label, colors }: any) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
    <Icon 
      name={iconName} 
      size={24} 
      color={focused ? colors.primary : colors.textMuted} 
      style={{ marginBottom: 4 }}
    />
    <Text style={{ 
      color: focused ? colors.primary : colors.textMuted, 
      fontSize: 10, 
      fontWeight: focused ? '600' : '400',
      marginBottom: 4 
    }}>
      {label}
    </Text>
    {/* Blue dot indicator for active tab */}
    {focused && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary }} />}
  </View>
);

const DisabledTabNavigator = () => {
  const { colors } = useContext(ThemeContext);
  return (
    <DisabledTab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#0B0F19', // Match main background
          borderTopColor: '#1A1A2E',
          height: 80,
          paddingBottom: 10,
        },
        tabBarShowLabel: false, // We're showing the label inside our custom icon component
      }}
    >
      <DisabledTab.Screen 
        name="HomeTab" 
        component={DisabledHomeScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="home-outline" label="Home" colors={colors} /> }} 
      />
      <DisabledTab.Screen 
        name="MapTab" 
        component={MapScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="map-outline" label="Map" colors={colors} /> }} 
      />
      <DisabledTab.Screen 
        name="YoloTab" 
        component={RequestHelpScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="sparkles-outline" label="Yolo" colors={colors} /> }} 
      />
      <DisabledTab.Screen 
        name="ProfileTab" 
        component={DisabledHomeScreen} 
        options={{ tabBarIcon: (props) => <TabIcon {...props} iconName="person-outline" label="Profile" colors={colors} /> }} 
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
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : user?.role === UserRole.DISABLED ? (
        <DisabledTabNavigator />
      ) : (
        <AbleTabNavigator />
      )}
    </NavigationContainer>
  );
};
