import {
  Code2,
  Server,
  Cloud,
  Database,
  Cpu,
  Rocket
} from 'lucide-react';

const TechStack = () => {
  const technologies = {
    "Front End": {
      items: ["React & React Native", "TypeScript", "Context or Redux", "Firebase, REST or GraphQL"],
      icon: <Code2 className="w-6 h-6" />,
    },
    "Back End": {
      items: ["Node.js", "Typescript", "Firebase", "HAPI"],
      icon: <Server className="w-6 h-6" />,
    },
    "Cloud & DevOps": {
      items: ["AWS / GCP / Azure", "Terraform", "Sentry", "LaunchDarkly"],
      icon: <Cloud className="w-6 h-6" />,
    },
    "Databases": {
      items: ["PostgreSQL", "Firestore", "Typesense", "Pinecone"],
      icon: <Database className="w-6 h-6" />,
    },
    "AI & Machine Learning": {
      items: ["Open AI", "Langchain", "Crew AI", "Hugging Face"],
      icon: <Cpu className="w-6 h-6" />,
    },
    "Agile": {
      items: ["JIRA, Linear, Notion", "Scrum/Kanban", "CI/CD", "Test-Driven Development"],
      icon: <Rocket className="w-6 h-6" />,
    }
  };

  return (
    <div className="section-container">
      <h2 className="heading-secondary text-center mb-16">Tech Stack Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(technologies).map(([category, { items, icon }]) => (
          <div
            key={category}
            className="relative group bg-white dark:bg-gray-800 p-6 rounded-xl
                       shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out
                       border border-gray-100 dark:border-gray-700
                       hover:-translate-y-1 hover:border-accent/30 dark:hover:border-accent-light/30"
          >
            {/* Category Icon Background */}
            <div className="absolute -top-5 left-4 bg-accent/10 dark:bg-accent/20
                            rounded-xl p-2 group-hover:scale-110 group-hover:bg-accent/20
                            dark:group-hover:bg-accent/30 transition-all duration-300">
              <svg
                className="w-6 h-6 text-accent dark:text-accent-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {icon}
              </svg>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 mt-2">
              {category}
            </h3>

            <ul className="space-y-2.5">
              {items.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center space-x-3 group/item
                             text-gray-600 hover:text-accent dark:text-gray-300
                             dark:hover:text-accent-light transition-all duration-200"
                >
                  <svg
                    className="w-3.5 h-3.5 text-accent/70 dark:text-accent-light/70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;