import React from 'react';
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

const LayoutItemData = ({ getLayoutcol, componentLayout, apiResponse }) => {
  const doBtnAction = (hrefLink) => {
    window.open(hrefLink , "_blank");
  }
  const constructTableData = (rowData) => {
    let rowDataVal = rowData && replaceWithAPIRes(rowData.value);
    rowDataVal = rowDataVal.split("|");
    let arrData = rowDataVal && rowDataVal.map(rowContent => (<> 
        
          <FlatTableCell>{rowContent} </FlatTableCell>
 
    </> ));
    return (<FlatTableRow>{arrData}</FlatTableRow>);
  }

  const replaceWithAPIRes = (iValue) => {
    if(iValue) {
      for (let x of Object.entries(apiResponse)) {
        iValue = iValue.replace( `#${x[0]}` , x[1] );
      }
    }
    return iValue;
  }
  
  const renderRowReport = (componentData) => {

    const {name, props } = componentData;
    let { iValue, tableHeader, tableContent, colValue } = props;
    let colRowVal = getLayoutcol(parseInt(colValue))
    //console.info(colValue,"colRowVal",colRowVal)
    let argOne = "", argTwo = "", argThree ="", argFour="", tableHeaderVal = [], rowValues=[] ;
    iValue = replaceWithAPIRes(iValue);
    if(name == "Table") {
      tableHeaderVal = tableHeader && tableHeader.split("|");
    } else {
      rowValues = iValue && iValue.split("|");
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
    // console.info(props,"componentData",componentData);
    switch (name) {
      case "Heading" : return (
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
            <Heading title={argOne} divider={false} ml="8px"/>
          </GridItem>);
          break;
      case "HeadingWithPill" : return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
              <Heading title={argOne} divider={false} ml="8px" pills={<Pill>{argTwo}</Pill>}/>
            </GridItem>);
            break;
      case "Typography" : return (
              <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}> 
                  <Typography variant="h2">{argOne}</Typography>
              </GridItem>);
              break;          
      case "Card" : return (
        <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}> 
          <Dl ml="10px" dtTextAlign="left">
              <Dt className="wonder_text">{argOne}</Dt>
              <Dt>{argTwo} </Dt>
              <Dt>{argThree}</Dt>
              <Dt>{argFour}</Dt>
          </Dl>
        </GridItem>);
          break;
      case "Button" : return (
        <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={colRowVal}>
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
      // case "Footer" : return ( 
      //   <>
      //     <Dl ml="10px" w="200px" dtTextAlign="right" >
      //         <Dt className="wonder_text">{ReportcontainerTwo.dueInLabel} {ReportcontainerTwo.dueIn}</Dt>
      //         <Dt>{ReportcontainerTwo.sDeadlineLabeL} {ReportcontainerTwo.sDeadline}</Dt>
      //     </Dl>
      //   </> 
      //   );
      // break;
      // case "ReportBody_sectionOne" : return (
      //   <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol}>
      //       <FlatTable colorTheme="transparent-white">
      //         <FlatTableHead>
      //           <FlatTableRow>
      //             {propData && propData.map(rowHeader => (
      //                 <>
      //                   <FlatTableHeader>{rowHeader}</FlatTableHeader>
      //                   <FlatTableHeader></FlatTableHeader>
      //                 </>
      //             ))}
      //           </FlatTableRow>
      //         </FlatTableHead>
      //         <FlatTableBody>
      //             {ReportBody && ReportBody.sectionOne && ReportBody.sectionOne.map((row, index) => <FlatTableRow>
      //                 <FlatTableCell className={ index == ReportBody.sectionOne.length -1 ? "table_cell" : ""} >{row.label} </FlatTableCell>
      //                 <FlatTableCell className={ index == ReportBody.sectionOne.length-1 ? "table_cell" : ""} align="right">{row.totalAmount} </FlatTableCell>
      //               </FlatTableRow>
      //             )}
      //         </FlatTableBody>
      //       </FlatTable>
      //   </GridItem>
      // );
      // break;
      // case "ReportBody_sectionTwo" : return ( 
      //   <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol} >
      //       <FlatTable colorTheme="transparent-white" className="table_div" >
      //       <FlatTableHead>
      //         <FlatTableRow>
      //         {propData && propData.map((rowHeader, index) => {
      //             return <FlatTableHeader className={ index != 0 ? "right_align" : ""}>{rowHeader}</FlatTableHeader>
      //         })}
      //         </FlatTableRow>
      //       </FlatTableHead>
      //       <FlatTableBody>
      //         {ReportBody && ReportBody.sectionTwo && ReportBody.sectionTwo.map((row, index) => <FlatTableRow>
      //             <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""}>{row.BE} </FlatTableCell>
      //             <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""} align="right">{row.TE}</FlatTableCell>
      //             <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""} align="right">{row.TD}</FlatTableCell>
      //         </FlatTableRow>)}
      //       </FlatTableBody>
      //     </FlatTable> 
      //   </GridItem>
      // );
      // break;
      // case "ReportBody_sectionThree" : return ( 
      //   <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol}>
      //     <FlatTable colorTheme="transparent-white">
      //         <FlatTableHead>
      //           <FlatTableRow>
      //             {propData && propData.map(rowHeader => (
      //               <>
      //                 <FlatTableHeader>{rowHeader}</FlatTableHeader>
      //                 <FlatTableHeader></FlatTableHeader>
      //               </>
      //             ))}
      //           </FlatTableRow>
      //         </FlatTableHead>
      //         <FlatTableBody>
      //           {ReportBody && ReportBody.sectionThree && ReportBody.sectionThree.map((row, index) => <FlatTableRow>
      //               <FlatTableCell className={ index == ReportBody.sectionThree.length -1 ? "table_cell" : ""}>{row.label} </FlatTableCell>
      //               <FlatTableCell className={ index == ReportBody.sectionThree.length -1 ? "table_cell" : ""} align="right">{row.totalAmount} </FlatTableCell>
      //             </FlatTableRow>
      //           )}
      //         </FlatTableBody>
      //     </FlatTable>
      //   </GridItem>
      // );
      // break;
      // case "ReportActions" : return (
      //   <GridItem alignSelf="stretch" justifySelf="right" gridColumn={gridCol}>
      //     <SplitButton text="Export" size="medium" mr="3" align="right" >
      //       <Button >Button 1</Button>
      //     </SplitButton>
      //     <Button buttonType="primary" className="bottom_btn">
      //         {propData.label}
      //     </Button>
      //   </GridItem>
      // );
      // break;         
    }
  }
  //  console.info("componentLayout",componentLayout);
  
  return (
    <>
      {componentLayout.component ? <> {renderRowReport(componentLayout.component)}</> : "NO Value given"}
    </>
  )
};

export default LayoutItemData;
