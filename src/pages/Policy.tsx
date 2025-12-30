import Footer from "../components/Footer";
import Navigation from "../components/Navigation";


export default function PrivacyPolicy() {
  return (<div className="w-full h-full flex flex-1 flex-col ">
    <Navigation />
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-40">

      {/* Header */}
      <div className="space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Privacy Policy
        </h1>
        <p className="text-slate-600 text-lg">
          Your privacy matters to us. This policy explains how SnapCharm
          collects, uses, and protects your information.
        </p>
        <p className="text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-14 text-slate-700 leading-relaxed">
        {/* Intro */}
        <section className="space-y-4">
          <p>
            SnapCharm we operates an online photobooth
            service that allows users to capture, customize, and download
            photos directly from their browser. We are committed to protecting
            your privacy and being transparent about how your data is handled.
          </p>
        </section>

        {/* Info We Collect */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Information We Collect
          </h2>

          <p>
            SnapCharm does not require account registration. However, certain
            information may be processed to provide our service:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Camera Access:</strong> When you use the photobooth,
              SnapCharm requests access to your device camera. Camera data is
              processed locally in your browser and is not automatically
              uploaded or stored on our servers.
            </li>
            <li>
              <strong>Photos:</strong> Photos you capture are generated
              temporarily for preview and download. We do not permanently
              store your photos unless explicitly stated.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect basic, anonymized
              information such as device type, browser, and page interactions
              to improve performance and user experience.
            </li>
          </ul>
        </section>

        {/* How We Use */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            How We Use Your Information
          </h2>

          <p>
            Information collected is used solely to:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and operate the SnapCharm photobooth</li>
            <li>Improve features, performance, and usability</li>
            <li>Ensure security and prevent abuse</li>
          </ul>

          <p>
            We do not sell, rent, or trade your personal information.
          </p>
        </section>

        {/* Cookies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Cookies & Analytics
          </h2>

          <p>
            SnapCharm may use cookies or similar technologies for essential
            functionality and basic analytics. These help us understand how
            users interact with the site and improve the experience.
          </p>

          <p>
            You can control or disable cookies through your browser settings.
          </p>
        </section>

        {/* Third Parties */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Third-Party Services
          </h2>

          <p>
            We may rely on third-party services for hosting, analytics, or media
            delivery. These services may collect limited data in accordance
            with their own privacy policies.
          </p>

          <p>
            SnapCharm is not responsible for the privacy practices of external
            websites or services linked from our platform.
          </p>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Data Security
          </h2>

          <p>
            We take reasonable measures to protect your information.
            However, no method of transmission over the internet is 100%
            secure. Use SnapCharm at your own discretion.
          </p>
        </section>

        {/* Children */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Children’s Privacy
          </h2>

          <p>
            SnapCharm is not intended for children under the age of 13.
            We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Changes to This Policy
          </h2>

          <p>
            We may update this Privacy Policy from time to time.
            Changes will be posted on this page with an updated revision date.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Contact Us
          </h2>

          <p>
            If you have any questions about this Privacy Policy or how your
            data is handled, you may contact us through the information
            provided on our website.
          </p>
        </section>
      </div>
    </main>

    <Footer />
  </div>
  );
}
