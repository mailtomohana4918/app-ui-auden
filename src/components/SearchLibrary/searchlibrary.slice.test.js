import { searchSlice } from "./searchLibrary.slice";

describe("searchLibrarySlice", () => {
  it("pushReposToStore", () => {
    const reposToAdd = {
      searchData: [
        { id: 1, name: "React", watchers: 2000, forks: 100, open_issues: 200 },

        { id: 2, name: "Vue", watchers: 3000, forks: 200, open_issues: 300 },
        {
          id: 3,
          name: "Angular",
          watchers: 4000,
          forks: 300,
          open_issues: 400,
        },
        { id: 4, name: "Django", watchers: 5000, forks: 400, open_issues: 500 },
      ],
    };

    const action = searchSlice.actions.pushReposToStore(reposToAdd);
    expect(action).toStrictEqual({
      type: "search/pushReposToStore",
      payload: reposToAdd,
    });
  });
});
