import { render } from "@testing-library/react";
import IssueLibrary from "./IssueLibrary";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
describe("IssueLibrary", () => {
  const issue_Date = "2020-07-27T16:48:02Z";
  const initialState = {
    issue: {
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
    },
    search: {
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
    },
  };
  const mockStore = configureStore();
  let store, wrapper;

  it("render component as expected", () => {
    store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <Router
          render={(routeProps) => <IssueLibrary {...routeProps} id={1} />}
        />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
