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

  const constructTableData = (rowData, index) => {
    let arrData = rowData.value && rowData.value.map((rowContent) => {
      let rowDataVal = rowContent && replaceWithAPIRes(rowContent);
      return (<> 
          <FlatTableCell>{rowDataVal} </FlatTableCell>
    </> )
    
  });
    return (<FlatTableRow onClick={() => handleOpen(rowData.props, index, apiDataType)} >{arrData}</FlatTableRow>);
  }

  const constructTableObjData = (rowDataVal) => {

    let arrData = rowDataVal.value.map(rowContent => (<> 
        
          <FlatTableCell>{replaceWithAPIRes(rowContent)} </FlatTableCell>
 
    </> ));
    return (<FlatTableRow >{arrData}</FlatTableRow>);
  }

  const replaceWithAPIRes = (data) => {
    if(data && apiResponse.length > 0) {
        for (let x of Object.entries(apiResponse[0].staticData)) {
          data = data.replace( `#${x[0]}` , x[1] );
        }
    }
    return data;
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
    let { data, tableHeader, tableContent, colValue, dataMethod } = props;
    type = (dataMethod === "api") ? `${type}Api` : type;
    let colRowVal = getLayoutcol(parseInt(colValue));
    let tableHeaderData=[], tableBody=[], argOne = "", argTwo = "", argThree ="", argFour="", tableHeaderVal = [], rowValues={},apiData = "";

    if(dataMethod === "api") {
      apiData = getApiDataRow();
      console.info("apiData",apiData);
      if(type == "TableApi" && apiData.tableHeader){
          tableHeaderVal = apiData.tableHeader;
          tableBody = apiData.tableBody;
          if(!tableHeaderData) return null;
      } else {
        rowValues = apiData;
      }
    } else {
      if(type == "Table") {
        tableHeaderVal = tableHeader;
        tableBody = tableContent;
      }
      rowValues = data;
    }

    console.info(rowValues, "rowValues","=-=",type);
    switch (type) {
      case "Heading" : 
      case "HeadingApi":
        {
            let header = typeof rowValues === "string" ? rowValues : rowValues.header ;
            return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
            <Heading title={header} divider={false} ml="8px"/>
            </GridItem>);
        }
        break; 
      case "HeadingWithPill" :
      case "HeadingWithPillApi" :
        {  
            let { header, pills } = rowValues;
            return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
            <Heading title={header} divider={false} ml="8px" pills={pills ? <Pill>{pills}</Pill> : null}/>
            </GridItem>);
        }
        break;   
      case "SubHeading" : 
      case "SubHeadingApi" :
            return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
                <Typography ml="1px" variant="h2">{rowValues}</Typography>
            </GridItem>);
            break;    
      case "Typography" :
        case "TypographyApi" :  
            return (
              <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}> 
                  <Typography variant="h2">{rowValues}</Typography>
              </GridItem>);
              break;                 
      case "Card" :
      case "CardApi": {
        let { header, listOne, listTwo, listThree} = rowValues;
        return (
        <GridItem {...props.grid} gridColumn={colRowVal}> 
          <Dl ml="10px" dtTextAlign="left" asSingleColumn>
              {header ? <Dt className="wonder_text">{replaceWithAPIRes(header)}</Dt> : null}
              {listOne ? <Dt>{replaceWithAPIRes(listOne)} </Dt> : null}
              {listTwo ? <Dt>{replaceWithAPIRes(listTwo)}</Dt> : null}
               {listThree ? <Dt>{replaceWithAPIRes(listThree)}</Dt> : null}
          </Dl>
        </GridItem>);
      }
          break;
      case "Button" : return (
        <GridItem alignSelf="end" justifySelf="end" gridColumn={colRowVal}>
          <Button {...props} onClick={() => doBtnAction(rowValues)} className="bottom_btn">
              {rowValues}
          </Button>
        </GridItem>
      );
      break;
      case "Table" : return (
        <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
            <FlatTable colorTheme="transparent-white">
              <FlatTableHead>
                <FlatTableRow>
                  {tableHeaderVal.length > 0 && tableHeaderVal.map(rowHeader => (
                      <>
                        <FlatTableHeader>{rowHeader.label}</FlatTableHeader>
                      </>
                  ))}
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                  {tableBody.length > 0 && tableBody.map((row, index) => {
                    return constructTableData(row, index);
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
                  {tableHeaderVal.length >0 && tableHeaderVal.map(rowHeader => (
                      <>
                        <FlatTableHeader>{rowHeader.label}</FlatTableHeader>
                      </>
                  ))}
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                  {tableBody.length >0 && tableBody.map((row) => {
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
