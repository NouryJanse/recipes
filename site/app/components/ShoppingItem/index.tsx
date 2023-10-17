import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, InputNumber } from "antd";
import React, { ReactElement, useState } from "react";

type ShoppingItemProps = {
  shoppingItem: any;
};

const ShoppingItem: React.FC<ShoppingItemProps> = ({ shoppingItem }): ReactElement => {
  const [clickedState, setClickedState] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(shoppingItem.amount);

  return (
    <div className="flex justify-between">
      <div onClick={() => setClickedState(!clickedState)}>
        <Checkbox className="mr-2" checked={clickedState} onChange={() => setClickedState(!clickedState)} />

        {shoppingItem.name}
      </div>

      <div className="flex flex-row justify-end">
        <InputNumber
          value={amount}
          onChange={(value: number | null) => {
            if (value) {
              setAmount(value);
            }
          }}
          size="middle"
          style={{ width: "64px" }}
          className="mr-1"
        />

        <span className="flex mr-4">{shoppingItem.unit}</span>

        <Button icon={<DeleteOutlined />} onClick={() => console.log(shoppingItem.id)} />
      </div>
    </div>
  );
};

export default ShoppingItem;
