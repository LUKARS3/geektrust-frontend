import { useContext, useState } from 'react';

import { DataContext } from '../../contexts/DataProvider';

//components
import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import DataTable from "../../components/DataTable/DataTable";
import Paginator from "../../components/Paginator/Paginator";
import Button from "../../components/Button/Button";


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

    //problem 1
    //how to render search data? send the searched data to dataTable and paginator as porps
    //handle on the child



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
                        <DataTable tableHeaders={tableHeaders} data={paginatedData} />

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
