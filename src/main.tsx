import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./select/Select.tsx";
import {
	Camera,
	Check,
	CheckCheck,
	CheckCircle,
	ChevronDown,
} from "lucide-react";

const arrayDisplay = [
	{ keyword: "camera", Icon: Camera, value: "camera" },
	{ keyword: "chevronDown", Icon: ChevronDown, value: "chevronDown" },
	{ keyword: "check", Icon: Check, value: "check" },
	{ keyword: "checkCircle", Icon: CheckCircle, value: "checkCircle" },
	{ keyword: "checkCheck", Icon: CheckCheck, value: "checkCheck" },
];

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App selectOptions={arrayDisplay} />
	</StrictMode>
);
