import { Badge, Button, Card } from '@/components/ui'
import { useNavigate } from 'react-router';

interface IProps {
    image: string;
    teacherName: string
    price: string
    discountPrice: string
}

const plans = ['Infinity Pro', 'Infinity']

const CoursesCard = ({ handleOpenModal }: any) => {
    const navigate = useNavigate()
    const handleExplore = () => {
        navigate("/batch-detail")
    }
    return (
        <Card className="overflow-hidden border border-gray-200">
            <div className="p-0">
                {/* Course Header Image */}

                <div className="w-full h-[250px] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop"
                        alt="Course cover"
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* Course Details */}
                <div className="p-4">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <span className="text-xl">👥</span>
                        <span className="text-base font-bold ">For JEE Aspirants</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <span className="text-xl">📅</span>
                        <span className="text-xs">
                            Starts on 14 Sep 2025 | Ends on 30 Jun 2027
                        </span>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                            More plans inside
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {plans.map((plan, index) => (
                                <Badge
                                    key={index}
                                    variant="outlined"
                                    className="bg-white border-yellow-400 text-yellow-700 text-xs"
                                >
                                    👑 {plan}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Pricing and Actions */}
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-gray-900">
                                    Rs 4000
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    4600
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-500">(For full batch)</p>
                        </div>

                        <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                            13% Discount
                        </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={handleExplore}
                            variant="outlined"
                            className="border-[#071952] text-[#071952]  text-sm py-3"
                        >
                            EXPLORE
                        </Button>
                        <Button className=" rounded-sm text-white text-sm py-3" onClick={handleOpenModal}>
                            BUY NOW
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CoursesCard
