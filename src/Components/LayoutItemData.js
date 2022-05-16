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


const LayoutItemData = ({ getLayoutcol, componentLayout, apiResponse, handleOpen }) => {

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
    console.info("rowData",rowData);
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
  
  const getCardApiData = (cardData, cardPosition) => {
    if(cardPosition === "Left") {
      return (<Dl ml="10px" dtTextAlign="left" asSingleColumn>{Object.values(cardData[0]).map((row) => <Dt>{row} </Dt> )}</Dl>);
    } else {
      return (<Dl ml="10px" dtTextAlign="left" asSingleColumn>{Object.entries(cardData[0]).map((rowVal) => <Dt>{rowVal}  </Dt> )}</Dl>);
    }
  }
  const getApiDataRow = (pCat, dCat) => {
    let rData = [];
    if(pCat && apiResponse.length > 0) {
      const apiRowData = apiResponse[0];
      const data = apiRowData[pCat].filter((row) => row.category === dCat.category);
      rData = data;
    }
    return rData.length > 0 ? rData[0] : [];
  }
  const renderRowReport = (componentData) => {

    let {name, props, pCategory } = componentData;
    let { iValue, tableHeader, tableContent, colValue, dataMethod, dCategory } = props;
    name = (dataMethod === "api") ? `${name}Api` : name;
    let colRowVal = getLayoutcol(parseInt(colValue));
    let tableHeaderData=[], tableBody=[], argOne = "", argTwo = "", argThree ="", argFour="", tableHeaderVal = [], rowValues=[],apiData = "";
    console.info(apiResponse,"iValue",iValue, "name",name ,"-", dataMethod);
    if(dataMethod === "api") {
      apiData = getApiDataRow(pCategory, dCategory);
      let { data } = apiData;
      if(name == "TableApi" && data.tableHeader){
          tableHeaderData = data.tableHeader;
          tableBody = data.tableBody;
          if(!tableHeaderData) return null;
      } else {
        iValue = data;
        rowValues = iValue && iValue.split("|");
      }
    } else {
      iValue = replaceWithAPIRes(iValue);
      if(name == "Table") {
        tableHeaderVal = tableHeader && tableHeader.split("|");
      } else {
        rowValues = iValue && iValue.split("|");
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

    switch (name) {
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
  // console.info("componentLayout",componentLayout.component)
  return (
    <>
      {componentLayout.component ? <> {renderRowReport(componentLayout.component)}</> : "NO Value given"}
    </>
  )
};

export default LayoutItemData;
