import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid } from "@material-ui/core";
import Header from "../shared/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { pushReposToStore } from "./searchLibrary.slice";
import { searchApi } from "./searchApi";
import CustomTable from "../shared/CustomTable/CustomTable";

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

const useStyles = makeStyles((theme) => ({
  button: { paddingTop: "20px", paddingBottom: "20px" },
  boxContainer:{paddingTop:"120px" ,width:"20%"}
}));

const SearchLibrary = (props) => {
  const classes = useStyles();
  const [searchPattern, setSearchPattern] = useState("");
  const [isDisableButton, setIsDisableButton] = useState(true);

  const dispatch = useDispatch();
  const handleSearchPattern = (event) => {
    setSearchPattern(event.target.value);
    setIsDisableButton(false);
  };

  const searchData = useSelector((state) => state.search.searchData);
  const [filteredSearchData, setFilteredSearchData] = useState([]);
  const fetchTrendingRepos = async () => {
    const response = await searchApi.getTrendingRepos();
    dispatch(pushReposToStore(response));
  };
  useEffect(
    () => {
      if (searchData.length === 0) fetchTrendingRepos();
    },
    []
  );

  const fetchRepos = async () => {
    const filteredData = searchData.filter(
      (el) =>
        el.owner.login.toLowerCase().includes(searchPattern.toLowerCase()) ||
        el.name.toLowerCase().includes(searchPattern.toLowerCase())
    );
    // if found then return from store
    if (filteredData.length === 0) {
      //fetch from api
      const response = await searchApi.getReposByUserOrRepoName(searchPattern);

      dispatch(pushReposToStore(response));

      setFilteredSearchData(response);
    } else setFilteredSearchData(filteredData);

    //  setSearchPattern("")
  };

  return (
    <>
      <Header />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Box className={classes.boxContainer}>
          <TextField
            placeholder="Search by keyword or username"
            variant="outlined"
            value={searchPattern}
            onChange={handleSearchPattern}
            fullWidth
            type="text"
            inputProps={{ "data-testid": "search-pattern-text-test-id" }}
          />
        </Box>
        <Box className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchRepos}
            disabled={isDisableButton}
            data-testid="search-button-test-id"
          >
            Search
          </Button>
        </Box>
        <Box>
          {
            <CustomTable
              searchResult={
                filteredSearchData.length === 0 && searchPattern === ""
                  ? searchData.slice(0, 10)
                  : filteredSearchData
              }
              columns={columns}
              source={"repo"}
            />
          }
        </Box>
      </Grid>
    </>
  );
};

export default SearchLibrary;
