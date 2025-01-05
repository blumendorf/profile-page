import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Rocket,
  HeartHandshake,
  Laptop,
  Film,
  ChevronDown,
} from 'lucide-react'

interface TimelineEntry {
  period: string
  title: string
  description: string
}

interface TimelineGroup {
  title: string
  description: string
  entries: TimelineEntry[]
  icon: JSX.Element
}

const timelineGroups: TimelineGroup[] = [
  {
    title: 'Academic Career',
    description:
      'Academic journey and research leadership in human-computer interaction at Distributed Artifical Intelligence Lab (DAI-Labor) at TU-Berlin.',
    icon: <GraduationCap className="text-accent" strokeWidth={1.5} />,
    entries: [
      {
        period: '1999 – 2005',
        title: 'Early Career & Education',
        description:
          'Started with early web development roles, followed by student research at TU-Berlin and internship at Sun Microsystems.'
      },
      {
        period: '2005 – 2009',
        title: 'PhD Student, Researcher & Project Manager @ TU-Berlin',
        description:
          'Led the Human-Computer Interaction workgroup, managed public/private research projects, and completed PhD thesis on "Multimodal Interaction in Smart Environments: A Model-based Runtime System for Ubiquitous User Interfaces".'
      },
      {
        period: '2009 – 2010',
        title: 'Co-Director, Competence Center Next Generation Services @ TU-Berlin',
        description:
          'Advised 13 PhD students, shaped the center\'s research direction, headed the Human-Computer Interaction workgroup.'
      }
    ]
  },
  {
    title: 'Startup Leadership',
    description:
      'Leading roles in innovative startups, focusing on smart home and energy management solutions.',
    icon: <Rocket className="text-accent" strokeWidth={1.5} />,
    entries: [
      {
        period: '2010 – 2012',
        title: 'Independent Web-Developer & Volunteer',
        description:
          'Traveled across Asia, Australia, New Zealand, volunteering in sustainability projects, teaching English, and freelancing in web development.'
      },
      {
        period: '2012 – 2013',
        title: 'Chief Developer @ yetu AG',
        description:
          'Built up the smart home development department from 2 to 18 developers across multiple teams.'
      },
      {
        period: '2014 – 2017',
        title: 'CTO @ smartB Energy Management GmbH',
        description:
          'Led the dev team, raised funding, built a high-performance IoT system to reduce energy consumption in commercial buildings.'
      }
    ]
  },
  {
    title: 'Non-Profit Engagement',
    description:
      'Leadership roles in sustainability-focused organizations and community building.',
    icon: <HeartHandshake className="text-accent" strokeWidth={1.5} />,
    entries: [
      {
        period: '2014 – 2015',
        title: 'Founder & Organizer @ Sustainability Drinks Berlin',
        description:
          'Established a regular event series to connect sustainability professionals in Berlin (later integrated into GreenBuzz Berlin e.V.).'
      },
      {
        period: '2014 – 2017',
        title: 'Vice President @ GreenBuzz Global',
        description:
          'Helped found a global network of sustainability professionals, expanding the "Buzz" to various cities.'
      },
      {
        period: '2015 – Present',
        title: 'Co-Founder & Vice President @ GreenBuzz Berlin e.V.',
        description:
          'Building and expanding a Berlin-based network for sustainability professionals, running events, and community outreach.'
      }
    ]
  },
  {
    title: 'Freelance & Interim CTO',
    description:
      'Strategic consulting and technical leadership for various startups and established companies.',
    icon: <Laptop className="text-accent" strokeWidth={1.5} />,
    entries: [
      {
        period: '2017 – 2023',
        title: 'CTO / Fullstack Developer / Consultant @ blumendorf.info',
        description:
          'Led multiple high-impact projects as freelance CTO and consultant: Built web- and mobile apps, led engineering teams for various startups, provided technical leadership and React coaching for established companies, and offered strategic advisory services for sustainability and IoT initiatives. Specialized in Typescript, React, React Native, Node.js, and cloud infrastructure.'
      }
    ]
  },
  {
    title: 'CHAPTR',
    description:
      'Leading AI-driven innovation in the media and entertainment sector.',
    icon: <Film className="text-accent" strokeWidth={1.5} />,
    entries: [
      {
        period: '2023 – 2023',
        title: 'Senior Software Engineer @ CHAPTR',
        description:
          'Created AI-centric solutions for the media industry, focusing on React, React Native, Node.js, GCP, and Terraform.'
      },
      {
        period: '2023 – Present',
        title: 'Director of Software Engineering @ CHAPTR',
        description:
          'Leading teams building AI-enhanced B2B and B2C digital experiences for the Media & Entertainment sector.'
      }
    ]
  }
]

function Timeline() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<number[]>([])

  // Intersection Observer for fade-in animation
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

  // Helper function to get timespan for a group
  const getGroupTimespan = (entries: TimelineEntry[]) => {
    const years = entries
      .map((entry) => {
        const [start] = entry.period.split('–')
        return parseInt(start.trim())
      })
      .filter(Boolean)

    if (years.length === 0) return ''
    const earliestYear = Math.min(...years)
    const latestYear = Math.max(...years)

    return earliestYear !== latestYear
      ? `${earliestYear} – ${latestYear}`
      : `${earliestYear}`
  }

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto" id="timeline">
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
            <ChevronDown
              className="w-4 h-4 text-accent"
              strokeWidth={1.5}
            />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative"
          >
            {/* Vertical line behind timeline cards */}
            <div className="absolute left-8 top-[0.85rem] bottom-0 w-0.5
              bg-gradient-to-b from-accent via-accent/30 to-accent/10">
              <div className="absolute top-0 left-0 w-full h-full
                animate-pulse-subtle bg-gradient-to-b from-accent/30 to-transparent" />
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
                              <motion.div
                                key={entryIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: entryIndex * 0.1 }}
                                className="relative flex gap-2 group/entry
                                  hover:bg-accent/5 dark:hover:bg-accent/10
                                  p-1.5 rounded-md"
                              >
                                <motion.div
                                  className="absolute left-0 top-3 -translate-x-1/2 w-1 h-1
                                    bg-accent rounded-full ring-1 ring-white dark:ring-gray-800"
                                  whileHover={{ scale: 1.5 }}
                                  animate={{
                                    boxShadow: '0 0 0 2px rgba(4, 170, 0, 0.1)'
                                  }}
                                />
                                <div className="ml-3 pb-0.5">
                                  <div className="flex flex-wrap gap-2 items-baseline">
                                    <span className="text-xs text-accent font-medium
                                      bg-accent/5 px-1.5 py-0.5 rounded-full">
                                      {entry.period}
                                    </span>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white
                                      group-hover/entry:text-accent transition-colors duration-300">
                                      {entry.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                    {entry.description}
                                  </p>
                                </div>
                              </motion.div>
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

      {/* Custom animations */}
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
        .text-accent {
          color: #04AA00;
        }
        .dark .text-accent {
          color: #05c800;
        }
        .bg-accent/5 {
          background-color: rgba(4, 170, 0, 0.05);
        }
        .dark .bg-accent/5 {
          background-color: rgba(5, 200, 0, 0.05);
        }
        .border-accent/20 {
          border-color: rgba(4, 170, 0, 0.2);
        }
        .dark .border-accent/20 {
          border-color: rgba(5, 200, 0, 0.2);
        }
        .border-accent/40 {
          border-color: rgba(4, 170, 0, 0.4);
        }
        .dark .border-accent/40 {
          border-color: rgba(5, 200, 0, 0.4);
        }
        /* Dark mode background colors */
        .dark .bg-blue-950\/30 { background-color: rgba(23, 37, 84, 0.3); }
        .dark .bg-green-950\/30 { background-color: rgba(5, 46, 22, 0.3); }
        .dark .bg-yellow-950\/30 { background-color: rgba(66, 32, 6, 0.3); }
        .dark .bg-pink-950\/30 { background-color: rgba(80, 7, 36, 0.3); }
        .dark .bg-purple-950\/30 { background-color: rgba(59, 7, 100, 0.3); }
        .dark .bg-red-950\/30 { background-color: rgba(69, 10, 10, 0.3); }
      `}</style>
    </section>
  )
}

export default Timeline
