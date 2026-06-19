// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   FileText,
//   Download,
//   Calendar,
//   ChevronRight,
//   TrendingUp,
//   TrendingDown,
//   Users,
//   GraduationCap,
//   IndianRupee,
//   BookOpen,
//   BarChart3,
//   PieChart,
//   Activity,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import SectionHeader from '@/components/SectionHeader';

// const reportCategories = [
//   { title: 'Student Reports', icon: Users, color: '#6366F1', bgColor: '#EEF2FF', count: 12 },
//   { title: 'Faculty Reports', icon: GraduationCap, color: '#10B981', bgColor: '#ECFDF5', count: 8 },
//   { title: 'Financial Reports', icon: IndianRupee, color: '#F59E0B', bgColor: '#FFF7ED', count: 6 },
//   { title: 'Academic Reports', icon: BookOpen, color: '#8B5CF6', bgColor: '#F5F3FF', count: 10 },
//   { title: 'Attendance Reports', icon: Activity, color: '#3B82F6', bgColor: '#DBEAFE', count: 15 },
//   { title: 'Performance Reports', icon: BarChart3, color: '#EC4899', bgColor: '#FCE7F3', count: 9 },
// ];

// const recentReports = [
//   { name: 'Monthly Student Performance', type: 'Academic', date: '18 Jun 2025', status: 'Generated' },
//   { name: 'Quarterly Fee Collection', type: 'Financial', date: '17 Jun 2025', status: 'Generated' },
//   { name: 'Faculty Attendance Summary', type: 'Attendance', date: '16 Jun 2025', status: 'Pending' },
//   { name: 'Batch Wise Progress Report', type: 'Academic', date: '15 Jun 2025', status: 'Generated' },
//   { name: 'Admission Analysis Q2', type: 'Student', date: '14 Jun 2025', status: 'Generated' },
// ];

// export default function ReportsScreen() {
//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="Reports"
//           subtitle="Generate and manage institute reports"
//           notificationCount={2}
//         />

//         {/* Report Categories */}
//         <SectionHeader title="Report Categories" />
//         <View style={styles.categoriesGrid}>
//           {reportCategories.map((cat, index) => (
//             <TouchableOpacity key={index} style={styles.categoryCard}>
//               <View style={[styles.categoryIconBg, { backgroundColor: cat.bgColor }]}>
//                 <cat.icon size={22} color={cat.color} />
//               </View>
//               <Text style={styles.categoryTitle}>{cat.title}</Text>
//               <Text style={styles.categoryCount}>{cat.count} reports</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Quick Stats */}
//         <SectionHeader title="Quick Stats" />
//         <View style={styles.quickStatsRow}>
//           <View style={styles.quickStatCard}>
//             <Text style={styles.quickStatValue}>60</Text>
//             <Text style={styles.quickStatLabel}>Total Reports</Text>
//           </View>
//           <View style={styles.quickStatCard}>
//             <Text style={styles.quickStatValue}>48</Text>
//             <Text style={styles.quickStatLabel}>Generated</Text>
//           </View>
//           <View style={styles.quickStatCard}>
//             <Text style={styles.quickStatValue}>12</Text>
//             <Text style={styles.quickStatLabel}>Pending</Text>
//           </View>
//         </View>

//         {/* Recent Reports */}
//         <SectionHeader title="Recent Reports" actionText="View All" />
//         <View style={styles.reportsCard}>
//           {recentReports.map((report, index) => (
//             <View key={index} style={[styles.reportItem, index < recentReports.length - 1 && styles.reportItemBorder]}>
//               <View style={[styles.reportIconBg, { backgroundColor: '#EEF2FF' }]}>
//                 <FileText size={16} color="#6366F1" />
//               </View>
//               <View style={styles.reportInfo}>
//                 <Text style={styles.reportName}>{report.name}</Text>
//                 <Text style={styles.reportMeta}>{report.type} · {report.date}</Text>
//               </View>
//               <View style={styles.reportRight}>
//                 <View style={[styles.reportStatus, { 
//                   backgroundColor: report.status === 'Generated' ? '#ECFDF5' : '#FFF7ED' 
//                 }]}>
//                   <Text style={[styles.reportStatusText, { 
//                     color: report.status === 'Generated' ? '#10B981' : '#F59E0B' 
//                   }]}>
//                     {report.status}
//                   </Text>
//                 </View>
//                 <TouchableOpacity style={styles.downloadButton}>
//                   <Download size={16} color="#6366F1" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
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
//   categoriesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginBottom: 24,
//   },
//   categoryCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     width: (Dimensions.get('window').width - 64) / 2,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   categoryIconBg: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   categoryTitle: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#1E293B',
//     textAlign: 'center',
//     marginBottom: 4,
//   },
//   categoryCount: {
//     fontSize: 11,
//     color: '#94A3B8',
//   },
//   quickStatsRow: {
//     flexDirection: 'row',
//     gap: 12,
//     marginBottom: 24,
//   },
//   quickStatCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     flex: 1,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   quickStatValue: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   quickStatLabel: {
//     fontSize: 12,
//     color: '#64748B',
//   },
//   reportsCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   reportItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   reportItemBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   reportIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   reportInfo: {
//     flex: 1,
//   },
//   reportName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   reportMeta: {
//     fontSize: 12,
//     color: '#94A3B8',
//   },
//   reportRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   reportStatus: {
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 8,
//   },
//   reportStatusText: {
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   downloadButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: '#F8FAFC',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });
