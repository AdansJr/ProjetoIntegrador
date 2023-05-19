import "./button.css";

const Button = (props) => {
  const className = `button ${props.variant}`;
  const classNameActive = `button ${props.variant} active`;

  return (
    <button className={props.active === props.value ? classNameActive : className}
      onClick={props.onClick} data-testid={props.testid} value={props.value}>
      <span className={props.span}>{props.icon}</span>
      {props.children}
    </button>
  );
};

export default Button;
