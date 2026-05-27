import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AcademicsScreen() {
  const router = useRouter();

  // Custom data structured exactly like the visual design cards
  const academicModules = [
    {
      id: "1",
      title: "Notes",
      desc: "Access important notes anytime, anywhere.",
      icon: "file-text",
      color: "#6366F1", // Premium Indigo/Purple
      bgColor: "#EEF2FF",
    },
    {
      id: "2",
      title: "Assignments",
      desc: "Track and submit your assignments.",
      icon: "clipboard",
      color: "#10B981", // Emerald Green
      bgColor: "#ECFDF5",
    },
    {
      id: "3",
      title: "Old Papers",
      desc: "Practice with previous years' question papers.",
      icon: "book-open",
      color: "#F59E0B", // Amber Orange
      bgColor: "#FEF3C7",
    },
    {
      id: "4",
      title: "Recorded Lectures",
      desc: "Watch recorded lectures on the go.",
      icon: "video",
      color: "#3B82F6", // Bright Blue
      bgColor: "#EFF6FF",
    },
    {
      id: "5",
      title: "Study Material",
      desc: "Download study material and resources.",
      icon: "book",
      color: "#EF4444", // Rose Red
      bgColor: "#FEF2F2",
    },
    {
      id: "6",
      title: "Syllabus Tracker",
      desc: "Track your syllabus completion progress.",
      icon: "trending-up",
      color: "#06B6D4", // Cyan
      bgColor: "#ECFEFF",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* ================= TOP BRAND HEADER ================= */}
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity> */}
        
        {/* Center Logo Area mimicking AcademyHub */}
        {/* <View style={styles.logoRow}>
          <MaterialCommunityIcons name="alpha-a-box" size={26} color="#0EA5E9" />
          <Text style={styles.logoTextMain}>Academy<Text style={styles.logoTextSub}>Hub</Text></Text>
        </View>
        <View style={{ width: 40 }} /> 
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* ================= HERO TEXT & ILLUSTRATION HEADER ================= */}
        <View style={styles.heroSection}>
          <View style={styles.heroTextContent}>
            <Text style={styles.heroTitle}>Academics</Text>
            <Text style={styles.heroSubtitle}>All your academic resources in one place.</Text>
          </View>
          
          {/* Conceptual Academic Illustration Container (Matching design top-right icon stacked view) */}
          <View style={styles.illustrationWrapper}>
            <View style={styles.mockGraduationCapShadow}>
              <MaterialCommunityIcons name="school" size={54} color="#10B981" />
            </View>
            {/* Layered book stacks background subtle lines */}
            <View style={[styles.miniBookLayer, { backgroundColor: "#6366F1", bottom: -5 }]} />
            <View style={[styles.miniBookLayer, { backgroundColor: "#0EA5E9", bottom: -12, width: 50 }]} />
          </View>
        </View>

        {/* ================= CARDS SECTIONS LIST ================= */}
        <View style={styles.cardsGridWrapper}>
          {academicModules.map((item) => (
            <TouchableOpacity key={item.id} style={styles.academicModuleCard} activeOpacity={0.75}>
              <View style={styles.cardLeftContentFlex}>
                {/* Dynamically styled rounded icon container */}
                <View style={[styles.iconContainerBox, { backgroundColor: item.bgColor }]}>
                  <Feather name={item.icon as any} size={20} color={item.color} />
                </View>
                
                <View style={styles.cardTextWrapper}>
                  <Text style={styles.cardTitleText}>{item.title}</Text>
                  <Text style={styles.cardDescText} numberOfLines={1}>{item.desc}</Text>
                </View>
              </View>

              {/* Right Chevron Indicator */}
              <Feather name="chevron-right" size={16} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= BOTTOM PERSISTENT MOTIVATIONAL BANNER ================= */}
        
        <View style={styles.motivationalBannerBox}>
          <View style={styles.bannerLeftFlex}>
            {/* <Ionicons name="lightbulb-outline" size={20} color="#3B82F6" style={{ marginTop: 2 }} /> */}
            <Text style={styles.bannerText}>
              Stay organized and on track with all your academic essentials.
            </Text>
          </View>
          
          {/* Mini multi-colored stacked visual block representation */}
          <View style={styles.miniColorStackBlock}>
            <View style={{ width: 4, height: 16, backgroundColor: "#EF4444", borderRadius: 2 }} />
            <View style={{ width: 4, height: 22, backgroundColor: "#3B82F6", borderRadius: 2 }} />
            <View style={{ width: 4, height: 18, backgroundColor: "#F59E0B", borderRadius: 2 }} />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Clean white-slate canvas base
  },
  scrollContainer: {
    paddingTop: 30,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: "#F8FAFC",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoTextMain: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  logoTextSub: {
    color: "#10B981", // AcademyHub Green accent signature
  },
  heroSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 15,
    marginBottom: 25,
  },
  heroTextContent: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    lineHeight: 18,
    fontWeight: "500",
  },
  illustrationWrapper: {
    position: "relative",
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  mockGraduationCapShadow: {
    zIndex: 10,
    transform: [{ rotate: "-10deg" }],
  },
  miniBookLayer: {
    position: "absolute",
    width: 60,
    height: 6,
    borderRadius: 3,
    opacity: 0.8,
  },
  cardsGridWrapper: {
    paddingHorizontal: 16,
    gap: 14, // Sets margins uniformly between cards grid rows
  },
  academicModuleCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  cardLeftContentFlex: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 16,
  },
  iconContainerBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardTitleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  cardDescText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 4,
  },
  motivationalBannerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EFF6FF", // Soft light blue tint
    marginHorizontal: 16,
    marginTop: 25,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  bannerLeftFlex: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
    paddingRight: 8,
  },
  bannerText: {
    fontSize: 12,
    color: "#1E40AF",
    fontWeight: "600",
    lineHeight: 16,
  },
  miniColorStackBlock: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 3,
  },
});