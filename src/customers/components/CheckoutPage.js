import React, { useState } from "react";
import ProcessOne from "./ProcessOne";
import ProcessBar from "./ProcessBar";
import ProcessTwo from "./ProcessTwo";

const CheckoutPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        address: null,
        shipping: null,
        payment: null,
    });

    const updateStepData = (stepKey, data) => {
        setFormData(prev => ({ ...prev, [stepKey]: data }));
        setCurrentStep(prev => prev + 1);
    };

    return (
        <div>
            <ProcessBar currentStep={currentStep} />

            {currentStep === 1 && (
                <ProcessOne
                    data={formData.address}
                    onNext={(data) => updateStepData("address", data)}
                />
            )}
            {currentStep === 2 && (
                  <ProcessTwo
                    data={formData.shipping}
                    onNext={(data) => updateStepData("shipping", data)}
                    onBack={() => setCurrentStep(1)}
                  />
                // <div className="flex justify-center items-center h-screen">
                //     <h1 className="text-2xl font-bold">Shipping Method</h1>
                //     <p className="mt-4">Choose your shipping method here.</p>
                // </div>
            )}
            {currentStep === 3 && (
                //   <ProcessTwo
                //     data={formData.payment}
                //     onSubmit={(data) => updateStepData("payment", data)}
                //     onBack={() => setCurrentStep(2)}
                //   />
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-bold">Payment Method</h1>
                    <p className="mt-4">Choose your payment method here.</p>
                </div>
            )}
            <div className="flex justify-end items-center mt-6 space-x-4 px-4 mr-10">
                <button
                    className="w-32 h-12 bg-white text-gray-800 border border-black rounded text-lg"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                >
                    ย้อนกลับ
                </button>
                <button
                    className="w-32 h-12 bg-black text-white rounded text-lg"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={currentStep === 3}
                >
                    ถัดไป
                </button>
            </div>

        </div>
    );
};

export default CheckoutPage;