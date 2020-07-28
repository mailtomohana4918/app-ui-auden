import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pushIssuestoStore } from "./issueLibrary.slice";
import { issueApi } from "./issueApi";
import CustomTable from "../shared/CustomTable/CustomTable";
import Header from "../shared/Header/Header";
import { Grid, Box, Button } from "@material-ui/core";
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

const IssueLibrary = (props) => {
  const stateData = useSelector((state) => state.search.searchData);
  const dispatch = useDispatch();
  const [dataRecieved, setDataReceived] = useState(false);
  const [filteredDataIssue, setFiltertedDataIssue] = useState();
  const issueDetails = useSelector((state) => state.issue.issueData);
  const fetchIssues = async (name, owner) => {
    const response = await issueApi.getIssues(name, owner);
    const id = Number(props.match.params.id);
    const updatedResponse = { id: id, issueDetails: [...response] };
    dispatch(pushIssuestoStore(updatedResponse));
    setDataReceived(true);
  };

  useEffect(
    () => {
      const repoData = stateData.find(
        (el) => Number(el.id) === Number(props.match.params.id)
      );

      const filteredData = fetchFromStore(Number(props.match.params.id));
      if (filteredData === undefined) {
        fetchIssues(repoData.name, repoData.owner.login);
      } else {
        setDataReceived(true);
        setFiltertedDataIssue(filteredData);
      }
    },
    []
  );

  const fetchFromStore = (id) => {

    const filteredData = issueDetails.find((el) => el.id === id);

    return filteredData;
  };

  const IssueContainer = () => {
    return (
      
      <CustomTable
        searchResult={
          filteredDataIssue === undefined
            ? issueDetails.find((el) => el.id === Number(props.match.params.id))
                .issueDetails
            : filteredDataIssue.issueDetails
        }
        columns={columns}
      />
    );
  };

  return (
    <>
      <Header />

      {dataRecieved && (
        <>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Box paddingTop="120px">
              <IssueContainer />
            </Box>
            <Box paddingTop="20px">
              <Button
                variant="contained"
                color="primary"
                onClick={() => props.history.push("/")}
              >
                Close
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
};

export default IssueLibrary;
