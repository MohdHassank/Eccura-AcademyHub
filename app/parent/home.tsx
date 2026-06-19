import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Interface definition for grid items
interface GridItemProps {
  icon: keyof typeof Feather.glyphMap | keyof typeof Ionicons.glyphMap;
  isIonicons?: boolean;
  title: string;
  description: string;
  accentColor: string;
  onPress: () => void;
}

export default function ParentDashboardScreen() {
  const router = useRouter();

  // Reusable Component for Grid Features
  const FeatureCard = ({ icon, isIonicons, title, description, accentColor, onPress }: GridItemProps) => (
    <TouchableOpacity style={styles.gridCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.gridCardTopRow}>
        <View style={[styles.gridIconFrame, { backgroundColor: `${accentColor}10` }]}>
          {isIonicons ? (
            <Ionicons name={icon as any} size={20} color={accentColor} />
          ) : (
            <Feather name={icon as any} size={20} color={accentColor} />
          )}
        </View>
        <Feather name="arrow-up-right" size={16} color="#94A3B8" />
      </View>
      <View style={styles.gridCardBottomContent}>
        <Text style={styles.gridCardTitle}>{title}</Text>
        <Text style={styles.gridCardDesc} numberOfLines={2}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollCanvas}>
        
        {/* 1. HEADER PROFILE ROOT */}
        <View style={styles.headerProfileSection}>
          <View>
            <Text style={styles.greetingText}>Good Evening 👋</Text>
            <Text style={styles.parentNameText}>Mr. Hassan Khan</Text>
            <Text style={styles.parentSubText}>Monitoring your child's academic progress</Text>
          </View>
          <TouchableOpacity style={styles.avatarCircle} activeOpacity={0.8}>
            <MaterialCommunityIcons name="account-child-circle" size={44} color="#6D28D9" />
          </TouchableOpacity>
        </View>

        {/* 2. LINKED CHILD CARD */}
        <View style={styles.childMetaCard}>
          <View style={styles.childMetaLeft}>
            <View style={styles.studentBadgeCircle}>
              <Feather name="user" size={18} color="#3B82F6" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.childLabelText}>Linked Child</Text>
              <Text style={styles.childNameText}>Hassan Khan</Text>
            </View>
          </View>
          <View style={styles.classBadgeFrame}>
            <Text style={styles.classBadgeText}>Class 10-A</Text>
          </View>
        </View>

        {/* 3. QUICK OVERVIEW METRICS CARD (NO GRAPHS) */}
        <View style={styles.overviewCard}>
          <Text style={styles.sectionHeading}>Quick Overview</Text>
          <View style={styles.metricsGridRow}>
            
            <View style={styles.metricItemBox}>
              <View style={[styles.metricIconDot, { backgroundColor: '#E6F4EA' }]}>
                <Feather name="calendar" size={14} color="#137333" />
              </View>
              <Text style={styles.metricValueText}>92%</Text>
              <Text style={styles.metricLabelText}>Attendance</Text>
            </View>

            <View style={styles.metricItemBox}>
              <View style={[styles.metricIconDot, { backgroundColor: '#EFF6FF' }]}>
                <Feather name="credit-card" size={14} color="#2563EB" />
              </View>
              <Text style={styles.metricValueText}>₹0</Text>
              <Text style={styles.metricLabelText}>Pending Fees</Text>
            </View>

            <View style={styles.metricItemBox}>
              <View style={[styles.metricIconDot, { backgroundColor: '#FFF7ED' }]}>
                <Feather name="edit-3" size={14} color="#C2410C" />
              </View>
              <Text style={styles.metricValueText}>4</Text>
              <Text style={styles.metricLabelText}>Assignments</Text>
            </View>

            <View style={styles.metricItemBox}>
              <View style={[styles.metricIconDot, { backgroundColor: '#F5F3FF' }]}>
                <Feather name="file-text" size={14} color="#6D28D9" />
              </View>
              <Text style={styles.metricValueText}>3</Text>
              <Text style={styles.metricLabelText}>Upcoming Tests</Text>
            </View>

          </View>
        </View>

        {/* 4. MAIN FEATURE GRID (2 COLUMNS) */}
        <Text style={[styles.sectionHeading, { marginBottom: 12, marginTop: 8 }]}>Main Features</Text>
        
        <View style={styles.featuresFlexGrid}>
          <FeatureCard 
  icon="bar-chart-2" 
  title="Child Performance" 
  description="Monitor marks, rank, and trends" 
  accentColor="#3B82F6"
  onPress={() => router.push('/parent/childperformance')} // ← Yahan '/parent/' add kar diya
/>
          <FeatureCard 
            icon="book-open" 
            title="Academic Tracking" 
            description="Track homework & upcoming tests" 
            accentColor="#6D28D9"
            onPress={() => router.push('/parent/academicTracking')} 
          />
        </View>

        <View style={styles.featuresFlexGrid}>
          <FeatureCard 
            icon="wallet" 
            title="Fees Hub" 
            description="Manage invoices & online receipts" 
            accentColor="#0D9488"
            onPress={() => router.push('/parent/FeesTracking')} 
          />
          <FeatureCard 
            icon="bell" 
            title="Notifications" 
            description="Stay updated with exam alerts" 
            accentColor="#E11D48"
            onPress={() => router.push('/parent/notifications')} 
          />
        </View>

        <View style={[styles.featuresFlexGrid, { justifyContent: 'flex-start' }]}>
          <View style={{ width: (width - 44) / 2 }}>
            <FeatureCard 
              icon="user" 
              title="Profile Settings" 
              description="Manage account configurations" 
              accentColor="#4B5563"
              onPress={() => router.push('/parent/profile')} 
            />
          </View>
        </View>

        {/* 5. RECENT UPDATES SECTION */}
        <Text style={[styles.sectionHeading, { marginBottom: 12, marginTop: 16 }]}>Recent Updates</Text>
        
        <View style={styles.updateTimelineStack}>
          
          <View style={styles.updateItemRow}>
            <View style={[styles.updateTimelineNode, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="document-text-outline" size={14} color="#2563EB" />
            </View>
            <View style={styles.updateTextContainer}>
              <Text style={styles.updateMainText}>New Mathematics Assignment Uploaded</Text>
              <Text style={styles.updateTimeStampText}>Today • 04:30 PM</Text>
            </View>
          </View>

          <View style={styles.updateItemRow}>
            <View style={[styles.updateTimelineNode, { backgroundColor: '#E6F4EA' }]}>
              <Ionicons name="checkmark-circle-outline" size={14} color="#137333" />
            </View>
            <View style={styles.updateTextContainer}>
              <Text style={styles.updateMainText}>Attendance Updated</Text>
              <Text style={styles.updateTimeStampText}>Today • 11:15 AM</Text>
            </View>
          </View>

          <View style={styles.updateItemRow}>
            <View style={[styles.updateTimelineNode, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="flask-outline" size={14} color="#C2410C" />
            </View>
            <View style={styles.updateTextContainer}>
              <Text style={styles.updateMainText}>Science Test Scheduled</Text>
              <Text style={styles.updateTimeStampText}>Yesterday • Class 10-A</Text>
            </View>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollCanvas: { paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 10 : 0, paddingBottom: 40 },
  
  // Header Architecture
  headerProfileSection: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 12, marginBottom: 16
  },
  greetingText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  parentNameText: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 2 },
  parentSubText: { fontSize: 12, color: '#94A3B8', marginTop: 4 },
  avatarCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F3FF' },
  
  // Linked Child Card
  childMetaCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F8FAFC', borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20
  },
  childMetaLeft: { flexDirection: 'row', alignItems: 'center' },
  studentBadgeCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EBF5FF', justifyContent: 'center', alignItems: 'center' },
  childLabelText: { fontSize: 10, fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase' },
  childNameText: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginTop: 1 },
  classBadgeFrame: { backgroundColor: '#3B82F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  classBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  
  // Overview Area
  overviewCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 18 },
  sectionHeading: { fontSize: 15, fontWeight: '700', color: '#0F172A', paddingLeft: 2 },
  metricsGridRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  metricItemBox: { width: (width - 76) / 4, alignItems: 'center', backgroundColor: '#F8FAFC', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  metricIconDot: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  metricValueText: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  metricLabelText: { fontSize: 9, color: '#64748B', fontWeight: '500', marginTop: 2, textAlign: 'center' },
  
  // Two Column Feature Layout Grid
  featuresFlexGrid: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  gridCard: {
    width: (width - 44) / 2, backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 14, borderWidth: 1, borderColor: '#F1F5F9', minHeight: 115,
    justifyContent: 'space-between', elevation: 2, shadowColor: '#0F172A',
    shadowOpacity: 0.03, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }
  },
  gridCardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  gridIconFrame: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  gridCardBottomContent: { marginTop: 12 },
  gridCardTitle: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  gridCardDesc: { fontSize: 10, color: '#94A3B8', marginTop: 4, lineHeight: 14 },

  // Recent Updates Timeline
  updateTimelineStack: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#F1F5F9' },
  updateItemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  updateTimelineNode: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  updateTextContainer: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#F8FAFC', paddingBottom: 8 },
  updateMainText: { fontSize: 12, fontWeight: '600', color: '#334155', lineHeight: 16 },
  updateTimeStampText: { fontSize: 10, color: '#94A3B8', marginTop: 2 }
});