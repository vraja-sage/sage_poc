import React, { useState } from "react";
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import Pill from "carbon-react/lib/components/pill";
import SplitButton from "carbon-react/lib/components/split-button";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import Heading from "carbon-react/lib/components/heading";
import './DisplayReport.css'

export default function DisplayReport ({ layoutData, APIRes, getLayoutcol }) {
    const { PageTitle, ReportcontainerOne, ReportcontainerTwo, ReportBody } = APIRes;
    const renderRowReport = (type, gridCol, propData) => {
      switch (type) {
        case "PageTitle" : return (
            <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol} >
              <Heading title={PageTitle.title} divider={false} ml="8px"/>
              <Heading title={PageTitle.date} divider={false} ml="8px" pills={<Pill>{PageTitle.status}</Pill>}/>
            </GridItem>);
            break;
        case "ReportcontainerOne" : return (
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol} > 
            <Dl ml="10px" dtTextAlign="left">
                <Dt className="wonder_text">{ReportcontainerOne.title}</Dt>
                <Dt>{ReportcontainerOne.nationalINLabel}: </Dt> <Dd> {ReportcontainerOne.nationalIN} </Dd>
                <Dt>{ReportcontainerOne.extraData}</Dt>
                {/* <Dt>Sole trader</Dt> */}
            </Dl>
          </GridItem>);
            break;
        case "ReportcontainerTwo" : return ( 
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol} >
            <Dl ml="10px" w="200px" dtTextAlign="right" >
                <Dt className="wonder_text">{ReportcontainerTwo.dueInLabel} {ReportcontainerTwo.dueIn}</Dt>
                <Dt>{ReportcontainerTwo.sDeadlineLabeL} {ReportcontainerTwo.sDeadline}</Dt>
            </Dl>
          </GridItem> 
          );
        break;
        case "ReportBody_sectionOne" : return (
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol}>
              <FlatTable colorTheme="transparent-white">
                <FlatTableHead>
                  <FlatTableRow>
                    {propData && propData.map(rowHeader => (
                        <>
                          <FlatTableHeader>{rowHeader}</FlatTableHeader>
                          <FlatTableHeader></FlatTableHeader>
                        </>
                    ))}
                  </FlatTableRow>
                </FlatTableHead>
                <FlatTableBody>
                    {ReportBody && ReportBody.sectionOne && ReportBody.sectionOne.map((row, index) => <FlatTableRow>
                        <FlatTableCell className={ index == ReportBody.sectionOne.length -1 ? "table_cell" : ""} >{row.label} </FlatTableCell>
                        <FlatTableCell className={ index == ReportBody.sectionOne.length-1 ? "table_cell" : ""} align="right">{row.totalAmount} </FlatTableCell>
                      </FlatTableRow>
                    )}
                </FlatTableBody>
              </FlatTable>
          </GridItem>
        );
        break;
        case "ReportBody_sectionTwo" : return ( 
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol} >
              <FlatTable colorTheme="transparent-white" className="table_div" >
              <FlatTableHead>
                <FlatTableRow>
                {propData && propData.map((rowHeader, index) => {
                    return <FlatTableHeader className={ index != 0 ? "right_align" : ""}>{rowHeader}</FlatTableHeader>
                })}
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {ReportBody && ReportBody.sectionTwo && ReportBody.sectionTwo.map((row, index) => <FlatTableRow>
                    <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""}>{row.BE} </FlatTableCell>
                    <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""} align="right">{row.TE}</FlatTableCell>
                    <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""} align="right">{row.TD}</FlatTableCell>
                </FlatTableRow>)}
              </FlatTableBody>
            </FlatTable> 
          </GridItem>
        );
        break;
        case "ReportBody_sectionThree" : return ( 
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn={gridCol}>
            <FlatTable colorTheme="transparent-white">
                <FlatTableHead>
                  <FlatTableRow>
                    {propData && propData.map(rowHeader => (
                      <>
                        <FlatTableHeader>{rowHeader}</FlatTableHeader>
                        <FlatTableHeader></FlatTableHeader>
                      </>
                    ))}
                  </FlatTableRow>
                </FlatTableHead>
                <FlatTableBody>
                  {ReportBody && ReportBody.sectionThree && ReportBody.sectionThree.map((row, index) => <FlatTableRow>
                      <FlatTableCell className={ index == ReportBody.sectionThree.length -1 ? "table_cell" : ""}>{row.label} </FlatTableCell>
                      <FlatTableCell className={ index == ReportBody.sectionThree.length -1 ? "table_cell" : ""} align="right">{row.totalAmount} </FlatTableCell>
                    </FlatTableRow>
                  )}
                </FlatTableBody>
            </FlatTable>
          </GridItem>
        );
        break;
        case "ReportActions" : return (
          <GridItem alignSelf="stretch" justifySelf="right" gridColumn={gridCol}>
            <SplitButton text="Export" size="medium" mr="3" align="right" >
              <Button >Button 1</Button>
            </SplitButton>
            <Button buttonType="primary" className="bottom_btn">
                {propData.label}
            </Button>
          </GridItem>
        );
        break;         
      }
    }

    return (
        <React.Fragment>
        <GridContainer>
          {Object.keys(layoutData).length > 0 && Object.keys(layoutData).map((item) => {
            if(item == "default") {
              return null;
            }
            let gcValue = layoutData[item] && layoutData[item].gridLevel && Object.values(layoutData[item].gridLevel);
            let gridCol = getLayoutcol(gcValue[0]);
            if(item === "ReportBody") {
              return Object.keys(layoutData[item].section).map((subItem) => {
                let rowItem = `${item}_${subItem}`;
                return renderRowReport(rowItem, gridCol, layoutData[item].section[subItem]);
              });
            } else if(item === "ReportActions") {
              return renderRowReport(item, gridCol, layoutData[item].action);
            } else {
              return renderRowReport(item, gridCol);
            }
          })}
          {/* <GridItem alignSelf="stretch" justifySelf="stretch" >
            <Heading title="Quarter 2" divider={false} ml="8px"/>
            <Heading title="26 April - 4 July 2022" divider={false} ml="8px" pills={<Pill>In Progress</Pill>}/>
          </GridItem>
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn="1 / 7" >
            <Dl ml="10px" dtTextAlign="left">
                <Dt className="wonder_text">WonderLand Cakes</Dt>
                <Dt>National Insurance Number: </Dt> <Dd> AA123CC6 </Dd>
                <Dt>Cash basic</Dt>
                <Dt>Sole trader</Dt>
            </Dl>
          </GridItem>
          <GridItem alignSelf="stretch" justifySelf="stretch" gridColumn="7 / 13" >
             <Dl ml="10px" w="200px" dtTextAlign="right" >
                <Dt className="wonder_text">Due in 35 days</Dt>
                <Dt>Submission deadline 4 August 2022</Dt>
            </Dl>
          </GridItem>
          <GridItem alignSelf="stretch" justifySelf="stretch">
              <FlatTable colorTheme="transparent-white">
                <FlatTableHead>
                  <FlatTableRow>
                    <FlatTableHeader>Business Income</FlatTableHeader>
                    <FlatTableHeader></FlatTableHeader>
                  </FlatTableRow>
                </FlatTableHead>
                <FlatTableBody>
                    {ReportBody && ReportBody.sectionOne && ReportBody.sectionOne.map((row, index) => <FlatTableRow>
                        <FlatTableCell className={ index == ReportBody.sectionOne.length -1 ? "table_cell" : ""} >{row.label} </FlatTableCell>
                        <FlatTableCell className={ index == ReportBody.sectionOne.length-1 ? "table_cell" : ""} align="right">{row.totalAmount} </FlatTableCell>
                      </FlatTableRow>
                    )}
                </FlatTableBody>
              </FlatTable>
          </GridItem>
          <GridItem alignSelf="stretch" justifySelf="stretch" >
             <FlatTable colorTheme="transparent-white" className="table_div" >
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader>Business Expenses</FlatTableHeader>
                  <FlatTableHeader align="right">Total Expenses</FlatTableHeader>
                  <FlatTableHeader align="right">Total disallowable</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {ReportBody && ReportBody.sectionTwo && ReportBody.sectionTwo.map((row, index) => <FlatTableRow>
                    <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""}>{row.BE} </FlatTableCell>
                    <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""} align="right">{row.TE}</FlatTableCell>
                    <FlatTableCell className={ index == ReportBody.sectionTwo.length -1 ? "table_cell" : ""} align="right">{row.TD}</FlatTableCell>
                </FlatTableRow>)}
              </FlatTableBody>
            </FlatTable> 
          </GridItem>
          <GridItem alignSelf="stretch" justifySelf="stretch">
            <FlatTable colorTheme="transparent-white">
                <FlatTableHead>
                  <FlatTableRow>
                    <FlatTableHeader>Net Profit or loss</FlatTableHeader>
                    <FlatTableHeader></FlatTableHeader>
                  </FlatTableRow>
                </FlatTableHead>
                <FlatTableBody>
                  {ReportBody && ReportBody.sectionThree && ReportBody.sectionThree.map((row, index) => <FlatTableRow>
                      <FlatTableCell className={ index == ReportBody.sectionThree.length -1 ? "table_cell" : ""}>{row.label} </FlatTableCell>
                      <FlatTableCell className={ index == ReportBody.sectionThree.length -1 ? "table_cell" : ""} align="right">{row.totalAmount} </FlatTableCell>
                    </FlatTableRow>
                  )}
                </FlatTableBody>
            </FlatTable>
          </GridItem>
          <GridItem alignSelf="stretch" justifySelf="right">
            <SplitButton text="Export" size="medium" mr="3" align="right" >
              <Button >Button 1</Button>
            </SplitButton>
            <Button buttonType="primary" className="bottom_btn">
                Submit update to HMRC
            </Button>
          </GridItem> */}
      </GridContainer>
    </React.Fragment>
    )
}