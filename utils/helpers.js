export const getGoogleTranslateURL = (word, lang) => {
    const langCode = lang === 'zh' ? 'zh-CN' : lang;
    return `https://translate.google.com/?sl=en&tl=${langCode}&text=${encodeURIComponent(word)}&op=translate`;
  };
  
  export const fetchCambridgeDefinition = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      
      if (!response.ok) {
        throw new Error('Definition not found');
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        const entry = data[0];
        return {
          word: entry.word,
          phonetic: entry.phonetic || entry.phonetics?.[0]?.text || '',
          meanings: entry.meanings || [],
        };
      }
      
      throw new Error('No definition found');
    } catch (error) {
      console.error('Dictionary API error:', error);
      throw error;
    }
  };
  
  export const filterStudyList = (words, learnedWords, currentLevel) => {
    let list = words.filter(w => !learnedWords.has(w.word));
    if (currentLevel !== 'ALL') {
      list = list.filter(w => w.level === currentLevel);
    }
    return list;
  };
  
  export const calculateStats = (words, learnedWords) => {
    const total = words.length;
    const learned = learnedWords.size;
    const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;
    
    const uniqueLevels = [...new Set(words.map(w => w.level))].sort();
  
    const byLevel = {};
    uniqueLevels.forEach(lvl => {
      const lvlTotal = words.filter(w => w.level === lvl).length;
      const lvlLearned = words.filter(w => w.level === lvl && learnedWords.has(w.word)).length;
      byLevel[lvl] = { total: lvlTotal, learned: lvlLearned };
    });
  
    return { total, learned, percentage, byLevel };
  };