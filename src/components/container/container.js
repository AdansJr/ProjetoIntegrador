import "./container.css";

const Container = (props) => {
    const className = `container ${props.variant}`;
    
    return (
      <div className={className}></div>
    );
  };

export default Container;