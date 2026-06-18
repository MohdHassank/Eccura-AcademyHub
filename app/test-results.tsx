import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from "react-native";
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// ================= TYPESCRIPT INTERFACES =================
interface SectionScore {
    subject: string;
    totalQuestions: number;
    attempted: number;
    correct: number;
    wrong: number;
    score: number;
    maxScore: number;
}

interface TestResultData {
    id: number;
    studentId: number;

    testName: string;

    score: number;
    totalMarks: number;

    rankPosition: number;
    totalStudents: number;

    percentile: number;
    accuracy: number;

    totalCorrect: number;
    totalIncorrect: number;
    totalAttempted: number;

    timeTaken: string;

    physicsMarks: number;
    chemistryMarks: number;
    mathematicsMarks: number;
}

export default function TestResultScreen() {
    const router = useRouter();

    // Simulated State for Test Result (Replace with API fetch later)
    const [resultData, setResultData] = useState<TestResultData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Simulated API Fetch
    useEffect(() => {
        fetchResult();
    }, []);

    const fetchResult = async () => {
        try {

            const response = await axios.get(
                "http://192.168.29.49:5000/api/student/testResults/3"
            );

            console.log("TEST RESULT API:", response.data);

            if (
                response.data.success &&
                response.data.results.length > 0
            ) {
                setResultData(response.data.results[0]);
            }

        } catch (error) {

            console.log("Test Result Error:", error);

        } finally {

            setIsLoading(false);

        }
    };

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return "#10B981"; // Green - Excellent
        if (percentage >= 50) return "#F59E0B"; // Orange - Average
        return "#EF4444"; // Red - Needs Improvement
    };

    const calculatePercentage = (obtained: number, total: number) => {
        return Math.round((obtained / total) * 100);
    };

    if (isLoading || !resultData) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <MaterialCommunityIcons name="chart-arc" size={40} color="#2563EB" style={{ opacity: 0.5 }} />
                <Text style={{ marginTop: 12, color: "#64748B", fontWeight: "500" }}>Analyzing Performance...</Text>
            </SafeAreaView>
        );
    }

    const overallPercentage =
        calculatePercentage(
            resultData.score,
            resultData.totalMarks
        );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* ================= HEADER SECTION ================= */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
                    <Feather name="arrow-left" size={20} color="#1E293B" />
                </TouchableOpacity>
                <View style={styles.headerTitleContext}>
                    <Text style={styles.headerTitle}>Performance Report</Text>
                    <Text style={styles.headerSubtitle}>{resultData.testName}</Text>
                </View>
                <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                    <Feather name="share-2" size={18} color="#2563EB" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* ================= PRIMARY SCORE CARD ================= */}
                <View style={styles.mainScoreCard}>
                    <View style={styles.scoreCircleWrapper}>
                        {/* Simple CSS-based Circular Representation */}
                        <View style={[styles.scoreCircle, { borderColor: getScoreColor(overallPercentage) }]}>
                            <Text style={styles.obtainedMarksText}>{resultData.score}</Text>
                            <Text style={styles.totalMarksDivider}>/ {resultData.totalMarks}</Text>
                        </View>
                    </View>

                    <View style={styles.scoreDetailsWrapper}>
                        <View style={styles.rankBadge}>
                            <FontAwesome5 name="trophy" size={12} color="#F59E0B" />
                            <Text style={styles.rankText}>{`#${resultData.rankPosition} / ${resultData.totalStudents}`}</Text>
                        </View>

                        <View style={styles.quickStatRow}>
                            <View style={styles.quickStatItem}>
                                <Text style={styles.quickStatLabel}>Percentile</Text>
                                <Text style={styles.quickStatValue}>{`${resultData.percentile}%`}</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.quickStatItem}>
                                <Text style={styles.quickStatLabel}>Accuracy</Text>
                                <Text style={[styles.quickStatValue, { color: "#10B981" }]}>{`${resultData.accuracy}%`}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ================= KEY METRICS GRID ================= */}
                <Text style={styles.sectionHeader}>Insight Overview</Text>
                <View style={styles.metricsGrid}>
                    <View style={styles.metricCard}>
                        <View style={[styles.metricIconBox, { backgroundColor: "#EFF6FF" }]}>
                            <Feather name="check-circle" size={18} color="#2563EB" />
                        </View>
                        <View>
                            <Text style={styles.metricLabel}>Total Correct</Text>
                            <Text style={styles.metricValue}>
                                {resultData.totalCorrect} Qs
                            </Text>
                        </View>
                    </View>

                    <View style={styles.metricCard}>
                        <View style={[styles.metricIconBox, { backgroundColor: "#FEF2F2" }]}>
                            <Feather name="x-circle" size={18} color="#EF4444" />
                        </View>
                        <View>
                            <Text style={styles.metricLabel}>Total Incorrect</Text>
                            <Text style={styles.metricValue}>
                                {resultData.totalIncorrect} Qs
                            </Text>
                        </View>
                    </View>

                    <View style={styles.metricCard}>
                        <View style={[styles.metricIconBox, { backgroundColor: "#F5F3FF" }]}>
                            <Feather name="clock" size={18} color="#7C3AED" />
                        </View>
                        <View>
                            <Text style={styles.metricLabel}>Time Taken</Text>
                            <Text style={styles.metricValue}>{resultData.timeTaken}</Text>
                        </View>
                    </View>

                    <View style={styles.metricCard}>
                        <View style={[styles.metricIconBox, { backgroundColor: "#FFFBEB" }]}>
                            <Feather name="bar-chart-2" size={18} color="#D97706" />
                        </View>
                        <View>
                            <Text style={styles.metricLabel}>Total Attempted</Text>
                            <Text style={styles.metricValue}>
                                {resultData.totalCorrect} Correct
                                {resultData.totalIncorrect} Incorrect
                                {resultData.totalAttempted} Total
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ================= SUBJECT-WISE BREAKDOWN ================= */}
                <Text style={styles.sectionHeader}>Subject Breakdown</Text>

                <View style={styles.subjectCard}>
                    <View style={styles.subjectCardHeader}>
                        <Text style={styles.subjectName}>Physics</Text>
                        <Text style={styles.subjectScore}>
                            {resultData.physicsMarks}
                            <Text style={{ color: "#94A3B8", fontSize: 12 }}> / 100</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.subjectCard}>
                    <View style={styles.subjectCardHeader}>
                        <Text style={styles.subjectName}>Chemistry</Text>
                        <Text style={styles.subjectScore}>
                            {resultData.chemistryMarks}
                            <Text style={{ color: "#94A3B8", fontSize: 12 }}> / 100</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.subjectCard}>
                    <View style={styles.subjectCardHeader}>
                        <Text style={styles.subjectName}>Mathematics</Text>
                        <Text style={styles.subjectScore}>
                            {resultData.mathematicsMarks}
                            <Text style={{ color: "#94A3B8", fontSize: 12 }}> / 100</Text>
                        </Text>
                    </View>
                </View>

                {/* ================= ACTION BUTTONS ================= */}
                <View style={styles.footerActions}>
                    <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
                        <Feather name="file-text" size={16} color="#475569" style={{ marginRight: 8 }} />
                        <Text style={styles.secondaryBtnText}>View Solutions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                        <Text style={styles.primaryBtnText}>Detailed Analytics</Text>
                        <Feather name="chevron-right" size={16} color="#FFFFFF" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

// ================= STYLES =================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC", // Light premium background
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitleContext: {
        flex: 1,
        marginLeft: 14,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1E293B",
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 2,
    },
    shareButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#EFF6FF",
        justifyContent: "center",
        alignItems: "center",
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    // Main Score Card
    mainScoreCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 24,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 24,
    },
    scoreCircleWrapper: {
        marginRight: 20,
    },
    scoreCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    obtainedMarksText: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1E293B",
        lineHeight: 32,
    },
    totalMarksDivider: {
        fontSize: 12,
        color: "#94A3B8",
        fontWeight: "600",
    },
    scoreDetailsWrapper: {
        flex: 1,
    },
    rankBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFBEB",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginBottom: 16,
    },
    rankText: {
        color: "#D97706",
        fontWeight: "700",
        fontSize: 14,
        marginLeft: 6,
    },
    quickStatRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    quickStatItem: {
        flex: 1,
    },
    quickStatLabel: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "500",
        marginBottom: 4,
    },
    quickStatValue: {
        fontSize: 18,
        fontWeight: "800",
        color: "#1E293B",
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#E2E8F0",
        marginHorizontal: 15,
    },
    // Metrics Grid
    sectionHeader: {
        fontSize: 17,
        fontWeight: "800",
        color: "#1E293B",
        marginBottom: 16,
    },
    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    metricCard: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 1,
    },
    metricIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    metricLabel: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "500",
    },
    metricValue: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1E293B",
        marginTop: 2,
    },
    // Subject Card
    subjectCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    subjectCardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    subjectName: {
        fontSize: 15,
        fontWeight: "700",
        color: "#334155",
    },
    subjectScore: {
        fontSize: 16,
        fontWeight: "800",
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: "#F1F5F9",
        borderRadius: 3,
        marginBottom: 14,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        borderRadius: 3,
    },
    subjectDetailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F8FAFC",
        padding: 10,
        borderRadius: 10,
    },
    subDetailItem: {
        alignItems: "center",
        flex: 1,
    },
    subDetailLabel: {
        fontSize: 10,
        color: "#64748B",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    subDetailValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#334155",
        marginTop: 4,
    },
    // Footer Actions
    footerActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 12,
    },
    secondaryButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F1F5F9",
        paddingVertical: 14,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    secondaryBtnText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#475569",
    },
    primaryButton: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryBtnText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});
