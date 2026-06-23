import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Notification Item Interface Type
interface NotificationItem {
  id: number;
  title: string;
  description: string;
  type: string;
  createdAt: string;
}

export default function NotificationsScreen() {
  const router = useRouter();

  // Mock Data State for dynamic updates
  const [notifications, setNotifications] =
    useState<NotificationItem[]>([]);

  // Handler to clear all unread badges
  const markAllAsRead = () => { };
  // Helper helper to dynamic styles maps
  // const getTypeConfigs = (type: string) => {
  //   switch (type) {
  //     case 'attendance':
  //       return { icon: 'calendar-alert', color: '#EF4444', bgColor: '#FEE2E2' };
  //     case 'fee':
  //       return { icon: 'cash-check', color: '#10B981', bgColor: '#E6F4EA' };
  //     default:
  //       return { icon: 'file-document-outline', color: '#6D28D9', bgColor: '#F3E8FF' };
  //   }
  // };

 const getTypeConfigs = () => {

    return {
      icon: "file-document-outline",
      color: "#6D28D9",
      bgColor: "#F3E8FF"
    };

  };


  const fetchNotifications = async () => {

    try {

      const selectedChildId =
        await AsyncStorage.getItem(
          "selectedChildId"
        );

      const response =
        await axios.get(
          `http://192.168.29.49:5000/api/parent/notifications/${selectedChildId}`
        );

      if (response.data.success) {

        setNotifications(
          response.data.notifications
        );

      }

    } catch (error) {

      console.log(
        "Notifications Error:",
        error
      );

    }

  };

  useEffect(() => {

    fetchNotifications();

  }, []);



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

        {(notifications.length > 0) && (
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
            const config = getTypeConfigs();
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.notificationCard}
                activeOpacity={0.8}
              >
                {/* Left side Accent Icon Box */}
                <View style={[styles.iconFrame, { backgroundColor: config.bgColor }]}>
                  <MaterialCommunityIcons name={config.icon as any} size={20} color={config.color} />
                </View>

                {/* Central Info Content Data */}
                <View style={styles.contentBodyFrame}>
                  <View style={styles.topMetaRow}>
                    <Text
                      style={styles.noticeTitleText}
                    >
                      {item.title}
                    </Text>
                    <Text style={styles.timeTickerText}>
                      {new Date(item.createdAt)
                        .toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.descriptionText} numberOfLines={3}>
                    {item.description}
                  </Text>
                </View>

                {/* Right edge Blue dot tracker */}

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