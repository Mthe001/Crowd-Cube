import React, { useState } from 'react';

const Faq = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const faqs = [
        {
            question: "What is CrowdCube?",
            answer: "CrowdCube is a crowdfunding platform where individuals can contribute to various campaigns and causes."
        },
        {
            question: "How can I start a campaign?",
            answer: "To start a campaign, you need to sign up, create a campaign page, and set your fundraising goal."
        },
        {
            question: "Is my donation secure?",
            answer: "Yes, we use secure payment gateways to ensure your donation is safe and protected."
        },
        {
            question: "Can I track my campaign’s progress?",
            answer: "Yes, you can monitor the donations and milestones of your campaign through your campaign dashboard."
        },
        {
            question: "How do I contact support?",
            answer: "You can reach our support team via email or through our contact form on the website."
        },
    ];


    const handleToggle = (index) => {
        if (openQuestion === index) {
            setOpenQuestion(null);
        } else {
            setOpenQuestion(index);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-slate-200 rounded-lg dark:bg-zinc-800 dark:text-white">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">Frequently Asked Questions</h1>

            <div className="accordion bg-gray-100 dark:bg-zinc-800 rounded-lg w-full">
                {faqs.map((faq, index) => (
                    <div key={index} className="accordion-item">
                        <h2 className="accordion-header mb-0">
                            <button
                                className={`accordion-button relative w-full py-4 px-5 text-xl font-semibold text-left text-gray-800 dark:text-gray-200 bg-zinc-400 dark:bg-zinc-700 border-0 rounded-t-lg focus:outline-none ${openQuestion === index ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 dark:hover:bg-zinc-600'}`}
                                type="button"
                                onClick={() => handleToggle(index)}
                            >
                                {faq.question}
                            </button>
                        </h2>
                        {openQuestion === index && (
                            <div className="accordion-collapse border-t-2 border-gray-200 dark:border-zinc-600">
                                <div className="accordion-body py-4 px-5 text-lg text-gray-600 dark:text-gray-400">
                                    {faq.answer}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
