import { Sun } from "lucide-react";

export type Theme = "dark" | "light";

interface SettingsProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

export default function Settings({ theme, onThemeChange }: SettingsProps) {
    return (
        <div className="settings">
            <h3 className="settings-headind">Settings</h3>
            <div className="settings-row">
                <span>Theme</span>
                <div className="settings-toogle">
                    <button onClick={() => onThemeChange("dark")} className={`settings-toogle-btn ${theme === "dark" ? "settings-toogle-btn-active" : ""}`}>
                        <Sun size={14} /> Light
                    </button>
                </div>
            </div>
        </div>
    );
}