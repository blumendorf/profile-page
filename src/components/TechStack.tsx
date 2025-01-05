const TechStack = () => {
  const technologies = {
    "Front End": {
      items: ["React & React Native", "TypeScript", "Context or Redux", "Firebase, REST or GraphQL"],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      )
    },
    "Back End": {
      items: ["Node.js", "Typescript", "Firebase", "HAPI"],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      )
    },
    "Cloud & DevOps": {
      items: ["AWS / GCP / Azure", "Terraform", "Sentry", "LaunchDarkly"],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      )
    },
    "Databases": {
      items: ["PostgreSQL", "Firestore", "Typesense", "Pinecone"],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      )
    },
    "AI & Machine Learning": {
      items: ["Open AI", "Langchain", "Crew AI", "Hugging Face"],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      )
    },
    "Agile": {
      items: ["JIRA, Linear, Notion", "Scrum/Kanban", "CI/CD", "Test-Driven Development"],
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      )
    }
  };

  return (
    <section id="tech-stack" className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="heading-secondary mb-2">Tech Stack Favorites</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-xl">
            A list of selected technologies I use to build
          </p>
        </div>

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
              <div className="absolute -top-4 left-4 bg-accent/10 dark:bg-accent/20
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
    </section>
  );
};

export default TechStack;