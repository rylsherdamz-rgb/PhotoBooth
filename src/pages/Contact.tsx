import { useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { socials } from "../constants/social";
import { FaPaperPlane, FaGithub, FaFacebook, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div>
      <Navigation />
      <main className="max-w-[1400px] mx-auto px-6 pt-24 pb-24 lg:pt-32 lg:pb-32">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 leading-tight">
            Contact Us
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
            We'd love to hear from you! Whether it's feedback, questions, or
            support, reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl"
          >
            <div className="space-y-3">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
                placeholder="Your Name"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all duration-200 resize-y min-h-[140px]"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-pink-500 text-white text-lg font-semibold shadow-lg shadow-pink-500/30 hover:bg-pink-400 hover:scale-[1.02] hover:shadow-pink-500/40 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FaPaperPlane />
              {submitted ? "Sent! ✓" : "Send Message"}
            </button>

            {submitted && (
              <p className="text-center text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl animate-in">
                Thanks for reaching out! We'll get back to you soon.
              </p>
            )}
          </form>

          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">Get in Touch</h2>
              <p className="text-slate-600 leading-relaxed">
                Have questions or feedback? Reach us through the channels below!
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <a href="mailto:richiechristiandeguzman11@gmail.com" className="text-pink-500 hover:underline font-medium">
                      hello@snap-charm.vercel.app
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-500 flex items-center justify-center">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <span className="text-slate-700">Philippines</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <a href={socials[0].url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-pink-300 hover:text-pink-500 hover:shadow-lg transition-all duration-200">
                  <FaGithub className="w-6 h-6" />
                </a>
                <a href={socials[3].url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-pink-300 hover:text-pink-500 hover:shadow-lg transition-all duration-200">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href={socials[2].url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-pink-300 hover:text-pink-500 hover:shadow-lg transition-all duration-200">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href={socials[1].url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-pink-300 hover:text-pink-500 hover:shadow-lg transition-all duration-200">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}