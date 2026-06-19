// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   Users,
//   UserPlus,
//   Layers,
//   Search,
//   SlidersHorizontal,
//   TrendingUp,
//   TrendingDown,
//   ChevronRight,
//   ArrowRight,
//   CircleDot,
// } from 'lucide-react-native';
// import AdminHeader from '@/components/AdminHeader';
// import SectionHeader from '@/components/SectionHeader';
// import QuickAccessCard from '@/components/QuickAccessCard';
// import { useState } from 'react';

// const { width } = Dimensions.get('window');

// const recentAdmissions = [
//   { name: 'Rahul Sharma', batch: 'Batch 11A', date: '18 Jun 2025', status: 'Active' },
//   { name: 'Priya Patel', batch: 'Batch 12B', date: '17 Jun 2025', status: 'Active' },
//   { name: 'Amit Kumar', batch: 'Batch 10A', date: '16 Jun 2025', status: 'Pending' },
//   { name: 'Sneha Gupta', batch: 'Batch 11B', date: '15 Jun 2025', status: 'Active' },
//   { name: 'Vikram Singh', batch: 'Batch 12A', date: '14 Jun 2025', status: 'Inactive' },
// ];

// const batchDistribution = [
//   { name: 'Batch 10A', students: 32, color: '#6366F1' },
//   { name: 'Batch 11A', students: 28, color: '#8B5CF6' },
//   { name: 'Batch 11B', students: 24, color: '#3B82F6' },
//   { name: 'Batch 12A', students: 20, color: '#10B981' },
//   { name: 'Batch 12B', students: 18, color: '#F59E0B' },
// ];

// export default function StudentManagementScreen() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All');

//   const filters = ['All', 'Batch', 'Status', 'Class'];

//   return (
//     <SafeAreaView style={styles.container} edges={['top']}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <AdminHeader
//           title="Student Management"
//           subtitle="Manage students, admissions and batches"
//           notificationCount={5}
//         />

//         {/* Overview Stats */}
//         <View style={styles.statsRow}>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#EEF2FF' }]}>
//               <Users size={20} color="#6366F1" />
//             </View>
//             <Text style={styles.overviewValue}>1,248</Text>
//             <Text style={styles.overviewLabel}>Total Students</Text>
//             <View style={styles.overviewChange}>
//               <TrendingUp size={12} color="#10B981" />
//               <Text style={styles.overviewChangeText}>8.2%</Text>
//             </View>
//           </View>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#ECFDF5' }]}>
//               <CircleDot size={20} color="#10B981" />
//             </View>
//             <Text style={styles.overviewValue}>1,156</Text>
//             <Text style={styles.overviewLabel}>Active Students</Text>
//             <View style={styles.overviewChange}>
//               <TrendingUp size={12} color="#10B981" />
//               <Text style={styles.overviewChangeText}>5.1%</Text>
//             </View>
//           </View>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#FEF2F2' }]}>
//               <CircleDot size={20} color="#EF4444" />
//             </View>
//             <Text style={styles.overviewValue}>92</Text>
//             <Text style={styles.overviewLabel}>Inactive Students</Text>
//             <View style={styles.overviewChange}>
//               <TrendingDown size={12} color="#EF4444" />
//               <Text style={[styles.overviewChangeText, { color: '#EF4444' }]}>2.3%</Text>
//             </View>
//           </View>
//           <View style={styles.overviewCard}>
//             <View style={[styles.overviewIconBg, { backgroundColor: '#F5F3FF' }]}>
//               <Layers size={20} color="#8B5CF6" />
//             </View>
//             <Text style={styles.overviewValue}>24</Text>
//             <Text style={styles.overviewLabel}>Total Batches</Text>
//             <View style={styles.overviewChange}>
//               <TrendingUp size={12} color="#10B981" />
//               <Text style={styles.overviewChangeText}>4.0%</Text>
//             </View>
//           </View>
//         </View>

//         {/* Functions */}
//         <SectionHeader title="Functions" />
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.functionsScroll}
//         >
//           <QuickAccessCard
//             title="Add Student"
//             description="Add new students to the institute"
//             icon={<UserPlus size={22} color="#6366F1" />}
//             iconBgColor="#EEF2FF"
//             accentColor="#6366F1"
//           />
//           <QuickAccessCard
//             title="Batch Allocation"
//             description="Assign students to batches"
//             icon={<Layers size={22} color="#10B981" />}
//             iconBgColor="#ECFDF5"
//             accentColor="#10B981"
//           />
//           <QuickAccessCard
//             title="Admission Management"
//             description="Track and manage admissions"
//             icon={<Users size={22} color="#F59E0B" />}
//             iconBgColor="#FFF7ED"
//             accentColor="#F59E0B"
//           />
//           <QuickAccessCard
//             title="Student Reports"
//             description="View performance reports"
//             icon={<ArrowRight size={22} color="#8B5CF6" />}
//             iconBgColor="#F5F3FF"
//             accentColor="#8B5CF6"
//           />
//         </ScrollView>

//         {/* Search & Filters */}
//         <View style={styles.searchContainer}>
//           <View style={styles.searchWrapper}>
//             <Search size={18} color="#94A3B8" style={styles.searchIcon} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search students..."
//               placeholderTextColor="#94A3B8"
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//           </View>
//           <TouchableOpacity style={styles.filterButton}>
//             <SlidersHorizontal size={18} color="#6366F1" />
//           </TouchableOpacity>
//         </View>

//         {/* Filter Chips */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.filterScroll}
//         >
//           {filters.map((filter) => (
//             <TouchableOpacity
//               key={filter}
//               style={[
//                 styles.filterChip,
//                 activeFilter === filter && styles.filterChipActive,
//               ]}
//               onPress={() => setActiveFilter(filter)}
//             >
//               <Text
//                 style={[
//                   styles.filterChipText,
//                   activeFilter === filter && styles.filterChipTextActive,
//                 ]}
//               >
//                 {filter}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         {/* Recent Admissions */}
//         <SectionHeader title="Recent Admissions" actionText="View All" />
//         <View style={styles.admissionsList}>
//           {recentAdmissions.map((student, index) => (
//             <View key={index} style={styles.admissionItem}>
//               <View style={styles.admissionAvatar}>
//                 <Text style={styles.admissionAvatarText}>
//                   {student.name.charAt(0)}
//                 </Text>
//               </View>
//               <View style={styles.admissionInfo}>
//                 <Text style={styles.admissionName}>{student.name}</Text>
//                 <Text style={styles.admissionMeta}>
//                   {student.batch} · {student.date}
//                 </Text>
//               </View>
//               <View
//                 style={[
//                   styles.admissionStatus,
//                   {
//                     backgroundColor:
//                       student.status === 'Active'
//                         ? '#ECFDF5'
//                         : student.status === 'Pending'
//                         ? '#FFF7ED'
//                         : '#FEF2F2',
//                   },
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.admissionStatusText,
//                     {
//                       color:
//                         student.status === 'Active'
//                           ? '#10B981'
//                           : student.status === 'Pending'
//                           ? '#F59E0B'
//                           : '#EF4444',
//                     },
//                   ]}
//                 >
//                   {student.status}
//                 </Text>
//               </View>
//               <ChevronRight size={16} color="#CBD5E1" />
//             </View>
//           ))}
//         </View>

//         {/* Batch Distribution */}
//         <SectionHeader title="Batch Distribution" />
//         <View style={styles.batchCard}>
//           {batchDistribution.map((batch, index) => (
//             <View key={index} style={styles.batchItem}>
//               <View style={styles.batchLeft}>
//                 <View
//                   style={[
//                     styles.batchDot,
//                     { backgroundColor: batch.color },
//                   ]}
//                 />
//                 <Text style={styles.batchName}>{batch.name}</Text>
//               </View>
//               <View style={styles.batchRight}>
//                 <View style={styles.batchBarContainer}>
//                   <View
//                     style={[
//                       styles.batchBar,
//                       {
//                         backgroundColor: batch.color,
//                         width: `${(batch.students / 32) * 100}%`,
//                       },
//                     ]}
//                   />
//                 </View>
//                 <Text style={styles.batchCount}>{batch.students}</Text>
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
//   statsRow: {
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
//     marginBottom: 12,
//   },
//   overviewValue: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#1E293B',
//     marginBottom: 4,
//   },
//   overviewLabel: {
//     fontSize: 12,
//     color: '#64748B',
//     marginBottom: 4,
//   },
//   overviewChange: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//   },
//   overviewChangeText: {
//     fontSize: 11,
//     color: '#10B981',
//     fontWeight: '500',
//   },
//   functionsScroll: {
//     paddingBottom: 8,
//     paddingRight: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginTop: 20,
//     marginBottom: 12,
//   },
//   searchWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 1,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: '#1E293B',
//     paddingVertical: 12,
//   },
//   filterButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 1,
//   },
//   filterScroll: {
//     paddingBottom: 8,
//     marginBottom: 8,
//   },
//   filterChip: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E2E8F0',
//     marginRight: 8,
//   },
//   filterChipActive: {
//     backgroundColor: '#6366F1',
//     borderColor: '#6366F1',
//   },
//   filterChipText: {
//     fontSize: 12,
//     color: '#64748B',
//     fontWeight: '500',
//   },
//   filterChipTextActive: {
//     color: '#FFFFFF',
//   },
//   admissionsList: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   admissionItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F1F5F9',
//   },
//   admissionAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#6366F1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   admissionAvatarText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: '600',
//   },
//   admissionInfo: {
//     flex: 1,
//   },
//   admissionName: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1E293B',
//     marginBottom: 2,
//   },
//   admissionMeta: {
//     fontSize: 12,
//     color: '#94A3B8',
//   },
//   admissionStatus: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginRight: 8,
//   },
//   admissionStatusText: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   batchCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   batchItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   batchLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: 100,
//   },
//   batchDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   batchName: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: '#1E293B',
//   },
//   batchRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   batchBarContainer: {
//     flex: 1,
//     height: 8,
//     backgroundColor: '#F1F5F9',
//     borderRadius: 4,
//     marginRight: 10,
//     overflow: 'hidden',
//   },
//   batchBar: {
//     height: '100%',
//     borderRadius: 4,
//   },
//   batchCount: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#1E293B',
//     width: 30,
//     textAlign: 'right',
//   },
//   bottomSpacer: {
//     height: 20,
//   },
// });
