import { Button, InputNumber, Select } from "antd";
import React, { ReactElement, useEffect, useState } from "react";
import INGREDIENT_UNITS from "~/constants/INGREDIENT_UNITS";
import { Ingredient, Option } from "@nouryjanse/recipe-types";
import Creatable from "react-select/creatable";
import { SaveOutlined } from "@ant-design/icons";
import { TypeShoppingItem } from "~/services/types.db";
import { Grid, Tag } from "antd";
const { useBreakpoint } = Grid;

type AddIngredientProps = {
  ingredientOptions: Option[];
  ingredients: Ingredient[];
  list: any;
  onAdd: (items: TypeShoppingItem[]) => void;
};

const AddIngredient: React.FC<AddIngredientProps> = ({ ingredientOptions, ingredients, list, onAdd }): ReactElement => {
  const [amount, setAmount] = useState<number | null>(null);
  const [ingredientOption, setIngredientOption] = useState<Option | null>(null);
  const [unit, setUnit] = useState<string | null>(INGREDIENT_UNITS[0].value);
  const shoppingItems = ingredients.map((i) => {
    return { ...i, checked: false };
  });
  const screens = useBreakpoint();

  const onChange = (): void => {
    const option = ingredientOption;
    if (option) {
      const ingredient: TypeShoppingItem | undefined = shoppingItems.find((i: Ingredient) => i.id === option.id);
      if (ingredient && ingredient.id) {
        const ingredientAlreadyExists: TypeShoppingItem | undefined = list.find((l: any) => l.id === ingredient.id);

        let updatedList: TypeShoppingItem[] = [];
        if (ingredientAlreadyExists) {
          updatedList = list.map((u: Ingredient) => {
            return u.id === ingredient.id
              ? {
                  ...ingredient,
                  amount,
                  unit,
                  updatedAt: Date.now(),
                  checked: false,
                }
              : u;
          });
        } else {
          updatedList = [...list, { ...ingredient, amount, unit, updatedAt: Date.now() }];
        }

        onAdd(updatedList);
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-between mb-4 px-4 md:px-0 md:justify-center">
      <div className="flex flex-col" style={{ width: `${screens.lg ? "400px" : "280px"}` }}>
        <label className="text-start">Ingredient</label>
        <Creatable
          options={ingredientOptions}
          value={ingredientOption}
          onChange={(ingredient) => {
            setIngredientOption(ingredient);
          }}
          placeholder="Pick your ingredients"
          className="mr-4 md:mr-6 lg:mr-8"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-start">Amount</label>
        <InputNumber
          value={amount}
          defaultValue={0}
          min={0}
          onChange={(amount) => {
            if (amount) {
              setAmount(amount);
            }
          }}
          size="middle"
          style={{ width: "64px" }}
          className="mr-4 md:mr-6 lg:mr-8"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-start">Unit</label>
        <Select
          options={INGREDIENT_UNITS}
          value={unit}
          style={{ width: 80 }}
          className="mr-4 md:mr-6 lg:mr-8"
          onChange={(newUnit: string) => {
            setUnit(newUnit);
          }}
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
