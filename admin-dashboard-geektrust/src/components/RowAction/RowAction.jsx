// import './RowAction.css';
import '../Styles.css';
import Button from '../Buttons/Button';

function RowActions({ buttonIcon, clickHandler, className, type, rowIndex, row }) {
    const svgButtonIcon = <><img src={buttonIcon}></img></>;
    return (

        <>
            <div>
                <Button
                    label={svgButtonIcon}
                    clickHandler={clickHandler}
                    className={className}
                    actionType={type}
                    rowId={row.id}
                    rowIndex={rowIndex}
                    row={row} />
            </div>
        </>
    )
}

export default RowActions;