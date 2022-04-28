import React, { useState } from "react";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";
import SplitButton from "carbon-react/lib/components/split-button";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import Content from "carbon-react/lib/components/content";
import './DisplayReport.css'

export default function DisplayReport ({ layoutData, APIRes, getLayoutcol }) {
  console.info(APIRes,"layoutData",layoutData);
  const { ReportBody } = APIRes;
    return (
        <React.Fragment>
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
          <GridItem alignSelf="stretch" justifySelf="stretch" >
             <div className="grid_headingone">
              <div className="container_text">
                    <h1 className="con_text">Quater 2</h1>
                    <h2 className="date_text">26Apr - 4 July 2022 
                        <span className="sage_btn">
                        <CarbonProvider>
                             <Box mb={1}>
                               <Pill pillRole="status" size="L" mr={1}>
                                      In progress
                               </Pill>
                             </Box>  
                        </CarbonProvider>
                      </span>
                    </h2>  
                </div>
              </div>
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
                  <FlatTableRow>
                      <FlatTableCell>Income - Total amount received brfore taking off any expenses</FlatTableCell>
                      <FlatTableCell align="right">3,500.00</FlatTableCell>
                  </FlatTableRow>
                </FlatTableBody>
                <FlatTableBody>
                  <FlatTableRow>
                    <FlatTableCell> Other business income</FlatTableCell>
                    <FlatTableCell align="right"> 3,900.00</FlatTableCell>
                  </FlatTableRow>
                </FlatTableBody>
                <FlatTableBody >
                  <FlatTableRow >
                    <FlatTableCell className="table_cell">Total buiness income</FlatTableCell>
                    <FlatTableCell className="table_cell" align="right">3,956.00</FlatTableCell>
                  </FlatTableRow>
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
                {ReportBody && ReportBody.map(row => <FlatTableRow>
                    <FlatTableCell>{row.BE} </FlatTableCell>
                    <FlatTableCell align="right">{row.TE}</FlatTableCell>
                    <FlatTableCell align="right">{row.TD}</FlatTableCell>
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
                  <FlatTableRow>
                    <FlatTableCell className="table_cell">Total net Profit </FlatTableCell>
                    <FlatTableCell className="table_cell" align="right">56,0000 </FlatTableCell>
                  </FlatTableRow>
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
          </GridItem>
      </GridContainer>
    </React.Fragment>
    )
}