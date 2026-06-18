import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

const { width } = Dimensions.get('window');

// Production Grade TypeScript Interface
export interface Announcement {
  id: number;
  studentId: number;
  title: string;
  description: string;
  announcementDate: string;
}

interface ApiResponse {
  success: boolean;
  announcements: Announcement[];
}

export default function AnnouncementsScreen() {
  const router = useRouter();

  // Core Functional States
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Async API Data Engine 
  const fetchAnnouncements = async (showRefresher = false) => {
    try {
      if (!showRefresher) setLoading(true);
      setErrorMsg(null);

      const response = await axios.get<ApiResponse>('http://192.168.29.49:5000/api/student/announcements/3', {
        timeout: 8000 // 8 seconds fail-safe timeout barrier
      });

      if (response.data && response.data.success) {
        // Sorting Logic: Newest Announcements First
        const sortedData = (response.data.announcements || []).sort((a, b) => {
          return new Date(b.announcementDate).getTime() - new Date(a.announcementDate).getTime();
        });
        setAnnouncements(sortedData);
      } else {
        setErrorMsg('Failed to process systemic database data payloads correctly.');
      }
    } catch (err: any) {
      console.error('Downstream Announcement Fetch Error:', err);
      setErrorMsg(err.message || 'Network error encountered while connecting to campus grid portal.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Lifecycle Trigger Execution
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Pull-To-Refresh Dispatcher Method
  const onRefreshTrigger = useCallback(() => {
    setRefreshing(true);
    fetchAnnouncements(true);
  }, []);

  // Optimized Computed Filter Logic
  const filteredAnnouncements = useMemo(() => {
    if (!searchQuery.trim()) return announcements;
    return announcements.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, announcements]);

  // Premium Micro-Component: Skeleton States Loader Grid
  const RenderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonTopRow}>
            <View style={styles.skeletonTag} />
            <View style={styles.skeletonDate} />
          </View>
          <View style={styles.skeletonTitleLine} />
          <View style={styles.skeletonDescLineLong} />
          <View style={styles.skeletonDescLineShort} />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* COMPACT PREMIUM TITLE HEAD BAR */}
      <View style={styles.appHeaderNav}>
        <TouchableOpacity 
          style={styles.backNavigationCta} 
          onPress={() => router.back()} 
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.appHeaderTitleText}>Announcements</Text>
        <View style={styles.backNavigationSpacer} />
      </View>

      {/* SEARCH INTERACTION ENGINE INPUT FIELD */}
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={18} color="#94A3B8" style={styles.searchEmbeddedIcon} />
        <TextInput
          style={styles.searchFieldInput}
          placeholder="Search announcements by title..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* CORE DISPLAY STATE DISTRIBUTOR RUNTIME LAYOUT */}
      {loading ? (
        <RenderSkeletonLoader />
      ) : errorMsg ? (
        <ScrollView 
          contentContainerStyle={styles.centerStateViewport}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshTrigger} colors={["#137333"]} />}
        >
          <MaterialCommunityIcons name="alert-circle-outline" size={54} color="#EF4444" />
          <Text style={styles.stateTitleText}>Sync Failure</Text>
          <Text style={styles.stateDescriptionSubText}>{errorMsg}</Text>
          <TouchableOpacity 
            style={[styles.actionRetryCta, { backgroundColor: '#137333' }]} 
            onPress={() => fetchAnnouncements()}
          >
            <Text style={styles.actionRetryCtaText}>Tap to Retry</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : filteredAnnouncements.length === 0 ? (
        <ScrollView 
          contentContainerStyle={styles.centerStateViewport}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshTrigger} colors={["#137333"]} />}
        >
          <Ionicons name="megaphone-outline" size={58} color="#CBD5E1" />
          <Text style={styles.stateTitleText}>No Announcements Found</Text>
          <Text style={styles.stateDescriptionSubText}>
            Bhai, abhi campus registry ki taraf se koi naya dynamic broadcast upload nahi kiya gaya hai.
          </Text>
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mainFeedContentScroll}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefreshTrigger} 
              colors={["#137333"]}
              tintColor="#137333"
            />
          }
        >
          {/* MAP PIPELINE DATA NODES ITERATOR */}
          {filteredAnnouncements.map((item: Announcement) => (
            <View key={item.id} style={styles.premiumAcademicCardFrame}>
              
              {/* HEADER ROW STRIP SPECIFICATIONS */}
              <View style={styles.cardHeaderStripRow}>
                <View style={styles.badgeLabelContainer}>
                  <View style={styles.pulseIndicatorDot} />
                  <Text style={styles.badgeLabelContainerText}>BROADCAST</Text>
                </View>
                
                {/* TIMESTEP DATE CALENDAR BADGE */}
                <View style={styles.calendarDateBadgeFrame}>
                  <Ionicons name="time-outline" size={13} color="#64748B" style={{ marginRight: 4 }} />
                  <Text style={styles.calendarDateBadgeFrameText}>{item.announcementDate}</Text>
                </View>
              </View>

              {/* CARD CONTENTS SYSTEM BODY STRUCTURE */}
              <Text style={styles.announcementCoreTitleText}>{item.title}</Text>
              <Text style={styles.announcementCoreDescText}>{item.description}</Text>

              {/* CLEAN HORIZONTAL COMPACT FOOTER OVERLAY BAR */}
              <View style={styles.cardInnerBottomDividerLine} />
              <View style={styles.cardFooterLayoutBlock}>
                <View style={styles.authorityIndicatorRow}>
                  <MaterialCommunityIcons name="shield-check-outline" size={14} color="#137333" />
                  <Text style={styles.authorityIndicatorLabel}>Verified Campus Feed Authority</Text>
                </View>
                <TouchableOpacity style={styles.shareMetricButtonContainer} activeOpacity={0.6}>
                  <Ionicons name="share-social-outline" size={15} color="#64748B" />
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  appHeaderNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  backNavigationCta: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appHeaderTitleText: { 
    fontSize: 17, 
    fontWeight: '700', 
    color: '#0F172A' 
  },
  backNavigationSpacer: { 
    width: 38 
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchEmbeddedIcon: { 
    marginRight: 10 
  },
  searchFieldInput: { 
    flex: 1, 
    fontSize: 14, 
    color: '#0F172A', 
    fontWeight: '500' 
  },
  mainFeedContentScroll: { 
    paddingHorizontal: 16, 
    paddingTop: 12, 
    paddingBottom: 40 
  },
  centerStateViewport: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 32 
  },
  stateTitleText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1E293B', 
    marginTop: 14 
  },
  stateDescriptionSubText: { 
    fontSize: 12, 
    color: '#64748B', 
    textAlign: 'center', 
    marginTop: 6, 
    lineHeight: 18,
    fontWeight: '400'
  },
  actionRetryCta: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionRetryCtaText: { 
    color: '#FFFFFF', 
    fontSize: 13, 
    fontWeight: '600' 
  },
  premiumAcademicCardFrame: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Premium Anti-Aliased Box Shadows Engine Setup
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  cardHeaderStripRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  badgeLabelContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#E6F4EA', // Academic Green Highlight Hex Token
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  pulseIndicatorDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#137333',
    marginRight: 5
  },
  badgeLabelContainerText: { 
    fontSize: 9, 
    fontWeight: '800', 
    color: '#137333' 
  },
  calendarDateBadgeFrame: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  calendarDateBadgeFrameText: { 
    fontSize: 11, 
    color: '#64748B', 
    fontWeight: '600' 
  },
  announcementCoreTitleText: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#0F172A', 
    marginTop: 12 
  },
  announcementCoreDescText: { 
    fontSize: 13, 
    color: '#475569', 
    marginTop: 6, 
    lineHeight: 19,
    fontWeight: '400'
  },
  cardInnerBottomDividerLine: { 
    height: 1, 
    backgroundColor: '#F1F5F9', 
    marginVertical: 14 
  },
  cardFooterLayoutBlock: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  authorityIndicatorRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5 
  },
  authorityIndicatorLabel: { 
    fontSize: 11, 
    fontWeight: '600', 
    color: '#64748B' 
  },
  shareMetricButtonContainer: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  // Structural Loader Skeleton Style Blueprint Block
  skeletonContainer: { 
    paddingHorizontal: 16, 
    paddingTop: 16 
  },
  skeletonCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 14, 
    borderWidth: 1, 
    borderColor: '#F1F5F9' 
  },
  skeletonTopRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 14 
  },
  skeletonTag: { 
    width: 70, 
    height: 16, 
    backgroundColor: '#F1F5F9', 
    borderRadius: 4 
  },
  skeletonDate: { 
    width: 75, 
    height: 14, 
    backgroundColor: '#F1F5F9', 
    borderRadius: 4 
  },
  skeletonTitleLine: { 
    width: '80%', 
    height: 16, 
    backgroundColor: '#F1F5F9', 
    borderRadius: 4, 
    marginBottom: 10 
  },
  skeletonDescLineLong: { 
    width: '100%', 
    height: 12, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 4, 
    marginBottom: 6 
  },
  skeletonDescLineShort: { 
    width: '50%', 
    height: 12, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 4 
  }
});