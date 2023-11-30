import type { FunctionalComponent } from "preact";
import SeasonalVeggie from "../SeasonalVeggie";
import { november } from "./SeasonalVeggies";

export const SeasonalVeggieList: FunctionalComponent = ({}) => {
  return (
    <div>
      <h3>Add seasonal veggies</h3>
      <div className="seasonal-veggies">
        <SeasonalVeggies />
      </div>
    </div>
  );
};

const SeasonalVeggies: FunctionalComponent = ({}) => {
  return (
    <>
      {november.map((veggie) => {
        return <SeasonalVeggie veggie={veggie} />;
      })}
    </>
  );
};

export default SeasonalVeggieList;
