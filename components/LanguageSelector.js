import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TRANSLATIONS } from '../constants/translations';

export default function LanguageSelector({ onSelectLanguage }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.icon}>🌍</Text>
          <Text style={styles.title}>Select Language</Text>
          <Text style={styles.subtitle}>
            Please choose your interface language{'\n'}
            Lütfen arayüz dilini seçin
          </Text>
          
          <View style={styles.languageGrid}>
            {Object.entries(TRANSLATIONS).map(([key, data]) => (
              <TouchableOpacity
                key={key}
                style={styles.languageButton}
                onPress={() => onSelectLanguage(key)}
                activeOpacity={0.7}
              >
                <Text style={styles.flag}>{data.flag}</Text>
                <Text style={styles.languageLabel}>{data.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  languageGrid: {
    width: '100%',
    gap: 12,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  flag: {
    fontSize: 28,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});