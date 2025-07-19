"use client";

import React, { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Avid Reader",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b745c4c4?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "Readora has completely changed how I discover new books. The curated recommendations are spot-on, and I love the community discussions!",
  },
  {
    name: "Michael Chen",
    role: "Book Blogger",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The audiobook quality is exceptional, and the offline reading feature is perfect for my daily commute. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "As a student, I love having access to so many educational resources. The premium features are worth every penny!",
  },
  {
    name: "David Kim",
    role: "Author",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    text: "The platform for uploading and sharing my work is incredibly user-friendly. Great way to connect with readers!",
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const children = Array.from(scrollerRef.current.children);
      children.forEach((item) => {
        const clone = item.cloneNode(true);
        scrollerRef.current.appendChild(clone);
      });

      containerRef.current.style.setProperty("--animation-direction", "forwards");
      containerRef.current.style.setProperty("--animation-duration", "40s");
      setStart(true);
    }
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-[#f9fafb] via-[#f3f4f6] to-[#eef1f5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Readers
            </span>{" "}
            Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied readers who’ve made Readora their go-to digital library.
          </p>
        </div>

        {/* Infinite Scroller */}
        <div
          ref={containerRef}
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
        >
          <ul
            ref={scrollerRef}
            className={`flex w-max min-w-full flex-nowrap gap-8 py-4 ${start ? "animate-scroll" : ""}`}
          >
            {testimonials.map((testimonial, index) => (
              <motion.li
                key={index}
                whileHover={{ rotateX: 4, rotateY: 4, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl hover:shadow-2xl rounded-3xl p-8 w-[350px] md:w-[450px] shrink-0 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-10 w-10 text-purple-500" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg italic mb-6">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 ring-2 ring-purple-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 pointer-events-none" />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
