import { useContext, useState } from 'react';

import { DataContext } from '../../contexts/DataProvider';

//components
import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import DataTable from "../../components/DataTable/DataTable";
import Paginator from "../../components/Paginator/Paginator";
import Button from "../../components/Button/Button";
import SearchBar from '../../components/SearchBar/SearchBar';


//constants for the entire app
import {
    landingPageTitle,
    deleteButtonLabel,
    pageSize
} from "../../constants";


//styles
import './LandingPage.css'

function LandingPage() {
    const tableData = useContext(DataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [debounceTime, setDebounceTime] = useState(null);
    // const [value, setValue] = useState(null);

    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    const paginatedData = tableData.slice(start, end);

    const totalPages = Math.ceil(tableData.length / pageSize);

    function handlePageChange(event) {
        const clickedPage = event.target.dataset.id;
        if (clickedPage == 'first') {
            setCurrentPage(1);
            return;
        }

        if (clickedPage == 'last') {
            setCurrentPage(totalPages);
            return;
        }

        if (clickedPage == 'prev') {
            const prevPage = currentPage - 1;
            if (prevPage >= 1) {
                setCurrentPage(() => prevPage);
            }
            return;
        }

        if (clickedPage == 'next') {
            const nextPage = currentPage + 1;
            if (nextPage <= totalPages) {
                setCurrentPage(() => nextPage);
            }
            return;
        }

        setCurrentPage(() => Number(clickedPage));
    }

    function filterData(searchValue){

        const filteredData = tableData.filter((row) => {
            const values = Object.values(row);
            
            for(let field of values){
                if(field.includes(searchValue)) return row;
            }    
        });

        console.log(filteredData);
    }

    function searchHandler(event){
        const searchValue = event.target.value;
        if(debounceTime){
            clearTimeout(debounceTime);
        }

       const timer = setTimeout(()=> {
            filterData(searchValue);
       }, 500);

       setDebounceTime(timer);
    }



    function handleDeletionOfRows() {
    }

    //table headers
    const tableHeaders = ['name', 'email', 'role', 'actions'];
    return (
        <section className="landing-page-container">
            <article className="landing-page-content">
                <div>
                    <PageHeader pageTitle={landingPageTitle}></PageHeader>
                </div>

                {paginatedData?.length > 0 &&
                    <div className="data-table">
                        <div className="search-bar-container">
                            <SearchBar placeHolder={"search"} searchHandler={searchHandler}/>
                        </div>
                        
                        <div>
                            <DataTable tableHeaders={tableHeaders} data={paginatedData} />
                        </div>

                        <div className="pagination-deletion-container">
                            <Button
                                clickHandler={handleDeletionOfRows}
                                label={deleteButtonLabel}
                            />
                            <Paginator
                                totalPages={totalPages}
                                clickHandler={handlePageChange}
                                currentPage={currentPage}
                            />
                        </div>

                    </div>
                }
            </article>
        </section>
    )
}

export default LandingPage;
