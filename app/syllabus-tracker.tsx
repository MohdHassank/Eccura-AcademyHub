import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// ================= TYPESCRIPT INTERFACES =================
interface Chapter {
  id: string;
  name: string;
  completed: boolean;
}

interface SubjectSyllabus {
  id: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "Computer Science";
  chapters: Chapter[];
}

// ================= DUMMY SYLLABUS DATA MATRIX =================
const INITIAL_SYLLABUS: SubjectSyllabus[] = [
  {
    id: "s1",
    subject: "Physics",
    chapters: [
      { id: "c1_1", name: "Electrostatics & Coulomb's Law", completed: true },
      { id: "c1_2", name: "Gauss Law & Electric Potential", completed: true },
      { id: "c1_3", name: "Capacitors & Dielectrics", completed: false },
      { id: "c1_4", name: "Magnetic Effects of Current", completed: false },
    ],
  },
  {
    id: "s2",
    subject: "Computer Science",
    chapters: [
      { id: "c2_1", name: "Arrays & String Matrices", completed: true },
      { id: "c2_2", name: "Linked Lists (Single & Double)", completed: true },
      { id: "c2_3", name: "Stack & Queue Architectures", completed: true },
      { id: "c2_4", name: "Trees & Binary Search Graph", completed: false },
    ],
  },
  {
    id: "s3",
    subject: "Mathematics",
    chapters: [
      { id: "c3_1", name: "Matrices & Determinants", completed: true },
      { id: "c3_2", name: "Limits, Continuity & Differentiability", completed: false },
      { id: "c3_3", name: "Advanced Integral Calculus", completed: false },
    ],
  },
  {
    id: "s4",
    subject: "Chemistry",
    chapters: [
      { id: "c4_1", name: "Chemical Kinetics & Rate Laws", completed: true },
      { id: "c4_2", name: "Coordination Compounds", completed: false },
      { id: "c4_3", name: "Organic Biomolecules", completed: false },
    ],
  },
];

export default function SyllabusTrackerScreen() {
  const router = useRouter();

  // State Management for Interactive Checklist
  const [syllabusData, setSyllabusData] = useState<SubjectSyllabus[]>(INITIAL_SYLLABUS);
  const [expandedSubject, setExpandedSubject] = useState<string | null>("s1"); // Default open Physics

  // Core Math Logic: Calculate Live Progress Percentages
  const [stats, setStats] = useState({ total: 0, completed: 0, percent: 0 });

  useEffect(() => {
    let totalChapters = 0;
    let completedChapters = 0;

    syllabusData.forEach((sub) => {
      sub.chapters.forEach((ch) => {
        totalChapters++;
        if (ch.completed) completedChapters++;
      });
    });

    const percentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
    setStats({ total: totalChapters, completed: completedChapters, percent: percentage });
  }, [syllabusData]);

 // Toggle Chapter Completion State
  const toggleChapter = (subjectId: string, chapterId: string) => {
    setSyllabusData((prevData) =>
      prevData.map((sub) => {
        if (sub.id !== subjectId) return sub;
        return {
          ...sub,
          chapters: sub.chapters.map((ch) =>
            ch.id === chapterId ? { ...ch, completed: !ch.completed } : ch
          ),
        };
      })
    );
  };

  // Helper aesthetic subject theme configurations
  const getSubjectMeta = (subject: SubjectSyllabus["subject"]) => {
    switch (subject) {
      case "Physics": return { text: "#2563EB", icon: "atom", bg: "#EFF6FF" };
      case "Chemistry": return { text: "#10B981", icon: "flask", bg: "#ECFDF5" };
      case "Mathematics": return { text: "#7C3AED", icon: "calculator", bg: "#F5F3FF" };
      case "Computer Science": return { text: "#EA580C", icon: "laptop-code", bg: "#FFF7ED" };
      default: return { text: "#64748B", icon: "book", bg: "#F8FAFC" };
    }
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
          <Text style={styles.headerTitle}>Syllabus Tracker</Text>
          <Text style={styles.headerSubtitle}>Monitor completion steps dynamically</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* ================= GLOBAL METRIC PROGRESS CARD ================= */}
        <View style={styles.progressOverviewCard}>
          <View style={styles.progressTextRow}>
            <View>
              <Text style={styles.metricPercentText}>{stats.percent}%</Text>
              <Text style={styles.metricSubTitle}>Overall Syllabus Done</Text>
            </View>
            <View style={styles.metricCountBadge}>
              <Text style={styles.metricCountText}>
                {stats.completed}/{stats.total} Chapters
              </Text>
            </View>
          </View>

          {/* Clean Progress Track */}
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${stats.percent}%` }]} />
          </View>
        </View>

        {/* ================= SUBJECT EXPANDABLE ACCORDIONS ================= */}
        <Text style={styles.sectionHeaderTitle}>Subject Breakdown</Text>
        <View style={styles.accordionWrapper}>
          {syllabusData.map((item) => {
            const meta = getSubjectMeta(item.subject);
            const isExpanded = expandedSubject === item.id;
            
            // Calculate individual subject completion stats
            const subCompleted = item.chapters.filter(c => c.completed).length;
            const subTotal = item.chapters.length;
            const subPercent = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0;

            return (
              <View key={item.id} style={[styles.subjectCard, isExpanded && styles.activeSubjectCardBorder]}>
                
                {/* Accordion Trigger Header */}
                <TouchableOpacity
                  style={styles.subjectHeaderTrigger}
                  activeOpacity={0.8}
                  onPress={() => setExpandedSubject(isExpanded ? null : item.id)}
                >
                  <View style={styles.subjectHeaderLeft}>
                    <View style={[styles.iconBox, { backgroundColor: meta.bg }]}>
                      <FontAwesome5 name={meta.icon} size={14} color={meta.text} />
                    </View>
                    <View style={{ marginLeft: 12 }}>
                      <Text style={styles.subjectTitleText}>{item.subject}</Text>
                      <Text style={styles.subjectSubText}>{subPercent}% Complete ({subCompleted}/{subTotal})</Text>
                    </View>
                  </View>
                  
                  <Feather 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={18} 
                    color="#64748B" 
                  />
                </TouchableOpacity>

                {/* Expanded Chapters Check-List Matrix */}
                {isExpanded && (
                  <View style={styles.chaptersListBlock}>
                    <View style={styles.innerAccordionDivider} />
                    {item.chapters.map((chapter) => (
                      <TouchableOpacity
                        key={chapter.id}
                        style={styles.chapterItemRow}
                        activeOpacity={0.7}
                        onPress={() => toggleChapter(item.id, chapter.id)}
                      >
                        {/* Circular Interactive Checkbox */}
                        <View style={[
                          styles.checkboxCircle, 
                          chapter.completed && { backgroundColor: "#10B981", borderColor: "#10B981" }
                        ]}>
                          {chapter.completed && (
                            <Feather name="check" size={10} color="#FFFFFF" />
                          )}
                        </View>
                        
                        <Text style={[
                          styles.chapterNameText,
                          chapter.completed && styles.completedChapterText
                        ]}>
                          {chapter.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ================= LAYOUT DESIGN SYSTEM SPECIFICATIONS =================
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
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9"
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40
  },
  // Global Metrics Container Layout
  progressOverviewCard: {
    backgroundColor: "#1E293B", // Deep slate blue card base for high focus priority
    borderRadius: 24,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16
  },
  metricPercentText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  metricSubTitle: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "600",
    marginTop: 2
  },
  metricCountBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  metricCountText: {
    color: "#38BDF8", // Cyan dynamic highlighter accent
    fontSize: 12,
    fontWeight: "700"
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
    overflow: "hidden"
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#38BDF8", // Transitions seamlessly with fill percentages
    borderRadius: 4
  },
  // Section Break Headers
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 25,
    marginBottom: 14
  },
  // Accordion Groupings layout metrics
  accordionWrapper: {
    gap: 12
  },
  subjectCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden"
  },
  activeSubjectCardBorder: {
    borderColor: "#CBD5E1",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1
  },
  subjectHeaderTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16
  },
  subjectHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  subjectTitleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B"
  },
  subjectSubText: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 2
  },
  // Checklist Elements Layout
  chaptersListBlock: {
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  innerAccordionDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 12
  },
  chapterItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12
  },
  checkboxCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  chapterNameText: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "500",
    flex: 1
  },
  completedChapterText: {
    color: "#94A3B8",
    textDecorationLine: "line-through" // Strikes layout items on true values
  }
});