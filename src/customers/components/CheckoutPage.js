import React, { useState } from "react";
import ProcessOne from "./ProcessOne";
import ProcessBar from "./ProcessBar";
import ProcessTwo from "./ProcessTwo";
import ProcessThree from "./ProcessThree";

const CheckoutPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        item:[],
        address: null,
        shipping: null,
        payment: null,
    });

    const updateStepData = (stepKey, data) => {
        setFormData(prev => ({ ...prev, [stepKey]: data }));
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleSave = () => {
        console.log("All data saved:", formData);
    };

    return (
        <div className="px-4 py-6">
            <ProcessBar currentStep={currentStep} />

            {currentStep === 1 && (
                <ProcessOne
                    data={formData}
                    onNext={(data) => updateStepData("address", data)}
                />
            )}

            {currentStep === 2 && (
                <ProcessTwo
                    data={formData}
                    onNext={(data) => updateStepData("shipping", data)}
                    onBack={() => setCurrentStep(1)}
                />
            )}

            {currentStep === 3 && (
                <ProcessThree
                    data={formData}
                    onNext={(data) => {
                        updateStepData("payment", data);
                        handleSave();
                    }}
                    onBack={() => setCurrentStep(2)}
                />
            )}
        </div>
    );
};

export default CheckoutPage;
