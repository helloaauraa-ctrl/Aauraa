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
  const [countdown, setCountdown] = useState(15);

  // Redirect after thank you screen
  useEffect(() => {
    if (showThankYou && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = "/";
    }
  }, [showThankYou, countdown]);

  // Show validation errors
  const showError = (step: number, msg: string) =>
    setErrors((prev) => ({ ...prev, [step]: msg }));

  // VALIDATION RULES
  const validators: Record<number, () => string | null> = {
    1: () => (formData.fullName.trim() ? null : "Please enter your full name"),

    2: () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(formData.email.trim())
        ? null
        : "Please enter a valid email";
    },

    3: () => {
      let raw = formData.mobile.trim();
      if (!raw) return "Please enter your mobile number";

      raw = raw.replace(/\s+/g, "");

      if (raw.startsWith("00")) raw = "+" + raw.slice(2);

      if (!/^\+\d{6,15}$/.test(raw))
        return "Enter valid international number (e.g., +971501234567)";

      setFormData((prev) => ({ ...prev, mobile: raw }));
      return null;
    },

    4: () => (!formData.howyouJoin ? "Please select how you'll join us" : null),

    5: () => {
      if (formData.howyouJoin === "user") return null;
      return formData.communityName.trim()
        ? null
        : "Please enter your community/brand/event name";
    },

    6: () => {
      if (formData.howyouJoin === "user") return null;
      return formData.socialHandle.trim()
        ? null
        : "Please enter your website or social media handle";
    },

    7: () => {
      if (formData.howyouJoin === "user") return null;
      return formData.eventType ? null : "Please select an event type";
    },
  };

  // STEP FLOW ENGINE (NEXT)
  const getNextStep = (step: number): number => {
    const role = formData.howyouJoin;

    if (step === 4 && role === "user") return 6; // Skip Q5
    if (step === 6 && role === "user") return 8; // Skip Q7

    return step + 1;
  };

  // STEP FLOW ENGINE (BACK)
  const getPrevStep = (step: number): number => {
    const role = formData.howyouJoin;

    if (role === "user") {
      if (step === 8) return 6;
      if (step === 6) return 4;
      if (step === 4) return 3;
      if (step === 3) return 2;
      if (step === 2) return 1;
      return step - 1;
    }

    // Community/event flow back steps
    if (step === 7) return 6;
    if (step === 6) return 5;
    if (step === 5) return 4;

    return step - 1;
  };

  // Validate + move
  const validateAndProceed = (step: number) => {
    const error = validators[step]();
    if (error) {
      showError(step, error);
      return;
    }

    setErrors((prev) => ({ ...prev, [step]: "" }));
    setCurrentQuestion(getNextStep(step));
  };

  // Submit waitlist
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v as string));

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzKFhsxQZ_hGzaIc0swrmXIhF733dpDZUCZlkNIikuS1uj-sJp4tltdqGQ5TEk7xaS2Ag/exec",
        { method: "POST", mode: "no-cors", body: data }
      );

      setShowThankYou(true);
    } catch {
      showError(9, "Submission failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  // ENTER key support
  const handleEnterPress = () => {
    if (currentQuestion <= 7) validateAndProceed(currentQuestion);
    else if (currentQuestion === 8) handleSubmit();
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!showThankYou && e.key === "Enter") {
        e.preventDefault();
        handleEnterPress();
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleEnterPress, showThankYou]);

  // ================================
  // UI BELOW — SAME AS YOUR ORIGINAL
  // ================================

  const howYouJoinOption = [
    { value: "community-founder", label: "I am a Community Founder" },
    { value: "event-host", label: "I Create Events" },
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

  const progress = showThankYou ? 100 : ((currentQuestion - 1) / 9) * 100;

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center p-5 md:p-10 font-sans text-white relative">
      <div className="w-full max-w-[700px]">
        {/* =======================
            Q1 – FULL NAME
        ======================= */}
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
                className="w-full py-3 bg-transparent  focus:border-b-2 border-white/30 text-white text-2xl focus:outline-none"
              />
              {errors[1] && (
                <div className="text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[1]}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(1)}
                className="bg-white text-black px-5 py-2.5 rounded-full"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* =======================
            Q2 – EMAIL
        ======================= */}
        {currentQuestion === 2 && !showThankYou && (
          <div>
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(getPrevStep(2))}
                className="bg-white text-black px-2.5 py-1.5 rounded-full"
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
                className="w-full py-3 bg-transparent  focus:border-b-2 border-white/30 text-white text-2xl focus:outline-none"
              />
              {errors[2] && (
                <div className="text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[2]}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(2)}
                className="bg-white text-black px-5 py-2.5 rounded-full"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* =======================
            Q3 – MOBILE NUMBER
        ======================= */}
        {currentQuestion === 3 && !showThankYou && (
          <div>
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(getPrevStep(3))}
                className="bg-white text-black px-2.5 py-1.5 rounded-full"
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

            <h2 className="text-[28px] font-medium mb-5">Mobile Number *</h2>

            <div className="relative mb-10">
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                placeholder="+971 501234567"
                className="w-full py-3 bg-transparent focus:border-b-2 border-white/30 text-white text-2xl focus:outline-none"
              />
              {errors[3] && (
                <div className="text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[3]}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(3)}
                className="bg-white text-black px-5 py-2.5 rounded-full"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* =======================
            Q4 – HOW YOU JOIN
        ======================= */}
        {currentQuestion === 4 && !showThankYou && (
          <div>
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(getPrevStep(4))}
                className="bg-white text-black px-2.5 py-1.5 rounded-full"
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

            <h2 className="text-[28px] font-medium mb-5">
              How would you like to join AAURAA? *
            </h2>

            <div className="mb-8 flex flex-col gap-3">
              {howYouJoinOption.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setFormData({ ...formData, howyouJoin: option.value });
                    setErrors((prev) => ({ ...prev, 4: "" }));
                  }}
                  className={`p-4 rounded-lg cursor-pointer ${
                    formData.howyouJoin === option.value
                      ? "bg-white/20"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 border-2 rounded-full mr-3 ${
                        formData.howyouJoin === option.value
                          ? "border-white"
                          : "border-white/60"
                      }`}
                    >
                      {formData.howyouJoin === option.value && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full m-auto relative top-1.5"></div>
                      )}
                    </div>

                    <span className="text-lg">{option.label}</span>
                  </div>
                </div>
              ))}

              {errors[4] && (
                <div className="text-red-400 text-sm mt-1.5">{errors[4]}</div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(4)}
                className="bg-white text-black px-5 py-2.5 rounded-full"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* =======================
            Q5 – COMMUNITY NAME (Skipped for user)
        ======================= */}
        {currentQuestion === 5 && !showThankYou && (
          <div>
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(getPrevStep(5))}
                className="bg-white text-black px-2.5 py-1.5 rounded-full"
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

            <h2 className="text-[28px] font-medium mb-5">
              Name of Your Community / Brand / Event *
            </h2>

            <div className="relative mb-10">
              <input
                type="text"
                value={formData.communityName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    communityName: e.target.value,
                  })
                }
                placeholder="Type your answer here..."
                className="w-full py-3 bg-transparent focus:border-b-2 border-white/30 text-white text-2xl focus:outline-none"
              />

              {errors[5] && (
                <div className="text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[5]}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(5)}
                className="bg-white text-black px-5 py-2.5 rounded-full"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* =======================
            Q6 – WEBSITE / SOCIAL HANDLE
        ======================= */}
        {currentQuestion === 6 && !showThankYou && (
          <div>
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(getPrevStep(6))}
                className="bg-white text-black px-2.5 py-1.5 rounded-full"
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

            <h2 className="text-[28px] font-medium mb-5">
              Website or Social Media Handle{" "}
              {formData.howyouJoin !== "user" ? "*" : "(Optional)"}
            </h2>

            <div className="relative mb-10">
              <input
                type="text"
                value={formData.socialHandle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialHandle: e.target.value,
                  })
                }
                placeholder="https://... or @your_handle"
                className="w-full py-3 bg-transparent focus:border-b-2 border-white/30 text-white text-2xl focus:outline-none"
              />

              {errors[6] && formData.howyouJoin !== "user" && (
                <div className="text-red-400 text-sm mt-1.5 animate-shake">
                  {errors[6]}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(6)}
                className="bg-white text-black px-5 py-2.5 rounded-full"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* =======================
            Q7 – EVENT TYPES (Skipped for user)
        ======================= */}
        {currentQuestion === 7 && !showThankYou && (
          <div>
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(getPrevStep(7))}
                className="bg-white text-black px-2.5 py-1.5 rounded-full"
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

            <h2 className="text-[28px] font-medium mb-5">
              Type of events you usually host *
            </h2>

            <div className="mb-8 flex flex-col gap-3">
              {eventTypes.map((type) => (
                <div
                  key={type.value}
                  onClick={() => {
                    setFormData({ ...formData, eventType: type.value });
                    setErrors((prev) => ({ ...prev, 7: "" }));
                  }}
                  className={`p-4 rounded-lg cursor-pointer ${
                    formData.eventType === type.value
                      ? "bg-white/20"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 border-2 rounded-full mr-3 ${
                        formData.eventType === type.value
                          ? "border-white"
                          : "border-white/60"
                      }`}
                    >
                      {formData.eventType === type.value && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full m-auto relative top-1.5"></div>
                      )}
                    </div>

                    <span className="text-lg">{type.label}</span>
                  </div>
                </div>
              ))}

              {errors[7] && (
                <div className="text-red-400 text-sm mt-1.5">{errors[7]}</div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => validateAndProceed(7)}
                className="bg-white text-black px-5 py-2.5 rounded-full"
              >
                OK
              </button>
              <span className="text-white/70 text-sm">Press Enter</span>
            </div>
          </div>
        )}

        {/* =======================
            Q8 – ADDITIONAL QUESTIONS
        ======================= */}
        {currentQuestion === 8 && !showThankYou && (
          <div>
            <div className="mb-12">
              <button
                onClick={() => setCurrentQuestion(getPrevStep(8))}
                className="bg-white text-black px-2.5 py-1.5 rounded-full"
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

            <h2 className="text-[28px] font-medium mb-5">
              Any questions or suggestions for the AAURAA team?
            </h2>

            <div className="relative mb-10">
              <textarea
                value={formData.questions}
                onChange={(e) =>
                  setFormData({ ...formData, questions: e.target.value })
                }
                placeholder="Type your answer here... (optional)"
                className="w-full py-3 bg-transparent focus:border-b-2 border-white/30 text-white text-2xl resize-none focus:outline-none"
                rows={3}
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-white text-black px-5 py-2.5 rounded-full disabled:opacity-50"
            >
              {isSubmitting ? "Joining..." : "Join the Waitlist"}
            </button>
          </div>
        )}

        {/* =======================
            THANK YOU SCREEN
        ======================= */}
        {showThankYou && (
          <div className="text-center">
            <h2 className="text-[42px] font-semibold mb-5 tracking-tight">
              Welcome to <span className=" text-[#E90000]">AAURAA!</span>
            </h2>

            <p className="text-[22px] text-white/80 mb-6">
              You’re officially on the list. ✨
            </p>

            <div className="text-white/80 text-[18px] leading-relaxed mb-10 space-y-3 text-left">
              <p>
                Thank you for joining our early community — where meaningful
                connections meet real experiences.
              </p>
              <p>You’ll soon get early access to:</p>
              <ul className="list-none space-y-1">
                <li>• Curated communities</li>
                <li>• Purpose-driven events</li>
                <li>• Local creators & founders</li>
                <li>• A platform built to bring people together</li>
              </ul>
              <p>This is just the beginning. Your AAURAA journey starts now.</p>
              <p>
                Together, we’re building a platform with communities, for
                communities, shaping a more connected UAE.
              </p>
            </div>

            <p className="text-[#999] text-sm">
              Redirecting to home in <span>{countdown}</span> seconds...
            </p>
          </div>
        )}
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute top-0 left-0 w-full">
        <div className="w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
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
      `}</style>
    </div>
  );
};

export default Form;
