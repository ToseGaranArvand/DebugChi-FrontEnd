import axios from "axios";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export const headers = () => {
  if (Cookies.get("token") !== undefined) {
    return {
      Authorization: "Bearer " + Cookies.get("token"),
      "Content-Type": "application/json",
    };
  }
};

export async function fetchMultipleRequests(urls: string[]) {
  try {
    const responses = await axios.all(urls.map((url) => axios.get(url)));
    const data = responses.map((response) => response.data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const performRequest = async (url: string) => {
  try {
    const response = await axios.get(url, {
      headers: headers(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const performUpdate = async (url: string, data: any) => {
  try {
    const request = await axios.patch(`${process.env.server}/${url}`, data, {
      headers: headers(),
    });
    const response = await request.data;

    return { response: response, success: true };
  } catch (err: any) {
    console.log(err);
    return { response: err.response.data, success: false };
  }
};

export const getRoomId = async (user1Id: string, user2Id: string) => {
  try {
    const response = await axios.post(
      `${process.env.ws}/api/chat/room/`,
      {
        user1Id: user1Id,
        user2Id: user2Id,
      },
      {
        headers: headers(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getUserChatList = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.server}/api/v1/get-user-debug/`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const perform_post = async (url: string, data: any, token?: string) => {
  try {
    const post_data = await axios.post(`${process.env.server}/${url}`, data, {
      headers: headers(),
    });
    const response = await post_data.data;
    return response;
  } catch (e: any) {
    console.log(e.response);
    return {
      data: e.response.data,
      status: e.status,
    };
  }
};

export const perform_update = async (url: string, data: any) => {
  try {
    const post_data = await axios.put(`${process.env.server}/${url}`, data, {
      headers: headers(),
    });
    const response = await post_data.data;
    return response;
  } catch (e: any) {
    return {
      data: e.response.data,
      status: e.status,
    };
  }
};

export const perform_get = async (url: string, token?: string) => {
  try {
    const request = await axios.get(`${process.env.server}/${url}`, {
      headers: !token
        ? headers()
        : {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
    });
    const response = await request.data;
    return response;
  } catch (e: any) {
    return {
      data: e.response?.data ?? null,
      status: e.status ?? 500,
    };
  }
};

export const perform_delete = async (url: string, data?: any) => {
  try {
    const request = await axios.delete(`${process.env.server}/${url}`, {
      headers: headers(),
    });
    console.log(request);
    if (request.status == 204) {
      return {
        success: true,
        message: "با موفقیت حذف شد",
      };
    }
  } catch (e: any) {
    return {
      data: e.response.data,
      status: e.status,
    };
  }
};

export const perform_patch = async (url: string, data: any, token?: string) => {
  try {
    const post_data = await axios.patch(`${process.env.server}/${url}`, data, {
      headers: headers(),
    });
    const response = await post_data.data;
    return response;
  } catch (e: any) {
    return {
      data: e.response.data,
      status: e.status,
    };
  }
};

export const perform_chat_post = async (url: string, data: any) => {
  try {
    const post_data = await axios.post(`${process.env.server}/${url}`, data, {
      headers: headers(),
      withCredentials: true,
    });
    const response = await post_data.data;
    return response;
  } catch (e: any) {
    console.log(e.response);
    return {
      data: e.response.data,
      status: e.status,
    };
  }
};
