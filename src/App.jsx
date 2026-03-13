import { useState, useMemo } from 'react';
import { Search, Gamepad2, Filter, LayoutGrid, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GAMES } from './data/games';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Strategy', 'Racing'];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Gamepad2 className="text-black w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight hidden sm:block">
                UNBLOCKED<span className="text-emerald-500">GAMES</span>
              </h1>
            </div>

            <div className="flex-1 max-w-md mx-8 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search games, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                <Sparkles className="w-4 h-4" />
                Newest
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <header className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-black tracking-tight mb-6"
          >
            PLAY WITHOUT <span className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">LIMITS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl mx-auto"
          >
            The ultimate collection of web-based games, unblocked and ready to play anywhere. No downloads, no signups.
          </motion.p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Filter className="w-4 h-4 text-zinc-500 mr-2 shrink-0" />
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-zinc-500 text-sm">
            <LayoutGrid className="w-4 h-4" />
            <span>{filteredGames.length} Games Available</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onSelect={setSelectedGame}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-zinc-700" />
            </div>
            <h3 className="text-xl font-semibold text-white">No games found</h3>
            <p className="text-zinc-500 mt-2">Try adjusting your search or category filters.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 className="w-5 h-5 text-emerald-500" />
            <span className="font-bold tracking-tight">UNBLOCKED GAMES</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2026 Unblocked Games Hub. All games are property of their respective owners.
          </p>
        </div>
      </footer>

      {/* Game Player Modal */}
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
}
