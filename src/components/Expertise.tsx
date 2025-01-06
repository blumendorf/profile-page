import { Beaker, Code2, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Expertise() {
  const capabilities = [
    {
      title: "Tech & AI Consulting",
      icon: <Beaker className="w-8 h-8 text-accent/60 dark:text-accent-light/60 mb-3" />,
      items: [
        "Business optimization through cutting-edge technology",
        "Strategic AI advisory (generative AI, agent-based systems)",
        "Industry expertise in media, publishing, and IoT",
        "Executive and startup consulting",
      ]
    },
    {
      title: "Development",
      icon: <Code2 className="w-8 h-8 text-accent/60 dark:text-accent-light/60 mb-3" />,
      items: [
        "Full-stack engineering with React, Node.js, TypeScript",
        "Mobile development with React Native",
        "Seamless AI integration within cloud-based architectures",
        "Infrastructure as code (Terraform) on AWS, GCP, or Azure"
      ]
    },
    {
      title: "Leadership",
      icon: <Users className="w-8 h-8 text-accent/60 dark:text-accent-light/60 mb-3" />,
      items: [
        "Interim CTO services",
        "Building and leading high-performing, innovative teams",
        "Scaling remote engineering organizations",
        "Implementing agile processes for rapid product delivery"
      ]
    }
  ]

  return (
    <div className="section-container">
      <h2 className="heading-secondary text-center mb-16">Expertise</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {capabilities.map((capability, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl
                        shadow-lg hover:shadow-xl transition-all duration-300
                        border border-gray-100 dark:border-gray-700
                        hover:-translate-y-1 hover:border-accent/30 dark:hover:border-accent-light/30"
          >
            <div className="flex flex-col items-center mb-6">
              {capability.icon}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                {capability.title}
              </h3>
            </div>
            <ul className="space-y-4">
              {capability.items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle2
                    className="w-4 h-4 text-accent/50 dark:text-accent-light/50 mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          to="/#contact"
          className="button-primary group flex items-center justify-center gap-2"
        >
          Need Help With Your Project?
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}