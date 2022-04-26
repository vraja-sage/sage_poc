import React, { useState, useEffect } from "react";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { Accordion, AccordionGroup,} from "carbon-react/lib/components/accordion";
import sageTheme from "carbon-react/lib/style/themes/sage";
import GlobalStyle from "carbon-react/lib/style/global-style";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button";
import "carbon-react/lib/style/fonts.css";
import DynamicForm from "./Components/DynamicForm";
import {FormFields} from "./Config/FormsFields";
import { Tabs, Tab } from "carbon-react/lib/components/tabs";
import Help from "carbon-react/lib/components/help";
import { saveAs } from 'file-saver';
import './App.css';

function App  () {
  const [formData, setFormData] = useState({});
  const [layoutData, setLayoutData ] = useState("");
  const [displayLayout, setDisplayLayout] = useState({});
  const createLayout = async () => {
    console.info("formData",formData);

    Object.entries(formData)
    const blobConfig = new Blob(
      [ JSON.stringify(formData) ], 
      { type: 'text/json;charset=utf-8' });

    saveAs(blobConfig, "hello_world.json");
    // const element = document.createElement("a");
    // const textFile = new Blob([JSON.stringify[{"Game" : "Starteaaaaad"}], { type: 'text/json' }]); //pass data from localStorage API to blob
    // console.info("textFile",textFile);
    // element.href = URL.createObjectURL(textFile);
    // element.download = "userFile.json";
    // document.body.appendChild(element); 
    // element.click();

    // let data = [];
    // if (model.id) {
    //   data = formData.data.filter(d => {
    //     return d.id != model.id;
    //   });
    // } else {
    //   model.id = +new Date();
    //   data = formData.data.slice();
    // }

    // setFormData({
    //   data: [model, ...data],
    //   current: {} // todo
    // });
  };
  const overlayOnChange = (e, rowObj ) => {
    let { rootKey, subKey, rowkey, label, subLabel } = rowObj;
    if(!formData[rootKey]) {
      formData[rootKey] = {};
    }
    if(!formData[rootKey][subKey]) {
      formData[rootKey][subKey] = { "label" : subLabel };
    }
 
    formData[rootKey][subKey][rowkey] = { [label] : e.target.value};
    setFormData(formData);
  }

  const onChange = (e, target, rootKey, m) => {
    if(!formData[rootKey]) {
      formData[rootKey] = {};
    }
    formData[rootKey][target] = { [m.label] : e.target.value};
    setFormData(formData);
    // console.info(e.target.value, "---",target , "====", rootKey , "++++" , m);
    // console.log(rowField, `${key} changed ${e.target.value} type ${type}`);
    // if (type === "single") {
    //   setRowField({...rowField , [key]: e.target.value });
    // } else {
    //   // Array of values (e.g. checkbox): TODO: Optimization needed.
    //   // let found = rowField[key]
    //   //   ? rowField[key].find(d => d === e.target.value)
    //   //   : false;

    //   // if (found) {
    //   //   let data = rowField[key].filter(d => {
    //   //     return d !== found;
    //   //   });
    //   //   setRowField({
    //   //     [key]: data
    //   //   });
    //   // } else {
    //     console.log("found", key, rowField[key]);
    //     // setRowField({
    //     //   [key]: [e.target.value, ...rowField[key]]
    //     // });
    //     let others = rowField[key] ? [...rowField[key]] : [];
    //     setRowField({
    //       [key]: [e.target.value, ...others]
    //     });
    //   //}
    // }
  };

  const loadLayout = () => {
    let iVar = "25apr"
    import(`./${iVar}.json`).then(res => setLayoutData(res));

  }

  // useEffect(() => {
  //   // if(Object.keys(layoutData).length > 0 ){
  //   //   for (let [key, value] of Object.entries(layoutData)) {
  //   //     console.info(value,"aaaaaaaa",key)
  //   //   }
  //   // }
  //   setDisplayLayout(layoutData);

  // },[layoutData]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <div>
        <header className="main__header">
          <p className="title_text">SAGE</p><span className="help_text"><u><Help>Need Help</Help>Help</u></span>
        </header>
      </div>

      <CarbonProvider theme={sageTheme}>
      <h1 className="main_title">Generate Reports for SAGE BUSINESS </h1>

      
      <Tabs size="large" align="left" position="top" m={6}>
        <Tab errorMessage="error" warningMessage="warning" infoMessage="info" tabId="tab-1" title="Layout Data" key="tab-1">
          <AccordionGroup>
          {Object.keys(FormFields).map((key, index) => (
          FormFields[key].length > 1 ? <>
            <Box m={1} p={1} >
            <Accordion title={key}>
              <DynamicForm
              // key={formData.current.id}
              className="headerForm"
              rootKey={key}
              defaultValues={formData[key]}
              onChange = {onChange}
              overlayOnChange = {overlayOnChange}
              model={FormFields[key]}
              index = {index}
              formFields = {FormFields}
              />
            </Accordion>
            </Box>
            </> : null
            )
            )}
           <Box m={3} p={3} >
              <Button onClick={createLayout} fullWidth buttonType="primary" type="submit">
                Create Layout
              </Button>
            </Box>
          </AccordionGroup> 
        </Tab>
        <Tab errorMessage="error" warningMessage="warning" infoMessage="info" tabId="tab-2" title="Layout Preview" key="tab-2" className="tab__two">
          <h3 onClick={loadLayout}>Welcome to Sage Reports</h3>
          {Object.keys(layoutData).length > 0 && Object.keys(layoutData).map(item => <div>{item}</div>
          )}
        </Tab>
      </Tabs>
      </CarbonProvider>
    </React.Fragment>
  );
};


export default App;
