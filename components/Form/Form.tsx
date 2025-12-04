"use client";

import { useState, useEffect, useCallback } from "react";

interface FormData {
  timestamp: string;
  fullName: string;
  email: string;
  mobile: string;
  howyouJoin: string;
  communityName: string;
  socialHandle: string;
  eventType: string;
  questions: string;
}

const Form = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    timestamp: new Date().toISOString(),
    fullName: "",
    email: "",
    mobile: "",
    howyouJoin: "",
    communityName: "",
    socialHandle: "",
    eventType: "",
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
          } else {
            // Remove all non-digits except leading +
            const cleaned = mobileValue.replace(/[^\d+]/g, "");
            const digits = cleaned.replace(/^\+/, "");
            if (digits.length < 10 || digits.length > 15) {
              isValid = false;
              errorMsg = "Please enter a valid mobile number (10–15 digits)";
            }
          }
          break;
        case 4:
          if (!formData.howyouJoin) {
            isValid = false;
            errorMsg = "Please select how you'll join us";
          } else {
            // SKIP Q5 if user selects "user"
            if (formData.howyouJoin === "user") {
              setErrors((prev) => ({ ...prev, 4: "" }));
              setCurrentQuestion(6);
              return;
            }
          }
          break;

        case 5:
          if (!formData.communityName.trim()) {
            isValid = false;
            errorMsg = "Please enter your community/brand/event name";
          }
          break;
        case 6:
          if (!formData.socialHandle.trim()) {
            isValid = false;
            errorMsg = "Please enter your website or social media handle";
          }
          break;
        case 7:
          if (formData.eventType === "") {
            isValid = false;
            errorMsg = "Please select an event type";
          }
          break;
      }

      if (isValid) {
        setErrors((prev) => ({ ...prev, [questionNum]: "" }));
        if (questionNum < 9) {
          setCurrentQuestion(questionNum + 1);
        }
      } else {
        showError(questionNum, errorMsg);
      }
    },
    [formData, showError]
  );

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value as string);
    });

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzTtRhQcJ0r8zNznAjlBBL-XDHIM10keU9gRnAdb1iVeYwANoVlvXlNsf3pq8Rg5M27RA/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: data, // Critical: Google Apps Script needs FormData
        }
      );
      setShowThankYou(true);
    } catch (error) {
      console.error("Submission failed:", error);
      showError(9, "Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  }, [formData, showError]);

  const handleEnterPress = useCallback(() => {
    if (currentQuestion <= 8) {
      validateAndProceed(currentQuestion);
    } else if (currentQuestion === 9) {
      handleSubmit();
    }
  }, [currentQuestion, validateAndProceed, handleSubmit]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !showThankYou) {
        e.preventDefault();
        handleEnterPress();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleEnterPress, showThankYou]);

  const howYouJoinOption = [
    { value: "community-founder", label: "I am a Community Founder" },
    { value: "i-create-events", label: "I Create Events" },
    {
      value: "user",
      label: "I am a User looking to discover communities & experiences",
    },
  ];

  const eventTypes = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "both", label: "Both" },
  ];

  const attendOptions = [
    { value: "yes", label: "Yes, I'll be there" },
    {
      value: "no",
      label:
        "Sorry, can't make it but would like to be updated once the app is launched",
    },
  ];

  const progress = showThankYou ? 100 : ((currentQuestion - 1) / 9) * 100;

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center p-5 md:p-10 font-sans text-white relative">
      <div className="w-full max-w-[700px]">
        {/* Question 1 */}
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
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none"
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
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* Question 2 */}
        {currentQuestion === 2 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(1)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
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
                placeholder="name@example.com"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none"
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
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* Question 3 */}
        {currentQuestion === 3 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(2)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
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
                placeholder="+1 (555) 123-4567"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none"
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
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* Question 4 */}
        {currentQuestion === 4 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(3)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
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
              How would you like to join AAURAA? (Select one)*
            </h2>
            <div className="mb-8">
              <div className="flex flex-col gap-2">
                {howYouJoinOption.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setFormData({ ...formData, howyouJoin: option.value });
                      setErrors((prev) => ({ ...prev, 4: "" }));
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      formData.howyouJoin === option.value
                        ? "bg-white/20"
                        : "bg-white/10 hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 border-2 rounded-full mr-3 relative ${
                          formData.howyouJoin === option.value
                            ? "border-white"
                            : "border-white/50"
                        }`}
                      >
                        {formData.howyouJoin === option.value && (
                          <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="text-lg">{option.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              {errors[4] && (
                <div className="text-red-400 text-sm mt-1.5">{errors[4]}</div>
              )}
            </div>
            <button
              onClick={() => validateAndProceed(4)}
              className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all"
            >
              OK
            </button>
          </div>
        )}

        {/* Question 5–8: Same pattern – only back button fixed */}
        {currentQuestion === 5 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(4)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
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
                placeholder="Type your answer here..."
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none"
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
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {currentQuestion === 6 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(5)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
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
                placeholder="https://.... or @your_handle"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none"
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
              {errors[6] && (
                <div className="absolute left-0 top-full text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[6]}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(6)}
                className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {currentQuestion === 7 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(6)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
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
              Type of events you usually host *
            </h2>
            <div className="mb-8">
              <div className="flex flex-col gap-2">
                {eventTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => {
                      setFormData({ ...formData, eventType: type.value });
                      setErrors((prev) => ({ ...prev, 7: "" }));
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      formData.eventType === type.value
                        ? "bg-white/20"
                        : "bg-white/10 hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 border-2 rounded-full mr-3 relative ${
                          formData.eventType === type.value
                            ? "border-white"
                            : "border-white/50"
                        }`}
                      >
                        {formData.eventType === type.value && (
                          <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="text-lg">{type.label}</div>
                    </div>
                  </div>
                ))}
              </div>
              {errors[7] && (
                <div className="text-red-400 text-sm mt-1.5">{errors[7]}</div>
              )}
            </div>
            <button
              onClick={() => validateAndProceed(7)}
              className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all"
            >
              OK
            </button>
          </div>
        )}

        {/* Question 8 */}
        {currentQuestion === 8 && !showThankYou && (
          <div className="opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(7)}
                className="bg-white text-black px-2.5 py-1.5 rounded-full flex items-center gap-1 hover:bg-white/90 transition-all"
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
              Any questions or suggestions for the AAURAA team?
            </h2>
            <div className="relative mb-10">
              <textarea
                value={formData.questions}
                onChange={(e) =>
                  setFormData({ ...formData, questions: e.target.value })
                }
                placeholder="Type your answer here... (optional)"
                className="w-full py-3 bg-transparent border-none border-b-2 border-white/30 text-white text-2xl focus:outline-none resize-none"
                rows={3}
              />
              <div className="input-line absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-500" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-white text-black px-5 py-2.5 rounded-full text-base font-medium hover:translate-y-[-2px] hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Joining..." : "Join the Waitlist"}
            </button>
          </div>
        )}

        {/* Thank You */}
        {showThankYou && (
          <div className="text-center opacity-100 transform translate-y-0 transition-all duration-400">
            <div className="text-6xl mb-8">Celebration</div>
            <h2 className="text-[42px] font-semibold mb-5 tracking-tight">
              Thank you!
            </h2>
            <p className="text-[22px] text-white/80 mb-10">
              We'll be in touch with you shortly.
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
        textarea:focus ~ .input-line {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Form;
