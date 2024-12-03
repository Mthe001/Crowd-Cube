import React, { useState, useEffect } from 'react';
import EmblaCarouselReact from 'embla-carousel-react';

import './embla-carousel.css';

const Carousel = () => {
    const [emblaRef, emblaApi] = EmblaCarouselReact({ loop: true });
    const [images] = useState([
        'https://images.pexels.com/photos/6113082/pexels-photo-6113082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://i.ibb.co.com/ZczcTCq/ok4.png',
        'https://i.ibb.co.com/FKWPG9R/ok.png',
        'https://i.ibb.co.com/yRQ8kt9/ok2.png',
        'https://i.ibb.co.com/NskC779/ok3.png',
    ]);


    useEffect(() => {
        if (emblaApi) {
            const interval = setInterval(() => {
                emblaApi.scrollNext();
            }, 3000);


            return () => clearInterval(interval);
        }
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0);
        }
    }, [emblaApi]);

    return (
        <div className="max-w-7xl mx-auto py-6 px-5">
            <div className="embla " ref={emblaRef}>
                <div className="embla__container h-[250px]  md:h-[450px] lg:h-[600px] flex space-x-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="embla__slide flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
