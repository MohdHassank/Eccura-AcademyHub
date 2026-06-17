import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AcademicsScreen() {
  const router = useRouter();

  // 🎯 Added 'route' property to modules for scaleable architecture
  const academicModules = [
    {
      id: "1",
      title: "Notes",
      desc: "Access important notes anytime, anywhere.",
      icon: "file-text",
      color: "#6366F1", // Premium Indigo/Purple
      bgColor: "#EEF2FF",
      route: "/notes", // 👈 Notes screen ka path link kiya
    },
    {
      id: "2",
      title: "Assignments",
      desc: "Track and submit your assignments.",
      icon: "clipboard",
      color: "#10B981", // Emerald Green
      bgColor: "#ECFDF5",
      route: "/assignment", // 👈 Assignments screen ka path link kiya
    },
    {
      id: "3",
      title: "Old Papers",
      desc: "Practice with previous years' question papers.",
      icon: "book-open",
      color: "#F59E0B", // Amber Orange
      bgColor: "#FEF3C7",
      route: "/old-papers", // 👈 Old Papers screen ka path link kiya
    },
    {
      id: "4",
      title: "Recorded Lectures",
      desc: "Watch recorded lectures on the go.",
      icon: "video",
      color: "#3B82F6", // Bright Blue
      bgColor: "#EFF6FF",
      route: "/recorded-lectures", // 👈 RecordedList screen ka path link kiya
    },
    // {
    //   id: "5",
    //   title: "Study Material",
    //   desc: "Download study material and resources.",
    //   icon: "book",
    //   color: "#EF4444", // Rose Red
    //   bgColor: "#FEF2F2",
    //   route: "/study-material", // 👈 Study Material screen ka path link kiya
    // },
    {
      id: "6",
      title: "Syllabus Tracker",
      desc: "Track your syllabus completion progress.",
      icon: "trending-up",
      color: "#06B6D4", // Cyan
      bgColor: "#ECFEFF",
      route: "/syllabus-tracker", // 👈 Syllabus Tracker screen ka path link kiya
    },
  ];

  // 🎯 Centralized Click Handler Method
  const handleModulePress = (item: typeof academicModules[0]) => {
    if (item.route) {
      // Agar route define hai (jaise Notes ke liye), toh wahan bhej do
      router.push(item.route as any);
    } else {
      // Agar baki modules ka page nahi bana hai toh alert show karo
      Alert.alert(
        `${item.title} Module`,
        "This feature is under development and will be linked soon!"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* ================= HERO TEXT & ILLUSTRATION HEADER ================= */}
        <View style={styles.heroSection}>
          <View style={styles.heroTextContent}>
            <Text style={styles.heroTitle}>Academics</Text>
            <Text style={styles.heroSubtitle}>All your academic resources in one place.</Text>
          </View>
          
          <View style={styles.illustrationWrapper}>
            <View style={styles.mockGraduationCapShadow}>
              <MaterialCommunityIcons name="school" size={54} color="#10B981" />
            </View>
            <View style={[styles.miniBookLayer, { backgroundColor: "#6366F1", bottom: -5 }]} />
            <View style={[styles.miniBookLayer, { backgroundColor: "#0EA5E9", bottom: -12, width: 50 }]} />
          </View>
        </View>

        {/* ================= CARDS SECTIONS LIST ================= */}
        <View style={styles.cardsGridWrapper}>
          {academicModules.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.academicModuleCard} 
              activeOpacity={0.75}
              onPress={() => handleModulePress(item)} // 👈 🎯 Triggering the new dynamic navigation here
            >
              <View style={styles.cardLeftContentFlex}>
                <View style={[styles.iconContainerBox, { backgroundColor: item.bgColor }]}>
                  <Feather name={item.icon as any} size={20} color={item.color} />
                </View>
                
                <View style={styles.cardTextWrapper}>
                  <Text style={styles.cardTitleText}>{item.title}</Text>
                  <Text style={styles.cardDescText} numberOfLines={1}>{item.desc}</Text>
                </View>
              </View>

              <Feather name="chevron-right" size={16} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= BOTTOM PERSISTENT MOTIVATIONAL BANNER ================= */}
        <View style={styles.motivationalBannerBox}>
          <View style={styles.bannerLeftFlex}>
            <Text style={styles.bannerText}>
              Stay organized and on track with all your academic essentials.
            </Text>
          </View>
          
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

// ... Pure existing styles keep as-is
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContainer: {
    paddingTop: 30,
    paddingBottom: 40,
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
    gap: 14,
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
    backgroundColor: "#EFF6FF",
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