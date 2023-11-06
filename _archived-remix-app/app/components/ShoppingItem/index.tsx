import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, InputNumber } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import { TypeShoppingItem } from "~/services/types.db";

type ShoppingItemProps = {
  shoppingItem: TypeShoppingItem;
  onDelete: (itemId: number) => void;
  onUpdate: (shoppingItem: TypeShoppingItem) => void;
};

// use memo required?
const isNew = (updatedAt: string): boolean => {
  return Math.abs(new Date(updatedAt).getTime() - Date.now()) < 1000;
};

const ShoppingItem: React.FC<ShoppingItemProps> = ({ shoppingItem, onDelete, onUpdate }): ReactElement => {
  const [localShoppingItem, setLocalShoppingItem] = useState<TypeShoppingItem>(shoppingItem);

  const onCheck = () => {
    const updatedItem = {
      ...localShoppingItem,
      checked: !localShoppingItem.checked,
      updatedAt: `${new Date().toISOString()}`,
    };
    setLocalShoppingItem(updatedItem);
    onUpdate(updatedItem);
  };

  useEffect(() => {
    setLocalShoppingItem({ ...shoppingItem });
  }, [shoppingItem]);

  return (
    <div className={`${isNew(localShoppingItem.updatedAt) ? "highlight" : ""} flex justify-between rounded p-1`}>
      <div onClick={onCheck}>
        <Checkbox className="mr-2" checked={localShoppingItem.checked} onChange={onCheck} />
        <span className="text-xs sm:text-sm md:text-md">{shoppingItem.name}</span>
      </div>

      <div className="flex flex-row justify-end">
        <InputNumber
          value={localShoppingItem.amount}
          onChange={(amount: number | null) => {
            if (amount) {
              setLocalShoppingItem({ ...localShoppingItem, amount });
              onUpdate({ ...localShoppingItem, amount, updatedAt: `${new Date().toISOString()}` });
            }
          }}
          size="middle"
          style={{ width: "64px" }}
          className="mr-1"
        />

        <span className="flex mr-4">{localShoppingItem?.unit}</span>

        <Button icon={<DeleteOutlined />} onClick={() => onDelete(shoppingItem.id)} />
      </div>
    </div>
  );
};

export default ShoppingItem;