import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-zinc-800 dark:text-white">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                Privacy Policy
            </h1>
            <div className="text-lg text-gray-800 dark:text-gray-400 mb-4">
                <p>
                    Welcome to CrowdCube! We value your privacy and are committed to protecting the personal information you share with us.
                    Please read this Privacy Policy carefully to understand how we collect, use, and protect your personal data.
                </p>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Information We Collect</h2>
                <p className="mt-2">
                    We collect the following types of personal information when you use our website or services:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-800 dark:text-gray-400">
                    <li>Your name, email address, and other contact details when you sign up or create an account.</li>
                    <li>Payment information when making donations or pledging to a campaign (processed securely by third-party services).</li>
                    <li>Usage data, including IP address, browser type, and other data to help us improve your experience.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. How We Use Your Information</h2>
                <p className="mt-2">
                    We use your information to:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-800 dark:text-gray-400">
                    <li>Provide and improve our services.</li>
                    <li>Process donations and fulfill campaign-related requests.</li>
                    <li>Send you updates and marketing communications, where applicable, based on your preferences.</li>
                    <li>Ensure the security of our platform and prevent fraud.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. Cookies and Tracking Technologies</h2>
                <p className="mt-2">
                    We use cookies and other tracking technologies to enhance your experience on our site. Cookies help us understand how you use our website and improve our services. You can control the use of cookies through your browser settings.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">4. Data Sharing and Disclosure</h2>
                <p className="mt-2">
                    We do not sell or rent your personal data to third parties. However, we may share your information with trusted third parties for the following purposes:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-800 dark:text-gray-400">
                    <li>Service providers who assist us in operating our platform (e.g., payment processors, email service providers).</li>
                    <li>Compliance with legal obligations or requests by law enforcement.</li>
                    <li>To protect the rights and safety of CrowdCube, our users, or the public.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">5. Your Rights</h2>
                <p className="mt-2">
                    You have the right to:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-800 dark:text-gray-400">
                    <li>Access the personal information we hold about you.</li>
                    <li>Request corrections or updates to your information.</li>
                    <li>Request the deletion of your personal data, subject to certain legal limitations.</li>
                    <li>Opt-out of marketing communications by following the unsubscribe instructions in our emails.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">6. Data Security</h2>
                <p className="mt-2">
                    We implement reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">7. Changes to This Privacy Policy</h2>
                <p className="mt-2">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page, with an updated "Last Revised" date at the top. We encourage you to review this policy periodically to stay informed.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">8. Contact Us</h2>
                <p className="mt-2">
                    If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
                </p>
                <p className="mt-2 text-gray-800 dark:text-gray-400">
                    Email: <a href="mailto:support@crowdcube.com" className="text-blue-500">support@crowdcube.com</a>
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
