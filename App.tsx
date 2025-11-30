import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Play, BookOpen, Layers, Search, Clock, Award, Menu, X, ArrowLeft, ExternalLink, Bot } from 'lucide-react';
import { TUTORIALS, CATEGORIES } from './constants';
import { VideoTutorial, Difficulty } from './types';
import AIChatBot from './components/AIChatBot';

// --- Helper Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path ? "text-indigo-600 font-semibold bg-indigo-50" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
              AI
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              AppMastery
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-2">
            <Link to="/" className={`px-4 py-2 rounded-lg transition-colors ${isActive('/')}`}>首頁</Link>
            <Link to="/learn" className={`px-4 py-2 rounded-lg transition-colors ${isActive('/learn')}`}>教學課程</Link>
            <a href="https://appinventor.mit.edu/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-50 flex items-center gap-1">
              官方網站 <ExternalLink size={14} />
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50">首頁</Link>
            <Link to="/learn" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50">教學課程</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white font-bold text-xs">AI</div>
          <span className="text-lg font-bold text-white">AppMastery</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          賦能未來的創新者，透過 MIT App Inventor 2 打造自己的 Android App。學習邏輯、設計與實作。
        </p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">相關資源</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="https://appinventor.mit.edu/" target="_blank" rel="noreferrer" className="hover:text-green-400">MIT App Inventor</a></li>
          <li><a href="https://community.appinventor.mit.edu/" target="_blank" rel="noreferrer" className="hover:text-green-400">社群論壇</a></li>
          <li><a href="https://appinventor.mit.edu/explore/ai2/tutorials" target="_blank" rel="noreferrer" className="hover:text-green-400">官方文件</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">關於我們</h4>
        <p className="text-slate-400 text-sm">
          這是一個教育專案，旨在彙整最佳的積木程式學習資源，幫助大家輕鬆自學。
        </p>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} AppMastery. Not affiliated with MIT.
    </div>
  </footer>
);

const VideoCard: React.FC<{ video: VideoTutorial }> = ({ video }) => {
  const difficultyColor = {
    [Difficulty.BEGINNER]: 'bg-green-100 text-green-700',
    [Difficulty.INTERMEDIATE]: 'bg-amber-100 text-amber-700',
    [Difficulty.ADVANCED]: 'bg-rose-100 text-rose-700',
  };

  return (
    <Link to={`/watch/${video.id}`} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        {/* Placeholder for YouTube Thumbnail since we might not have real valid IDs in mock data. 
            In a real app, use `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg` */}
        <img 
          src={`https://picsum.photos/seed/${video.id}/640/360`} 
          alt={video.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={20} className="text-indigo-600 ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${difficultyColor[video.difficulty]}`}>
            {video.difficulty}
          </span>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
            {video.category}
          </span>
        </div>
        <h3 className="font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {video.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
          {video.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {video.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">#{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

// --- Pages ---

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-indigo-900 text-white overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/50 border border-indigo-700 text-indigo-200 text-sm mb-6 animate-fade-in-up">
            <Award size={16} />
            <span>立即精通 App Inventor 2</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            不用寫程式碼 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">也能開發 Android App</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-10">
            全方位的自學路徑，包含精選影音教學、專案實作，以及能幫你除錯的 AI 導師。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn" className="px-8 py-3.5 bg-green-500 hover:bg-green-400 text-indigo-950 font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 hover:shadow-green-500/30 flex items-center justify-center gap-2">
              <Play size={20} /> 開始學習
            </Link>
            <a href="#features" className="px-8 py-3.5 bg-indigo-800/50 hover:bg-indigo-700/50 border border-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center">
              探索功能
            </a>
          </div>
        </div>
      </section>

      {/* Featured / Introduction */}
      <section className="py-16 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">為什麼選擇我們？</h2>
            <p className="text-slate-600 mt-2">從入門到發布 App 所需的一切資源。</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">結構化課程</h3>
              <p className="text-slate-600">從簡單的按鈕到複雜的 API。我們的課程依難度分級，確保學習循序漸進。</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">專案實作導向</h3>
              <p className="text-slate-600">不只是看影片。邊做邊學，實作遊戲、待辦事項清單和 IoT 控制器等真實 App。</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                <Bot size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">AI 程式導師</h3>
              <p className="text-slate-600">卡在邏輯上？詢問我們內建的 AI 助手，即時解釋積木用法或幫你除錯。</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Tutorials Preview */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">熱門教學</h2>
              <p className="text-slate-600 mt-1">從這些社群最愛的課程開始</p>
            </div>
            <Link to="/learn" className="hidden sm:flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              查看全部 <ArrowLeft className="rotate-180 ml-1" size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TUTORIALS.slice(0, 4).map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/learn" className="inline-block px-6 py-2 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50">
              查看所有課程
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const CourseListPage = () => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTutorials = useMemo(() => {
    return TUTORIALS.filter(t => {
      const matchesDiff = filterDifficulty === 'All' || t.difficulty === filterDifficulty;
      const matchesCat = filterCategory === 'All' || t.category === filterCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDiff && matchesCat && matchesSearch;
    });
  }, [filterDifficulty, filterCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">教學圖書館</h1>
            <p className="text-slate-600 mt-1">瀏覽 {TUTORIALS.length} 堂課程來精通 App Inventor</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
             <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="搜尋主題..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 space-y-8">
             <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Award size={18} /> 難度
              </h3>
              <div className="space-y-2">
                {['All', ...Object.values(Difficulty)].map(d => (
                  <label key={d} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="difficulty" 
                      className="accent-indigo-600 w-4 h-4"
                      checked={filterDifficulty === d}
                      onChange={() => setFilterDifficulty(d)}
                    />
                    <span className={`text-sm group-hover:text-indigo-600 ${filterDifficulty === d ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>
                      {d === 'All' ? '全部' : d}
                    </span>
                  </label>
                ))}
              </div>
             </div>

             <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Layers size={18} /> 分類
              </h3>
              <div className="space-y-2">
                {['All', ...CATEGORIES].map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      className="accent-indigo-600 w-4 h-4"
                      checked={filterCategory === c}
                      onChange={() => setFilterCategory(c)}
                    />
                    <span className={`text-sm group-hover:text-indigo-600 ${filterCategory === c ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>
                      {c === 'All' ? '全部' : c}
                    </span>
                  </label>
                ))}
              </div>
             </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredTutorials.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutorials.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="text-slate-400" size={24} />
                </div>
                <h3 className="text-lg font-medium text-slate-900">找不到相關教學</h3>
                <p className="text-slate-500">請嘗試調整您的搜尋關鍵字或篩選條件。</p>
                <button 
                  onClick={() => {setFilterDifficulty('All'); setFilterCategory('All'); setSearchQuery('');}}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  清除所有篩選
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoPlayerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const video = TUTORIALS.find(t => t.id === id);

  if (!video) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-800">找不到教學</h2>
        <button onClick={() => navigate('/learn')} className="mt-4 text-indigo-600 hover:underline">
          返回教學列表
        </button>
      </div>
    );
  }

  // Related videos (simple logic: same category)
  const relatedVideos = TUTORIALS.filter(t => t.category === video.category && t.id !== video.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <div className="bg-slate-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/learn" className="inline-flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> 返回教學庫
          </Link>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
               <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
                  {/* Actual YouTube Embed */}
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
               </div>
            </div>
            <div className="lg:col-span-1">
               <div className="h-full flex flex-col">
                  <span className="inline-block px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 rounded-full text-xs font-bold uppercase tracking-wider w-fit mb-3">
                    {video.difficulty}
                  </span>
                  <h1 className="text-2xl font-bold leading-tight mb-4">{video.title}</h1>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {video.description}
                  </p>
                  
                  <div className="mt-auto border-t border-slate-800 pt-6">
                    <h3 className="font-semibold text-white mb-3">涵蓋概念</h3>
                    <div className="flex flex-wrap gap-2">
                       {video.tags.map(tag => (
                         <span key={tag} className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700">
                           {tag}
                         </span>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6">相關教學</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {relatedVideos.map(v => <VideoCard key={v.id} video={v} />)}
           {relatedVideos.length === 0 && <p className="text-slate-500 text-sm">此分類中沒有其他相關影片。</p>}
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<CourseListPage />} />
            <Route path="/watch/:id" element={<VideoPlayerPage />} />
          </Routes>
        </main>
        <Footer />
        <AIChatBot />
      </div>
    </Router>
  );
};

export default App;