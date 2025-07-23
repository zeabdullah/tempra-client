import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import ColorSwatch from "../../components/color-swatch";
import TypeCardItem from "../../components/type-card-item";
import Button from "../../components/shared/button";
import { buttonVariants } from "../../components/shared/button/variants";
import Input from "../../components/shared/input";
import RadioItem from "../../components/shared/radio-item";
import ImagesSquareIcon from "../../icons/duotone/images-square";
import PenNibIcon from "../../icons/duotone/pen-nib";
import GlobeHemisphereWestIcon from "../../icons/globe-hemisphere-west";
import InfoIcon from "../../icons/info";
import LinkIcon from "../../icons/link";
import LockIcon from "../../icons/lock";
import Auth from "../../lib/auth";
import { toBase64 } from "../../lib/base64";
import "./styles.css";

const { format: formatDate } = new Intl.DateTimeFormat("UTC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
});

const COLORS = ["blue", "yellow", "magenta", "gray"];
const VISIBILITIES = [
    { icon: GlobeHemisphereWestIcon, value: "public", text: "Public" },
    { icon: LinkIcon, value: "unlisted", text: "Unlisted" },
    { icon: LockIcon, value: "private", text: "Private" },
];

export default function NewCapsulePage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const [contentImgFile, setContentImgFile] = useState(undefined);
    const [contentText, setContentText] = useState("");
    const [contentType, setContentType] = useState("text");
    const [visibility, setVisibility] = useState("public");
    const [color, setColor] = useState("blue");

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const isSurpriseMode =
            formData.get("is_surprise_mode") === "on" ? 1 : 0;

        let revealDatetime = new Date(
            `${formData.get("reveal_day")} ${formData.get("reveal_time")}`,
        );
        revealDatetime = formatDate(revealDatetime);

        if (contentType === "image" && contentImgFile) {
            formData.append("content_image", await toBase64(contentImgFile));
        }

        formData.set("content_type", contentType);
        formData.set("is_surprise_mode", isSurpriseMode);
        formData.set("color", color);
        formData.set("color", color);
        formData.set("visibility", visibility);
        formData.set("reveal_date", revealDatetime);

        formData.delete("reveal_day");
        formData.delete("reveal_time");

        console.log(Object.fromEntries(formData));
        try {
            setIsSubmitting(true);
            await api.post("/time_capsules", formData, {
                headers: { Authorization: `bearer ${Auth.getToken()}` },
            });
            navigate("/my-capsules");
        } catch (err) {
            console.warn(err instanceof AxiosError ? err.response.data : err);
            setError(err.response.data);
            scrollTo({ top: 0 });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="my-16 container" onSubmit={handleSubmit}>
            {error && (
                <p
                    id="error-msg"
                    className="alert-box border-danger-300 bg-danger-100 text-danger-900 rounded-lg p-3 mb-8"
                >
                    {error.message}
                </p>
            )}

            <input
                id="title"
                name="title"
                className="title-input fs-h1"
                placeholder="Title (optional)"
                autoFocus
            />
            <p className="my-8 text-gray-500">Choose the type of capsule:</p>

            <section className="main-content">
                <div className="d-flex flex-wrap gap-3 mb-3">
                    <TypeCardItem
                        icon={PenNibIcon}
                        text="Write something..."
                        onClick={() => setContentType("text")}
                        isSelected={contentType === "text"}
                    />
                    <TypeCardItem
                        icon={ImagesSquareIcon}
                        text="Upload a media file..."
                        onClick={() => setContentType("image")}
                        isSelected={contentType === "image"}
                    />

                    {contentType === "image" && (
                        <>
                            <Input
                                type="file"
                                className="input__field--file"
                                onChange={e =>
                                    setContentImgFile(e.target.files[0])
                                }
                                accept="image/png, image,jpeg, image/jpg"
                            />
                            <div className="d-flex align-items-center gap-1 text-gray-500">
                                <InfoIcon className="fs-body" />
                                <p className="fs-caption">
                                    Maximum upload size is 3 MB.
                                </p>
                            </div>
                        </>
                    )}

                    {contentType === "text" && (
                        <textarea
                            id="content_text"
                            name="content_text"
                            placeholder="Your content ... "
                            rows={8}
                            value={contentText}
                            onChange={e => setContentText(e.target.value)}
                            className="input__field content-textarea rounded-xl"
                        />
                    )}
                </div>
            </section>

            <section>
                <div className="my-8">
                    <div className="d-flex align-items-start gap-3 mb-4">
                        <Input
                            label="Reveal date*"
                            type="date"
                            id="reveal_day"
                            name="reveal_day"
                            defaultValue="2030-01-01"
                            required
                        />
                        <Input
                            label="Time"
                            type="time"
                            id="reveal_time"
                            name="reveal_time"
                            onChange={e => console.log(e.target.value)}
                            defaultValue={`${new Date().getHours()}:00`.padStart(
                                5,
                                "0",
                            )}
                        />
                    </div>
                    <Input
                        label="Tags"
                        type="text"
                        id="tags"
                        name="tags"
                        placeholder="Nature, breeze, adventure..."
                        className="tags"
                    />
                </div>

                <div className="my-8">
                    <div className="fs-label-text mb-4">Visibility</div>
                    <div
                        role="radiogroup"
                        className="visibility-group d-flex align-items-center gap-1 p-1.5 text-gray-700 bg-gray-100 rounded-lg"
                    >
                        {VISIBILITIES.map(v => (
                            <RadioItem
                                key={v.value}
                                icon={v.icon}
                                isSelected={visibility === v.value}
                                value={v.value}
                                text={v.text}
                                onClick={setVisibility}
                            />
                        ))}
                    </div>
                </div>

                <div className="my-8">
                    <div className="mb-1 fs-label-text">Color</div>
                    <div
                        role="radiogroup"
                        className="color-group p-1.5 text-gray-700 bg-gray-100 rounded-lg"
                    >
                        {COLORS.map(clr => (
                            <ColorSwatch
                                key={clr}
                                color={clr}
                                onClick={setColor}
                                isSelected={color === clr}
                            />
                        ))}
                    </div>
                </div>

                <div className="my-8">
                    <label className="d-inline-flex align-items-center justify-center fs-label-text">
                        <input
                            type="checkbox"
                            name="is_surprise_mode"
                            id="is_surprise_mode"
                            className="checkbox"
                        />
                        <span>Surprise mode</span>
                    </label>
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={buttonVariants.contained.primary}
                >
                    {isSubmitting ? "Creating..." : "Create Capsule"}
                </Button>
            </section>
        </form>
    );
}
