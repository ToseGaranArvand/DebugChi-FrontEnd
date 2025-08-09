import axios from "axios";
import Cookies from "js-cookie";

const headers = () => {
  const token = Cookies.get("token");
  return {
    "Content-Type": "application/json",
  };
};

const perform_post = async (url: string, data: any) => {
  try {
    const post_data = await axios.post(url, data, {
      headers: headers(),
    });
    return post_data.data;
  } catch (e: any) {
    console.log("ERROR:", e.response);
    return {
      data: e.response?.data,
      status: e.response?.status,
    };
  }
};

export async function createRoom(data: {
  teacher_id: number;
  participant_id: number;
  title: string;
}) {
  console.log("started");

  const res = await perform_post(
    "https://api.debugchiai.com/api/alocom/create_class/",
    {
      teacher_id: data.teacher_id,
      participant_id: data.participant_id,
      title: data.title,
      duration_time: 120,
      back_link: "https://yourwebsite.com/login",
    }
  );

  console.log("API response:", res);
  // return res;
}
