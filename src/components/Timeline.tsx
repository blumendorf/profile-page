import { useState } from 'react'

interface TimelineEntry {
  period: string
  title: string
  description: string
}

interface TimelineGroup {
  title: string
  description: string
  entries: TimelineEntry[]
}

const timelineGroups: TimelineGroup[] = [
  {
    title: "Education",
    description: "Academic foundation and early professional experience in computer science and web development.",
    entries: [
      {
        period: "July 1999 – September 1999",
        title: "Technical Support @ Schroedel",
        description: "Developed internal and external web pages and web-based applications."
      },
      {
        period: "June 2001 – September 2002",
        title: "Technical Consultant @ Continental AG",
        description: "Introduced an e-procurement system at the Aachen plant."
      },
      {
        period: "January 2003 – September 2005",
        title: "Student Researcher @ TU-Berlin, DAI-Labor",
        description: "Focus on human-computer interaction research, web-based and multimodal interaction, agent-oriented technologies."
      },
      {
        period: "October 2004 – July 2005",
        title: "Intern/Developer @ Sun Microsystems",
        description: "Developed mobile applications; wrote diploma thesis in collaboration with Sun and TU Berlin."
      }
    ]
  },
  {
    title: "PhD Research",
    description: "Advanced research in human-computer interaction and leadership of academic projects at TU-Berlin.",
    entries: [
      {
        period: "September 2005 – July 2009",
        title: "Researcher & Technical Project Manager @ TU-Berlin, DAI-Labor",
        description: "Led the human-computer interaction workgroup, managed public/private research projects, published and reviewed scientific papers."
      },
      {
        period: "March 2009 – July 2010",
        title: "Smart Senior Project Coordinator @ TU-Berlin, DAI-Labor",
        description: "Coordinated TU-Berlin's contribution (5 institutes, ~20 researchers) for the Smart Senior project (intelligent services for seniors)."
      },
      {
        period: "August 2009 – July 2010",
        title: "Co-Director, Competence Center Next Generation Services @ TU-Berlin, DAI-Labor",
        description: "Advised 13 PhD students, shaped the center's research direction, headed the Human-Computer Interaction workgroup."
      },
      {
        period: "September 2009 – August 2010",
        title: "(IZ) Connected Living",
        description: "Conducted smart home research and coordinated project proposals with industry partners in the Connected Living Association."
      }
    ]
  },
  {
    title: "Startup Leadership",
    description: "Leading roles in innovative startups, focusing on smart home and energy management solutions.",
    entries: [
      {
        period: "September 2010 – July 2012",
        title: "Independent Web-Developer & Volunteer",
        description: "Traveled across Asia, Australia, New Zealand, volunteering in sustainability projects, teaching English, and freelancing in web development."
      },
      {
        period: "September 2012 – December 2013",
        title: "Chief Developer @ yetu AG",
        description: "Built up the smart home development department from 2 to 18 developers across multiple teams."
      },
      {
        period: "January 2014 – April 2017",
        title: "CTO @ smartB Energy Management GmbH",
        description: "Led the dev team, raised funding, built a high-performance IoT system to reduce energy consumption in commercial buildings."
      }
    ]
  },
  {
    title: "Non-Profit Engagement",
    description: "Leadership roles in sustainability-focused organizations and community building.",
    entries: [
      {
        period: "January 2014 – March 2015",
        title: "Founder & Organizer @ Sustainability Drinks Berlin",
        description: "Established a regular event series to connect sustainability professionals in Berlin (later integrated into GreenBuzz Berlin e.V.)."
      },
      {
        period: "July 2014 – July 2017",
        title: "Vice President @ GreenBuzz Global",
        description: "Helped found a global network of sustainability professionals, expanding the \"Buzz\" to various cities."
      },
      {
        period: "March 2015 – Present",
        title: "Co-Founder & Vice President @ GreenBuzz Berlin e.V.",
        description: "Building and expanding a Berlin-based network for sustainability professionals, running events, and community outreach."
      }
    ]
  },
  {
    title: "Freelance CTO & Development",
    description: "Strategic consulting and technical leadership for various startups and established companies.",
    entries: [
      {
        period: "May 2017 – Present",
        title: "CTO / Fullstack Developer / Consultant @ blumendorf.info (Freelance)",
        description: "Working at the intersection of sustainability and IT, co-founding startups, launching apps, and supporting Berlin's tech scene."
      },
      {
        period: "September 2017 – March 2018",
        title: "CTO (Interim) @ iamsmart (RWE Startup)",
        description: "Led the development team for a smart home solution financed by RWE."
      },
      {
        period: "August 2018 – September 2018",
        title: "ReactJS Coach @ Uelzener Versicherungen",
        description: "Provided React training and coaching sessions to in-house developers."
      },
      {
        period: "August 2018 – July 2020",
        title: "Strategic Advisor @ Spreaducation (Freelance)",
        description: "Offered business planning, coaching, and operations management advice."
      },
      {
        period: "November 2018 – April 2019",
        title: "Frontend & Mobile Team Lead / Consultant @ Chattyco GmbH (Freelance)",
        description: "Built the first MVP of Chattyco's React Native app and a React web prototype to secure funding."
      },
      {
        period: "April 2019 – December 2020",
        title: "CTO @ QiLABS (Freelance)",
        description: "Full-stack development for the QiTime App, leading a remote engineering team, building the first product."
      },
      {
        period: "August 2019 – July 2020",
        title: "Strategic Advisor @ IOLITE GmbH (Freelance)",
        description: "Provided business planning, coaching, and operations management support."
      },
      {
        period: "January 2020 – December 2020",
        title: "CTO @ Mello App (SitEinander, Techstars '20)",
        description: "Re-developed the React Native app, supported the Techstars program, led a remote dev team."
      },
      {
        period: "May 2020 – April 2021",
        title: "Interims CTO / Mentor @ assetbird GmbH (Freelance)",
        description: "Built the MVP, set up infrastructure and processes, and mentored a remote engineering team."
      },
      {
        period: "September 2020 – March 2023",
        title: "Freelance Software Engineer & Consultant @ Kieback&Peter",
        description: "Developed an IoT platform for building management (GraphQL, .NET, Node.js, React, Azure)."
      }
    ]
  },
  {
    title: "CHAPTR",
    description: "Leading AI-driven innovation in the media and entertainment sector.",
    entries: [
      {
        period: "August 2023 – November 2023",
        title: "Senior Software Engineer @ CHAPTR",
        description: "Created AI-centric solutions for the media industry, focusing on React/React Native, Node.js, GCP, and Terraform."
      },
      {
        period: "November 2023 – Present",
        title: "Director of Software Engineering @ CHAPTR",
        description: "Leading teams building AI-enhanced B2B and B2C digital experiences for the Media & Entertainment sector."
      }
    ]
  }
]

function Timeline() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<number[]>([])

  const toggleGroup = (index: number) => {
    setExpandedGroups(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // Helper function to get timespan for a group
  const getGroupTimespan = (entries: TimelineEntry[]) => {
    const dates = entries.map(entry => {
      const [start] = entry.period.split('–').map(d => d.trim())
      return new Date(start)
    }).filter(date => !isNaN(date.getTime()))

    if (dates.length === 0) return ''

    const earliestYear = Math.min(...dates.map(d => d.getFullYear()))
    const latestYear = Math.max(...dates.map(d => d.getFullYear()))

    return `${earliestYear} – ${latestYear}`
  }

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto" id="timeline">
      <div className="text-center mb-6">
        <h2 className="heading-secondary text-center mb-2">
          Professional Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto text-sm">
          Over 20 years of experience in software development, leadership, and innovation.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="button-primary group flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300"
          >
            {isOpen ? 'Show Less' : 'View Timeline'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="relative animate-fade-in">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/40 to-accent/10"></div>

          <div className="space-y-4">
            {timelineGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="relative">
                <div className="absolute left-8 -translate-x-1/2 w-3 h-3 bg-accent rounded-full ring-2 ring-accent/20 z-10"></div>

                <div className="ml-14">
                  <button
                    onClick={() => toggleGroup(groupIndex)}
                    className="w-full text-left group bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                             rounded-lg border border-accent/20 p-3
                             hover:border-accent/40 transition-all duration-300
                             shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-base font-bold text-accent dark:text-accent-light group-hover:text-accent-dark dark:group-hover:text-accent-light transition-colors duration-300">
                            {group.title}
                          </h3>
                          <span className="text-xs text-accent/70 font-medium bg-accent/5 px-2 py-0.5 rounded-full">
                            {getGroupTimespan(group.entries)}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-0.5 text-xs">
                          {group.description}
                        </p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <svg
                          className={`w-4 h-4 text-accent transition-all duration-300 transform
                                    ${expandedGroups.includes(groupIndex) ? 'rotate-180' : ''}
                                    group-hover:scale-110`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {expandedGroups.includes(groupIndex) && (
                    <div className="mt-2 space-y-2 animate-fade-in pl-3 relative">
                      <div className="absolute left-0 top-0 bottom-4 w-0.5 bg-gradient-to-b from-accent/30 to-accent/10"></div>

                      {group.entries.map((entry, entryIndex) => (
                        <div
                          key={entryIndex}
                          className="relative flex gap-2 group/entry hover:bg-accent/5 p-2 rounded-md transition-all duration-300"
                        >
                          <div className="absolute left-0 top-3 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full ring-1 ring-accent/20 group-hover/entry:ring-accent/30 transition-all duration-300"></div>

                          <div className="ml-3 pb-2">
                            <div className="flex flex-wrap gap-2 items-baseline">
                              <span className="text-xs text-accent font-semibold bg-accent/10 px-1.5 py-0.5 rounded-full">
                                {entry.period}
                              </span>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover/entry:text-accent transition-colors duration-300">
                                {entry.title}
                              </h4>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                              {entry.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default Timeline