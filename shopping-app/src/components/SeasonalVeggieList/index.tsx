import type { FunctionalComponent } from "preact";
import SeasonalVeggie from "../SeasonalVeggie";
import { fall } from "./fall";

export const SeasonalVeggieList: FunctionalComponent = ({}) => {
  return (
    <div class="seasonal-veggies">
      <h3>Add seasonal veggies during fall</h3>
      <div>
        <SeasonalVeggies />
      </div>
    </div>
  );
};

const SeasonalVeggies: FunctionalComponent = ({}) => {
  return (
    <>
      {fall.map((veggie) => {
        return <SeasonalVeggie veggie={veggie} />;
      })}
    </>
  );
};

export default SeasonalVeggieList;
