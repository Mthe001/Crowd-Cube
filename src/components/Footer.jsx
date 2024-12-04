import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-800 dark:bg-zinc-900 dark:text-gray-200 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
                {/* Navigation Links */}
                <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="hover:underline dark:hover:text-gray-400">Home</a>
                        </li>
                        <li>
                            <a href="#about" className="hover:underline dark:hover:text-gray-400">About</a>
                        </li>
                        <li>
                            <a href="#services" className="hover:underline dark:hover:text-gray-400">Services</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:underline dark:hover:text-gray-400">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <p>Email: <a href="mailto:info@example.com" className="hover:underline dark:hover:text-gray-400">crowdcude@gmail.com</a></p>
                    <p>Phone: <a href="tel:+1234567890" className="hover:underline dark:hover:text-gray-400">+1 234 567 890</a></p>
                    <p>Address: 123 Street Name, City, Country</p>
                </div>

                {/* FAQ and Legal */}
                <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li>
                            <a href="/faq" className="hover:underline dark:hover:text-gray-400">FAQ</a>
                        </li>
                        <li>
                            <a href="/terms" className="hover:underline dark:hover:text-gray-400">Terms of Service</a>
                        </li>
                        <li>
                            <a href="/privacy" className="hover:underline dark:hover:text-gray-400">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/copyright-warning" className="hover:underline text-red-500 dark:text-red-400">Copyright Warning</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 text-center">
                <div className="flex justify-center space-x-4">
                    <a
                        href="https://facebook.com"
                        className="btn btn-square btn-outline text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label="Facebook"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://twitter.com"
                        className="btn btn-square btn-outline text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label="Twitter"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://linkedin.com"
                        className="btn btn-square btn-outline text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedinIn />
                    </a>
                    <a
                        href="https://instagram.com"
                        className="btn btn-square btn-outline text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
