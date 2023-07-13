/* eslint-disable react/prop-types */
import './Paginator.css'


function Paginator({totalPages}){
    return (
        <>
            <ul>
                <li>prev</li>
                <li>first</li>
                {totalPages.map((page) => {
                    return <li key={page}>{page}</li>
                })}
                <li>last</li>
                <li>next</li>
            </ul>
        </>
    );
}


export default Paginator;