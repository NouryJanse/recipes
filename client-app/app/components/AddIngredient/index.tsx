import { Button, InputNumber, Select } from "antd";
import React, { ReactElement, useState } from "react";
import INGREDIENT_UNITS from "~/constants/INGREDIENT_UNITS";
import { Ingredient, Option } from "@nouryjanse/recipe-types";
import { ActionMeta } from "react-select";
import Creatable from "react-select/creatable";
import { SaveOutlined } from "@ant-design/icons";

type AddIngredientProps = {
  ingredientOptions: any;
  ingredients: any;
  list: any;
  setList: any;
  emitSocket: any;
};

const AddIngredient: React.FC<AddIngredientProps> = ({
  ingredientOptions,
  ingredients,
  list,
  setList,
  emitSocket,
}): ReactElement => {
  const [amount, setAmount] = useState<number | null>(null);
  const [unit, setUnit] = useState(INGREDIENT_UNITS[0]);
  const [ingredient, setIngredient] = useState<Option | null>(null);

  const updateList = (updatedList: Ingredient[]) => {
    setList(
      updatedList.sort((a, b) => {
        if (a.updatedAt < b.updatedAt) return 1;
        return -1;
      })
    );
  };

  const onChange = (): void => {
    const option = ingredient;

    if (option) {
      const ingredient: Ingredient | null = ingredients.find((i: Ingredient) => i.id === option.id);
      if (ingredient && ingredient.id) {
        const ingredientAlreadyExists: Ingredient | undefined = list.find((l: any) => l.id === ingredient.id);
        let updatedList: Ingredient[] = [];
        if (ingredientAlreadyExists) {
          updatedList = list.map((u: any) => {
            return u.id === ingredient.id
              ? {
                  ...u,
                  amount,
                  updatedAt: Date.now(),
                }
              : u;
          });
        } else {
          updatedList = [...list, { ...ingredient, amount: 1, updatedAt: Date.now() }];
        }
        updateList(updatedList);
        emitSocket("shoppingList", updatedList);
        localStorage.setItem("shoppingList", JSON.stringify(updatedList));
      }
    }
  };

  return (
    <div className="flex mb-8 items-center">
      <div className="flex flex-col">
        <label className="text-start">Amount</label>
        <InputNumber
          value={amount}
          defaultValue={0}
          onChange={(e) => setAmount(e)}
          size="middle"
          style={{ width: "64px" }}
          className="mr-4"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-start">Unit</label>
        <Select options={INGREDIENT_UNITS} value={unit} style={{ width: 80 }} className="mr-4" onChange={setUnit} />
      </div>

      <div className="flex flex-col">
        <label className="text-start">Ingredient</label>
        <Creatable
          options={ingredientOptions}
          value={ingredient}
          onChange={setIngredient}
          placeholder="Pick your ingredients"
          className="mr-4"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-start">.</label>
        <Button icon={<SaveOutlined />} onClick={onChange} />
      </div>
    </div>
  );
};

export default AddIngredient;
