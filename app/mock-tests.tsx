import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  Alert,
  RefreshControl,
} from "react-native";
import { Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

// ================= TYPESCRIPT INTERFACES =================
export interface MockTestItem {
  id: number;
  studentId: number;
  title: string;
  subject: string;
  marks: number;
  duration: string;
  negativeMarking: string;
  attemptedCount: number;
  liveTill: string;
}

type SubjectFilterType = "All" | "Physics" | "Chemistry" | "Mathematics" | "Computer Science";

// Configuration Base Endpoint
const BACKEND_API_URL =
  "http://192.168.29.49:5000/api/student/mockTests/3";

export default function MockTestsScreen() {
  const router = useRouter();

  // State Matrix
  const [tests, setTests] = useState<MockTestItem[]>([]);
  const [filteredTests, setFilteredTests] = useState<MockTestItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilterType>("All");
  
  // UX Loading Loops
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Dynamic Metrics Hub
  const [analytics, setAnalytics] = useState({
    globalRank: "#124",
    solvedCount: 8,
    accuracy: "91%"
  });

  // ================= DATA FETCHING ENGINE =================
  const fetchMockTests = async (showRefresher = false) => {
    if (showRefresher) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const response = await axios.get(BACKEND_API_URL, { timeout: 4500 });
      if (response.data && response.data.success) {
        setTests(response.data.mockTests);
setFilteredTests(response.data.mockTests);
      } else {
        throw new Error("Invalid format matrix structure");
      }
    } catch (error) {
  console.log("Mock Tests Error:", error);

  setTests([]);
  setFilteredTests([]);
}
  };

  useEffect(() => {
    fetchMockTests();
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let output = tests;

    if (selectedSubject !== "All") {
      output = output.filter(t => t.subject.toLowerCase() === selectedSubject.toLowerCase());
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      output = output.filter(t => t.title.toLowerCase().includes(query) || t.subject.toLowerCase().includes(query));
    }

    setFilteredTests(output);
  }, [searchQuery, selectedSubject, tests]);

  const handleLaunchTest = (item: MockTestItem) => {
    Alert.alert(
      "🔒 Enter Examination Mode",
      `Instructions for "${item.title}":\n\n• Duration: ${item.duration}

Max Marks: ${item.marks}\n• Negative Penalty: ${item.negativeMarking}\n\nDo not minimize the app or lock the device during the evaluation.`,
      [
        { text: "Go Back", style: "cancel" },
        { text: "Unlock Paper", onPress: () => console.log("Exam terminal environment loaded.") }
      ]
    );
  };

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "physics": return "#2563EB";
      case "chemistry": return "#10B981";
      case "mathematics": return "#7C3AED";
      default: return "#EA580C"; // CS
    }
  };

  const SUBJECT_CHIPS: SubjectFilterType[] = ["All", "Physics", "Chemistry", "Mathematics", "Computer Science"];

  // ================= REAL CARD UI RENDER =================
  const renderTestCard = ({ item }: { item: MockTestItem }) => {
    const brandColor = getSubjectColor(item.subject);

    return (
      <View style={styles.testCard}>
        {/* Left Vertical Color Bar Accent */}
        <View style={[styles.cardAccentBar, { backgroundColor: brandColor }]} />

        <View style={styles.cardMainContent}>
          {/* Header Specs Info */}
          <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <Text style={[styles.subjectMiniTag, { color: brandColor }]}>{item.subject}</Text>
            <View style={styles.attemptsBadge}>
              <Feather name="users" size={10} color="#64748B" style={{ marginRight: 4 }} />
              <Text style={styles.attemptsBadgeText}>{item.attemptedCount} Attempted</Text>
            </View>
          </View>

          <Text style={styles.testTitleText}>{item.title}</Text>

          {/* Metadata Grid Layout Row */}
          <View style={styles.metadataGridRow}>
            <View style={styles.metaCell}>
              <Feather name="file-text" size={12} color="#64748B" />
              <Text style={styles.metaCellText}>{item.marks} Marks</Text>
            </View>
            <View style={styles.metaCell}>
              <Feather name="clock" size={12} color="#64748B" />
              <Text style={styles.metaCellText}>{item.duration} Mins</Text>
            </View>
            <View style={styles.metaCell}>
              <MaterialCommunityIcons name="alert-decagram-outline" size={13} color="#EF4444" />
              <Text style={[styles.metaCellText, { color: "#475569" }]}>{item.negativeMarking}</Text>
            </View>
          </View>

          {/* Divider Line */}
          <View style={styles.cardDivider} />

          {/* Action Row */}
          <View style={styles.cardActionFooter}>
            <View style={styles.dateInfoBox}>
              <Feather name="calendar" size={12} color="#94A3B8" style={{ marginRight: 4 }} />
              <Text style={styles.dateText}>Live Till: Live Till: {item.liveTill}</Text>
            </View>

            <TouchableOpacity 
              style={[styles.launchTestBtn, { backgroundColor: brandColor }]}
              onPress={() => handleLaunchTest(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.launchBtnText}>Attempt Test</Text>
              <Feather name="arrow-right" size={12} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= HEADER OVERVIEW ================= */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerTitleContext}>
          <Text style={styles.headerTitle}>Mock Tests</Text>
          <Text style={styles.headerSubtitle}>Simulate national rank test conditions</Text>
        </View>
      </View>

      {/* ================= MAIN FLATLIST SCROLL CONTROLLER ================= */}
      <FlatList
        data={filteredTests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTestCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={() => fetchMockTests(true)} colors={["#7C3AED"]} />
        }
        ListHeaderComponent={
          <>
            {/* ================= PERFORMANCE TRACKER OVERVIEW ================= */}
            <View style={styles.performanceDashboardCard}>
              <View style={styles.dashboardColumn}>
                <Text style={styles.dashValue}>{analytics.globalRank}</Text>
                <Text style={styles.dashLabel}>Estimated Rank</Text>
              </View>
              <View style={styles.dashVerticalDivider} />
              <View style={styles.dashboardColumn}>
                <Text style={styles.dashValue}>{analytics.solvedCount}</Text>
                <Text style={styles.dashLabel}>Tests Solved</Text>
              </View>
              <View style={styles.dashVerticalDivider} />
              <View style={styles.dashboardColumn}>
                <Text style={[styles.dashValue, { color: "#10B981" }]}>{analytics.accuracy}</Text>
                <Text style={styles.dashLabel}>Avg Accuracy</Text>
              </View>
            </View>

            {/* ================= SEARCH INPUT FIELD ================= */}
            <View style={styles.searchBarContainer}>
              <View style={styles.searchBar}>
                <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search grand tests, partial syllabus papers..."
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* ================= HORIZONTAL FILTERS CHIPS ================= */}
            <FlatList
              data={SUBJECT_CHIPS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterListWrapper}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isActive = selectedSubject === item;
                return (
                  <TouchableOpacity
                    style={[styles.filterChip, isActive && styles.activeFilterChip]}
                    onPress={() => setSelectedSubject(item)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            <Text style={styles.sectionHeadingText}>Live Test Schedules</Text>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={{ gap: 16, marginTop: 10 }}>
              <View style={[styles.testCard, { height: 140, opacity: 0.5, backgroundColor: "#F8FAFC" }]} />
              <View style={[styles.testCard, { height: 140, opacity: 0.3, backgroundColor: "#F8FAFC" }]} />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconCircle}>
                <Feather name="shield-off" size={32} color="#94A3B8" />
              </View>
              <Text style={styles.emptyTitle}>No Mock Tests Found</Text>
              <Text style={styles.emptyDesc}>No mock papers match your filter criteria right now.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

// ================= PREMIUM STYLE SHEET DESIGN MATRIX =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerTitleContext: {
    flex: 1,
    marginLeft: 14,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  // Performance Summary Row Card
  performanceDashboardCard: {
    flexDirection: "row",
    backgroundColor: "#1E293B", // Premium dark theme contrast card
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  dashboardColumn: {
    alignItems: "center",
    flex: 1,
  },
  dashValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  dashLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 3,
  },
  dashVerticalDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  // Search Controls Spec Frame
  searchBarContainer: {
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    height: 44,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: "#1E293B",
    fontSize: 13,
    fontWeight: "500",
  },
  // Filter chips
  filterListWrapper: {
    gap: 8,
    paddingBottom: 16,
  },
  filterChip: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeFilterChip: {
    backgroundColor: "#7C3AED", // Royal Purple for test branding depth
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  activeFilterChipText: {
    color: "#FFFFFF",
  },
  sectionHeadingText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 8,
    marginBottom: 14,
  },
  // Premium Test Cards Spec Configs
  testCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  cardAccentBar: {
    width: 5,
    height: "100%",
  },
  cardMainContent: {
    flex: 1,
    padding: 16,
  },
  subjectMiniTag: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  attemptsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  attemptsBadgeText: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "600",
  },
  testTitleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 20,
    marginTop: 4,
  },
  metadataGridRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 14,
  },
  metaCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaCellText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "500",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12,
  },
  cardActionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateInfoBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },
  launchTestBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  launchBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  // Empty states
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },
  emptyDesc: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginTop: 4,
  },
});