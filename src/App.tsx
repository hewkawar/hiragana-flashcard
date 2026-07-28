import React, { useState, useEffect, useRef } from 'react';

// โครงสร้างข้อมูล Hiragana
const hiraganaColumns = [
  { id: 'a', chars: [{ k: 'あ', r: 'a' }, { k: 'い', r: 'i' }, { k: 'う', r: 'u' }, { k: 'え', r: 'e' }, { k: 'お', r: 'o' }] },
  { id: 'k', chars: [{ k: 'か', r: 'ka' }, { k: 'き', r: 'ki' }, { k: 'く', r: 'ku' }, { k: 'け', r: 'ke' }, { k: 'こ', r: 'ko' }] },
  { id: 's', chars: [{ k: 'さ', r: 'sa' }, { k: 'し', r: 'shi' }, { k: 'す', r: 'su' }, { k: 'せ', r: 'se' }, { k: 'そ', r: 'so' }] },
  { id: 't', chars: [{ k: 'た', r: 'ta' }, { k: 'ち', r: 'chi' }, { k: 'つ', r: 'tsu' }, { k: 'て', r: 'te' }, { k: 'と', r: 'to' }] },
  { id: 'n', chars: [{ k: 'な', r: 'na' }, { k: 'に', r: 'ni' }, { k: 'ぬ', r: 'nu' }, { k: 'ね', r: 'ne' }, { k: 'の', r: 'no' }] },
  { id: 'h', chars: [{ k: 'は', r: 'ha' }, { k: 'ひ', r: 'hi' }, { k: 'ふ', r: 'fu' }, { k: 'へ', r: 'he' }, { k: 'ほ', r: 'ho' }] },
  { id: 'm', chars: [{ k: 'ま', r: 'ma' }, { k: 'み', r: 'mi' }, { k: 'む', r: 'mu' }, { k: 'め', r: 'me' }, { k: 'も', r: 'mo' }] },
  { id: 'y', chars: [{ k: 'や', r: 'ya' }, null, { k: 'ゆ', r: 'yu' }, null, { k: 'よ', r: 'yo' }] },
  { id: 'r', chars: [{ k: 'ら', r: 'ra' }, { k: 'り', r: 'ri' }, { k: 'る', r: 'ru' }, { k: 'れ', r: 're' }, { k: 'ろ', r: 'ro' }] },
  { id: 'w', chars: [{ k: 'わ', r: 'wa' }, null, null, null, { k: 'を', r: 'wo' }] },
  { id: 'n_con', chars: [null, null, null, null, { k: 'ん', r: 'n' }] },
  { id: 'g', chars: [{ k: 'が', r: 'ga' }, { k: 'ぎ', r: 'gi' }, { k: 'ぐ', r: 'gu' }, { k: 'げ', r: 'ge' }, { k: 'ご', r: 'go' }] },
  { id: 'z', chars: [{ k: 'ざ', r: 'za' }, { k: 'じ', r: 'ji' }, { k: 'ず', r: 'zu' }, { k: 'ぜ', r: 'ze' }, { k: 'ぞ', r: 'zo' }] },
  { id: 'd', chars: [{ k: 'だ', r: 'da' }, { k: 'ぢ', r: 'ji' }, { k: 'づ', r: 'zu' }, { k: 'で', r: 'de' }, { k: 'ど', r: 'do' }] },
  { id: 'b', chars: [{ k: 'ば', r: 'ba' }, { k: 'び', r: 'bi' }, { k: 'ぶ', r: 'bu' }, { k: 'べ', r: 'be' }, { k: 'ぼ', r: 'bo' }] },
  { id: 'p', chars: [{ k: 'ぱ', r: 'pa' }, { k: 'ぴ', r: 'pi' }, { k: 'ぷ', r: 'pu' }, { k: 'ぺ', r: 'pe' }, { k: 'ぽ', r: 'po' }] }
];

// โครงสร้างข้อมูล Katakana
const katakanaColumns = [
  { id: 'a', chars: [{ k: 'ア', r: 'a' }, { k: 'イ', r: 'i' }, { k: 'ウ', r: 'u' }, { k: 'エ', r: 'e' }, { k: 'オ', r: 'o' }] },
  { id: 'k', chars: [{ k: 'カ', r: 'ka' }, { k: 'キ', r: 'ki' }, { k: 'ク', r: 'ku' }, { k: 'ケ', r: 'ke' }, { k: 'コ', r: 'ko' }] },
  { id: 's', chars: [{ k: 'サ', r: 'sa' }, { k: 'シ', r: 'shi' }, { k: 'ス', r: 'su' }, { k: 'セ', r: 'se' }, { k: 'ソ', r: 'so' }] },
  { id: 't', chars: [{ k: 'タ', r: 'ta' }, { k: 'チ', r: 'chi' }, { k: 'ツ', r: 'tsu' }, { k: 'テ', r: 'te' }, { k: 'ト', r: 'to' }] },
  { id: 'n', chars: [{ k: 'ナ', r: 'na' }, { k: 'ニ', r: 'ni' }, { k: 'ヌ', r: 'nu' }, { k: 'ネ', r: 'ne' }, { k: 'ノ', r: 'no' }] },
  { id: 'h', chars: [{ k: 'ハ', r: 'ha' }, { k: 'ヒ', r: 'hi' }, { k: 'フ', r: 'fu' }, { k: 'ヘ', r: 'he' }, { k: 'ホ', r: 'ho' }] },
  { id: 'm', chars: [{ k: 'マ', r: 'ma' }, { k: 'ミ', r: 'mi' }, { k: 'ム', r: 'mu' }, { k: 'メ', r: 'me' }, { k: 'モ', r: 'mo' }] },
  { id: 'y', chars: [{ k: 'ヤ', r: 'ya' }, null, { k: 'ユ', r: 'yu' }, null, { k: 'ヨ', r: 'yo' }] },
  { id: 'r', chars: [{ k: 'ラ', r: 'ra' }, { k: 'リ', r: 'ri' }, { k: 'ル', r: 'ru' }, { k: 'レ', r: 're' }, { k: 'ロ', r: 'ro' }] },
  { id: 'w', chars: [{ k: 'ワ', r: 'wa' }, null, null, null, { k: 'ヲ', r: 'wo' }] },
  { id: 'n_con', chars: [null, null, null, null, { k: 'ン', r: 'n' }] },
  { id: 'g', chars: [{ k: 'ガ', r: 'ga' }, { k: 'ギ', r: 'gi' }, { k: 'グ', r: 'gu' }, { k: 'ゲ', r: 'ge' }, { k: 'ゴ', r: 'go' }] },
  { id: 'z', chars: [{ k: 'ザ', r: 'za' }, { k: 'ジ', r: 'ji' }, { k: 'ズ', r: 'zu' }, { k: 'ゼ', r: 'ze' }, { k: 'ゾ', r: 'zo' }] },
  { id: 'd', chars: [{ k: 'ダ', r: 'da' }, { k: 'ヂ', r: 'ji' }, { k: 'ヅ', r: 'zu' }, { k: 'デ', r: 'de' }, { k: 'ド', r: 'do' }] },
  { id: 'b', chars: [{ k: 'バ', r: 'ba' }, { k: 'ビ', r: 'bi' }, { k: 'ブ', r: 'bu' }, { k: 'ベ', r: 'be' }, { k: 'ボ', r: 'bo' }] },
  { id: 'p', chars: [{ k: 'パ', r: 'pa' }, { k: 'ピ', r: 'pi' }, { k: 'プ', r: 'pu' }, { k: 'ペ', r: 'pe' }, { k: 'ポ', r: 'po' }] }
];

export default function App() {
  // สถานะเพื่อเก็บว่าตอนนี้อยู่แท็บไหน
  const [activeTab, setActiveTab] = useState('hiragana');
  
  // สถานะเก็บประวัติการเรียนรู้
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('appProgressHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // ดึงข้อมูลจาก localStorage ตอนเริ่มต้น (ถ้าไม่มีให้ใช้ค่าเริ่มต้น)
  const [selectedGroupsHira, setSelectedGroupsHira] = useState(() => {
    const saved = localStorage.getItem('hiraganaSelections');
    return saved ? JSON.parse(saved) : ['a', 'k', 's'];
  });
  
  const [selectedGroupsKata, setSelectedGroupsKata] = useState(() => {
    const saved = localStorage.getItem('katakanaSelections');
    return saved ? JSON.parse(saved) : ['a', 'k', 's'];
  });

  // บันทึกลง localStorage ทันทีเมื่อมีการเปลี่ยนแปลงในแถว Hiragana
  useEffect(() => {
    localStorage.setItem('hiraganaSelections', JSON.stringify(selectedGroupsHira));
  }, [selectedGroupsHira]);

  // บันทึกลง localStorage ทันทีเมื่อมีการเปลี่ยนแปลงในแถว Katakana
  useEffect(() => {
    localStorage.setItem('katakanaSelections', JSON.stringify(selectedGroupsKata));
  }, [selectedGroupsKata]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [mistakeStats, setMistakeStats] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    if (isPlaying && !isFinished && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPlaying, isFinished, currentIndex]);

  const toggleGroup = (id) => {
    if (activeTab === 'hiragana') {
      setSelectedGroupsHira(prev => prev.includes(id) ? prev.filter(groupId => groupId !== id) : [...prev, id]);
    } else {
      setSelectedGroupsKata(prev => prev.includes(id) ? prev.filter(groupId => groupId !== id) : [...prev, id]);
    }
  };

  const startGame = () => {
    const currentSelected = activeTab === 'hiragana' ? selectedGroupsHira : selectedGroupsKata;
    const currentColumns = activeTab === 'hiragana' ? hiraganaColumns : katakanaColumns;
    
    if (currentSelected.length === 0) return;
    
    let newDeck = [];
    currentColumns.forEach(col => {
      if (currentSelected.includes(col.id)) {
        const validChars = col.chars.filter(char => char !== null);
        newDeck = [...newDeck, ...validChars];
      }
    });
    
    newDeck = newDeck.sort(() => Math.random() - 0.5);

    setDeck(newDeck);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMistakeStats({});
    setFeedback(null);
    setInputVal('');
    setIsFinished(false);
    setIsPlaying(true);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);

    if (feedback !== null) return; 

    const currentCard = deck[currentIndex];
    
    if (val.trim().toLowerCase() === currentCard.r) {
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
      
      setTimeout(() => {
        setFeedback(null);
        setInputVal('');
        if (currentIndex + 1 < deck.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setDeck(prevDeck => [...prevDeck].sort(() => Math.random() - 0.5));
          setCurrentIndex(0);
        }
      }, 400); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim() || feedback !== null) return;

    const currentCard = deck[currentIndex];
    const isCorrect = inputVal.trim().toLowerCase() === currentCard.r;

    if (isCorrect) {
      setFeedback('correct');
      setCorrectCount(prev => prev + 1);
      
      setTimeout(() => {
        setFeedback(null);
        setInputVal('');
        if (currentIndex + 1 < deck.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setDeck(prevDeck => [...prevDeck].sort(() => Math.random() - 0.5));
          setCurrentIndex(0);
        }
      }, 400); 
    } else {
      setFeedback('incorrect');
      setIncorrectCount(prev => prev + 1);
      
      setMistakeStats(prev => ({
        ...prev,
        [currentCard.k]: {
          r: currentCard.r,
          count: (prev[currentCard.k]?.count || 0) + 1
        }
      }));

      setInputVal(''); 
      setTimeout(() => setFeedback(null), 800);
    }
  };

  const resetGame = () => {
    setIsPlaying(false);
    setIsFinished(false);
  };

  const handleEndSession = () => {
    setIsFinished(true);
    // บันทึกประวัติเมื่อเล่นไปอย่างน้อย 1 ข้อ
    if (totalAttempts > 0) {
      const newSession = {
        id: Date.now(),
        date: new Date().toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }),
        mode: activeTab,
        answered: totalAttempts,
        accuracy: accuracy === 0 && correctCount === 0 ? 0 : Math.round((correctCount / totalAttempts) * 100),
        mistakes: mistakeStats
      };
      const updatedHistory = [newSession, ...history].slice(0, 50); // เก็บประวัติสูงสุด 50 รอบล่าสุด
      setHistory(updatedHistory);
      localStorage.setItem('appProgressHistory', JSON.stringify(updatedHistory));
    }
  };

  const totalAttempts = correctCount + incorrectCount;
  const accuracy = totalAttempts === 0 ? 0 : Math.round((correctCount / totalAttempts) * 100);
  const answeredCount = totalAttempts;
  
  const currentSelected = activeTab === 'hiragana' ? selectedGroupsHira : selectedGroupsKata;
  const currentColumns = activeTab === 'hiragana' ? hiraganaColumns : katakanaColumns;

  if (!isPlaying) {
    return (
      <div className="min-h-screen bg-[#1c1e26] text-white p-6 font-sans select-none overflow-x-hidden flex flex-col">
        
        {/* Header and Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#2d323e] gap-4">
          <div className="flex items-center gap-4">
             <div className="bg-white text-black font-bold px-2 py-1 rounded flex gap-1 items-center">
                <span>A</span>
                {/* เปลี่ยนไอคอนหน้า A ตามแท็บที่เลือก */}
                <span className="bg-black text-white px-1 text-sm rounded">
                  {activeTab === 'hiragana' ? 'あ' : 'ア'}
                </span>
             </div>
             <div>
                <h1 className="text-sm font-bold leading-tight">JLPT</h1>
                <h2 className="text-xs text-gray-400">Flashcards</h2>
             </div>
          </div>
          
          {/* Tab Selection */}
          <div className="flex bg-[#1e2129] p-1 rounded-lg border border-[#2d323e] self-start sm:self-auto">
            <button 
              onClick={() => setActiveTab('hiragana')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'hiragana' ? 'bg-[#3b3f4d] text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Hiragana
            </button>
            <button 
              onClick={() => setActiveTab('katakana')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'katakana' ? 'bg-[#3b3f4d] text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Katakana
            </button>
            <button 
              onClick={() => setActiveTab('progress')}
              className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                activeTab === 'progress' ? 'bg-[#3b3f4d] text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Progress
            </button>
          </div>
        </div>

        {/* Character Grid Selection or Progress View */}
        {activeTab === 'progress' ? (
          <div className="w-full max-w-7xl mx-auto overflow-y-auto pb-24 flex-grow custom-scrollbar px-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Learning Progress</h2>
              {history.length > 0 && (
                <button 
                  onClick={() => { setHistory([]); localStorage.removeItem('appProgressHistory'); }}
                  className="text-xs text-red-400 hover:text-red-300 font-bold px-3 py-1 bg-red-500/10 rounded-lg transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>
            
            {history.length === 0 ? (
              <div className="text-center bg-[#1e2129] border border-[#2d323e] p-10 rounded-xl text-gray-500">
                ยังไม่มีประวัติการฝึกซ้อม ลองเริ่มต้นทำแบบทดสอบเพื่อบันทึกผลสิ!
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {history.map(session => {
                  const sortedMistakes = Object.entries(session.mistakes).sort((a,b) => b[1].count - a[1].count);
                  const topMistake = sortedMistakes.length > 0 ? sortedMistakes[0] : null;
                  
                  return (
                    <div key={session.id} className="bg-[#242731] border border-[#323644] p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">{session.date}</div>
                        <div className="font-bold text-lg text-white capitalize">{session.mode} Session</div>
                      </div>
                      <div className="flex gap-6 items-center w-full md:w-auto">
                        <div className="text-center">
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Answered</div>
                          <div className="font-bold text-white">{session.answered}</div>
                        </div>
                        <div className="text-center border-l border-[#323644] pl-6">
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Accuracy</div>
                          <div className={`font-bold ${session.accuracy >= 80 ? 'text-[#65b214]' : session.accuracy >= 50 ? 'text-yellow-500' : 'text-red-400'}`}>
                            {session.accuracy}%
                          </div>
                        </div>
                        <div className="flex-1 md:flex-none text-right md:text-left md:ml-4">
                          {topMistake ? (
                            <div className="inline-block bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs">
                              <span className="text-gray-400 mr-2">Top Mistake:</span>
                              <span className="text-red-400 font-bold text-sm">{topMistake[0]}</span>
                              <span className="text-red-400/70 ml-1">({topMistake[1].count}x)</span>
                            </div>
                          ) : (
                            <div className="inline-block bg-[#65b214]/10 border border-[#65b214]/20 px-3 py-1.5 rounded-lg text-xs text-[#65b214] font-bold">
                              Perfect Session! 🎉
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
        <div className="w-full max-w-7xl mx-auto overflow-x-auto pb-24 flex-grow custom-scrollbar">
          <div className="flex justify-between min-w-max gap-4 px-2">
            {currentColumns.map((col) => {
              const isSelected = currentSelected.includes(col.id);
              
              return (
                <div key={col.id} className="flex flex-col items-center w-12 sm:w-16">
                  
                  {/* Custom Toggle Switch */}
                  <div 
                    onClick={() => toggleGroup(col.id)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer mb-6 transition-colors duration-300 ${
                      isSelected ? 'bg-[#5c9f13]' : 'bg-[#3b3f4d]'
                    }`}
                  >
                    <div 
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                        isSelected ? 'translate-x-5' : 'translate-x-0'
                      }`} 
                    />
                  </div>

                  {/* 5 Rows of Characters */}
                  <div className="flex flex-col w-full gap-2">
                    {col.chars.map((char, index) => (
                      <div 
                        key={index} 
                        className={`flex flex-col items-center justify-center h-14 border-b border-[#2a2e39] last:border-0 ${
                          isSelected && char ? 'opacity-100' : 'opacity-40'
                        } transition-opacity duration-300`}
                      >
                        {char ? (
                          <>
                            <span className="text-2xl font-medium mb-1">{char.k}</span>
                            <span className="text-[10px] text-[#6d7a93] uppercase font-bold tracking-wider">{char.r}</span>
                          </>
                        ) : (
                          <span className="text-[#3b3f4d] text-lg font-bold">-</span>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              )
            })}
          </div>
        </div>
        )}

        {/* Floating Action Button */}
        {activeTab !== 'progress' && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-8 z-10 w-11/12 md:w-auto">
          <button 
            onClick={startGame}
            disabled={currentSelected.length === 0}
            className="w-full md:w-auto bg-[#65b214] hover:bg-[#72c617] disabled:bg-[#3b3f4d] disabled:text-gray-500 text-white font-bold py-4 md:py-3 px-8 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            Begin Test - {currentSelected.length} Groups
          </button>
        </div>
        )}

        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #1c1e26; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b3f4d; border-radius: 4px; }
        `}} />
      </div>
    );
  }

  if (isFinished) {
    const sortedMistakes = Object.entries(mistakeStats).sort((a, b) => b[1].count - a[1].count);

    return (
      <div className="min-h-screen bg-[#1c1e26] text-white flex items-center justify-center p-4 font-sans py-12">
        <div className="bg-[#242731] p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-[#323644] max-h-[90vh] flex flex-col">
          <h1 className="text-3xl font-bold mb-2">Session Complete!</h1>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">Here are your results for this session.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6 shrink-0">
            <div className="bg-[#1e2129] p-4 rounded-xl border border-[#2d323e]">
              <p className="text-[#65b214] text-xs font-bold uppercase tracking-wider mb-1">Accuracy</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{accuracy}%</p>
            </div>
            <div className="bg-[#1e2129] p-4 rounded-xl border border-[#2d323e]">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Answered</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{answeredCount}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar mb-6 bg-[#1e2129] rounded-xl border border-[#2d323e] p-4 text-left">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                Frequently Missed
                <span className="bg-[#242731] px-2 py-1 rounded text-xs">{sortedMistakes.length} Chars</span>
             </h3>
             {sortedMistakes.length === 0 ? (
               <div className="text-center text-[#65b214] py-8 font-medium bg-[#242731] rounded-lg border border-[#2d323e]">
                  Perfect! You made no mistakes. 🎉
               </div>
             ) : (
               <div className="flex flex-col gap-3">
                 {sortedMistakes.map(([char, data]) => (
                   <div key={char} className="flex items-center justify-between bg-[#242731] p-3 rounded-lg border border-[#2d323e]">
                     <div className="flex items-center gap-4">
                       <span className="text-2xl font-bold text-red-400 w-8 text-center">{char}</span>
                       <span className="text-sm font-medium text-gray-400 border-l border-[#3b3f4d] pl-4">{data.r}</span>
                     </div>
                     <div className="text-xs font-bold bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full border border-red-500/20">
                       Missed {data.count}
                     </div>
                   </div>
                 ))}
               </div>
             )}
          </div>

          <button onClick={resetGame} className="w-full shrink-0 bg-[#3b3f4d] hover:bg-[#494e5e] text-white font-bold py-4 rounded-xl transition-colors">
            Back to Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c1e26] text-white flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Stats Bar */}
      <div className="w-full max-w-md flex justify-between bg-[#242731] p-4 rounded-t-2xl border border-b-0 border-[#323644]">
        <div className="text-center w-1/3">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Answered</p>
          <p className="font-bold text-lg">{answeredCount}</p>
        </div>
        <div className="text-center w-1/3 border-x border-[#323644]">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Incorrect</p>
          <p className="font-bold text-red-400">{incorrectCount}</p>
        </div>
        <div className="text-center w-1/3">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Accuracy</p>
          <p className="font-bold text-[#65b214]">{accuracy}%</p>
        </div>
      </div>

      {/* Flashcard Area */}
      <div className="bg-[#242731] w-full max-w-md px-4 sm:px-8 py-10 sm:py-12 rounded-b-2xl border border-t-0 border-[#323644] flex flex-col items-center shadow-2xl">
        <div className={`text-8xl sm:text-9xl font-medium mb-12 transition-colors duration-200 ${
          feedback === 'correct' ? 'text-[#65b214]' : feedback === 'incorrect' ? 'text-red-500' : 'text-white'
        }`}>
          {deck[currentIndex].k}
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            placeholder="Type romaji..."
            className={`w-full bg-[#1e2129] border-2 rounded-xl px-4 py-4 text-xl text-center text-white focus:outline-none transition-colors ${
               feedback === 'incorrect' ? 'border-red-500' : 'border-[#323644] focus:border-[#4a5063]'
            }`}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>
        
        <button onClick={handleEndSession} className="mt-8 text-[#6d7a93] hover:text-white text-sm uppercase tracking-wider font-bold transition-colors">
          End Session
        </button>
      </div>
    </div>
  );
}