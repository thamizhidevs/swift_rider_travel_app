
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I book a ride?",
    a: "Open the app, enter your destination, and you'll be matched with the nearest driver instantly.",
  },
  {
    q: "How do drivers join?",
    a: "Drivers can sign up with their valid license and vehicle details. After background checks, you’ll start receiving ride requests right away.",
  },
  {
    q: "Are rides insured?",
    a: "Yes! Every SwiftRide journey is fully insured for both riders and drivers.",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept credit/debit cards, wallets, and offer seamless in-app payments. Cash accepted in some regions.",
  },
  {
    q: "Is there 24/7 support?",
    a: "Absolutely. Contact help from the app or site any time—our friendly team is here for both riders and drivers.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-purple-soft/60">
      <div className="container mx-auto px-6 max-w-3xl">
        <h3 className="text-2xl md:text-3xl font-headline font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={faq.q} className="bg-white rounded-xl shadow px-5 py-3">
              <button
                className="flex items-center justify-between w-full text-left font-semibold text-purple text-lg focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.q}
                <ChevronDown className={`h-5 w-5 transition-transform ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === idx ? "max-h-32 mt-3 opacity-100" : "max-h-0 mt-0 opacity-0"
                }`}
              >
                <p className="text-gray-700">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
