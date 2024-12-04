import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './embla-carousel.css';

const Carousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [images] = useState([
        'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/171198/pexels-photo-171198.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'https://images.pexels.com/photos/6147357/pexels-photo-6147357.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        const interval = setInterval(scrollNext, 3000);
        return () => clearInterval(interval);
    }, [scrollNext]);

    useEffect(() => {
        if (emblaApi) emblaApi.reInit();
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
