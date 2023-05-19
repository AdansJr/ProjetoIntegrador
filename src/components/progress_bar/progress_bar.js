import "./progress_bar.css";
import Step from "./step";

const ProgressBar = (props) => {
    return (
        <div className="stepper-wrapper">
            {props.steps.map((step) => (
                <Step children={step} key={step} count={props.count}></Step>
            ))}
        </div>
    )
};

export default ProgressBar;
