// eslint-disable-next-line react/prop-types

// import './PageHeader.css';

function PageHeader({ pageTitle }) {
    return (
        <>
            <section className="header-styles">
                <h2>{pageTitle}</h2>
            </section>
        </>
    );
}

export default PageHeader;