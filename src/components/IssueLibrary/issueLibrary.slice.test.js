import { issueSlice } from "./issueLibrary.slice";

describe("issueLibrarySlice", () => {
  it("pushIssuestoStore", () => {
    const issue_Date = "2020-07-27T16:48:02Z";
    const issuesToAdd = {
      issueData: [
        {
          id: 1,
          issueDetails: [
            {
              id: 1,
              title: "Component re-render",
              state: 2000,
              created_at: issue_Date,
              updated_at: issue_Date,
            },

            {
              id: 2,
              title: "Chaining Issue",
              state: 2000,
              created_at: issue_Date,
              updated_at: issue_Date,
            },
            {
              id: 3,
              title: "Media query not rendering",
              state: 2000,
              created_at: issue_Date,
              updated_at: issue_Date,
            },
            {
              id: 4,
              title: "snapshots not updating",
              state: 2000,
              created_at: issue_Date,
              updated_at: issue_Date,
            },
          ],
        },
      ],
    };
    const action = issueSlice.actions.pushIssuestoStore(issuesToAdd);
    expect(action).toStrictEqual({
      type: "issue/pushIssuestoStore",
      payload: issuesToAdd,
    });
  });
});
