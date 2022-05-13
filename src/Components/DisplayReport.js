import React, { useCallback, useMemo, useState, useEffect } from 'react';
// import { Pencil } from 'react-bootstrap-icons';
import Button from "carbon-react/lib/components/button";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
// import { Responsive, WidthProvider } from "react-grid-layout";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import { Link } from 'react-router-dom';
import LayoutItemData from './LayoutItemData';
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { fetchData, selectors } from '../app/reducer';
// import { APIRes } from "../Config/apiRes";
import axios from 'axios';
import Heading from "carbon-react/lib/components/heading";
import DefaultPages, { Page  } from "carbon-react/lib/components/pages";
import DialogFullScreen from "carbon-react/lib/components/dialog-full-screen";
// const ResponsiveReactGridLayout = WidthProvider(Responsive);

const rowHeights = { lg: 5, md: 3, sm: 2, xs: 1 };
const cols = { lg: 24, md: 24, sm: 24, xs: 24 };
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 };

const DisplayReport = () => {
  const [layoutData, setLayoutData ] = useState("");
  const [apiResponse, setApiResponse] = useState([]);
  const [subLayoutData, setSubLayoutData ] = useState("");
  const [subApiResponse, setSubApiResponse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let componentLayout = [];
  // const dispatch = useAppDispatch();

  // const views = useAppSelector(selectors.getViews);
  // let pageurl = new URL(window.location.href);
  // let displayReport = pageurl.searchParams.get("report");
  // const fetch = useCallback(() => dispatch(fetchData()), [dispatch]);

  // const staticView = useMemo(() => view.componentLayout.map(layout => ({ ...layout, static: true })), [view.componentLayout]);

  // const [height, setHeight] = useState(rowHeights.lg);

  // const onBreakpointChange = useCallback((newBreakpoint) => {
  //   setHeight(rowHeights[newBreakpoint])
  // }, [setHeight]);

  const getApiData = () => {
    axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getResponse`)
    .then(res => {
      setApiResponse(res.data);
    })
  }
  const getLayoutData = () => {
    axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getLayout`)
    .then(res => {
      setLayoutData(res.data)
    })
  }
  useEffect(() => {
    if(apiResponse.length > 0){
      getLayoutData();
    } else {
      getApiData();
    }

  },[apiResponse.length]);
  
  let preCol = 1;
  const getLayoutcol = (colVal = 13) => {
    colVal =colVal +1;
    let retVal = `1 / ${colVal}`;

   
    if(colVal < 13) {
      if(preCol != 1) {
        colVal  = 13;
      }
     
      retVal = `${preCol} / ${colVal}`;
      preCol = colVal == 13 ? 1 : colVal;
      console.info(preCol,"preCol",colVal,"colVal",retVal)
      return retVal;
    }
    preCol = 1;
    console.info(preCol,"preCol111111",colVal,"colVal",retVal)
    return retVal;
  }

  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };

  const handleOpen = async (propsData) => {
    console.info("propsData",propsData)
    setIsOpen(true);
    setPageIndex(0);
    await axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/newLayout`)
    .then(res => {
      setSubLayoutData(res.data)
    });
    await axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getInvoiceData`)
    .then(res => {
      setSubApiResponse(res.data);
    });

  };

  const handleOnClick = () => {
    setIsDisabled(true);
    setPageIndex(pageIndex + 1);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);
  };

  const handleBackClick = ev => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 50);

    if (!isDisabled) {
      ev.preventDefault();
      setPageIndex(pageIndex - 1);
    }
  };
  if(isOpen) {
    componentLayout = subLayoutData && subLayoutData[0].componentLayout;
  } else {
    componentLayout = layoutData && layoutData[0].componentLayout;
  }

  return (
    <CarbonProvider>
        {/* <Heading title={name} divider={false} ml="8px"/> */}
        <GridContainer>
            {isOpen === false &&
              componentLayout && componentLayout.map((componentLayoutData, key) => (
                <>
                  <LayoutItemData handleOpen={handleOpen} key={key} getLayoutcol={getLayoutcol} componentLayout={componentLayoutData} apiResponse={apiResponse} />
                </>
              ))
            }
            {subApiResponse.length > 0 && <>
            {/* <DefaultPages pageIndex={pageIndex}>
              <Page title="Sage Report"> */}
                {componentLayout && componentLayout.map((componentLayoutData, key) => (
                <>
                  <LayoutItemData handleOpen={handleOpen} key={key} getLayoutcol={getLayoutcol} componentLayout={componentLayoutData} apiResponse={subApiResponse} />
                </>
              ))}
              {/* </Page>
            </DefaultPages> */}
          </>}
          </GridContainer>
    </CarbonProvider>
  )
};

export default DisplayReport;
