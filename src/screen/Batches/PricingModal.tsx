import React, { useState, useRef } from "react";
import { X, Check } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge, Button } from "@/components/ui";

const PricingModal = ({ isOpen, onClose }: any) => {
    const [selectedPlan, setSelectedPlan] = useState("batch");
    const scrollRef: any = useRef(null);

    const plans = [
        {
            id: "batch",
            name: "Batch Course",
            color: "from-[#2b185b] to-[#3e1d6a]",
            borderColor: "border-yellow-400",
            price: 4000,
            originalPrice: 4600,
            discount: 13,
            scrollPosition: 0,
        },
        {
            id: "infinity",
            name: "Infinity Package",
            color: "from-[#074b2b] to-[#0c6139]",
            borderColor: "border-yellow-400",
            price: 7000,
            originalPrice: 10000,
            discount: 30,
            scrollPosition: 0.5,
        },
        {
            id: "infinity-pro",
            name: "Infinity Pro Package",
            color: "from-[#5b4600] to-[#8b6d00]",
            borderColor: "border-yellow-400",
            price: 12000,
            originalPrice: 18000,
            discount: 33,
            scrollPosition: 1,
        },
    ];

    const features = [
        {
            category: "Class Notes & Handwritten Notes",
            items: [
                {
                    name: "Printed Class Notes & Handwritten Notes",
                    icon: false,
                    batch: true,
                    infinity: true,
                    infinityPro: true,
                },
            ],
        },
        {
            category: "Infinity Learning Features",
            items: [
                {
                    name: "Free Access to All Upcoming Courses",
                    icon: true,
                    batch: false,
                    infinity: true,
                    infinityPro: true,
                },
                {
                    name: "Khazana – 7000+ Video Lectures Access",
                    icon: true,
                    batch: false,
                    infinity: true,
                    infinityPro: true,
                },
                {
                    name: "Uday 2026 Full Batch Access",
                    icon: true,
                    batch: false,
                    infinity: true,
                    infinityPro: true,
                },
                {
                    name: "Test Pass (Chapter-wise, PYQs, Practice Tests)",
                    icon: true,
                    batch: false,
                    infinity: true,
                    infinityPro: true,
                },
                {
                    name: "Unlimited Practice Questions",
                    icon: true,
                    batch: false,
                    infinity: true,
                    infinityPro: true,
                },
                {
                    name: "Performance Meter (Track Your Prep)",
                    icon: true,
                    batch: false,
                    infinity: true,
                    infinityPro: true,
                },
            ],
        },
        {
            category: "Infinity Pro Premium Features",
            items: [
                {
                    name: "Saarthi (Ask Doubts via Video/Chat/Audio)",
                    icon: true,
                    batch: false,
                    infinity: false,
                    infinityPro: true,
                },
                {
                    name: "Printed Modules (15 Book Set)",
                    icon: true,
                    batch: false,
                    infinity: false,
                    infinityPro: true,
                },
                {
                    name: "Real Test Series (Offline Centers in Pakistan)",
                    icon: true,
                    batch: false,
                    infinity: false,
                    infinityPro: true,
                },
                {
                    name: "1-to-1 Mentorship",
                    icon: true,
                    batch: false,
                    infinity: false,
                    infinityPro: true,
                },
                {
                    name: "Career Guidance Sessions",
                    icon: true,
                    batch: false,
                    infinity: false,
                    infinityPro: true,
                },
                {
                    name: "PW Merchandise (Goodies & Gifts)",
                    icon: true,
                    batch: false,
                    infinity: false,
                    infinityPro: true,
                },
            ],
        },
    ];

    const selectedPlanDetails = plans.find((p) => p.id === selectedPlan);

    const handlePlanSelect = (planId: any) => {
        setSelectedPlan(planId);
        const plan = plans.find((p) => p.id === planId);
        if (scrollRef.current && plan) {
            const scrollHeight =
                scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
            const targetScroll = scrollHeight * plan.scrollPosition;
            scrollRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}

                className="sm:max-w-[650px] max-h-[90vh] p-0 bg-[#0f0f0f] text-white border border-[#2a2a2a] rounded-xl overflow-hidden">
                <div className="flex flex-col h-full">
                    {/* HEADER */}
                    <div className="flex-shrink-0 bg-[#131313] border-b border-[#2a2a2a] p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-white">
                                Akram Hussain 2026
                            </h2>
                        </div>

                        {/* PLAN BUTTONS */}
                        <div className="grid grid-cols-3 gap-4">
                            {plans.map((plan) => (
                                <button
                                    key={plan.id}
                                    onClick={() => handlePlanSelect(plan.id)}
                                    className={`relative bg-gradient-to-r ${plan.color} rounded-md p-4 text-center font-semibold border-2 transition-all
                    ${selectedPlan === plan.id
                                            ? plan.borderColor +
                                            " shadow-[0_0_10px_rgba(255,215,0,0.6)]"
                                            : "border-transparent"
                                        }
                  `}
                                >
                                    {plan.name}
                                    {selectedPlan === plan.id && (
                                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                                            <div className="bg-yellow-400 rounded-full p-1">
                                                <Check className="w-4 h-4 text-black" />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar"
                        style={{ maxHeight: "calc(90vh - 280px)" }}
                    >
                        {features.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="mb-6">
                                {section.category && (
                                    <h3 className="text-yellow-400 text-sm font-semibold mb-3 mt-4">
                                        {section.category}
                                    </h3>
                                )}

                                {section.items.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="grid grid-cols-4 gap-4 py-3 border-b border-[#2a2a2a] items-center"
                                    >
                                        <div className="col-span-1 text-sm text-gray-300">
                                            {feature.name}
                                        </div>
                                        <div className="text-center">
                                            {feature.batch ? (
                                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 mx-auto" />
                                            )}
                                        </div>
                                        <div className="text-center">
                                            {feature.infinity ? (
                                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 mx-auto" />
                                            )}
                                        </div>
                                        <div className="text-center">
                                            {feature.infinityPro ? (
                                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 mx-auto" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* FOOTER */}
                    <div className="flex-shrink-0 bg-[#131313] border-t border-[#2a2a2a] p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-yellow-400 mb-1">
                                    {selectedPlanDetails?.name}
                                </p>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-white">
                                        Rs. {selectedPlanDetails?.price.toLocaleString()}
                                    </span>
                                    <span className="text-lg text-gray-400 line-through">
                                        Rs.{" "}
                                        {selectedPlanDetails?.originalPrice.toLocaleString()}
                                    </span>
                                    <Badge className="bg-green-600 text-white">
                                        {selectedPlanDetails?.discount}% OFF
                                    </Badge>
                                </div>
                            </div>

                            {/* GOLDEN BUY NOW BUTTON */}
                            <div>
                                <Button
                                    className="bg-gradient-to-b from-[#f8e27a] via-[#f6c343] to-[#b8860b]
                 text-black font-semibold px-12 py-3 text-base rounded-sm
                 shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all duration-300"
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PricingModal;
