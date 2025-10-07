"use client";
import React, { useState, ReactNode } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Calendar,
    Star,
    BookOpen,
    FileText,
    Video,
    Headphones,
    ClipboardList,
    Check,
    Atom,
    Calculator,
    FlaskConical,
    Bell,
    Microscope,
    Dna,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge, Button, Card } from "@/components/ui";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import PricingModal from "./PricingModal";
import CoursesCard from "./Card";

// Carousel Component
interface CarouselProps {
    children: ReactNode;
    itemsPerView?: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, itemsPerView = 3 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = React.Children.toArray(children);
    const maxIndex = Math.max(0, items.length - itemsPerView);

    const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out gap-4"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                minWidth: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 16) / itemsPerView
                                    }px)`,
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            {/* {currentIndex > 0 && ( */}
            <Button
                onClick={prev}
                variant="filled"
                className="absolute w-10 h-10 flex items-center justify-center rounded-full left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-0"
            >
                <ChevronLeft size={20} />
            </Button>
            {/* )} */}

            {/* {currentIndex < maxIndex && ( */}
            <Button
                onClick={next}
                variant="filled"
                className="absolute w-10 h-10 flex items-center justify-center rounded-full right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-0"
            >
                <ChevronRight size={20} />
            </Button>
            {/* )} */}

        </div>
    );
};

// Main App Component
interface VideoData {
    id: number;
    title: string;
    description: string;
    date: string;
    duration: string;
    teacher?: string;
    subject?: string;
    image: string;
}

interface Teacher {
    name: string;
    subject: string;
    experience: string;
    image: string;
}

interface Subject {
    name: string;
    icon: React.ComponentType<{ size?: number }>;
}

interface FAQ {
    question: string;
    answer: string;
}

export default function BatchesDetailScreen() {
    const [selectedPlan, setSelectedPlan] = useState<string>("infinity");
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(true);

    const [videoDialog, setVideoDialog] = useState<{ isOpen: boolean; video: VideoData | null }>({
        isOpen: false,
        video: null,
    });

    const plans = [
        { id: "batch", name: "Batch", color: "purple", badge: "Popular", badgeColor: "bg-green-500" },
        { id: "infinity", name: "Infinity", color: "green", badge: "Recommended", badgeColor: "bg-orange-500" },
        { id: "infinity-pro", name: "Infinity Pro", color: "yellow", badge: null, badgeColor: "" },
    ];

    const getGradientClass = (color: string) => {
        switch (color) {
            case "purple":
                return "bg-gradient-to-br from-purple-100 to-purple-200";
            case "green":
                return "bg-gradient-to-br from-green-100 to-emerald-200";
            case "yellow":
                return "bg-gradient-to-br from-yellow-100 to-amber-200";
            default:
                return "bg-gray-100";
        }
    };

    const getTextColorClass = (color: string) => {
        switch (color) {
            case "purple":
                return "text-purple-700";
            case "green":
                return "text-emerald-700";
            case "yellow":
                return "text-amber-700";
            default:
                return "text-gray-700";
        }
    };

    const getBorderColorClass = (color: string) => {
        switch (color) {
            case "purple":
                return "border-purple-400";
            case "green":
                return "border-emerald-400";
            case "yellow":
                return "border-amber-400";
            default:
                return "border-gray-400";
        }
    };

    const demoVideos: VideoData[] = [
        {
            id: 1,
            title: "Notices",
            description: "Important updates and announcements",
            date: "29 September, 2025",
            duration: "07:30 PM",
            image: "https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?w=500&h=300&fit=crop",
        },
        {
            id: 2,
            title: "Some Basic Concepts of Chemistry",
            description: "Matter and Non Matter, Physical Classification of Matter",
            teacher: "By Faisal Sir",
            date: "27 May, 2025",
            duration: "03:30 PM",
            subject: "Physical Chemistry",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&h=300&fit=crop",
        },
        {
            id: 3,
            title: "Units, Dimensions and Measurement",
            description: "Physical quantity and its types, Base and Units",
            teacher: "By Rajwant Sir",
            date: "26 May, 2025",
            duration: "05:30 PM",
            subject: "Physics",
            image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop",
        },
        {
            id: 4,
            title: "Atomic Structure",
            description: "Thomson Model, Rutherford Model, Bohr Model",
            teacher: "By Faisal Sir",
            date: "28 May, 2025",
            duration: "04:00 PM",
            subject: "Physical Chemistry",
            image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=500&h=300&fit=crop",
        },
    ];

    const teachers: Teacher[] = [
        {
            name: "Rajwant Singh Sir",
            subject: "Physics",
            experience: "Exp: 7",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        },
        {
            name: "Tarun Khandelwal Sir",
            subject: "Maths",
            experience: "Exp: 14",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        },
        {
            name: "Faisal Razaq Sir",
            subject: "Physical Chemistry",
            experience: "Exp: 22",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        },
        {
            name: "Rohit Agarwal Sir",
            subject: "Organic Chemistry",
            experience: "Exp: 12",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        },
        {
            name: "Priya Sharma Ma'am",
            subject: "Inorganic Chemistry",
            experience: "Exp: 9",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
        },
    ];

    const subjects: Subject[] = [
        { name: "Physics", icon: Atom },
        { name: "Maths", icon: Calculator },
        { name: "Physical", icon: FlaskConical },
        { name: "Notices", icon: Bell },
        { name: "Chemistry", icon: Dna },
        { name: "Inorganic", icon: Microscope },
        { name: "Notices", icon: Bell },
        { name: "Chemistry", icon: Dna },
        { name: "Inorganic", icon: Microscope },
    ];

    const faqs: FAQ[] = [
        {
            question: "Why should I join this course and how will this be helpful?",
            answer:
                "This comprehensive JEE preparation course provides structured learning with expert faculty, daily practice problems, and personalized doubt support to help you excel in your exam.",
        },
        {
            question: "How will the classes be conducted? What will happen if I miss a class?",
            answer:
                "Classes are conducted live online. If you miss a class, recordings will be available for you to watch at your convenience with validity until June 2027.",
        },
        {
            question: "Can the classes be downloaded?",
            answer:
                "Yes, you can download the classes and watch them offline. All study materials and notes are also downloadable.",
        },
        {
            question: "What are the class days and timings?",
            answer:
                "Classes are held 6 days per week with 2 classes per day. Timings are scheduled between morning and evening sessions.",
        },
        {
            question: "How will I get my doubts answered?",
            answer:
                "We provide 24/7 doubt support through our platform. You can also visit PW Offline centers for in-person assistance and guidance.",
        },
    ];

    const openVideo = (video: VideoData) => {
        setVideoDialog({ isOpen: true, video });
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="text-white p-8 py-6 rounded-lg bg-[#071952] mb-8 ">
                <h1 className="text-2xl font-medium">Dr. Pervez Hoodbhoy 2026</h1>
            </div>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    <div className="p-6 pt-0 px-0 space-y-6">
                        {/* Choose a Plan */}
                        <Card className="p-8 pt-6 border">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Choose a Plan</h2>
                            </div>

                            <div className="grid grid-cols-3 gap-6 mb-8">
                                {plans.map((plan) => (
                                    <button
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`relative rounded-2xl p-6 text-center transition-all duration-300 border-2 ${selectedPlan === plan.id ? `${getGradientClass(plan.color)} ${getBorderColorClass(plan.color)} shadow-lg scale-105` : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
                                    >
                                        {plan.badge && (
                                            <Badge className={`absolute -top-2.5 left-1/2 -translate-x-1/2 ${plan.badgeColor} border-0 text-white text-xs px-3 py-1 font-semibold`}>
                                                {plan.badge}
                                            </Badge>
                                        )}

                                        <h3 className={`text-xl font-bold ${selectedPlan === plan.id ? getTextColorClass(plan.color) : 'text-gray-700'} ${plan.badge ? 'mt-2' : ''}`}>
                                            {plan.name}
                                        </h3>

                                        {selectedPlan === plan.id && (
                                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                                <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="border border-gray-200 p-6 rounded-xl bg-white">
                                <h3 className="text-lg font-bold mb-6 text-gray-800">Regular Includes</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#1B2D73]  p-2 rounded-lg">
                                            <Video className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Live Lectures by top faculties</h4>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#1B2D73] p-2 rounded-lg">
                                            <FileText className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">DPPs with Video Solutions</h4>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#1B2D73] p-2 rounded-lg">
                                            <BookOpen className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">PDF + Handwritten Notes</h4>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#1B2D73] p-2 rounded-lg">
                                            <Headphones className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">24*7 Doubt Support</h4>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-[#1B2D73] p-2 rounded-lg">
                                            <ClipboardList className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">Regular Test with Discussion</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* This Batch Includes */}
                        <Card className="p-8 pt-6 border">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">This Batch Includes</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <Calendar className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <div>
                                        <p className="font-semibold text-gray-800">Course Duration:</p>
                                        <p className="text-gray-600">26 May 2025 - 10 Feb 2026</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Star className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <p className="text-gray-700"><span className="font-semibold">Validity:</span> 30 June 2027</p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Star className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <p className="text-gray-700"><span className="font-semibold">Mode of Lecture:</span> Live Online classes</p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Star className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <p className="text-gray-700"><span className="font-semibold">Schedule:</span> 2 Classes/Per day, 6 days/per week</p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Star className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                                    <p className="text-gray-700">Exam guidance at our PW Offline centers</p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <BookOpen className="text-purple-600 mt-1 flex-shrink-0" size={20} />
                                    <p className="text-gray-700"><span className="font-semibold">Subjects:</span> Physics, Chemistry & Maths</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 text-gray-800">Batch Orientation</h3>
                                <Card
                                    // onClick={() => openVideo({ title: 'Orientation Session', description: 'Welcome to JEE 2.0 2026', duration: '45:00' })}
                                    className="bg-gradient-to-r from-purple-600 to-orange-500 border-none cursor-pointer hover:shadow-xl transition-shadow p-8 w-100"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white rounded-full p-4 shadow-lg">
                                            <Play className="text-purple-600" size={32} />
                                        </div>
                                        <div className="text-white">
                                            <h4 className="text-xl font-bold">Orientation Video</h4>
                                            <p className="text-purple-100">Watch the complete introduction</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Card>

                        {/* Demo Videos */}
                        <Card className="p-8 pt-6 border">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Demo Videos</h2>

                            <Carousel itemsPerView={3}>
                                {demoVideos.map(video => (
                                    <Card
                                        key={video.id}
                                        onClick={() => openVideo(video)}
                                        className="cursor-pointer"
                                    >
                                        <div className="aspect-video overflow-hidden relative">
                                            <img
                                                src={video.image}
                                                alt={video.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                <Play className="text-white" size={48} />
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-base font-bold mb-2 line-clamp-2 text-gray-800">
                                                {video.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>{video.date}</span>
                                                <span>{video.duration}</span>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </Carousel>

                            <div className="text-center mt-6">
                                <Button variant="outlined" className="w-full rounded-lg hover:bg-purple-50">
                                    View All →
                                </Button>
                            </div>
                        </Card>

                        {/* Know Your Teachers */}
                        <Card className="p-8 pt-6 border">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Know Your Teachers</h2>

                            <Carousel itemsPerView={3}>
                                {teachers.map((teacher, idx) => (
                                    <Card key={idx} className="overflow-hidden border">
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={teacher.image}
                                                alt={teacher.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-base font-bold mb-1 text-gray-800">{teacher.name}</h3>
                                            <p className="text-sm text-gray-600">{teacher.subject}</p>
                                            <p className="text-xs text-gray-500 mt-2">{teacher.experience}</p>
                                        </div>
                                    </Card>
                                ))}
                            </Carousel>
                        </Card>

                        {/* Checkout Your Schedule */}
                        <Card className="p-8 pt-6 border">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout Your Schedule</h2>

                            <Carousel itemsPerView={6}>
                                {subjects.map((subject, idx) => {
                                    const IconComponent = subject.icon;
                                    return (
                                        <Card key={idx} className="border cursor-pointer p-6 text-center">
                                            <div className="flex justify-center mb-3 text-[#1B2D73]">
                                                <IconComponent size={34} />
                                            </div>
                                            <h3 className="font-semibold text-sm text-gray-800">{subject.name}</h3>
                                        </Card>
                                    );
                                })}
                            </Carousel>
                        </Card>

                        {/* FAQs */}
                        <Card className="p-8 pt-6 border">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">FAQ's</h2>
                            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
                                {faqs.map((faq, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`} className="border border-gray-200 rounded-lg bg-white">
                                        <AccordionTrigger className="hover:no-underline py-4 bg-gray-100 transition-colors  px-6">
                                            <span className="font-semibold text-gray-800">{faq.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-600 py-4  px-6">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Card>
                    </div>

                    <div>
                        <PricingModal
                            isOpen={isPricingModalOpen}
                            onClose={() => setIsPricingModalOpen(false)}
                        />
                    </div>

                    {/* Video Dialog */}
                    <Dialog open={videoDialog.isOpen} onOpenChange={(open) => setVideoDialog({ isOpen: open, video: null })}>
                        <DialogContent className="max-w-4xl p-0">
                            <DialogHeader className="p-6 pb-0">
                                <DialogTitle className="text-2xl">{videoDialog.video?.title}</DialogTitle>
                            </DialogHeader>
                            <div className="aspect-video bg-gray-900 flex items-center justify-center">
                                <div className="text-white text-center p-8">
                                    <Play size={64} className="mx-auto mb-4" />
                                    <p className="text-gray-300 mb-4">{videoDialog.video?.description}</p>
                                    <Badge variant="filled" className="bg-gray-800">
                                        Duration: {videoDialog.video?.duration}
                                    </Badge>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="col-span-4">
                    <CoursesCard />
                </div>
            </div>
        </div>
    );
}
