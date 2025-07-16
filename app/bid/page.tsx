import Bid from "@/components/version_1_1/Bid";
import { perform_get } from "@/lib/api";
import { cookies } from "next/headers";
import { Main } from "@/components/types/tender.type";

const BidPage = async () => {
  const token = (await cookies()).get("token")?.value;
  const tender: Main = await perform_get("api/v1/tenders/by-role", token);
  console.log(tender);
  
  

  return <Bid data={tender} />;
};

export default BidPage;
