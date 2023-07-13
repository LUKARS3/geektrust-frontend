import LandingPage from "./pages/LandingPage/LandingPage";
import { usersDataEndPoint } from "./constants";
import { useEffect, useState } from "react";
import { DataContext } from "./contexts/DataProvider";

function App() {
  //async function to fetch data
  const [responseData, setResponseData] = useState(null);
  async function fetchData() {
    try {
      const response = await fetch(usersDataEndPoint);
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      {responseData?.length > 0 &&
        <DataContext.Provider value={responseData}>
          <LandingPage />
        </DataContext.Provider>}
    </>
  )
}

export default App
