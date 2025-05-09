import { FiHome, FiTruck, FiCreditCard } from 'react-icons/fi';

const ProcessBar = ({ currentStep }) => {
    const steps = [
        { id: 1, title: 'ขั้นตอนที่ 1', desc: 'เลือกที่อยู่', icon: FiHome },
        { id: 2, title: 'ขั้นตอนที่ 2', desc: 'เลือกการขนส่ง', icon: FiTruck },
        { id: 3, title: 'ขั้นตอนที่ 3', desc: 'ชำระเงิน', icon: FiCreditCard },
    ];

    return (
        <div className="w-full px-6 py-4 bg-white">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;

                    return (
                        <div
                            key={step.id}
                            className="flex flex-row items-center text-center flex-1 gap-4"
                        >
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full mb-1 ${isActive ? 'bg-black text-white' : 'border border-gray-400 text-gray-400'
                                    }`}
                            >
                                <Icon size={18} />
                            </div>
                            <div className="text-xs leading-tight">
                                <p className={`${isActive ? 'text-black font-semibold' : 'text-gray-400'}`}>
                                    {step.title}
                                </p>
                                <p className={`${isActive ? 'text-black' : 'text-gray-400'}`}>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProcessBar;
