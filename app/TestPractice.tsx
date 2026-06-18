import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Alert
} from 'react-native';
import { 
  Ionicons, 
  MaterialCommunityIcons, 
  FontAwesome5 
} from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // 👈 Expo Router Import kiya

const { width } = Dimensions.get('window');
const cardWidth = (width - 44) / 2; // Perfect 2-column grid symmetry layout

export default function TestPracticeFinalScreen() {
  const router = useRouter(); // 👈 Navigation hook initialize kiya

  const gridItems = [
    { 
      id: '1', 
      title: 'Quiz', 
      sub: 'Attempt chapter &\ntopic-wise quizzes', 
      icon: 'file-document-edit-outline', 
      color: '#2563EB', 
      bg: '#EFF6FF', 
      arrowColor: '#2563EB',
      route: '/quiz' // 👈 Quiz Center Route Link kiya
    },
    { 
      id: '2', 
      title: 'Mock Tests', 
      sub: 'Simulate real exam\nenvironment', 
      icon: 'clipboard-text-outline', 
      color: '#10B981', 
      bg: '#ECFDF5', 
      arrowColor: '#10B981',
      route: '/mock-tests' // 👈 Mock Tests Route Link kiya
    },
    { 
      id: '3', 
      title: 'Daily Practice', 
      sub: 'Solve daily questions\n& build consistency', 
      icon: 'comment-question-outline', 
      color: '#EA580C', 
      bg: '#FFF7ED', 
      arrowColor: '#EA580C',
      route: null 
    },
    { 
      id: '4', 
      title: 'AI Quiz Practice', 
      sub: 'Get AI-generated quizzes\nbased on weak areas', 
      icon: 'robot-outline', 
      color: '#7C3AED', 
      bg: '#F5F3FF', 
      arrowColor: '#7C3AED', 
      badge: 'New',
      route: null
    },
    { 
      id: '5', 
      title: 'PYQ Section', 
      sub: "Practice previous years'\nquestions", 
      icon: 'file-document-outline', 
      color: '#EC4899', 
      bg: '#FDF2F8', 
      arrowColor: '#EC4899',
      route: "/previousPapers" // 👈 PYQ Section Route Link kiya
    },
    { 
      id: '6', 
      title: 'Test Results', 
      sub: 'Analyze performance\n& improve', 
      icon: 'chart-box-outline', 
      color: '#06B6D4', 
      bg: '#F0FDFA', 
      arrowColor: '#06B6D4',
      route: '/test-results' // 👈 Test Results Route Link kiya
    },
  ];

  // Navigation Logic Handler
  const handleCardPress = (item: typeof gridItems[0]) => {
    if (item.route) {
      router.push(item.route as any); // Dynamic navigation trigger
    } else {
      Alert.alert(
        "Coming Soon 🚀",
        `Bhai, ${item.title} module abhi dynamic construction mein hai. Agle update mein live ho jayega!`
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFBFD" />

      {/* ================= BACK NAVIGATION HEADER ================= */}
      <View style={styles.topHeaderNav}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#1E293B" />
        </TouchableOpacity>
        {/* <Text style={styles.topHeaderTitle}>Practice Engine</Text> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ================= HERO INTRO BANNER ================= */}
        <View style={styles.heroSection}>
          <View style={styles.titleColumn}>
            <Text style={styles.heroTitle}>Test & Practice</Text>
            <Text style={styles.heroSubtitle}>
              Practice more, perform better.{"\n"}Track your progress and achieve your goals.
            </Text>
          </View>
          
          {/* Clipboard Vector Graphic Representation */}
          <View style={styles.illustrationFrame}>
            <MaterialCommunityIcons name="clipboard-text-play-outline" size={56} color="#2563EB" />
            <View style={styles.clockFloatingBadge}>
              <Ionicons name="time-outline" size={16} color="#EA580C" />
            </View>
          </View>
        </View>

        {/* ================= OVERALL PROGRESS DASHBOARD GRAPH CARD ================= */}
        <View style={styles.progressDashboardCard}>
          {/* Dynamic Progress Ring Vector Mockup */}
          <View style={styles.progressRingFrame}>
            <View style={styles.progressRingVisual}>
              <Text style={styles.ringPercentageText}>72%</Text>
              <Text style={styles.ringSubLabelText}>Overall Progress</Text>
            </View>
          </View>

          {/* Core Analytical Growth Chart Representation */}
          <View style={styles.centerChartFrame}>
            <Text style={styles.chartStatusTitleText}>Great job!</Text>
            <Text style={styles.chartStatusSubText}>You're performing well.</Text>
            
            {/* Exactly Matching Dynamic Bar Steps in Image */}
            <View style={styles.mockBarsContainer}>
              <View style={[styles.mockBar, { height: 6, backgroundColor: '#E2E8F0' }]} />
              <View style={[styles.mockBar, { height: 12, backgroundColor: '#DBEAFE' }]} />
              <View style={[styles.mockBar, { height: 20, backgroundColor: '#93C5FD' }]} />
              <View style={[styles.mockBar, { height: 32, backgroundColor: '#60A5FA' }]} />
              <View style={[styles.mockBar, { height: 42, backgroundColor: '#34D399' }]} />
              <View style={[styles.mockBar, { height: 50, backgroundColor: '#10B981' }]} />
            </View>
          </View>

          {/* Right Metrics Numerical Stack Indicators */}
          <View style={styles.metricsStackColumn}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricNumberBlue}>12</Text>
              <Text style={styles.metricLabelText}>Tests Taken</Text>
            </View>
            <View style={styles.metricDividerLine} />
            <View style={styles.metricBlock}>
              <Text style={styles.metricNumberGreen}>8</Text>
              <Text style={styles.metricLabelText}>Topics Covered</Text>
            </View>
          </View>
        </View>

        {/* MIDDLE PROMPT QUESTION SECTION TITLE */}
        <Text style={styles.sectionHeadingText}>What do you want to practice?</Text>

        {/* ================= 2-COLUMN PREMIUM GRID BLOCK ================= */}
        <View style={styles.gridContainer}>
          {gridItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.gridCard} 
              activeOpacity={0.8}
              onPress={() => handleCardPress(item)} // 👈 Navigation Click Trigger bind kiya
            >
              {item.badge && (
                <View style={styles.newAlertBadge}>
                  <Text style={styles.newAlertBadgeText}>{item.badge}</Text>
                </View>
              )}

              {/* Spherical Rounded Circular Icon Shell */}
              <View style={[styles.gridIconBox, { backgroundColor: item.bg }]}>
                <MaterialCommunityIcons name={item.icon as any} size={26} color={item.color} />
              </View>

              <Text style={styles.gridCardTitle}>{item.title}</Text>
              <Text style={styles.gridCardDescription}>{item.sub}</Text>

              {/* Tiny Vector Custom Action Down Arrow Dot */}
              <View style={[styles.bottomArrowCircle, { backgroundColor: item.arrowColor }]}>
                <Ionicons name="arrow-forward" size={11} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= TARGET STATS DUAL FOOTER MODULE ================= */}
        <View style={styles.footerPromoLayoutRow}>
          
          {/* Left Frame: Consistency Target Box */}
          <View style={styles.footerTargetMessageBlock}>
            <View style={styles.targetIconOuterBox}>
              <MaterialCommunityIcons name="target" size={32} color="#2563EB" />
            </View>
            <View style={styles.targetTextsFrame}>
              <Text style={styles.targetMainHeadingText}>Consistency is the key!</Text>
              <Text style={styles.targetBodyDescription}>Keep practicing every day to achieve your goals.</Text>
            </View>
          </View>

          {/* Right Frame: Vertical Dual Counters Card Grid Stack */}
          <View style={styles.footerStatsColumnStack}>
            
            {/* Node 1: Day Streak Node */}
            <View style={styles.statMiniCardRow}>
              <View style={styles.fireBadgeCircle}>
                <FontAwesome5 name="fire" size={12} color="#EA580C" />
              </View>
              <View>
                <Text style={styles.statCounterNumberText}>7</Text>
                <Text style={styles.statCounterLabelText}>Day Streak</Text>
              </View>
            </View>

            <View style={styles.innerFooterCardDivider} />

            {/* Node 2: Rank Node */}
            <View style={styles.statMiniCardRow}>
              <View style={styles.trophyBadgeCircle}>
                <FontAwesome5 name="trophy" size={10} color="#D97706" />
              </View>
              <View>
                <Text style={styles.statCounterNumberText}>Top 15%</Text>
                <Text style={styles.statCounterLabelText}>Your Rank</Text>
              </View>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ============== PIXEL MATCHING STYLING SPECIFICATIONS ==============
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#FAFBFD' 
  },
  topHeaderNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FAFBFD',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerBackButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  topHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 14,
  },
  scrollContent: { 
    paddingHorizontal: 16, 
    paddingTop: 16, 
    paddingBottom: 32 
  },
  heroSection: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  titleColumn: { 
    flex: 1, 
    paddingRight: 8 
  },
  heroTitle: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#0F172A', 
    letterSpacing: -0.5 
  },
  heroSubtitle: { 
    fontSize: 12, 
    color: '#64748B', 
    marginTop: 6, 
    lineHeight: 16, 
    fontWeight: '500' 
  },
  illustrationFrame: { 
    width: 80, 
    height: 80, 
    borderRadius: 16, 
    backgroundColor: '#EFF6FF', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  clockFloatingBadge: {
    position: 'absolute',
    bottom: -4,
    left: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 }
  },
  
  // PROGRESS OVERVIEW METRICS CARD
  progressDashboardCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 1.5,
    marginBottom: 20,
  },
  progressRingFrame: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRingVisual: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 5,
    borderColor: '#10B981', 
    borderLeftColor: '#3B82F6', 
    borderBottomColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringPercentageText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  ringSubLabelText: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 1,
  },
  centerChartFrame: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  chartStatusTitleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  chartStatusSubText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  mockBarsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginTop: 8,
  },
  mockBar: {
    width: 6,
    borderRadius: 3,
  },
  metricsStackColumn: {
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  metricBlock: {
    paddingVertical: 1,
  },
  metricNumberBlue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
  },
  metricNumberGreen: {
    fontSize: 15,
    fontWeight: '800',
    color: '#10B981',
  },
  metricLabelText: {
    fontSize: 8,
    color: '#64748B',
    fontWeight: '600',
  },
  metricDividerLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
    width: 55,
    marginVertical: 4,
  },

  sectionHeadingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 12,
  },

  // 2-COLUMN MODULAR CARD GRID
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    width: cardWidth,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 1,
  },
  newAlertBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  newAlertBadgeText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#6B21A8',
  },
  gridIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gridCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  gridCardDescription: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 13,
    minHeight: 26,
  },
  bottomArrowCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  // PIXEL-MATCHING BOTTOM HORIZONTAL SPLIT FOOTER
  footerPromoLayoutRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  footerTargetMessageBlock: {
    flex: 1.2,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    gap: 10,
  },
  targetIconOuterBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetTextsFrame: {
    flex: 1,
  },
  targetMainHeadingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  targetBodyDescription: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 12,
  },
  footerStatsColumnStack: {
    flex: 0.8,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    justifyContent: 'center',
    gap: 4,
  },
  statMiniCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  fireBadgeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center'
  },
  trophyBadgeCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statCounterNumberText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A',
  },
  statCounterLabelText: {
    fontSize: 8,
    color: '#94A3B8',
    fontWeight: '600',
  },
  innerFooterCardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    width: '100%',
  },
});