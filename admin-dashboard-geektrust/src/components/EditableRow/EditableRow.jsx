import './EditableRow.css'

function EditableRow({ rowInputChangeHandler, row }) {
    return (
        <>
            <td>
                <input type="text" name="name" onChange={rowInputChangeHandler} value={row.name} />
            </td>
            <td>
                <input type="text" name="email" onChange={rowInputChangeHandler} value={row.email} />
            </td>
            <td>
                <input type="text" name="role" onChange={rowInputChangeHandler} value={row.role} />
            </td>
        </>
    )
}


export default EditableRow;