import { motion } from 'framer-motion'
import type { TimelineEntry as TimelineEntryType } from '../data/timeline'
import { ExternalLink } from 'lucide-react'

interface TimelineEntryProps {
  entry: TimelineEntryType
  entryIndex: number
}

export function TimelineEntry({ entry, entryIndex }: TimelineEntryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: entryIndex * 0.1 }}
      className="relative flex gap-2 group/entry hover:bg-accent/5 dark:hover:bg-accent/10 p-1.5 rounded-md"
    >
      <div className="ml-3 pb-0.5">
        <div className="flex flex-wrap gap-2 items-baseline">
          <span className="text-xs text-accent font-medium bg-accent/5 py-0.5 rounded-full">
            {entry.period}
          </span>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover/entry:text-accent transition-colors duration-300">
            {entry.title}
          </h4>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {entry.description}
        </p>
        {entry.url && (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-accent transition-colors duration-300 mt-1"
          >
            <div className="inline-flex items-center gap-1 text-xs">
              <span>View</span>
              <span>
                {<ExternalLink size={14} />}
              </span>
            </div>
          </a>
        )}
      </div>
    </motion.div>
  )
}