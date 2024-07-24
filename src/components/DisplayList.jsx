import AddListItem from "./AddListItem";
import { useState } from "react";
import { FaRegTrashAlt, FaRegEdit, FaCheck } from "react-icons/fa";

const DisplayList = ({
	isParentList,
	handleHiddenSection,
	selectedListName = "",
	list,
	handleEditItem,
	handleDeleteItem,
	handleCheckedItem,
	handleAddListItem,
	setSelectedListName,
}) => {
	return (
		<ul>
			{!isParentList
				? list
						.filter((item) => item.listName == selectedListName)
						.map((item) =>
							item.itemList.map((item) => (
								<li
									key={item.itemId}
									className="p-2 mt-3 flex flex-start bg-orange-100 rounded-md text-lg"
								>
									<Task
										isParentList={isParentList}
										selectedListName={selectedListName}
										list={item}
										isChecked={item.done}
										handleEditItem={handleEditItem}
										handleDeleteItem={handleDeleteItem}
										handleCheckedItem={handleCheckedItem}
									/>
								</li>
							))
						)
				: list.map((item) => (
						<li
							key={item.id}
							className="p-2 mt-3 flex items-center justify-between bg-orange-100 rounded-md text-lg"
						>
							<Task
								isParentList={isParentList}
								handleHiddenSection={handleHiddenSection}
								list={item}
								handleEditItem={handleEditItem}
								handleDeleteItem={handleDeleteItem}
								setSelectedListName={setSelectedListName}
							/>
						</li>
				  ))}

			<li className="p-2 mt-3 flex items-center justify-between border-solid border-2 rounded-md">
				<AddListItem
					isParentList={isParentList}
					handleAddListItem={handleAddListItem}
				/>
			</li>
		</ul>
	);
};

function Task({
	isParentList,
	handleHiddenSection,
	selectedListName,
	list,
	isChecked,
	handleEditItem,
	handleDeleteItem,
	handleCheckedItem,
	setSelectedListName,
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [newListName, setNewListName] = useState(list.listName);
	const [newItem, setNewItem] = useState(list.item);
	let listContent;

	if (isEditing) {
		if (isParentList) {
			listContent = (
				<>
					<input
						className="min-w-32 grow mr-2 pl-2 pr-2 rounded-sm"
						type="text"
						autoFocus
						value={newListName}
						onChange={(e) => {
							setNewListName(e.target.value);
						}}
					/>
					<button
						className="mr-3"
						onClick={() => {
							handleEditItem(isParentList, {
								...list,
								listName: newListName,
							}),
								setIsEditing(false);
							if (newListName === "") {
								setNewListName(list.listName);
							}
						}}
					>
						<FaCheck />
					</button>
				</>
			);
		} else {
			listContent = (
				<>
					{/* <input
						className="min-w-32 grow mr-2 pl-2 pr-2 rounded-sm "
						type="text"
						autoFocus
						value={list.item}
						onChange={(e) => {
							handleEditItem(isParentList, {
								selectedListName,
								...list,
								item: e.target.value,
							});
						}}
					/>
					<button className="mr-3" onClick={() => setIsEditing(false)}>
						<FaCheck />
					</button> */}

					<input
						className="min-w-32 grow mr-2 pl-2 pr-2 rounded-sm"
						type="text"
						autoFocus
						value={newItem}
						onChange={(e) => {
							setNewItem(e.target.value);
						}}
					/>
					<button
						className="mr-3"
						onClick={() => {
							handleEditItem(isParentList, {
								selectedListName,
								...list,
								item: newItem,
							}),
								setIsEditing(false);
							if (newItem === "") {
								setNewItem(list.item);
							}
						}}
					>
						<FaCheck />
					</button>
				</>
			);
		}
	} else if (!isParentList && list.done) {
		listContent = (
			<>
				<p className="ml-1 mr-2 grow max-w-full break-all line-through">
					{list.item}
				</p>
			</>
		);
	} else {
		if (isParentList) {
			listContent = (
				<>
					<p
						className="grow mr-2 max-w-full break-all cursor-pointer"
						onClick={() => {
							handleHiddenSection(false), setSelectedListName(list.listName);
						}}
					>
						{list.listName}
					</p>
					<button className="mr-3" onClick={() => setIsEditing(true)}>
						<FaRegEdit />
					</button>
				</>
			);
		} else {
			listContent = (
				<>
					<p className="ml-1 mr-2 grow max-w-full break-all">{list.item}</p>
					<button className="mr-3" onClick={() => setIsEditing(true)}>
						<FaRegEdit />
					</button>
				</>
			);
		}
	}

	return (
		<>
			{!isEditing && !isParentList && (
				<label>
					<input
						type="checkbox"
						checked={isChecked}
						onChange={(e) => {
							handleCheckedItem(selectedListName, {
								...list,
								done: e.target.checked,
							});
						}}
					/>
				</label>
			)}

			{listContent}
			<button
				onClick={() =>
					handleDeleteItem(isParentList, { selectedListName, ...list })
				}
			>
				<FaRegTrashAlt />
			</button>
		</>
	);
}

export default DisplayList;
