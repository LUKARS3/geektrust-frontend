/* eslint-disable react/prop-types */
// import './Paginator.css';
import '../Styles.css';

function Paginator({ totalPages, clickHandler, currentPage }) {

    currentPage = Number(currentPage);
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1);
    }


    return (
        <>
            <ul>
                <li
                    data-id="first"
                    className={`${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={clickHandler}
                >
                    {'<<'}
                </li>
                <li data-id="prev"
                    className={`${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={clickHandler}
                >
                    {'<'}
                </li>
                {pages.map((page) => {
                    return (
                        <li key={page}
                            onClick={clickHandler}
                            data-id={page}
                            className={`${currentPage == page && "active"}`}
                        >
                            {page}
                        </li>
                    )
                })}
                <li
                    data-id="next"
                    onClick={clickHandler}
                    className={`${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    {'>'}
                </li>
                <li
                    data-id="last"
                    onClick={clickHandler}
                    className={`${currentPage === totalPages ? 'disabled' : ''}`}
                >
                    {'>>'}
                </li>
            </ul>
        </>
    );
}


export default Paginator;