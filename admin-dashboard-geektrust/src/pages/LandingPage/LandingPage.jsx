import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import DataTable from "../../components/DataTable/DataTable";
import Paginator from "../../components/Paginator/Paginator";
import Button from "../../components/Button/Button";

import { useState, useEffect } from "react";

//constants for the entire app
import 
{landingPageTitle, 
    usersDataEndPoint,
    deleteButtonLabel, 
    pageSize
} from "../../constants";


//styles
import './LandingPage.css'

function LandingPage() {

     //states
     const [tableData, setTableData] = useState(null);
     const [paginatedData, setPaginatedData] = useState(null);
     const [totalPages, setTotalPages] = useState(null);
     const [currentPage, setCurrentPage] = useState(1);

    //pages arr generator
    function createAnArrayOfPages(size){
        const pagesList = [];

        for(let i=0; i<size; i++){
            pagesList.push(i+1);
        }

        setTotalPages(pagesList);
    }

    //returns paginated data
    function fetchPaginatedData(){
        const start = (currentPage-1) * pageSize;
        const end = currentPage * pageSize;
        setPaginatedData(tableData.slice(start, end));
    }

    //async function to fetch data
    async function fetchData() {
        try {
            const response = await fetch(usersDataEndPoint);
            const data = await response.json();
            setTableData(data);
            createAnArrayOfPages(Math.ceil(data.length/pageSize));
            fetchPaginatedData();

        } catch (error) {
            console.log(error);
        }

    }

    //deletion handler
    function handleDeletionOfRows(){
        console.log('merci');
    }

   

   


    //to fecth data once
    useEffect(() => {
        fetchData();
    }, []);

    //table headers
    const tableHeaders = ['name', 'email', 'role', 'actions'];

    return (
        <section className="landing-page-container">
            <article className="landing-page-content">
                <div>
                    <PageHeader pageTitle={landingPageTitle}></PageHeader>
                </div>

                {tableData?.length > 0 &&
                    <div className="data-table">
                        <DataTable tableHeaders={tableHeaders} data={paginatedData} />

                        <div className="pagination-deletion-container">
                            <Button 
                                clickHandler={handleDeletionOfRows} 
                                label={deleteButtonLabel}
                            />
                            <Paginator totalPages={totalPages}/>
                        </div>

                    </div>
                }
            </article>
        </section>
    )
}

export default LandingPage;
