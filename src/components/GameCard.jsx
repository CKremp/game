import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function GameCard({ game, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-colors shadow-xl"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
          <button
            onClick={() => onSelect(game)}
            className="bg-emerald-500 text-black p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-6 h-6 fill-current" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
            {game.category}
          </span>
          <div className="flex gap-1">
            {game.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider text-zinc-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-2 mt-1">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}
