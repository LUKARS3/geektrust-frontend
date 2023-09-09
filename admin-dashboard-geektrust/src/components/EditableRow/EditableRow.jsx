// import './EditableRow.css'
import '../Styles.css';
import './EditableRow.css'

function EditableRow({ rowInputChangeHandler, row, isDesktop }) {
    const dataKeys = Object.keys(row);
    return (
        <>
            {
                dataKeys.map((dataKey) => {
                    if (dataKey !== 'id') {
                        if (isDesktop) {
                            return (
                                <td>
                                    <input type="text" name={dataKey} onChange={rowInputChangeHandler} value={row[dataKey]} />
                                </td>
                            )
                        } else {
                            return (
                                <input type="text" name={dataKey} onChange={rowInputChangeHandler} value={row[dataKey]} className="input-styles" />
                            )
                        }
                    }
                })
            }
        </>
    )
}


export default EditableRow;