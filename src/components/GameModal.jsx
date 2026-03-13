import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function GameModal({ game, onClose }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!game) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            width: isFullScreen ? '100vw' : '90vw',
            height: isFullScreen ? '100vh' : '85vh',
            maxWidth: isFullScreen ? '100%' : '1200px'
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/50">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-white">{game.title}</h2>
              <span className="text-xs px-2 py-1 bg-zinc-800 text-zinc-400 rounded-md">
                {game.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(game.url, '_blank')}
                className="p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-xl text-zinc-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Game Iframe */}
          <div className="flex-1 bg-black relative">
            <iframe
              src={game.url}
              className="w-full h-full border-none"
              allow="autoplay; fullscreen; keyboard"
              title={game.title}
            />
          </div>

          {/* Footer Info (Only if not fullscreen) */}
          {!isFullScreen && (
            <div className="p-6 bg-zinc-900/30">
              <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
                {game.description}
              </p>
              <div className="mt-4 flex gap-2">
                {game.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-zinc-800 text-zinc-500 rounded uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
