import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');


const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export default function ParentDashboardScreen() {
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchParentDashboard = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");

      if (!userString) return;

      const user = JSON.parse(userString);

      const response = await axios.get(
        `http://192.168.29.49:5000/api/parent/dashboard/${user.id}`
      );

      if (response.data.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Parent Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParentDashboard();
  }, []);


  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 1. BRAND NAVIGATION HEADER */}
      <View style={styles.topHeaderNavbar}>
        {/* Balanced left spacer for proper alignment */}
        <View style={styles.headerSpacerPlaceholder} />

        <View style={styles.brandGroupCentered}>
          <Image
            source={require('../../assets/images/logo.png')}
            defaultSource={require('../../assets/images/logo.png')}
            style={styles.brandLogoImageEnhancedOnly}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerActionGroupRight}>
          <TouchableOpacity
            style={styles.bellIconTouch}
            activeOpacity={0.7}
            onPress={() => router.push('/parent/notifications')}
          >
            <Feather name="bell" size={24} color="#55688a" />
            <View style={styles.notificationBadgeCount}>
              <Text style={styles.badgeTextNumber}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCanvasContainer}>

        {/* 2. GREETINGS SECTION */}
        <View style={styles.greetingHeaderBlock}>
          <Text style={styles.greetingLightText}>
            {getGreeting()},
          </Text>
          <View style={styles.parentNameRow}>
            <Text style={styles.parentMainName}>
              {dashboardData?.parent?.fullName || "Parent"} 👋
            </Text>
          </View>
          <Text style={styles.subDashboardWelcome}>Welcome to your Parent Dashboard</Text>
        </View>

        {/* 3. HERO CARD: CHILD BASIC IDENTITY & QUICK METRICS */}
        <View style={styles.childStatsMainHeroCard}>
          <View style={styles.childProfileTopBriefRow}>
            <View style={styles.childAvatarContainerCircle}>
              <MaterialCommunityIcons name="account-child" size={46} color="#2B6CB0" />
            </View>
            <View style={styles.childNameClassDetailsStack}>
              <Text style={styles.childProfileNameText}>
                {dashboardData?.student?.fullName || "Student"}
              </Text>
              <Text style={styles.childClassStreamText}>Class Class {dashboardData?.student?.class_name || "N/A"}</Text>
              <View style={styles.rollNumberContainerBadge}>
                <Text style={styles.rollNoTextTitle}>Roll No. {dashboardData?.student?.roll_number || "N/A"}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.accordionDropdownChevronAnchor}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#64748B"
              />
            </TouchableOpacity>
          </View>

          {/* FOUR VERTICAL DIVIDED QUICK DASHBOARDS METRICS */}
          <View style={styles.fourMetricsHorizontalGrid}>
            <View style={styles.individualStatBlockItem}>
              <Feather name="calendar" size={16} color="#3182CE" style={styles.statComponentIcon} />
              <Text style={styles.statMetricLabelText}>Attendance</Text>
              <Text style={[styles.statValueCoreMain, { color: '#3182CE' }]}>92%</Text>
              <Text style={styles.statSubMetaMessageText}>This Month</Text>
            </View>

            <View style={styles.verticalSeparatorBorderLine} />

            <View style={styles.individualStatBlockItem}>
              <Feather name="award" size={16} color="#38A169" style={styles.statComponentIcon} />
              <Text style={styles.statMetricLabelText}>Rank</Text>
              <Text style={[styles.statValueCoreMain, { color: '#2D3748' }]}>15</Text>
              <Text style={styles.statSubMetaMessageText}>In Class</Text>
            </View>

            <View style={styles.verticalSeparatorBorderLine} />

            <View style={styles.individualStatBlockItem}>
              <Feather name="book-open" size={16} color="#805AD5" style={styles.statComponentIcon} />
              <Text style={styles.statMetricLabelText}>Subjects</Text>
              <Text style={[styles.statValueCoreMain, { color: '#2D3748' }]}>6</Text>
              <Text style={styles.statSubMetaMessageText}>Enrolled</Text>
            </View>

            <View style={styles.verticalSeparatorBorderLine} />

            <View style={styles.individualStatBlockItem}>
              <Feather name="shield" size={16} color="#38A169" style={styles.statComponentIcon} />
              <Text style={styles.statMetricLabelText}>Overall Status</Text>
              <Text style={[styles.statValueCoreMain, { color: '#38A169', fontSize: 13, marginTop: 4, marginBottom: 4 }]}>Good</Text>
              <Text style={styles.statSubMetaMessageText}>Keep it up!</Text>
            </View>
          </View>
        </View>

        {/* 4. CHILD PERFORMANCE SECTION (MOVED UP) */}
        <View style={styles.sectionHeaderFlexContainerRow}>
          <Text style={styles.sectionModuleHeaderHeadlineText}>Child Performance</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('/parent/childperformance')}>
            <Text style={styles.viewAllTriggerActionText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* HORIZONTAL GRID SCROLLER FOR SUBJECT CARDS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalGridSubjectScrollerFrameContainer}
        >
          {/* Card 1: Physics */}
          <View style={styles.subjectPerformanceGridCardItemFrameBox}>
            <View style={[styles.subjectIconWrapCircularFrame, { backgroundColor: '#E6F4EA' }]}>
              <MaterialCommunityIcons name="atom" size={18} color="#38A169" />
            </View>
            <Text style={styles.subjectCardTitleLabelNameText}>Physics</Text>
            <Text style={styles.subjectPerformancePercentageScoreMainValueText}>78%</Text>
            <Text style={[styles.subjectRemedialStatusTextIndicatorTagLabel, { color: '#38A169' }]}>Good</Text>
          </View>

          {/* Card 2: Maths */}
          <View style={styles.subjectPerformanceGridCardItemFrameBox}>
            <View style={[styles.subjectIconWrapCircularFrame, { backgroundColor: '#EBF8FF' }]}>
              <MaterialCommunityIcons name="calculator" size={18} color="#3182CE" />
            </View>
            <Text style={styles.subjectCardTitleLabelNameText}>Maths</Text>
            <Text style={styles.subjectPerformancePercentageScoreMainValueText}>85%</Text>
            <Text style={[styles.subjectRemedialStatusTextIndicatorTagLabel, { color: '#3182CE' }]}>Very Good</Text>
          </View>

          {/* Card 3: Chemistry */}
          <View style={styles.subjectPerformanceGridCardItemFrameBox}>
            <View style={[styles.subjectIconWrapCircularFrame, { backgroundColor: '#F3E8FF' }]}>
              <MaterialCommunityIcons name="flask-outline" size={18} color="#805AD5" />
            </View>
            <Text style={styles.subjectCardTitleLabelNameText}>Chemistry</Text>
            <Text style={styles.subjectPerformancePercentageScoreMainValueText}>92%</Text>
            <Text style={[styles.subjectRemedialStatusTextIndicatorTagLabel, { color: '#805AD5' }]}>Excellent</Text>
          </View>

          {/* Card 4: English */}
          <View style={styles.subjectPerformanceGridCardItemFrameBox}>
            <View style={[styles.subjectIconWrapCircularFrame, { backgroundColor: '#FFFAF0' }]}>
              <MaterialCommunityIcons name="book-open-page-variant" size={18} color="#DD6B20" />
            </View>
            <Text style={styles.subjectCardTitleLabelNameText}>English</Text>
            <Text style={styles.subjectPerformancePercentageScoreMainValueText}>88%</Text>
            <Text style={[styles.subjectRemedialStatusTextIndicatorTagLabel, { color: '#DD6B20' }]}>Very Good</Text>
          </View>
        </ScrollView>

        {/* 5. NEW CONNECT & SUPPORT SECTION (REPLACED RECENT UPDATES) */}
        <View style={[styles.sectionHeaderFlexContainerRow, { marginTop: 28 }]}>
          <Text style={styles.sectionModuleHeaderHeadlineText}>Connect & Support</Text>
          <Text style={styles.viewAllTriggerActionText}>Help Desk</Text>
        </View>

        <View style={styles.supportContainerCardBoxFrame}>
          <Text style={styles.supportCardBriefParaDescription}>
            Have any queries, complaints, or doubts regarding your child's academic journey? Connect with us directly.
          </Text>

          <View style={styles.supportInteractiveButtonsRow}>
            {/* Teacher Contact Button */}
            <TouchableOpacity style={styles.supportActionTriggerPillButton} activeOpacity={0.7}>
              <View style={[styles.supportIconBackgroundBadge, { backgroundColor: '#EBF8FF' }]}>
                <Ionicons name="chatbubbles-outline" size={18} color="#2B6CB0" />
              </View>
              <View style={styles.supportPillTextStackDetails}>
                <Text style={styles.supportButtonTitleLabelHead}>Talk to Teacher</Text>
                <Text style={styles.supportButtonSubDescriptionHint}>Clear academic doubts</Text>
              </View>
              <Feather name="arrow-right" size={14} color="#A0AEC0" />
            </TouchableOpacity>

            {/* School Admin Contact Button */}
            <TouchableOpacity style={styles.supportActionTriggerPillButton} activeOpacity={0.7}>
              <View style={[styles.supportIconBackgroundBadge, { backgroundColor: '#FEF3C7' }]}>
                <MaterialCommunityIcons name="shield-alert-outline" size={18} color="#D97706" />
              </View>
              <View style={styles.supportPillTextStackDetails}>
                <Text style={styles.supportButtonTitleLabelHead}>Raise an Issue</Text>
                <Text style={styles.supportButtonSubDescriptionHint}>Fees & Administration</Text>
              </View>
              <Feather name="arrow-right" size={14} color="#A0AEC0" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* 6. BOTTOM NAVIGATION TABSTICK DOCK BAR BAR */}
      <View style={styles.bottomTabStickyNavigationBarDockContainer}>
        <TouchableOpacity style={styles.individualTabItemAnchorButton} activeOpacity={0.8}>
          <View style={styles.activeTabIconBackgroundPillWrap}>
            <Ionicons name="home" size={20} color="#1A365D" />
          </View>
          <Text style={[styles.tabItemLabelInlineTextText, styles.activeTabTextWeight]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.individualTabItemAnchorButton}
          activeOpacity={0.8}
          onPress={() => router.push('/parent/academicTracking')}
        >
          <Ionicons name="book-outline" size={20} color="#718096" />
          <Text style={styles.tabItemLabelInlineTextText}>Academics</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.individualTabItemAnchorButton} activeOpacity={0.8} onPress={() => router.push('/parent/FeesTracking')}>
          <Ionicons name="wallet-outline" size={20} color="#718096" />
          <Text style={styles.tabItemLabelInlineTextText}>Fees</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.individualTabItemAnchorButton}
          activeOpacity={0.8}
          onPress={() => router.push('/parent/notifications')}
        >
          <View style={{ position: 'relative' }}>
            <Ionicons name="notifications-outline" size={20} color="#718096" />
            <View style={styles.bottomTabAlertBadgeCountIndicatorDot}>
              <Text style={styles.bottomTabBadgeTextContentMini}>3</Text>
            </View>
          </View>
          <Text style={styles.tabItemLabelInlineTextText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.individualTabItemAnchorButton}
          activeOpacity={0.8}
          onPress={() => router.push('/parent/profile')}
        >
          <Ionicons name="person-outline" size={20} color="#718096" />
          <Text style={styles.tabItemLabelInlineTextText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}
          >

            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Student Profile
              </Text>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={24}
                  color="#64748B"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.profileSection}>

              <MaterialCommunityIcons
                name="account-circle"
                size={90}
                color="#2563EB"
              />

              <Text style={styles.studentName}>
                {dashboardData?.student?.fullName}
              </Text>

              <Text style={styles.studentClass}>
                Class {dashboardData?.student?.class_name}
              </Text>

            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                Roll No. {dashboardData?.student?.roll_number}
              </Text>
            </View>

            <View style={[styles.academicDataMetaRow, { borderBottomWidth: 0, paddingBottom: 2, flexDirection: 'column', alignItems: 'flex-start', gap: 10 }]}>
                          <View style={styles.academicInfoLeftMetaGroup}>
                            <View style={[styles.academicInfoIconBox, { backgroundColor: "#3B82F610" }]}>
                              <Feather name="layers" size={15} color="#3B82F6" />
                            </View>
                            <Text style={styles.academicInfoLabelTitle}>Selected Subjects</Text>
                          </View>
            
                          {/* Flexible Wrap Chip Flow Track */}
                          <View style={styles.academicSubjectsChipsContainer}>
                            {(dashboardData?.student?.subjects ?? []).map((subject: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined, idx: React.Key | null | undefined) => (
                              <View key={idx} style={styles.academicSubjectPillItem}>
                                <Text style={styles.academicSubjectPillText}>{subject}</Text>
                              </View>
                            ))}
                          </View>
                        </View>

          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );




}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFD' },

  // 1. Navbar layout
  topHeaderNavbar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 12, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  headerSpacerPlaceholder: { width: 44 },
  brandGroupCentered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  brandLogoImageEnhancedOnly: {
    width: 140,
    height: 45,
  },
  headerActionGroupRight: { width: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  bellIconTouch: { position: 'relative', padding: 2 },
  notificationBadgeCount: {
    position: 'absolute', top: -2, right: -2, backgroundColor: '#FF3B30',
    width: 15, height: 15, borderRadius: 7.5, justifyContent: 'center', alignItems: 'center'
  },
  badgeTextNumber: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },

  // Content Scroller Frame canvas
  scrollCanvasContainer: { padding: 18, paddingBottom: 100 },

  // 2. Greetings typography
  greetingHeaderBlock: { marginBottom: 20, marginTop: 4 },
  greetingLightText: { fontSize: 18, color: '#1A365D', fontWeight: '500' },
  parentNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  parentMainName: { fontSize: 24, fontWeight: '800', color: '#1A365D' },
  waveHandEmoji: { fontSize: 22 },
  subDashboardWelcome: { fontSize: 12, color: '#718096', marginTop: 4, fontWeight: '500' },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    minHeight: 420,
  },

  modalHandle: {
    width: 50,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 18,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  studentName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 8,
  },

  studentClass: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },

  infoCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  infoText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
  },

  subjectTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },

  subjectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  subjectChip: {
    backgroundColor: "#EBF4FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },

  subjectChipText: {
    color: "#2563EB",
    fontWeight: "600",
  },
  // 3. Child Stats Core Box Hero
  childStatsMainHeroCard: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16,
    borderWidth: 1, borderColor: '#E2E8F0',
    shadowColor: '#1A365D', shadowOpacity: 0.04, shadowRadius: 16, shadowOffset: { width: 0, height: 8 },
    elevation: 3, marginBottom: 24
  },
  childProfileTopBriefRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  childAvatarContainerCircle: {
    width: 54, height: 54, borderRadius: 27, backgroundColor: '#EBF8FF',
    justifyContent: 'center', alignItems: 'center', marginRight: 14
  },
  childNameClassDetailsStack: { flex: 1 },
  childProfileNameText: { fontSize: 16, fontWeight: '700', color: '#1A365D' },
  childClassStreamText: { fontSize: 11, color: '#4A5568', marginTop: 2, fontWeight: '600' },
  rollNumberContainerBadge: {
    alignSelf: 'flex-start', backgroundColor: '#EBF8FF',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 5
  },
  rollNoTextTitle: { fontSize: 9, fontWeight: '700', color: '#2B6CB0' },
  accordionDropdownChevronAnchor: { padding: 4 },

  fourMetricsHorizontalGrid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 },
  individualStatBlockItem: { flex: 1, alignItems: 'center' },
  statComponentIcon: { marginBottom: 6 },
  statMetricLabelText: { fontSize: 10, color: '#718096', fontWeight: '500' },
  statValueCoreMain: { fontSize: 15, fontWeight: '800', marginTop: 5, marginBottom: 2 },
  statSubMetaMessageText: { fontSize: 9, color: '#A0AEC0', fontWeight: '500' },
  verticalSeparatorBorderLine: { width: 1, height: 40, backgroundColor: '#EDF2F7' },

  // 4. Section headers splits bars
  sectionHeaderFlexContainerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 12, paddingHorizontal: 2
  },
  sectionModuleHeaderHeadlineText: { fontSize: 14, fontWeight: '700', color: '#1A365D' },
  viewAllTriggerActionText: { fontSize: 11, fontWeight: '600', color: '#3182CE' },

  // 5. Subject micro grid cards style definitions
  horizontalGridSubjectScrollerFrameContainer: { gap: 12, paddingRight: 10 },
  subjectPerformanceGridCardItemFrameBox: {
    width: (width - 64) / 3.5, backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#EDF2F7',
    shadowColor: '#1A365D', shadowOpacity: 0.02, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
    elevation: 1
  },
  subjectIconWrapCircularFrame: {
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8
  },
  subjectCardTitleLabelNameText: { fontSize: 11, fontWeight: '600', color: '#718096' },
  subjectPerformancePercentageScoreMainValueText: { fontSize: 15, fontWeight: '800', color: '#1A365D', marginVertical: 4 },
  subjectRemedialStatusTextIndicatorTagLabel: { fontSize: 9, fontWeight: '700' },

  // 6. Premium Support & Connect Box
  supportContainerCardBoxFrame: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16,
    borderWidth: 1, borderColor: '#E2E8F0',
    shadowColor: '#1A365D', shadowOpacity: 0.03, shadowRadius: 12, shadowOffset: { width: 0, height: 6 },
    elevation: 2, marginBottom: 12
  },
  supportCardBriefParaDescription: { fontSize: 12, color: '#64748B', lineHeight: 18, fontWeight: '500', marginBottom: 16 },
  supportInteractiveButtonsRow: { gap: 12 },
  supportActionTriggerPillButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
    borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#F1F5F9'
  },
  supportIconBackgroundBadge: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  supportPillTextStackDetails: { flex: 1 },
  supportButtonTitleLabelHead: { fontSize: 13, fontWeight: '700', color: '#1A365D' },
  supportButtonSubDescriptionHint: { fontSize: 10, color: '#94A3B8', marginTop: 2, fontWeight: '500' },

  // 7. Bottom sticky navigation controller
  bottomTabStickyNavigationBarDockContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 64, backgroundColor: '#FFFFFF', flexDirection: 'row',
    borderTopWidth: 1, borderTopColor: '#EDF2F7', paddingBottom: Platform.OS === 'ios' ? 12 : 0
  },
  individualTabItemAnchorButton: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 4 },
  activeTabIconBackgroundPillWrap: {
    backgroundColor: '#EBF8FF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12
  },
  tabItemLabelInlineTextText: { fontSize: 10, fontWeight: '500', color: '#718096' },
  activeTabTextWeight: { color: '#1A365D', fontWeight: '700' },
  bottomTabAlertBadgeCountIndicatorDot: {
    position: 'absolute', top: -3, right: -6, backgroundColor: '#FF3B30',
    width: 13, height: 13, borderRadius: 6.5, justifyContent: 'center', alignItems: 'center'
  },
  bottomTabBadgeTextContentMini: { color: '#FFFFFF', fontSize: 8, fontWeight: '700' },
  
  academicDataMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  academicInfoLeftMetaGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  academicInfoIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  academicInfoLabelTitle: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#475569",
  },
  academicInfoValueContent: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  academicSubjectsChipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
    width: "100%",
  },
  academicSubjectPillItem: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  academicSubjectPillText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#334155",
  },
});