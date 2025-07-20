import "./styles.css";

export default function AuthLayout({ title, children }) {
    return (
        <div className="auth-layout">
            <main className="auth-layout__main">
                <div className="main-container text-center">
                    <hgroup className="main-container__hgroup mx-auto">
                        <img
                            src="/tempra-logo-blue.svg"
                            alt="Tempra logo"
                            height={42}
                            className="main-container__logo"
                        />
                        <h1 className="fs-h2">{title}</h1>
                    </hgroup>
                    {children}
                </div>
            </main>

            <div className="cover-img">
                <img
                    src="/auth-cover-1.png"
                    alt=""
                    className="cover-img__img"
                />
            </div>
        </div>
    );
}
