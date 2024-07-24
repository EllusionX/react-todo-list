import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddListItem = ({ isParentList, handleAddListItem }) => {
	const [newItem, setNewItem] = useState("");
	let placeHolderText;

	if (isParentList) {
		placeHolderText = "add new list";
	} else {
		placeHolderText = "add item to list";
	}

	return (
		<>
			<input
				className="cursor-pointer grow min-w-32 pl-2 pr-2 placeholder:italic placeholder:text-slate-400 focus:outline-none"
				id="input-field-item"
				type="text"
				autoFocus
				placeholder={placeHolderText}
				value={newItem}
				onChange={(e) => {
					setNewItem(e.target.value);
				}}
			/>
			<button
				onClick={() => {
					handleAddListItem(isParentList, newItem);
					setNewItem("");
				}}
			>
				<FaPlus />
			</button>
		</>
	);
};

export default AddListItem;
