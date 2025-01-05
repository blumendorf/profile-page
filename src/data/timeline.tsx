import { GraduationCap, Rocket, HeartHandshake, Laptop, Film } from 'lucide-react'
import type { ReactElement } from 'react'

export type TimelineEntry = {
  period: string
  title: string
  description: string
  url?: string
}

export interface TimelineGroup {
  title: string
  description: string
  entries: TimelineEntry[]
  icon: ReactElement
}

export const timelineGroups: TimelineGroup[] = [
  {
    title: 'Academic Career',
    description:
      'Academic journey and research leadership in human-computer interaction at Distributed Artifical Intelligence Lab (DAI-Labor) at TU-Berlin.',
    icon: <GraduationCap className="text-accent" strokeWidth = { 1.5} />,
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
          'Led the Human-Computer Interaction workgroup, managed public/private research projects, and completed PhD thesis on "Multimodal Interaction in Smart Environments: A Model-based Runtime System for Ubiquitous User Interfaces".',
        url: "https://depositonce.tu-berlin.de/items/bb6134fa-91f6-49c9-b93e-3687a8e4869d",
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
    icon: <Rocket className="text-accent" strokeWidth = { 1.5} />,
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
    icon: <HeartHandshake className="text-accent" strokeWidth = { 1.5} />,
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
    icon: <Laptop className="text-accent" strokeWidth = { 1.5} />,
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
      'Leading AI-driven innovation in the publishing industry.',
    icon: <Film className="text-accent" strokeWidth = { 1.5} />,
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
          'Leading teams building AI-enhanced B2B and B2C digital experiences for the publishing industry.'
      }
    ]
  }
]
