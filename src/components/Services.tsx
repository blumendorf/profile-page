export default function Services() {
  const services = [
    {
      title: "Consulting",
      items: [
        "Strategic AI advisory (generative AI, agent-based systems)",
        "Business optimization through cutting-edge technology"
      ]
    },
    {
      title: "AI Solutions",
      items: [
        "Custom AI development (chat assistants, content generation tools)",
        "Industry expertise in media, publishing, and IoT"
      ]
    },
    {
      title: "Development",
      items: [
        "Full-stack engineering with React, React Native, Node.js, Terraform",
        "Seamless AI integration within cloud-based architectures"
      ]
    },
    {
      title: "Leadership",
      items: [
        "Interim CTO services to scale AI-driven teams and processes",
        "Building high-performing, innovative teams"
      ]
    }
  ]

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <h2 className="heading-secondary text-center mb-16">My Services</h2>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-l-4 border-accent hover:shadow-xl transition-shadow duration-300">
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