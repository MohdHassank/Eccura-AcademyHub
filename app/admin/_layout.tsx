// import { Tabs } from 'expo-router';
// import { Home, Users, GraduationCap, IndianRupee, BarChart3 } from 'lucide-react-native';

// export default function AdminTabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#FFFFFF',
//           borderTopWidth: 1,
//           borderTopColor: '#F1F5F9',
//           height: 64,
//           paddingBottom: 8,
//           paddingTop: 8,
//           elevation: 8,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: -2 },
//           shadowOpacity: 0.05,
//           shadowRadius: 8,
//         },
//         tabBarActiveTintColor: '#6366F1',
//         tabBarInactiveTintColor: '#94A3B8',
//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: '500',
//           marginTop: 2,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Dashboard',
//           tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="students"
//         options={{
//           title: 'Students',
//           tabBarIcon: ({ size, color }) => <Users size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="academics"
//         options={{
//           title: 'Academics',
//           tabBarIcon: ({ size, color }) => <GraduationCap size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="finance"
//         options={{
//           title: 'Finance',
//           tabBarIcon: ({ size, color }) => <IndianRupee size={size} color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="reports"
//         options={{
//           title: 'Reports',
//           tabBarIcon: ({ size, color }) => <BarChart3 size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }
