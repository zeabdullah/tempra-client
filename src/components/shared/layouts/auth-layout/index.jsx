import "./styles.css";

export default function AuthLayout({ title, children }) {
    return (
        <div className="auth-layout">
            <main className="auth-layout__main">
                <div className="auth-layout__outlet text-center">
                    <Outlet />
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
