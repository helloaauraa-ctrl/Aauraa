"use client";

import { useState, useEffect, useCallback } from "react";

interface FormData {
  timestamp: string;
  fullName: string;
  email: string;
  mobile: string;
  communityName: string;
  socialHandle: string;
  eventType: string;
  attendPrelaunch: string;
  questions: string;
}

const Form = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    timestamp: new Date().toISOString(),
    fullName: "",
    email: "",
    mobile: "",
    communityName: "",
    socialHandle: "",
    eventType: "",
    attendPrelaunch: "",
    questions: "",
  });
  const [errors, setErrors] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (showThankYou && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = "/";
    }
  }, [showThankYou, countdown]);

  const showError = useCallback((questionNum: number, message: string) => {
    setErrors((prev) => ({ ...prev, [questionNum]: message }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwH8lOiGyshI6uGD9Xq6AuXpiSIiQMwXhCnGxlX8E1RauDDLYdRgPg6M1xClmdnzTv1eQ/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          mode: "no-cors",
        }
      );
      setShowThankYou(true);
    } catch (error) {
      console.error("Error:", error);
      showError(6, "There was an error submitting the form. Please try again.");
      setIsSubmitting(false);
    }
  }, [formData, showError]);

  const validateAndProceed = useCallback(
    (questionNum: number) => {
      let isValid = true;
      let errorMsg = "";

      switch (questionNum) {
        case 1:
          if (!formData.fullName.trim()) {
            isValid = false;
            errorMsg = "Please enter your full name";
          }
          break;
        case 2:
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email.trim())) {
            isValid = false;
            errorMsg = "Please enter a valid email address";
          }
          break;
        case 3:
          const mobileValue = formData.mobile.trim();
          if (!mobileValue) {
            isValid = false;
            errorMsg = "Please enter your mobile number";
          } else if (!/^\d{10}$/.test(mobileValue)) {
            isValid = false;
            errorMsg =
              "Mobile number must be exactly 10 digits and contain only numbers";
          }
          break;
        case 4:
          if (!formData.communityName.trim()) {
            isValid = false;
            errorMsg = "Please enter your community/brand/event name";
          }
          break;
        case 5:
          if (!formData.socialHandle.trim()) {
            isValid = false;
            errorMsg = "Please enter your website or social media handle";
          }
          break;
        // Question 6 is removed
        case 6: // This is now question 7 (attendPrelaunch)
          if (formData.attendPrelaunch === "") {
            isValid = false;
            errorMsg = "Please select an option";
          }
          break;
      }

      if (isValid) {
        setErrors((prev) => ({ ...prev, [questionNum]: "" }));
        // Skip question 6 and 8, go directly to thank you after question 6 (now 7)
        if (questionNum === 6) {
          handleSubmit();
        } else {
          setCurrentQuestion(questionNum + 1);
        }
      } else {
        showError(questionNum, errorMsg);
      }
    },
    [formData, showError, handleSubmit]
  );

  const handleEnterPress = useCallback(() => {
    switch (currentQuestion) {
      case 1:
        if (formData.fullName.trim()) {
          validateAndProceed(1);
        } else {
          showError(1, "Please enter your full name");
        }
        break;
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(formData.email.trim())) {
          validateAndProceed(2);
        } else {
          showError(2, "Please enter a valid email address");
        }
        break;
      case 3:
        if (formData.mobile.trim()) {
          validateAndProceed(3);
        } else {
          showError(3, "Please enter your mobile number");
        }
        break;
      case 4:
        if (formData.communityName.trim()) {
          validateAndProceed(4);
        } else {
          showError(4, "Please enter your community/brand/event name");
        }
        break;
      case 5:
        if (formData.socialHandle.trim()) {
          validateAndProceed(5);
        } else {
          showError(5, "Please enter your website or social media handle");
        }
        break;
      case 6: // This is now question 7 (attendPrelaunch)
        if (formData.attendPrelaunch !== "") {
          validateAndProceed(6);
        } else {
          showError(6, "Please select an option");
        }
        break;
      default:
        handleSubmit();
        break;
    }
  }, [currentQuestion, formData, validateAndProceed, showError, handleSubmit]);

  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Enter" && !showThankYou) {
        e.preventDefault();
        handleEnterPress();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleEnterPress, showThankYou]);


  const attendOptions = [
    { value: "yes", label: "Yes, I'll be there" },
    {
      value: "no",
      label:
        "Sorry, can't make it but would like to be updated once the app is launched",
    },
  ];

  // Updated progress to reflect 6 questions instead of 8
  const progress = showThankYou ? 100 : ((currentQuestion - 1) / 6) * 100;

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center p-5 md:p-10 font-sans text-white relative">
      <div className="w-full max-w-[700px]">
        {/* Question 1: Full Name */}
        {currentQuestion === 1 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              Full Name *
            </h2>
            <div className="relative mb-10">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Type your answer here..."
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[1] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[1]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(1)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 2: Email */}
        {currentQuestion === 2 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(1)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              Email Address *
            </h2>
            <div className="relative mb-10">
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                autoFocus={true}
                placeholder="name@example.com"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[2] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[2]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(2)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 3: Mobile Number */}
        {currentQuestion === 3 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(2)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              Mobile Number *
            </h2>
            <div className="relative mb-10">
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                autoFocus={true}
                placeholder="+1 (555) 000-0000"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[3] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[3]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(3)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 4: Community/Brand/Event Name */}
        {currentQuestion === 4 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(3)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              Name of Your Community / Brand / Event *
            </h2>
            <div className="relative mb-10">
              <input
                type="text"
                value={formData.communityName}
                onChange={(e) =>
                  setFormData({ ...formData, communityName: e.target.value })
                }
                autoFocus={true}
                placeholder="Type your answer here..."
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[4] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[4]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(4)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 5: Website or Social Media Handle */}
        {currentQuestion === 5 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(4)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              Website or Social Media Handle *
            </h2>
            <div className="relative mb-10">
              <input
                type="text"
                value={formData.socialHandle}
                onChange={(e) =>
                  setFormData({ ...formData, socialHandle: e.target.value })
                }
                autoFocus={true}
                placeholder="Type your answer here..."
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none transition-all"
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[5] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[5]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(5)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter ↵</span>
            </div>
          </div>
        )}

        {/* Question 6: Attend Prelaunch (was Question 7) */}
        {currentQuestion === 6 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(5)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full text-base font-medium cursor-pointer hover:bg-white/90 transition-all flex items-center gap-1"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 12H5M12 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-[28px] font-medium mb-5 tracking-tight">
              Will you be attending the Prelaunch in person? *
            </h2>
            <div className="mb-8">
              <div className="flex flex-col gap-2">
                {attendOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        attendPrelaunch: option.value,
                      });
                      setErrors((prev) => ({ ...prev, 6: "" }));
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      formData.attendPrelaunch === option.value
                        ? "bg-white/20"
                        : "bg-white/10 hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 border-2 rounded-full mr-3 transition-all relative ${
                          formData.attendPrelaunch === option.value
                            ? "border-white"
                            : "border-white/50"
                        }`}
                      >
                        {formData.attendPrelaunch === option.value && (
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="text-lg">{option.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              {errors[6] && (
                <div className="text-red-400 text-sm mt-1.5">{errors[6]}</div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(6)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Thank You */}
        {showThankYou && (
          <div className="text-center opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="text-6xl mb-8">🎉</div>
            <h2 className="text-[42px] font-semibold mb-5 tracking-tight">
              Thank you!
            </h2>
            <p className="text-[22px] text-white/80 mb-10">
              We&apos;ll be in touch with you shortly.
            </p>
            <p className="text-[#999] text-sm">
              Redirecting to home page in <span>{countdown}</span> seconds...
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full">
        <div className="w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-5px);
          }
          40%,
          80% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
        .input-line {
          width: 0;
        }
        input:focus ~ .input-line,
        textarea:focus ~ .input-line,
        select:focus ~ .input-line {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Form;