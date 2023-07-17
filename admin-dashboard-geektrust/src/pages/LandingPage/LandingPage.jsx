import { useContext, useState } from 'react';

import { DataContext } from '../../contexts/DataProvider';

//components
import PageHeader from "../../components/Headers/PageHeader/PageHeader";
import DataTable from "../../components/DataTable/DataTable";
import SearchBar from '../../components/SearchBar/SearchBar';



//constants for the entire app
import {
    landingPageTitle,
    rowActionEdit,
    rowActionDelete,
    rowActionSave,
    quickSearchPlaceHolder,
    pageSize,
    multipleDeletion
} from "../../constants";


//styles
import './LandingPage.css'

function LandingPage() {

    const responseData = useContext(DataContext);
    const [tableData, setTableData] = useState(responseData);
    const [datakeys] = useState(['id', 'email', 'name', 'role']);
    const [currentPage, setCurrentPage] = useState('1');
    const [debounceTime, setDebounceTime] = useState(null);
    const [searchParam, setSearchParam] = useState('');
    const [editableRowId, setEditableRowId] = useState('');
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [selectedPages, setSelectedPages] = useState(new Set());
    const [editedRow, setEditedRow] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    })



    function currentPageStateHandler(totalPages) {
        setCurrentPage(() => totalPages);
    }

    function filterDataBasedOnSearch() {

        const filteredData = tableData.filter((row) => {
            return datakeys.some((objKey) => {
                return row[objKey].includes(searchParam)
            });
        });

        return filteredData;

    }

    function searchHandler(event) {
        const searchValue = (event.target.value).toLowerCase();
        if (debounceTime) {
            clearTimeout(debounceTime);
        }

        const timer = setTimeout(() => {
            setSearchParam(searchValue);
        }, 500);

        setDebounceTime(timer);
    }

    function setCurrentPageAfterDeletion(dataRows) {
        if (dataRows.length <= ((currentPage - 1) * pageSize)) {
            setCurrentPage(dataRows.length / pageSize);
        }
    }

    function handleRowActions(event, row) {
        const actionType = event.currentTarget.dataset.actiontype;
        const rowId = event.currentTarget.dataset.id;
        const rowIndex = event.currentTarget.dataset.index;


        if (actionType === rowActionSave) {
            const index = (Number(currentPage - 1) * Number(pageSize)) + Number(rowIndex);
            const newTableData = [...tableData];
            newTableData[index] = editedRow;
            setTableData(newTableData);
            editRowHandler(new Set());
        }

        if (actionType === rowActionEdit) {
            setEditedRow(row);
            editRowHandler(rowId);
            return;
        }

        if (actionType === rowActionDelete) {
            const dataRows = tableData.filter((row) => row.id != rowId);
            setTableData(dataRows);
            setCurrentPageAfterDeletion(dataRows);
            return;
        }
    }

    function handleSelectedRows(event) {
        const rowId = event.currentTarget.dataset.id;
        const isChecked = event.target.checked;
        let selectedSetIds = new Set(selectedRows);
        let listOfSelectedPages = new Set(selectedPages);

        const start = (currentPage - 1) * pageSize;
        const end = currentPage * pageSize;
        if (rowId === multipleDeletion) {
            if (isChecked) {
                for (let i = start; i < end; i++) {
                    if (tableData[i]?.id)
                        selectedSetIds.add(tableData[i].id);
                }

                listOfSelectedPages.add(currentPage);
            } else {
                for (let i = start; i < end; i++) {
                    selectedSetIds.delete(tableData[i].id);
                }
                listOfSelectedPages.delete(currentPage);
            }
        } else {
            isChecked ? selectedSetIds.add(rowId) : selectedSetIds.delete(rowId);
        }


        setSelectedRows(selectedSetIds);
        setSelectedPages(listOfSelectedPages);

    }

    function handleDeletionOfSelectedRows() {
        const dataRows = tableData.filter((row) => !(selectedRows.has(row.id)));
        setTableData(dataRows);
        setCurrentPageAfterDeletion(dataRows);
        setSelectedRows(new Set());
        setSelectedPages(new Set());

    }

    function editRowHandler(rowId) {
        setEditableRowId(rowId);
    }

    function editRowChangeHandler(event) {
        const field = event.currentTarget.name;
        const value = event.currentTarget.value;
        const row = { ...editedRow }
        row[field] = value;
        setEditedRow(row);
    }

    //table headers
    const tableHeaders = ['name', 'email', 'role', 'actions'];
    return (

        <section className="landing-page-container">
            <article className="landing-page-content">
                <div>
                    <PageHeader pageTitle={landingPageTitle}></PageHeader>
                </div>
                <div className="data-table">
                    <div className="search-bar-container">
                        <SearchBar placeHolder={quickSearchPlaceHolder} searchHandler={searchHandler} />
                    </div>
                    <div>
                        <DataTable
                            selectedRows={selectedRows}
                            tableHeaders={tableHeaders}
                            data={filterDataBasedOnSearch()}
                            handleRowActions={handleRowActions}
                            handleSelectedRows={handleSelectedRows}
                            handleDeletionOfSelectedRows={handleDeletionOfSelectedRows}
                            currentPage={currentPage}
                            currentPageStateHandler={currentPageStateHandler}
                            selectedPages={selectedPages}
                            editableRowId={editableRowId}
                            rowInputChangeHandler={editRowChangeHandler}
                            editedRow={editedRow}
                        />
                    </div>
                </div>
            </article>
        </section>
    )
}

export default LandingPage;
