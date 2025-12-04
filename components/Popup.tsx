"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed " onClick={handleClose} />

      {/* Popup Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-xl">
        <div className="relative flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full  transition-colors duration-200"
            aria-label="Close popup"
          >
            <IoClose className="w-6 h-6 text-gray-600 cursor-pointer" />
          </button>

          {/* Title */}
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4 pr-8 text-center">
              Step Into AAURAA Before Anyone Else
            </h1>

            {/* Image */}
            <div className="relative w-full rounded-lg overflow-hidden">
              <Image
                src="https://ik.imagekit.io/99y1fc9mh/Aauraa/Mask%20group.png?updatedAt=1763033392868"
                alt="Event"
                width={600}
                height={50}
                className="py-5"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-black text-center mb-6 font-semibold">
            Be part of an invite-only experience where community founders,
            creators, and organizers step into AAURAA before anyone else.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href="/forms"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-black text-[#E90000] transition-colors duration-300 font-semibold px-6 py-3 rounded-full text-center"
            >
             JOIN THE WAITLIST
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
