import React, { useState,useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchData, selectors } from '../app/reducer';
import Layout from './Layout';
import DisplayReport from './DisplayReport';
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import sageTheme from "carbon-react/lib/style/themes/sage";
import GlobalStyle from "carbon-react/lib/style/global-style";
// import Help from "carbon-react/lib/components/help";
// import Content from "carbon-react/lib/components/content";
// import { saveAs } from 'file-saver';
// import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
// import {APIRes} from "./../Config/apiRes";
import "carbon-react/lib/style/fonts.css";

const LayoutsPage = () => {
  const dispatch = useAppDispatch();
  const APIRes = {
    PageTitle : {
        title : "Quarter 2",
        date : "26Apr - 4 July 2022",
        status : "InProgress",
    },
    ReportcontainerOne : {
      title : "Wonderland Cake",
      nationalIN : "123456ABC",
      extraData : "Cash Basis",
      nationalINLabel : "National Insurance Number",
    },
    ReportcontainerTwo :{
      dueIn : "35 days",
      dueInLabel : "Due In",
      sDeadline : "4 Aug 2022",
      sDeadlineLabeL : "Submission deadline"
    },
    ReportBody : {
      sectionOne : [
        {
          label : "Income - Total amount received before taking off any expenses",
          totalAmount : "3500"
        },
        {
          label : "Other business income",
          totalAmount : "3500"
        },
        {
          label : "Total buiness income",
          totalAmount : "3500"
        }
      ],
      sectionTwo : [
      {
        BE : "Costs of goods",
        TE : "3500",
        TD : "3500"
      },
      {
        BE : "Construction Industry",
        TE : "3500",
        TD : "3500"
      },
      {
        BE : "Wages, Salaries",
        TE : "3500",
        TD : "3500"
      },
      {
        BE : "Car,Van and travel expenses",
        TE : "3500",
        TD : "3500"
      },
      {
        BE : "Rent , power costs",
        TE : "3500",
        TD : "3500"
      },
      {
        BE : "Phone, fax, office costs",
        TE : "3500",
        TD : "3500"
      },
      {
        BE : "Advertising and business costs",
        TE : "3500",
        TD : "3500"
      },
      {
        BE : "Total expenses",
        TE : "3596",
        TD : "3596"
      }
      ],
      sectionThree : [
        {
          label : "Total net Profit",
          totalAmount : "3956"
        }
      ]
    }
  };
  
  // const [apiResponse, setApiResponse] = useState({});
  const views = useAppSelector(selectors.getViews);
  let pageurl = new URL(window.location.href);
  let displayReport = pageurl.searchParams.get("report");
  const fetch = useCallback(() => dispatch(fetchData()), [dispatch]);

  useEffect(() => {
    /* TODO: remove condition when we will save the data on server */
    if (!views.length) {
      fetch();
    }
  }, [fetch, views.length]);

  // useEffect(() => {
  //   // import("./../Config/apiRes").then(res => { console.info("res-----",res); setApiResponse(res) });
  //   console.info("APIRes=========",APIRes)
  // });

  console.info("views",views);
  return (
    <React.Fragment>
      <GlobalStyle />
      {/* <div>
        <header className="main__header">
          <p className="title_text">SAGE</p><span className="help_text"><u><Help>Need Help</Help>Help</u></span>
        </header>
      </div> */}

      <CarbonProvider theme={sageTheme}>
      { 
      (displayReport == "display")
      ? 
      <>
        {views.map(view => <DisplayReport apiResponse={APIRes} key={view.id} view={view} />)}
      </>
      :
      <>
      <div className="row">
        {views.map(view => <Layout key={view.id} view={view} apiResponse={APIRes} />)}
      </div>
      </>
      }
      </CarbonProvider>
      </React.Fragment>)
      {/* <div className="row mb-4 pb-2 border-bottom justify-content-between">
        <h4 className="col p-0">
          Layout Screen
        </h4>
        <div className="col-3 text-end p-0">
          <button className="btn" onClick={fetch}>Reset Changes (Also from local storage)</button>
        </div>
      </div> */}
};

export default LayoutsPage;
