import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    TextInput,
    Alert,
    TouchableOpacity,
    Dimensions,
    Platform,
    LayoutAnimation,
    UIManager,
    Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

// Enable LayoutAnimation for Android to handle smooth accordion opening transitions
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// TypeScript Interfaces
interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        id: "faq_1",
        question: "How can I check fee payment status?",
        answer: "Navigate to the 'Fee Structure' widget from your central home dashboard. Click into history tracking to check receipts and pending transactions.",
    },
    {
        id: "faq_2",
        question: "How can I view my child's academic performance?",
        answer: "Open your student dynamic portal page to see live metrics, grade configurations, subject performance scales, and dynamic classroom reports.",
    },
    {
        id: "faq_3",
        question: "How do I update my account information?",
        answer: "Go to your parent profile account configuration page under app settings to update phone listings, personal information, or address records directly.",
    },
];

export default function ContactSupportScreen() {
    const router = useRouter();
    const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
    const [ticketModalVisible, setTicketModalVisible] =
        useState(false);

    const [ticketTitle, setTicketTitle] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [supportConfig, setSupportConfig] = useState<any>(null);

    const toggleFaq = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedFaqId(expandedFaqId === id ? null : id);
    };

    const handleCreateTicket = () => {

        setTicketModalVisible(true);

    };

    const submitTicket = async () => {

        try {

            if (!ticketTitle || !ticketDescription) {

                Alert.alert(
                    "Required",
                    "Please fill all fields"
                );

                return;
            }

            setLoading(true);

            const userString =
                await AsyncStorage.getItem("user");

            if (!userString) return;

            const user = JSON.parse(userString);

            const response = await axios.post(
                "http://192.168.29.49:5000/api/support/create",
                {
                    parentId: user.id,
                    title: ticketTitle,
                    description: ticketDescription
                }
            );

            if (response.data.success) {

                Alert.alert(
                    "Success",
                    "Support ticket created"
                );

                setTicketTitle("");
                setTicketDescription("");

                setTicketModalVisible(false);
            }

        } catch (error) {

            console.log(error);

            Alert.alert(
                "Error",
                "Ticket creation failed"
            );

        } finally {

            setLoading(false);

        }
    };

    const fetchSupportConfig = async () => {

        try {

            const response = await axios.get(
                "http://192.168.29.49:5000/api/support/config"
            );

            if (response.data.success) {

                setSupportConfig(
                    response.data.config
                );

            }

        } catch (error) {

            console.log(error);

        }
        console.log("Support Config", supportConfig);

    };

    useEffect(() => {

        fetchSupportConfig();

    }, []);

    return (
        <SafeAreaView style={styles.screenCanvasContainer} edges={["top", "left", "right"]}>
            <StatusBar style="dark" />

            {/* ================= FIXED TOP HEADER BAR ================= */}
            <View style={styles.headerNavigationBar}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.back()}
                    style={styles.backIconButton}
                >
                    <Feather name="arrow-left" size={20} color="#1A365D" />
                </TouchableOpacity>
                <View style={styles.headerTextStackTitleWrapper}>
                    <Text style={styles.headerMainTitleText}>Contact Support</Text>
                    <Text style={styles.headerSubtextInfoLabel}>Get help from AcademyHub support team</Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollFrameContentContainer}
            >
                {/* ================= QUICK HELP CARD BLOCK ================= */}
                <View style={styles.quickHelpIdentityCard}>
                    <View style={styles.circularIllustrationBadge}>
                        <MaterialCommunityIcons name="face-agent" size={32} color="#3182CE" />
                    </View>
                    <View style={styles.quickHelpTextContent}>
                        <Text style={styles.quickHelpTitle}>Need assistance?</Text>
                        <Text style={styles.quickHelpDescription}>
                            Our support team is available to help with academic, fee and account related issues.
                        </Text>
                    </View>
                </View>

                {/* ================= SUPPORT CHANNEL ACTION TRACKS ================= */}
                <Text style={styles.sectionGroupingLabelText}>Support Options</Text>
                <View style={styles.optionsWrapperStack}>

                    {/* Channel 1: Raise Support Ticket */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleCreateTicket}
                        style={styles.channelInteractiveRowCard}
                    >
                        <View style={[styles.channelIconBox, { backgroundColor: "#EBF8FF" }]}>
                            <Feather name="file-text" size={18} color="#3182CE" />
                        </View>
                        <View style={styles.channelMiddleTextBlock}>
                            <Text style={styles.channelTitleMainText}>Raise Support Ticket</Text>
                            <Text style={styles.channelDescriptionSubText}>Create a support request and track its status.</Text>
                        </View>
                        <Feather name="chevron-right" size={16} color="#A0AEC0" />
                    </TouchableOpacity>

                    {/* Channel 2: Call Support Desk */}
                    <TouchableOpacity activeOpacity={0.8} style={styles.channelInteractiveRowCard} onPress={() => {

                        Alert.alert(
                            "Call Support",
                            "Do you want to call AcademyHub Support?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "Call",
                                    onPress: () => {
                                        Linking.openURL(
                                            `tel:${supportConfig?.supportPhone}`
                                        );
                                    }
                                }
                            ]
                        );

                    }}>
                        <View style={[styles.channelIconBox, { backgroundColor: "#E6F4EA" }]}>
                            <Feather name="phone" size={18} color="#38A169" />
                        </View>
                        <View style={styles.channelMiddleTextBlock}>
                            <Text style={styles.channelTitleMainText}>Call Support</Text>
                            <Text style={styles.channelDescriptionSubText}>Connect directly with AcademyHub help desk.</Text>
                        </View>
                        <Feather name="chevron-right" size={16} color="#A0AEC0" />
                    </TouchableOpacity>

                    {/* Channel 3: Email Help Desk */}
                    <TouchableOpacity activeOpacity={0.8} style={styles.channelInteractiveRowCard} onPress={() => {

                        Alert.alert(
                            "Email Support",
                            "Open your email app?",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "Email",
                                    onPress: () => {

                                        console.log(
                                            "Email:",
                                            supportConfig?.supportEmail
                                        );

                                        Linking.openURL(
                                            `mailto:${supportConfig?.supportEmail}?subject=AcademyHub Support`
                                        );

                                    }
                                }
                            ]
                        );

                    }}>
                        <View style={[styles.channelIconBox, { backgroundColor: "#F5F3FF" }]}>
                            <Feather name="mail" size={18} color="#64748B" />
                        </View>
                        <View style={styles.channelMiddleTextBlock}>
                            <Text style={styles.channelTitleMainText}>Email Support</Text>
                            <Text style={styles.channelDescriptionSubText}>Send detailed queries to our support team.</Text>
                        </View>
                        <Feather name="chevron-right" size={16} color="#A0AEC0" />
                    </TouchableOpacity>

                </View>

                {/* ================= ACCORDION FAQ SYSTEM BLOCK ================= */}
                <Text style={styles.sectionGroupingLabelText}>Frequently Asked Questions</Text>
                <View style={styles.faqStackWrapperBox}>
                    {FAQ_DATA.map((faq) => {
                        const isExpanded = expandedFaqId === faq.id;
                        return (
                            <View key={faq.id} style={styles.faqAccordionItemBox}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => toggleFaq(faq.id)}
                                    style={styles.faqHeaderInteractiveClickTrack}
                                >
                                    <Text style={styles.faqQuestionText}>{faq.question}</Text>
                                    <Feather
                                        name={isExpanded ? "chevron-up" : "chevron-down"}
                                        size={16}
                                        color="#718096"
                                    />
                                </TouchableOpacity>
                                {isExpanded && (
                                    <View style={styles.faqExpandedContentTextContainer}>
                                        <Text style={styles.faqAnswerTextContent}>{faq.answer}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>

                {/* ================= EMERGENCY SYSTEM OPERATIONAL WINDOW CARD ================= */}
                <View style={styles.emergencyOperationalWindowCard}>
                    <View style={styles.emergencyLeftDecorWrapper}>
                        <Feather name="clock" size={16} color="#3182CE" />
                        <Text style={styles.operationalWindowMainTitle}>Support Hours</Text>
                    </View>
                    <View style={styles.operationalTimingsColumnStack}>
                        <Text style={styles.timingDayRangeLabelText}>{supportConfig?.supportHours}</Text>
                        {/* <Text style={styles.timingHourValuesLabelText}>9:00 AM - 6:00 PM</Text> */}
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={ticketModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "center",
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#FFF",
                            borderRadius: 20,
                            padding: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                marginBottom: 15,
                            }}
                        >
                            Create Support Ticket
                        </Text>

                        <TextInput
                            placeholder="Issue Title"
                            value={ticketTitle}
                            onChangeText={setTicketTitle}
                            style={{
                                borderWidth: 1,
                                borderColor: "#E2E8F0",
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 12,
                            }}
                        />

                        <TextInput
                            placeholder="Describe your issue"
                            value={ticketDescription}
                            onChangeText={setTicketDescription}
                            multiline
                            numberOfLines={4}
                            style={{
                                borderWidth: 1,
                                borderColor: "#E2E8F0",
                                borderRadius: 12,
                                padding: 12,
                                height: 120,
                                textAlignVertical: "top",
                            }}
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 20,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => setTicketModalVisible(false)}
                            >
                                <Text
                                    style={{
                                        color: "#EF4444",
                                        fontWeight: "600",
                                    }}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={submitTicket}
                            >
                                <Text
                                    style={{
                                        color: "#2563EB",
                                        fontWeight: "700",
                                    }}
                                >
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* ================= FIXED STICKY ACTION FOOTER CONTROL ================= */}
            <View style={styles.stickyFooterFixedButtonFrameContainer}>
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleCreateTicket}
                    style={styles.primaryActionButtonSubmitState}
                >
                    <Feather name="plus-circle" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.primaryActionTextContent}>Create Support Ticket</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// ==========================================
// CLEAN TYPOGRAPHY LAYOUT ARCHITECTURE STYLE
// ==========================================
const styles = StyleSheet.create({
    screenCanvasContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF", // Premium crisp white backdrop asset canvas
    },
    headerNavigationBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
        backgroundColor: "#FFFFFF",
    },
    backIconButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: "#FAFAFD",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    headerTextStackTitleWrapper: {
        marginLeft: 14,
        flex: 1,
    },
    headerMainTitleText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A365D", // Core AcademyHub Signature Blue
        letterSpacing: -0.3,
    },
    headerSubtextInfoLabel: {
        fontSize: 12.5,
        fontWeight: "500",
        color: "#718096",
        marginTop: 1,
    },
    scrollFrameContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 110, // Safeguards scrolling views above sticky structural bounds
    },
    quickHelpIdentityCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAFAFD",
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        marginBottom: 24,
    },
    circularIllustrationBadge: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#EBF8FF",
    },
    quickHelpTextContent: {
        flex: 1,
        marginLeft: 14,
    },
    quickHelpTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#1A365D",
        marginBottom: 2,
    },
    quickHelpDescription: {
        fontSize: 12.5,
        fontWeight: "500",
        color: "#718096",
        lineHeight: 18,
    },
    sectionGroupingLabelText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#718096",
        textTransform: "uppercase",
        letterSpacing: 0.6,
        marginBottom: 12,
        paddingLeft: 2,
    },
    optionsWrapperStack: {
        gap: 10,
        marginBottom: 24,
    },
    channelInteractiveRowCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        ...Platform.select({
            ios: {
                shadowColor: "#1A365D",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.02,
                shadowRadius: 8,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    channelIconBox: {
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    channelMiddleTextBlock: {
        flex: 1,
        marginLeft: 12,
        paddingRight: 8,
    },
    channelTitleMainText: {
        fontSize: 14.5,
        fontWeight: "600",
        color: "#1A365D",
    },
    channelDescriptionSubText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#718096",
        marginTop: 2,
    },
    faqStackWrapperBox: {
        gap: 10,
        marginBottom: 24,
    },
    faqAccordionItemBox: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F1F5F9",
        overflow: "hidden",
    },
    faqHeaderInteractiveClickTrack: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    faqQuestionText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1A365D",
        flex: 1,
        paddingRight: 14,
    },
    faqExpandedContentTextContainer: {
        paddingHorizontal: 16,
        paddingBottom: 14,
        borderTopWidth: 1,
        borderTopColor: "#FAFAFD",
        paddingTop: 10,
    },
    faqAnswerTextContent: {
        fontSize: 13,
        fontWeight: "500",
        color: "#718096",
        lineHeight: 19,
    },
    emergencyOperationalWindowCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F0F7FF", // Premium soft light blue diagnostic overlay tint 
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: "#D2E9FF",
    },
    emergencyLeftDecorWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    operationalWindowMainTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2B6CB0",
    },
    operationalTimingsColumnStack: {
        alignItems: "flex-end",
    },
    timingDayRangeLabelText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#2B6CB0",
    },
    timingHourValuesLabelText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#1A365D",
        marginTop: 1,
    },
    stickyFooterFixedButtonFrameContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: Platform.OS === "ios" ? 24 : 14,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    primaryActionButtonSubmitState: {
        backgroundColor: "#1A365D",
        height: 52,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        ...Platform.select({
            ios: {
                shadowColor: "#1A365D",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    primaryActionTextContent: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 0.2,
    },
});