import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = ({ songs }) => {
    return (
        <section id="catalog-page">
            <h1>All Songs</h1>

            {songs.length > 0
                ? songs.map(x => <CatalogItem key={x._id} song={x} />)
                : <h3 className="no-articles">No songs yet</h3>
            }
        </section>
    );
};

export default Catalog;
