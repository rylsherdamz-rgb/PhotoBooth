import { useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { FaPaperPlane, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with your API or email service
    alert("Message sent! Thank you for contacting SnapCharm.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <Navigation />
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-40">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Contact Us
        </h1>
        <p className="text-slate-600 text-lg md:text-xl">
          We'd love to hear from you! Whether it’s feedback, questions, or
          support, reach out and we’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Form + Info */}
      <div className="grid md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-3xl p-8 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)]"
        >
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-pink-400 focus:border-pink-400 outline-none"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-pink-400 focus:border-pink-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full border border-slate-300 rounded-lg p-3 text-slate-700 focus:ring-pink-400 focus:border-pink-400 outline-none"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-3 w-full py-3 rounded-2xl bg-pink-500 text-white text-lg font-semibold hover:bg-pink-400 transition"
          >
            <FaPaperPlane /> Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)] space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Get in Touch</h2>
            <p className="text-slate-600">
              Have questions or feedback? Reach us through the channels below!
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>Email: <a href="mailto:hello@snap-charm.vercel.app" className="text-pink-500 hover:underline">hello@snap-charm.vercel.app</a></li>
              <li>Phone: <span className="text-slate-500">+63 912 345 6789</span></li>
              <li>Address: <span className="text-slate-500">Philippines</span></li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.18)] text-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Follow Us</h3>
            <div className="flex justify-center gap-6 text-xl text-slate-500">
              <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaFacebook /></a>
              <a href="#" className="hover:text-pink-500 transition"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </main>
      <Footer />
    </div>
  );
}
