import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { AuroraText } from "../components/magicui/aurora-text";
import { Headphones, Star, Users, Shield, Zap, Download } from "lucide-react";
import Footer from "./Footer";
import CTASection from "./CTASection";
import TestimonialsSection from "./TestimonialsSection";

export default function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const benefits = [
    {
      icon: Headphones,
      title: "Audiobooks Included",
      description:
        "Listen to your favorite books with high-quality narration, perfect for multitasking.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Verified Reviews",
      description:
        "Read authentic reviews from real readers to help you discover your next great read.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Instant Access",
      description:
        "Download and start reading immediately. No waiting, no shipping fees.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Book Communities",
      description:
        "Join discussions, share thoughts, and connect with fellow book lovers.",
      gradient: "from-green-500 to-blue-500",
    },
    {
      icon: Star,
      title: "Curated Collections",
      description:
        "Expertly curated book lists for every mood, genre, and reading level.",
      gradient: "from-pink-500 to-red-500",
    },
    {
      icon: Download,
      title: "Offline Reading",
      description:
        "Download books and read anywhere, anytime, even without internet connection.",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 bg-gradient-to-br from-[#dbeafe] via-[#a5b4fc] to-[#818cf8] min-h-screen overflow-hidden">
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-300 opacity-20 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300 opacity-30 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Text */}
          <div className="md:w-1/2 space-y-6" data-aos="fade-right">
            <AuroraText className="text-6xl font-bold leading-tight">
              Escape. Explore. <br /> Elevate Your Mind
            </AuroraText>
            <p className="text-lg md:text-xl text-purple-800 font-medium">
              Discover a world of stories, ideas, and knowledge. <br />
              Curated collections that match your{" "}
              <span className="font-semibold text-indigo-600">mood</span>,{" "}
              <span className="font-semibold text-pink-600">interests</span>,
              and <span className="font-semibold text-orange-500">dreams</span>.
            </p>

            <div className="flex gap-4 mt-6">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition font-medium">
                Start Reading →
              </button>
              <button className="px-6 py-3 border border-indigo-600 text-indigo-700 rounded-full hover:bg-indigo-50 transition font-medium">
                Browse Collection
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="md:w-1/2" data-aos="fade-left">
            <img
              src="/assets/herobook.png"
              alt="hero"
              className="w-full max-w-xl mx-auto"
            />
          </div>
        </div>

        {/* Curved SVG Separator */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-40"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,160 C480,280 960,0 1440,160 L1440,320 L0,320 Z"
              fillOpacity="1"
            ></path>
          </svg>
        </div>
      </section>

      {/* Why Choose Readora Section */}
      <div className="relative -mt-1 overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-40"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,64 C480,160 960,0 1440,96 L1440,0 L0,0 Z"
            fillOpacity="1"
          ></path>
        </svg>
      </div>

      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4" data-aos="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Readora
              </span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Experience reading like never before with features designed for
              modern book lovers.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${benefit.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
