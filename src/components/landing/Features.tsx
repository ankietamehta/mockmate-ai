export default function Features() {
  return (
    <section id="features" className="relative py-32">
      {/* soft glow background (same family as hero) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Succeed
          </span>
        </h2>

        {/* Subtitle (bigger & clearer) */}
        <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
          Comprehensive tools and AI-driven guidance designed to help you
          prepare, perform, and succeed in real interviews.
        </p>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "AI Mock Interviews",
              subtitle: "Practice like it’s the real thing at any time you want , get comfortable with the interview flow and question types.",
              benefit:
                "Face realistic interview questions tailored to your role and experience.",
            },
            {
              title: "Smart AI Feedback",
              subtitle: "Know exactly what to improve - Get honest and detailed actionable feedback on your performance after each mock.",
              benefit:
                "Get instant insights on clarity, confidence, structure, and communication.",
            },
            {
              title: "Role-Based Preparation",
              subtitle: "Built for your career path - Don't just give mock interviews randomly , give mock according to your aim role.",
              benefit:
                "Customized prep for Developers, Product, HR, Analysts, and more.",
            },
            {
              title: "Confidence Training",
              subtitle: "Beat interview anxiety - Daily Interview practice gives you unshakable confidence to rock any interview.",
              benefit:
                "Simulate pressure environments so you stay calm and confident.",
            },
            {
              title: "Progress Tracking",
              subtitle: "See your improvement clearly, work on flaws effectively and track ups and downs, and improve faster.",
              benefit:
                "Track attempts, feedback trends, and readiness over time.",
            },
            {
              title: "Interview-Ready Mindset",
              subtitle: "Think like a top candidate, prepare your mind with what questions can be asked and how it should be answered.",
              benefit:
                "Develop structured thinking and strong answer frameworks.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="
                group relative rounded-2xl
                p-10 min-h-[280px]
                bg-white/5 backdrop-blur-xl
                border border-white/10
                text-left
                transition-all duration-300
                hover:-translate-y-2
                hover:border-indigo-400/40
                hover:shadow-[0_0_45px_rgba(99,102,241,0.18)]
              "
            >
              {/* Main heading */}
              <h3 className="text-2xl font-semibold text-white">
                {item.title}
              </h3>

              {/* Subheading */}
              <p className="mt-3 text-sm text-indigo-300">
                {item.subtitle}
              </p>

              {/* Benefit */}
              <p className="mt-5 text-sm leading-relaxed text-gray-300">
                <span className="text-pink-400 font-medium">Benefit:</span>{" "}
                {item.benefit}
              </p>

              {/* subtle bottom glow line */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
