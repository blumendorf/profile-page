import { motion } from 'framer-motion';
import Section from './Section';

type TechCategory = {
  name: string;
  items: string[];
};

const techCategories: TechCategory[] = [
  {
    name: 'Front End',
    items: ['React', 'React Native', 'TypeScript', 'Context/Redux', 'REST', 'GraphQL', 'Firebase'],
  },
  {
    name: 'Back End',
    items: ['Node.js', 'TypeScript', 'Firebase', 'HAPI', 'Event-driven architectures'],
  },
  {
    name: 'Cloud & Infrastructure',
    items: ['AWS', 'GCP', 'Azure', 'Terraform', 'Sentry', 'LaunchDarkly'],
  },
  {
    name: 'Data & AI',
    items: ['PostgreSQL', 'Firestore', 'Pinecone', 'Typesense', 'OpenAI', 'Langchain', 'CrewAI', 'Hugging Face'],
  },
  {
    name: 'Development Practice',
    items: ['Scrum', 'Kanban', 'CI/CD', 'TDD', 'AI-assisted workflows'],
  },
];

const TechStack = () => {
  return (
    <Section id="tech-stack">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          id="tech-stack-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-lg mb-4 text-center"
        >
          Tech Stack Favorites
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted text-center max-w-2xl mx-auto mb-12"
        >
          The tools I work with daily—chosen for productivity, AI-compatibility, and proven reliability.
        </motion.p>

        <div className="space-y-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + categoryIndex * 0.1 }}
            >
              <h3 className="text-sm font-mono font-medium text-text-muted uppercase tracking-wider mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.2,
                      delay: 0.2 + categoryIndex * 0.1 + itemIndex * 0.03,
                    }}
                    className="badge-accent"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TechStack;

