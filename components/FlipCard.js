import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LEVEL_STYLES } from '../constants/levelStyles';
import { useApp } from '../context/AppContext';
import { fetchCambridgeDefinition, getGoogleTranslateURL } from '../utils/helpers';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width - 40, 400);

export default function FlipCard({ word, t, onRepeat, onKnown }) {
  const { lang } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCambridge, setShowCambridge] = useState(false);
  const [cambridgeData, setCambridgeData] = useState(null);
  const [loadingCambridge, setLoadingCambridge] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsFlipped(false);
    setShowCambridge(false);
    setCambridgeData(null);
    flipAnim.setValue(0);
  }, [word.word]);

  const handleCambridgePress = async () => {
    if (showCambridge) {
      setShowCambridge(false);
      return;
    }

    setLoadingCambridge(true);
    setShowCambridge(true);

    try {
      const data = await fetchCambridgeDefinition(word.word);
      setCambridgeData(data);
    } catch (error) {
      console.error('Cambridge API error:', error);
      setCambridgeData({ error: true });
    } finally {
      setLoadingCambridge(false);
    }
  };

  const handleFlip = () => {
    if (!isFlipped) {
      Animated.spring(flipAnim, {
        toValue: 1,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
      setIsFlipped(true);
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const levelStyle = LEVEL_STYLES[word.level] || LEVEL_STYLES.A1;

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={handleFlip}
      disabled={isFlipped}
    >
      <View style={styles.cardContainer}>
        {/* Front */}
        <Animated.View
          pointerEvents={isFlipped ? 'none' : 'auto'}
          style={[
            styles.card,
            styles.cardFront,
            { transform: [{ rotateY: frontInterpolate }] }
          ]}
        >
          <View style={[styles.levelBadge, { backgroundColor: levelStyle.backgroundColor }]}>
            <Text style={[styles.levelText, { color: levelStyle.textColor }]}>
              {word.level}
            </Text>
          </View>
          <Text style={styles.wordText}>{word.word}</Text>
          <Text style={styles.clickHint}>{t('clickToSee')}</Text>
        </Animated.View>

        {/* Back */}
        <Animated.View
          pointerEvents={isFlipped ? 'auto' : 'none'}
          style={[
            styles.card,
            styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] }
          ]}
        >
          <Text style={styles.wordTextBack}>{word.word}</Text>

          {word.translation && (
            <View style={styles.translationBox}>
              <Text style={styles.translationLabel}>{t('localTranslation')}</Text>
              <Text style={styles.translationText}>{word.translation}</Text>
            </View>
          )}

          {!showCambridge && <Text style={styles.noDefText}>{t('noDefinitions')}</Text>}

          {showCambridge && (
            <ScrollView style={styles.cambridgeContainer} showsVerticalScrollIndicator={false}>
              {loadingCambridge ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#4F46E5" />
                  <Text style={styles.loadingText}>Loading definition...</Text>
                </View>
              ) : cambridgeData?.error ? (
                <Text style={styles.errorText}>Unable to load definition</Text>
              ) : cambridgeData ? (
                <View>
                  {cambridgeData.phonetic && (
                    <Text style={styles.phonetic}>{cambridgeData.phonetic}</Text>
                  )}
                  {cambridgeData.meanings?.map((meaning, idx) => (
                    <View key={idx} style={styles.meaningContainer}>
                      <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
                      {meaning.definitions?.slice(0, 3).map((def, defIdx) => (
                        <View key={defIdx} style={styles.definitionItem}>
                          <Text style={styles.definitionText}>
                            {defIdx + 1}. {def.definition}
                          </Text>
                          {def.example && (
                            <Text style={styles.exampleText}>"{def.example}"</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              ) : null}
            </ScrollView>
          )}

          <View style={styles.linkButtons}>
            <TouchableOpacity
              style={[styles.linkButton, styles.googleButton]}
              onPress={() => Linking.openURL(getGoogleTranslateURL(word.word, lang))}
            >
              <Text style={styles.linkButtonText}>🌍 {t('googleTranslate')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linkButton, styles.cambridgeButton, showCambridge && styles.cambridgeButtonActive]}
              onPress={handleCambridgePress}
            >
              <Text style={styles.linkButtonText}>
                📖 {showCambridge ? 'Hide Definition' : t('cambridgeDict')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.repeatButton]}
              onPress={onRepeat}
            >
              <Text style={styles.actionIcon}>✕</Text>
              <Text style={styles.actionText}>{t('repeat')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.knownButton]}
              onPress={onKnown}
            >
              <Text style={styles.actionIcon}>✓</Text>
              <Text style={styles.actionText}>{t('known')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: 480,
    alignSelf: 'center',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardFront: {
    backgroundColor: 'white',
    borderBottomWidth: 8,
    borderBottomColor: '#4F46E5',
  },
  cardBack: {
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 8,
    borderBottomColor: '#9CA3AF',
  },
  levelBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  wordText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  wordTextBack: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 20,
  },
  clickHint: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#9CA3AF',
  },
  translationBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  translationLabel: {
    fontSize: 11,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  translationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  noDefText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  linkButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  linkButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },
  googleButton: {
    backgroundColor: '#DBEAFE',
  },
  cambridgeButton: {
    backgroundColor: '#FEF3C7',
  },
  linkButtonText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  repeatButton: {
    backgroundColor: '#FEE2E2',
  },
  knownButton: {
    backgroundColor: '#DCFCE7',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  cambridgeContainer: {
    maxHeight: 200,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    textAlign: 'center',
    padding: 10,
  },
  phonetic: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  meaningContainer: {
    marginBottom: 16,
  },
  partOfSpeech: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  definitionItem: {
    marginBottom: 12,
    paddingLeft: 8,
  },
  definitionText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },
  cambridgeButtonActive: {
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
});