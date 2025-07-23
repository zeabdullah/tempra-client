import { useNavigate } from "react-router-dom";
import UserAvatar from "../shared/user-avatar";
import ChevronDownIcon from "../../icons/chevron-down";
import "./styles.css";
import Auth from "../../lib/auth";
import useSession from "../../lib/hooks/use-session";
import { useCallback } from "react";

export default function UserAvatarDropdown() {
    const navigate = useNavigate();
    const { user } = useSession();

    const handleSelect = useCallback(
        e => {
            switch (e.target.value) {
                case "logout": {
                    Auth.logout();
                    navigate("/");
                    location.reload();
                    break;
                }
                case "settings": {
                    navigate("/settings");
                    break;
                }
                case "my-capsules": {
                    navigate("/my-capsules");
                    break;
                }
                case "new-capsule": {
                    navigate("/new-capsule");
                    break;
                }
            }
        },
        [navigate],
    );

    return (
        <div className="user-avatar-dropdown">
            <select
                className="user-avatar-dropdown__select"
                id="profile-dropdown"
                defaultValue=""
                onChange={handleSelect}
            >
                <option value="" disabled></option>
                <option value="settings">Account Settings</option>
                <option value="logout">Log out</option>
                <option value="new-capsule">New time capsule</option>
                <option value="my-capsules">My capsules</option>
            </select>

            <UserAvatar
                src={user.avatar_url ?? "https://i.pravatar.cc/150?u=32345"}
                alt={`${user.first_name}'s avatar`}
                size="md"
            />
            <ChevronDownIcon height={24} />
        </div>
    );
}
