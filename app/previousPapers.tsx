import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Alert
} from "react-native";
import axios from "axios";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// ================= TYPESCRIPT INTERFACES =================
interface PaperItem {
  id: number;
  studentId: number;
  title: string;
  subject: string;
  year: number;
  faculty: string;
  fileSize: string;
}

type YearFilterType = "All Years" | "2025" | "2024" | "2023";

// ================= DUMMY PYQ DATA =================
// const DUMMY_PAPERS: PaperItem[] = [
//   {
//     id: "p1",
//     title: "Quantum Mechanics & Wave Theory Paper",
//     subject: "Physics",
//     examType: "End-Sem",
//     year: "2025",
//     duration: "3 Hours",
//     totalMarks: "100 Marks"
//   },
//   {
//     id: "p2",
//     title: "Organic Chemistry & Polymers Foundations",
//     subject: "Chemistry",
//     examType: "Mid-Sem",
//     year: "2025",
//     duration: "1.5 Hours",
//     totalMarks: "50 Marks"
//   },
//   {
//     id: "p3",
//     title: "Linear Algebra & Vector Calculus Matrix",
//     subject: "Mathematics",
//     examType: "End-Sem",
//     year: "2024",
//     duration: "3 Hours",
//     totalMarks: "100 Marks"
//   },
//   {
//     id: "p4",
//     title: "Object Oriented Programming using C++",
//     subject: "Computer Science",
//     examType: "End-Sem",
//     year: "2024",
//     duration: "3 Hours",
//     totalMarks: "100 Marks"
//   },
//   {
//     id: "p5",
//     title: "Discrete Mathematical Structures & Logic",
//     subject: "Mathematics",
//     examType: "Mid-Sem",
//     year: "2023",
//     duration: "1.5 Hours",
//     totalMarks: "50 Marks"
//   },
//   {
//     id: "p6",
//     title: "Classical Mechanics & Thermodynamics",
//     subject: "Physics",
//     examType: "Mid-Sem",
//     year: "2023",
//     duration: "1.5 Hours",
//     totalMarks: "50 Marks"
//   }
// ];

const YEAR_CHIPS: YearFilterType[] = ["All Years", "2025", "2024", "2023"];

export default function OldPapersScreen() {
  const router = useRouter();

  // State Management
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<YearFilterType>("All Years");
  const [papers, setPapers] = useState<PaperItem[]>([]);
const [filteredPapers, setFilteredPapers] = useState<PaperItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate Premium Skeleton Loading State
useEffect(() => {
  const fetchPapers = async () => {
    try {

      const response = await axios.get(
        "http://192.168.29.49:5000/api/student/previousPapers/3"
      );

      console.log(
        "PAPERS API:",
        response.data
      );

      setPapers(response.data.papers);

    } catch (error) {

      console.log(
        "Papers Error:",
        error
      );

    } finally {

      setIsLoading(false);

    }
  };

  fetchPapers();
}, []);

  // Sync Search & Year Chips Matrix
  useEffect(() => {
    let result = papers;

    // Year Filter Logic
    if (selectedYear !== "All Years") {
      result = result.filter((paper) => paper.year.toString() === selectedYear);
    }

    // Search Query Matrix
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (paper) =>
          paper.title.toLowerCase().includes(query) ||
          paper.subject.toLowerCase().includes(query) ||
          paper.faculty.toLowerCase().includes(query)
      );
    }

    setFilteredPapers(result);
  }, [searchQuery, selectedYear, papers]);

  const handleDownloadPaper = (title: string) => {
    Alert.alert("Downloading PYQ 📥", `Fetching question paper and official answer key blueprints for:\n"${title}"`);
  };

  const handlePreviewPaper = (title: string) => {
    Alert.alert("Exam View mode 📝", `Opening official encrypted PDF canvas for:\n"${title}"`);
  };

  // Aesthetic mapping for subject-wise design accents
  const getSubjectMeta = (subject: PaperItem["subject"]) => {
    switch (subject) {
      case "Physics": return { bg: "#EFF6FF", text: "#2563EB", icon: "atom" };
      case "Chemistry": return { bg: "#ECFDF5", text: "#10B981", icon: "flask" };
      case "Mathematics": return { bg: "#F5F3FF", text: "#7C3AED", icon: "calculator" };
      case "Computer Science": return { bg: "#FFF7ED", text: "#EA580C", icon: "laptop-code" };
      default: return { bg: "#F8FAFC", text: "#64748B", icon: "file-alt" };
    }
  };

  // ================= SKELETON LOADER STRUCTURE =================
  const renderSkeletonCard = () => (
    <View style={styles.skeletonCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.skeletonLineShort} />
        <View style={styles.skeletonLineShort} />
      </View>
      <View style={[styles.skeletonLineLong, { marginTop: 15 }]} />
      <View style={[styles.skeletonLineLong, { width: "60%", marginTop: 8, height: 12 }]} />
      <View style={styles.skeletonFooterRow}>
        <View style={[styles.skeletonLineShort, { width: "35%" }]} />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={[styles.skeletonButton, { width: 40 }]} />
          <View style={[styles.skeletonButton, { width: 80 }]} />
        </View>
      </View>
    </View>
  );

  // ================= MAIN REAL CARD RENDER =================
  const renderPaperCard = ({ item }: { item: PaperItem }) => {
    const meta = getSubjectMeta(item.subject);
    const isEndSem = true; // Assuming all papers are End-Sem for this example, adjust as needed

    return (
      <View style={styles.paperCard}>
        {/* Card Header Row */}
        <View style={styles.cardHeader}>
          <View style={[styles.badgeContainer, { backgroundColor: meta.bg }]}>
            <FontAwesome5 name={meta.icon} size={10} color={meta.text} style={{ marginRight: 6 }} />
            <Text style={[styles.badgeText, { color: meta.text }]}>{item.subject}</Text>
          </View>
          
          {/* Exam Type Badge */}
          <View style={[styles.examTypeBadge, { backgroundColor: isEndSem ? "#FEF2F2" : "#F0FDF4" }]}>
            <Text style={[styles.examTypeText, { color: isEndSem ? "#EF4444" : "#16A34A" }]}>
              {item.year}
            </Text>
          </View>
        </View>

        {/* Paper Main Title Info */}
        <Text style={styles.paperTitle} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Meta Stats row (Duration & Marks) */}
        <View style={styles.statsRow}>
          <View style={styles.statTag}>
            <Feather name="clock" size={12} color="#64748B" style={{ marginRight: 4 }} />
            <Text style={styles.statTagText}>{item.faculty}</Text>
          </View>
          <View style={styles.statTag}>
            <Feather name="award" size={12} color="#64748B" style={{ marginRight: 4 }} />
            <Text style={styles.statTagText}>{item.fileSize}</Text>
          </View>
          <View style={[styles.statTag, { backgroundColor: "#F1F5F9" }]}>
            <Text style={[styles.statTagText, { color: "#1E293B", fontWeight: "700" }]}>Year: {item.year}</Text>
          </View>
        </View>

        {/* Divider Layout Line */}
        <View style={styles.cardDivider} />

        {/* Footer Actions Engine */}
        <View style={styles.cardFooter}>
          <Text style={styles.pyqVerifiedText}>🛡️ Verified PYQ</Text>
          <View style={styles.actionButtonGroup}>
            <TouchableOpacity
              style={styles.downloadIconBtn}
              onPress={() => handleDownloadPaper(item.title)}
              activeOpacity={0.7}
            >
              <Feather name="download" size={15} color="#4F46E5" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.solveBtn}
              onPress={() => handlePreviewPaper(item.title)}
              activeOpacity={0.8}
            >
              <Text style={styles.solveBtnText}>View Paper</Text>
              <Feather name="external-link" size={12} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= HEADER CONTROLS ================= */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerTitleContext}>
          <Text style={styles.headerTitle}>Old Papers</Text>
          <Text style={styles.headerSubtitle}>Practice previous years' question blueprints</Text>
        </View>
      </View>

      {/* ================= FILTER SEARCH INPUT BAR ================= */}
      <View style={styles.searchBoxWrapper}>
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search papers (e.g., Mid-Sem, Physics)..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>
      </View>

      {/* ================= HORIZONTAL YEAR CHIPS FILTERS ================= */}
      <View style={{ marginBottom: 4 }}>
        <FlatList
          data={YEAR_CHIPS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterListContainer}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = selectedYear === item;
            return (
              <TouchableOpacity
                style={[styles.filterChip, isActive && styles.activeFilterChip]}
                onPress={() => setSelectedYear(item)}
                activeOpacity={0.8}
              >
                <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ================= MAIN MATRIX CONTENT SCROLL ENGINE ================= */}
      {isLoading ? (
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={renderSkeletonCard}
        />
      ) : filteredPapers.length === 0 ? (
        // Premium minimal clean empty state layout
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Feather name="book-open" size={36} color="#94A3B8" />
          </View>
          <Text style={styles.emptyStateTitle}>No Papers Discovered</Text>
          <Text style={styles.emptyStateDesc}>
            We couldn't locate any previous year archives matching "{selectedYear}" or your typed queries.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredPapers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPaperCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

// ================= ARCHITECTURAL LAYOUT STYLEMATRIX =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  headerTitleContext: {
    flex: 1,
    marginLeft: 14
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: -0.5
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2
  },
  // Search Bar Styling Specs
  searchBoxWrapper: {
    paddingHorizontal: 20,
    marginVertical: 8
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    height: 44,
    paddingHorizontal: 12
  },
  searchInput: {
    flex: 1,
    color: "#1E293B",
    fontSize: 13,
    fontWeight: "500"
  },
  // Filters List Setup
  filterListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8
  },
  filterChip: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  activeFilterChip: {
    backgroundColor: "#4F46E5", // Premium Royal Indigo hue shift
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B"
  },
  activeFilterChipText: {
    color: "#FFFFFF"
  },
  // Paper Feed Layout Cards Specs
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16
  },
  paperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  examTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6
  },
  examTypeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  paperTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 20
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8
  },
  statTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  statTagText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500"
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  pyqVerifiedText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B"
  },
  actionButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  downloadIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center"
  },
  solveBtn: {
    flexDirection: "row",
    backgroundColor: "#4F46E5",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center"
  },
  solveBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600"
  },
  // Empty State Layout Configurations
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: 80
  },
  emptyIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155"
  },
  emptyStateDesc: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18
  },
  // Skeleton Styles Architecture
  skeletonCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#F1F5F9",
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    opacity: 0.7
  },
  skeletonLineShort: {
    width: 70,
    height: 16,
    backgroundColor: "#E2E8F0",
    borderRadius: 5
  },
  skeletonLineLong: {
    height: 15,
    backgroundColor: "#E2E8F0",
    borderRadius: 4
  },
  skeletonFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
    paddingTop: 12
  },
  skeletonButton: {
    height: 34,
    backgroundColor: "#E2E8F0",
    borderRadius: 10
  }
});