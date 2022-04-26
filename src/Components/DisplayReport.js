import React, { useState } from "react";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import sageTheme from "carbon-react/lib/style/themes/sage";
import GlobalStyle from "carbon-react/lib/style/global-style";
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import Help from "carbon-react/lib/components/help";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import { APIRes } from "./../Config/apiRes";

export default function DisplayReport (props) {
    return (
        <React.Fragment>
        <GlobalStyle />
        <div>
          <header className="main__header">
            <p className="title_text">SAGE</p><span className="help_text"><u><Help>Need Help</Help>Help</u></span>
          </header>
        </div>
  
        <CarbonProvider theme={sageTheme}>
        <GridContainer>
          {/* {Object.keys(layoutData).length > 0 && Object.keys(layoutData).map((item) => {
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
            
          })} */}
            <GridItem alignSelf="stretch" justifySelf="stretch" className="grid_heading">
              <div className="grid_headingone">
                  H1 Heading
              </div>
            </GridItem>
            <GridItem alignSelf="stretch" justifySelf="stretch" className="grid_heading"  gridColumn="1 / 7" >
              <div className="grid_left">
                H2 Heading
              </div>
            </GridItem>
            <GridItem alignSelf="stretch" justifySelf="stretch" className="grid_heading"  gridColumn="7 / 13" >
              <div className="grid_right">
                  H2 Heading
                   <Button buttonType="primary" noWrap className="submit_btn">
                      Submit update to HMRC
                    </Button> 
              </div>
            </GridItem>
            <GridItem alignSelf="stretch" justifySelf="stretch" >
              <div className="page_body">
              
               <FlatTable colorTheme="transparent-white" className="table_div">
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader>Business Expenses</FlatTableHeader>
                  <FlatTableHeader align="right">Total Expenses</FlatTableHeader>
                  <FlatTableHeader align="right">Total disallowable</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {APIRes.map(row => <FlatTableRow>
                    <FlatTableCell>{row.BE} </FlatTableCell>
                    <FlatTableCell align="right">{row.TE}</FlatTableCell>
                    <FlatTableCell align="right">{row.TD}</FlatTableCell>
                </FlatTableRow>)}
              </FlatTableBody>
            </FlatTable> 
          </div>
          </GridItem>
          </GridContainer>
          </CarbonProvider>
    </React.Fragment>
    )
}