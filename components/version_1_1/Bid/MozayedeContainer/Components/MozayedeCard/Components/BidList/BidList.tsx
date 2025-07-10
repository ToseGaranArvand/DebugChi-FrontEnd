// base
import { FC } from "react";
// core
interface Bid {
  username: string;
  amount: string;
}

interface BidListProps {
  bids: Bid[];
}

const BidList: FC<BidListProps> = ({ bids }) => {
  return (
    <div className="h-[78px] mt-[14px] p-3 bg-[#040404] rounded-[15px]">
      {bids.map(({ username, amount }, idx) => (
        <div key={`${username}-${idx}`}>
          {idx !== 0 && (
            <div
              style={{
                background:
                  "linear-gradient(to right, #ffffff0a 0%, #ffffff21 50%, #ffffff0a 100%)",
              }}
              className="h-[1px] my-2"
            ></div>
          )}
          <div className="flex justify-between text-sm text-[#BBBBBB]">
            <div className="font-iranLight">
              تومان
              <span className="mr-2 text-[16px] text-[#B5E80F] font-iranBold">
                {amount}
              </span>
            </div>
            <div className="font-iranRegular">{username}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { BidList };
