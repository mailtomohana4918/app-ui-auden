import axios from "axios";
//on page load we need to load first 10 latest trending repos. github api q param is mandatory
// Hence passing javascript and it gives trending repos 
export const searchApi = {
  getTrendingRepos: async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/search/repositories?q=javascript&sort=stars&order=desc&per_page=10"
      );

      return response.data.items;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  //since we have a requirment user can search by username or repo, we don't have single api to achieve
  //the capabiility, Hence clubbed two api calls.
  getReposByUserOrRepoName: async (searchPattern) => {
    try {
      const userRepos = await axios.get(
        `https://api.github.com/users/${searchPattern}/repos`,
        { validateStatus: false }
      );

      const repoList = await axios.get(
        `https://api.github.com/search/repositories?q=${searchPattern}`,
        { validateStatus: false }
      );

      if (userRepos.status === 404) return repoList.data.items;
      else return [...userRepos.data, ...repoList.data.items];
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
