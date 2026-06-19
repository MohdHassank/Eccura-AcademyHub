import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

interface FeesSummary {
  id: number;
  studentId: number;
  totalFees: number;
  paidAmount: number;
  pendingAmount: number;
  scholarshipAmount: number;
}

export default function FeesScreen() {

  const fetchFeeSummary = async () => {
    try {

      const userData = await AsyncStorage.getItem("user");

      if (!userData) return;

      const user = JSON.parse(userData);

      console.log("User Object:", user);

      const response = await axios.get(
        `http://192.168.29.49:5000/api/student/feesSummary/${user.id}`
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        setFeeSummary(response.data.summary);
      }

    } catch (error) {
      console.log("Fee Summary Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(tabs)/home");
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );

  const [showAmount, setShowAmount] = useState(true);
  const [feeSummary, setFeeSummary] = useState<FeesSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeeSummary();

  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. TOP NAVBAR HEADER */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
                <Ionicons name="arrow-back" size={22} color="#0F172A" />
              </TouchableOpacity>
      {/* <View style={styles.header}>
        
        
        <View style={styles.logoContainer}>
          <View style={styles.logoRow}>
            <MaterialCommunityIcons name="triangle" size={24} color="#00A3FF" style={styles.logoIcon} />
            <Text style={styles.logoTextMain}>Academy<Text style={styles.logoTextSub}>Hub</Text></Text>
          </View>
          <Text style={styles.logoTagline}>Learn. Grow. Succeed.</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color="#1E293B" />
          <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
        </TouchableOpacity>
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. TITLE SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Fees</Text>
          <Text style={styles.pageSubtitle}>Manage your fee payments in one secure place.</Text>
        </View>

        {/* 3. TOTAL PAYABLE & PROGRESS OVERVIEW CARD */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewLeft}>
            <View style={styles.payableHeaderRow}>
              <Text style={styles.payableLabel}>Total Payable</Text>
              <TouchableOpacity onPress={() => setShowAmount(!showAmount)} style={styles.eyeIcon}>
                <Ionicons name={showAmount ? "eye-outline" : "eye-off-outline"} size={16} color="#64748B" />
              </TouchableOpacity>
            </View>
            <Text style={styles.payableAmount}>
              {showAmount
                ? `₹ ${Number(feeSummary?.totalFees || 0).toLocaleString()}`
                : "••••••"}
            </Text>
            <View style={styles.academicYearBadge}>
              <Text style={styles.academicYearText}>This Academic Year</Text>
            </View>
          </View>

          {/* Semi-chart ring simulation */}
          <View style={styles.chartContainer}>
            <View style={styles.circularProgressTrack}>
              <View style={styles.circularProgressFill} />
              <View style={styles.circularInnerCircle}>
                <Text style={styles.chartPaidLabel}>Paid</Text>
                <Text style={styles.chartPaidAmount}>₹ {feeSummary?.paidAmount?.toLocaleString() ?? 0}</Text>
                <Text style={styles.chartPercentage}>{feeSummary
                  ? Math.round(
                    (feeSummary.paidAmount /
                      feeSummary.totalFees) *
                    100
                  )
                  : 0}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 4. BREAKDOWN ROW LIST (Inside the Overview Grid) */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownRow}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dotIndicator, { backgroundColor: '#10B981' }]} />
              <Text style={styles.breakdownLabel}>Paid Amount</Text>
            </View>
            <Text style={styles.breakdownValue}>₹ {feeSummary?.paidAmount?.toLocaleString() ?? 0}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dotIndicator, { backgroundColor: '#F97316' }]} />
              <Text style={styles.breakdownLabel}>Pending Amount</Text>
            </View>
            <Text style={[styles.breakdownValue, { fontWeight: '700' }]}>₹ {feeSummary?.pendingAmount?.toLocaleString() ?? 0}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.dotIndicator, { backgroundColor: '#3B82F6' }]} />
              <Text style={styles.breakdownLabel}>Discount/Scholarship</Text>
            </View>
            <Text style={styles.breakdownValue}>₹ {feeSummary?.scholarshipAmount?.toLocaleString() ?? 0}</Text>
          </View>
        </View>

        {/* 5. SECURITY BANNER BAR */}
        <View style={styles.securityBanner}>
          <MaterialCommunityIcons name="shield-check" size={22} color="#FFFFFF" />
          <Text style={styles.securityText}>
            Your payments are 100% secure {'\n'}
            <Text style={styles.securitySubText}>with industry-standard encryption.</Text>
          </Text>
          <Feather name="lock" size={18} color="rgba(255,255,255,0.4)" style={styles.securityLock} />
        </View>

        {/* 6. LIST OF MODULE ACTIONS */}

        {/* ACTION 1: PENDING FEES */}
        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIconWrapper, { backgroundColor: '#FFEDED' }]}>
            <MaterialIcons name="error-outline" size={24} color="#EF4444" />
          </View>

          <View style={styles.actionMainContent}>
            <View style={styles.actionTextInfo}>
              <Text style={styles.actionTitle}>Pending Fees</Text>
              <Text style={styles.actionDesc}>View your pending fee details and due dates.</Text>
            </View>

            <View style={styles.badgeInfoRow}>
              <View style={styles.badgeSubBlock}>
                <Text style={styles.badgeSubLabel}>Due Amount</Text>
                <Text style={styles.badgeSubValueRed}>₹ {feeSummary?.pendingAmount?.toLocaleString() ?? 0}</Text>
              </View>
              <View style={styles.badgeSubBlock}>
                <Text style={styles.badgeSubLabel}>Due Date</Text>
                <Text style={styles.badgeSubValueDark}>25 May 2025</Text>
              </View>
            </View>
          </View>

          <View style={styles.arrowCircleRight}>
            <Feather name="chevron-right" size={16} color="#2563EB" />
          </View>
        </TouchableOpacity>

        {/* ACTION 2: ONLINE PAYMENT */}
        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIconWrapper, { backgroundColor: '#E6F4EA' }]}>
            <AntDesign name="credit-card" size={22} color="#10B981" />
          </View>

          <View style={styles.actionMainContent}>
            <View style={styles.actionTextInfo}>
              <Text style={styles.actionTitle}>Online Payment</Text>
              <Text style={styles.actionDesc}>Pay your fees securely using multiple options.</Text>
            </View>

            <View style={[styles.badgeInfoRow, { backgroundColor: '#F8FAFC', paddingVertical: 6 }]}>
              <Text style={styles.quickPayLabel}>Quick Pay:</Text>
              <View style={styles.paymentLogoMockRow}>
                <Text style={styles.paymentBrandText}>UPI</Text>
                <Text style={[styles.paymentBrandText, { color: '#002F87', fontStyle: 'italic' }]}>VISA</Text>
                <Text style={[styles.paymentBrandText, { color: '#EB001B' }]}>MC</Text>
              </View>
            </View>
          </View>

          <View style={styles.arrowCircleRight}>
            <Feather name="chevron-right" size={16} color="#2563EB" />
          </View>
        </TouchableOpacity>

        {/* ACTION 3: PAYMENT HISTORY */}
        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIconWrapper, { backgroundColor: '#EFF6FF' }]}>
            <MaterialCommunityIcons name="history" size={24} color="#3B82F6" />
          </View>

          <View style={styles.actionMainContent}>
            <View style={styles.actionTextInfo}>
              <Text style={styles.actionTitle}>Payment History</Text>
              <Text style={styles.actionDesc}>Check your past payments and transaction details.</Text>
            </View>

            <View style={styles.badgeInfoRow}>
              <View style={styles.badgeSubBlock}>
                <Text style={styles.badgeSubLabel}>Total Paid</Text>
                <Text style={styles.badgeSubValueBlue}>₹ {feeSummary?.paidAmount?.toLocaleString() ?? 0}</Text>
              </View>
              <View style={styles.badgeSubBlock}>
                <Text style={styles.badgeSubLabel}>Last Payment</Text>
                <Text style={styles.badgeSubValueDark}>10 Apr 2025</Text>
              </View>
            </View>
          </View>

          <View style={styles.arrowCircleRight}>
            <Feather name="chevron-right" size={16} color="#2563EB" />
          </View>
        </TouchableOpacity>

        {/* ACTION 4: RECEIPTS DOWNLOAD */}
        <TouchableOpacity style={styles.actionCard}>
          <View style={[styles.actionIconWrapper, { backgroundColor: '#F3E8FF' }]}>
            <Feather name="download" size={22} color="#8B5CF6" />
          </View>

          <View style={styles.actionMainContent}>
            <View style={styles.actionTextInfo}>
              <Text style={styles.actionTitle}>Receipts Download</Text>
              <Text style={styles.actionDesc}>Download your fee receipts whenever you need.</Text>
            </View>

            <View style={[styles.badgeInfoRow, { justifyContent: 'space-between', backgroundColor: '#F3E8FF', opacity: 0.8 }]}>
              <View>
                <Text style={styles.fileTitleText}>Receipt_10Apr2025.pdf</Text>
                <Text style={styles.fileSizeText}>123 KB • PDF</Text>
              </View>
              <Feather name="download-cloud" size={16} color="#8B5CF6" />
            </View>
          </View>

          <View style={styles.arrowCircleRight}>
            <Feather name="chevron-right" size={16} color="#2563EB" />
          </View>
        </TouchableOpacity>

        {/* 7. SUPPORT BOTTOM BANNER */}
        <View style={styles.supportContainer}>
          <View style={styles.supportLeftWrapper}>
            <View style={styles.supportAvatarCircle}>
              <Feather name="headphones" size={18} color="#2563EB" />
            </View>
            <View style={styles.supportTextSection}>
              <Text style={styles.supportMainTitle}>Need Help with Fees?</Text>
              <Text style={styles.supportSubTitle}>Our support team is here to help you with any fee-related queries.</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.supportButtonInline}>
            <Ionicons name="chatbubble-ellipses-outline" size={14} color="#FFFFFF" />
            <Text style={styles.supportBtnText}>Contact Support</Text>
            <Feather name="arrow-right" size={12} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ============== FIGMA MATCHED PREMIUM STYLING ==============
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFBFD',
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 110, // Avoid bottom bar overlapping layout bounds
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFBFD',
  },
  backButton: {
    width: 38, height: 38, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
    justifyContent: 'center', alignItems: 'center'
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 4,
    transform: [{ rotate: '90deg' }],
  },
  logoTextMain: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  logoTextSub: {
    color: '#10B981',
  },
  logoTagline: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  titleSection: {
    marginVertical: 14,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  overviewCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overviewLeft: {
    flex: 1,
  },
  payableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  payableLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  eyeIcon: {
    padding: 2,
  },
  payableAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 6,
  },
  academicYearBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F4EA',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  academicYearText: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  circularProgressTrack: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 8,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circularProgressFill: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 8,
    borderColor: '#10B981',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '-45deg' }],
  },
  circularInnerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPaidLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '500',
  },
  chartPaidAmount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 1,
  },
  chartPercentage: {
    fontSize: 10,
    color: '#10B981',
    fontWeight: '700',
    marginTop: 1,
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginTop: 12,
    gap: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 12,
    marginVertical: 14,
    gap: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  securityText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15,
  },
  securitySubText: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '400',
  },
  securityLock: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  actionIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionMainContent: {
    flex: 1,
    paddingRight: 8,
  },
  actionTextInfo: {
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  actionDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 14,
  },
  badgeInfoRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF7ED',
    borderRadius: 10,
    padding: 8,
    gap: 16,
  },
  badgeSubBlock: {
    flex: 1,
  },
  badgeSubLabel: {
    fontSize: 8,
    color: '#94A3B8',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  badgeSubValueRed: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
    marginTop: 2,
  },
  badgeSubValueBlue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 2,
  },
  badgeSubValueDark: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    marginTop: 2,
  },
  quickPayLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  paymentLogoMockRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  paymentBrandText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
  },
  fileTitleText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#5B21B6',
  },
  fileSizeText: {
    fontSize: 8,
    color: '#7C3AED',
    marginTop: 1,
  },
  arrowCircleRight: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  supportContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginTop: 6,
    gap: 12,
  },
  supportLeftWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  supportAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  supportTextSection: {
    flex: 1,
  },
  supportMainTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  supportSubTitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 14,
  },
  supportButtonInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    gap: 6,
  },
  supportBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});