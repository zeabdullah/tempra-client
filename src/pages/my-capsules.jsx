import { useEffect, useRef, useState } from "react";
import Input from "../components/shared/input";
import { api } from "../api/api";
import { AxiosError, CanceledError } from "axios";
import { sleep } from "../lib/sleep";
import useDebounce from "../lib/hooks/use-debounce";
import Auth from "../lib/auth";
import MyTimeCapsuleCard from "../components/my-time-capsule-card";
import LoadingSkeleton from "../components/time-capsule-card/loading-skeleton";

export default function PublicFeedPage() {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search);

    const dateFmtRef = useRef(
        new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }),
    );

    const { format: formatDate } = dateFmtRef.current;

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchMyCapsules() {
            setIsLoading(true);
            try {
                await sleep(500); // a fake delay...
                const response = await api.get("/my_time_capsules", {
                    headers: { Authorization: `Bearer ${Auth.getToken()}` },
                    params: { title: debouncedSearch, page: 1 },
                    signal: abortController.signal,
                });
                setData(response.data);
            } catch (err) {
                if (
                    err instanceof AxiosError &&
                    !(err instanceof CanceledError)
                ) {
                    setError(err.response.data.message);
                    console.warn(err.response.data.message);
                }
            }
            setIsLoading(false);
        }
        fetchMyCapsules();

        return () => abortController.abort("cleanup");
    }, [debouncedSearch]);

    return (
        <main className="my-16 container">
            <h1 className="fs-h1">My Capsules</h1>

            <section className="my-8">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Input
                        type="search"
                        id="search"
                        name="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search your capsules..."
                    />
                </div>

                {data.total > 0 && (
                    <p>
                        Found <strong>{data.total}</strong> results ⚡
                    </p>
                )}
            </section>

            <div className="my-8">
                <p className="fs-label-text">Sort by:</p>
                <label>
                    Reveal Date
                    <input
                        type="radio"
                        name="view_as"
                        id="view_as--reveal_date"
                        value="map"
                    />
                </label>
                <label>
                    Tag
                    <input
                        type="radio"
                        name="view_as"
                        id="view_as--tag"
                        value="grid"
                    />
                </label>
                <label>
                    Favorites
                    <input
                        type="radio"
                        name="view_as"
                        id="view_as--favorites"
                        value="grid"
                    />
                </label>
            </div>

            <section
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(16.5rem, 1fr))",
                    columnGap: 16,
                    rowGap: 40,
                }}
            >
                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div
                        className="fs-h3 text-danger-700"
                        style={{ gridColumn: "1 / -1" }}
                    >
                        <p>Whoops! Something went wrong.</p>
                        <pre>{error}</pre>
                    </div>
                ) : data?.payload?.items.length === 0 ? (
                    <p className="fs-h3">No capsules to show...</p>
                ) : (
                    data?.payload?.items.map(item => (
                        <MyTimeCapsuleCard
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            previewText={item.content_text}
                            visibility={item.visibility}
                            location={item.location}
                            date={formatDate(new Date(item.reveal_date))}
                            color={item.color}
                        />
                    ))
                )}
            </section>
        </main>
    );
}
