import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
// import type { TypeShoppingItem } from "../../services/types.db";

type SeasonalVeggieProps = {
  veggie: { id: number; title: string; imgUrl: string };
  onClickHandler: () => void;
};

const SeasonalVeggie: FunctionalComponent<SeasonalVeggieProps> = ({ veggie, onClickHandler }) => {
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
      onClick={() => onClickHandler()}
    >
      {veggie.title}
    </div>
  );
};

export default SeasonalVeggie;
