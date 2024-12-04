import React from 'react';
import Carousel from './Carousel';

const Header = () => {
    return (
        <div className="text-center py-10">
            {/* Main title with responsive text sizes */}
            <h1 className="font-bold text-3xl sm:text-4xl md:text-4xl lg:text-5xl">
                Crowd<span className="text-orange-500">cube</span> : A Crowd
                <span className="text-orange-500">Funding Application</span>
            </h1>

            {/* Subtitle with responsive text sizes and padding */}
            <h5 className="py-6 sm:py-8 w-[80%] mx-auto font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                A crowdfunding website is a platform where people can raise money for different projects, ideas, or causes by inviting others to contribute financially.
            </h5>

            {/* Carousel component */}
            <Carousel />
        </div>
    );
};

export default Header;
