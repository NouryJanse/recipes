import React, { ReactElement } from "react";
import sortShoppingListOnDate from "~/helpers/sortShoppingListOnDate";
import { TypeShoppingItem } from "~/services/types.db";
import ShoppingItem from "../ShoppingItem";

type SidebarProps = {
  list: any;
  onDelete: (itemId: number) => void;
  onUpdate: (item: TypeShoppingItem) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ list, onDelete, onUpdate }): ReactElement => {
  return (
    <div className="sidebar max-h-screen min-h-screen md:py-5">
      {list && list.length > 0 && (
        <>
          <h2 className="flex m-4 font-medium">
            There {list.length === 1 ? `is ${list.length} item` : `are ${list.length} items`} in your list
          </h2>

          {sortShoppingListOnDate(list).map((i: TypeShoppingItem) => {
            return i.checked === false || i.checked === undefined ? (
              <ShoppingItem key={i.id} shoppingItem={i} onDelete={onDelete} onUpdate={onUpdate} />
            ) : null;
          })}

          {sortShoppingListOnDate(list).map((i: TypeShoppingItem) => {
            return i.checked === true ? (
              <ShoppingItem key={i.id} shoppingItem={i} onDelete={onDelete} onUpdate={onUpdate} />
            ) : null;
          })}
        </>
      )}
    </div>
  );
};

export default Sidebar;
