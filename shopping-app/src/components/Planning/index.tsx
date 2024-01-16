import type { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

type PlanningProps = {};

const Planning: FunctionComponent<PlanningProps> = ({}) => {
  const [dates, setDates] = useState(calculatePlanning());

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

const calculatePlanning = () => {
  let arr = [];
  const today = new Date();
  for (let index = 0; index < 7; index++) {
    arr.push({
      date: getNextDays(new Date(), index).toLocaleDateString("nl-NL"),
    });
  }
  return arr;
};

const getNextDays = (currentDate = new Date(), daysToAdd = 1) => {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
};

export default Planning;
