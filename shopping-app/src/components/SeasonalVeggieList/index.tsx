import type { FunctionalComponent } from "preact";

import { fall } from "./fall";

import SeasonalVeggie from "../SeasonalVeggie";

export const SeasonalVeggieList: FunctionalComponent = ({}) => {
  return (
    <div class="seasonal-veggies">
      <h3>Add seasonal veggies (fall)</h3>
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
