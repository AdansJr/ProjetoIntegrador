import "./error.css";

export const ErrorPage = () => {
  return (
    <div className="errorpage-container">
      <header>
        <h1>Oops! Alguma coisa deu errado.</h1>
        <h3>Tente de novo mais tarde</h3>
      </header>
    </div>
  );
};

export default ErrorPage;
