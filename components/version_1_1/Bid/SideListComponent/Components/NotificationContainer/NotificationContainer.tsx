"use client";
import React, { FC, useEffect, useState } from "react";
import { NotificationCard } from "./NotificationCard/NotificationCard";
import Cookies from "js-cookie";
import { useBidFilter } from "@/context/BidFilterContext";
import { jwtDecode } from "jwt-decode";
import { JwtDecodedToken } from "@/components/types/user.types";
import axios from "axios";
import { perform_get } from "@/lib/api";
import { TenderDetail } from "@/components/types/tender.type";

const NotificationContainer: FC<{ header: React.ReactNode }> = ({ header }) => {
  // const [pendingList, setPendingList] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = Cookies.get("token");

  //     try {
  //       const response = await fetch(
  //         `${process.env.server}/api/v1/bids_tender_list/`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);

  //       setPendingList(data.own_tenders);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="text-white h-full flex flex-col">
      {header}
      <div className="px-1 space-y-[26px] flex-1 overflow-y-auto">
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
};

export { NotificationContainer };
//  "1926c9b1-609e-4887-b4bb-74cc441db345"
