/* eslint-disable react/prop-types */
import './DataTable.css'
function DataTable({ tableHeaders, data }) {
    return (

        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            <input type='checkbox'></input>
                        </th>
                        {tableHeaders.map((header) => {
                            return <th key={header}>{header}</th>;
                        })}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row) => {
                        return (
                            <tr key={row.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.role}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}


export default DataTable;