import React from "react";

const AppFormControlFeedback = ({ formikErrors, formError }) => {
  const errorKeys = Object.keys(formikErrors);

  return (
    <>
      {!!errorKeys.length &&
        errorKeys.map((key) => <li key={key}>{formikErrors[key]}</li>)}
      {formError && <li>{formError}</li>}
    </>
  );
};

export default AppFormControlFeedback;
