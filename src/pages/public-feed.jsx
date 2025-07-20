import { useRef } from "react";
import Input from "../components/shared/input";
import TimeCapsuleCard from "../components/time-capsule-card";

export default function PublicFeedPage() {
    const dateFmtRef = useRef(
        new Intl.DateTimeFormat("en", {
            // dateStyle: "medium",
            dateStyle: "medium",
        }),
    );
    const { format: formatDate } = dateFmtRef.current;

    console.log(formatDate(new Date("2025-07-20 08:59:43")));

    return (
        <div className="my-16 container">
            <section>
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
                        placeholder="Search public feed..."
                    />
                </div>
                <p>
                    Found <strong>200</strong> results ⚡
                </p>
            </section>

            <div className="my-8">
                <div>
                    <p className="fs-caption">View as:</p>
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
                <TimeCapsuleCard
                    title="What a fun day yesterday"
                    previewText="The Levant never fails to amaze—between the crisp mountain air and the quiet hum of"
                    location="Al Chouf, Lebanon"
                    date="2 days ago"
                    user={{
                        id: 123,
                        name: "Jack Mo",
                        avatar_url: "https://i.pravatar.cc/150?u=95",
                    }}
                />
                <TimeCapsuleCard
                    title="What a fun day yesterday"
                    previewText="The Levant never fails to amaze—between the crisp mountain air and the quiet hum of"
                    location="Al Chouf, Lebanon"
                    date="2 days ago"
                    user={{
                        id: 123,
                        name: "Jack Mo",
                        avatar_url: "https://i.pravatar.cc/150?u=95",
                    }}
                />
                <TimeCapsuleCard
                    title="What a fun day yesterday"
                    previewText="The Levant never fails to amaze—between the crisp mountain air and the quiet hum of"
                    location="Al Chouf, Lebanon"
                    date="2 days ago"
                    user={{
                        id: 123,
                        name: "Jack Mo",
                        avatar_url: "https://i.pravatar.cc/150?u=95",
                    }}
                />
                <TimeCapsuleCard
                    title="What a fun day yesterday"
                    previewText="The Levant never fails to amaze—between the crisp mountain air and the quiet hum of"
                    location="Al Chouf, Lebanon"
                    date="2 days ago"
                    user={{
                        id: 123,
                        name: "Jack Mo",
                        avatar_url: "https://i.pravatar.cc/150?u=95",
                    }}
                />
                <TimeCapsuleCard
                    title="What a fun day yesterday"
                    previewText="The Levant never fails to amaze—between the crisp mountain air and the quiet hum of"
                    location="Al Chouf, Lebanon"
                    date="2 days ago"
                    user={{
                        id: 123,
                        name: "Jack Mo",
                        avatar_url: "https://i.pravatar.cc/150?u=95",
                    }}
                />
                <TimeCapsuleCard
                    title="What a fun day yesterday"
                    previewText="The Levant never fails to amaze—between the crisp mountain air and the quiet hum of"
                    location="Al Chouf, Lebanon"
                    date="2 days ago"
                    user={{
                        id: 123,
                        name: "Jack Mo",
                        avatar_url: "https://i.pravatar.cc/150?u=95",
                    }}
                />
                <TimeCapsuleCard
                    title="Sunset Over the Qadisha Valley"
                    previewText="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati provident sunt sequi soluta, assumenda nulla modi nam rerum corrupti ducimus est quia accusamus hic?"
                    location="Qadisha Valley, Lebanon"
                    date="1 hour ago"
                    user={{
                        id: 1323,
                        name: "Nour Hasan",
                        avatar_url: "https://i.pravatar.cc/150?u=111",
                    }}
                />
            </section>
        </div>
    );
}

// function RadioGroup() {
//     return null;
// }
