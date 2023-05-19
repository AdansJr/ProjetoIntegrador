import { FaCheck} from "react-icons/fa";

const Step = (props) => {
    const count = props.count;
    const children = props.children;
    const preClassName = count >= children ? 'stepper-item active' : 'stepper-item';
    return (
        <div className ={count > children ? `${preClassName} completed`: preClassName}>
            <div className="step-counter">
                {count > children ? 
           (<span className="check"><FaCheck/></span>) : `${children}`}</div>
            <div className="step-name"></div>
        </div>
    )
}

export default Step;