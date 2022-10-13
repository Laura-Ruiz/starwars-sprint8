import "../styles/starships.css";

export default function Starships(props) {
    function handleClick() {
        props.setNumPag((preValue) => preValue + 1);
    }

    return (
        <div className="container-ships">
            {props.starShips.map((starShip, index) => {
                const last = starShip.url.split("/");
                const id = last[last.length - 2];

                return (
                    <div id="container-linkShip" key={`starShip-${index}`}>
                        <a href={`starships/${id}`}>
                            {" "}
                            <div className="ships">
                                <p className="name-ship">{starShip.name}</p>
                                <p>{starShip.model}</p>
                            </div>
                        </a>
                    </div>)
            })}
            {props.loading === false && (
                <div id="container-btn">
                    <button onClick={handleClick}>View more</button>
                </div>
            )}
        </div>
    );
}
