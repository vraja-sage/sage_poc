import React, { useState } from "react";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import sageTheme from "carbon-react/lib/style/themes/sage";
import GlobalStyle from "carbon-react/lib/style/global-style";
// import Box from "carbon-react/lib/components/box";
// import Button from "carbon-react/lib/components/button";
import "carbon-react/lib/style/fonts.css";
import DynamicForm from "./Components/DynamicForm";
import {FormFields} from "./Config/FormsFields";

function App  () {
  const [formData, setFormData] = useState({ data :[], current : {} });
  const onSubmit = model => {
    let data = [];
    if (model.id) {
      data = formData.data.filter(d => {
        return d.id != model.id;
      });
    } else {
      model.id = +new Date();
      data = formData.data.slice();
    }

    setFormData({
      data: [model, ...data],
      current: {} // todo
    });
  };

  return (
    <CarbonProvider theme={sageTheme}>
      <GlobalStyle />
      <DynamicForm
          key={formData.current.id}
          className="headerForm"
          title="Header Data"
          defaultValues={formData.current}
          model={FormFields}
          onSubmit={model => {
            onSubmit(model);
          }}
      />
    </CarbonProvider>
  );
};


export default App;
