import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
class AiService {
  static getInstance() {
    return new AiService();
  }
  async getResponse(data: any) {
    try {
      const response = await axios.post(`${BASE_URL}/post/upload`, data);
      // console.log("response", response.data);
      return response.data.coverLetter;
    } catch (error) {
      console.error(error);
    }
  }
}

export const aiService = AiService.getInstance();
