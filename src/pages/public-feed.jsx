import { useEffect, useRef, useState } from "react";
import Input from "../components/shared/input";
import TimeCapsuleCard from "../components/time-capsule-card";
import { api } from "../api/api";
import { AxiosError, CanceledError } from "axios";
import { sleep } from "../lib/sleep";
import useDebounce from "../lib/hooks/use-debounce";

const cache = {};

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

        async function fetchCapsules() {
            setIsLoading(true);
            try {
                let response;
                if (cache[debouncedSearch]) {
                    response = cache[debouncedSearch];
                } else {
                    await sleep(500);
                    response = await api.get("/time_capsules", {
                        params: { title: debouncedSearch, page: 1 },
                        signal: abortController.signal,
                    });
                }

                if (!cache[debouncedSearch]) {
                    cache[debouncedSearch] = response;
                }

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
        fetchCapsules();

        return () => {
            abortController.abort("cleanup");
        };
    }, [debouncedSearch]);

    return (
        <main className="my-16 container">
            <h1 className="fs-h1">Public Feed</h1>

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
                        placeholder="Search public feed..."
                    />
                </div>
                {data.total > 0 && (
                    <p>
                        Found <strong>{data.total}</strong> results ⚡
                    </p>
                )}
            </section>

            <div className="my-8">
                <div>
                    <p className="fs-label-text">View as:</p>
                    <label>
                        Map
                        <input
                            type="radio"
                            name="view_as"
                            id="view_as--map"
                            value="map"
                        />
                    </label>
                    <label>
                        Grid
                        <input
                            type="radio"
                            name="view_as"
                            id="view_as--grid"
                            value="grid"
                        />
                    </label>
                </div>
            </div>

            <section
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(16.5rem, 1fr))",
                    columnGap: 24,
                    rowGap: 40,
                }}
            >
                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <div className="fs-h3 text-danger-700">
                        <p>Whoops! Something went wrong.</p>
                        <pre>{error}</pre>
                    </div>
                ) : data?.payload?.items.length === 0 ? (
                    <p className="fs-h3">No capsules to show...</p>
                ) : (
                    data?.payload?.items.map(item => (
                        <TimeCapsuleCard
                            id={item.id}
                            key={item.id}
                            title={item.title}
                            previewText={item.content_text}
                            location={item.location}
                            date={formatDate(new Date(item.reveal_date))}
                            color={item.color}
                            user={{
                                id: 123,
                                name: "Jack Mo",
                                avatar_url: "https://i.pravatar.cc/150?u=95",
                            }}
                        />
                    ))
                )}
            </section>
        </main>
    );
}

// function RadioGroup() {
//     return null;
// }

function LoadingSkeleton() {
    return Array.from({ length: 11 }).map((_, idx) => (
        <div
            key={idx}
            style={{
                borderRadius: 16,
                backgroundColor: "var(--color-gray-100)",
                height: "22.5rem",
                animation: "pulse 2.5s infinite ease-in-out",
            }}
        />
    ));
}
