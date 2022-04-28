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
import Content from "carbon-react/lib/components/content";
import { saveAs } from 'file-saver';
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import { APIRes } from "./Config/apiRes";
import DisplayReport from "./Components/DisplayReport";
import './App.css';

function App  () {
  const [formData, setFormData] = useState({});
  const [layoutData, setLayoutData ] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  let pageurl = new URL(window.location.href);
  let displayReport = pageurl.searchParams.get("report");
  let preCol = 1;
  const createLayout = async () => {
    Object.entries(formData)
    const blobConfig = new Blob(
      [ JSON.stringify(formData) ], 
      { type: 'text/json;charset=utf-8' });

    saveAs(blobConfig, "26apr_report_layout.json");
    // const element = document.createElement("a");
    // const textFile = new Blob([JSON.stringify[{"Game" : "Starteaaaaad"}], { type: 'text/json' }]); //pass data from localStorage API to blob
    // console.info("textFile",textFile);
    // element.href = URL.createObjectURL(textFile);
    // element.download = "userFile.json";
    // document.body.appendChild(element); 
    // element.click();
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
  };
  const togglePage = (e) => {
    if(e == "tab-2") {
      //loadLayout();
    }
  }

  // const loadLayout = () => {
  //   let fileName = url.searchParams.get("layoutName");
  //   fileName && import(`./${fileName}.json`).then(res => setLayoutData(res));
  // }

  const getLayoutcol = (colVal) => {
    colVal =colVal +1;
    let retVal = `1 / ${colVal}`;
    if(colVal < 13) {
      if(preCol != 1) {
        colVal  = 13;
      }
      retVal = `${preCol} / ${colVal}`;
      preCol = colVal;
      return retVal;
    }
    preCol = 1;
    return retVal;
  }

  useEffect(() => {
    let fileName = pageurl.searchParams.get("layoutName") || "";
    fileName && import(`./${fileName}.json`).then(res => setLayoutData(res));
    setApiResponse(APIRes);
  },[]);
  
  return (
    <React.Fragment>
      <GlobalStyle />
      <div>
        <header className="main__header">
          <p className="title_text">SAGE</p><span className="help_text"><u><Help>Need Help</Help>Help</u></span>
        </header>
      </div>

      <CarbonProvider theme={sageTheme}>
      { 
      (displayReport == "display")
      ? 
      <>
        <DisplayReport layoutData={layoutData} APIRes={apiResponse} getLayoutcol={getLayoutcol}/>
      </>
      :
      <>
      <h1 className="main_title">Generate Reports for SAGE BUSINESS </h1>
      <Tabs size="large" align="left" onTabChange={togglePage} position="top" m={6} className="tabs_div">
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
        <Tab errorMessage="error" warningMessage="warning"  align="right" infoMessage="info" tabId="tab-2" title="Layout Preview" key="tab-2" className="tab__two">
          <div className="grid_container">
          <GridContainer>
          {Object.keys(layoutData).length > 0 && Object.keys(layoutData).map((item) => {
            if(item == "default") {
              return null;
            }
            let gcValue = layoutData[item] && layoutData[item].gridLevel && Object.values(layoutData[item].gridLevel);
            let gridCol = getLayoutcol(gcValue[0]);
            return(<>
              <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol} >
                <div className="grid_headingone">
                <Content title={item} align="center" variant="secondary">
                  {item}
                </Content>   
                </div>
              </GridItem> 
            </>)
          })}
          </GridContainer>
        </div>
        </Tab>
      </Tabs>
      </>}
      </CarbonProvider>
    </React.Fragment>
  );
};


export default App;
