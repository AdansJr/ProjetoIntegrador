import "./input.css";

const Input = ({
  variant,
  placeholder,
  type,
  name,
  onChange,
  value,
  testid
}) => {
  const classes = `input ${variant}`;
  return (
    <div className="inputArea">

      <input
        className={classes}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        data-testid={testid}
      ></input>

    </div>


  );
};

export default Input;
