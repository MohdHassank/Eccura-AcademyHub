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
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ================= TYPESCRIPT INTERFACES =================
interface AssignmentItem {
    id: string;
    title: string;
    subject: "Physics" | "Chemistry" | "Mathematics" | "Computer Science";
    topic: string;
    faculty: string;
    dueDate: string;
    status: "Pending" | "Submitted";
    marksWeightage: string;
}

type TabType = "Pending" | "Submitted";

// ================= DUMMY ACADEMIC DATA =================
const DUMMY_ASSIGNMENTS: AssignmentItem[] = [
    {
        id: "a1",
        title: "Gauss Law & Electric Potential Problems",
        subject: "Physics",
        topic: "Electrostatics Tutorial 2",
        faculty: "Dr. Alok Rai",
        dueDate: "24 June 2026",
        status: "Pending",
        marksWeightage: "10% of Internal Assessment"
    },
    {
        id: "a2",
        title: "Mechanism of Nucleophilic Substitution",
        subject: "Chemistry",
        topic: "Organic Chemistry Sheet 1",
        faculty: "Prof. S. Sharma",
        dueDate: "20 June 2026",
        status: "Pending",
        marksWeightage: "5% of Internal Assessment"
    },
    {
        id: "a3",
        title: "Fourier Series & Periodic Functions Expansion",
        subject: "Mathematics",
        topic: "Advanced Calculus Assignment",
        faculty: "Dr. Amit Verma",
        dueDate: "28 June 2026",
        status: "Pending",
        marksWeightage: "15% of Internal Assessment"
    },
    {
        id: "a4",
        title: "Stack & Queue Implementation in C++",
        subject: "Computer Science",
        topic: "Data Structures Lab Practical 3",
        faculty: "Er. Nishant Kapri",
        dueDate: "14 June 2026",
        status: "Submitted",
        marksWeightage: "Grade A Awarded"
    },
    {
        id: "a5",
        title: "Dijkstra's Shortest Path Matrix Optimization",
        subject: "Computer Science",
        topic: "Algorithm Analysis Task 1",
        faculty: "Er. Nishant Kapri",
        dueDate: "11 June 2026",
        status: "Submitted",
        marksWeightage: "Grade A+ Awarded"
    }
];

export default function AssignmentsScreen() {
    const router = useRouter();

    // State Management
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeTab, setActiveTab] = useState<TabType>("Pending");
    const [filteredData, setFilteredData] = useState<AssignmentItem[]>(DUMMY_ASSIGNMENTS);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Simulate Premium Skeleton Loading State
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800); // Quick smooth layout render block
        return () => clearTimeout(timer);
    }, [activeTab]);

    // Sync Search & Tab filtering logic matrix
    useEffect(() => {
        let result = DUMMY_ASSIGNMENTS.filter((item) => item.status === activeTab);

        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.subject.toLowerCase().includes(query) ||
                    item.topic.toLowerCase().includes(query)
            );
        }

        setFilteredData(result);
    }, [searchQuery, activeTab]);

    const handleSubmitAction = (title: string) => {
        Alert.alert(
            "Submit Assignment 📤",
            `Would you like to attach file/PDF and upload your solution for:\n"${title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Upload File", onPress: () => Alert.alert("Success 🎉", "Assignment solution pushed safely to secure server canvas.") }
            ]
        );
    };

    const handleReviewAction = (title: string) => {
        Alert.alert("Submission History 📄", `Opening signed portal log and evaluations for:\n"${title}"`);
    };

    // Helper aesthetic mapper for subject theme badges
    const getSubjectStyle = (subject: AssignmentItem["subject"]) => {
        switch (subject) {
            case "Physics": return { bg: "#EFF6FF", text: "#2563EB", icon: "atom" };
            case "Chemistry": return { bg: "#ECFDF5", text: "#10B981", icon: "flask" };
            case "Mathematics": return { bg: "#F5F3FF", text: "#7C3AED", icon: "calculator" };
            case "Computer Science": return { bg: "#FFF7ED", text: "#EA580C", icon: "laptop-code" };
            default: return { bg: "#F8FAFC", text: "#64748B", icon: "file-alt" };
        }
    };

    // ================= SKELETON LOADER CARD =================
    const renderSkeletonCard = () => (
        <View style={styles.skeletonCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.skeletonBadge} />
                <View style={[styles.skeletonLine, { width: "20%" }]} />
            </View>
            <View style={[styles.skeletonLine, { width: "85%", marginTop: 15 }]} />
            <View style={[styles.skeletonLine, { width: "50%", marginTop: 10, height: 12 }]} />
            <View style={styles.skeletonFooterRow}>
                <View style={[styles.skeletonLine, { width: "30%", height: 12 }]} />
                <View style={[styles.skeletonButton, { width: 110, height: 34 }]} />
            </View>
        </View>
    );

    // ================= REAL DATA ASSIGNMENT CARD =================
    const renderAssignmentCard = ({ item }: { item: AssignmentItem }) => {
        const meta = getSubjectStyle(item.subject);
        const isPending = item.status === "Pending";

        return (
            <View style={styles.assignmentCard}>
                {/* Top Meta header info */}
                <View style={styles.cardHeader}>
                    <View style={[styles.badgeContainer, { backgroundColor: meta.bg }]}>
                        <FontAwesome5 name={meta.icon} size={10} color={meta.text} style={{ marginRight: 6 }} />
                        <Text style={[styles.badgeText, { color: meta.text }]}>{item.subject}</Text>
                    </View>
                    <Text style={styles.weightageText}>{item.marksWeightage}</Text>
                </View>

                {/* Primary Text Content details */}
                <Text style={styles.assignmentTitle}>{item.title}</Text>
                <Text style={styles.assignmentTopic}>Topic: {item.topic}</Text>

                <View style={styles.metaInfoRow}>
                    <View style={styles.metaSubItem}>
                        <Feather name="user" size={12} color="#94A3B8" style={{ marginRight: 4 }} />
                        <Text style={styles.metaItemText}>{item.faculty}</Text>
                    </View>

                    <View style={styles.metaSubItem}>
                        <Feather name="clock" size={12} color={isPending ? "#EF4444" : "#10B981"} style={{ marginRight: 4 }} />
                        <Text style={[styles.metaItemText, isPending && { color: "#EF4444", fontWeight: "600" }]}>
                            {isPending ? `Due: ${item.dueDate}` : "Submitted"}
                        </Text>
                    </View>
                </View>

                {/* Divider Layout component */}
                <View style={styles.cardDivider} />

                {/* Footer dynamic button actions gateway */}
                <View style={styles.cardFooter}>
                    {isPending ? (
                        <>
                            <Text style={styles.statusWarnText}>⚠️ Action Required</Text>
                            <TouchableOpacity
                                style={styles.actionBtnSubmit}
                                onPress={() => handleSubmitAction(item.title)}
                                activeOpacity={0.8}
                            >
                                <Feather name="upload-cloud" size={14} color="#FFFFFF" style={{ marginRight: 5 }} />
                                <Text style={styles.actionBtnSubmitText}>Submit Now</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.successBadgeRow}>
                                <Ionicons name="checkmark-done-circle" size={16} color="#10B981" />
                                <Text style={styles.successBadgeText}>Handed In</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.actionBtnReview}
                                onPress={() => handleReviewAction(item.title)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.actionBtnReviewText}>View Work</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ================= HEADER OVERVIEW ARCHITECTURE ================= */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
                    <Feather name="arrow-left" size={20} color="#1E293B" />
                </TouchableOpacity>
                <View style={styles.headerTitleContext}>
                    <Text style={styles.headerTitle}>Assignments</Text>
                    <Text style={styles.headerSubtitle}>Track and submit your academic milestones</Text>
                </View>
            </View>

            {/* ================= MODERN SEGMENTED TOGGLE TABS ================= */}
            <View style={styles.tabContainerWrapper}>
                <View style={styles.tabBarSegmented}>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === "Pending" && styles.activeTabButton]}
                        onPress={() => setActiveTab("Pending")}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabButtonText, activeTab === "Pending" && styles.activeTabButtonText]}>
                            Pending Task
                        </Text>
                    </TouchableOpacity> {/* 👈 Sahi tag close kiya */}

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === "Submitted" && styles.activeTabButton]}
                        onPress={() => setActiveTab("Submitted")}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.tabButtonText, activeTab === "Submitted" && styles.activeTabButtonText]}>
                            Submitted ({DUMMY_ASSIGNMENTS.filter(a => a.status === "Submitted").length})
                        </Text>
                    </TouchableOpacity> {/* 👈 Sahi tag close kiya */}

                </View>
            </View>

            {/* ================= LIVE FILTER BAR BOX ================= */}
            <View style={styles.searchBoxWrapper}>
                <View style={styles.searchBar}>
                    <Feather name="search" size={16} color="#94A3B8" style={{ marginRight: 8 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search assignments by topic or title..."
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCorrect={false}
                    />
                </View>
            </View>

            {/* ================= MAIN CONTAINER CONDITIONAL MATRICES ================= */}
            {isLoading ? (
                <FlatList
                    data={[1, 2]}
                    keyExtractor={(item) => item.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={renderSkeletonCard}
                />
            ) : filteredData.length === 0 ? (
                // Clean Premium Empty State block 
                <View style={styles.emptyStateContainer}>
                    <View style={styles.emptyIconCircle}>
                        <Feather name="clipboard" size={36} color="#94A3B8" />
                    </View>
                    <Text style={styles.emptyStateTitle}>All Caught Up!</Text>
                    <Text style={styles.emptyStateDesc}>
                        No assignments found inside the "{activeTab}" canvas segment framework. Keep up the high efficiency learning journey!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAssignmentCard}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}

// ================= ARCHITECTURAL LAYOUT & PREMIUM STYLESHEET =================
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
    // Segmented Tabs Styling
    tabContainerWrapper: {
        paddingHorizontal: 20,
        marginVertical: 10
    },
    tabBarSegmented: {
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        padding: 4,
        borderRadius: 14
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    activeTabButton: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2
    },
    tabButtonText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748B"
    },
    activeTabButtonText: {
        color: "#2563EB"
    },
    // Search Box Layout Specs
    searchBoxWrapper: {
        paddingHorizontal: 20,
        marginBottom: 15
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
    // Primary Feed List Elements
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        gap: 16
    },
    assignmentCard: {
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
    weightageText: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "600",
        backgroundColor: "#F8FAFC",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#F1F5F9"
    },
    assignmentTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
        lineHeight: 20
    },
    assignmentTopic: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 4,
        fontWeight: "500"
    },
    metaInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        gap: 16
    },
    metaSubItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    metaItemText: {
        fontSize: 12,
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
    statusWarnText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#EF4444"
    },
    actionBtnSubmit: {
        flexDirection: "row",
        backgroundColor: "#2563EB",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: "center"
    },
    actionBtnSubmitText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600"
    },
    successBadgeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    successBadgeText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#10B981"
    },
    actionBtnReview: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10
    },
    actionBtnReviewText: {
        color: "#1E293B",
        fontSize: 12,
        fontWeight: "600"
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
    // Skeleton Frame Layout Styles
    skeletonCard: {
        backgroundColor: "#FFFFFF",
        borderColor: "#F1F5F9",
        borderWidth: 1,
        borderRadius: 20,
        padding: 18,
        opacity: 0.7
    },
    skeletonBadge: {
        width: 75,
        height: 18,
        backgroundColor: "#E2E8F0",
        borderRadius: 6
    },
    skeletonLine: {
        height: 14,
        backgroundColor: "#E2E8F0",
        borderRadius: 4
    },
    skeletonFooterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 14,
        borderTopWidth: 1,
        borderColor: "#F1F5F9",
        paddingTop: 12
    },
    skeletonButton: {
        backgroundColor: "#E2E8F0",
        borderRadius: 10
    }
});