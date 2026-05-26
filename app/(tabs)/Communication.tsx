import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform,
  Dimensions
} from 'react-native';
import { 
  Ionicons, 
  MaterialCommunityIcons, 
  FontAwesome5, 
  Feather, 
  MaterialIcons 
} from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CommunicationScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. TOP NAVBAR HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="menu" size={22} color="#1E293B" />
        </TouchableOpacity>
        
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
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 2. TITLE SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Communication</Text>
          <Text style={styles.pageSubtitle}>One place for everything that keeps you connected.</Text>
        </View>

        {/* 3. HORIZONTAL STATS ROW (Notices, Announcements, Replies, Doubts) */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.statsRow}
          contentContainerStyle={styles.statsRowContent}
        >
          <TouchableOpacity style={styles.statPill}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#EFF6FF' }]}><MaterialIcons name="description" size={18} color="#2563EB" /></View>
            <View><Text style={styles.statNum}>05</Text><Text style={styles.statLabel}>New Notices</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statPill}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#ECFDF5' }]}><Ionicons name="megaphone-outline" size={18} color="#10B981" /></View>
            <View><Text style={styles.statNum}>03</Text><Text style={styles.statLabel}>Announcements</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statPill}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F5F3FF' }]}><MaterialCommunityIcons name="message-reply-text-outline" size={18} color="#8B5CF6" /></View>
            <View><Text style={styles.statNum}>02</Text><Text style={styles.statLabel}>Teacher Replies</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statPill}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#FFF7ED' }]}><Feather name="help-circle" size={18} color="#F97316" /></View>
            <View><Text style={styles.statNum}>1</Text><Text style={styles.statLabel}>Doubts Pending</Text></View>
          </TouchableOpacity>
        </ScrollView>

        {/* 4. TWO-COLUMN SPLIT GRID (Notices & Announcements) */}
        <View style={styles.gridContainer}>
          {/* Left Card: Notices */}
          <View style={styles.halfCard}>
            <Text style={styles.cardMainTitle}>Notices</Text>
            <Text style={styles.cardSubTitle}>Official notices and circulars from your institution.</Text>
            
            {/* Visual Placeholder Graphic simulation */}
            <View style={styles.cardGraphicCenter}>
              <View style={styles.docGraphicBase}>
                <MaterialCommunityIcons name="file-document-outline" size={42} color="#3B82F6" />
                <View style={styles.docGraphicAlertBadge}><Ionicons name="notifications" size={12} color="#FFFFFF" /></View>
              </View>
            </View>

            <TouchableOpacity style={styles.textActionButton}>
              <Text style={[styles.textActionBtnText, { color: '#2563EB' }]}>View All Notices</Text>
              <Feather name="arrow-right" size={14} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Right Card: Announcements */}
          <View style={styles.halfCard}>
            <Text style={styles.cardMainTitle}>Announcements</Text>
            <Text style={styles.cardSubTitle}>Important updates and news for all students.</Text>
            
            {/* Visual Placeholder Graphic simulation */}
            <View style={styles.cardGraphicCenter}>
              <View style={[styles.docGraphicBase, { borderColor: '#E6F4EA' }]}>
                <Ionicons name="megaphone" size={40} color="#10B981" />
              </View>
            </View>

            <TouchableOpacity style={[styles.textActionButton, { backgroundColor: '#E6F4EA' }]}>
              <Text style={[styles.textActionBtnText, { color: '#10B981' }]}>Explore Now</Text>
              <Feather name="arrow-right" size={14} color="#10B981" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. TWO-COLUMN SPLIT GRID (Chat with Teacher & Doubt Support) */}
        <View style={styles.gridContainer}>
          {/* Left Card: Chat with Teacher */}
          <View style={styles.halfCard}>
            <Text style={[styles.cardMainTitle, { color: '#6D28D9' }]}>Chat with Teacher</Text>
            <Text style={styles.cardSubTitle}>Direct message your teachers and get your queries resolved.</Text>
            
            {/* Avatar Chats UI Mockup */}
            <View style={styles.chatPreviewContainer}>
              <View style={styles.chatBubbleRowLeft}>
                <View style={[styles.avatarCircle, { backgroundColor: '#FEE2E2' }]}><FontAwesome5 name="user-graduate" size={12} color="#EF4444" /></View>
                <View style={styles.bubbleLeft}><View style={styles.bubbleLineShort} /><View style={styles.bubbleLineLong} /></View>
              </View>
              <View style={styles.chatBubbleRowRight}>
                <View style={styles.bubbleRight}><View style={styles.bubbleLineShortRight} /></View>
                <View style={[styles.avatarCircle, { backgroundColor: '#DBEAFE' }]}><FontAwesome5 name="user-tie" size={12} color="#2563EB" /></View>
              </View>
              <Text style={styles.typingIndicator}>●● typing...</Text>
            </View>

            <TouchableOpacity style={[styles.textActionButton, { backgroundColor: '#F3E8FF' }]}>
              <Text style={[styles.textActionBtnText, { color: '#6D28D9' }]}>Start Conversation</Text>
              <Feather name="arrow-right" size={14} color="#6D28D9" />
            </TouchableOpacity>
          </View>

          {/* Right Card: Doubt Support */}
          <View style={styles.halfCard}>
            <Text style={[styles.cardMainTitle, { color: '#C2410C' }]}>Doubt Support</Text>
            <Text style={styles.cardSubTitle}>Post your doubts and get step-by-step solutions.</Text>
            
            {/* Doubt Box UI Graphic Mockup */}
            <View style={styles.cardGraphicCenter}>
              <View style={styles.doubtContainerGraphic}>
                <FontAwesome5 name="question-circle" size={34} color="#F97316" />
                <View style={styles.doubtOrangeShadowCircle}><Text style={styles.doubtQuestionMarkText}>?</Text></View>
              </View>
            </View>

            <TouchableOpacity style={[styles.textActionButton, { backgroundColor: '#FFEDD5' }]}>
              <Text style={[styles.textActionBtnText, { color: '#C2410C' }]}>Ask a Doubt</Text>
              <Feather name="arrow-right" size={14} color="#C2410C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. FULL WIDTH CARD: CLASS UPDATES */}
        <View style={styles.fullCard}>
          <Text style={styles.cardMainTitle}>Class Updates</Text>
          <Text style={styles.cardSubTitle}>Stay updated with class schedules, materials, and reminders.</Text>

          {/* Horizontal Timeline Steps */}
          <View style={styles.timelineRowContainer}>
            <View style={styles.timelineHorizontalLine} />
            
            <View style={styles.timelineStep}>
              <View style={[styles.timelineNode, { backgroundColor: '#3B82F6' }]}><Ionicons name="calendar" size={12} color="#FFFFFF" /></View>
              <View style={styles.timelineContentBox}>
                <Text style={styles.timelineBoxTitle}>Maths Class</Text>
                <Text style={styles.timelineBoxSub}>Tomorrow</Text>
                <Text style={styles.timelineBoxTime}>09:00 AM</Text>
              </View>
            </View>

            <View style={styles.timelineStep}>
              <View style={[styles.timelineNode, { backgroundColor: '#10B981' }]}><MaterialIcons name="assignment" size={12} color="#FFFFFF" /></View>
              <View style={styles.timelineContentBox}>
                <Text style={styles.timelineBoxTitle}>New Material</Text>
                <Text style={styles.timelineBoxSub}>Physics Notes</Text>
                <Text style={styles.timelineBoxTime}>Uploaded</Text>
              </View>
            </View>

            <View style={styles.timelineStep}>
              <View style={[styles.timelineNode, { backgroundColor: '#8B5CF6' }]}><Ionicons name="time" size={12} color="#FFFFFF" /></View>
              <View style={styles.timelineContentBox}>
                <Text style={styles.timelineBoxTitle}>Reminder</Text>
                <Text style={styles.timelineBoxSub}>Test on Friday</Text>
                <Text style={styles.timelineBoxTime}>10:00 AM</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={[styles.textActionButton, { backgroundColor: '#EFF6FF', alignSelf: 'flex-start', paddingHorizontal: 16 }]}>
            <Text style={[styles.textActionBtnText, { color: '#2563EB' }]}>Check Updates</Text>
            <Feather name="arrow-right" size={14} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* 7. FULL WIDTH BOTTOM AI BAR */}
        <View style={styles.aiBannerBar}>
          <View style={styles.aiLogoRow}>
            <View style={styles.aiSparkCircle}>
              <MaterialCommunityIcons name="sparkles" size={14} color="#8B5CF6" />
            </View>
            <View style={styles.aiTextContainer}>
              <Text style={styles.aiMainTitle}>Communication Hub <Text style={styles.aiGradientText}>AI</Text></Text>
              <Text style={styles.aiSubTitle}>Your smart assistant to keep you informed and never miss what matters.</Text>
            </View>
          </View>
          
          {/* Input Mock Box */}
          <View style={styles.aiInputBoxMock}>
            <Text style={styles.aiInputTextPlaceholder}>Ask anything... e.g., "Any new notices?"</Text>
            <MaterialCommunityIcons name="auto-fix" size={16} color="#8B5CF6" />
          </View>
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
    paddingBottom: 115, // Smooth safety bottom clearance gap
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFBFD',
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
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    marginVertical: 4,
    marginBottom: 16,
  },
  statsRowContent: {
    gap: 12,
    paddingRight: 16,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 8,
  },
  statIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNum: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  halfCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'space-between',
  },
  cardMainTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardSubTitle: {
    fontSize: 9,
    color: '#94A3B8',
    marginTop: 4,
    lineHeight: 12,
  },
  cardGraphicCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  docGraphicBase: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  docGraphicAlertBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#3B82F6',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    gap: 4,
    marginTop: 4,
  },
  textActionBtnText: {
    fontSize: 10,
    fontWeight: '700',
  },
  chatPreviewContainer: {
    marginVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 8,
    gap: 6,
  },
  chatBubbleRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chatBubbleRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  avatarCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleLeft: {
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    flex: 1,
    gap: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bubbleLineShort: {
    height: 3,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    width: '40%',
  },
  bubbleLineLong: {
    height: 3,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    width: '75%',
  },
  bubbleRight: {
    backgroundColor: '#E0F2FE',
    padding: 6,
    borderRadius: 8,
    borderTopRightRadius: 0,
    width: '50%',
  },
  bubbleLineShortRight: {
    height: 3,
    backgroundColor: '#7DD3FC',
    borderRadius: 2,
    width: '60%',
  },
  typingIndicator: {
    fontSize: 8,
    color: '#8B5CF6',
    fontWeight: '600',
    marginTop: 2,
  },
  doubtContainerGraphic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubtOrangeShadowCircle: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#F97316',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  doubtQuestionMarkText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  fullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  timelineRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 16,
    position: 'relative',
  },
  timelineHorizontalLine: {
    position: 'absolute',
    top: 13,
    left: 20,
    right: 20,
    height: 1.5,
    backgroundColor: '#E2E8F0',
    zIndex: 1,
  },
  timelineStep: {
    alignItems: 'center',
    zIndex: 2,
    width: '32%',
  },
  timelineNode: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timelineContentBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 6,
    marginTop: 8,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  timelineBoxTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  timelineBoxSub: {
    fontSize: 8,
    color: '#64748B',
    marginTop: 1,
    textAlign: 'center',
  },
  timelineBoxTime: {
    fontSize: 8,
    fontWeight: '700',
    color: '#3B82F6',
    marginTop: 3,
  },
  aiBannerBar: {
    backgroundColor: '#F5F3FF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  aiLogoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  aiSparkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  aiTextContainer: {
    flex: 1,
  },
  aiMainTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  aiGradientText: {
    color: '#8B5CF6',
    fontWeight: '800',
  },
  aiSubTitle: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 12,
  },
  aiInputBoxMock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 36,
    paddingHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E9E3FF',
  },
  aiInputTextPlaceholder: {
    fontSize: 10,
    color: '#94A3B8',
  },
});