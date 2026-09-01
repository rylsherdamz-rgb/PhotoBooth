import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navigation />
      <main className="max-w-[1400px] mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-32 flex-1">

        <div className="space-y-6 mb-16 max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wider">
            Legal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Your privacy matters to us. This policy explains how SnapCharm
            collects, uses, and protects your information.
          </p>
          <p className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="max-w-3xl space-y-12 text-slate-700 leading-relaxed">
          <section className="space-y-4">
            <p>
              SnapCharm operates an online photobooth service that allows users to capture, customize, and download
              photos directly from their browser. We are committed to protecting
              your privacy and being transparent about how your data is handled.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Information We Collect</h2>
            <p>
              SnapCharm does not require account registration. However, certain
              information may be processed to provide our service:
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: "Camera Access",
                  desc: "When you use the photobooth, SnapCharm requests access to your device camera. Camera data is processed locally in your browser and is not automatically uploaded or stored on our servers."
                },
                {
                  title: "Photos",
                  desc: "Photos you capture are generated temporarily for preview and download. We do not permanently store your photos unless explicitly stated."
                },
                {
                  title: "Usage Data",
                  desc: "We may collect basic, anonymized information such as device type, browser, and page interactions to improve performance and user experience."
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center text-lg">📷</div>
                  <div>
                    <strong className="text-slate-900">{item.title}</strong>
                    <p className="text-slate-600 mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">How We Use Your Information</h2>
            <p>Information collected is used solely to:</p>
            <ul className="space-y-2 list-disc pl-6">
              <li>Provide and operate the SnapCharm photobooth</li>
              <li>Improve features, performance, and usability</li>
              <li>Ensure security and prevent abuse</li>
            </ul>
            <p className="mt-2">We do not sell, rent, or trade your personal information.</p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Cookies & Analytics</h2>
            <p>
              SnapCharm may use cookies or similar technologies for essential
              functionality and basic analytics. These help us understand how
              users interact with the site and improve the experience.
            </p>
            <p className="mt-2">You can control or disable cookies through your browser settings.</p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Third-Party Services</h2>
            <p>
              We may rely on third-party services for hosting, analytics, or media
              delivery. These services may collect limited data in accordance
              with their own privacy policies.
            </p>
            <p className="mt-2">SnapCharm is not responsible for the privacy practices of external websites or services linked from our platform.</p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Data Security</h2>
            <p>
              We take reasonable measures to protect your information.
              However, no method of transmission over the internet is 100%
              secure. Use SnapCharm at your own discretion.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Children's Privacy</h2>
            <p>
              SnapCharm is not intended for children under the age of 13.
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time.
              Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section className="space-y-4 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how your
              data is handled, you may contact us through the information
              provided on our <a href="/contact" className="text-pink-500 hover:underline font-medium">Contact page</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}