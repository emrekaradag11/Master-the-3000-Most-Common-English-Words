import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LEVEL_STYLES } from '../constants/levelStyles';

export default function StatsScreen({ stats, onBack, onReset, t }) {
  const handleReset = () => {
    Alert.alert(
      t('resetProgress'),
      t('confirmReset'),
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: onReset, style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          📊 {t('statsTitle')}
        </Text>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>← {t('menu')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.overallCard}>
        <Text style={styles.percentage}>%{stats.percentage}</Text>
        <Text style={styles.overallLabel}>{t('totalCompleted')}</Text>
        <Text style={styles.overallDetail}>
          {stats.learned} / {stats.total} words
        </Text>
      </View>

      <View style={styles.levelStats}>
        {Object.entries(stats.byLevel).map(([level, data]) => {
          const levelStyle = LEVEL_STYLES[level];
          const percent = data.total > 0 ? (data.learned / data.total) * 100 : 0;
          
          return (
            <View key={level} style={styles.levelStatCard}>
              <View style={styles.levelStatHeader}>
                <View style={[styles.levelStatBadge, { backgroundColor: levelStyle.backgroundColor }]}>
                  <Text style={[styles.levelStatBadgeText, { color: levelStyle.textColor }]}>
                    {level}
                  </Text>
                </View>
                <Text style={styles.levelStatCount}>
                  {data.learned}/{data.total}
                </Text>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${percent}%`, backgroundColor: levelStyle.borderColor }
                  ]} 
                />
              </View>
            </View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetIcon}>🔄</Text>
        <Text style={styles.resetText}>{t('resetProgress')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  backText: {
    fontSize: 14,
    color: '#6B7280',
  },
  overallCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  percentage: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  overallLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  overallDetail: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  levelStats: {
    gap: 12,
    marginBottom: 24,
  },
  levelStatCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  levelStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  levelStatBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  levelStatBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelStatCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  resetIcon: {
    fontSize: 18,
  },
  resetText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#DC2626',
  },
});