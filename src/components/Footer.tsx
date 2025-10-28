import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const ZapIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const SocialIcon = ({ path, href }: { path: string; href: string }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d={path}></path>
        </svg>
    </a>
);

// --- Futuristic Wavy Footer Component ---
const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 text-gray-800 pt-20 relative overflow-hidden">
            {/* Wavy SVG Divider */}
            <div className="absolute top-0 left-0 w-full h-20">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 80C240 26.6667 480 0 720 0C960 0 1200 26.6667 1440 80V-2.98023e-05H0V80Z" fill="url(#wave-gradient)"/>
                    <defs>
                        <linearGradient id="wave-gradient" x1="720" y1="0" x2="720" y2="80" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F9FAFB"/>
                            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.4"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="container mx-auto px-6 lg:px-8 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-2">
                            <ZapIcon className="w-8 h-8 text-cyan-400" />
                            <h3 className="text-2xl font-bold text-gray-900">AetherCorp</h3>
                        </div>
                        <p className="text-sm text-gray-500">
                            Pioneering the next wave of digital innovation and seamless user experiences.
                        </p>
                        <div className="flex space-x-4 pt-2">
                           <SocialIcon href="#" path="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.15 2.33,6.94C2.33,8.43 3.1,9.75 4.17,10.55C3.42,10.53 2.73,10.32 2.1,10V10.03C2.1,12.11 3.55,13.85 5.59,14.24C5.22,14.34 4.83,14.39 4.42,14.39C4.15,14.39 3.88,14.36 3.62,14.31C4.17,16.02 5.75,17.21 7.61,17.24C6.17,18.36 4.38,19.04 2.42,19.04C2.06,19.04 1.71,19.02 1.36,18.97C3.24,20.18 5.49,20.86 7.9,20.86C16,20.86 20.22,14.13 20.22,8.79C20.22,8.6 20.22,8.4 20.21,8.21C21.08,7.6 21.84,6.86 22.46,6Z" />
                           <SocialIcon href="#" path="M12,2.4C6.69,2.4 2.4,6.69 2.4,12C2.4,16.22 5.17,19.78 9.11,20.94C9.57,21.02 9.77,20.73 9.77,20.47C9.77,20.24 9.76,19.56 9.76,18.81C7.38,19.26 6.88,18.23 6.72,17.7C6.6,17.38 6.07,16.63 5.7,16.48C5.4,16.36 4.95,15.91 5.68,15.9C6.35,15.89 6.81,16.5 6.96,16.78C7.72,18.06 8.97,17.68 9.53,17.43C9.6,16.88 9.83,16.5 10.08,16.29C8.07,16.06 5.92,15.28 5.92,11.83C5.92,10.74 6.29,9.84 6.92,9.14C6.82,8.91 6.49,7.86 7.02,6.59C7.02,6.59 7.78,6.34 9.75,7.66C10.47,7.46 11.25,7.36 12,7.36C12.75,7.36 13.53,7.46 14.25,7.66C16.22,6.34 16.98,6.59 16.98,6.59C17.51,7.86 17.18,8.91 17.08,9.14C17.71,9.84 18.08,10.74 18.08,11.83C18.08,15.29 15.93,16.06 13.92,16.29C14.24,16.56 14.5,17.13 14.5,18.02C14.5,19.28 14.49,20.29 14.49,20.47C14.49,20.73 14.69,21.03 15.15,20.94C19.09,19.78 21.6,16.22 21.6,12C21.6,6.69 17.31,2.4 12,2.4Z" />
                           <SocialIcon href="#" path="M19,3H5C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3M8.5,18.5H5.5V10H8.5V18.5M7,8.5C6.17,8.5 5.5,7.83 5.5,7C5.5,6.17 6.17,5.5 7,5.5C7.83,5.5 8.5,6.17 8.5,7C8.5,7.83 7.83,8.5 7,8.5M18.5,18.5H15.5V13.5C15.5,12.57 15.47,11.35 14.2,11.35C12.93,11.35 12.5,12.36 12.5,13.5V18.5H9.5V10H12.5V11.5H12.55C13,10.56 14.1,9.75 15.5,9.75C18.06,9.75 18.5,11.41 18.5,13.5V18.5Z" />
                        </div>
                    </div>

                    {/* Links - About */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">About</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Our Mission</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                     {/* Links - Legal */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                    
                    {/* Newsletter Form */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Join Our Matrix</h4>
                        <p className="text-sm text-gray-500 mb-4">Get the latest updates and trends from the future, delivered to your inbox.</p>
                        <form action="#">
                            <div className="flex flex-col sm:flex-row gap-2">
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" autoComplete="email" required 
                                className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="Enter your email" />
                                <button type="submit" className="px-4 py-2 bg-cyan-500 text-gray-900 font-semibold rounded-md hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)]">
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} AetherCorp. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


export default Footer;