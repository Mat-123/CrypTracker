import HomeButton from "../Components/HomeButton";

const NotFound = () => {
    return (
        <>
    <div className="col-2">

    </div>
    <div className="col-8">
        <div class="card card-bg-color rounded-4 text-white mt-5">
            <div class="card-body">
            <h1>Errore 404 - Risorsa non trovata</h1>
            <HomeButton />
            </div>
    </div>
    </div>
    </>
    )
};

export default NotFound;