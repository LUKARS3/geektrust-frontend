// import './EditableRow.css'
import '../Styles.css';

function EditableRow({ rowInputChangeHandler, row }) {
    return (
        <div class="edit-container">
            <td>
                <input type="text" name="name" onChange={rowInputChangeHandler} value={row.name} />
            </td>
            <td>
                <input type="text" name="email" onChange={rowInputChangeHandler} value={row.email} />
            </td>
            <td>
                <input type="text" name="role" onChange={rowInputChangeHandler} value={row.role} />
            </td>
        </div>
    )
}


export default EditableRow;