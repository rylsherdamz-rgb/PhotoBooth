import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
      <Navigation />
      <main className="max-w-[1400px] mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-32">
        <section className="space-y-8 mb-20 text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wider">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 leading-tight">
            About SnapCharm
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            SnapCharm is an online photobooth built to make capturing
            cute, aesthetic moments simple, fast, and fun — directly
            from your browser.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Why SnapCharm Exists
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              We created SnapCharm for people who love taking photos but
              don't want complicated apps, heavy downloads, or confusing
              interfaces. Whether you're capturing moments alone, with
              friends, or during special events, SnapCharm keeps the
              experience effortless.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Everything runs in your browser — open the booth, smile,
              snap, and download. No sign-ups. No friction.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              What Makes It Different
            </h2>
            <ul className="space-y-4">
              {[
                "Clean, minimal photobooth experience",
                "Cute filters and modern layouts",
                "Fast, browser-based performance",
                "Privacy-first — your photos stay yours",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-pink-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center text-lg">
                    ✨
                  </div>
                  <span className="text-slate-700 text-lg mt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-12 mb-24">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 leading-tight">
              The Principles Behind SnapCharm
            </h2>
            <p className="text-slate-600 text-lg">
              How we build, what we prioritize, and why it matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Simplicity",
                desc: "No clutter, no learning curve — just open and snap.",
              },
              {
                icon: "🎨",
                title: "Creativity",
                desc: "Tools that let your personality shine through photos.",
              },
              {
                icon: "🔒",
                title: "Privacy",
                desc: "We respect your data and never overstep.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 leading-tight">
            Built for Moments That Matter
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            SnapCharm is designed to turn everyday moments into memories
            worth keeping. We believe photos should feel fun, effortless,
            and personal — just like the moments themselves.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}