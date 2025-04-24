
import { useState } from "react";
import { Map, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-purple-soft/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display text-gray-900">Get in Touch</h2>
          <p className="text-lg text-gray-600">Have questions or feedback? We'd love to hear from you. Our team is always ready to help.</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden transform hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <h3 className="text-2xl font-semibold mb-6 font-display">Send us a message</h3>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative mb-6 animate-fade-in" role="alert">
                  <strong className="font-bold">Thank you!</strong>
                  <span className="block sm:inline"> We've received your message and will respond shortly.</span>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple hover:bg-purple-dark text-white font-medium py-3 px-4 rounded-md transition duration-300 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : "Send Message"}
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-purple-soft/30 p-3 rounded-lg">
                  <Map className="h-6 w-6 text-purple" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Our Location</h4>
                  <p className="text-gray-600 mt-1">123 Innovation Drive<br />Tech Valley, CA 94043</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-purple-soft/30 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-purple" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Email Us</h4>
                  <p className="text-gray-600 mt-1">support@swiftride.example<br />careers@swiftride.example</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-start">
                <div className="bg-purple-soft/30 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-purple" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Call Us</h4>
                  <p className="text-gray-600 mt-1">+1 (555) 123-4567<br />Mon-Fri, 9am-6pm PST</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h4 className="font-medium text-gray-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="bg-purple-soft/30 p-3 rounded-lg hover:bg-purple-soft transition duration-300">
                  <Facebook className="h-6 w-6 text-purple" />
                </a>
                <a href="#" className="bg-purple-soft/30 p-3 rounded-lg hover:bg-purple-soft transition duration-300">
                  <Twitter className="h-6 w-6 text-purple" />
                </a>
                <a href="#" className="bg-purple-soft/30 p-3 rounded-lg hover:bg-purple-soft transition duration-300">
                  <Instagram className="h-6 w-6 text-purple" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
