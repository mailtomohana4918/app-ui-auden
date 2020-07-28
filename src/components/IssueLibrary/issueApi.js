import axios from "axios";
export const issueApi = {
  getIssues: async (name, owner) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${name}/issues`
      );
      //alert(JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
