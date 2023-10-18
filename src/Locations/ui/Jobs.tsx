/**
 * React Component for displaying a location's UI
 *
 * This is a "router" component of sorts, meaning it deduces the type of
 * location that is being rendered and then creates the proper component(s) for that.
 */
import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Router } from "../../ui/GameRoot";
import { Page } from "../../ui/Router";

import { GenericLocation } from "./GenericLocation";
import { Locations } from "../../Locations/Locations";
import { Player } from "@player";

import { CompanyName } from "@enums";

/*
  TODO
    * quitting should immediately remove the company from the tabs
    * if working, jobs should open on the relevant company tab, otherwise tab 0
    * when quitting show the next tab down
*/

interface JobsProps {
  company: CompanyName;
}

export function Jobs(props: JobsProps): React.ReactElement {
  if (Object.keys(Player.jobs).length == 0) Router.toPage(Page.City);

  const [companyTab, setCompanyTab] = React.useState(props.company + "");
  const [jobs, setJobs] = React.useState(Object.keys(Player.jobs));

  function handleChange(event: React.SyntheticEvent, company: string): void {
    setJobs(Object.keys(Player.jobs));
    setCompanyTab(company);
  }

  return (
    <>
      {jobs.length > 1 && (
        <Tabs variant="scrollable" value={companyTab} onChange={handleChange}>
          {jobs.map((companyName: string, idx: number) => {
            return (
              <Tab
                key={idx}
                value={companyName}
                label={companyName}
                sx={{ minWidth: "fit-content", width: "15em", maxWidth: "15em" }}
              />
            );
          })}
        </Tabs>
      )}
      <GenericLocation loc={Locations[companyTab]} />
    </>
  );
}
