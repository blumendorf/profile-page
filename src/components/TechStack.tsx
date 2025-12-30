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
    <Section id="tech-stack" className="bg-surface/30 border-y border-border-subtle/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">Technical Foundation</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Tools I work with daily.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + categoryIndex * 0.1 }}
              className="bg-card/50 rounded-lg p-6 border border-border-subtle hover:border-border-active transition-colors"
            >
              <h3 className="text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4 border-b border-border-subtle pb-2">
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
                    className="badge-accent cursor-default relative overflow-hidden group"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
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
