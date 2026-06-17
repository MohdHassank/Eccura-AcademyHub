import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
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
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// ================= TYPESCRIPT INTERFACES =================
interface LectureItem {
  id: number;
  studentId: number;
  title: string;
  subject: string;
  faculty: string;
  duration: string;
  uploadDate: string;
  thumbnailUrl: string;
}

type SubjectFilterType = "All" | "Physics" | "Chemistry" | "Mathematics" | "Computer Science";

// ================= DUMMY LECTURES DATA =================
// const DUMMY_LECTURES: LectureItem[] = [
//   {
//     id: "l1",
//     title: "Introduction to Semiconductor Physics & Diode Characteristics",
//     subject: "Physics",
//     professor: "Dr. Alok Rai",
//     duration: "45:20",
//     uploadedDate: "15 June 2026",
//     views: "142 Views",
//     chaptersCount: 4
//   },
//   {
//     id: "l2",
//     title: "Deep Dive into Pointer Arithmetic & Memory Allocation in C++",
//     subject: "Computer Science",
//     professor: "Er. Nishant Kapri",
//     duration: "1:12:05",
//     uploadedDate: "12 June 2026",
//     views: "210 Views",
//     chaptersCount: 6
//   },
//   {
//     id: "l3",
//     title: "Eigenvalues, Eigenvectors & Diagonalization Masterclass",
//     subject: "Mathematics",
//     professor: "Dr. Amit Verma",
//     duration: "58:40",
//     uploadedDate: "10 June 2026",
//     views: "95 Views",
//     chaptersCount: 3
//   },
//   {
//     id: "l4",
//     title: "Chemical Kinetics: Rate Laws & Order of Reactions",
//     subject: "Chemistry",
//     professor: "Prof. S. Sharma",
//     duration: "38:15",
//     uploadedDate: "08 June 2026",
//     views: "88 Views",
//     chaptersCount: 2
//   },
//   {
//     id: "l5",
//     title: "Graph Traversal Algorithms: BFS & DFS Explained Visually",
//     subject: "Computer Science",
//     professor: "Er. Nishant Kapri",
//     duration: "1:05:50",
//     uploadedDate: "05 June 2026",
//     views: "320 Views",
//     chaptersCount: 5
//   }
// ];

const SUBJECT_CHIPS: SubjectFilterType[] = ["All", "Physics", "Chemistry", "Mathematics", "Computer Science"];

export default function RecordedLecturesScreen() {
  const router = useRouter();
  const fetchLectures = async () => {
    try {

      const userData = await AsyncStorage.getItem("user");

      if (!userData) return;

      const user = JSON.parse(userData);

      const response = await axios.get(
        `http://192.168.29.49:5000/api/student/recordedLectures/${user.id}`
      );

      console.log("LECTURES API:", response.data);

      if (response.data.success) {
        setLectures(response.data.lectures);
        setFilteredLectures(response.data.lectures);
      }

    } catch (error) {

      console.log("LECTURES FETCH ERROR:", error);

      Alert.alert(
        "Error",
        "Failed to load lectures"
      );

    }
  };

  // State Management
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilterType>("All");
  const [lectures, setLectures] =
    useState<LectureItem[]>([]);

  const [filteredLectures, setFilteredLectures] =
    useState<LectureItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate Premium Skeleton Loading State
  useEffect(() => {

    const loadData = async () => {

      setIsLoading(true);

      await fetchLectures();

      setIsLoading(false);

    };

    loadData();

  }, []);

  // Sync Filter Matrices
  useEffect(() => {
    let result = lectures;
    if (selectedSubject !== "All") {
      result = result.filter((lecture) => lecture.subject === selectedSubject);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lecture) =>
          lecture.title.toLowerCase().includes(query) ||
          lecture.faculty.toLowerCase().includes(query)
      );
    }

    setFilteredLectures(result);
  }, [searchQuery, selectedSubject]);

  const handlePlayVideo = (title: string) => {
    Alert.alert("Streaming Video 🎬", `Initializing HLS player engine for:\n"${title}"`);
  };

  const handleDownloadVideo = (title: string) => {
    Alert.alert("Download Started 📥", "Lecture is saving to local storage for offline flight/commute access mode.");
  };

  // Aesthetic mapping for subject tags
  const getSubjectMeta = (subject: LectureItem["subject"]) => {
    switch (subject) {
      case "Physics": return { text: "#2563EB", icon: "atom", thumbColor: "#DBEAFE" };
      case "Chemistry": return { text: "#10B981", icon: "flask", thumbColor: "#D1FAE5" };
      case "Mathematics": return { text: "#7C3AED", icon: "calculator", thumbColor: "#EDE9FE" };
      case "Computer Science": return { text: "#EA580C", icon: "laptop-code", thumbColor: "#FFEDD5" };
      default: return { text: "#64748B", icon: "video", thumbColor: "#F1F5F9" };
    }
  };

  // ================= SKELETON LOADER FRAME =================
  const renderSkeletonCard = () => (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonVideoThumb} />
      <View style={[styles.skeletonLine, { width: "85%", marginTop: 12 }]} />
      <View style={[styles.skeletonLine, { width: "50%", marginTop: 8, height: 12 }]} />
      <View style={styles.skeletonFooter}>
        <View style={[styles.skeletonLine, { width: "30%", height: 12 }]} />
        <View style={[styles.skeletonLine, { width: "20%", height: 12 }]} />
      </View>
    </View>
  );

  // ================= MAIN CARD CONTEXT RENDER =================
  const renderLectureCard = ({ item }: { item: LectureItem }) => {
    const meta = getSubjectMeta(item.subject);

    return (
      <View style={styles.lectureCard}>

        {/* Interactive Thumbnail Component Area */}
        <TouchableOpacity
          style={[styles.videoThumbnailWrapper, { backgroundColor: meta.thumbColor }]}
          onPress={() => handlePlayVideo(item.title)}
          activeOpacity={0.9}
        >
          {/* Central Play Icon Overlay */}
          <View style={styles.playButtonCircle}>
            <Ionicons name="play" size={20} color="#FFFFFF" style={{ marginLeft: 3 }} />
          </View>

          {/* Subject Badge Absolute Top-Left */}
          <View style={styles.absoluteSubjectBadge}>
            <FontAwesome5 name={meta.icon} size={9} color={meta.text} style={{ marginRight: 4 }} />
            <Text style={[styles.subjectBadgeText, { color: meta.text }]}>{item.subject}</Text>
          </View>

          {/* Duration Badge Bottom-Right */}
          <View style={styles.absoluteDurationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </TouchableOpacity>

        {/* Text Content Block info */}
        <View style={styles.cardInfoContainer}>
          <Text style={styles.lectureTitle} numberOfLines={2} onPress={() => handlePlayVideo(item.title)}>
            {item.title}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.professorText}>By {item.faculty}</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.metaSubText}>
              {item.duration}
            </Text>
          </View>

          {/* Divider Line */}
          <View style={styles.cardDivider} />

          {/* Footer Action Metrics Row */}
          <View style={styles.cardFooter}>
            <View style={styles.statsFlex}>
              <Feather name="eye" size={12} color="#94A3B8" style={{ marginRight: 4 }} />
              <Text style={styles.footerMetricText}>
                {item.duration}
              </Text>

              <View style={styles.dotSeparator} />

              <Text style={styles.footerMetricText}>
                {new Date(item.uploadDate).toLocaleDateString()}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.downloadActionBtn}
              onPress={() => handleDownloadVideo(item.title)}
              activeOpacity={0.7}
            >
              <Feather name="download-cloud" size={15} color="#475569" />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* ================= HEADER BRANDING ARCHITECTURE ================= */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Feather name="arrow-left" size={20} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerTitleContext}>
          <Text style={styles.headerTitle}>Recorded Lectures</Text>
          <Text style={styles.headerSubtitle}>Stream high-fidelity knowledge content</Text>
        </View>
      </View>

      {/* ================= QUERY SEARCH COMPONENT ================= */}
      <View style={styles.searchBoxWrapper}>
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lectures by title or speaker..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
        </View>
      </View>

      {/* ================= HORIZONTAL CHIPS ENGINE ================= */}
      <View style={{ marginBottom: 4 }}>
        <FlatList
          data={SUBJECT_CHIPS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterListContainer}
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
      </View>

      {/* ================= CONTENT INTERACTION HUB LIST ================= */}
      {isLoading ? (
        <FlatList
          data={[1, 2]}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={renderSkeletonCard}
        />
      ) : filteredLectures.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Feather name="video-off" size={34} color="#94A3B8" />
          </View>
          <Text style={styles.emptyStateTitle}>No Lectures Found</Text>
          <Text style={styles.emptyStateDesc}>
            No online archives match your filter. Check back later or adjust the tags query matrix.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredLectures}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLectureCard}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

// ================= LAYOUT CONTEXT STYLESHEET =================
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
  // Search Layout Specifications
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
  // Horizontal Slider Category Specs
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
    backgroundColor: "#3B82F6", // Video theme Bright Blue accent
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B"
  },
  activeFilterChipText: {
    color: "#FFFFFF"
  },
  // Lecture Cards View Matrix
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 18
  },
  lectureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2
  },
  videoThumbnailWrapper: {
    height: 160,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  playButtonCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(4px)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)"
  },
  absoluteSubjectBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subjectBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase"
  },
  absoluteDurationBadge: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5
  },
  durationText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600"
  },
  cardInfoContainer: {
    padding: 16
  },
  lectureTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    lineHeight: 20
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6
  },
  professorText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600"
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 8
  },
  metaSubText: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "500"
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 12
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  statsFlex: {
    flexDirection: "row",
    alignItems: "center"
  },
  footerMetricText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500"
  },
  downloadActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center"
  },
  // Empty State Layout Components
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
  // Skeleton Layout Engine
  skeletonCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#F1F5F9",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    opacity: 0.7
  },
  skeletonVideoThumb: {
    height: 160,
    backgroundColor: "#E2E8F0"
  },
  skeletonLine: {
    height: 14,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    marginLeft: 16
  },
  skeletonFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderColor: "#F1F5F9"
  }
});