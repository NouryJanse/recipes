import type { FunctionComponent } from "preact";

type FooterProps = {};

const Footer: FunctionComponent<FooterProps> = ({}) => {
  return (
    <footer>
      <div>
        <a href="/">Groceries list</a>
        <a href="/planning">Planning</a>
      </div>
    </footer>
  );
};

export default Footer;
