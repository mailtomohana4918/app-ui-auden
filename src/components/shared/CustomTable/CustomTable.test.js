import { render } from "@testing-library/react";
import CustomTable from "./CustomTable";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
describe("CustomTable Repository details", () => {
  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "watchers",
      label: "Stars",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "forks",
      label: "Forks",
      minWidth: 170,
      align: "right",
      format: (value) => value,
    },
    {
      id: "open_issues",
      label: "Issues",
      minWidth: 170,
      align: "right",
      format: (value) => value,
    },
  ];

  const data = [
    { id: 1, name: "React", watchers: 2000, forks: 100, open_issues: 200 },

    { id: 2, name: "Vue", watchers: 3000, forks: 200, open_issues: 300 },
    { id: 3, name: "Angular", watchers: 4000, forks: 300, open_issues: 400 },
    { id: 4, name: "Django", watchers: 5000, forks: 400, open_issues: 500 },
  ];
  it("render component when source is repo", () => {
    const { asFragment } = render(
      <Router>
        <CustomTable source="repo" columns={columns} searchResult={data} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe("CustomTable Issue details", () => {
  const columns = [
    { id: "title", label: "Issue", minWidth: 100 },
    { id: "number", label: "Issue Number", minWidth: 100 },
    {
      id: "state",
      label: "Status",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "created_at",
      label: "Created Date",
      minWidth: 170,
      align: "right",
      format: (value) => value,
    },
    {
      id: "updated_at",
      label: "Last Updated Date",
      minWidth: 170,
      align: "right",
      format: (value) => value,
    },
  ];

  const issue_Date = "2020-07-27T16:48:02Z";
  const data = [
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
  ];
  it("render component when source is issue", () => {
    const { asFragment } = render(
      <Router>
        <CustomTable columns={columns} searchResult={data} source="issue"/>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
