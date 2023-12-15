import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";
import { addVeggie, getStyle } from "./helpers";

export type Veggie = { id: number; title: string; imgUrl: string };

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

export default SeasonalVeggie;
