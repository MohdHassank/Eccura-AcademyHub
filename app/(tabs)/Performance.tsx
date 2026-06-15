import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const isSmallDevice = width < 375;

export default function PerformanceScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#1E293B" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <MaterialCommunityIcons
              name="triangle"
              size={24}
              color="#00A3FF"
              style={styles.logoIcon}
            />
            <Text style={styles.logoTextMain}>
              Academy<Text style={styles.logoTextSub}>Hub</Text>
            </Text>
          </View>
          <Text style={styles.logoTagline}>Learn. Grow. Succeed.</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color="#1E293B" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITLE & SUBTITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Performance</Text>
          <Text style={styles.pageSubtitle}>
            Track, analyze and improve your learning performance.
          </Text>
        </View>

        {/* TWO-COLUMN CARDS GRID */}
        <View style={styles.gridContainer}>
          {/* COLUMN 1 */}
          <View style={styles.gridColumn}>
            {/* CARD 1: SUBJECT-WISE ANALYTICS */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View
                  style={[styles.numberBadge, { backgroundColor: "#EFF6FF" }]}
                >
                  <Text style={[styles.numberBadgeText, { color: "#2563EB" }]}>
                    1
                  </Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardMainTitle}>
                    Subject-wise Analytics
                  </Text>
                  <Text style={styles.cardSubTitle}>
                    See how you're performing in each subject.
                  </Text>
                </View>
              </View>

              {/* Chart Visual Simulation */}
              <View style={styles.chartContainer}>
                <View style={styles.donutPlaceholder}>
                  <Text style={styles.donutPercentage}>78%</Text>
                  <Text style={styles.donutLabel}>Overall</Text>
                </View>

                <View style={styles.legendContainer}>
                  <View style={styles.legendRow}>
                    <View
                      style={[styles.dot, { backgroundColor: "#3B82F6" }]}
                    />
                    <Text style={styles.legendText}>Physics</Text>
                    <Text style={styles.legendValue}>92%</Text>
                  </View>
                  <View style={styles.legendRow}>
                    <View
                      style={[styles.dot, { backgroundColor: "#10B981" }]}
                    />
                    <Text style={styles.legendText}>Chemistry</Text>
                    <Text style={styles.legendValue}>76%</Text>
                  </View>
                  <View style={styles.legendRow}>
                    <View
                      style={[styles.dot, { backgroundColor: "#F59E0B" }]}
                    />
                    <Text style={styles.legendText}>Mathematics</Text>
                    <Text style={styles.legendValue}>68%</Text>
                  </View>
                  <View style={styles.legendRow}>
                    <View
                      style={[styles.dot, { backgroundColor: "#8B5CF6" }]}
                    />
                    <Text style={styles.legendText}>Biology</Text>
                    <Text style={styles.legendValue}>85%</Text>
                  </View>
                  <View style={styles.legendRow}>
                    <View
                      style={[styles.dot, { backgroundColor: "#EC4899" }]}
                    />
                    <Text style={styles.legendText}>English</Text>
                    <Text style={styles.legendValue}>60%</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#EFF6FF" }]}
              >
                <Text style={[styles.actionButtonText, { color: "#2563EB" }]}>
                  View Detailed Analytics
                </Text>
                <Feather name="chevron-right" size={16} color="#2563EB" />
              </TouchableOpacity>
            </View>

            {/* CARD 3: PROGRESS GRAPH */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View
                  style={[styles.numberBadge, { backgroundColor: "#EFF6FF" }]}
                >
                  <Text style={[styles.numberBadgeText, { color: "#2563EB" }]}>
                    3
                  </Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardMainTitle}>Progress Graph</Text>
                  <Text style={styles.cardSubTitle}>
                    Your learning progress over time.
                  </Text>
                </View>
              </View>

              {/* Line Chart Graphic Mockup */}
              <View style={styles.graphWrapper}>
                <View style={styles.graphPointsRow}>
                  <View style={[styles.graphBarSegment, { height: 30 }]} />
                  <View style={[styles.graphBarSegment, { height: 50 }]} />
                  <View style={[styles.graphBarSegment, { height: 65 }]} />
                  <View style={[styles.graphBarSegment, { height: 75 }]} />
                  <View style={[styles.graphBarSegment, { height: 90 }]} />
                  <View
                    style={[
                      styles.graphBarSegment,
                      { height: 100, backgroundColor: "#3B82F6" },
                    ]}
                  >
                    <View style={styles.graphTooltip}>
                      <Text style={styles.tooltipText}>78%</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.graphLabelsRow}>
                  <Text style={styles.graphLabel}>Wk 1</Text>
                  <Text style={styles.graphLabel}>Wk 2</Text>
                  <Text style={styles.graphLabel}>Wk 3</Text>
                  <Text style={styles.graphLabel}>Wk 4</Text>
                  <Text style={styles.graphLabel}>Wk 5</Text>
                  <Text style={styles.graphActiveLabel}>This Week</Text>
                </View>
              </View>

              <View style={styles.insightBox}>
                <MaterialCommunityIcons
                  name="trending-up"
                  size={20}
                  color="#2563EB"
                />
                <Text style={styles.insightText}>
                  You've improved by{" "}
                  <Text style={{ fontWeight: "700", color: "#10B981" }}>
                    18%
                  </Text>{" "}
                  compared to last month!
                </Text>
              </View>
            </View>

            {/* CARD 5: STUDY TIME TRACKER */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View
                  style={[styles.numberBadge, { backgroundColor: "#EFF6FF" }]}
                >
                  <Text style={[styles.numberBadgeText, { color: "#2563EB" }]}>
                    5
                  </Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardMainTitle}>Study Time Tracker</Text>
                  <Text style={styles.cardSubTitle}>
                    Track how much time you invest in your studies.
                  </Text>
                </View>
              </View>

              <View style={styles.trackerBody}>
                <View style={styles.circleProgressWrapper}>
                  <View style={styles.circleTimeInner}>
                    <Text style={styles.timeBold}>24h 30m</Text>
                    <Text style={styles.timeSub}>This Week</Text>
                  </View>
                </View>

                <View style={styles.barStatsContainer}>
                  {/* Mon - Sun Tracker Bars */}
                  {[
                    { day: "Mon", h: "5h 20m", fill: "100%" },
                    { day: "Tue", h: "4h 10m", fill: "80%" },
                    { day: "Wed", h: "3h 45m", fill: "70%" },
                    { day: "Thu", h: "5h 30m", fill: "100%" },
                    { day: "Fri", h: "4h 15m", fill: "82%" },
                    { day: "Sat", h: "1h 30m", fill: "30%" },
                    { day: "Sun", h: "0h 00m", fill: "5%" },
                  ].map((item, idx) => (
                    <View key={idx} style={styles.statBarRow}>
                      <Text style={styles.barDayLabel}>{item.day}</Text>
                      <View style={styles.barTrackBackground}>
                        <View
                          style={[
                            styles.barTrackFill,
                            { width: item.fill as any },
                          ]}
                        />
                      </View>
                      <Text style={styles.barHourLabel}>{item.h}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.averageFooterBox}>
                <Ionicons name="time-outline" size={16} color="#2563EB" />
                <Text style={styles.averageFooterText}>
                  Daily average:{" "}
                  <Text style={{ fontWeight: "700" }}>3h 30m</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* COLUMN 2 */}
          <View style={styles.gridColumn}>
            {/* CARD 2: WEAK TOPICS DETECTION */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View
                  style={[styles.numberBadge, { backgroundColor: "#FEF2F2" }]}
                >
                  <Text style={[styles.numberBadgeText, { color: "#EF4444" }]}>
                    2
                  </Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardMainTitle}>
                    Weak Topics Detection
                  </Text>
                  <Text style={styles.cardSubTitle}>
                    Focus on the topics that need more attention.
                  </Text>
                </View>
              </View>

              {/* List Items */}
              <View style={styles.listContainer}>
                <View style={styles.topicItemRow}>
                  <View
                    style={[
                      styles.topicIconContainer,
                      { backgroundColor: "#FEE2E2" },
                    ]}
                  >
                    <FontAwesome5 name="atom" size={14} color="#EF4444" />
                  </View>
                  <View style={styles.topicTextWrapper}>
                    <Text style={styles.topicItemTitle}>Thermodynamics</Text>
                    <Text style={styles.topicItemSub}>Physics</Text>
                  </View>
                  <Text style={[styles.statusTag, { color: "#EF4444" }]}>
                    Weak
                  </Text>
                </View>

                <View style={styles.topicItemRow}>
                  <View
                    style={[
                      styles.topicIconContainer,
                      { backgroundColor: "#ECFDF5" },
                    ]}
                  >
                    <FontAwesome5 name="flask" size={14} color="#10B981" />
                  </View>
                  <View style={styles.topicTextWrapper}>
                    <Text style={styles.topicItemTitle}>Chemical Bonding</Text>
                    <Text style={styles.topicItemSub}>Chemistry</Text>
                  </View>
                  <Text style={[styles.statusTag, { color: "#F59E0B" }]}>
                    Average
                  </Text>
                </View>

                <View style={styles.topicItemRow}>
                  <View
                    style={[
                      styles.topicIconContainer,
                      { backgroundColor: "#EEF2F6" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="variable"
                      size={16}
                      color="#6366F1"
                    />
                  </View>
                  <View style={styles.topicTextWrapper}>
                    <Text style={styles.topicItemTitle}>Integration</Text>
                    <Text style={styles.topicItemSub}>Mathematics</Text>
                  </View>
                  <Text style={[styles.statusTag, { color: "#EF4444" }]}>
                    Weak
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#FEF2F2" }]}
              >
                <Text style={[styles.actionButtonText, { color: "#EF4444" }]}>
                  View All Weak Topics
                </Text>
                <Feather name="chevron-right" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>

            {/* CARD 4: ATTENDANCE % */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View
                  style={[styles.numberBadge, { backgroundColor: "#ECFDF5" }]}
                >
                  <Text style={[styles.numberBadgeText, { color: "#10B981" }]}>
                    4
                  </Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardMainTitle}>Attendance %</Text>
                  <Text style={styles.cardSubTitle}>
                    Keep up your consistency!
                  </Text>
                </View>
              </View>

              <View style={styles.attendanceBodyRow}>
                <View style={styles.attendanceRadialSegment}>
                  <Text style={styles.attendancePercentText}>92%</Text>
                  <Text style={styles.attendanceRadialLabel}>This Month</Text>
                </View>

                <View style={styles.attendanceMetaContainer}>
                  <View style={styles.metaRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#10B981"
                    />
                    <Text style={styles.metaLabelText}>Present</Text>
                    <Text style={[styles.metaValueText, { color: "#10B981" }]}>
                      23 <Text style={styles.metaUnitText}>Days</Text>
                    </Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Ionicons name="close-circle" size={18} color="#EF4444" />
                    <Text style={styles.metaLabelText}>Absent</Text>
                    <Text style={[styles.metaValueText, { color: "#EF4444" }]}>
                      2 <Text style={styles.metaUnitText}>Days</Text>
                    </Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Ionicons name="time" size={18} color="#F59E0B" />
                    <Text style={styles.metaLabelText}>Late</Text>
                    <Text style={[styles.metaValueText, { color: "#8B5CF6" }]}>
                      1 <Text style={styles.metaUnitText}>Day</Text>
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.insightBox, { backgroundColor: "#F0FDF4" }]}>
                <Ionicons name="calendar-outline" size={18} color="#10B981" />
                <Text style={styles.insightText}>
                  Great job! You have excellent attendance this month. 🎉
                </Text>
              </View>
            </View>

            {/* CARD 6: AI IMPROVEMENT SUGGESTIONS */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <View
                  style={[styles.numberBadge, { backgroundColor: "#EEF2F6" }]}
                >
                  <Text style={[styles.numberBadgeText, { color: "#475569" }]}>
                    6
                  </Text>
                </View>
                <View style={styles.cardTitleContainer}>
                  <View style={styles.aiTitleRow}>
                    <Text style={styles.cardMainTitle}>
                      AI Improvement Suggestions
                    </Text>
                    <View style={styles.aiBadge}>
                      <Text style={styles.aiBadgeText}>AI</Text>
                    </View>
                  </View>
                  <Text style={styles.cardSubTitle}>
                    Personalized suggestions to help you perform better.
                  </Text>
                </View>
              </View>

              <View style={styles.suggestionsList}>
                <TouchableOpacity style={styles.suggestionItem}>
                  <View
                    style={[
                      styles.suggestionIconWrapper,
                      { backgroundColor: "#EEF2F6" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name="target"
                      size={18}
                      color="#6366F1"
                    />
                  </View>
                  <View style={styles.suggestionTextWrapper}>
                    <Text style={styles.suggestionTitle}>
                      Revise Thermodynamics regularly
                    </Text>
                    <Text style={styles.suggestionSub}>
                      You scored low in this topic
                    </Text>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.suggestionItem}>
                  <View
                    style={[
                      styles.suggestionIconWrapper,
                      { backgroundColor: "#E0F2FE" },
                    ]}
                  >
                    <MaterialIcons name="menu-book" size={18} color="#0284C7" />
                  </View>
                  <View style={styles.suggestionTextWrapper}>
                    <Text style={styles.suggestionTitle}>
                      Practice 5 more questions daily
                    </Text>
                    <Text style={styles.suggestionSub}>
                      Consistency is the key!
                    </Text>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.suggestionItem}>
                  <View
                    style={[
                      styles.suggestionIconWrapper,
                      { backgroundColor: "#FEF3C7" },
                    ]}
                  >
                    <Feather name="bulb" size={18} color="#D97706" />
                  </View>
                  <View style={styles.suggestionTextWrapper}>
                    <Text style={styles.suggestionTitle}>
                      Focus more on weak topics
                    </Text>
                    <Text style={styles.suggestionSub}>
                      Improve your weak areas
                    </Text>
                  </View>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: "#F8FAFC",
                    borderTopWidth: 1,
                    borderTopColor: "#F1F5F9",
                  },
                ]}
              >
                <Text style={[styles.actionButtonText, { color: "#6366F1" }]}>
                  View All Suggestions
                </Text>
                <Feather name="chevron-right" size={16} color="#6366F1" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ============== PREMIUM STYLING (MATCHING THE FIGMA IMAGE EXACTLY) ==============
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFBFD",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 110, // 👈 Ekdum Sahi dynamic space jo aapke bottom nav bar ke sath takrayega nahi!
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FAFBFD",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
  },
  logoContainer: {
    alignItems: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    marginRight: 4,
    transform: [{ rotate: "90deg" }],
  },
  logoTextMain: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  logoTextSub: {
    color: "#10B981",
  },
  logoTagline: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 2,
  },
  titleSection: {
    marginVertical: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 18,
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  gridColumn: {
    width: "48.5%", // Symmetric 2-column container width layout split
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  numberBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginTop: 2,
  },
  numberBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardMainTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardSubTitle: {
    fontSize: 9,
    color: "#94A3B8",
    marginTop: 2,
    lineHeight: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    borderRadius: 10,
    marginTop: 12,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: "600",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 4,
  },
  donutPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  donutPercentage: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  donutLabel: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "500",
  },
  legendContainer: {
    width: "100%",
    marginTop: 6,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: 6,
  },
  legendText: {
    flex: 1,
    fontSize: 10,
    color: "#475569",
    fontWeight: "500",
  },
  legendValue: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0F172A",
  },
  listContainer: {
    marginVertical: 4,
  },
  topicItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
  },
  topicIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  topicTextWrapper: {
    flex: 1,
  },
  topicItemTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0F172A",
  },
  topicItemSub: {
    fontSize: 9,
    color: "#94A3B8",
  },
  statusTag: {
    fontSize: 10,
    fontWeight: "700",
  },
  graphWrapper: {
    height: 120,
    justifyContent: "flex-end",
    marginVertical: 12,
  },
  graphPointsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    height: 90,
  },
  graphBarSegment: {
    width: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
  },
  graphTooltip: {
    position: "absolute",
    top: -24,
    left: -12,
    backgroundColor: "#3B82F6",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  tooltipText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "700",
  },
  graphLabelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  graphLabel: {
    fontSize: 8,
    color: "#94A3B8",
    fontWeight: "500",
  },
  graphActiveLabel: {
    fontSize: 8,
    color: "#3B82F6",
    fontWeight: "700",
  },
  insightBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    gap: 6,
  },
  insightText: {
    flex: 1,
    fontSize: 9,
    color: "#1E293B",
    fontWeight: "500",
    lineHeight: 12,
  },
  attendanceBodyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  attendanceRadialSegment: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },
  attendancePercentText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  attendanceRadialLabel: {
    fontSize: 7,
    color: "#64748B",
    textAlign: "center",
  },
  attendanceMetaContainer: {
    flex: 1,
    marginLeft: 12,
    gap: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaLabelText: {
    flex: 1,
    fontSize: 10,
    color: "#475569",
    fontWeight: "500",
    marginLeft: 4,
  },
  metaValueText: {
    fontSize: 11,
    fontWeight: "700",
  },
  metaUnitText: {
    fontSize: 9,
    fontWeight: "500",
    color: "#64748B",
  },
  trackerBody: {
    alignItems: "center",
    marginVertical: 4,
  },
  circleProgressWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 6,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  circleTimeInner: {
    alignItems: "center",
  },
  timeBold: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },
  timeSub: {
    fontSize: 8,
    color: "#64748B",
  },
  barStatsContainer: {
    width: "100%",
    gap: 5,
  },
  statBarRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barDayLabel: {
    fontSize: 9,
    color: "#64748B",
    width: 24,
  },
  barTrackBackground: {
    flex: 1,
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    marginHorizontal: 6,
  },
  barTrackFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 3,
  },
  barHourLabel: {
    fontSize: 9,
    color: "#0F172A",
    fontWeight: "600",
    width: 34,
    textAlign: "right",
  },
  averageFooterBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
    gap: 4,
  },
  averageFooterText: {
    fontSize: 10,
    color: "#2563EB",
  },
  aiTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  aiBadge: {
    backgroundColor: "#EEF2F6",
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
  },
  aiBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#3B82F6",
  },
  suggestionsList: {
    marginVertical: 4,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  suggestionIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  suggestionTextWrapper: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0F172A",
  },
  suggestionSub: {
    fontSize: 8,
    color: "#94A3B8",
    marginTop: 1,
  },
});
