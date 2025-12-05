// components/BGLinesLayout.tsx
import React, { ReactNode } from 'react';
import Image from 'next/image';


interface BGLinesLayoutProps {
  children: ReactNode;

}

const BGLinesLayout: React.FC<BGLinesLayoutProps> = ({ children}) => {
  return (

      <div className="relative min-h-screen overflow-hidden w-full bg-[#D4EDF4]">
      <div className="absolute inset-0  flex flex-col h-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="relative flex-1 w-full">
            <Image 
              src='https://ik.imagekit.io/99y1fc9mh/Aauraa/Frame%2056.png?updatedAt=1763032434986'
              alt={`Background Icons ${index + 1}`}
              className="object-cover w-full"
              width={1000}
              height={1000}
              priority={index === 0}
            />
          </div>
        ))}
      </div>

       <div className="relative z-40 h-full">
        {children}
      </div>
    </div>

  );
};

export default BGLinesLayout;



