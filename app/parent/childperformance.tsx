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
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ChildPerformanceScreen() {
  const router = useRouter();
  
  // Simulated Tab State for switching semesters/terms easily if needed
  const [activeTerm, setActiveTerm] = useState<'Term 1' | 'Term 2'>('Term 1');

  // Reusable Component for Subject List Rows
  const SubjectPerformanceRow = ({ name, marks, grade, color }: { name: string; marks: string; grade: string; color: string }) => (
    <View style={styles.subjectRow}>
      <View style={styles.subjectLeft}>
        <View style={[styles.subjectIndicatorDot, { backgroundColor: color }]} />
        <Text style={styles.subjectNameText}>{name}</Text>
      </View>
      <View style={styles.subjectRight}>
        <Text style={styles.subjectMarksText}>{marks}</Text>
        <View style={[styles.gradeBadge, { backgroundColor: `${color}12` }]}>
          <Text style={[styles.gradeBadgeText, { color: color }]}>{grade}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER NAV */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Child Performance</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCanvas}>
        
        {/* 1. TOP OVERVIEW METRICS (RANK & ATTENDANCE & TOTAL MARKS) */}
        <View style={styles.metricsSummaryRow}>
          
          {/* Rank Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
              <FontAwesome5 name="award" size={16} color="#F97316" />
            </View>
            <Text style={styles.summaryValue}>04th</Text>
            <Text style={styles.summaryLabel}>Class Rank</Text>
            <Text style={styles.summarySubLabel}>Out of 42 students</Text>
          </View>

          {/* Attendance Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#E6F4EA' }]}>
              <Feather name="calendar" size={16} color="#137333" />
            </View>
            <Text style={styles.summaryValue}>92%</Text>
            <Text style={styles.summaryLabel}>Attendance</Text>
            <Text style={styles.summarySubLabel}>24/26 Days this month</Text>
          </View>

          {/* Aggregate Marks Card */}
          <View style={styles.summaryCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
              <Feather name="trending-up" size={16} color="#2563EB" />
            </View>
            <Text style={styles.summaryValue}>88.4%</Text>
            <Text style={styles.summaryLabel}>Aggregate Marks</Text>
            <Text style={styles.summarySubLabel}>Grade A (Excellent)</Text>
          </View>

        </View>

        {/* 2. SUBJECT-WISE PERFORMANCE ACCORDION GRID */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Subject Performance</Text>
            <Text style={styles.termSelectorText}>Term 1 Records</Text>
          </View>
          
          <View style={styles.cardFrame}>
            <SubjectPerformanceRow name="Mathematics" marks="94/100" grade="A+" color="#2563EB" />
            <SubjectPerformanceRow name="Physics" marks="88/100" grade="A" color="#8B5CF6" />
            <SubjectPerformanceRow name="Chemistry" marks="85/100" grade="A" color="#0D9488" />
            <SubjectPerformanceRow name="Computer Science" marks="96/100" grade="A+" color="#10B981" />
            <SubjectPerformanceRow name="English Literature" marks="79/100" grade="B+" color="#F59E0B" />
          </View>
        </View>

        {/* 3. WEAK SUBJECTS & FOCUS AREAS (CRITICAL TRACKER) */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Weak Subjects & Focus Areas</Text>
          <Text style={styles.sectionSubtitle}>Subjects where child needs extra attention or guidance</Text>
          
          <View style={[styles.cardFrame, { borderColor: '#FEE2E2', backgroundColor: '#FFFDFD' }]}>
            <View style={styles.weakSubjectRow}>
              <View style={styles.weakAlertHeader}>
                <MaterialCommunityIcons name="alert-decagram" size={18} color="#EF4444" />
                <Text style={styles.weakSubjectName}>English Literature (79/100)</Text>
              </View>
              <Text style={styles.weakSubjectDesc}>
                Bhai, child is performing well overall, but needs to work on long-form creative writing responses and grammar compliance.
              </Text>
              <View style={styles.remedialBadge}>
                <Text style={styles.remedialBadgeText}>Remedial Class Scheduled: Every Friday</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4. PROGRESS TRENDS (PARENT-FRIENDLY TIMELINE ELEVATION) */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Progress Trends</Text>
          <Text style={styles.sectionSubtitle}>Month-on-month academic growth comparison</Text>

          <View style={styles.cardFrame}>
            {/* Trend 1 */}
            <View style={styles.trendItem}>
              <View style={styles.trendLeftBox}>
                <View style={[styles.trendArrowFrame, { backgroundColor: '#E6F4EA' }]}>
                  <Feather name="arrow-up-right" size={14} color="#137333" />
                </View>
                <View>
                  <Text style={styles.trendTitle}>Monthly Unit Test 3</Text>
                  <Text style={styles.trendDate}>Compared to Unit Test 2</Text>
                </View>
              </View>
              <Text style={[styles.trendMetricText, { color: '#137333' }]}>+3.2% Growth</Text>
            </View>

            {/* Trend 2 */}
            <View style={styles.trendItem}>
              <View style={styles.trendLeftBox}>
                <View style={[styles.trendArrowFrame, { backgroundColor: '#E6F4EA' }]}>
                  <Feather name="arrow-up-right" size={14} color="#137333" />
                </View>
                <View>
                  <Text style={styles.trendTitle}>Mathematics Assignments</Text>
                  <Text style={styles.trendDate}>Consistency index</Text>
                </View>
              </View>
              <Text style={[styles.trendMetricText, { color: '#137333' }]}>Consistent (95%)</Text>
            </View>

            {/* Trend 3 */}
            <View style={[styles.trendItem, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <View style={styles.trendLeftBox}>
                <View style={[styles.trendArrowFrame, { backgroundColor: '#FEE2E2' }]}>
                  <Feather name="arrow-down-left" size={14} color="#EF4444" />
                </View>
                <View>
                  <Text style={styles.trendTitle}>Attendance Regularity</Text>
                  <Text style={styles.trendDate}>Due to marriage leaves</Text>
                </View>
              </View>
              <Text style={[styles.trendMetricText, { color: '#EF4444' }]}>-1.5% Drop</Text>
            </View>
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
  scrollCanvas: { padding: 16, paddingBottom: 40 },
  
  // Top horizontal summary cards
  metricsSummaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  summaryCard: {
    width: (width - 44) / 3, backgroundColor: '#F8FAFC', borderRadius: 16,
    padding: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'flex-start'
  },
  iconCircle: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  summaryValue: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  summaryLabel: { fontSize: 11, fontWeight: '700', color: '#475569', marginTop: 4 },
  summarySubLabel: { fontSize: 9, color: '#94A3B8', marginTop: 2 },

  // Base Section layout block
  sectionBlock: { marginBottom: 24 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', paddingLeft: 2 },
  sectionSubtitle: { fontSize: 11, color: '#94A3B8', marginTop: 2, paddingLeft: 2, marginBottom: 10 },
  termSelectorText: { fontSize: 11, fontWeight: '600', color: '#6D28D9', backgroundColor: '#F3E8FF', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  cardFrame: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#F1F5F9' },

  // Subject Performance Row items
  subjectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  subjectLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  subjectIndicatorDot: { width: 8, height: 8, borderRadius: 4 },
  subjectNameText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  subjectRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  subjectMarksText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  gradeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  gradeBadgeText: { fontSize: 10, fontWeight: '800' },

  // Weak Subject specific layouts
  weakSubjectRow: { paddingVertical: 2 },
  weakAlertHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  weakSubjectName: { fontSize: 13, fontWeight: '700', color: '#EF4444' },
  weakSubjectDesc: { fontSize: 12, color: '#64748B', lineHeight: 18, fontWeight: '500' },
  remedialBadge: { alignSelf: 'flex-start', backgroundColor: '#FEF2F2', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8, marginTop: 10 },
  remedialBadgeText: { fontSize: 10, fontWeight: '700', color: '#EF4444' },

  // Progress Trends components
  trendItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  trendLeftBox: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  trendArrowFrame: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  trendTitle: { fontSize: 12, fontWeight: '600', color: '#334155' },
  trendDate: { fontSize: 10, color: '#94A3B8', marginTop: 1 },
  trendMetricText: { fontSize: 12, fontWeight: '700' }
});