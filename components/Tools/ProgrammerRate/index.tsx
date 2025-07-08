import React from 'react';

type Props = {
    level: "Junior" | "Mid" | "Senior";
};

const ProgrammerRate = ({ level }: Props) => {
    const getColoredCircles = () => {
        let coloredCount = level === "Junior" ? 2 : level === "Mid" ? 4 : 6;
        return Array.from({ length: 6 }).map((_, index) => (
            <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index < coloredCount ? 'bg-blue-900' : 'bg-white'}  border-gray-500`}
            />
        ));
    };

    return (
        <div className='flex flex-col gap-2'>
            <span>{level}</span>
            <div className='flex gap-1'>{getColoredCircles()}</div>
        </div>
    );
};

export default ProgrammerRate;
