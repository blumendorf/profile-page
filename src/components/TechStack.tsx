import { motion } from 'framer-motion';
import Section from './Section';

type TechCategory = {
  name: string;
  items: string[];
};

const techCategories: TechCategory[] = [
  {
    name: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query'],
  },
  {
    name: 'Backend',
    items: ['Python', 'Firebase Functions', 'Pydantic', 'GCP Cloud Functions'],
  },
  {
    name: 'Data & Search',
    items: ['Firestore', 'BigQuery', 'Typesense', 'Elasticsearch', 'PostgreSQL'],
  },
  {
    name: 'AI & ML',
    items: ['OpenAI', 'Anthropic Claude', 'LangChain', 'Cohere', 'Google GenAI'],
  },
  {
    name: 'Infrastructure',
    items: ['GCP', 'Terraform', 'Cloud Tasks', 'Pub/Sub', 'Firebase Auth'],
  },
  {
    name: 'Practices',
    items: ['Vitest', 'Playwright', 'Cypress', 'CI/CD', 'Feature Flags'],
  },
];

const TechStack = () => {
  return (
    <Section id="tech-stack" className="border-y border-border-subtle bg-surface/30">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-label block"
      >
        // tech stack
      </motion.span>

      <motion.h2
        id="tech-stack-heading"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="heading-lg mb-4"
      >
        Technical Foundation
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-muted mb-10"
      >
        Tools I work with daily.
      </motion.p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {techCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + categoryIndex * 0.05 }}
          >
            <h3 className="text-xs font-mono font-medium text-accent uppercase tracking-wider mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span key={item} className="badge">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default TechStack;
