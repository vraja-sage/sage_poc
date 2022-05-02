import React from 'react';
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import Pill from "carbon-react/lib/components/pill";
import SplitButton from "carbon-react/lib/components/split-button";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import Heading from "carbon-react/lib/components/heading";

const LayoutItemData = ({ componentLayout, apiResponse }) => {
  console.info("apiResponse",apiResponse);
  const { PageTitle, ReportcontainerOne, ReportcontainerTwo, ReportBody } = apiResponse || {};
  const renderRowReport = (type) => {
    switch (type) {
      case "Header" : return (
          < >
            <Heading title={PageTitle.title} divider={false} ml="8px"/>
            <Heading title={PageTitle.date} divider={false} ml="8px" pills={<Pill>{PageTitle.status}</Pill>}/>
          </>);
          break;
      case "Card" : return (
        <> 
          <Dl ml="10px" dtTextAlign="left">
              <Dt className="wonder_text">{ReportcontainerOne.title}</Dt>
              <Dt>{ReportcontainerOne.nationalINLabel}: </Dt> <Dd> {ReportcontainerOne.nationalIN} </Dd>
              <Dt>{ReportcontainerOne.extraData}</Dt>
              {/* <Dt>Sole trader</Dt> */}
          </Dl>
        </>);
          break;
      case "Footer" : return ( 
        <>
          <Dl ml="10px" w="200px" dtTextAlign="right" >
              <Dt className="wonder_text">{ReportcontainerTwo.dueInLabel} {ReportcontainerTwo.dueIn}</Dt>
              <Dt>{ReportcontainerTwo.sDeadlineLabeL} {ReportcontainerTwo.sDeadline}</Dt>
          </Dl>
        </> 
        );
      break;
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
    <span className="text">
      {componentLayout.component ? <> {renderRowReport(componentLayout.component.name)}</> : componentLayout.i}
    </span>
  )
};

export default LayoutItemData;
