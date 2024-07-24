import { useState } from "react";
import DisplayList from "./components/DisplayList";
import { FaChevronLeft } from "react-icons/fa";

export default function App() {
	//useStates
	const [selectedListName, setSelectedListName] = useState();
	const [parentListStyle, setParentListStyle] = useState("m-10");
	const [childListStyle, setChildListStyle] = useState("hidden");

	const [list, setList] = useState([
		{
			id: 1,
			listName: "Video Games",
			itemList: [
				{
					itemId: 1,
					item: "Mortal Kombat",
					done: false,
				},
				{
					itemId: 2,
					item: "Fallout 76",
					done: false,
				},
			],
			counter: 2,
		},
		{
			id: 2,
			listName: "Books",
			itemList: [
				{
					itemId: 1,
					item: "Make It Stick",
					done: false,
				},
				{
					itemId: 2,
					item: "Atomic Habits",
					done: false,
				},
				{
					itemId: 3,
					item: "Why be A Leader",
					done: false,
				},
			],
			counter: 3,
		},
		{
			id: 3,
			listName: "Stationary",
			itemList: [],
			counter: 0,
		},
	]);

	// functions
	const handleHiddenSection = (isHiddenActive) => {
		if (isHiddenActive) {
			setParentListStyle("m-10");
			setChildListStyle("hidden");
		} else {
			setParentListStyle("hidden");
			setChildListStyle("m-10");
		}
	};

	const checkDuplicateParentList = (listName) => {
		const isDuplicate = list.find(
			(l) => l.listName.toUpperCase() === listName.toUpperCase()
		);

		if (isDuplicate != undefined) {
			alert("A list with the same name exists");
		} else {
			return false;
		}

		return true;
	};

	const handleAddListItem = (isParentList, newItem) => {
		let newList;
		let trimNewItem = newItem.trim();

		if (isParentList) {
			// check input field is empty
			if (trimNewItem === "") {
				alert("Empty input field");
			} else {
				// check if a list with the same input field exist
				const isDuplicate = checkDuplicateParentList(trimNewItem);

				if (!isDuplicate) {
					let newID = list[list.length - 1].id;

					// create a new constructor for a new empty list
					const newConstructor = {
						id: (newID += 1),
						listName: newItem,
						itemList: [],
						counter: 0,
					};

					setList([...list, newConstructor]);
				}
			}
		} else {
			if (trimNewItem === "") {
				alert("Empty input field");
			} else {
				newList = list.map((l) => {
					if (l.listName === selectedListName) {
						return {
							...l,
							counter: (l.counter += 1),
							itemList: [
								...l.itemList,
								{
									itemId: l.counter,
									item: trimNewItem,
									done: false,
								},
							],
						};
					} else {
						return { ...l };
					}
				});
				setList(newList);
			}
		}
	};

	const handleEditItem = (isParentList, listInfo) => {
		// Update List
		if (isParentList) {
			// check input field is empty
			if (listInfo.listName === "") {
				alert("Empty input field");
			} else {
				// check if a list with the same input field exist
				const isDuplicate = checkDuplicateParentList(listInfo.listName);

				if (!isDuplicate) {
					const newList = list.map((l) => {
						if (l.id === listInfo.id) {
							return { ...l, listName: listInfo.listName };
						} else {
							return { ...l };
						}
					});
					setList(newList);
				}
			}
		} else {
			console.log(listInfo);
			if (listInfo.item === "") {
				alert("Empty input field");
			} else {
				const newSubList = list
					.filter((l) => l.listName === listInfo.selectedListName)
					.map((l) => {
						let updateSub = l.itemList.map((i) => {
							if (i.itemId === listInfo.itemId) {
								return { ...i, item: listInfo.item };
							} else {
								return { ...i };
							}
						});
						return updateSub;
					});

				updateSubList(newSubList, listInfo.selectedListName);
			}
		}
	};

	const handleCheckedItem = (parentList, checkItem) => {
		console.log("ran");

		// Get and update sub item as checked
		let newSubList = list
			.filter((l) => l.listName === parentList)
			.map((l) => {
				let updateSub = l.itemList.map((i) => {
					if (i.itemId === checkItem.itemId) {
						return { ...i, done: checkItem.done };
					} else {
						return { ...i };
					}
				});
				return updateSub;
			});

		updateSubList(newSubList, parentList);
	};

	const handleDeleteItem = (isParentList, deleteItemInfo) => {
		if (isParentList) {
			console.log(deleteItemInfo);
			const newList = list.filter((l) => l.id != deleteItemInfo.id);
			setSelectedListName(undefined);
			setList(newList);
		} else {
			// Get and delete item in subList
			let newSubList = list
				.filter((l) => l.listName === deleteItemInfo.selectedListName)
				.map((l) => {
					let updateSub = l.itemList.filter(
						(i) => i.itemId !== deleteItemInfo.itemId
					);
					return updateSub;
				});

			updateSubList(newSubList, deleteItemInfo.selectedListName);
		}
	};

	const updateSubList = (newSubList, parentList) => {
		// Shallow copy List and update the selected List's subList.
		let updateList = list.map((l) => {
			if (l.listName === parentList) {
				return {
					...l,
					itemList: newSubList[0],
				};
			} else {
				return {
					...l,
				};
			}
		});

		setList(updateList);
	};

	return (
		<>
			<main className="max-w-md mx-auto">
				<section id="parent-list" className={parentListStyle}>
					<h1 className="text-3xl">List</h1>
					<DisplayList
						isParentList={true}
						handleHiddenSection={handleHiddenSection}
						list={list}
						handleEditItem={handleEditItem}
						handleDeleteItem={handleDeleteItem}
						setSelectedListName={setSelectedListName}
						handleAddListItem={handleAddListItem}
					/>
				</section>
				<section id="child-list" className={childListStyle}>
					<div className="border-b-2 mb-3">
						<button
							className="mb-2 text-xl flex items-center cursor-pointer"
							onClick={() => handleHiddenSection(true)}
						>
							<FaChevronLeft />
							<span className="ml-1">Lists</span>
						</button>
					</div>
					<h1 className="text-3xl">{selectedListName}</h1>
					<div className="sub-todo">
						{selectedListName != undefined && (
							<DisplayList
								isParentList={false}
								selectedListName={selectedListName}
								list={list}
								handleEditItem={handleEditItem}
								handleDeleteItem={handleDeleteItem}
								handleCheckedItem={handleCheckedItem}
								handleAddListItem={handleAddListItem}
							/>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
