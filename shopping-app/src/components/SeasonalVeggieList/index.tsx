import type { FunctionalComponent } from "preact";
import SeasonalVeggie from "../SeasonalVeggie";
import type { TypeShoppingItem } from "../../services/types.db";

const november: { id: number; title: string; imgUrl: string }[] = [
  {
    id: 0,
    title: "Aardappelen",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/aardappelen.webp",
  },
  {
    id: 1,
    title: "Bieten",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/bieten.jpeg?raw=true",
  },
  {
    id: 2,
    title: "Andijvie",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/andijvie.jpg?raw=true",
  },
  {
    id: 3,
    title: "Bloemkool",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/bloemkool.jpg?raw=true",
  },
  {
    id: 4,
    title: "Paddestoelen",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/paddestoelen.jpeg?raw=true",
  },
  {
    id: 5,
    title: "Pastinaak",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/pastinaak.png?raw=true",
  },
  {
    id: 6,
    title: "Pompoen",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/pompoen.png?raw=true",
  },
  {
    id: 7,
    title: "Radijs",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/radijs.jpeg?raw=true",
  },
  {
    id: 8,
    title: "Spinazie",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/spinazie.jpeg?raw=true",
  },
  {
    id: 9,
    title: "Spruitjes",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/spruitjes.jpeg?raw=true",
  },
  {
    id: 10,
    title: "Tomaten",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/tomaat.jpeg?raw=true",
  },
  {
    id: 11,
    title: "Uien",
    imgUrl: "https://github.com/NouryJanse/recipes/blob/main/_assets/veggies/uien.jpeg?raw=true",
  },
  {
    id: 12,
    title: "Wortels",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/wortels.webp",
  },
  {
    id: 13,
    title: "Schorseneer",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/schorseneer.png",
  },
  {
    id: 13,
    title: "Courgette",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/courgette.jpeg",
  },
  {
    id: 14,
    title: "Zoete aardappel",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/zoete-aardappel.jpeg",
  },
  {
    id: 15,
    title: "Koolrabi",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/koolrabi.jpg",
  },
  {
    id: 16,
    title: "Waterkers",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/waterkers.jpg",
  },
  {
    id: 17,
    title: "Waterkers",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/rode-kool.jpeg",
  },
  {
    id: 17,
    title: "Radicchio",
    imgUrl: "https://raw.githubusercontent.com/NouryJanse/recipes/main/_assets/veggies/radicchio.jpeg",
  },
];

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
