export default function HomePage() {
    const userData = JSON.parse(localStorage.getItem("tempra--user"));

    return (
        <>
            <h1 className="fs-h1">Hello, index page</h1>
            <h2 className="fs-h2">Hello, index page h2</h2>
            {userData && <p>You're signed in :)</p>}
        </>
    );
}
