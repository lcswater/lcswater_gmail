import { Difficulty, VideoTutorial } from './types';

// Curated list of high-quality App Inventor 2 tutorials (using popular YouTube IDs as placeholders/examples)
export const TUTORIALS: VideoTutorial[] = [
  // Beginner
  {
    id: 'b1',
    title: 'Hello Purr：你的第一個 App',
    description: '透過製作經典的「Hello Purr (貓叫聲)」App 來學習 App Inventor 的基本介面。了解設計檢視 (Designer) 與程式方塊 (Blocks) 的使用。',
    youtubeId: '5-Hw7HqA_cM', // Placeholder ID for a generic intro
    difficulty: Difficulty.BEGINNER,
    category: '基礎',
    duration: '12:30',
    tags: ['按鈕', '音效', '圖片', '介面設計'],
  },
  {
    id: 'b2',
    title: '跟我說話：文字轉語音',
    description: '製作一個會朗讀你輸入文字的 App。介紹文字轉語音 (TextToSpeech) 元件與事件處理 (Event Handling) 的基礎。',
    youtubeId: 'e2k2t2', // Placeholder
    difficulty: Difficulty.BEGINNER,
    category: '基礎',
    duration: '08:45',
    tags: ['文字轉語音', '文字方塊', '事件處理'],
  },
  {
    id: 'b3',
    title: '彈跳球遊戲',
    description: '製作一個簡單的遊戲，讓球在牆壁間彈跳。學習畫布 (Canvas)、球形精靈 (Ball Sprite) 以及座標系統的概念。',
    youtubeId: 'ad3d3d', // Placeholder
    difficulty: Difficulty.BEGINNER,
    category: '遊戲',
    duration: '15:20',
    tags: ['畫布', '精靈', '動畫', '計時器'],
  },
  
  // Intermediate
  {
    id: 'i1',
    title: '數位塗鴉：繪圖 App',
    description: '將手機變成畫板。學習處理觸控事件（拖曳 Drag、按壓 TouchDown）以及改變畫筆顏色。',
    youtubeId: 'dd44dd',
    difficulty: Difficulty.INTERMEDIATE,
    category: '圖形',
    duration: '18:10',
    tags: ['畫布', '顏色', '繪圖', '相機'],
  },
  {
    id: 'i2',
    title: '待辦事項清單 (TinyDB)',
    description: '製作一個可儲存資料的任務清單。學習如何使用微型資料庫 (TinyDB) 將資料儲存在手機端，讓 App 重啟後資料依然存在。',
    youtubeId: 'db55db',
    difficulty: Difficulty.INTERMEDIATE,
    category: '資料',
    duration: '22:00',
    tags: ['微型資料庫', '清單顯示器', '資料持久化', '清單'],
  },
  {
    id: 'i3',
    title: 'GPS 位置追蹤器',
    description: '使用位置感測器 (LocationSensor) 取得經緯度並顯示地址。介紹 GPS 與權限設定。',
    youtubeId: 'gps66',
    difficulty: Difficulty.INTERMEDIATE,
    category: '感測器',
    duration: '14:50',
    tags: ['位置感測器', '地圖', 'GPS'],
  },

  // Advanced
  {
    id: 'a1',
    title: 'Web API：天氣 App',
    description: '使用網路 (Web) 元件與 JSON 解析，從網路上抓取即時天氣資料。',
    youtubeId: 'api77',
    difficulty: Difficulty.ADVANCED,
    category: '連接',
    duration: '25:30',
    tags: ['網路', 'API', 'JSON', '字典'],
  },
  {
    id: 'a2',
    title: '藍牙聊天室',
    description: '建立一個可透過藍牙在兩台裝置間傳送訊息的聊天 App。進階的連接處理與清單選擇器應用。',
    youtubeId: 'bt88',
    difficulty: Difficulty.ADVANCED,
    category: '物聯網',
    duration: '30:00',
    tags: ['藍牙客戶端', '清單選擇器', '網路通訊'],
  },
];

export const CATEGORIES = Array.from(new Set(TUTORIALS.map(t => t.category)));