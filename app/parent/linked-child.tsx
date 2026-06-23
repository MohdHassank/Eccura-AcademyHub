import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    ActivityIndicator,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// TypeScript Interface definitions
interface Student {
    id: number;
    fullName: string;
    class_name: string;
}

// Mock Database Structure 

export default function LinkedChildScreen() {
    const router = useRouter();

    // Component internal dynamic UI states
    const [selectedChildId, setSelectedChildId] =
useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [childrenList, setChildrenList] = useState<Student[]>([]);

    // Handle final redirect logic when pressing the continue layout action button
    const handleContinue = async () => {
        if (!selectedChildId) return;

        // Save or update global context here if needed, then pass selected configuration onwards
        await AsyncStorage.setItem(
            "selectedChildId",
            selectedChildId!.toString()
            
        );

        router.replace("/parent/home");
    };
    useEffect(() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
  try {

    setIsLoading(true);

    const userString = await AsyncStorage.getItem("user");

    if (!userString) return;

    const user = JSON.parse(userString);

    const response = await axios.get(
      `http://192.168.29.49:5000/api/parent/children/${user.id}`
    );

    setChildrenList(response.data.children);

  } catch (error) {

    console.log("Children Error:", error);

  } finally {

    setIsLoading(false);

  }
};
    

    // Render individual child card
    const renderChildCard = ({ item }: { item: Student }) => {
        const isSelected = selectedChildId === item.id;

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedChildId(item.id)}
                style={[
                    styles.studentCard,
                    isSelected && styles.studentCardSelected
                ]}
            >
                <View style={styles.cardLeftContent}>
                    <Image
  source={{
    uri: "https://ui-avatars.com/api/?name=" + item.fullName
  }}
  style={styles.avatarImage}
/>
                    <View style={styles.studentInfoBlock}>
                        <Text style={styles.studentNameText}>{item.fullName}</Text>
                        <Text style={styles.studentMetaText}>{item.class_name}</Text>

                        <View style={styles.badgeRowGrid}>
                            {/* <View style={styles.metaBadge}>
                                <Text style={styles.metaBadgeText}>Roll No: {item.rollNumber}</Text>
                            </View> */}
                            <View style={[styles.metaBadge, { backgroundColor: "#EEF2FF" }]}>
                                {/* <Text style={[styles.metaBadgeText, { color: "#4F46E5" }]}>
                                    {item.subjectCount} Subjects
                                </Text> */}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={[styles.radioOuterCircle, isSelected && styles.radioOuterCircleSelected]}>
                    {isSelected && <View style={styles.radioInnerCircle} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {/* ================= HEADER SUBTITLE INFOBAR ================= */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitleText}>Choose Your Child</Text>
                <Text style={styles.headerSubtitleText}>
                    Select a child to view academic progress, attendance and performance metrics.
                </Text>
            </View>

            {/* ================= CONDITIONAL MAIN APP CONTENT TRACKS ================= */}
            {isLoading ? (
                <View style={styles.centerStateContainer}>
                    <ActivityIndicator size="large" color="#1A365D" />
                    <Text style={styles.stateFeedbackText}>Fetching linked records...</Text>
                </View>
            ) : childrenList.length === 0 ? (
                <View style={styles.centerStateContainer}>
                    <View style={styles.emptyIconCircle}>
                        <MaterialCommunityIcons name="account-child-outline" size={48} color="#94A3B8" />
                    </View>
                    <Text style={styles.emptyStateTitle}>No linked child found</Text>
                    <Text style={styles.emptyStateSub}>
                        Please contact the administration center to link your student profile profile with this phone record.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={childrenList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderChildCard}
                    contentContainerStyle={styles.listContentPadding}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* ================= BOTTOM ACTION SHELF FOOTER ================= */}
            {childrenList.length > 0 && (
                <View style={styles.footerStickyActionBox}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={!selectedChildId}
                        onPress={handleContinue}
                        style={[
                            styles.continueButton,
                            !selectedChildId && styles.continueButtonDisabled
                        ]}
                    >
                        <Text style={styles.continueButtonText}>Continue</Text>
                        <Feather name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
                    </TouchableOpacity>

                    {/* Diagnostic Controls: Used to test alternative layout scenarios safely */}
                    {/* <View style={styles.diagnosticControlRow}>
                        <TouchableOpacity onPress={() => setChildrenList(childrenList.length ? [] : LINKED_CHILDREN_DATA)}>
                            <Text style={styles.diagnosticText}>Toggle Empty State</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#CBD5E1' }}>|</Text>
                        <TouchableOpacity onPress={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 1500); }}>
                            <Text style={styles.diagnosticText}>Trigger Loading State</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            )}
        </SafeAreaView>
    );
}

// ==========================================
// STYLESHEET ARCHITECTURE (PREMIUM CLEAN DESIGN)
// ==========================================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFD", // Modern clean canvas tint
    },
    headerContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
    },
    headerTitleText: {
        fontSize: 26,
        fontWeight: "800",
        color: "#1A365D", // Premium dark corporate blue
        letterSpacing: -0.5,
    },
    headerSubtitleText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#718096", // Soft text grey layout
        marginTop: 6,
        lineHeight: 20,
    },
    listContentPadding: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 120, // Prevents overflow truncation near sticky container
    },

    // Student Component Card Matrix Styles
    studentCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...Platform.select({
            ios: {
                shadowColor: "#0F172A",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.03,
                shadowRadius: 10,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    studentCardSelected: {
        borderColor: "#3182CE",
        backgroundColor: "#F0F7FF",
        ...Platform.select({
            ios: {
                shadowColor: "#3182CE",
                shadowOpacity: 0.06,
                shadowRadius: 12,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    cardLeftContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    avatarImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#E2E8F0",
    },
    studentInfoBlock: {
        marginLeft: 14,
        flex: 1,
    },
    studentNameText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A365D",
    },
    studentMetaText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#718096",
        marginTop: 2,
    },
    badgeRowGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        marginTop: 8,
    },
    metaBadge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    metaBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#475569",
    },

    // Selection Radio Indicators
    radioOuterCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#CBD5E1",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 12,
    },
    radioOuterCircleSelected: {
        borderColor: "#3182CE",
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#3182CE",
    },

    // Fixed Footer Interactive Structural Blocks
    footerStickyActionBox: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FAFAFD",
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: Platform.OS === "ios" ? 28 : 16,
        borderTopWidth: 1,
        borderColor: "#F1F5F9",
    },
    continueButton: {
        backgroundColor: "#1A365D",
        height: 54,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#1A365D",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    continueButtonDisabled: {
        backgroundColor: "#CBD5E1",
        shadowOpacity: 0,
        elevation: 0,
    },
    continueButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.2,
    },

    // State Management Placeholder Outlines
    centerStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        paddingBottom: 100,
    },
    stateFeedbackText: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: "600",
        color: "#718096",
    },
    emptyIconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: "#F1F5F9",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A365D",
        textAlign: "center",
    },
    emptyStateSub: {
        fontSize: 13,
        fontWeight: "500",
        color: "#94A3B8",
        textAlign: "center",
        marginTop: 6,
        lineHeight: 18,
    },
    diagnosticControlRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 14,
    },
    diagnosticText: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '600',
        textDecorationLine: 'underline',
    }
});