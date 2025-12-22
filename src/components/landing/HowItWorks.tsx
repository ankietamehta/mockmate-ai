export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32"
    >
      {/* background glow – SAME FAMILY AS HERO */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-3">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white">
            Your Journey to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              Interview Success
            </span>
            
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
            Get started in four simple steps and transform your interview
            performance with MockMate AI.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Choose Your Role",
              desc:
                "Select the job role, domain, or tech stack you want to prepare interviews for.",
            },
            {
              step: "02",
              title: "Start Mock Interview",
              desc:
                "Practice realistic AI-driven mock interviews designed to simulate real interview pressure.",
            },
            {
              step: "03",
              title: "Get Instant Feedback",
              desc:
                "Receive detailed feedback on clarity, confidence, structure, and communication.",
            },
            {
              step: "04",
              title: "Crack Real Interviews",
              desc:
                "Apply your learnings, improve fast, and walk into interviews with confidence.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="
                relative rounded-4xl p-9
                bg-white/5 backdrop-blur-xl
                border border-white/10
                transition-all duration-300
                hover:-translate-y-2
                hover:border-indigo-400/40
                hover:shadow-[0_0_45px_rgba(99,102,241,0.18)]
              "
            >
              {/* Step circle */}
              <div className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                {item.step}
              </div>

              
                <h3 className="mt-6 text-xl lg:text-2xl font-semibold text-white whitespace-nowrap">

                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
