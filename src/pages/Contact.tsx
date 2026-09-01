import { useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { socials } from "../constants/social";
import {
  FaPaperPlane, FaGithub, FaFacebook,
  FaTwitter, FaEnvelope, FaLinkedin,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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

  const SOCIALS = [
    { icon: FaGithub,   index: 0, label: "GitHub"  },
    { icon: FaFacebook, index: 3, label: "Facebook" },
    { icon: FaTwitter,  index: 2, label: "Twitter"  },
    { icon: FaLinkedin, index: 1, label: "LinkedIn" },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#f8f8f9]">
      <Navigation />

      <main className="max-w-[1400px] mx-auto px-6 pt-16 pb-24">

        {/* Page heading — left-aligned, no eyebrow */}
        <div className="pt-10 pb-14 max-w-lg">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#141418] leading-[1.06] tracking-tight mb-4">
            Say hello.
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Questions, feedback, or just want to chat? Send a message and we will get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-[#e2e2e8] shadow-sm p-7 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-[#e2e2e8] rounded-xl bg-[#f8f8f9] text-[#141418] placeholder-slate-400 focus:ring-2 focus:ring-[#e8356d]/30 focus:border-[#e8356d] outline-none transition-all duration-150"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-[#e2e2e8] rounded-xl bg-[#f8f8f9] text-[#141418] placeholder-slate-400 focus:ring-2 focus:ring-[#e8356d]/30 focus:border-[#e8356d] outline-none transition-all duration-150"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-[#e2e2e8] rounded-xl bg-[#f8f8f9] text-[#141418] placeholder-slate-400 focus:ring-2 focus:ring-[#e8356d]/30 focus:border-[#e8356d] outline-none transition-all duration-150 resize-y min-h-[140px]"
                placeholder="What's on your mind?"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-[#e8356d] text-white font-bold shadow-lg shadow-[#e8356d]/30 hover:bg-[#d12460] hover:scale-[1.01] transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FaPaperPlane className="w-4 h-4" />
              {submitted ? "Message sent" : "Send Message"}
            </button>

            {submitted && (
              <p className="text-center text-sm text-[#16a34a] bg-[#dcfce7] px-4 py-2.5 rounded-xl animate-in">
                Thanks for reaching out. We will get back to you soon.
              </p>
            )}
          </form>

          {/* Contact info sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24 self-start">

            {/* Email */}
            <div className="bg-white rounded-2xl border border-[#e2e2e8] shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#fde8ef] flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-4 h-4 text-[#e8356d]" />
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
              </div>
              <a
                href="mailto:richiechristiandeguzman11@gmail.com"
                className="text-sm font-medium text-[#e8356d] hover:underline break-all"
              >
                richiechristiandeguzman11@gmail.com
              </a>
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl border border-[#e2e2e8] shadow-sm p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Follow us</p>
              <div className="space-y-2.5">
                {SOCIALS.map(({ icon: Icon, index, label }) => (
                  <a
                    key={label}
                    href={socials[index]?.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-[#e8356d] hover:bg-[#fde8ef] transition-all duration-150"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
