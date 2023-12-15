import type { Veggie } from ".";
import { setFormState } from "../../services/store";

export const addVeggie = (veggie: Veggie) => {
  setFormState({
    ingredientName: veggie.title,
    amount: "",
    unit: "",
  });
};

export const getStyle = (veggie: Veggie, isHovering: boolean) => {
  return {
    backgroundImage: `url('${veggie.imgUrl}')`,
    boxShadow: !isHovering ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.25)" : "inset 0 0 0 2000px rgba(0, 0, 0, 0.05)",
  };
};
