import React from 'react';
import { Book, Twitter, Instagram, Facebook, Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Browse Books', href: '#books' },
        { name: 'Categories', href: '#categories' },
        { name: 'Authors', href: '#authors' },
        { name: 'New Releases', href: '#new' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Book Clubs', href: '#clubs' },
        { name: 'Discussions', href: '#discussions' },
        { name: 'Reviews', href: '#reviews' },
        { name: 'Author Spotlights', href: '#spotlights' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#help' },
        { name: 'Contact Us', href: '#contact' },
        { name: 'Upload Guide', href: '#upload-guide' },
        { name: 'Premium', href: '#premium' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers' },
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#f5f9ff] to-[#e0e8ff] border-t border-border/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md">
                <Book className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                Readora
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm text-gray-600">
              Your gateway to endless stories, knowledge, and imagination.
              Discover, read, and share books that inspire you.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 hover:from-pink-400 hover:to-yellow-300 transition-all duration-300 shadow-md hover:scale-110"
                >
                  <social.icon className="h-5 w-5 text-white drop-shadow-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-800 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-200 hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2024 Readora. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>for book lovers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
