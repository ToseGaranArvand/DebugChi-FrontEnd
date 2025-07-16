// base
import { FC } from "react";
// core
import { ISuggestedAmountsProps } from "@/src/core/types/props/ISuggestedAmountsProps";



const SuggestedAmounts: FC<ISuggestedAmountsProps> = ({ amounts }) => {
  return (
    <>
      <h1 className="mt-[22px] mr-2.5 text-right text-sm text-[#FFFFFF80]">
        مبلغ پیشنهادی
      </h1>
      <div className="mt-2.5 text-white text-sm space-y-1.5">
        {amounts.map((amount, index) => (
          <div
            key={index}
            className="h-10 px-8 flex justify-between items-center rounded-xl bg-[#222222]"
          >
            <span>{amount.toLocaleString("fa-IR")}</span>
            <span>تومان</span>
          </div>
        ))}
      </div>
    </>
  );
};

export { SuggestedAmounts };
