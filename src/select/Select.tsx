import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import "./select.sass";
import Option from "./Option";
import { Camera, ChevronDown, Icon } from "lucide-react";

interface ISelectProps {
	selectOptions: { keyword: string; value: string; Icon?: typeof Icon }[];
}

function Select({ selectOptions }: Readonly<ISelectProps>) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const selectorRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const chevronRef = useRef<HTMLDivElement>(null);
	const [list, setList] = useState(selectOptions);
	const [activeVal, setActiveVal] = useState("");

	const handleFocus = () => {
		wrapRef!.current!.classList.add("show");
		chevronRef.current?.classList.add("rotate");
	};

	const handleClickOutSide = (e: MouseEvent) => {
		if (
			selectorRef.current &&
			!selectorRef.current?.contains(e.target as Node)
		) {
			wrapRef.current?.classList.remove("show");
			chevronRef.current?.classList.remove("rotate");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutSide);
		return () => document.removeEventListener("mousedown", handleClickOutSide);
	}, []);

	const onclick = (value: string) => {
		inputRef.current!.value = value;
		setActiveVal(value);
		wrapRef.current?.classList.remove("show");
		chevronRef.current?.classList.remove("rotate");
		if (!list.find((itm) => itm.value.includes(value))) {
			setList((pre) => [...pre, { keyword: value, value }]);
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setActiveVal(e.target.value);
		if (!wrapRef.current?.classList.contains("show")) {
			wrapRef.current?.classList.add("show");
		}
	};

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key == "Enter") {
			onclick(activeVal);
		}
	};

	const onCreate = () => {
		onclick(activeVal);
	};

	return (
		<div className='selector' ref={selectorRef}>
			<div className='selector-input'>
				<input
					onFocus={handleFocus}
					className='input'
					ref={inputRef}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
				<div className='' ref={chevronRef}>
					<ChevronDown />
				</div>
			</div>

			<div className='wrap' ref={wrapRef}>
				{list
					.filter((itm) => itm.value.includes(activeVal))
					.map((itm, i) => (
						<Option
							key={i.toString()}
							value={itm.value.toString()}
							onclick={onclick}
							keyword={itm.keyword.toString()}
							activeVal={activeVal}
							Icon={itm.Icon}
						/>
					))}
				{activeVal.length > 2 &&
					!list.find((itm) => itm.value == activeVal) && (
						<div onClick={onCreate} className='option selected'>
							Create New "{activeVal}"
						</div>
					)}
			</div>
		</div>
	);
}

export default Select;
