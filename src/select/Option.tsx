import { Check, Icon } from "lucide-react";
import { useCallback } from "react";

interface IOption {
	onclick: (value: string) => void;
	keyword: string;
	value: string;
	activeVal: string;
	Icon?: typeof Icon;
}

export default function Option({
	onclick,
	keyword,
	value,
	activeVal,
	Icon,
}: Readonly<IOption>) {
	const handleClick = useCallback(() => onclick(value), [value]);

	return (
		<>
			<div
				className={`option ${keyword == activeVal && "selected"}`}
				onClick={handleClick}
			>
				<div className='option-flex'>
					<div>{HighLightedText(keyword, activeVal)}</div>
					<div className='option-flex'>
						{Icon && (
							//  @ts-ignore
							<Icon size={20} />
						)}
					</div>
				</div>
				{keyword == activeVal && (
					<div>
						<Check />
					</div>
				)}
			</div>
		</>
	);
}

const HighLightedText = (text: string, activeVal: string) => {
	if (!activeVal) return <span>{text}</span>;

	const activeChars = activeVal.toLowerCase().split("");

	return text.split("").map((char, i) => {
		if (activeChars.length > 0 && char.toLowerCase() == activeChars[0]) {
			activeChars.shift();
			return (
				<span key={i} className='active'>
					{char}
				</span>
			);
		} else {
			return <span key={i}>{char}</span>;
		}
	});
};
