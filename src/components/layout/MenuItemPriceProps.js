import {useState} from "react";
import ChevronDown from "../icons/ChevronDown";
import Plus from "../icons/Plus";
import Trash from "../icons/Trash";
import ChevronUp from "../icons/ChevronUp";

export default function MenuItemPriceProps({addLabel, name, props, setProps}) {
    const [isOpen, setIsOpen] = useState(false);

    function addProps() {
        setProps((oldProps) => {
            return [...oldProps, {name: "", price: 0}];
        });
    }

    function editProps(ev, index, prop) {
        const newValue = ev.target.value;
        setProps((prevSized) => {
            const newSizes = [...prevSized];
            newSizes[index][prop] = newValue;
            return newSizes;
        });
    }

    function removeProps(indexToRemove) {
        setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
    }

    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">
            <button onClick={() => setIsOpen((prev) => !prev)} className="inline-flex p-1 border-0 justify-start" type="button">
                {isOpen && <ChevronUp />}
                {!isOpen && <ChevronDown />}
                <span>{name}</span>
                <span>({props?.length})</span>
            </button>
            <div className={isOpen ? "block" : "hidden"}>
                {props?.length > 0 &&
                    props.map((size, index) => (
                        <>
                            <div className="flex items-end gap-2">
                                <div>
                                    <label>Name</label>
                                    <input type="text" placeholder="Size name" value={size.name} onChange={(ev) => editProps(ev, index, "name")} />
                                </div>
                                <div>
                                    <label>Extra price</label>
                                    <input type="text" placeholder="Extra price" value={size.price} onChange={(ev) => editProps(ev, index, "price")} />
                                </div>
                                <div>
                                    <button type="button" className="bg-white mb-4 px-2" onClick={() => removeProps(index)}>
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
                <button type="button" onClick={addProps} className="bg-white items-center">
                    <Plus className="w-5 h-5" />
                    <span>{addLabel}</span>
                </button>
            </div>
        </div>
    );
}
