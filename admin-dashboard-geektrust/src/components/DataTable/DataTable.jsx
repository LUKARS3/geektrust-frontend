/* eslint-disable react/prop-types */
import './DataTable.css'
function DataTable({ tableHeaders, data }) {
    function getValues(row){
        return Object.values(row).slice(1);
    }
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
                                {getValues(row).map((field) => {
                                    return <td key={field}>{field}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}


export default DataTable;