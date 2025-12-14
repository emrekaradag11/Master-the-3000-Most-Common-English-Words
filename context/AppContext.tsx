import { TRANSLATIONS } from '@/constants/translations';
import { SAMPLE_DATA } from '@/data/sampleData';
import { Storage } from '@/utils/storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Import all translation files
import translatedWordsAr from '@/data/translated_words_ar.json';
import translatedWordsCh from '@/data/translated_words_ch.json';
import translatedWordsEs from '@/data/translated_words_es.json';
import translatedWordsHi from '@/data/translated_words_hi.json';
import translatedWordsId from '@/data/translated_words_id.json';
import translatedWordsPt from '@/data/translated_words_pt.json';
import translatedWordsRu from '@/data/translated_words_ru.json';
import translatedWordsTh from '@/data/translated_words_th.json';
import translatedWordsTr from '@/data/translated_words_tr.json';
import translatedWordsVi from '@/data/translated_words_vi.json';

type Language = keyof typeof TRANSLATIONS;
type Word = { word: string; level: string; translation?: string; translation_details?: string[] };
type Level = 'ALL' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

// Map language codes to translation data
const TRANSLATION_DATA: Record<string, Word[]> = {
  tr: translatedWordsTr as Word[],
  es: translatedWordsEs as Word[],
  zh: translatedWordsCh as Word[], // Chinese uses 'ch' in filename
  hi: translatedWordsHi as Word[],
  ar: translatedWordsAr as Word[],
  pt: translatedWordsPt as Word[],
  vi: translatedWordsVi as Word[],
  id: translatedWordsId as Word[],
  th: translatedWordsTh as Word[],
  ru: translatedWordsRu as Word[],
  en: SAMPLE_DATA, // English uses sample data (no translation needed)
};

interface AppContextType {
  lang: Language | null;
  words: Word[];
  learnedWords: Set<string>;
  isFileLoaded: boolean;
  setLang: (lang: Language) => Promise<void>;
  setWords: (words: Word[]) => void;
  setLearnedWords: React.Dispatch<React.SetStateAction<Set<string>>>;
  setIsFileLoaded: (loaded: boolean) => void;
  addLearnedWord: (word: string) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
  const [isFileLoaded, setIsFileLoaded] = useState(false);

  // Load words when language changes
  useEffect(() => {
    if (lang) {
      const translationData = TRANSLATION_DATA[lang] || SAMPLE_DATA;
      setWords(translationData);
      // Reset file loaded status when language changes (user wants to see new language translations)
      setIsFileLoaded(false);
    } else {
      setWords(SAMPLE_DATA);
    }
  }, [lang]);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    const savedLang = await Storage.getLanguage();
    const savedLearned = await Storage.getLearnedWords();
    
    if (savedLang && savedLang in TRANSLATIONS) {
      const langKey = savedLang as Language;
      setLangState(langKey);
      // Words will be loaded by the useEffect above
    } else {
      setWords(SAMPLE_DATA);
    }
    
    setLearnedWords(savedLearned);
  };

  useEffect(() => {
    if (learnedWords.size > 0) {
      Storage.saveLearnedWords(learnedWords);
    }
  }, [learnedWords]);

  const setLang = async (language: Language) => {
    setLangState(language);
    await Storage.setLanguage(language);
  };

  const addLearnedWord = (word: string) => {
    setLearnedWords(prev => new Set(prev).add(word));
  };

  const t = (key: string): string => {
    if (!lang || !TRANSLATIONS[lang]) return '';
    const keys = key.split('.');
    let value: any = TRANSLATIONS[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        words,
        learnedWords,
        isFileLoaded,
        setLang,
        setWords,
        setLearnedWords,
        setIsFileLoaded,
        addLearnedWord,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

