import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Pencil } from 'react-bootstrap-icons';
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { Responsive, WidthProvider } from "react-grid-layout";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import { Link } from 'react-router-dom';
import LayoutItemData from './LayoutItemData';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchData, selectors } from '../app/reducer';
import { APIRes } from "../Config/apiRes";
import Heading from "carbon-react/lib/components/heading";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const rowHeights = { lg: 5, md: 3, sm: 2, xs: 1 };
const cols = { lg: 24, md: 24, sm: 24, xs: 24 };
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 };

const DisplayReport = () => {
  const [layoutData, setLayoutData ] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  // const dispatch = useAppDispatch();

  // const views = useAppSelector(selectors.getViews);
  // let pageurl = new URL(window.location.href);
  // let displayReport = pageurl.searchParams.get("report");
  // const fetch = useCallback(() => dispatch(fetchData()), [dispatch]);

  // useEffect(() => {
  //   /* TODO: remove condition when we will save the data on server */
  //   if (!views.length) {
  //     fetch();
  //   }
  // }, [fetch, views.length]);


  // const staticView = useMemo(() => view.componentLayout.map(layout => ({ ...layout, static: true })), [view.componentLayout]);

  // const [height, setHeight] = useState(rowHeights.lg);

  // const onBreakpointChange = useCallback((newBreakpoint) => {
  //   setHeight(rowHeights[newBreakpoint])
  // }, [setHeight]);
  let pageurl = new URL(window.location.href);
  let displayReport = pageurl.searchParams.get("report");
  useEffect(() => {
    let fileName = pageurl.searchParams.get("layoutName") || "defaultView";
    fileName && import(`../${fileName}.json`).then(res => setLayoutData(res));
    setApiResponse(APIRes);
  
  },[]);
  console.info(layoutData[0]);
  let { name , componentLayout} = layoutData && layoutData[0];
  let preCol = 1;
  const getLayoutcol = (colVal = 13) => {
    colVal =colVal +1;
    let retVal = `1 / ${colVal}`;
    console.info(colVal,"preCol",preCol)
    if(colVal < 13) {
      if(preCol != 1) {
        colVal  = 13;
      }
     
      retVal = `${preCol} / ${colVal}`;
      preCol = colVal;
      return retVal;
    }
    preCol = 1;
    return retVal;
  }
  return (
    <CarbonProvider>
        <Heading title={name} divider={false} ml="8px"/>
        <GridContainer>
            {
              componentLayout && componentLayout.map(componentLayoutData => (
                <>
                  <LayoutItemData getLayoutcol={getLayoutcol} componentLayout={componentLayoutData} apiResponse={apiResponse} />
                </>
              ))
            }
          </GridContainer>
    </CarbonProvider>
  )
};

export default DisplayReport;
