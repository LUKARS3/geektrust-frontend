import './SearchBar.css'

function SearchBar({ searchHandler, placeHolder }){
    return(
        <input
            className="search-bar-styles" 
            type="search"
            placeholder={placeHolder}
            onKeyUp={searchHandler}>
        </input>
    )
}


export default SearchBar;