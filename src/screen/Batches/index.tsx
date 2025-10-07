import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Button } from '@/components/ui';
import CoursesCard from './Card';
import PricingModal from './PricingModal';

const BatchScreen = () => {
    const [activeTab, setActiveTab] = useState('Online');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

    const sliderRef: any = useRef(null);

    const tabs = [
        'Online',
        'Offline',
        'Power Batch',
        'State Exams',
        'Real Test',
        'Combo',
        'Free',
        'Online Degree'
    ];

    const carouselSlides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=400&fit=crop'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&h=400&fit=crop'
        }
    ];

    const courses = [
        {
            id: 1,
            title: 'ARJUNA JEE 4.0 2026',
            subtitle: 'For Class 11th+JEE Mains/Adv',
            language: 'Hinglish',
            targetAudience: 'For JEE Aspirants',
            startDate: '14 Sep 2025',
            endDate: '30 Jun 2027',
            plans: ['Infinity Pro', 'Infinity'],
            originalPrice: 4600,
            discountedPrice: 4000,
            discount: 13,
            instructors: 5
        },
        {
            id: 2,
            title: 'ARJUNA JEE 4.0 2026',
            subtitle: 'For Class 11th+JEE Mains/Adv',
            language: 'Hinglish',
            targetAudience: 'For JEE Aspirants',
            startDate: '14 Sep 2025',
            endDate: '30 Jun 2027',
            plans: ['Infinity Pro', 'Infinity'],
            originalPrice: 4600,
            discountedPrice: 4000,
            discount: 13,
            instructors: 5
        },
        {
            id: 3,
            title: 'ARJUNA JEE 4.0 2026',
            subtitle: 'For Class 11th+JEE Mains/Adv',
            language: 'Hinglish',
            targetAudience: 'For JEE Aspirants',
            startDate: '14 Sep 2025',
            endDate: '30 Jun 2027',
            plans: ['Infinity Pro', 'Infinity'],
            originalPrice: 4600,
            discountedPrice: 4000,
            discount: 13,
            instructors: 5
        }
    ];

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (current: any, next: any) => setCurrentSlide(next),
        arrows: false, // Disabled arrows
    };

    return (
        <div >
            {/* Header with purple background */}
            <header>
                <div className="flex items-center justify-between gap-4 ">
                    {/* Search Bar */}
                    <div className="flex items-center gap-3 px-5 py-4  rounded-sm bg-purple-50 w-full">
                        <Search className="text-[#071952] w-5 h-5" />
                        <span className="text-gray-600">Search courses...</span>
                    </div>

                    {/* Study Button */}
                    <div>
                        <Button variant="filled" className=" py-3 text-white px-10 text-base font-semibold rounded-sm">
                            Study
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-6">
                {/* Carousel Section - Image Only */}
                <div className="mb-8 relative">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {carouselSlides.map((slide, index) => (
                            <div key={slide.id}>
                                <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                                    <img
                                        src={slide.image}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>

                    {/* Dot Pagination */}
                    <div className="flex justify-center gap-2 mt-4">
                        {carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => sliderRef.current?.slickGoTo(index)}
                                className={`h-2 rounded-full transition-all ${currentSlide === index
                                    ? 'bg-[#071952] w-8'
                                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-6 border-gray-200">
                    <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab
                                    ? 'border-[#071952] text-[#071952]'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Batches Count */}
                <div className="mb-6">
                    <p className="text-lg font-semibold text-gray-800">47 Batches available</p>
                </div>

                {/* Course Cards Grid - 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <CoursesCard key={index} handleOpenModal={() => setIsPricingModalOpen(true)} />
                    ))}
                </div>
            </main>
            <div>
                <PricingModal
                    isOpen={isPricingModalOpen}
                    onClose={() => setIsPricingModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default BatchScreen;