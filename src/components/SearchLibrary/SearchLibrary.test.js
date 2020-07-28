import { render, fireEvent } from "@testing-library/react";
import SearchLibrary from "./SearchLibrary";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
//import userEvent from '@testing-library/user-event'
describe("SearchLibrary", () => {
  const initialState = {
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
  let store;
  it("render component as expected", () => {
    store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <SearchLibrary />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  describe("Search Button", () => {
    it("search button should be disabled on page load", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <Router>
            <SearchLibrary />
          </Router>
        </Provider>
      );

      expect(getByTestId("search-button-test-id").disabled).toBeTruthy();
    });

    it("search button should be enabled upon search pattern provided", () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <Router>
            <SearchLibrary />
          </Router>
        </Provider>
      );

      const searchPatternInput = getByTestId("search-pattern-text-test-id");

      fireEvent.change(searchPatternInput, { target: { value: "React" } });

      expect(getByTestId("search-button-test-id")).toBeEnabled();
    });
  });
});
