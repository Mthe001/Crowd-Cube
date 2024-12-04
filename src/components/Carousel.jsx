import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './embla-carousel.css';

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [images] = useState([
        'https://images.pexels.com/photos/6113082/pexels-photo-6113082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://i.ibb.co/ZczcTCq/ok4.png',
        'https://i.ibb.co/FKWPG9R/ok.png',
        'https://i.ibb.co/yRQ8kt9/ok2.png',
        'https://i.ibb.co/NskC779/ok3.png',
    ]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        const interval = setInterval(scrollNext, 3000);
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [scrollNext]);

    useEffect(() => {
        if (emblaApi) emblaApi.reInit(); // Ensure the Embla instance is re-initialized if needed
    }, [emblaApi]);

    return (
        <div className="embla max-w-7xl w-full mx-auto py-6 px-5">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="embla__slide flex-shrink-0 w-full"
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
