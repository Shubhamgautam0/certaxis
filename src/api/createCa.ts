import axios from "axios";
import { siteConfig } from "../data/data";

const authToken = localStorage.getItem("authToken") || "";
const csrfToken = localStorage.getItem("csrfToken") || "";
// Update your API function to accept parameters
export const createCA = async (
  formData: FormData
): Promise<Awaited<ReturnType<typeof axios.post>>> => {
  try {
    const response = await axios.post(
      `${siteConfig.apiEndpoint}/api/ca/create`,
      formData,
      {
        headers: {
          "X-XSRF-TOKEN": csrfToken,
          Authorization: authToken,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};