import HomeButton from "../Components/HomeButton";

const NotFound = () => {
    return (
        <div className="card card-bg-color rounded-4 text-white mt-5">
            <div className="card-body">
            <h1>Error 404 - Page not found.</h1>
            <HomeButton />
            </div>
    </div>
    )
};

export default NotFound;