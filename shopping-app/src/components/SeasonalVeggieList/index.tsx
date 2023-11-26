import type { FunctionalComponent } from "preact";
import SeasonalVeggie from "../SeasonalVeggie";
import { november } from "./SeasonalVeggies";
// import type { TypeShoppingItem } from "../../services/types.db";

type SeasonalProductsProps = {
  setDialogOpened: (boolean: boolean) => void;
};
export const SeasonalProducts: FunctionalComponent<SeasonalProductsProps> = ({ setDialogOpened }) => {
  return (
    <div>
      <h3>Seasonal veggies</h3>
      <div className="seasonal-veggies">
        <SeasonalVeggieList onClickHandler={() => setDialogOpened(true)} />
      </div>
    </div>
  );
};

type SeasonalVeggieListProps = {
  onClickHandler: () => void;
};
const SeasonalVeggieList: FunctionalComponent<SeasonalVeggieListProps> = ({ onClickHandler }) => {
  return (
    <>
      {november.map((veggie) => {
        return <SeasonalVeggie veggie={veggie} onClickHandler={onClickHandler} />;
      })}
    </>
  );
};

export default SeasonalVeggieList;
