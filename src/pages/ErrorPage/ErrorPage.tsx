import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <div className="flex-center relative main-content overflow-hidden error-page no-padding">
      <div className="flex flex-col flex-center gap-7">
        <div className="flex-center flex-col gap-3">
          <h1 className="press-font">PAGE NOT FOUND</h1>
          <span>GO BACK AND TRY A DIFFERENT LINK</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
