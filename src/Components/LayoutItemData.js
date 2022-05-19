import React, { useCallback} from 'react';
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import Pill from "carbon-react/lib/components/pill";
import SplitButton from "carbon-react/lib/components/split-button";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import Heading from "carbon-react/lib/components/heading";
import Typography, {
  List,
  ListItem,
} from "carbon-react/lib/components/typography";


const LayoutItemData = ({ apiDataType, getLayoutcol, componentLayout, apiResponse, handleOpen }) => {

  const doBtnAction = (hrefLink) => {
    window.open(hrefLink , "_blank");
  }
  // const displayDetails = (propsData) => {
  //   console.log('Click happened');
  //   if(propsData && propsData.onClickProp == "displayDetails") {
  //     handleOpen();
  //   } else {

  //   }
  // }
  // const displayDetails = useCallback(
  //   () => {
  //     console.log('Click happened');
  //   },
  //   [], // Tells React to memoize regardless of arguments.
  // );
  const constructTableData = (rowData) => {
    let rowDataVal = rowData && replaceWithAPIRes(rowData.value);
    rowDataVal = rowDataVal.split("|");
    let arrData = rowDataVal && rowDataVal.map(rowContent => (<> 
        
          <FlatTableCell>{rowContent} </FlatTableCell>
 
    </> ));
    return (<FlatTableRow onClick={() => handleOpen(rowData.props)} >{arrData}</FlatTableRow>);
  }

  const constructTableObjData = (rowDataVal) => {

    let arrData = Object.values(rowDataVal).map(rowContent => (<> 
        
          <FlatTableCell>{rowContent} </FlatTableCell>
 
    </> ));
    return (<FlatTableRow >{arrData}</FlatTableRow>);
  }

  const replaceWithAPIRes = (iValue) => {
    if(iValue && apiResponse.length > 0) {
      for (let x of Object.entries(apiResponse[0].staticData)) {
        iValue = iValue.replace( `#${x[0]}` , x[1] );
      }
    }
    return iValue;
  }
  
  function getPropByString(obj, propString) {
    if (!propString)
      return obj;
  
    var prop, props = propString.split('.');
  
    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];
  
      var candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }

  const getApiDataRow = () => {
    let rData = [];
    if(apiDataType && apiResponse.length > 0) {
      const apiRowData = apiResponse[0];
      rData = apiRowData[apiDataType];
    }
    return rData ? rData : [];
  }
  const renderRowReport = (componentData) => {

    let {type, props } = componentData;
    let { value, tableHeader, tableContent, colValue, dataMethod } = props;
    type = (dataMethod === "api") ? `${type}Api` : type;
    let colRowVal = getLayoutcol(parseInt(colValue));
    let tableHeaderData=[], tableBody=[], argOne = "", argTwo = "", argThree ="", argFour="", tableHeaderVal = [], rowValues=[],apiData = "";
    // console.info(apiResponse,"iValue",iValue, "name",name ,"-", dataMethod);
    if(dataMethod === "api") {
      apiData = getApiDataRow();
      if(type == "TableApi" && apiData.tableHeader){
          tableHeaderData = apiData.tableHeader;
          tableBody = apiData.tableBody;
          if(!tableHeaderData) return null;
      } else {
        value = apiData;
        rowValues = value && value.split("|");
      }
    } else {
      value = replaceWithAPIRes(value);
      if(type == "Table") {
        tableHeaderVal = tableHeader && tableHeader.split("|");
      } else {
        rowValues = value && value.split("|");
      }
    }
    if(rowValues.length > 3 ) {
      argOne = rowValues[0];
      argTwo = rowValues[1];
      argThree = rowValues[2];
      argFour = rowValues[3];
    } else if(rowValues.length > 2 ) {
      argOne = rowValues[0];
      argTwo = rowValues[1];
      argThree = rowValues[2];
    } else if(rowValues.length > 1 ) {
      argOne = rowValues[0];
      argTwo = rowValues[1];
    } else {
      argOne = rowValues[0];
    }

    switch (type) {
      case "Heading" : return (
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
            <Heading title={argOne} divider={false} ml="8px"/>
          </GridItem>);
          break;
      case "HeadingApi" : return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
              <Heading title={argOne} divider={false} ml="8px"/>
            </GridItem>);
            break;    
      case "HeadingWithPill" : return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
              <Heading title={argOne} divider={false} ml="8px" pills={<Pill>{argTwo}</Pill>}/>
            </GridItem>);
            break;
      case "HeadingWithPillApi" : return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
              <Heading title={argOne} divider={false} ml="8px" pills={argTwo? <Pill>{argTwo}</Pill> : null}/>
            </GridItem>);
            break;      
      case "SubHeading" : return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
                <Typography ml="1px" variant="h2">{argOne}</Typography>
            </GridItem>);
            break;  
      case "SubHeadingApi" : return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
                <Typography ml="1px" variant="h2">{argOne}</Typography>
            </GridItem>);
            break;    
      case "Typography" : return (
              <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}> 
                  <Typography variant="h2">{argOne}</Typography>
              </GridItem>);
              break; 
      case "TypographyApi" : return (
              <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}> 
                  <Typography variant="h2">{argOne}</Typography>
              </GridItem>);
              break;                  
      case "Card" :
      case "CardApi": return (
        <GridItem {...props.grid} gridColumn={colRowVal}> 
          <Dl ml="10px" dtTextAlign="left" asSingleColumn>
              {argOne ? <Dt className="wonder_text">{argOne}</Dt> : null}
              {argTwo ? <Dt>{argTwo} </Dt> : null}
              {argThree ? <Dt>{argThree}</Dt> : null}
               {argFour ? <Dt>{argFour}</Dt> : null}
          </Dl>
        </GridItem>);
          break;
      case "Button" : return (
        <GridItem alignSelf="end" justifySelf="end" gridColumn={colRowVal}>
          <Button {...props} onClick={() => doBtnAction(argTwo)} className="bottom_btn">
              {argOne}
          </Button>
        </GridItem>
      );
      break;
      case "Table" : return (
        <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
            <FlatTable colorTheme="transparent-white">
              <FlatTableHead>
                <FlatTableRow>
                  {tableHeaderVal && tableHeaderVal.map(rowHeader => (
                      <>
                        <FlatTableHeader>{rowHeader}</FlatTableHeader>
                      </>
                  ))}
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                  {tableContent && tableContent.map((row, index) => {
                    return constructTableData(row);
                  }
                  )}
              </FlatTableBody>
            </FlatTable>
        </GridItem>
      );
      break;
      case "TableApi" : return (
        <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
            <FlatTable colorTheme="transparent-white">
              <FlatTableHead>
                <FlatTableRow>
                  {tableHeaderData && tableHeaderData.map(rowHeader => (
                      <>
                        <FlatTableHeader>{rowHeader}</FlatTableHeader>
                      </>
                  ))}
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                  {tableBody && tableBody.map((row) => {
                    return constructTableObjData(row);
                  }
                  )}
              </FlatTableBody>
            </FlatTable>
        </GridItem>
      );
      break;
    }
  }

  return (
    <>
      {componentLayout.type ? <> {renderRowReport(componentLayout)}</> : "NO Value given"}
    </>
  )
};

export default LayoutItemData;
