import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import DataTable from "../../components/DataTable/DataTable";

import { useState, useEffect } from "react";

//constants for the entire app
import { landingPageTitle, usersDataEndPoint } from "../../constants";


//styles
import './LandingPage.css'

function LandingPage() {

    //async function to fetch data
    async function fetchData() {
        try {
            const response = await fetch(usersDataEndPoint);
            const data = await response.json();
            setTableData(data);

        } catch (error) {
            console.log(error);
        }

    }
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])
    const tableHeaders = ['name', 'email', 'role', 'actions'];

    return (
        <section className="landing-page-container">
            <article className="landing-page-content">
                <div>
                    <PageHeader pageTitle={landingPageTitle}></PageHeader>
                </div>

                {tableData?.length > 0 &&
                    <div className="data-table">
                        <DataTable tableHeaders={tableHeaders} data={tableData} />
                    </div>
                }
            </article>
        </section>
    )
}

export default LandingPage;
