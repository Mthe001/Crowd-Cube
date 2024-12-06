import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Fade } from 'react-awesome-reveal';  // Import Fade animation

const Service = () => {
    const services = [
        {
            icon: '💡',
            title: 'Creative Projects',
            description: 'Turn your creative dreams into reality by raising funds for films, music, books, and more.',
        },
        {
            icon: '🚀',
            title: 'Startup Launches',
            description: 'Get the funding you need to bring your innovative product ideas to market.',
        },
        {
            icon: '💖',
            title: 'Personal Causes',
            description: 'Raise money for medical expenses, education, emergencies, or other personal needs.',
        },
        {
            icon: '🌍',
            title: 'Social Causes',
            description: 'Support non-profits and community initiatives by contributing to meaningful campaigns.',
        },
        {
            icon: '📱',
            title: 'Technology Development',
            description: 'Bring your app, gadget, or software project to life with community backing.',
        },
        {
            icon: '🎨',
            title: 'Art & Design',
            description: 'Fund your artistic ventures like exhibitions, sculptures, or innovative designs.',
        },
    ];

    return (
        <div id='services' className="my-10 bg-gray-100 dark:bg-zinc-900 py-10 rounded-lg">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                        <Typewriter
                            words={['Our Services']}
                            loop={2} // Infinite loop
                            cursor
                            cursorStyle="_"
                            typeSpeed={100}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">
                        Empowering creators, dreamers, and innovators by connecting them with people who want to support their ideas.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Fade key={index} bottom delay={index * 200}> {/* Add Fade animation to each service */}
                            <div className="p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
                                <div
                                    className="flex items-center justify-center cursor-pointer mb-4 tooltip tooltip-top"
                                    data-tip={service.title}
                                >
                                    <span className="text-4xl">{service.icon}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {service.description}
                                </p>
                            </div>
                        </Fade>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Service;
