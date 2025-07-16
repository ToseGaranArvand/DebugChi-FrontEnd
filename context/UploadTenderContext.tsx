"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Bid } from "@/components/types/RequestListForBid";
import { useBidFilter } from "./BidFilterContext";

// Define the shape of our context
interface TenderType {
  mode?: "tender" | "auction";
  title?: string;
  description?: string;
  project?: number;
  start_time?: string;
  end_time?: string;
  start_bid?: number;
  image?: File;
}
interface ProjectType {
  project_id?: number;
  type_class?: "private" | "public";
  class_title?: string;
  description?: string;
  educational_heading?: string;
  educational_heading_file?: File | null;
  start_date?: string;
  end_date?: string;
  buffer_date?: number;
  is_deleted?: boolean;
  language?: string;
  expertise?: string;
  created_by?: number;
  is_tender?: boolean;
}

interface Details {
  state: boolean;
  bids: any[];
}

interface AcceptModal {
  stats: boolean;
  uuid: string;
  bid_id: number;
}

interface TenderContextType {
  images: any[];
  tender: TenderType | null;
  project: ProjectType | null;
  details: Details;
  acceptModal: AcceptModal;
  unSeenBid: boolean;
  showUpload: boolean;
  setShowUpload: (show: boolean) => void;

  setBidStatus: (bid_id: number) => void;
  setUnseenBids: (unSeen: boolean) => void;
  setAcceptModal: (acceptModal: AcceptModal) => void;
  setDetails: (details: Details) => void;
  setImages: (image: any[]) => void;
  setTenderData: (tender: TenderType) => void;
  setProjectData: (project: ProjectType) => void;
}

const AppContext = createContext<TenderContextType | undefined>(undefined);

export const TenderProvider = ({ children }: { children: ReactNode }) => {
  const [tender, setTenderData] = useState<TenderType | null>(null);
  const [project, setProjectData] = useState<ProjectType | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [unSeenBid, setUnseenBids] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [details, setDetails] = useState<Details>({
    state: false,
    bids: [],
  });

  const setBidStatus = (bid_id: number) => {
    setDetails((prev) => ({
      ...prev,
      bids: prev.bids.map((bid) =>
        bid.id === bid_id ? { ...bid, status: true } : bid
      ),
    }));
  };

  const [acceptModal, setAcceptModal] = useState<AcceptModal>({
    stats: false,
    uuid: "",
    bid_id: 0,
  });
  return (
    <AppContext.Provider
      value={{
        acceptModal,
        details,
        project,
        images,
        tender,
        unSeenBid,
        showUpload,
        setShowUpload,
        setBidStatus,
        setUnseenBids,
        setDetails,
        setAcceptModal,
        setTenderData,
        setProjectData,
        setImages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const tenderContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
