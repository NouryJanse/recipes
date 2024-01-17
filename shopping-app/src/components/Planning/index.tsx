import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { getRecipePlanning } from "../../helpers/getRecipePlanning";

type PlanningProps = {};

const Planning: FunctionComponent<PlanningProps> = ({}) => {
  const [dates, setDates] = useState(getRecipePlanning());

  const planningarr = [
    {
      id: "",
      recipeId: "",
      recipeTitle: "",
      recipeDate: "",
    },
  ];

  return (
    <div className="planning">
      <div className="grid">
        {dates.map((date) => {
          return <div className="planning--item">{date.date}</div>;
        })}
      </div>
    </div>
  );
};

export default Planning;
