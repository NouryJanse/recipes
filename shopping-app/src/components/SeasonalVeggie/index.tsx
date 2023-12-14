import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { setFormState, setModalShoppingItem } from "../../services/store";

type Veggie = { id: number; title: string; imgUrl: string };

type SeasonalVeggieProps = {
  veggie: Veggie;
};

const SeasonalVeggie: FunctionalComponent<SeasonalVeggieProps> = ({ veggie }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="seasonal--veggie"
      style={getStyle(veggie, isHovering)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => addVeggie(veggie)}
    >
      <span>{veggie.title}</span>
    </div>
  );
};

const addVeggie = (veggie: Veggie) => {
  setFormState({
    ingredientName: veggie.title,
    amount: "",
    unit: "",
  });
};

const getStyle = (veggie: Veggie, isHovering: boolean) => {
  return {
    backgroundImage: `url('${veggie.imgUrl}')`,
    boxShadow: !isHovering ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.25)" : "inset 0 0 0 2000px rgba(0, 0, 0, 0.05)",
  };
};

export default SeasonalVeggie;
