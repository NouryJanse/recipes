import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { setFormState, setModalShoppingItem } from "../../services/store";

type SeasonalVeggieProps = {
  veggie: { id: number; title: string; imgUrl: string };
};

const SeasonalVeggie: FunctionalComponent<SeasonalVeggieProps> = ({ veggie }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="seasonal--veggie"
      style={{
        backgroundImage: `url('${veggie.imgUrl}')`,
        boxShadow: !isHovering ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.25)" : "inset 0 0 0 2000px rgba(0, 0, 0, 0.05)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        setFormState({
          ingredientName: veggie.title,
          amount: "",
          unit: "",
        });
        // setModalShoppingItem({
        //   amount: "",
        //   ingredientName: veggie.title,
        //   unit: "",
        // });
      }}
    >
      <span>{veggie.title}</span>
    </div>
  );
};

export default SeasonalVeggie;
