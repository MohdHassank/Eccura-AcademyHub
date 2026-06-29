import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --- TYPINGS & DATA STRUCTURES ---
interface ModuleItem {
  id: string;
  title: string;
  description: string;
  iconLibrary: 'MaterialIcons' | 'MaterialCommunityIcons';
  iconName: any;
  iconColor: string;
}

interface ActivityItem {
  id: string;
  text: string;
  time: string;
}

// --- CONFIGURABLE DATA STRATIFICATION ---
const KPI_METRICS = [
  { 
    id: 'kpi-1', 
    label: 'Total Students', 
    value: '1,248', 
    trend: '+12%', 
    iconLibrary: 'MaterialIcons' as const, 
    iconName: 'people-alt' as const, 
    iconColor: '#1D4ED8', 
    bg: '#EFF6FF' 
  },
  { 
    id: 'kpi-2', 
    label: 'Total Revenue', 
    value: '₹18.5L', 
    trend: '+8.2%', 
    iconLibrary: 'MaterialIcons' as const, 
    iconName: 'account-balance-wallet' as const, 
    iconColor: '#10B981', 
    bg: '#ECFDF5' 
  },
  { 
    id: 'kpi-3', 
    label: 'Pending Fees', 
    value: '₹3.8L', 
    trend: '-4.1%', 
    iconLibrary: 'MaterialCommunityIcons' as const, 
    iconName: 'clock-alert-outline' as const, 
    iconColor: '#F59E0B', 
    bg: '#FFF7ED' 
  },
  { 
    id: 'kpi-4', 
    label: 'Active Faculty', 
    value: '38', 
    trend: 'Stable', 
    iconLibrary: 'MaterialIcons' as const, 
    iconName: 'school' as const, 
    iconColor: '#6D28D9', 
    bg: '#F5F3FF' 
  },
];

const RECENT_ACTIVITIES: ActivityItem[] = [
  { id: 'act-1', text: 'New student enrolled in JEE Ultimate Batch', time: '5m ago' },
  { id: 'act-2', text: 'Term-1 course fees collected from 14 students', time: '22m ago' },
  { id: 'act-3', text: 'Prof. Verma added to Faculty Directory', time: '1h ago' },
  { id: 'act-4', text: 'Monthly Performance announcement published', time: '3h ago' },
  { id: 'act-5', text: 'Crash Course Batch C successfully configured', time: '5h ago' },
];

export default function AdminDashboard() {
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Core Management Modules Array (The 9 Core Strategic Pillars)
  const CORE_MODULES: ModuleItem[] = [
    { id: 'mod-1', title: 'Business Analytics', description: 'Institutional growth metrics, collections & performance yield telemetry.', iconLibrary: 'MaterialIcons', iconName: 'trending-up', iconColor: '#0F172A' },
    { id: 'mod-2', title: 'Student Management', description: 'Centralized directory, admissions gateway, profiling, and compliance documentation.', iconLibrary: 'MaterialIcons', iconName: 'people', iconColor: '#1D4ED8' },
    { id: 'mod-3', title: 'Faculty Management', description: 'Onboarding logs, payroll orchestration, performance markers, and constraints scheduling.', iconLibrary: 'MaterialIcons', iconName: 'school', iconColor: '#6D28D9' },
    { id: 'mod-4', title: 'Finance Management', description: 'Automated invoice routing, expense tracing, audit logs, and dynamic P&L reports.', iconLibrary: 'MaterialIcons', iconName: 'payment', iconColor: '#047857' },
    { id: 'mod-5', title: 'Batch & Class Management', description: 'Syllabus mapping, master timetable matrix, and smart classroom space allocation.', iconLibrary: 'MaterialIcons', iconName: 'layers', iconColor: '#B45309' },
    { id: 'mod-6', title: 'Communication System', description: 'Omnichannel notice boards, system broadcasts, smart push logs, and automated WhatsApp relays.', iconLibrary: 'MaterialIcons', iconName: 'chat-bubble-outline', iconColor: '#0369A1' },
    { id: 'mod-7', title: 'AI Insights Portal', description: 'Predictive student churn indicators, automated revenue pacing, and custom optimizations.', iconLibrary: 'MaterialCommunityIcons', iconName: 'auto-fix', iconColor: '#DB2777' },
    { id: 'mod-8', title: 'Content Control Hub', description: 'Centralized notes clearinghouse, quiz asset libraries, and digital lecture archives.', iconLibrary: 'MaterialIcons', iconName: 'library-books', iconColor: '#4F46E5' },
    { id: 'mod-9', title: 'System Management', description: 'Granular access hierarchies, platform configurations, database backups, and security policies.', iconLibrary: 'MaterialIcons', iconName: 'settings', iconColor: '#475569' },
  ];

  // Helper dynamic custom render for icons
  const renderIcon = (library: 'MaterialIcons' | 'MaterialCommunityIcons', name: any, size: number, color: string) => {
    if (library === 'MaterialIcons') {
      return <MaterialIcons name={name} size={size} color={color} />;
    }
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />

      {/* ==========================================
          1. PREMIUM HEADER SECTION
         ========================================== */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.logoText}>Academy<Text style={styles.logoSubText}>Hub</Text></Text>
          <Text style={styles.greetingText}>Good Morning,</Text>
          <Text style={styles.adminNameText}>Hassan Khan</Text>
          <Text style={styles.roleText}>Institute Administrator</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
            <MaterialIcons name="notifications-none" size={22} color="#0F172A" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop' }}
            style={styles.avatarImage}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ==========================================
            2. BUSINESS OVERVIEW MATRIX (KPI CARDS)
           ========================================== */}
        <View style={styles.kpiGrid}>
          {KPI_METRICS.map((kpi) => (
            <View key={kpi.id} style={styles.kpiCard}>
              <View style={styles.kpiHeaderRow}>
                <View style={[styles.kpiIconWrapper, { backgroundColor: kpi.bg }]}>
                  {renderIcon(kpi.iconLibrary, kpi.iconName, 18, kpi.iconColor)}
                </View>
                <Text style={[styles.kpiTrendText, { color: kpi.trend.startsWith('-') ? '#EF4444' : '#10B981' }]}>
                  {kpi.trend}
                </Text>
              </View>
              <Text style={styles.kpiValueText}>{kpi.value}</Text>
              <Text style={styles.kpiLabelText}>{kpi.label}</Text>
            </View>
          ))}
        </View>

        {/* ==========================================
            3. TODAY'S HIGHLIGHTS INFOGRAPHIC PANEL
           ========================================== */}
        <Text style={styles.sectionHeading}>Today's Highlights</Text>
        <View style={styles.highlightsCard}>
          <View style={styles.highlightItem}>
            <Text style={styles.highlightVal}>+18</Text>
            <Text style={styles.highlightSub}>Admissions</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightItem}>
            <Text style={[styles.highlightVal, { color: '#10B981' }]}>₹1.2L</Text>
            <Text style={styles.highlightSub}>Fees Collected</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightItem}>
            <Text style={styles.highlightVal}>32</Text>
            <Text style={styles.highlightSub}>New Messages</Text>
          </View>
          <View style={styles.highlightDivider} />
          <View style={styles.highlightItem}>
            <Text style={[styles.highlightVal, { color: '#F59E0B' }]}>06</Text>
            <Text style={styles.highlightSub}>Open Tasks</Text>
          </View>
        </View>

        {/* ==========================================
            4. MAIN STRATEGIC MANAGEMENT MODULES GRID
           ========================================== */}
        <Text style={styles.sectionHeading}>Core Directories & Modules</Text>
        <View style={styles.modulesContainer}>
          {CORE_MODULES.map((module) => (
            <TouchableOpacity key={module.id} style={styles.moduleCard} activeOpacity={0.85}>
              <View style={styles.moduleTopLine}>
                <View style={styles.moduleIconBox}>
                  {renderIcon(module.iconLibrary, module.iconName, 22, '#0F172A')}
                </View>
                <View style={styles.moduleOpenIndicator}>
                  <Text style={styles.moduleOpenText}>Access</Text>
                  <MaterialIcons name="chevron-right" size={16} color="#94A3B8" />
                </View>
              </View>
              <Text style={styles.moduleTitleText}>{module.title}</Text>
              <Text style={styles.moduleDescText} numberOfLines={2}>
                {module.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ==========================================
            5. RECENT OPERATION AUDIT ACTIVITY
           ========================================== */}
        <Text style={styles.sectionHeading}>System Audit Ledger</Text>
        <View style={styles.activityCard}>
          {RECENT_ACTIVITIES.map((item, index) => (
            <View key={item.id} style={[styles.activityRow, index === RECENT_ACTIVITIES.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.activityDotMarker} />
              <Text style={styles.activityMainText} numberOfLines={1}>{item.text}</Text>
              <Text style={styles.activityTimeText}>{item.time}</Text>
            </View>
          ))}
        </View>

        {/* ==========================================
            6. PENDING TASKS/ACTIONS SYSTEM
           ========================================== */}
        <Text style={styles.sectionHeading}>Critical Flags & Clearances</Text>
        <View style={styles.pendingCard}>
          {[
            { label: 'Unresolved Fee Overdues', value: '14 Payments Pending', color: '#EF4444' },
            { label: 'Admissions Desk Hold Logs', value: '4 Registrations Stalled', color: '#F59E0B' },
            { label: 'Faculty Compliance Verification', value: '2 Requests Awaiting Action', color: '#6366F1' },
            { label: 'Unassigned Urgent Help Tickets', value: '3 Active Escalations', color: '#475569' }
          ].map((task, i) => (
            <View key={i} style={styles.pendingRow}>
              <View style={styles.pendingLeftStack}>
                <Text style={styles.pendingRowLabelText}>{task.label}</Text>
                <Text style={[styles.pendingRowStatusText, { color: task.color }]}>{task.value}</Text>
              </View>
              <TouchableOpacity style={styles.pendingActionPill} activeOpacity={0.7}>
                <Text style={styles.pendingActionPillText}>Resolve</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>

      {/* ==========================================
          7. SYSTEM APPLICATION LAYER SHORTS (FAB)
         ========================================== */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setIsFabOpen(true)}
        style={styles.floatingButtonCircle}
      >
        <MaterialIcons name="add" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Shortcut Action Drawer Overlay */}
      {isFabOpen && (
        <View style={styles.modalBackdropOverlayAbsolute}>
          <TouchableOpacity style={styles.dismissalTarget} activeOpacity={1} onPress={() => setIsFabOpen(false)} />
          <View style={styles.bottomSheetSurface}>
            <View style={styles.sheetHandleIndicator} />
            <View style={styles.sheetHeaderBar}>
              <Text style={styles.sheetTitle}>Global Shortcuts</Text>
              <TouchableOpacity onPress={() => setIsFabOpen(false)}>
                <MaterialIcons name="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>
            <View style={styles.sheetShortcutsGrid}>
              {[
                { name: 'Add Student', library: 'MaterialIcons' as const, icon: 'person-add' as const, color: '#1D4ED8', bg: '#EFF6FF' },
                { name: 'Collect Fees', library: 'MaterialIcons' as const, icon: 'payment' as const, color: '#047857', bg: '#ECFDF5' },
                { name: 'Send Notice', library: 'MaterialIcons' as const, icon: 'campaign' as const, color: '#B45309', bg: '#FFF7ED' },
                { name: 'Create Batch', library: 'MaterialIcons' as const, icon: 'layers' as const, color: '#6D28D9', bg: '#F5F3FF' },
              ].map((shortcut, idx) => (
                <TouchableOpacity key={idx} style={styles.shortcutTileButton} activeOpacity={0.75}>
                  <View style={[styles.shortcutIconBox, { backgroundColor: shortcut.bg }]}>
                    {renderIcon(shortcut.library, shortcut.icon, 22, shortcut.color)}
                  </View>
                  <Text style={styles.shortcutTileLabelText}>{shortcut.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* ==========================================
          PRODUCTION NAVIGATION BAR REPLICA
         ========================================== */}
      <View style={styles.fixedTabBarRow}>
        {[
          { label: 'Dashboard', library: 'MaterialIcons' as const, icon: 'dashboard' as const, active: true },
          { label: 'Students', library: 'MaterialIcons' as const, icon: 'people' as const, active: false },
          { label: 'Finance', library: 'MaterialIcons' as const, icon: 'account-balance' as const, active: false },
          { label: 'Alerts', library: 'MaterialIcons' as const, icon: 'notifications' as const, active: false },
          { label: 'Profile', library: 'MaterialIcons' as const, icon: 'account-circle' as const, active: false }
        ].map((tab, key) => (
          <TouchableOpacity key={key} style={styles.tabBarItem} activeOpacity={0.8}>
            {renderIcon(tab.library, tab.icon, 22, tab.active ? '#0F172A' : '#94A3B8')}
            <Text style={[styles.tabBarItemLabel, tab.active && styles.tabBarItemLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
}

// ==========================================
// CENTRALIZED CLEAN METROPOLIS DESIGN SYSTEM
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flex: 1,
  },
  logoText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginBottom: 12,
  },
  logoSubText: {
    color: '#3B82F6',
  },
  greetingText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  adminNameText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 11,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginTop: 24,
    marginBottom: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  kpiCard: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 6 },
      android: { elevation: 1.5 },
    }),
  },
  kpiHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiTrendText: {
    fontSize: 11,
    fontWeight: '700',
  },
  kpiValueText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  kpiLabelText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  highlightsCard: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  highlightItem: {
    flex: 1,
    alignItems: 'center',
  },
  highlightVal: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  highlightSub: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  highlightDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
  modulesContainer: {
    gap: 12,
  },
  moduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: { shadowColor: '#0F172A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.02, shadowRadius: 8 },
      android: { elevation: 1 },
    }),
  },
  moduleTopLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moduleIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleOpenIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  moduleOpenText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  moduleTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  moduleDescText: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
    fontWeight: '400',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  activityDotMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginRight: 12,
  },
  activityMainText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
  },
  activityTimeText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  pendingCard: {
    gap: 10,
  },
  pendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFD',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pendingLeftStack: {
    flex: 1,
  },
  pendingRowLabelText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
  },
  pendingRowStatusText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  pendingActionPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pendingActionPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  floatingButtonCircle: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 99,
  },
  fixedTabBarRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 12 : 0,
    zIndex: 98,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarItemLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 4,
  },
  tabBarItemLabelActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  modalBackdropOverlayAbsolute: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    justifyContent: 'flex-end',
    zIndex: 999,
  },
  dismissalTarget: {
    flex: 1,
  },
  bottomSheetSurface: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  sheetHandleIndicator: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  sheetShortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shortcutTileButton: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  shortcutIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  shortcutTileLabelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
});