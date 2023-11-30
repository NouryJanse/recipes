import type { FunctionalComponent } from "preact";
import SeasonalVeggie from "../SeasonalVeggie";
import { herfst } from "./herfst";

export const SeasonalVeggieList: FunctionalComponent = ({}) => {
  return (
    <div>
      <h3>Add seasonal veggies during fall</h3>
      <div className="seasonal-veggies">
        <SeasonalVeggies />
      </div>
    </div>
  );
};

const SeasonalVeggies: FunctionalComponent = ({}) => {
  return (
    <>
      {herfst.map((veggie) => {
        return <SeasonalVeggie veggie={veggie} />;
      })}
    </>
  );
};

export default SeasonalVeggieList;
