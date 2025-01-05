export default function Services() {
  const services = [
    {
      title: "Tech & AI Consulting",
      items: [
        "Business optimization through cutting-edge technology",
        "Strategic AI advisory (generative AI, agent-based systems)",
        "Industry expertise in media, publishing, and IoT",
        "Executive and startup consulting",
      ]
    },
    {
      title: "Development",
      items: [
        "Full-stack engineering with React, Node.js, TypeScript",
        "Mobile development with React Native",
        "Seamless AI integration within cloud-based architectures",
        "Infrastructure as code (Terraform) on AWS, GCP, or Azure"
      ]
    },
    {
      title: "Leadership",
      items: [
        "Interim CTO services",
        "Building and leading high-performing, innovative teams",
        "Scaling remote engineering organizations",
        "Implementing agile processes for rapid product delivery"
      ]
    }
  ]

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <h2 className="heading-secondary text-center mb-16">Services</h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl shadow-lg border-l-4 border-accent hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-accent dark:text-accent-light mb-6">{service.title}</h3>
              <ul className="space-y-4">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}