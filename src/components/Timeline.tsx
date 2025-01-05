import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { timelineGroups } from '../data/timeline'
import { TimelineEntry } from './TimelineEntry'
import { TimelineEntry as TimelineEntryType } from '../data/timeline'

function Timeline() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.timeline-group').forEach((group) => {
      observer.observe(group)
    })

    return () => observer.disconnect()
  }, [isOpen])

  const toggleGroup = (index: number) => {
    setExpandedGroups((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

  const getGroupTimespan = (entries: TimelineEntryType[]) => {
    const years = entries.map((entry) => {
      const [start, end] = entry.period.split('–').map(s => s.trim())
      return {
        start: parseInt(start),
        end: end?.toLowerCase().includes('present') ? 'Present' : parseInt(end),
        isPresent: end?.toLowerCase().includes('present')
      }
    }).filter(year => !isNaN(year.start))

    if (years.length === 0) return ''

    const earliestYear = Math.min(...years.map(y => y.start))
    const hasPresent = years.some(y => y.isPresent)
    const latestNumericYear = Math.max(...years.map(y => typeof y.end === 'number' ? y.end : y.start))
    const latestYear = hasPresent ? 'Present' : latestNumericYear

    return earliestYear !== latestYear
      ? `${earliestYear} – ${latestYear}`
      : `${earliestYear}`
  }

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="timeline">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="heading-secondary text-center mb-2">
          Professional Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto text-sm">
          Over 20 years of experience in software development, leadership, and innovation.
        </p>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`
              group flex items-center justify-center gap-3
              px-6 py-3 rounded-lg transition-all duration-300
              border border-accent/20 hover:border-accent/40
              text-accent
              ${isOpen
                ? 'bg-accent/10 dark:bg-accent/20 hover:bg-accent/20 dark:hover:bg-accent/30'
                : 'bg-white dark:bg-gray-800 hover:bg-accent/10 dark:hover:bg-accent/20'
              }
              shadow-sm hover:shadow-md backdrop-blur-sm
            `}
          >
            <span className="font-medium text-sm">
              {isOpen ? 'Collapse Timeline' : 'View Full Timeline'}
            </span>
            <ChevronDown className="w-4 h-4 text-accent" strokeWidth={1.5} />
          </motion.button>
        </div>
      </motion.div>

      {/* Timeline content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative"
          >
            {/* Vertical line behind timeline cards */}
            <div className="absolute left-8 top-[0.85rem] bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/30 to-accent/10">
              <div className="absolute top-0 left-0 w-full h-full animate-pulse-subtle bg-gradient-to-b from-accent/30 to-transparent" />
            </div>

            <motion.div
              className="space-y-1"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {timelineGroups.map((group, groupIndex) => (
                <motion.div
                  key={groupIndex}
                  className="relative timeline-group p-2"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  {/* The timeline dot */}
                  <motion.div
                    className="absolute left-8 -translate-x-1/2 w-3 h-3 bg-accent rounded-full ring-2 ring-accent/20 z-10"
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      boxShadow: expandedGroups.includes(groupIndex)
                        ? '0 0 0 4px rgba(4, 170, 0, 0.2)'
                        : '0 0 0 2px rgba(4, 170, 0, 0.1)'
                    }}
                  />

                  {/* Group accordion header */}
                  <div className="ml-16">
                    <motion.button
                      onClick={() => toggleGroup(groupIndex)}
                      className={`w-full text-left group
                        bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                        rounded-lg border border-accent/10
                        hover:border-accent/30 transition-all duration-300
                        ${expandedGroups.includes(groupIndex)
                          ? 'rounded-b-none border-b-0'
                          : ''
                        }`}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex justify-between items-center p-2">
                        <div className="flex-1 flex items-center gap-2">
                          <div className="text-lg">{group.icon}</div>
                          <div>
                            <div className="flex items-baseline gap-2">
                              <h3 className="text-sm font-bold text-accent dark:text-accent-light
                                group-hover:text-accent-dark dark:group-hover:text-accent-light
                                transition-colors duration-300">
                                {group.title}
                              </h3>
                              <span className="text-xs text-accent/70 font-medium
                                bg-accent/5 px-1.5 py-0.5 rounded-full">
                                {getGroupTimespan(group.entries)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1">
                              {group.description}
                            </p>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <ChevronDown
                            className={`w-4 h-4 text-accent transition-all duration-300 transform
                              ${expandedGroups.includes(groupIndex) ? 'rotate-180' : ''}
                              group-hover:scale-110`}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </motion.button>

                    {/* Entries inside each group */}
                    <AnimatePresence>
                      {expandedGroups.includes(groupIndex) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="relative overflow-hidden
                            border border-accent/10 border-t-0
                            rounded-b-lg bg-white/30 dark:bg-gray-800/30"
                        >
                          <div className="p-2 space-y-1.5">
                            {/* Thin line to connect entries inside group */}
                            <div className="absolute left-0 top-[0.85rem] bottom-4 w-0.5
                              bg-gradient-to-b from-accent/20 to-accent/5" />

                            {group.entries.map((entry, entryIndex) => (
                              <TimelineEntry
                                key={entryIndex}
                                entry={entry}
                                entryIndex={entryIndex}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styles */}
      <style>{`
        @keyframes pulse-subtle {
          0% { opacity: 0.3; }
          50% { opacity: 0.7; }
          100% { opacity: 0.3; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

export default Timeline
