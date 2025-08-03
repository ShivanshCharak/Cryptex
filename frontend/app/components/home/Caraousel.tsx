"use client"
import { useState } from 'react';
import Image from 'next/image';
import bannerRefer from '../../../public/home-banner-refer.webp'
import stackYeild   from '../../../public/home-banner-stacked-yield-usd-new.webp'
import { useRouter } from 'next/navigation';
import bannerUsdt   from '../../../public/home-banner-usdt-3.webp'

const slides = [
  {
    heading: 'Got USDT?',
    image:bannerRefer,
    subheading: 'Convert to USD with 0 fees and start trading on Backpack!',
    buttonText: 'Trade USDT',
  },
  {
    heading: 'Start Trading',
    image: stackYeild,
    subheading: 'No fees, no worries. Dive into the market now!',
    buttonText: 'Get Started',
  },
  {
    heading: 'Instant Swap',
    image:bannerUsdt,
    subheading: 'Convert USDT to USD instantly and trade with ease.',
    buttonText: 'Swap Now',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const router  = useRouter()

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-[80%] h-[300px] overflow-hidden rounded-xl mb-5">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
            index === current
              ? 'translate-x-0 z-10'
              : index < current
              ? '-translate-x-full'
              : 'translate-x-full'
          }`}
        >
          <Image
            src={slide.image}
            alt="Slide"
            layout="fill"
            objectFit="cover"
            className="brightness-75"
          />
          <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white z-20">
            <h2 className="text-[2rem] font-bold mb-2">{slide.heading}</h2>
            <p className="mb-4 text-lg font-semibold">{slide.subheading}</p>
            <button className="bg-white text-black px-5 py-2 rounded font-semibold hover:bg-gray-200" onClick={()=>router.push("/markets")}>
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 text-white text-3xl"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 text-white text-3xl"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${
              idx === current ? 'bg-white' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
