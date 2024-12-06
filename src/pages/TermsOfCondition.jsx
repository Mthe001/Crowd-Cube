import React from 'react';

const TermsOfCondition = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-zinc-800 dark:text-white">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
                Terms and Conditions
            </h1>
            <div className="text-lg text-gray-800 dark:text-gray-400 mb-4">
                <p>
                    Welcome to CrowdCube! By accessing or using our website and services, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services.
                </p>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Acceptance of Terms</h2>
                <p className="mt-2">
                    By accessing or using our platform, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any other rules or policies that may be established by CrowdCube from time to time.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. Account Registration</h2>
                <p className="mt-2">
                    In order to access certain features of the website, you may be required to register an account. You must provide accurate, current, and complete information during the registration process and keep your account information up to date.
                </p>
                <p className="mt-2">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. Use of Services</h2>
                <p className="mt-2">
                    You agree to use our website and services only for lawful purposes and in accordance with these Terms. You may not use our platform to:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-800 dark:text-gray-400">
                    <li>Violate any applicable law or regulation.</li>
                    <li>Engage in fraudulent activities or mislead other users.</li>
                    <li>Upload harmful or offensive content.</li>
                    <li>Interfere with the proper functioning of the website.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">4. Donations and Payments</h2>
                <p className="mt-2">
                    When you make a donation or contribute to a campaign on our platform, you agree to pay the specified amount. All payments are processed securely using third-party payment providers.
                </p>
                <p className="mt-2">
                    CrowdCube is not responsible for any errors or issues related to third-party payment systems.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">5. Account Termination</h2>
                <p className="mt-2">
                    We reserve the right to suspend or terminate your account at our discretion if we believe you have violated these Terms and Conditions or engaged in any inappropriate behavior.
                </p>
                <p className="mt-2">
                    You may also terminate your account by contacting us, but note that any outstanding obligations must be settled before account closure.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">6. Limitation of Liability</h2>
                <p className="mt-2">
                    CrowdCube is not liable for any damages or losses that result from the use or inability to use our services. This includes, but is not limited to, direct, indirect, incidental, punitive, or consequential damages.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">7. Privacy Policy</h2>
                <p className="mt-2">
                    Your use of our platform is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">8. Changes to Terms</h2>
                <p className="mt-2">
                    We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page, and the "Last Updated" date will be revised. You are encouraged to review these Terms periodically.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">9. Governing Law</h2>
                <p className="mt-2">
                    These Terms and Conditions are governed by the laws of [Insert Jurisdiction], without regard to its conflict of law principles.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">10. Contact Us</h2>
                <p className="mt-2">
                    If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
                </p>
                <p className="mt-2 text-gray-800 dark:text-gray-400">
                    Email: <a href="mailto:support@crowdcube.com" className="text-blue-500">support@crowdcube.com</a>
                </p>
            </section>
        </div>
    );
};

export default TermsOfCondition;
