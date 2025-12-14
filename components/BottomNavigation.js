import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BottomNavigation({ currentView, onNavigate, t }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => onNavigate('home')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, currentView === 'home' && styles.navIconActive]}>
          📚
        </Text>
        <Text style={[styles.navLabel, currentView === 'home' && styles.navLabelActive]}>
          {t('navStudy')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => onNavigate('stats')}
        activeOpacity={0.7}
      >
        <Text style={[styles.navIcon, currentView === 'stats' && styles.navIconActive]}>
          📊
        </Text>
        <Text style={[styles.navLabel, currentView === 'stats' && styles.navLabelActive]}>
          {t('navStats')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.4,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  navLabelActive: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});