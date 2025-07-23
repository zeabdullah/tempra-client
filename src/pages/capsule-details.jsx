import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api/api";
import { AxiosError, CanceledError } from "axios";
import HeartIcon from "../icons/heart";
import MapPinSimpleIcon from "../icons/map-pin-simple";
import CalendarDotsIcon from "../icons/calendar-dots";
import ChatCenteredDotsIcon from "../icons/chat-centered-dots";
import ShareFatIcon from "../icons/share-fat";
import UserAvatar from "../components/shared/user-avatar";

const { format: formatDate } = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
});

export default function CapsuleDetailsPage() {
    let { id: capsuleId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        (async function () {
            setIsLoading(true);
            try {
                const response = await api.get(`/time_capsules/${capsuleId}`, {
                    signal: abortController.signal,
                });
                setData(response.data);
                console.log(response.data);
            } catch (err) {
                if (
                    err instanceof AxiosError &&
                    !(err instanceof CanceledError)
                ) {
                    setError(err.response.data.message);
                    console.warn(err.response.data.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();

        return () => {
            abortController.abort();
        };
    }, [capsuleId]);

    let content;
    if (isLoading) {
        content = <p className="fs-h3">Loading capsule...</p>;
    } else if (error) {
        content = (
            <div className="fs-h3 text-danger-700">
                <p>Whoops! Something went wrong.</p>
                <pre>{error}</pre>
            </div>
        );
    } else if (!data) {
        content = null;
    } else {
        const { payload: capsule } = data;
        content = (
            <>
                <section className="mb-16 max-w-prose">
                    <div className="breadcrumbs mb-8">
                        <Link to="/">Home</Link> <span>/</span>{" "}
                        <span>{capsule.title}</span>
                    </div>
                    <header>
                        <hgroup className="mb-8">
                            <h1 className="mb-3 fs-h1">{capsule.title}</h1>
                            <div className="mb-3 d-flex align-items-center gap-6 text-gray-500 fs-caption">
                                <span className="d-flex align-items-center gap-x-1">
                                    <MapPinSimpleIcon />
                                    {capsule.location}
                                </span>
                                <span className="d-flex align-items-center gap-x-1">
                                    <CalendarDotsIcon />
                                    {formatDate(new Date(capsule.reveal_date))}
                                </span>
                            </div>
                            <Link className="d-flex align-items-center gap-x-3">
                                <UserAvatar
                                    size="sm"
                                    src={capsule.user.avatar_url}
                                />
                                <span className="fs-button">
                                    {capsule.user.first_name}{" "}
                                    {capsule.user.last_name}
                                </span>
                            </Link>
                        </hgroup>

                        {capsule.content_text && (
                            <article className="d-grid gap-y-4">
                                {capsule.content_text}
                            </article>
                        )}

                        <div className="mt-8">
                            <p className="fs-caption mb-2">104 favorites</p>
                            <div className="d-flex align-items-center gap-x-6">
                                <button className="fs-button d-inline-flex align-items-center gap-1 text-danger-700">
                                    <HeartIcon width={24} height={24} />
                                    Favorite
                                </button>
                                <button className="fs-button d-inline-flex align-items-center gap-1 text-gray-700">
                                    <ChatCenteredDotsIcon
                                        width={24}
                                        height={24}
                                    />
                                    Comment
                                </button>
                                <button className="fs-button d-inline-flex align-items-center gap-1 text-gray-700">
                                    <ShareFatIcon width={24} height={24} />
                                    Share
                                </button>
                            </div>
                        </div>
                    </header>
                </section>
                <section className="mb-16 max-w-prose">
                    <hgroup className="mb-8">
                        <h2 className="fs-h2 mb-2">Comments</h2>
                        <p className="fs-caption">8 comments posted</p>
                    </hgroup>
                    <div className="comments d-flex flex-col gap-y-8">
                        <Comment
                            user={{
                                id: 1,
                                first_name: "Mona",
                                last_name: "Jardali",
                                avatar_url: "https://i.pravatar.cc/150?u=2494",
                            }}
                            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, dicta."
                        />
                        <Comment
                            user={{
                                id: 1,
                                first_name: "Joe",
                                last_name: "Yamani",
                                avatar_url: "https://i.pravatar.cc/150?u=92",
                            }}
                            content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid sapiente, impedit eum quia beatae debitis culpa sunt non inventore excepturi sed, perspiciatis nostrum quas quam."
                        />
                    </div>
                </section>
                <section>
                    <h2 className="fs-h2">Similar Time Capsules</h2>
                    <div></div>
                </section>
            </>
        );
    }

    return <main className="container my-16">{content}</main>;
}

function Comment({ user, content }) {
    const { id, first_name, last_name, avatar_url } = user;
    return (
        <div className="d-flex align-items-start gap-x-4">
            <UserAvatar size="md" src={avatar_url} />
            <div>
                <p className="fs-body-bold mb-3">
                    <Link to={`/user/${id}`}>
                        {first_name} {last_name}
                    </Link>
                </p>
                <p>{content}</p>
            </div>
        </div>
    );
}
