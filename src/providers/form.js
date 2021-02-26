import React, { createContext, useContext, useState } from 'react';
import { Form } from "reactstrap";
  
const FormContext = createContext({});

const FormProvider = ({ children, onSubmit, ...rest }) => {
  const [data, setData] = useState({});

  const HandleOnSubmit = (e) => {
    e.preventDefault();

    onSubmit && onSubmit({ e, data });
  }

  return (
    <FormContext.Provider
      value={{ data, setData }}
    >
        <Form onSubmit={HandleOnSubmit} {...rest}>
      {children}
    </Form>
    </FormContext.Provider>
  );
};

function useForm() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm must be used within an FormProvider');
  }

  return context;
}

export { FormProvider, useForm };