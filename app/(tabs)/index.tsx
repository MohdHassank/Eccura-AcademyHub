import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomePage() {
  // Active states if you want to handle tab switches inside sections later
  const [activeTestTab, setActiveTestTab] = useState("Upcoming");

  // Mock Data sets mirroring the Figma context explicitly
  const quickActions = [
    { id: "qa1", title: "Notes", icon: "file-text", color: "#6366F1", bg: "#EEF2FF" },
    { id: "qa2", title: "Assignments", icon: "clipboard", color: "#10B981", bg: "#ECFDF5" },
    { id: "qa3", title: "Tests / Quiz", icon: "file-signature", color: "#F97316", bg: "#FFF7ED" },
    { id: "qa4", title: "Attendance", icon: "calendar-check", color: "#3B82F6", bg: "#EFF6FF" },
    { id: "qa5", title: "Fee Status", icon: "wallet", color: "#EC4899", bg: "#FDF2F8" },
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
      dateBg: "#10B981"
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
      dateBg: "#F97316"
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
      dateBg: "#3B82F6"
    },
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
          <Image source={require("../../assets/images/logo.png")} style={styles.brandLogo} />
        </View>

        <TouchableOpacity style={styles.bellIconButton}>
          <Feather name="bell" size={22} color="#1E293B" />
          <View style={styles.badgeIndicator}><Text style={styles.badgeText}>3</Text></View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* ================= SECTION 2: USER PROFILE ROW ================= */}
        <View style={styles.profileRow}>
          <View>
            <Text style={styles.userGreetingTitle}>Hi, Arjun! 👋</Text>
            <Text style={styles.userGreetingSubtitle}>Ready to learn something new today?</Text>
          </View>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" }} 
              style={styles.avatarImage} 
            />
            <View style={styles.roleTagContainer}>
              <Text style={styles.roleTagText}>Student</Text>
              <Feather name="chevron-down" size={10} color="#0F172A" style={{ marginLeft: 2 }} />
            </View>
          </View>
        </View>

        {/* ================= SECTION 3: HERO PROMO CARD ================= */}
        <View style={styles.promoCardContainer}>
          <View style={styles.promoTextContent}>
            <Text style={styles.promoMainHeading}>Keep <Text style={styles.headingAccent}>Learning,</Text></Text>
            <Text style={styles.promoMainHeading}>Keep <Text style={styles.headingAccentGreen}>Growing! 🚀</Text></Text>
            <Text style={styles.promoSubHeading}>Your future is created by what you learn today.</Text>
            
            {/* Carousel dots layout */}
            <View style={styles.carouselDotsRow}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>
          <Image 
            source={require("../../assets/images/Welcome-mockup.png")} // Replace with graduation cap book design asset
            style={styles.promoIllustration} 
          />
        </View>

        {/* ================= SECTION 4: QUICK ACTIONS GRID ================= */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingText}>Quick Actions</Text>
          <TouchableOpacity style={styles.seeAllRowContainer}>
            <Text style={styles.seeAllActionText}>View All</Text>
            <Feather name="chevron-right" size={14} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickActionItemBox} activeOpacity={0.8}>
              <View style={[styles.actionIconRound, { backgroundColor: action.bg }]}>
                <FontAwesome5 name={action.icon} size={20} color={action.color} />
              </View>
              <Text style={styles.actionItemTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= SECTION 5: ACADEMICS CONTENT CARDS ================= */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingText}>Academics</Text>
          <TouchableOpacity style={styles.seeAllRowContainer}>
            <Text style={styles.seeAllActionText}>View All</Text>
            <Feather name="chevron-right" size={14} color="#2563EB" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.academicsCardScroll}>
          {/* Notes Card */}
          <View style={styles.academicCardLayout}>
            <View style={[styles.academicIconWrapper, { backgroundColor: "#EEF2FF" }]}>
              <FontAwesome5 name="file-text" size={18} color="#6366F1" />
            </View>
            <Text style={styles.academicCardTitle}>Notes</Text>
            <Text style={styles.academicCardDesc}>Access important notes anytime, anywhere.</Text>
            <TouchableOpacity style={styles.academicCardButton}>
              <Text style={[styles.academicBtnText, { color: "#6366F1" }]}>View Notes</Text>
              <Feather name="chevron-right" size={14} color="#6366F1" />
            </TouchableOpacity>
          </View>

          {/* Assignments Card */}
          <View style={styles.academicCardLayout}>
            <View style={[styles.academicIconWrapper, { backgroundColor: "#ECFDF5" }]}>
              <FontAwesome5 name="clipboard" size={18} color="#10B981" />
            </View>
            <Text style={styles.academicCardTitle}>Assignments</Text>
            <Text style={styles.academicCardDesc}>Track and submit your assignments.</Text>
            <TouchableOpacity style={styles.academicCardButton}>
              <Text style={[styles.academicBtnText, { color: "#10B981" }]}>View Assignments</Text>
              <Feather name="chevron-right" size={14} color="#10B981" />
            </TouchableOpacity>
          </View>

          {/* Previous Papers Card */}
          <View style={styles.academicCardLayout}>
            <View style={[styles.academicIconWrapper, { backgroundColor: "#FFF7ED" }]}>
              <FontAwesome5 name="file-alt" size={18} color="#F97316" />
            </View>
            <Text style={styles.academicCardTitle}>Previous Papers</Text>
            <Text style={styles.academicCardDesc}>Practice with previous years' papers.</Text>
            <TouchableOpacity style={styles.academicCardButton}>
              <Text style={[styles.academicBtnText, { color: "#F97316" }]}>View Papers</Text>
              <Feather name="chevron-right" size={14} color="#F97316" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* ================= SECTION 6: TEST & PRACTICE SEGMENT ================= */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeadingText}>Test & Practice</Text>
          <TouchableOpacity style={styles.seeAllRowContainer}>
            <Text style={styles.seeAllActionText}>View All</Text>
            <Feather name="chevron-right" size={14} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Custom Tab Switches */}
        <View style={styles.subTabRowWrapper}>
          <TouchableOpacity 
            style={[styles.subTabItem, activeTestTab === "Upcoming" && styles.subTabActiveItem]}
            onPress={() => setActiveTestTab("Upcoming")}
          >
            <Text style={[styles.subTabItemText, activeTestTab === "Upcoming" && styles.subTabActiveItemText]}>
              Upcoming Tests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.subTabItem, activeTestTab === "Practice" && styles.subTabActiveItem]}
            onPress={() => setActiveTestTab("Practice")}
          >
            <Text style={[styles.subTabItemText, activeTestTab === "Practice" && styles.subTabActiveItemText]}>
              Practice
            </Text>
          </TouchableOpacity>
        </View>

        {/* Render Test Schedule Lists matching UI specification */}
        <View style={styles.testListWrapperBox}>
          {testSchedules.map((test) => (
            <View key={test.id} style={styles.testScheduleCardItem}>
              <View style={[styles.dateSquareContainer, { backgroundColor: test.dateBg }]}>
                <Text style={styles.dateNumberText}>{test.day}</Text>
                <Text style={styles.dateMonthText}>{test.month}</Text>
              </View>
              
              <View style={styles.testMetaCenterInfo}>
                <Text style={styles.testTitleMainText}>{test.title}</Text>
                <Text style={styles.testSubTextDesc}>{test.subtitle}</Text>
                <View style={styles.timeScheduleRow}>
                  <Feather name="clock" size={12} color="#64748B" style={{ marginRight: 4 }} />
                  <Text style={styles.timeRowText}>{test.time}</Text>
                </View>
              </View>

              <View style={[styles.tagTypeContainer, { backgroundColor: test.typeBg }]}>
                <Text style={[styles.tagTypeText, { color: test.typeColor }]}>{test.type}</Text>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.bottomFooterViewAllBtn}>
            <Text style={styles.footerViewAllText}>View All Tests</Text>
            <Feather name="chevron-right" size={14} color="#10B981" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ================= THE ARCHITECTURAL COMPONENT STYLING SHEET =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  topAppBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  menuIconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
  },
  brandLogo: {
    width: 160,
    height: 40,
    resizeMode: "contain",
  },
  bellIconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
});