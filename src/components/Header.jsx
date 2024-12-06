import React from 'react';
import { Typewriter } from 'react-simple-typewriter';  // Import Typewriter
import Carousel from './Carousel';

const Header = () => {
    return (
        <div className="text-center py-10">
            {/* Main title with responsive text sizes */}
            <h1 className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
                <span className="text-orange-500">
                    <Typewriter
                        words={['Crowd', 'Cube']}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={120}
                        deleteSpeed={60}
                        delaySpeed={1000}
                    />
                </span>{' '}
                : A Crowd{' '}
                <span className="text-orange-500">
                    <Typewriter
                        words={['Funding Application']}
                        loop={1}  // Loop only once
                        cursor
                        cursorStyle="_"
                        typeSpeed={100}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h1>

            {/* Subtitle with typewriter effect */}
            <h5 className="py-6 sm:py-8 w-[80%] mx-auto font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                <Typewriter
                    words={['A crowdfunding website where people can raise money for different projects, ideas, or causes by inviting others to contribute financially.']}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={80}
                    deleteSpeed={30}
                    delaySpeed={1000}
                />
            </h5>

            {/* Carousel component */}
            <Carousel />
        </div>
    );
};

export default Header;
