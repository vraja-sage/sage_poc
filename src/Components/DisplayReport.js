import React, { useState } from "react";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import sageTheme from "carbon-react/lib/style/themes/sage";
import GlobalStyle from "carbon-react/lib/style/global-style";
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import Help from "carbon-react/lib/components/help";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import { APIRes } from "./../Config/apiRes";
import Box from "carbon-react/lib/components/box";
import Pill from "carbon-react/lib/components/pill";
import SplitButton from "carbon-react/lib/components/split-button";
import './DisplayReport.css'

export default function DisplayReport ({ layoutData }) {
    return (
        <React.Fragment>
        {/* <GlobalStyle />
        <div>
          <header className="main__header">
            <p className="title_text">SAGE</p><span className="help_text"><u><Help>Need Help</Help>Help</u></span>
          </header>
        </div>
  
        <CarbonProvider theme={sageTheme}> */}
       
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
                      </span></h2>  
                </div>
              </div>
            </GridItem>
            <GridItem alignSelf="stretch" justifySelf="stretch" className="grid_heading_one"  gridColumn="1 / 7" >
        
            <div className="grid_left">
             <div className="cakes_container">
              <h3 className="cake_text">WonderCakes</h3>
              <h6 className="insurance_text">National Insurance Number : 112AAADE</h6>
              <p className="cash_basic">Cash Basics</p>
              <p className="sole_text">sole trader</p>
           </div>
             </div>
            
            </GridItem>
            <GridItem alignSelf="stretch" justifySelf="stretch" className="grid_heading_two"  gridColumn="7 / 13" >
              <div className="grid_right">
             <div className="right_text">
             <h3 className="due_text">Due In 35 days</h3>
             <h6 className="date_text_grid2">Submission deadline 4 August 2022</h6>
           <CarbonProvider theme={sageTheme}>
              <Button buttonType="primary" noWrap className="sub_buttton">
                Submit update to HMRC
              </Button>
           </CarbonProvider>
          </div>
              </div>
            </GridItem>
            <GridItem alignSelf="stretch" justifySelf="stretch" >
              <div className="page_body">
              
             <FlatTable colorTheme="transparent-white" className="table_div" >
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader>Business Expenses</FlatTableHeader>
                  <FlatTableHeader align="right">Total Expenses</FlatTableHeader>
                  <FlatTableHeader align="right">Total disallowable</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {/* {APIRes.map(row => <FlatTableRow>
                    <FlatTableCell>{row.BE} </FlatTableCell>
                    <FlatTableCell align="right">{row.TE}</FlatTableCell>
                    <FlatTableCell align="right">{row.TD}</FlatTableCell>
                </FlatTableRow>)} */}
              </FlatTableBody>
            </FlatTable> 
          </div>
          
          </GridItem>
          </GridContainer>
     <div className="bottom_button">
     <SplitButton text="Export" size="small">
      <Button className="split_btn">Button 1</Button>
    </SplitButton>
    </div>
      <Button buttonType="primary" noWrap className="submit_btn_bottom">
           Submit update to HMRC
      </Button>

          {/* </CarbonProvider> */}
    </React.Fragment>
    )
}