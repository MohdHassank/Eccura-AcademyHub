import {
    Feather,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomePage() {
  const router = useRouter();
  // Active states for original home sections
  const [activeTestTab, setActiveTestTab] = useState("Upcoming");

  // Mock Data sets mirroring the Figma context explicitly
  const quickActions = [
    {
      id: "qa1",
      title: "Notes",
      icon: "file-text",
      color: "#6366F1",
      bg: "#EEF2FF",
    },
    {
      id: "qa2",
      title: "Assignments",
      icon: "clipboard",
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      id: "qa3",
      title: "Tests / Quiz",
      icon: "file-signature",
      color: "#F97316",
      bg: "#FFF7ED",
    },
    {
      id: "qa4",
      title: "Attendance",
      icon: "calendar-check",
      color: "#3B82F6",
      bg: "#EFF6FF",
    },
    {
      id: "qa5",
      title: "Fee Status",
      icon: "wallet",
      color: "#EC4899",
      bg: "#FDF2F8",
    },
  ];

  const testSchedules = [
    {
      id: "t1",
      day: "24",
      month: "May",
      title: "Physics Quiz",
      subtitle: "Electrostatics Chapter",
      time: "Tomorrow, 10:00 AM",
      type: "Quiz",
      typeBg: "#E0F2FE",
      typeColor: "#0369A1",
      dateBg: "#10B981",
    },
    {
      id: "t2",
      day: "28",
      month: "May",
      title: "Chemistry Test",
      subtitle: "Organic Chemistry – Unit 2",
      time: "28 May, 09:00 AM",
      type: "Test",
      typeBg: "#FFEDD5",
      typeColor: "#C2410C",
      dateBg: "#F97316",
    },
    {
      id: "t3",
      day: "31",
      month: "May",
      title: "Mathematics Test",
      subtitle: "Differential Equations",
      time: "31 May, 11:00 AM",
      type: "Test",
      typeBg: "#E0F2FE",
      typeColor: "#0369A1",
      dateBg: "#3B82F6",
    },
  ];

  // Mock data for integrated Engagement Leaderboard
  const leaderboardData = [
    { rank: 1, name: "Rohan Sharma", xp: "12,450 XP", isUser: false },
    { rank: 2, name: "Arjun (You)", xp: "11,230 XP", isUser: true },
    { rank: 3, name: "Neha Singh", xp: "9,870 XP", isUser: false },
    { rank: 4, name: "Kabir Mehta", xp: "8,610 XP", isUser: false },
    { rank: 5, name: "Ishita Verma", xp: "7,430 XP", isUser: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= SECTION 1: TOP APP BAR ================= */}
      <View style={styles.topAppBar}>
        <TouchableOpacity style={styles.menuIconButton}>
          <Feather name="menu" size={22} color="#1E293B" />
        </TouchableOpacity>

        <View style={styles.brandContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.brandLogo}
          />
        </View>

        <TouchableOpacity style={styles.bellIconButton}>
          <Feather name="bell" size={22} color="#1E293B" />
          <View style={styles.badgeIndicator}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* ================= SECTION 2: USER PROFILE ROW ================= */}
        <View style={styles.profileRow}>
          <View>
            <Text style={styles.userGreetingTitle}>Hi, Arjun! 👋</Text>
            <Text style={styles.userGreetingSubtitle}>
              Ready to learn something new today?
            </Text>
          </View>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
              }}
              style={styles.avatarImage}
            />
            <View style={styles.roleTagContainer}>
              <Text style={styles.roleTagText}>Student</Text>
              <Feather
                name="chevron-down"
                size={10}
                color="#FFFFFF"
                style={{ marginLeft: 2 }}
              />
            </View>
          </View>
        </View>

        {/* ================= SECTION 3: HERO PROMO CARD ================= */}
        <View style={styles.promoCardContainer}>
          <View style={styles.promoTextContent}>
            <Text style={styles.promoMainHeading}>
              Keep <Text style={styles.headingAccent}>Learning,</Text>
            </Text>
            <Text style={styles.promoMainHeading}>
              Keep <Text style={styles.headingAccentGreen}>Growing! 🚀</Text>
            </Text>
            <Text style={styles.promoSubHeading}>
              Your future is created by what you learn today.
            </Text>

            {/* Carousel dots layout */}
            <View style={styles.carouselDotsRow}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
          <Image
            source={require("../../assets/images/Welcome-mockup.png")}
            style={styles.promoIllustration}
          />
        </View>

        {/* ================= SECTION 4: QUICK ACTIONS GRID ================= */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingText}>Quick Actions</Text>
          {/* <TouchableOpacity style={styles.seeAllRowContainer}>
            <Text style={styles.seeAllActionText}>View All</Text>
            <Feather name="chevron-right" size={14} color="#2563EB" />
          </TouchableOpacity> */}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsScroll}
        >
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionItemBox}
              activeOpacity={0.8}
            >
              <View
                style={[styles.actionIconRound, { backgroundColor: action.bg }]}
              >
                <FontAwesome5
                  name={action.icon}
                  size={20}
                  color={action.color}
                />
              </View>
              <Text style={styles.actionItemTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= SECTION 5: ACADEMICS CONTENT CARDS ================= */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingText}>Academics</Text>
          <TouchableOpacity
            style={styles.seeAllRowContainer}
            onPress={() => router.push("/(tabs)/Academics")} // 🔥 Yeh line navigation handle karegi
          >
            <Text style={styles.seeAllActionText}>View All</Text>
            <Feather name="chevron-right" size={14} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.academicsCardScroll}
        >
          {/* Notes Card */}
          <View style={styles.academicCardLayout}>
            <View
              style={[
                styles.academicIconWrapper,
                { backgroundColor: "#EEF2FF" },
              ]}
            >
              <FontAwesome5 name="file-text" size={18} color="#6366F1" />
            </View>
            <Text style={styles.academicCardTitle}>Notes</Text>
            <Text style={styles.academicCardDesc}>
              Access important notes anytime, anywhere.
            </Text>
            <TouchableOpacity style={styles.academicCardButton}>
              <Text style={[styles.academicBtnText, { color: "#6366F1" }]}>
                View Notes
              </Text>
              <Feather name="chevron-right" size={14} color="#6366F1" />
            </TouchableOpacity>
          </View>

          {/* Assignments Card */}
          <View style={styles.academicCardLayout}>
            <View
              style={[
                styles.academicIconWrapper,
                { backgroundColor: "#ECFDF5" },
              ]}
            >
              <FontAwesome5 name="clipboard" size={18} color="#10B981" />
            </View>
            <Text style={styles.academicCardTitle}>Assignments</Text>
            <Text style={styles.academicCardDesc}>
              Track and submit your assignments.
            </Text>
            <TouchableOpacity style={styles.academicCardButton}>
              <Text style={[styles.academicBtnText, { color: "#10B981" }]}>
                View Assignments
              </Text>
              <Feather name="chevron-right" size={14} color="#10B981" />
            </TouchableOpacity>
          </View>

          {/* Previous Papers Card */}
          <View style={styles.academicCardLayout}>
            <View
              style={[
                styles.academicIconWrapper,
                { backgroundColor: "#FFF7ED" },
              ]}
            >
              <FontAwesome5 name="file-alt" size={18} color="#F97316" />
            </View>
            <Text style={styles.academicCardTitle}>Previous Papers</Text>
            <Text style={styles.academicCardDesc}>
              Practice with previous years' papers.
            </Text>
            <TouchableOpacity style={styles.academicCardButton}>
              <Text style={[styles.academicBtnText, { color: "#F97316" }]}>
                View Papers
              </Text>
              <Feather name="chevron-right" size={14} color="#F97316" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ================= SECTION 6: TEST & PRACTICE SEGMENT ================= */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingText}>Test & Practice</Text>
          <TouchableOpacity
            style={styles.seeAllRowContainer}
            onPress={() => router.push("/(tabs)/TestPractice")} // 🔥 Bracket ke andar aa gaya
          >
            <Text style={styles.seeAllActionText}>View All</Text>
            <Feather name="chevron-right" size={14} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Custom Tab Switches */}
        <View style={styles.subTabRowWrapper}>
          <TouchableOpacity
            style={[
              styles.subTabItem,
              activeTestTab === "Upcoming" && styles.subTabActiveItem,
            ]}
            onPress={() => setActiveTestTab("Upcoming")}
          >
            <Text
              style={[
                styles.subTabItemText,
                activeTestTab === "Upcoming" && styles.subTabActiveItemText,
              ]}
            >
              Upcoming Tests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subTabItem,
              activeTestTab === "Practice" && styles.subTabActiveItem,
            ]}
            onPress={() => setActiveTestTab("Practice")}
          >
            <Text
              style={[
                styles.subTabItemText,
                activeTestTab === "Practice" && styles.subTabActiveItemText,
              ]}
            >
              Practice
            </Text>
          </TouchableOpacity>
        </View>

        {/* Render Test Schedule Lists */}
        <View style={styles.testListWrapperBox}>
          {testSchedules.map((test) => (
            <View key={test.id} style={styles.testScheduleCardItem}>
              <View
                style={[
                  styles.dateSquareContainer,
                  { backgroundColor: test.dateBg },
                ]}
              >
                <Text style={styles.dateNumberText}>{test.day}</Text>
                <Text style={styles.dateMonthText}>{test.month}</Text>
              </View>

              <View style={styles.testMetaCenterInfo}>
                <Text style={styles.testTitleMainText}>{test.title}</Text>
                <Text style={styles.testSubTextDesc}>{test.subtitle}</Text>
                <View style={styles.timeScheduleRow}>
                  <Feather
                    name="clock"
                    size={12}
                    color="#64748B"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.timeRowText}>{test.time}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.tagTypeContainer,
                  { backgroundColor: test.typeBg },
                ]}
              >
                <Text style={[styles.tagTypeText, { color: test.typeColor }]}>
                  {test.type}
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.bottomFooterViewAllBtn}>
            <Text style={styles.footerViewAllText}>View All Tests</Text>
            <Feather
              name="chevron-right"
              size={14}
              color="#10B981"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>

        {/* ========================================================
            🔥 NEW INTEGRATED SECTION: ENGAGEMENT DASHBOARD MODULE 🔥
           ======================================================== */}

        <View style={[styles.sectionHeaderRow, { marginTop: 35 }]}>
          <Text style={styles.sectionHeadingText}>Engagement</Text>
          <Text style={styles.engagementTopSubtitle}>
            Track updates & ranks
          </Text>
        </View>

        {/* 1. GRID BLOCKS: LEADERBOARD & STUDY STREAK */}
        <View style={styles.engagementGridContainer}>
          {/* LEFT COMPONENT: Leaderboard */}
          <View style={styles.engagementHalfCard}>
            <View style={styles.cardHeaderInlineFlex}>
              <View style={styles.titleIconRowLayout}>
                <MaterialCommunityIcons
                  name="trophy-variant"
                  size={16}
                  color="#6366F1"
                />
                <Text style={styles.engagementCardTitle}>Leaderboard</Text>
              </View>
              <TouchableOpacity style={styles.miniLinkButton}>
                <Text style={styles.miniLinkText}>View All</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.engagementCardDesc}>
              Ranked among your class peers
            </Text>

            {/* List Array Render */}
            <View style={styles.leaderboardStackList}>
              {leaderboardData.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.leaderboardPillRow,
                    item.isUser && styles.leaderboardPillRowActive,
                  ]}
                >
                  <View style={styles.leaderboardLeftGroup}>
                    <View
                      style={[
                        styles.rankNumberBadge,
                        item.rank === 1 && { backgroundColor: "#FCD34D" },
                        item.rank === 2 && { backgroundColor: "#E2E8F0" },
                        item.rank === 3 && { backgroundColor: "#F97316" },
                        item.rank > 3 && { backgroundColor: "#F1F5F9" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.rankNumberText,
                          item.rank > 3 && { color: "#64748B" },
                        ]}
                      >
                        {item.rank}
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.leaderboardNameText,
                        item.isUser && { fontWeight: "700", color: "#4F46E5" },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text style={styles.leaderboardXpText}>{item.xp}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.gridFooterButton}>
              <Text style={styles.gridFooterButtonText}>Full Leaderboard</Text>
              <Feather name="chevron-right" size={12} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          {/* RIGHT COMPONENT: Study Streak */}
          <View style={styles.engagementHalfCard}>
            <View style={styles.titleIconRowLayout}>
              <MaterialCommunityIcons name="fire" size={16} color="#F97316" />
              <Text style={styles.engagementCardTitle}>Study Streak</Text>
            </View>
            <Text style={styles.engagementCardDesc}>
              Keep up the daily hard work!
            </Text>

            {/* Streak Counter Wheel Ring Graphic */}
            <View style={styles.wheelCenterLayout}>
              <View style={styles.streakWheelOuterTrack}>
                <View style={styles.streakWheelInnerCore}>
                  <Text style={styles.streakBigCountText}>7</Text>
                  <Text style={styles.streakDaysLabel}>Days</Text>
                </View>
              </View>
            </View>

            {/* Calendar Minimalist Tracker Dots */}
            <View style={styles.streakDaysRowContainer}>
              {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                const isActive = idx < 5; // Active Monday to Friday
                return (
                  <View key={idx} style={styles.dayStatusColumn}>
                    <Text style={styles.dayTextLabel}>{day}</Text>
                    <View
                      style={[
                        styles.dayStatusDot,
                        isActive
                          ? styles.dayStatusDotActive
                          : styles.dayStatusDotInactive,
                      ]}
                    >
                      {isActive && (
                        <Ionicons name="checkmark" size={8} color="#FFFFFF" />
                      )}
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.bestStreakInfoAlert}>
              <FontAwesome5 name="trophy" size={10} color="#D97706" />
              <Text style={styles.bestStreakAlertText}>
                Best: <Text style={{ fontWeight: "700" }}>21 Days</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* 2. FULL CARD LEVEL B: STUDY PROGRESS DATA GRAPH */}
        <View style={styles.engagementFullCardContainer}>
          <View style={styles.cardHeaderInlineFlex}>
            <View style={styles.titleIconRowLayout}>
              <Ionicons name="trending-up-outline" size={18} color="#4F46E5" />
              <Text style={styles.engagementFullBlockTitle}>
                Study Progress
              </Text>
            </View>
            <View style={styles.mockSelectorDropdown}>
              <Text style={styles.mockSelectorText}>This Semester</Text>
              <Feather name="chevron-down" size={12} color="#475569" />
            </View>
          </View>
          <Text style={styles.engagementCardDesc}>
            Monitor overall completed syllabus tracks
          </Text>

          {/* Graph Coordinate Vector Area Blocks */}
          <View style={styles.graphBlockFlexRowContainer}>
            <View style={styles.progressCircleSubSection}>
              <View style={styles.radialRingBase}>
                <View style={styles.radialRingCore}>
                  <Text style={styles.radialPercentageText}>68%</Text>
                  <Text style={styles.radialSubLabelText}>Done</Text>
                </View>
              </View>
              <Text style={styles.metaDoneCountText}>
                <Text style={{ fontWeight: "700", color: "#4F46E5" }}>
                  34/50
                </Text>{" "}
                Chapters
              </Text>
            </View>

            {/* Line Chart Grid Lines Representation */}
            <View style={styles.graphScaleAxisRightPanel}>
              {["100%", "50%", "0%"].map((val, gridIdx) => (
                <View key={gridIdx} style={styles.graphGridLineFlexRow}>
                  <Text style={styles.axisYLabelText}>{val}</Text>
                  <View style={styles.gridHorizontalHairline} />
                </View>
              ))}
              {/* Simulated trend line path layer overlay */}
              <View style={styles.diagonalTrendLineMockFill} />
              <View style={styles.nodeActiveIndicatorAnchor}>
                <View style={styles.nodeCorePointPulse} />
              </View>
            </View>
          </View>

          <View style={styles.insightInlinePillBanner}>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={14}
              color="#7C3AED"
            />
            <Text style={styles.insightInlinePillText}>
              Awesome! You're scoring ahead of{" "}
              <Text style={{ fontWeight: "700" }}>65% peers.</Text>
            </Text>
          </View>
        </View>

        {/* 3. FULL CARD LEVEL C: ACHIEVEMENT SYSTEM BADGES */}
        <View style={styles.engagementFullCardContainer}>
          <View style={styles.titleIconRowLayout}>
            <MaterialIcons name="verified-user" size={18} color="#7C3AED" />
            <Text style={styles.engagementFullBlockTitle}>
              Achievement System
            </Text>
          </View>
          <Text style={styles.engagementCardDesc}>
            Unlock unique tracking milestones
          </Text>

          {/* Progress Status Header Metrics */}
          <View style={styles.badgeProgressMetricRow}>
            <Text style={styles.badgeMetricLabel}>Milestones completed</Text>
            <Text style={styles.badgeMetricValue}>6 / 10</Text>
          </View>
          <View style={styles.linearTrackBase}>
            <View style={[styles.linearTrackFill, { width: "60%" }]} />
          </View>

          {/* Horizontal Scroller Carousel for Badges */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgeCarouselHorizontalGap}
          >
            {/* Badge Item Node 1 */}
            <View style={styles.badgeItemCardBox}>
              <View
                style={[
                  styles.badgeIconCircleContainer,
                  { backgroundColor: "#FEF3C7" },
                ]}
              >
                <FontAwesome5 name="trophy" size={16} color="#D97706" />
              </View>
              <Text style={styles.badgeCardTitle}>First Step</Text>
              <Text style={styles.badgeCardSubtitle}>Complete 1 test</Text>
              <View style={styles.badgeCompletedPillBadge}>
                <Text style={styles.badgeCompletedPillText}>Unlocked</Text>
              </View>
            </View>

            {/* Badge Item Node 2 */}
            <View style={styles.badgeItemCardBox}>
              <View
                style={[
                  styles.badgeIconCircleContainer,
                  { backgroundColor: "#DBEAFE" },
                ]}
              >
                <MaterialCommunityIcons
                  name="book-open-page-variant"
                  size={18}
                  color="#2563EB"
                />
              </View>
              <Text style={styles.badgeCardTitle}>Explorer</Text>
              <Text style={styles.badgeCardSubtitle}>Study 5 days</Text>
              <View style={styles.badgeCompletedPillBadge}>
                <Text style={styles.badgeCompletedPillText}>Unlocked</Text>
              </View>
            </View>

            {/* Badge Item Node 3 (Locked State Representation) */}
            <View
              style={[
                styles.badgeItemCardBox,
                { backgroundColor: "#F8FAFC", borderColor: "#E2E8F0" },
              ]}
            >
              <View
                style={[
                  styles.badgeIconCircleContainer,
                  { backgroundColor: "#E2E8F0" },
                ]}
              >
                <Feather name="lock" size={14} color="#64748B" />
              </View>
              <Text style={[styles.badgeCardTitle, { color: "#64748B" }]}>
                Unstoppable
              </Text>
              <Text style={styles.badgeCardSubtitle}>Maintain 15d streak</Text>
              <Text style={styles.lockedFractionProgressText}>7 / 15 Days</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // 🔥 FIX: Added larger padding bottom to avoid floating tab navigation overlays cleanly
  scrollContainer: {
    paddingBottom: 130,
  },
  topAppBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    // 🔥 StatusBar ke niche space badhane ke liye padding-top aur height ko adjust kiya
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 24) + 11 : 11,
    height: Platform.OS === "android" ? 110 : 94, // Status bar ki height ko mila kar perfect size
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  brandContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  brandLogo: {
    width: 265,
    height: 115,
    resizeMode: "contain",
  },
  bellIconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  badgeIndicator: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#EF4444",
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  userGreetingTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },
  userGreetingSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
  avatarWrapper: {
    alignItems: "center",
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  roleTagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: -10,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  roleTagText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  promoCardContainer: {
    backgroundColor: "#ECFDF5",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    flexDirection: "row",
    position: "relative",
    overflow: "hidden",
  },
  promoTextContent: {
    flex: 1.2,
    justifyContent: "center",
  },
  promoMainHeading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    lineHeight: 28,
  },
  headingAccent: {
    color: "#2563EB",
  },
  headingAccentGreen: {
    color: "#10B981",
  },
  promoSubHeading: {
    fontSize: 12,
    color: "#475569",
    marginTop: 10,
    lineHeight: 16,
    fontWeight: "500",
  },
  carouselDotsRow: {
    flexDirection: "row",
    marginTop: 15,
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CBD5E1",
  },
  activeDot: {
    width: 14,
    backgroundColor: "#10B981",
  },
  promoIllustration: {
    flex: 1,
    width: 130,
    height: 130,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 14,
  },
  sectionHeadingText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  seeAllRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllActionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2563EB",
  },
  quickActionsScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  quickActionItemBox: {
    alignItems: "center",
    width: 76,
  },
  actionIconRound: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  actionItemTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    marginTop: 8,
    textAlign: "center",
  },
  academicsCardScroll: {
    paddingHorizontal: 16,
    gap: 14,
  },
  academicCardLayout: {
    width: 170,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  academicIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  academicCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  academicCardDesc: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 15,
    height: 32,
  },
  academicCardButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 2,
  },
  academicBtnText: {
    fontSize: 12,
    fontWeight: "700",
  },
  subTabRowWrapper: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  subTabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 9,
  },
  subTabActiveItem: {
    backgroundColor: "#E2E8F0",
  },
  subTabItemText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  subTabActiveItemText: {
    color: "#0F172A",
  },
  testListWrapperBox: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 4,
  },
  testScheduleCardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#F8FAFC",
  },
  dateSquareContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  dateNumberText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 20,
  },
  dateMonthText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  testMetaCenterInfo: {
    flex: 1,
    marginLeft: 14,
  },
  testTitleMainText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  testSubTextDesc: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 1,
  },
  timeScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timeRowText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  tagTypeContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagTypeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  bottomFooterViewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#F8FAFC",
  },
  footerViewAllText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#10B981",
  },

  /* ========================================================
     🔥 ADDED EXTRA ENGAGEMENT DASHBOARD MODULE STYLING 🔥
     ======================================================== */
  engagementTopSubtitle: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },
  engagementGridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  engagementHalfCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardHeaderInlineFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleIconRowLayout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  engagementCardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  miniLinkButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  miniLinkText: {
    fontSize: 10,
    color: "#4F46E5",
    fontWeight: "700",
  },
  engagementCardDesc: {
    fontSize: 9,
    color: "#94A3B8",
    marginTop: 2,
    lineHeight: 12,
  },
  leaderboardStackList: {
    marginVertical: 10,
    gap: 4,
  },
  leaderboardPillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  leaderboardPillRowActive: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  leaderboardLeftGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankNumberBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  rankNumberText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#0F172A",
  },
  leaderboardNameText: {
    fontSize: 10.5,
    color: "#334155",
    fontWeight: "500",
    flex: 1,
  },
  leaderboardXpText: {
    fontSize: 9.5,
    fontWeight: "700",
    color: "#4338CA",
  },
  gridFooterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F3FF",
    height: 28,
    borderRadius: 8,
    gap: 2,
    marginTop: 2,
  },
  gridFooterButtonText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4F46E5",
  },
  wheelCenterLayout: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  streakWheelOuterTrack: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 5,
    borderColor: "#FFEDD5",
    borderTopColor: "#F97316",
    borderRightColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
  },
  streakWheelInnerCore: {
    alignItems: "center",
  },
  streakBigCountText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 22,
  },
  streakDaysLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#F97316",
  },
  streakDaysRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 6,
  },
  dayStatusColumn: {
    alignItems: "center",
    gap: 3,
  },
  dayTextLabel: {
    fontSize: 8,
    fontWeight: "600",
    color: "#64748B",
  },
  dayStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  dayStatusDotActive: {
    backgroundColor: "#F97316",
  },
  dayStatusDotInactive: {
    backgroundColor: "#E2E8F0",
  },
  bestStreakInfoAlert: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFBEB",
    borderRadius: 8,
    height: 26,
    gap: 4,
    borderWidth: 0.5,
    borderColor: "#FEF3C7",
  },
  bestStreakAlertText: {
    fontSize: 9.5,
    color: "#92400E",
  },
  engagementFullCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  engagementFullBlockTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  mockSelectorDropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 2,
  },
  mockSelectorText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#334155",
  },
  graphBlockFlexRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  progressCircleSubSection: {
    width: "32%",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#F1F5F9",
    paddingRight: 6,
  },
  radialRingBase: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 5,
    borderColor: "#EEF2FF",
    borderLeftColor: "#4F46E5",
    borderTopColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },
  radialRingCore: {
    alignItems: "center",
  },
  radialPercentageText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  radialSubLabelText: {
    fontSize: 7.5,
    color: "#64748B",
  },
  metaDoneCountText: {
    fontSize: 9,
    color: "#64748B",
    marginTop: 6,
  },
  graphScaleAxisRightPanel: {
    flex: 1,
    height: 70,
    justifyContent: "space-between",
    paddingLeft: 10,
    position: "relative",
  },
  graphGridLineFlexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  axisYLabelText: {
    fontSize: 8,
    color: "#94A3B8",
    width: 22,
    textAlign: "right",
    marginRight: 4,
  },
  gridHorizontalHairline: {
    flex: 1,
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  diagonalTrendLineMockFill: {
    position: "absolute",
    top: 25,
    left: 30,
    right: 15,
    height: 25,
    borderTopWidth: 2,
    borderColor: "#4F46E5",
    transform: [{ rotate: "-8deg" }],
    opacity: 0.6,
  },
  nodeActiveIndicatorAnchor: {
    position: "absolute",
    top: 16,
    right: 25,
  },
  nodeCorePointPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4F46E5",
  },
  insightInlinePillBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3E8FF",
    borderRadius: 8,
    padding: 6,
    gap: 4,
  },
  insightInlinePillText: {
    fontSize: 10.5,
    color: "#6B21A8",
  },
  badgeProgressMetricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 4,
  },
  badgeMetricLabel: {
    fontSize: 11,
    color: "#475569",
  },
  badgeMetricValue: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },
  linearTrackBase: {
    height: 5,
    backgroundColor: "#F1F5F9",
    borderRadius: 2.5,
    width: "100%",
    marginBottom: 12,
  },
  linearTrackFill: {
    height: 5,
    backgroundColor: "#7C3AED",
    borderRadius: 2.5,
  },
  badgeCarouselHorizontalGap: {
    gap: 10,
  },
  badgeItemCardBox: {
    width: 105,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 8,
    alignItems: "center",
  },
  badgeIconCircleContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  badgeCardTitle: {
    fontSize: 10.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  badgeCardSubtitle: {
    fontSize: 8,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 1,
    height: 20,
  },
  badgeCompletedPillBadge: {
    backgroundColor: "#E6F4EA",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    marginTop: 4,
  },
  badgeCompletedPillText: {
    color: "#10B981",
    fontSize: 8,
    fontWeight: "700",
  },
  lockedFractionProgressText: {
    fontSize: 8,
    color: "#64748B",
    fontWeight: "700",
    marginTop: 4,
  },
});
