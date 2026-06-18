import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

// Interfaces for structured data
interface Teacher {
  id: number;
  name: string;
  department: string;
  designation: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  sender: 'student' | 'teacher';
  text: string;
  timestamp: string;
}

export default function TeacherChatScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  // States
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  
  // UI Control States
  const [loadingTeachers, setLoadingTeachers] = useState<boolean>(true);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // 1. Fetch Registered Teachers List on Mount
  useEffect(() => {
    const fetchTeachersList = async () => {
      try {
        setLoadingTeachers(true);
        const response = await axios.get('http://192.168.29.49:5000/api/student/teachers', { timeout: 6000 });
        if (response.data && response.data.success) {
          setTeachers(response.data.teachers || []);
        }
      } catch (err) {
        console.error("Error fetching teachers schema:", err);
      } finally {
        setLoadingTeachers(false);
      }
    };
    fetchTeachersList();
  }, []);

  // 2. Fetch Chat History when a Teacher is Selected
  useEffect(() => {
    if (!selectedTeacher) {
      setMessages([]);
      return;
    }

    // Yahan aap specific teacher ID ke chats load karne ke liye endpoint hit kar sakte hain
    // Filhal testing ke liye state clean placeholder simulation setup kiya h
    setMessages([
      { 
        id: 'init-1', 
        sender: 'teacher', 
        text: `Hello! I am ${selectedTeacher.name} from the ${selectedTeacher.department} department. How can I assist you today?`, 
        timestamp: '10:00 AM' 
      }
    ]);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  }, [selectedTeacher]);

  // 3. Handle Send Message Action
  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedTeacher) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'student',
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulated Response Engine for preview
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'teacher',
        text: 'Bhai, single-screen integrated architecture dropdown perfect work kar raha hai. Aap isse real database server API se link kar sakte hain.',
        timestamp: 'Just now'
      }]);
    }, 1000);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER NAV ARCHITECTURE */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backCta} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Faculty Desk</Text>
        <View style={{ width: 38 }} />
      </View>

      {/* DROPDOWN SELECTOR BAR */}
      <View style={styles.dropdownSection}>
        <Text style={styles.dropdownLabel}>Talking To:</Text>
        <TouchableOpacity 
          style={styles.dropdownTrigger} 
          onPress={() => setDropdownOpen(true)}
          activeOpacity={0.8}
        >
          {loadingTeachers ? (
            <ActivityIndicator size="small" color="#6D28D9" />
          ) : selectedTeacher ? (
            <View style={styles.selectedTeacherRow}>
              <View style={[styles.statusIndicator, { backgroundColor: selectedTeacher.isOnline ? '#10B981' : '#94A3B8' }]} />
              <Text style={styles.selectedTeacherName} numberOfLines={1}>
                {selectedTeacher.name} ({selectedTeacher.department.toUpperCase()})
              </Text>
            </View>
          ) : (
            <Text style={styles.dropdownPlaceholder}>-- Choose a Teacher --</Text>
          )}
          <Feather name="chevron-down" size={16} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* CENTRAL CONVERSATION WORKSPACE */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {selectedTeacher ? (
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatCanvas}
            showsVerticalScrollIndicator={false}
          >
            {messages.map((msg) => {
              const isStudent = msg.sender === 'student';
              return (
                <View key={msg.id} style={[styles.msgRow, isStudent ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
                  <View style={[styles.msgBubble, isStudent ? styles.studentBubble : styles.teacherBubble]}>
                    <Text style={[styles.msgText, isStudent ? { color: '#FFFFFF' } : { color: '#0F172A' }]}>
                      {msg.text}
                    </Text>
                    <Text style={[styles.msgTime, isStudent ? { color: '#E0E7FF' } : { color: '#94A3B8' }]}>
                      {msg.timestamp}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.illustrationCircle}>
              <FontAwesome5 name="comments" size={40} color="#6D28D9" />
            </View>
            <Text style={styles.emptyTitle}>No Faculty Selected</Text>
            <Text style={styles.emptySubtitle}>Bhai, upar dropdown menu par click karke kisi bhi registered teacher ko select karo aur direct chat shuru karo.</Text>
          </View>
        )}

        {/* BOTTOM INPUT BAR */}
        <View style={[styles.inputDockRow, !selectedTeacher && { opacity: 0.5 }]} pointerEvents={selectedTeacher ? 'auto' : 'none'}>
          <View style={styles.inputWrapperField}>
            <TextInput
              style={styles.textInputTerminal}
              placeholder={selectedTeacher ? `Message ${selectedTeacher.name}...` : "Select a teacher first..."}
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
          </View>
          <TouchableOpacity
            style={[styles.sendButtonCircle, { backgroundColor: inputText.trim() ? '#6D28D9' : '#E2E8F0' }]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={16} color={inputText.trim() ? '#FFFFFF' : '#94A3B8'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* MODAL POPUP FOR CLEAN DROPDOWN LIST SELECTION */}
      <Modal
        visible={dropdownOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.dropdownModalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitleText}>Select Faculty Member</Text>
              <TouchableOpacity onPress={() => setDropdownOpen(false)}>
                <Ionicons name="close-circle" size={22} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {teachers.length === 0 ? (
              <View style={styles.modalEmptyBox}>
                <Text style={styles.modalEmptyText}>No registered teachers found.</Text>
              </View>
            ) : (
              <FlatList
                data={teachers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.teacherItemRow,
                      selectedTeacher?.id === item.id && { backgroundColor: '#F3E8FF' }
                    ]}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedTeacher(item);
                      setDropdownOpen(false);
                    }}
                  >
                    <View style={styles.itemLeftBlock}>
                      <View style={[styles.itemOnlineDot, { backgroundColor: item.isOnline ? '#10B981' : '#CBD5E1' }]} />
                      <View>
                        <Text style={styles.itemNameText}>{item.name}</Text>
                        <Text style={styles.itemSubText}>{item.designation} • {item.department.toUpperCase()}</Text>
                      </View>
                    </View>
                    {selectedTeacher?.id === item.id && (
                      <Ionicons name="checkmark-circle" size={20} color="#6D28D9" />
                    )}
                  </TouchableOpacity>
                )}
                style={{ maxHeight: 350 }}
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
  },
  backCta: {
    width: 38, height: 38, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0',
    justifyContent: 'center', alignItems: 'center'
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  dropdownSection: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', gap: 10
  },
  dropdownLabel: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  dropdownTrigger: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10,
    paddingHorizontal: 12, height: 38
  },
  dropdownPlaceholder: { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
  selectedTeacherRow: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 8 },
  statusIndicator: { width: 8, height: 8, borderRadius: 4 },
  selectedTeacherName: { fontSize: 13, fontWeight: '600', color: '#0F172A', flex: 1 },
  chatCanvas: { padding: 16, paddingBottom: 30, gap: 14 },
  msgRow: { flexDirection: 'row', width: '100%', marginBottom: 2 },
  msgBubble: { maxWidth: '80%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16 },
  studentBubble: { backgroundColor: '#6D28D9', borderTopRightRadius: 2 },
  teacherBubble: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 2, borderWidth: 1, borderColor: '#E2E8F0' },
  msgText: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  msgTime: { fontSize: 9, textAlign: 'right', marginTop: 4, fontWeight: '500' },
  emptyStateContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  illustrationCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  emptySubtitle: { fontSize: 12, color: '#64748B', textAlign: 'center', marginTop: 6, lineHeight: 18 },
  inputDockRow: {
    flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFFFFF',
    borderTopWidth: 1, borderTopColor: '#F1F5F9', gap: 10
  },
  inputWrapperField: {
    flex: 1, backgroundColor: '#F8FAFC', borderRadius: 20, paddingHorizontal: 16,
    maxHeight: 100, justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0'
  },
  textInputTerminal: { fontSize: 14, color: '#0F172A', paddingVertical: 8, fontWeight: '500' },
  sendButtonCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.4)', justifyContent: 'center', padding: 20 },
  dropdownModalCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 10 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  modalTitleText: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  modalEmptyBox: { padding: 20, alignItems: 'center' },
  modalEmptyText: { color: '#64748B', fontSize: 13 },
  teacherItemRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 12, marginBottom: 4 },
  itemLeftBlock: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  itemOnlineDot: { width: 8, height: 8, borderRadius: 4 },
  itemNameText: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  itemSubText: { fontSize: 11, color: '#64748B', marginTop: 2 }
});