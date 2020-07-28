import React from "react";

import { AppBar, Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function Header() {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <AppBar>
          <Toolbar variant="dense">
            <Typography variant="h4" color="inherit">
              Github Library
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
}
