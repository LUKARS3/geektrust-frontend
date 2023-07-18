/* eslint-disable react/prop-types */
import '../Styles.css';

function Button({ label, clickHandler, className, actionType, rowIndex, row }) {
    return (
        <>
            <button
                className={className}
                onClick={(event) => clickHandler(event, row)}
                data-actiontype={actionType}
                data-id={row?.id}
                data-index={rowIndex}
            >
                {label}
            </button>
        </>
    )
}


export default Button;