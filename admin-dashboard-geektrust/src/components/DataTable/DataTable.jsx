/* eslint-disable react/prop-types */
import RowActions from '../RowAction/RowAction';
import editIcon from '../../assets/edit-multicolor.svg';
import deleteIcon from '../../assets/delete-multicolor.svg';
import saveIcon from '../../assets/save-multicolor.svg';
import React, { useState, useContext } from 'react';
import { DeviceWidthContext } from '../../contexts/DataProvider';

//paginator responsive
//edit on mobiles
//css for inputs checkbox


//constants
import {
	actionButtonStyles,
	rowActionEdit,
	rowActionDelete,
	errorMessage,
	deleteButtonLabel,
	pageSize,
	deleteButtonStyles,
	multipleDeletion,
	rowActionSave
} from '../../constants';

//components
import Paginator from "../../components/Paginator/Paginator";
import Button from "../../components/Buttons/Button";
import EditableRow from '../EditableRow/EditableRow';

// import './DataTable.css';
import '../Styles.css';

//DataTable component
function DataTable({
	selectedRows,
	tableHeaders,
	data,
	handleRowActions,
	handleSelectedRows,
	handleDeletionOfSelectedRows,
	currentPage,
	currentPageStateHandler,
	selectedPages,
	editableRowId,
	rowInputChangeHandler,
	editedRow
}) {
	const deviceWidth = useContext(DeviceWidthContext);
	const isDesktop = deviceWidth > 800;

	const [currentRow, setCurrentRow] = useState(null);
	const [isActive, setIsActive] = useState(null);

	//to get values arr of row obj
	function getArrayOfValuesFromObject(row) {
		return Object.keys(row).slice(1);
	}

	function handleAccordion(event) {
		let rowId = event.currentTarget.dataset.id;
		setIsActive(() => rowId != currentRow);
		setCurrentRow(() => rowId != currentRow ? rowId : null);
	}

	function handlePageChange(event) {

		const clickedPage = event.target.dataset.id;
		if (clickedPage == 'first') {
			currentPageStateHandler(1);
			return;
		}

		if (clickedPage == 'last') {
			currentPageStateHandler(totalPages);
			return;
		}

		if (clickedPage == 'prev') {
			const prevPage = Number(currentPage) - 1;
			if (prevPage >= 1) {
				currentPageStateHandler(prevPage);
			}
			return;
		}

		if (clickedPage == 'next') {
			const nextPage = Number(currentPage) + 1;
			if (nextPage <= totalPages) {
				currentPageStateHandler(nextPage);
			}
			return;
		}

		currentPageStateHandler(clickedPage);
	}
	const totalPages = Math.ceil(data.length / pageSize);
	const start = (Number(currentPage) - 1) * pageSize;
	const end = Number(currentPage) * pageSize;
	const paginatedData = data.slice(start, end);

	//Data Cells for tables
	const DataCells = ({ row }) => {
		return (
			getArrayOfValuesFromObject(row).map((field) => {
				if (isDesktop) {
					return (
						<td key={field}>
							{row[field]}
						</td>
					);
				} else {
					return (
						<div key={field} className="accordion-data">
							<div className="accordion-body-label">
								{field}
							</div>
							<div >
								<span>
									{row[field]}
								</span>
							</div>
						</div>
					)
				}

			})
		);
	};

	//row actions for each row
	const RowActionsContainer = ({ row, index }) => {
		return (
			<div className="actions-container">
				<RowActions
					buttonIcon={editableRowId == row.id ? saveIcon : editIcon}
					clickHandler={handleRowActions}
					className={actionButtonStyles}
					type={editableRowId == row.id ? rowActionSave : rowActionEdit}
					row={row}
					rowIndex={index}
				/>

				<RowActions
					buttonIcon={deleteIcon}
					clickHandler={handleRowActions}
					className={actionButtonStyles}
					type={rowActionDelete}
					row={row}
					rowIndex={index}
				/>

			</div>
		)
	}


	//htmlDataTable for desktops and laptops
	const HtmlDataTable =
		<>
			<div>
				<table className='table'>
					<thead>
						<tr>
							<th>
								<input
									type='checkbox'
									data-id={multipleDeletion}
									onChange={handleSelectedRows}
									checked={selectedPages.has(currentPage)}
								/>
							</th>
							{tableHeaders.map((header) => {
								return <th key={header}>{header}</th>;
							})}
						</tr>
					</thead>

					<tbody>
						{paginatedData.map((row, index) => {
							return (
								<tr key={row.id} className={`${selectedRows.has(row.id) ? "selected-row" : ""}`}>
									<td>
										<input
											data-id={row.id}
											type="checkbox"
											checked={selectedRows.has(row.id)}
											onChange={handleSelectedRows}
										/>
									</td>

									{row.id != editableRowId ?
										(<DataCells row={row} />) :
										(<EditableRow
											row={editedRow}
											rowInputChangeHandler={rowInputChangeHandler}
											isDesktop={isDesktop}
										/>
										)
									}
									<td>
										<RowActionsContainer row={row} index={index} />
									</td>
								</tr>
							)
						})}
					</tbody>

				</table>
			</div>
		</>

	//for tablets and phones
	const Accordion =
		<>
			<div className="accordions">
				<div className="select-all">
					<input
						type='checkbox'
						data-id={multipleDeletion}
						onChange={handleSelectedRows}
						checked={selectedPages.has(currentPage)}
						id="selectAll"
					/>
					<label htmlFor="selectAll">Select All</label>
				</div>
				{paginatedData.map((row, index) => {
					return (
						<div key={row.id}>
							<div>
								<div className="mobile-dataTable">
									<div>
										<input
											type='checkbox'
											onChange={handleSelectedRows}
											data-id={row.id}
											checked={selectedRows.has(row.id)}
										/>
									</div>
									<div className="accordion-container">
										<div
											className={
												`accordion-label 
												${row.id == currentRow && isActive ? 'accordion-active' : ''}
												${selectedRows.has(row.id) ? "selected-row" : ""}`
											}
											onClick={handleAccordion}
											data-id={row.id}
										>
											<div>
												<div>{row.name}</div>
												<div>{row.role}</div>
											</div>
										</div>
										<div className={`accordion-body ${row.id == currentRow && isActive ? 'accordion-body-active' : ''}`}>
											{row.id != editableRowId ?
												(<DataCells row={row} />) :
												(<EditableRow
													row={editedRow}
													rowInputChangeHandler={rowInputChangeHandler}
													isDesktop={isDesktop}
												/>
												)
											}
											<div>
												<div className="accordion-body-label">
													{'Actions'}
												</div>
												<RowActionsContainer row={row} index={index} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<hr />
						</div>
					)
				})
				}
			</div>
		</>

	const dataTableToRender = isDesktop ? HtmlDataTable : Accordion;
	return (
		<>
			{
				paginatedData.length > 0 ?
					<>
						{dataTableToRender}
						<div className="pagination-deletion-container">
							<Button
								clickHandler={handleDeletionOfSelectedRows}
								label={deleteButtonLabel}
								className={deleteButtonStyles}
							/>
							<Paginator
								totalPages={totalPages}
								clickHandler={handlePageChange}
								currentPage={currentPage}
							/>
						</div>
					</> :
					<>
						<div>
							<p>{errorMessage}</p>
						</div>
					</>
			}
		</>

	);
}



export default DataTable;