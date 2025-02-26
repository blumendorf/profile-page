export default function Hero() {
  return (
    <div className="relative min-h-[700px] h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            {/* Profile Image with Name */}
            <div className="space-y-4">
              <div className="relative inline-block">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800 ring-4 ring-accent/10">
                  <img
                    src={`${import.meta.env.BASE_URL}marco-small.jpg`}
                    alt="Dr Marco Blumendorf - Tech Leader and AI Expert"
                    className="w-full h-full object-cover object-center"
                    role="img"
                    aria-label="Profile photo of Dr Marco Blumendorf"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-accent dark:text-accent-light">
                  Dr Marco Blumendorf
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">
                  Tech Leader, Full-Stack Developer & AI Expert
                </p>
              </div>
            </div>

            {/* Main Heading */}
            <div className="pt-4">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                I'm a tech leader and AI enthusiast with a PhD from the Distributed Artificial Intelligence Laboratory at the Technical University of Berlin,
                offering consulting and full-stack development for startups and enterprises of all sizes.
                From building generative AI tools for publishers to creating next-level digital products,
                I help teams innovate, scale, and deliver real impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}