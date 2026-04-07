import React from "react";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-blue-900 leading-tight">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Get in touch with us. We'd love to hear from you and answer any
          questions you might have.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Get In Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="10-digit phone number"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                placeholder="Your message"
                rows="5"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-800"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-3 rounded font-semibold w-full hover:bg-blue-900"
            >
              Send Message
            </button>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-8 mb-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 font-semibold">Email</p>
                <p className="text-gray-800">crackthepattern@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Phone</p>
                <p className="text-gray-800">9xxxxxxxxx</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Location</p>
                <p className="text-gray-800">Delhi, India</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900"
              >
                Instagram
              </a>
              <a
                href="#"
                className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
