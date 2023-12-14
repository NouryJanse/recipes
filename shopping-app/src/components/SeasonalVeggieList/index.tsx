import type { FunctionalComponent } from "preact";
import SeasonalVeggie from "../SeasonalVeggie";
import { fall } from "./fall";

export const SeasonalVeggieList: FunctionalComponent = ({}) => {
  return (
    <div class="seasonal-veggies">
      <h3>Add seasonal veggies during fall</h3>
      <SeasonalVeggies />
    </div>
  );
};

const SeasonalVeggies: FunctionalComponent = ({}) => {
  return (
    <div>
      {fall.map((veggie) => {
        return <SeasonalVeggie veggie={veggie} />;
      })}
    </div>
  );
};

export default SeasonalVeggieList;
