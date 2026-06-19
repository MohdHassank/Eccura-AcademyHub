// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Users,
//   UserPlus,
//   IndianRupee,
//   GraduationCap,
//   TrendingUp,
//   TrendingDown,
//   ArrowRight,
//   MessageSquare,
//   Wallet,
//   Clock,
//   UserCheck,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import StatCard from '@/components/StatCard';
// import SectionHeader from '@/components/SectionHeader';

// const { width } = Dimensions.get('window');

// const chartData = [
//   { label: '1 May', value: 5 },
//   { label: '5 May', value: 8 },
//   { label: '10 May', value: 12 },
//   { label: '15 May', value: 18 },
//   { label: '20 May', value: 16 },
//   { label: '25 May', value: 22 },
//   { label: '31 May', value: 28 },
// ];

// export default function DashboardScreen() {
//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="AcademyHub"
//           subtitle="Admin Dashboard"
//           notificationCount={8}
//         />

//         {/* Welcome Hero */}
//         <View style={styles.heroSection}>
//           <View style={styles.heroLeft}>
//             <Text style={styles.waveEmoji}>👋</Text>
//             <Text style={styles.greeting}>Good Morning,</Text>
//             <Text style={styles.adminName}>Admin</Text>
//             <Text style={styles.heroSubtitle}>
//               Here's what's happening with your institute today.
//             </Text>
//           </View>
//           <View style={styles.heroRight}>
//             <View style={styles.chartIllustration}>
//               <View style={styles.chartBar1} />
//               <View style={styles.chartBar2} />
//               <View style={styles.chartBar3} />
//               <View style={styles.chartBar4} />
//             </View>
//           </View>
//         </View>

//         {/* Quick Access */}
//         <SectionHeader title="Quick Access" actionText="View All" />
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.quickAccessScroll}
//         >
//           <TouchableOpacity style={styles.quickCard}>
//             <View style={[styles.quickIconBg, { backgroundColor: '#EEF2FF' }]}>
//               <Users size={24} color="#6366F1" />
//             </View>
//             <Text style={styles.quickTitle}>Students</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickCard}>
//             <View style={[styles.quickIconBg, { backgroundColor: '#ECFDF5' }]}>
//               <UserPlus size={24} color="#10B981" />
//             </View>
//             <Text style={styles.quickTitle}>Admissions</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickCard}>
//             <View style={[styles.quickIconBg, { backgroundColor: '#FFF7ED' }]}>
//               <IndianRupee size={24} color="#F59E0B" />
//             </View>
//             <Text style={styles.quickTitle}>Fees & Finance</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.quickCard}>
//             <View style={[styles.quickIconBg, { backgroundColor: '#F5F3FF' }]}>
//               <GraduationCap size={24} color="#8B5CF6" />
//             </View>
//             <Text style={styles.quickTitle}>Faculty</Text>
//           </TouchableOpacity>
//         </ScrollView>

//         {/* Business Growth Overview */}
//         <View style={styles.growthCard}>
//           <View style={styles.growthHeader}>
//             <Text style={styles.growthTitle}>Business Growth Overview</Text>
//             <View style={styles.periodSelector}>
//               <Text style={styles.periodText}>This Month</Text>
//               <View style={styles.dropdownIcon}>
//                 <Text style={{ fontSize: 10, color: '#64748B' }}>▼</Text>
//               </View>
//             </View>
//           </View>

//           {/* Chart Area */}
//           <View style={styles.chartContainer}>
//             <View style={styles.chartYAxis}>
//               <Text style={styles.chartYLabel}>₹ 30L</Text>
//               <Text style={styles.chartYLabel}>₹ 25L</Text>
//               <Text style={styles.chartYLabel}>₹ 20L</Text>
//               <Text style={styles.chartYLabel}>₹ 15L</Text>
//               <Text style={styles.chartYLabel}>₹ 10L</Text>
//               <Text style={styles.chartYLabel}>₹ 5L</Text>
//               <Text style={styles.chartYLabel}>₹ 0</Text>
//             </View>
//             <View style={styles.chartArea}>
//               {/* Grid lines */}
//               {[0, 1, 2, 3, 4, 5, 6].map((i) => (
//                 <View key={i} style={styles.gridLine} />
//               ))}
//               {/* Chart line representation */}
//               <View style={styles.chartLine}>
//                 {chartData.map((point, index) => (
//                   <View key={index} style={styles.chartPointContainer}>
//                     <View
//                       style={[
//                         styles.chartPoint,
//                         {
//                           bottom: (point.value / 30) * 180,
//                         },
//                       ]}
//                     />
//                     {index === 3 && (
//                       <View
//                         style={[
//                           styles.tooltip,
//                           { bottom: (point.value / 30) * 180 + 20 },
//                         ]}
//                       >
//                         <Text style={styles.tooltipDate}>15 May 2025</Text>
//                         <Text style={styles.tooltipValue}>₹ 24,75,000</Text>
//                       </View>
//                     )}
//                   </View>
//                 ))}
//               </View>
//               {/* X Axis */}
//               <View style={styles.chartXAxis}>
//                 {chartData.map((point, index) => (
//                   <Text key={index} style={styles.chartXLabel}>
//                     {point.label}
//                   </Text>
//                 ))}
//               </View>
//             </View>
//           </View>

//           {/* Stats Row */}
//           <View style={styles.statsRow}>
//             <View style={styles.statItem}>
//               <View style={[styles.statIconBg, { backgroundColor: '#EEF2FF' }]}>
//                 <Wallet size={16} color="#6366F1" />
//               </View>
//               <Text style={styles.statLabel}>Revenue</Text>
//               <Text style={styles.statValue}>₹ 24,75,000</Text>
//               <View style={styles.statChangeRow}>
//                 <TrendingUp size={12} color="#10B981" />
//                 <Text style={styles.statChangeUp}>18.6%</Text>
//               </View>
//             </View>
//             <View style={styles.statItem}>
//               <View style={[styles.statIconBg, { backgroundColor: '#FFF7ED' }]}>
//                 <IndianRupee size={16} color="#F59E0B" />
//               </View>
//               <Text style={styles.statLabel}>Expenses</Text>
//               <Text style={styles.statValue}>₹ 8,75,000</Text>
//               <View style={styles.statChangeRow}>
//                 <TrendingUp size={12} color="#EF4444" />
//                 <Text style={styles.statChangeDown}>6.3%</Text>
//               </View>
//             </View>
//             <View style={styles.statItem}>
//               <View style={[styles.statIconBg, { backgroundColor: '#ECFDF5' }]}>
//                 <UserCheck size={16} color="#10B981" />
//               </View>
//               <Text style={styles.statLabel}>Net Profit</Text>
//               <Text style={styles.statValue}>₹ 16,00,000</Text>
//               <View style={styles.statChangeRow}>
//                 <TrendingUp size={12} color="#10B981" />
//                 <Text style={styles.statChangeUp}>20.1%</Text>
//               </View>
//             </View>
//             <View style={styles.statItem}>
//               <View style={[styles.statIconBg, { backgroundColor: '#F5F3FF' }]}>
//                 <Clock size={16} color="#8B5CF6" />
//               </View>
//               <Text style={styles.statLabel}>Collection Rate</Text>
//               <Text style={styles.statValue}>82.4%</Text>
//               <View style={styles.statChangeRow}>
//                 <TrendingUp size={12} color="#10B981" />
//                 <Text style={styles.statChangeUp}>14.8%</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Today's Summary */}
//         <SectionHeader title="Today's Summary" actionText="View All" />
//         <View style={styles.summaryGrid}>
//           <StatCard
//             title="New Admissions"
//             value="12"
//             change="15% vs yesterday"
//             changeType="up"
//             icon={<UserPlus size={20} color="#6366F1" />}
//             iconBgColor="#EEF2FF"
//           />
//           <StatCard
//             title="Fees Collected"
//             value="28"
//             change="10% vs yesterday"
//             changeType="up"
//             icon={<IndianRupee size={20} color="#10B981" />}
//             iconBgColor="#ECFDF5"
//           />
//           <StatCard
//             title="Pending Fees"
//             value="28"
//             change="8% vs yesterday"
//             changeType="down"
//             icon={<Clock size={20} color="#F59E0B" />}
//             iconBgColor="#FFF7ED"
//           />
//           <StatCard
//             title="Messages"
//             value="18"
//             change="12% vs yesterday"
//             changeType="up"
//             icon={<MessageSquare size={20} color="#8B5CF6" />}
//             iconBgColor="#F5F3FF"
//           />
//         </View>

//         <View style={styles.bottomSpacer} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC',
//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   heroSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 24,
//     marginTop: 8,
//   },
//   heroLeft: {
//     flex: 1,
//   },
//   waveEmoji: {
//     fontSize: 24,
//     marginBottom: 4,
//   },
//   greeting: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   adminName: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 8,
//   },
//   heroSubtitle: {
//     fontSize: 13,
//     color: '#64748B',
//     lineHeight: 18,
//   },
//   heroRight: {
//     width: 120,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chartIllustration: {
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     gap: 6,
//     height: 80,
//   },
//   chartBar1: {
//     width: 16,
//     height: 30,
//     backgroundColor: '#6366F1',
//     borderRadius: 4,
//     opacity: 1,
//   },
//   chartBar2: {
//     width: 16,
//     height: 50,
//     backgroundColor: '#8B5CF6',
//     borderRadius: 4,
//     opacity: 1,
//   },
//   chartBar3: {
//     width: 16,
//     height: 70,
//     backgroundColor: '#6366F1',
//     borderRadius: 4,
//     opacity: 1,
//   },
//   chartBar4: {
//     width: 16,
//     height: 40,
//     backgroundColor: '#A78BFA',
//     borderRadius: 4,
//     opacity: 1,
//   },
//   quickAccessScroll: {
//     paddingBottom: 8,
//     paddingRight: 20,
//   },
//   quickCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     width: 100,
//     alignItems: 'center',
//     marginRight: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   quickIconBg: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   quickTitle: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#1E293B',
//     textAlign: 'center',
//   },
//   growthCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     padding: 20,
//     marginTop: 8,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   growthHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   growthTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   periodSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8FAFC',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     gap: 4,
//   },
//   periodText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   dropdownIcon: {
//     marginLeft: 2,
//   },
//   chartContainer: {
//     flexDirection: 'row',
//     height: 220,
//     marginBottom: 20,
//   },
//   chartYAxis: {
//     justifyContent: 'space-between',
//     paddingRight: 8,
//     height: 180,
//   },
//   chartYLabel: {
//     fontSize: 10,
//     color: '#94A3B8',
//   },
//   chartArea: {
//     flex: 1,
//     position: 'relative',
//     height: 180,
//   },
//   gridLine: {
//     position: 'absolute',
//     left: 0,
//     right: 1,
//     height: 1,
//     backgroundColor: '#F1F5F9',
//   },
//   chartLine: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     paddingHorizontal: 8,
//   },
//   chartPointContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     height: '100%',
//   },
//   chartPoint: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#6366F1',
//     position: 'absolute',
//   },
//   tooltip: {
//     position: 'absolute',
//     backgroundColor: '#1E293B',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     alignItems: 'center',
//   },
//   tooltipDate: {
//     fontSize: 9,
//     color: '#94A3B8',
//   },
//   tooltipValue: {
//     fontSize: 11,
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   chartXAxis: {
//     position: 'absolute',
//     bottom: -20,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 4,
//   },
//   chartXLabel: {
//     fontSize: 9,
//     color: '#94A3B8',
//   },
//   statsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//   },
//   statItem: {
//     flex: 1,
//     minWidth: 70,
//     alignItems: 'flex-start',
//   },
//   statIconBg: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   statLabel: {
//     fontSize: 11,
//     color: '#64748B',
//     marginBottom: 2,
//   },
//   statValue: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   statChangeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//   },
//   statChangeUp: {
//     fontSize: 10,
//     color: '#10B981',
//     fontWeight: '500',
//   },
//   statChangeDown: {
//     fontSize: 10,
//     color: '#EF4444',
//     fontWeight: '500',
//   },
//   summaryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginBottom: 24,
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function AdminDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>125</Text>
        <Text style={styles.cardLabel}>Total Students</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>18</Text>
        <Text style={styles.cardLabel}>Total Teachers</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardNumber}>₹45,000</Text>
        <Text style={styles.cardLabel}>Pending Fees</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Manage Students</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Manage Faculty</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  cardLabel: {
    marginTop: 5,
    color: '#666',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});