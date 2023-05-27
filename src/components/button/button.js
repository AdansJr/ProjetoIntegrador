import "./button.css";

const Button = (props) => {
  return (
    <button className={`button ${props.variant}`}
      onClick={props.onClick}
      id={props.id} 
      value={props.value} 
      name={props.name} 
      disabled={props.isDisabled}>
      <span className={props.span}>{props.icon}</span>
      {props.children}
    </button>
  );
};

export default Button;
