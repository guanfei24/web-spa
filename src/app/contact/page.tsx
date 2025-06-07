"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent!"); // 你可以替换为实际 API 请求
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-yellow-700 mb-2">Contact Us</h1>
        <p className="text-gray-600">
          We’d love to hear from you. Please reach out anytime.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        {/* 联系方式 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Spa Information
          </h2>
          <p className="text-gray-600">
            📍 44075 Pipeline Plaza STE 220, Ashburn, VA 20147
          </p>
          <p className="text-gray-600">📞 +1 (703) 928‑2338</p>
          <p className="text-gray-600">✉️ hhspa.va@gmail.com</p>

          {/* Google Maps 嵌入 */}
          <div className="rounded overflow-hidden mt-6">
            <iframe
              src="https://maps.google.com/maps?q=44075%20Pipeline%20Plaza%20STE%20220,%20Ashburn,%20VA%2020147&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="250"
              loading="lazy"
              className="border rounded-md"
            ></iframe>
          </div>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Send Us a Message
          </h2>
          <input
            name="name"
            type="text"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            name="subject"
            type="text"
            required
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <textarea
            name="message"
            required
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[120px]"
          />
          <button
            type="submit"
            className="bg-yellow-700 text-white px-6 py-2 rounded hover:bg-yellow-800"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
