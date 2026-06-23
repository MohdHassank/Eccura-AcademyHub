import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
import { Ionicons, Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AcademicTrackingScreen() {
  const router = useRouter();

  // Tab control state for easy filtering
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');
  const [completedHomework, setCompletedHomework] = useState([]);
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchAcademicTracking = async () => {
    try {

      const selectedChildId =
        await AsyncStorage.getItem(
          "selectedChildId"
        );

      const response = await axios.get(
        `http://192.168.29.49:5000/api/parent/academic-tracking/${selectedChildId}`
      );

      if (response.data.success) {

        setCompletedHomework(
          response.data.completedHomework
        );

        setPendingAssignments(
          response.data.pendingAssignments
        );

        setUpcomingTests(
          response.data.upcomingTests
        );

        setNotes(
          response.data.notes
        );
      }

    } catch (error) {

      console.log(
        "Academic Tracking Error:",
        error
      );

    } finally {

      setLoading(false);

    }
  };
  useEffect(() => {
    fetchAcademicTracking();
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER NAV ARCHITECTURE */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academic Tracking</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* SEGMENTED FILTER TAB CONTROLLER */}
      {/* <View style={styles.tabContainer}>
        {['all', 'pending', 'completed'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab as any)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCanvas}>

        {/* 1. HOMEWORK STATUS SECTION */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Homework Status</Text>
            <Text style={styles.sectionBadgeText}>Daily Tracking</Text>
          </View>

          <View style={styles.cardFrame}>
            {completedHomework.map((item: any, index: number) =>
              <View
                key={index}
                style={[
                  styles.trackingRow,
                  index === completedHomework.length - 1
                    ? { borderBottomWidth: 0 }
                    : {}
                ]}
              >
                <View style={styles.leftContentBlock}>
                  <View
                    style={[
                      styles.statusIndicatorDot,
                      { backgroundColor: '#10B981' }
                    ]}
                  />

                  <View>
                    <Text style={styles.itemMainTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.itemSubText}>
                      {item.subject} • Checked by {item.faculty}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: '#E6F4EA' }
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: '#137333' }
                    ]}
                  >
                    Completed
                  </Text>
                </View>
              </View>
            )
            }
          </View>
        </View>

        {/* 2. PENDING ASSIGNMENTS CRITICAL SECTION */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Pending Assignments</Text>
          <Text style={styles.sectionSubtitle}>Tasks requiring immediate completion before due date</Text>

          <View style={[styles.cardFrame, { borderColor: '#FEE2E2', backgroundColor: '#FFFDFD' }]}>
            {pendingAssignments.map((item: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.cardFrame,
                  {
                    borderColor: '#FEE2E2',
                    backgroundColor: '#FFFDFD',
                    marginBottom: 10,
                  },
                ]}
              >
                <View style={styles.criticalCardContent}>
                  <View style={styles.criticalHeaderRow}>
                    <MaterialCommunityIcons
                      name="alert-circle-outline"
                      size={18}
                      color="#EF4444"
                    />

                    <Text style={styles.criticalTitleText}>
                      {item.title}
                    </Text>
                  </View>

                  <Text style={styles.criticalBodyText}>
                    {item.description}
                  </Text>

                  <View style={styles.deadlineDockRow}>
                    <Feather
                      name="clock"
                      size={12}
                      color="#EF4444"
                    />

                    <Text style={styles.deadlineTimeText}>
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 3. UPCOMING TESTS SEGMENT */}
        <View style={styles.cardFrame}>
          <Text style={styles.sectionTitle}>Upcoming Tests</Text>
          {upcomingTests.length > 0 ? (
            upcomingTests.map((item: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.testItemRow,
                  index === upcomingTests.length - 1
                    ? { borderBottomWidth: 0, paddingBottom: 0 }
                    : {}
                ]}
              >
                <View style={styles.testDateBlock}>
                  <Text style={styles.testDateDay}>
                    {item.liveTill
                      ? new Date(item.liveTill).getDate()
                      : "--"}
                  </Text>

                  <Text style={styles.testDateMonth}>
                    {item.liveTill
                      ? new Date(item.liveTill).toLocaleString(
                        "default",
                        { month: "short" }
                      )
                      : "--"}
                  </Text>
                </View>

                <View style={styles.testDetailsBlock}>
                  <Text style={styles.testMainName}>
                    {item.title}
                  </Text>

                  <Text style={styles.testSubData}>
                    Subject: {item.subject}
                  </Text>

                  <Text style={styles.testTimingText}>
                    Duration: {item.duration || "N/A"} • Marks:{" "}
                    {item.marks || "N/A"}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                paddingVertical: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#64748B",
                  fontSize: 14,
                }}
              >
                No upcoming tests available
              </Text>
            </View>
          )}
        </View>
        {/* 4. NOTES & MATERIAL ACCESS PORTAL */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>
              Notes Access
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => router.push('/notes')}
            >
              <Text style={styles.viewAllTriggerActionText}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionSubtitle}>Download verified digital classroom resources</Text>

          <View style={styles.cardFrame}>
  {notes.length > 0 ? (
    notes.map((item: any, index: number) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.notesDownloadRow,
          index === notes.length - 1
            ? { borderBottomWidth: 0, paddingBottom: 0 }
            : {}
        ]}
        activeOpacity={0.7}
      >
        <View style={styles.notesLeftBlock}>
          <View
            style={[
              styles.fileIconBox,
              {
                backgroundColor:
                  index % 2 === 0
                    ? '#EFF6FF'
                    : '#F5F3FF'
              }
            ]}
          >
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={20}
              color={
                index % 2 === 0
                  ? '#2563EB'
                  : '#6D28D9'
              }
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={styles.notesFileName}
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text style={styles.notesMetaData}>
              {item.subject}
              {" • "}
              {item.fileSize}
            </Text>
          </View>
        </View>

        <Feather
          name="download"
          size={16}
          color="#64748B"
        />
      </TouchableOpacity>
    ))
  ) : (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 20
      }}
    >
      <Text
        style={{
          color: '#94A3B8'
        }}
      >
        No notes available
      </Text>
    </View>
  )}
</View>
        </View>

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
  backButton: {
    width: 38, height: 38, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
    justifyContent: 'center', alignItems: 'center'
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },

  // Tab Bar Segment Controls
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 10, gap: 8, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  tabButton: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: '#F8FAFC', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  activeTabButton: { backgroundColor: '#6D28D9', borderColor: '#6D28D9' },
  tabText: { fontSize: 11, fontWeight: '700', color: '#64748B' },
  activeTabText: { color: '#FFFFFF' },

  // Scroll Canvas Config
  scrollCanvas: { padding: 16, paddingBottom: 40 },
  sectionBlock: { marginBottom: 24 , marginTop: 12},
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', paddingLeft: 2 },
  sectionSubtitle: { fontSize: 11, color: '#94A3B8', marginTop: 2, paddingLeft: 2, marginBottom: 10 },
  sectionBadgeText: { fontSize: 10, fontWeight: '600', color: '#6D28D9', backgroundColor: '#F3E8FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  cardFrame: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#F1F5F9' },

  // Homework Layout Items
  trackingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  leftContentBlock: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  statusIndicatorDot: { width: 8, height: 8, borderRadius: 4 },
  itemMainTitle: { fontSize: 13, fontWeight: '600', color: '#334155' },
  itemSubText: { fontSize: 11, color: '#94A3B8', marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusBadgeText: { fontSize: 10, fontWeight: '700' },

  // Critical Alert Box Settings (Pending)
  criticalCardContent: { paddingVertical: 2 },
  criticalHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  criticalTitleText: { fontSize: 13, fontWeight: '700', color: '#EF4444' },
  criticalBodyText: { fontSize: 12, color: '#64748B', lineHeight: 18, fontWeight: '500' },
  deadlineDockRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 },
  deadlineTimeText: { fontSize: 11, fontWeight: '700', color: '#EF4444' },

  // Upcoming Tests Layout
  testItemRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  testDateBlock: { width: 46, height: 46, borderRadius: 10, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  testDateDay: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  testDateMonth: { fontSize: 9, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', marginTop: 1 },
  testDetailsBlock: { flex: 1, justifyContent: 'center' },
  testMainName: { fontSize: 13, fontWeight: '600', color: '#1E293B' },
  testSubData: { fontSize: 11, color: '#64748B', marginTop: 2 },
  testTimingText: { fontSize: 10, color: '#94A3B8', marginTop: 4, fontWeight: '500' },

  // Notes PDF Section Elements
  notesDownloadRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  viewAllTriggerActionText: { fontSize: 11, fontWeight: '600', color: '#3182CE' },
  notesLeftBlock: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 0.9 },
  fileIconBox: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  notesFileName: { fontSize: 13, fontWeight: '600', color: '#334155' },
  notesMetaData: { fontSize: 10, color: '#94A3B8', marginTop: 2 }
});