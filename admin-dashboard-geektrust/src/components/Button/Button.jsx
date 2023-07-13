import './Button.css'

function Button({ label, clickHandler }) {
    return (
        <>
            <button
                className="button-styles"
                onClick={clickHandler}
            >
                {label}
            </button>
        </>
    )
}


export default Button;