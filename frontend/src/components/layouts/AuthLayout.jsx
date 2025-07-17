import React from 'react';
import CARD_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from 'react-icons/lu';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen"> {/* Flex container for side-by-side */}
      
      {/* Left Side */}
      <div className="w-full md:w-[60%] px-12 pt-8 pb-12 bg-white overflow-y-auto">
        <h2 className="text-xl font-bold text-black">Money Map<br/></h2>
        {children}
      </div>

      {/* Right Side */}
      <div className="hidden md:block w-[40%] h-full bg-violet-50 relative p-8 overflow-hidden">
        
        {/* Floating background shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute top-[-20px] left-[-20px]" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-[-40px]" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute bottom-[-30px] left-[-20px]" />

        {/* Card with Icon and Info */}
        <div className="grid grid-cols-1 z-20 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown size={26} />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        {/* Image */}
        <img
          src={CARD_2}
          alt="Card Illustration"
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 right-0"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

// Card Component
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200 z-10">
      <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-lg font-semibold">${value}</span>
      </div>
    </div>
  );
};
