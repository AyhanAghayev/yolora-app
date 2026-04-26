import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import Icon from 'react-native-vector-icons/Ionicons';

export const HelpRequestsScreen = () => {
  const { colors } = useContext(ThemeContext);

  // Realistic mock data for screenshots
  const mockRequests = [
    {
      id: '1',
      name: 'Aynur M.',
      distance: '200m',
      type: 'Blind',
      description: 'Need help finding the elevator at 28th May Metro Station.',
      time: 'Just now',
    },
    {
      id: '2',
      name: 'Farid M.',
      distance: '500m',
      type: 'Wheelchair',
      description: 'Assistance needed crossing Nizami Street due to construction.',
      time: '2 mins ago',
    },
    {
      id: '3',
      name: 'Leyla K.',
      distance: '800m',
      type: 'Deaf',
      description: 'Need translation assistance at the pharmacy.',
      time: '5 mins ago',
    },
  ];

  const getIconForType = (type: string) => {
    switch(type) {
      case 'Blind': return 'eye-off';
      case 'Wheelchair': return 'body';
      case 'Deaf': return 'ear';
      default: return 'person';
    }
  };

  const renderItem = ({ item }: { item: typeof mockRequests[0] }) => (
    <View style={[styles.card, { backgroundColor: colors.surfaceElevated }]}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatarPlaceholder, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[Typography.bodyBold, { color: colors.primary }]}>{item.name[0]}</Text>
          </View>
          <View>
            <Text style={[Typography.bodyBold, { color: colors.text }]}>{item.name}</Text>
            <Text style={[Typography.small, { color: colors.textMuted }]}>{item.time} • {item.distance}</Text>
          </View>
        </View>
        <View style={[styles.typeBadge, { backgroundColor: colors.secondary + '20' }]}>
          <Icon name={getIconForType(item.type)} size={12} color={colors.secondary} style={{ marginRight: 4 }} />
          <Text style={[Typography.small, { color: colors.secondary, fontWeight: 'bold' }]}>{item.type}</Text>
        </View>
      </View>
      
      <Text style={[Typography.body, { color: colors.textSecondary, marginTop: Spacing.sm }]}>
        {item.description}
      </Text>
      
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.acceptButton, { backgroundColor: colors.primary }]}>
          <Text style={[Typography.bodyBold, { color: '#FFF' }]}>Accept Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={[Typography.h2, { color: colors.text }]}>Active Requests</Text>
      </View>
      
      <FlatList
        data={mockRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: Spacing.xl,
    paddingTop: Spacing.xxl,
  },
  listContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  card: {
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionRow: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  acceptButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
  },
});
