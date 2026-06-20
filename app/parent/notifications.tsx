import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// Notification Item Interface Type
interface NotificationItem {
  id: string;
  type: 'attendance' | 'fee' | 'circular';
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}

export default function NotificationsScreen() {
  const router = useRouter();

  // Mock Data State for dynamic updates
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'attendance',
      title: 'Absence Alert: Hassan Khan',
      description: 'Bhai, Hassan aaj morning lecture (09:15 AM) me absent mark kiya gaya h. Please leave application verify karein.',
      time: '10 mins ago',
      isUnread: true,
    },
    {
      id: '2',
      type: 'fee',
      title: 'Quarter 2 Fee Receipt Generated',
      description: 'Academic fee of ₹18,500 successfully clear ho chuki h. Aap dashboard se formal digital invoice download kar sakte hain.',
      time: '2 hours ago',
      isUnread: true,
    },
    {
      id: '3',
      type: 'circular',
      title: 'Summer Vacation Circular 2026',
      description: 'School admin desk se naya circular release hua h. Garmiyo ki chuttiyan 25th June se start ho rahi hain.',
      time: 'Yesterday',
      isUnread: false,
    },
    {
      id: '4',
      type: 'circular',
      title: 'Parent-Teacher Meeting (PTM)',
      description: 'Saturday ko morning 09:00 AM se final term report distribution audit card ke liye PTM schedule ki gayi h.',
      time: '3 days ago',
      isUnread: false,
    },
  ]);

  // Handler to clear all unread badges
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(item => ({ ...item, isUnread: false })));
  };

  // Helper helper to dynamic styles maps
  const getTypeConfigs = (type: string) => {
    switch (type) {
      case 'attendance':
        return { icon: 'calendar-alert', color: '#EF4444', bgColor: '#FEE2E2' };
      case 'fee':
        return { icon: 'cash-check', color: '#10B981', bgColor: '#E6F4EA' };
      default:
        return { icon: 'file-document-outline', color: '#6D28D9', bgColor: '#F3E8FF' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER SECTION ARCHITECTURE */}
      <View style={styles.header}>
        <View style={styles.headerLeftBlock}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        
        {notifications.some(n => n.isUnread) && (
          <TouchableOpacity onPress={markAllAsRead} activeOpacity={0.6}>
            <Text style={styles.markReadTextCta}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* NOTIFICATIONS CONTAINER ROW */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCanvas}>
        {notifications.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Feather name="bell-off" size={48} color="#94A3B8" />
            <Text style={styles.emptyTitle}>Sab Clear Hai!</Text>
            <Text style={styles.emptySubtitle}>Yahan koi nayi notification ya alerts pending nahi hain.</Text>
          </View>
        ) : (
          notifications.map((item) => {
            const config = getTypeConfigs(item.type);
            return (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.notificationCard, item.isUnread && styles.unreadCardBg]}
                activeOpacity={0.8}
              >
                {/* Left side Accent Icon Box */}
                <View style={[styles.iconFrame, { backgroundColor: config.bgColor }]}>
                  <MaterialCommunityIcons name={config.icon as any} size={20} color={config.color} />
                </View>

                {/* Central Info Content Data */}
                <View style={styles.contentBodyFrame}>
                  <View style={styles.topMetaRow}>
                    <Text style={[styles.noticeTitleText, item.isUnread && styles.unreadTitleFont]} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.timeTickerText}>{item.time}</Text>
                  </View>
                  <Text style={styles.descriptionText} numberOfLines={3}>
                    {item.description}
                  </Text>
                </View>

                {/* Right edge Blue dot tracker */}
                {item.isUnread && (
                  <View style={styles.unreadPulseDot} />
                )}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  headerLeftBlock: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backButton: {
    width: 38, height: 38, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
    justifyContent: 'center', alignItems: 'center'
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  markReadTextCta: { fontSize: 12, fontWeight: '600', color: '#6D28D9', paddingRight: 4 },
  
  // Canvas configuration
  scrollCanvas: { padding: 16, paddingBottom: 40 },

  // Notification Cards Structural Blueprint
  notificationCard: {
    flexDirection: 'row', alignItems: 'flex-start', padding: 14,
    backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1,
    borderColor: '#F1F5F9', marginBottom: 12, position: 'relative'
  },
  unreadCardBg: { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' },
  iconFrame: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  contentBodyFrame: { flex: 1, paddingRight: 8 },
  topMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  noticeTitleText: { fontSize: 13, fontWeight: '600', color: '#475569', flex: 0.75 },
  unreadTitleFont: { color: '#0F172A', fontWeight: '700' },
  timeTickerText: { fontSize: 10, color: '#94A3B8', fontWeight: '500' },
  descriptionText: { fontSize: 12, color: '#64748B', lineHeight: 18, fontWeight: '400' },
  
  // Unread Blue Dot Indicator Setup
  unreadPulseDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#3B82F6', position: 'absolute', right: 14, bottom: 14 },

  // Empty State Vector Screen Elements
  emptyStateContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100, paddingHorizontal: 32 },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: '#334155', marginTop: 16 },
  emptySubtitle: { fontSize: 12, color: '#94A3B8', textAlign: 'center', marginTop: 6, lineHeight: 18 }
});