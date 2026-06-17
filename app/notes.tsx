import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ================= TYPESCRIPT INTERFACES =================
interface NoteItem {
  id: number;
  studentId: number;
  title: string;
  subject: string;
  description: string;
  faculty: string;
  uploadDate: string;
  fileSize: string;
}

type FilterType = "All" | "Physics" | "Chemistry" | "Mathematics" | "Computer Science";

// ================= DUMMY ACADEMIC DATA =================
// const DUMMY_NOTES: NoteItem[] = [
//   {
//     id: "1",
//     title: "Electrostatics & Gauss Law",
//     subject: "Physics",
//     description: "Comprehensive class notes covering electric fields, potential, flux, and Gauss law applications.",
//     faculty: "Dr. Alok Rai (Physics Dept.)",
//     uploadDate: "15 June 2026",
//     fileSize: "4.2 MB"
//   },
//   {
//     id: "2",
//     title: "Organic Chemistry: Unit 2 Reaction Mechanisms",
//     subject: "Chemistry",
//     description: "Detailed step-by-step mechanisms for SN1, SN2, E1, and E2 reactions with major exceptions.",
//     faculty: "Prof. S. Sharma (Chemistry Dept.)",
//     uploadDate: "12 June 2026",
//     fileSize: "5.8 MB"
//   },
//   {
//     id: "3",
//     title: "Differential Equations & Applications",
//     subject: "Mathematics",
//     description: "First-order and second-order linear differential equations solved with engineering application modeling.",
//     faculty: "Dr. Amit Verma (Maths Dept.)",
//     uploadDate: "10 June 2026",
//     fileSize: "3.1 MB"
//   },
//   {
//     id: "4",
//     title: "Data Structures: Binary Trees & Graphs",
//     subject: "Computer Science",
//     description: "Complete reference implementations of BFS, DFS, Tree traversals, and Dijkstra's routing algorithms.",
//     faculty: "Er. Nishant Kapri (CSE Dept.)",
//     uploadDate: "08 June 2026",
//     fileSize: "7.4 MB"
//   },
//   {
//     id: "5",
//     title: "Wave Optics & Interference",
//     subject: "Physics",
//     description: "Classroom derivations of Young's Double Slit Experiment, Huygens' Principle, and diffraction constraints.",
//     faculty: "Dr. Alok Rai (Physics Dept.)",
//     uploadDate: "05 June 2026",
//     fileSize: "2.9 MB"
//   }
// ];

const FILTER_CHIPS: FilterType[] = ["All", "Physics", "Chemistry", "Mathematics", "Computer Science"];

export default function NotesScreen() {
  const router = useRouter();

  // State Management
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate Premium Skeleton Loading State on Component Mount
  useEffect(() => {

  const fetchNotes = async () => {
    try {

      const response = await axios.get(
        "http://192.168.29.49:5000/api/student/notes/3"
      );

      console.log("NOTES API:", response.data);

      setNotes(response.data.notes);
      setFilteredNotes(response.data.notes);

    } catch (error) {

      console.log("Notes Fetch Error:", error);

      Alert.alert(
        "Error",
        "Failed to load notes"
      );

    } finally {

      setIsLoading(false);

    }
  };

  fetchNotes();

}, []);

  // Sync Search & Filter Engine Matrix
  useEffect(() => {
    let result = notes;

    // Filter Logic
    if (selectedFilter !== "All") {
      result = result.filter((note) => note.subject === selectedFilter);
    }

    // Search Query Logic
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.subject.toLowerCase().includes(query) ||
          note.description.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(result);
  }, [searchQuery, selectedFilter]);

  // UI Event Handlers
  const handleDownload = (title: string) => {
    Alert.alert("Downloading Note 📥", `Starting cloud download pipeline for:\n"${title}"`);
  };

  const handleView = (title: string) => {
    Alert.alert("PDF Document Viewer 📄", `Initializing secure canvas renderer for:\n"${title}"`);
  };

  // Helper function to map dynamic aesthetic styles to badges
  const getSubjectMeta = (subject: NoteItem["subject"]) => {
    switch (subject) {
      case "Physics":
        return { bg: "#EFF6FF", text: "#2563EB", icon: "atom" };
      case "Chemistry":
        return { bg: "#ECFDF5", text: "#10B981", icon: "flask" };
      case "Mathematics":
        return { bg: "#F5F3FF", text: "#7C3AED", icon: "calculator" };
      case "Computer Science":
        return { bg: "#FFF7ED", text: "#EA580C", icon: "laptop-code" };
      default:
        return { bg: "#F8FAFC", text: "#64748B", icon: "file-alt" };
    }
  };

  // ================= RENDER COMPONENTS =================

  // 1. Premium Skeleton Loader Setup
  const renderSkeletonCard = () => (
    <View style={styles.skeletonCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.skeletonBadge} />
        <View style={[styles.skeletonLine, { width: "25%" }]} />
      </View>
      <View style={[styles.skeletonLine, { width: "80%", marginTop: 15 }]} />
      <View style={[styles.skeletonLine, { width: "95%", marginTop: 10, height: 12 }]} />
      <View style={[styles.skeletonLine, { width: "60%", marginTop: 6, height: 12 }]} />
      <View style={styles.skeletonFooterRow}>
        <View style={[styles.skeletonLine, { width: "40%", height: 12 }]} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={[styles.skeletonButton, { width: 40 }]} />
          <View style={[styles.skeletonButton, { width: 80 }]} />
        </View>
      </View>
    </View>
  );

  // 2. Main Notes Dynamic Card Render
  const renderNoteCard = ({ item }: { item: NoteItem }) => {
    const meta = getSubjectMeta(item.subject);

    return (
      <View style={styles.noteCard}>
        {/* Card Header Metadata block */}
        <View style={styles.cardHeader}>
          <View style={[styles.badgeContainer, { backgroundColor: meta.bg }]}>
            <FontAwesome5 name={meta.icon} size={11} color={meta.text} style={{ marginRight: 6 }} />
            <Text style={[styles.badgeText, { color: meta.text }]}>{item.subject}</Text>
          </View>
          <Text style={styles.fileSizeText}>{item.fileSize}</Text>
        </View>

        {/* Note Primary Information */}
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.noteDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Faculty Metadata Component */}
        <View style={styles.facultyRow}>
          <Feather name="user" size={13} color="#94A3B8" style={{ marginRight: 5 }} />
          <Text style={styles.facultyText} numberOfLines={1}>
            {item.faculty}
          </Text>
        </View>

        {/* Horizontal Divider Line */}
        <View style={styles.cardDivider} />

        {/* Card Interactive Footer Control Row */}
        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>Uploaded: {item.uploadDate}</Text>
          <View style={styles.actionButtonGroup}>
            <TouchableOpacity
              style={styles.downloadIconBtn}
              onPress={() => handleDownload(item.title)}
              activeOpacity={0.7}
            >
              <Feather name="download" size={16} color="#2563EB" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() => handleView(item.title)}
              activeOpacity={0.8}
            >
              <Text style={styles.viewBtnText}>View Note</Text>
              <Feather name="chevron-right" size={14} color="#FFFFFF" style={{ marginLeft: 3 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= HEADER SUB-SYSTEM ================= */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerTitleContext}>
          <Text style={styles.headerTitle}>Notes</Text>
          <Text style={styles.headerSubtitle}>Access and download your academic notes</Text>
        </View>
        <TouchableOpacity
          style={styles.headerActionBtn}
          onPress={() => Alert.alert("Context Menu", "Global search filter overrides activated.")}
          activeOpacity={0.7}
        >
          <Feather name="sliders" size={18} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* ================= SEARCH & SEARCH INPUT SYSTEM ================= */}
      <View style={styles.searchBoxWrapper}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes by title or subject..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ================= HORIZONTAL FILTER CHIPS LIST ================= */}
      <View style={{ marginBottom: 5 }}>
        <FlatList
          data={FILTER_CHIPS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterListContainer}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isActive = selectedFilter === item;
            return (
              <TouchableOpacity
                style={[styles.filterChip, isActive && styles.activeFilterChip]}
                onPress={() => setSelectedFilter(item)}
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

      {/* ================= PRIMARY LIST CORE STRUCTURE ================= */}
      {isLoading ? (
        // Render Skeletons Array elements while Loading is locked
        <FlatList
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={renderSkeletonCard}
        />
      ) : filteredNotes.length === 0 ? (
        // ================= CLEAN EMPTY STATE LAYOUT =================
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Feather name="folder-minus" size={42} color="#94A3B8" />
          </View>
          <Text style={styles.emptyStateTitle}>No Notes Available</Text>
          <Text style={styles.emptyStateDesc}>
            We couldn't find any documents matching your current filter criteria or query parameters. Try a different variation!
          </Text>
          <TouchableOpacity
            style={styles.resetSearchBtn}
            onPress={() => {
              setSearchQuery("");
              setSelectedFilter("All");
            }}
          >
            <Text style={styles.resetSearchBtnText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Actual Document Feed Rendering
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNoteCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

// ================= PREMIUM INTERACTIVE STYLESHEET =================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF" // Clean white minimalist foundation background
  },
  // Header Structuring
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF"
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
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1
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
  headerActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC"
  },
  // Search Bar UI
  searchBoxWrapper: {
    paddingHorizontal: 20,
    marginVertical: 10
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    height: 48,
    paddingHorizontal: 14
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "500"
  },
  // Filtering Chip Architecture
  filterListContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8
  },
  filterChip: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "transparent"
  },
  activeFilterChip: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B"
  },
  activeFilterChipText: {
    color: "#FFFFFF"
  },
  // Card Feed Structuring
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16
  },
  noteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
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
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.3
  },
  fileSizeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8"
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 22
  },
  noteDescription: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
    lineHeight: 18
  },
  facultyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
  },
  facultyText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B"
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
  dateText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#94A3B8"
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
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center"
  },
  viewBtn: {
    flexDirection: "row",
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  viewBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600"
  },
  // Empty State Layout Styles
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: 60
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9"
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#334155"
  },
  emptyStateDesc: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19
  },
  resetSearchBtn: {
    marginTop: 18,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12
  },
  resetSearchBtnText: {
    color: "#1E293B",
    fontSize: 14,
    fontWeight: "600"
  },
  // Skeleton Loader Styles
  skeletonCard: {
    backgroundColor: "#FBFDFE",
    borderColor: "#F1F5F9",
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    opacity: 0.8
  },
  skeletonBadge: {
    width: 80,
    height: 20,
    backgroundColor: "#E2E8F0",
    borderRadius: 6
  },
  skeletonLine: {
    height: 16,
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