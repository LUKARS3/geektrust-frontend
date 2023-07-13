function Button({label, clickHandler}){
    return(
        <>
            <button onClick={clickHandler}>{label}</button>
        </>
    )
}


export default Button;