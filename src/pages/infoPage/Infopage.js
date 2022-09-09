import React, { useState, useEffect, useMemo } from "react";
import "./InfoPage.css";
import { COLUMNS } from "../../components/columns";
import { columnsPersonalDetails } from "../../components/columnsPersonalDetails";
import { BasicTable } from "../../components/BasicTable";

function Infopage() {
  const [projectsData, setProjectsData] = useState();
  const [userDetails, setUsersDetails] = useState({});
  const columns = useMemo(() => COLUMNS, []);
  const columnsPersonalDetails = useMemo(() => columnsPersonalDetails, []);

  // const storedDetails = "";

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("userInfo")).token;
    const storedDetails = JSON.parse(localStorage.getItem("userInfo"))
      .personalDetails;
    setUsersDetails(storedDetails);
    console.log(storedDetails);
    console.log(userDetails);

    const myHeaders = new Headers({
      Berear: { storedToken },
    });

    const fetchProjects = async (headers) => {
      const response = await fetch(
        "https://private-052d6-testapi4528.apiary-mock.com/info",
        {
          headers,
        }
      );

      const projects = await response.json();
      setProjectsData(projects);
    };
    fetchProjects(myHeaders);
  }, []);

  return projectsData ? (
    <div>
      <BasicTable data={projectsData} columns={columns} />
      {/* <BasicTable
        data={userDetails}
        columnsPersonalDetails={columnsPersonalDetails}
      /> */}
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default Infopage;
