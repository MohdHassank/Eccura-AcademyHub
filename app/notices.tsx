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

// Production TypeScript Interface Definitions
export interface Notice {
  id: number;
  studentId: number;
  title: string;
  description: string;
  noticeDate: string;
}

interface ApiResponse {
  success: boolean;
  notices: Notice[];
}

export default function NoticesScreen() {
  const router = useRouter();

  // Core Reactive States Pipeline
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Encapsulated Async Data Engine Engine
  const fetchNoticesPipeline = async (showRefresher = false) => {
    try {
      if (!showRefresher) setLoading(true);
      setErrorMsg(null);

      const response = await axios.get<ApiResponse>('http://192.168.29.49:5000/api/student/notices/3', {
        timeout: 8000 // 8 seconds runtime threshold limit
      });

      if (response.data && response.data.success) {
        // Sorting Algorithm: Newest Notices First
        const sortedData = (response.data.notices || []).sort((a, b) => {
          return new Date(b.noticeDate).getTime() - new Date(a.noticeDate).getTime();
        });
        setNotices(sortedData);
      } else {
        setErrorMsg('System was unable to process server records payload structure.');
      }
    } catch (err: any) {
      console.error('Notice Data Downstream Retrieval Failure:', err);
      setErrorMsg(err.message || 'Network error encountered while contacting student matrix database.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Lifecycle Initialization Hooks
  useEffect(() => {
    fetchNoticesPipeline();
  }, []);

  // Native Pull-to-Refresh Handler
  const onRefreshTrigger = useCallback(() => {
    setRefreshing(true);
    fetchNoticesPipeline(true);
  }, []);

  // Optimized Search Filter Mechanics
  const memoizedFilteredNotices = useMemo(() => {
    if (!searchQuery.trim()) return notices;
    return notices.filter((notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, notices]);

  // Premium Micro-Component: Skeleton States Loader Layout
  const RenderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonTopRow}>
            <View style={styles.skeletonBadge} />
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

      {/* HEADER NAVIGATION ENGINE */}
      <View style={styles.appHeaderNav}>
        <TouchableOpacity 
          style={styles.backNavigationCta} 
          onPress={() => router.back()} 
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.appHeaderTitleText}>Notices</Text>
        <View style={styles.backNavigationSpacer} />
      </View>

      {/* COMPACT PREMIUM SEARCH MODULE */}
      <View style={styles.searchBarContainer}>
        <Feather name="search" size={18} color="#94A3B8" style={styles.searchEmbeddedIcon} />
        <TextInput
          style={styles.searchFieldInput}
          placeholder="Search notices by title or content..."
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

      {/* SYSTEM SCREEN DISPLAY MATRIX FLOW CONTROLLER */}
      {loading ? (
        <RenderSkeletonLoader />
      ) : errorMsg ? (
        <ScrollView 
          contentContainerStyle={styles.centerStateViewport}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshTrigger} colors={["#2563EB"]} />}
        >
          <MaterialCommunityIcons name="alert-circle-outline" size={54} color="#EF4444" />
          <Text style={styles.stateTitleText}>Sync Failure</Text>
          <Text style={styles.stateDescriptionSubText}>{errorMsg}</Text>
          <TouchableOpacity 
            style={[styles.actionRetryCta, { backgroundColor: '#EF4444' }]} 
            onPress={() => fetchNoticesPipeline()}
          >
            <Text style={styles.actionRetryCtaText}>Tap to Retry</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : memoizedFilteredNotices.length === 0 ? (
        <ScrollView 
          contentContainerStyle={styles.centerStateViewport}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshTrigger} colors={["#2563EB"]} />}
        >
          <MaterialCommunityIcons name="clipboard-text-search-outline" size={60} color="#CBD5E1" />
          <Text style={styles.stateTitleText}>No Notices Available</Text>
          <Text style={styles.stateDescriptionSubText}>
            Bhai, aapke network scope ya database query ke anusaar abhi koi circulars uplabdh nahi hain.
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
              colors={["#2563EB"]}
              tintColor="#2563EB"
            />
          }
        >
          {/* RENDER ACTIVE CARDS LOOP */}
          {memoizedFilteredNotices.map((item: Notice) => (
            <View key={item.id} style={styles.academicNoticeCardFrame}>
              
              {/* TOP STRIP METRICS BLOCK */}
              <View style={styles.cardHeaderStripRow}>
                <View style={styles.badgeLabelContainer}>
                  <Ionicons name="bookmark" size={12} color="#2563EB" style={{ marginRight: 3 }} />
                  <Text style={styles.badgeLabelContainerText}>OFFICIAL</Text>
                </View>
                
                {/* CALENDAR DATE BADGE */}
                <View style={styles.calendarDateBadgeFrame}>
                  <Feather name="calendar" size={12} color="#64748B" style={{ marginRight: 4 }} />
                  <Text style={styles.calendarDateBadgeFrameText}>{item.noticeDate}</Text>
                </View>
              </View>

              {/* BODY METRICS FIELD ARCHITECTURE */}
              <Text style={styles.noticeCoreTitleText}>{item.title}</Text>
              <Text style={styles.noticeCoreDescText}>{item.description}</Text>

              {/* COMPACT STYLING FOOTER ANCHOR */}
              <View style={styles.cardInnerBottomDividerLine} />
              <View style={styles.cardFooterLayoutBlock}>
                <View style={styles.authorityIndicatorRow}>
                  <View style={styles.authorityIconDot} />
                  <Text style={styles.authorityIndicatorLabel}>Academic Office Registry</Text>
                </View>
                <Feather name="chevron-right" size={14} color="#94A3B8" />
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
  academicNoticeCardFrame: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Premium Smooth Shadows Setup Rules
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
    backgroundColor: '#EFF6FF', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  badgeLabelContainerText: { 
    fontSize: 9, 
    fontWeight: '800', 
    color: '#2563EB' 
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
  noticeCoreTitleText: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#0F172A', 
    marginTop: 12 
  },
  noticeCoreDescText: { 
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
    gap: 6 
  },
  authorityIconDot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: '#94A3B8' 
  },
  authorityIndicatorLabel: { 
    fontSize: 11, 
    fontWeight: '600', 
    color: '#64748B' 
  },
  // Skeleton Styles Architecture 
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
  skeletonBadge: { 
    width: 60, 
    height: 16, 
    backgroundColor: '#F1F5F9', 
    borderRadius: 4 
  },
  skeletonDate: { 
    width: 80, 
    height: 14, 
    backgroundColor: '#F1F5F9', 
    borderRadius: 4 
  },
  skeletonTitleLine: { 
    width: '75%', 
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
    width: '45%', 
    height: 12, 
    backgroundColor: '#F8FAFC', 
    borderRadius: 4 
  }
});