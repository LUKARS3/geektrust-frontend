/* eslint-disable react/prop-types */
import RowActions from '../RowAction/RowAction';
import editIcon from '../../assets/edit-multicolor.svg';
import deleteIcon from '../../assets/delete-multicolor.svg';
import saveIcon from '../../assets/save-multicolor.svg';

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
	//to get values arr of row obj
	console.log('data in table' + JSON.stringify(data));
	function getArrayOfValuesFromObject(row) {
		return Object.values(row).slice(1);
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
			const prevPage = currentPage - 1;
			if (prevPage >= 1) {
				currentPageStateHandler(prevPage);
			}
			return;
		}

		if (clickedPage == 'next') {
			const nextPage = currentPage + 1;
			if (nextPage <= totalPages) {
				currentPageStateHandler(nextPage);
			}
			return;
		}

		currentPageStateHandler(clickedPage);
	}
	const totalPages = Math.ceil(data.length / pageSize);
	const start = (currentPage - 1) * pageSize;
	const end = currentPage * pageSize;
	const paginatedData = data.slice(start, end);
	return (
		<>
			{
				paginatedData.length > 0 ?
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
													(getArrayOfValuesFromObject(row).map((field) => {
														return (
															<td key={field}>
																{field}
															</td>
														)
													})
													) :
													(<EditableRow row={editedRow} rowInputChangeHandler={rowInputChangeHandler} />)}

												{/* {row.id != editableRowId && <td> */}
												<td>
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
													{/* </td>} */}
												</td>
											</tr>
										)
									})}
								</tbody>

							</table>
						</div>

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