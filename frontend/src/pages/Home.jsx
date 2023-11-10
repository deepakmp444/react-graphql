import Cards from "../component/Cards"

function Home() {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-4">
                    <Cards />
                </div>
                <div className="col-sm-4">
                    <Cards />
                </div>
                <div className="col-sm-4">
                    <Cards />
                </div>
            </div>
        </div>
    )
}

export default Home