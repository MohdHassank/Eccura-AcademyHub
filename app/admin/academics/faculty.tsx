// import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';
// import {
//   Users,
//   UserPlus,
//   Wallet,
//   TrendingUp,
//   TrendingDown,
//   BarChart3,
//   Calendar,
//   ArrowRight,
//   ChevronRight,
//   Star,
//   Clock,
//   BookOpen,
//   CheckCircle,
//   MapPin,
//   School,
//   UserCheck,
//   BarChart2,
//   MessageSquare,
//   Award,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import SectionHeader from '@/components/SectionHeader';
// import QuickAccessCard from '@/components/QuickAccessCard';

// const facultyOverview = [
//   { title: 'Classes Taken', value: '248', change: '12.5%', changeType: 'up' as const, icon: <BookOpen size={18} color="#6366F1" />, iconBgColor: '#EEF2FF' },
//   { title: 'Avg. Attendance', value: '92%', change: '8.4%', changeType: 'up' as const, icon: <UserCheck size={18} color="#10B981" />, iconBgColor: '#ECFDF5' },
//   { title: 'Feedback Score', value: '4.6/5', change: '5.2%', changeType: 'down' as const, icon: <Star size={18} color="#F59E0B" />, iconBgColor: '#FFF7ED' },
//   { title: 'Active Subjects', value: '38', change: '7.1%', changeType: 'up' as const, icon: <CheckCircle size={18} color="#8B5CF6" />, iconBgColor: '#F5F3FF' },
// ];

// const topFaculty = [
//   { name: 'Dr. Neha Sharma', dept: 'Physics Department', classes: 28, attendance: '95%', trend: '5%', rating: '4.9/5', stars: 5 },
//   { name: 'Prof. Rahul Verma', dept: 'Maths Department', classes: 26, attendance: '93%', trend: '6%', rating: '4.8/5', stars: 5 },
//   { name: 'Prof. Anjali Mehta', dept: 'Chemistry Department', classes: 24, attendance: '91%', trend: '4%', rating: '4.7/5', stars: 4 },
//   { name: 'Prof. Sandeep Singh', dept: 'Computer Science', classes: 22, attendance: '90%', trend: '7%', rating: '4.6/5', stars: 4 },
//   { name: 'Prof. Vivek Patel', dept: 'English Department', classes: 20, attendance: '89%', trend: '3%', rating: '4.5/5', stars: 4 },
// ];

// const todaysTimetable = [
//   { time: '09:00 AM - 10:00 AM', class: 'Class 10A - Mathematics', teacher: 'Prof. Rahul Verma', room: 'Room 201', icon: <School size={14} color="#6366F1" /> },
//   { time: '11:00 AM - 12:00 PM', class: 'Class 11B - Chemistry', teacher: 'Prof. Anjali Mehta', room: 'Lab 3', icon: <FlaskConical size={14} color="#10B981" /> },
//   { time: '02:00 PM - 03:00 PM', class: 'Class 12A - Computer Science', teacher: 'Prof. Sandeep Singh', room: 'Lab 1', icon: <BarChart2 size={14} color="#F59E0B" /> },
// ];

// const todayGlance = [
//   { label: 'Total Classes', value: '6' },
//   { label: 'Classes Completed', value: '3' },
//   { label: 'Classes Remaining', value: '3' },
//   { label: 'Subjects Teaching', value: '4' },
// ];

// import { FlaskConical } from 'lucide-react-native';

// export default function FacultyManagementScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="Faculty Management"
//           subtitle="Empowering educators, enhancing performance"
//           notificationCount={5}
//         />

//         {/* Faculty Stats Hero */}
//         <View style={styles.heroCard}>
//           <View style={styles.heroLeft}>
//             <View style={styles.facultyCircle}>
//               <View style={styles.circleOuter}>
//                 <View style={styles.circleInner}>
//                   <Users size={32} color="#6366F1" />
//                 </View>
//               </View>
//             </View>
//             <View style={styles.heroStats}>
//               <View style={styles.heroStat}>
//                 <Text style={styles.heroStatLabel}>Total Faculty</Text>
//                 <Text style={styles.heroStatValue}>52</Text>
//                 <View style={styles.heroStatChange}>
//                   <TrendingUp size={12} color="#10B981" />
//                   <Text style={styles.heroStatChangeText}>12.5% vs last month</Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//           <View style={styles.heroRight}>
//             <View style={styles.statusCard}>
//               <View style={[styles.statusIconBg, { backgroundColor: '#EEF2FF' }]}>
//                 <UserCheck size={16} color="#6366F1" />
//               </View>
//               <View>
//                 <Text style={styles.statusValue}>44</Text>
//                 <Text style={styles.statusLabel}>Active</Text>
//               </View>
//             </View>
//             <View style={styles.statusCard}>
//               <View style={[styles.statusIconBg, { backgroundColor: '#FFF7ED' }]}>
//                 <Clock size={16} color="#F59E0B" />
//               </View>
//               <View>
//                 <Text style={styles.statusValue}>8</Text>
//                 <Text style={styles.statusLabel}>On Leave</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Functions */}
//         <SectionHeader title="Faculty Management Functions" />
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.functionsScroll}
//         >
//           <QuickAccessCard
//             title="Add Teachers"
//             description="Add new faculty members to your institute"
//             icon={<UserPlus size={22} color="#6366F1" />}
//             iconBgColor="#EEF2FF"
//             accentColor="#6366F1"
//           />
//           <QuickAccessCard
//             title="Salary Management"
//             description="Manage salaries, allowances and payment history"
//             icon={<Wallet size={22} color="#10B981" />}
//             iconBgColor="#ECFDF5"
//             accentColor="#10B981"
//           />
//           <QuickAccessCard
//             title="Faculty Performance"
//             description="Track performance, reviews and achievements"
//             icon={<BarChart3 size={22} color="#F59E0B" />}
//             iconBgColor="#FFF7ED"
//             accentColor="#F59E0B"
//           />
//           <QuickAccessCard
//             title="Timetable Allocation"
//             description="Allocate classes and manage faculty timetables"
//             icon={<Calendar size={22} color="#8B5CF6" />}
//             iconBgColor="#F5F3FF"
//             accentColor="#8B5CF6"
//           />
//         </ScrollView>

//         {/* Faculty Overview */}
//         <SectionHeader title="Faculty Overview" actionText="This Month" />
//         <View style={styles.overviewGrid}>
//           {facultyOverview.map((item, index) => (
//             <View key={index} style={styles.overviewCard}>
//               <View style={[styles.overviewIconBg, { backgroundColor: item.iconBgColor }]}>
//                 {item.icon}
//               </View>
//               <Text style={styles.overviewLabel}>{item.title}</Text>
//               <Text style={styles.overviewValue}>{item.value}</Text>
//               <View style={styles.overviewChange}>
//                 {item.changeType === 'up' ? (
//                   <TrendingUp size={12} color="#10B981" />
//                 ) : (
//                   <TrendingDown size={12} color="#EF4444" />
//                 )}
//                 <Text
//                   style={[
//                     styles.overviewChangeText,
//                     { color: item.changeType === 'up' ? '#10B981' : '#EF4444' },
//                   ]}
//                 >
//                   {item.change} vs last month
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* Top Performing Faculty */}
//         <SectionHeader title="Top Performing Faculty" actionText="View All" />
//         <View style={styles.facultyTableCard}>
//           <View style={styles.tableHeader}>
//             <Text style={[styles.tableHeaderText, { flex: 2 }]}>Faculty</Text>
//             <Text style={[styles.tableHeaderText, { flex: 1 }]}>Dept</Text>
//             <Text style={[styles.tableHeaderText, { flex: 1 }]}>Classes</Text>
//             <Text style={[styles.tableHeaderText, { flex: 1 }]}>Attendance</Text>
//             <Text style={[styles.tableHeaderText, { flex: 1 }]}>Rating</Text>
//           </View>
//           {topFaculty.map((faculty, index) => (
//             <View key={index} style={[styles.tableRow, index < topFaculty.length - 1 && styles.tableRowBorder]}>
//               <View style={[styles.tableCell, { flex: 2 }]}>
//                 <View style={styles.facultyAvatar}>
//                   <Text style={styles.facultyAvatarText}>{faculty.name.charAt(0)}</Text>
//                 </View>
//                 <View>
//                   <Text style={styles.facultyName}>{faculty.name}</Text>
//                   <Text style={styles.facultyDept}>{faculty.dept}</Text>
//                 </View>
//               </View>
//               <Text style={[styles.tableCellText, { flex: 1 }]}>{faculty.classes}</Text>
//               <Text style={[styles.tableCellText, { flex: 1 }]}>{faculty.attendance}</Text>
//               <View style={[styles.tableCell, { flex: 1 }]}>
//                 <View style={styles.trendBadge}>
//                   <TrendingUp size={10} color="#10B981" />
//                   <Text style={styles.trendText}>{faculty.trend}</Text>
//                 </View>
//               </View>
//               <View style={[styles.tableCell, { flex: 1 }]}>
//                 <View style={styles.ratingContainer}>
//                   <Text style={styles.ratingText}>{faculty.rating}</Text>
//                   <View style={styles.starsRow}>
//                     {Array.from({ length: faculty.stars }).map((_, i) => (
//                       <Star key={i} size={10} color="#F59E0B" fill="#F59E0B" />
//                     ))}
//                   </View>
//                 </View>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* View Performance Report Button */}
//         <TouchableOpacity style={styles.viewReportButton}>
//           <Text style={styles.viewReportText}>View Performance Report</Text>
//           <ArrowRight size={16} color="#6366F1" />
//         </TouchableOpacity>

//         {/* Today's Timetable */}
//         <View style={styles.timetableSection}>
//           <View style={styles.timetableLeft}>
//             <SectionHeader title="Today's Timetable Overview" />
//             <View style={styles.timetableCard}>
//               {todaysTimetable.map((item, index) => (
//                 <View key={index} style={[styles.timetableItem, index < todaysTimetable.length - 1 && styles.timetableItemBorder]}>
//                   <View style={styles.timetableTimeCol}>
//                     <Text style={styles.timetableTime}>{item.time.split(' - ')[0]}</Text>
//                     <Text style={styles.timetableTimeEnd}>{item.time.split(' - ')[1]}</Text>
//                   </View>
//                   <View style={styles.timetableDivider} />
//                   <View style={styles.timetableInfo}>
//                     <View style={styles.timetableIconBg}>
//                       {item.icon}
//                     </View>
//                     <View style={styles.timetableDetails}>
//                       <Text style={styles.timetableClass}>{item.class}</Text>
//                       <Text style={styles.timetableTeacher}>{item.teacher}</Text>
//                     </View>
//                   </View>
//                   <View style={[styles.timetableRoom, { backgroundColor: item.room.includes('Lab') ? '#ECFDF5' : '#EEF2FF' }]}>
//                     <Text style={[styles.timetableRoomText, { color: item.room.includes('Lab') ? '#10B981' : '#6366F1' }]}>
//                       {item.room}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           </View>
//         </View>

//         {/* Today at a Glance */}
//         <Text style={styles.glanceTitle}>Today at a Glance</Text>
//         <View style={styles.glanceCard}>
//           {todayGlance.map((item, index) => (
//             <View key={index} style={[styles.glanceItem, index < todayGlance.length - 1 && styles.glanceItemBorder]}>
//               <View style={styles.glanceRow}>
//                 <View style={styles.glanceIconBg}>
//                   <BookOpen size={14} color="#6366F1" />
//                 </View>
//                 <Text style={styles.glanceLabel}>{item.label}</Text>
//               </View>
//               <Text style={styles.glanceValue}>{item.value}</Text>
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
//   heroCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 24,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   heroLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   facultyCircle: {
//     marginRight: 16,
//   },
//   circleOuter: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 4,
//     borderColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopColor: '#6366F1',
//     borderRightColor: '#6366F1',
//   },
//   circleInner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#F8FAFC',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heroStats: {
//     flex: 1,
//   },
//   heroStat: {
//     marginBottom: 4,
//   },
//   heroStatLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     marginBottom: 4,
//   },
//   heroStatValue: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   heroStatChange: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//   },
//   heroStatChangeText: {
//     fontSize: 11,
//     color: '#10B981',
//     fontWeight: '500',
//   },
//   heroRight: {
//     justifyContent: 'center',
//     gap: 12,
//   },
//   statusCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     backgroundColor: '#F8FAFC',
//     borderRadius: 12,
//     padding: 10,
//   },
//   statusIconBg: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statusValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   statusLabel: {
//     fontSize: 11,
//     color: '#64748B',
//   },
//   functionsScroll: {
//     paddingBottom: 8,
//     paddingRight: 20,
//   },
//   overviewGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 12,
//     marginBottom: 24,
//   },
//   overviewCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     flex: 1,
//     minWidth: 140,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   overviewIconBg: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   overviewLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     marginBottom: 4,
//   },
//   overviewValue: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   overviewChange: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//   },
//   overviewChangeText: {
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   facultyTableCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//     marginBottom: 10,
//   },
//   tableHeaderText: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#94A3B8',
//   },
//   tableRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   tableRowBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   tableCell: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   tableCellText: {
//     fontSize: 12,
//     color: '#1E293B',
//     fontWeight: '500',
//   },
//   facultyAvatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   facultyAvatarText: {
//     color: '#FFFFFF',
//     fontSize: 13,
//     fontWeight: '600',
//   },
//   facultyName: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   facultyDept: {
//     fontSize: 11,
//     color: '#94A3B8',
//   },
//   trendBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//     backgroundColor: '#ECFDF5',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//   },
//   trendText: {
//     fontSize: 10,
//     color: '#10B981',
//     fontWeight: '600',
//   },
//   ratingContainer: {
//     alignItems: 'flex-start',
//   },
//   ratingText: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   starsRow: {
//     flexDirection: 'row',
//     gap: 1,
//   },
//   viewReportButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 6,
//     backgroundColor: '#EEF2FF',
//     borderRadius: 12,
//     paddingVertical: 12,
//     marginTop: 12,
//     marginBottom: 24,
//   },
//   viewReportText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#6366F1',
//   },
//   timetableSection: {
//     marginBottom: 24,
//   },
//   timetableLeft: {
//     marginBottom: 16,
//   },
//   timetableCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   timetableItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   timetableItemBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   timetableTimeCol: {
//     width: 80,
//   },
//   timetableTime: {
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#1E293B',
//   },
//   timetableTimeEnd: {
//     fontSize: 11,
//     color: '#94A3B8',
//   },
//   timetableDivider: {
//     width: 2,
//     height: 40,
//     backgroundColor: '#E2E8F0',
//     marginHorizontal: 12,
//   },
//   timetableInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   timetableIconBg: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: '#F8FAFC',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   timetableDetails: {
//     flex: 1,
//   },
//   timetableClass: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   timetableTeacher: {
//     fontSize: 11,
//     color: '#94A3B8',
//   },
//   timetableRoom: {
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },
//   timetableRoomText: {
//     fontSize: 10,
//     fontWeight: '600',
//   },
//   glanceTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 12,
//   },
//   glanceCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   glanceItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   glanceItemBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   glanceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   glanceIconBg: {
//     width: 28,
//     height: 28,
//     borderRadius: 8,
//     backgroundColor: '#EEF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   glanceLabel: {
//     fontSize: 13,
//     color: '#64748B',
//   },
//   glanceValue: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#1E293B',
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });
