import LandingPage from "./pages/LandingPage/LandingPage";
import { usersDataEndPoint } from "./constants";
import { useEffect, useState } from "react";
import { DataContext, DeviceWidthContext } from "./contexts/DataProvider";


function App() {
  //async function to fetch data
  const [responseData, setResponseData] = useState(null);
  const [deviceWidth, setDeviceWidth] = useState(null);
  async function fetchData() {
    try {

      const response = await fetch(usersDataEndPoint);
      const data = await response.json();
      setResponseData(data);

    } catch (error) {
      console.log(error);
    }
  }

  function dimensionUpdateHandler() {
    const width = window.innerWidth;
    setDeviceWidth(() => width);
  }

  useEffect(() => {
    fetchData();
    dimensionUpdateHandler();
    window.addEventListener("resize", dimensionUpdateHandler);

    //cleanup
    return () => {
      window.removeEventListener("resize", dimensionUpdateHandler);
    }
  }, []);


  return (
    <>
      {responseData?.length > 0 &&
        <DataContext.Provider value={responseData}>
          <DeviceWidthContext.Provider value={deviceWidth}>
            <LandingPage />
          </DeviceWidthContext.Provider>
        </DataContext.Provider>}
    </>
  )
}

export default App
