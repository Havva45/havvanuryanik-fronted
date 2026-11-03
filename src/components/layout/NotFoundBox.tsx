import { Link } from "react-router";

interface NotFoundBoxProps {
  text: string;
  to: string;
  linkText: string;
}

function NotFoundBox({ text, to, linkText }: NotFoundBoxProps) {
  return (
    <div className="hata-kutusu">
      <p>{text}</p>
      <Link to={to} className="buton">{linkText}</Link>
    </div>
  );
}

export default NotFoundBox;
