import React, { useState, useEffect, useMemo } from "react";
import "./InfoPage.css";
import { COLUMNS } from "../../components/columns";
import { COLUMNS_PERSONAL_INFO } from "../../components/columnsPersonalDetails";
import { BasicTable } from "../../components/BasicTable";

function Infopage() {
  const [projectsData, setProjectsData] = useState();
  const [userDetails, setUsersDetails] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const columnsPersonalDetails = useMemo(() => COLUMNS_PERSONAL_INFO, []);

  useEffect(() => {
    //getting the value of local storage
    const storedToken = JSON.parse(localStorage.getItem("userInfo")).token;

    userDetails[0] = JSON.parse(
      localStorage.getItem("userInfo")
    ).personalDetails;
    setUsersDetails((current) => [userDetails[0], ...current]);

    //fetching data
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
    <div className="tables-container">
      <BasicTable data={userDetails} columns={columnsPersonalDetails} />
      <BasicTable data={projectsData} columns={columns} />
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default Infopage;
