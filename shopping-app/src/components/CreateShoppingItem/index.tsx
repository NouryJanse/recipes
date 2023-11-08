import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import INGREDIENT_UNITS from "../../constants/INGREDIENT_UNITS";
import type { TypeShoppingItem } from "../../services/types.db";
import { nanoid } from "nanoid";

type CreateShoppingItemProps = {
  list: TypeShoppingItem[];
  onAdd: (items: TypeShoppingItem[]) => void;
};

const CreateShoppingItem: FunctionalComponent<CreateShoppingItemProps> = ({ list, onAdd }) => {
  const [amount, setAmount] = useState<number>(0);
  const [ingredientName, setIngredientName] = useState<string>("Courgette");
  const [unit, setUnit] = useState<string>(INGREDIENT_UNITS[0].value);

  // const shoppingItems = ingredients.map((i) => {
  //   return { ...i, checked: false };
  // });
  // const screens = useBreakpoint();

  const onChange = (): void => {
    const newShoppingItem: TypeShoppingItem = {
      id: nanoid(),
      ingredientName,
      amount,
      unit,
      updatedAt: Date.now().toString(),
      checked: false,
    };
    onAdd([...list, newShoppingItem]);
  };

  return (
    <div className="flex flex-col md:flex-row w-full items-center justify-between mb-4 md:justify-center">
      <div className="flex flex-col">
        {/* <div className="flex flex-col" style={{ width: `${screens.xl ? "400px" : screens.lg ? "320px" : "280px"}` }}> */}
        <label className="text-start">
          Ingredient
          <input
            type="text"
            defaultValue={"Courgette"}
            onChange={(event: Event) => {
              const target = event.target as HTMLInputElement;
              if (target) {
                setIngredientName(target.value);
              }
            }}
          />
        </label>
        {/* <Creatable
          options={ingredientOptions}
          value={ingredientOption}
          onChange={(ingredient) => {
            setIngredientOption(ingredient);
          }}
          placeholder="Pick your ingredients"
          className="mr-4 lg:mr-6 xl:mr-8"
        /> */}
      </div>

      <div className="flex flex-col w-full">
        <label className="text-start">
          Amount
          <input
            value={amount}
            min={0}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              if (target) {
                setAmount(Number.parseInt(target.value));
              }
            }}
            style={{ width: "25%" }}
            className="mr-4 lg:mr-6 xl:mr-8"
            type="number"
          />
        </label>
        {/* <InputNumber
          value={amount}
          defaultValue={0}
          min={0}
          onChange={(amount) => {
            if (amount) {
              setAmount(amount);
            }
          }}
          size="middle"
          style={{ width: "25%" }}
          className="mr-4 lg:mr-6 xl:mr-8"
        /> */}
      </div>

      <div className="flex flex-col">
        <label className="text-start">
          Unit
          <select
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              if (target) {
                setUnit(target.value);
              }
            }}
          >
            {INGREDIENT_UNITS.map((ingredient) => {
              return <option value={ingredient.value}>{ingredient.text}</option>;
            })}
          </select>
        </label>
        {/* <Select
          options={INGREDIENT_UNITS}
          value={unit}
          style={{ width: 80 }}
          className="mr-4 lg:mr-6 xl:mr-8"
          onChange={(newUnit: string) => {
            setUnit(newUnit);
          }}
        /> */}
      </div>

      <div className="flex flex-col">
        {/* <button icon={<SaveOutlined />} onClick={onChange} /> */}
        <button onClick={onChange}>Save</button>
      </div>
    </div>
  );
};

export default CreateShoppingItem;
