import Navigation from "../components/Navigation";
import Footer from "../components/Footer";


export default function About() {
  return (
    <div>
      <Navigation />

    <main className="max-w-5xl mx-auto px-6 pt-32 pb-40">
      <section className="space-y-8 mb-24">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
          About SnapCharm
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl">
          SnapCharm is an online photobooth built to make capturing
          cute, aesthetic moments simple, fast, and fun — directly
          from your browser.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-16 items-start mb-32">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why SnapCharm Exists
          </h2>
          <p className="text-slate-700 leading-relaxed">
            We created SnapCharm for people who love taking photos but
            don’t want complicated apps, heavy downloads, or confusing
            interfaces. Whether you’re capturing moments alone, with
            friends, or during special events, SnapCharm keeps the
            experience effortless.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Everything runs in your browser — open the booth, smile,
            snap, and download. No sign-ups. No friction.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            What Makes It Different
          </h2>
          <ul className="space-y-4 text-slate-700">
            <li>✨ Clean, minimal photobooth experience</li>
            <li>📸 Cute filters and modern layouts</li>
            <li>⚡ Fast, browser-based performance</li>
            <li>🔒 Privacy-first — your photos stay yours</li>
          </ul>
        </div>
      </section>

      {/* VALUES */}
      <section className="space-y-16 mb-32">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">
            Our Values
          </h2>
          <p className="text-slate-600">
            The principles behind how SnapCharm is built.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Simplicity",
              desc: "No clutter, no learning curve — just open and snap.",
            },
            {
              title: "Creativity",
              desc: "Tools that let your personality shine through photos.",
            },
            {
              title: "Privacy",
              desc: "We respect your data and never overstep.",
            },
          ].map((value, i) => (
            <div
              key={i}
              className="
                bg-white
                rounded-3xl p-8
                shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)]
              "
            >
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {value.title}
              </h3>
              <p className="text-slate-600">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">
          Built for Moments That Matter
        </h2>
        <p className="text-lg text-slate-600">
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
