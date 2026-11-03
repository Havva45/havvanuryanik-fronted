interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  return (
    <div className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
}

export default Header;
