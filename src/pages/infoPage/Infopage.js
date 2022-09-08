import React, { useState, useEffect } from "react";
import "./InfoPage.css";
import { BasicTable } from "../../components/BasicTable";

function Infopage() {
  const [projectsData, setProjegctsData] = useState("");

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem("token"));
    const storedDetails = JSON.parse(localStorage.getItem("details"));
    console.log(storedToken);
    console.log("stored-details" + storedDetails);
    // setToken(JSON.stringify(storedToken));
    // console.log(token);
    // GET request using fetch with set headers
    const myHeaders = new Headers({
      Berear: { storedToken },
    });

    const request = async () => {
      const response = await fetch(
        "https://private-052d6-testapi4528.apiary-mock.com/info"
      );
      const json = await response.json();
      console.log(json);
      setProjegctsData(json);
      console.log(projectsData);
    };

    request();

    // fetch("https://private-052d6-testapi4528.apiary-mock.com/info", {
    //   myHeaders,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setProjegctsData(data);
    //     console.log(projectsData);
    //   });
    // console.log(data));
    // this.setState({ totalReactPackages: data.total }));
  }, []);

  // React.useEffect(function effectFunction() {
  //   async function fetchBooks() {
  //     const response = await fetch(
  //       "https://private-052d6-testapi4528.apiary-mock.com/info"
  //     );
  //     const json = await response.json();
  //     setProjegctsData(json.data);
  //   }
  //   fetchBooks();
  // }, []);

  useEffect(() => {
    setProjegctsData(projectsData);
    console.log(projectsData);
  }, [projectsData]);

  return (
    <div>
      {/* <p>ff</p> */}
      <BasicTable projectsData={projectsData} />
    </div>
  );
}

export default Infopage;
