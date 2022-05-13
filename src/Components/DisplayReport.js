import React, { useCallback, useMemo, useState, useEffect } from 'react';
// import { Pencil } from 'react-bootstrap-icons';
import Button from "carbon-react/lib/components/button";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
// import { Responsive, WidthProvider } from "react-grid-layout";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
// import { Link } from 'react-router-dom';
import LayoutItemData from './LayoutItemData';
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { fetchData, selectors } from '../app/reducer';
// import { APIRes } from "../Config/apiRes";
import Link from "carbon-react/lib/components/link";
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

  const [subApiResponse, setSubApiResponse] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState("");
  const [componentLayout, setComponentLayout] = useState([]);
  const [subLayoutData, setSubLayoutData ] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  let pageurl = new URL(window.location.href);
  let idValue = pageurl.searchParams.get("mainLayoutId");
  const [layoutId, setLayoutId] = useState(idValue);
  //let componentLayout = [];

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
    try{
      axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getLayout`)
      .then(res => {
        setLayoutData(res.data);
      });
    } catch (err) {
      console.info("error",err);
    }
   
  }
 
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
      return retVal;
    }
    preCol = 1;
    return retVal;
  }

  const handleCancel = () => {
    setIsOpen(false);
    setPageIndex(0);
  };

  const handleOpen = async (propsData) => {
    if(!propsData) return null;
    let { onClickProp , layoutId, category} = propsData; 
    if(onClickProp != "displayDetails" && !layoutId) return null;

    setIsOpen(true);
    //setPageIndex(0);
    setLayoutId(layoutId);
    await axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getInvoiceData`)
    .then(res => {
      if(category) {
        const resData = res.data.filter((row) => row.category.trim() == category.trim() );
        console.info(category,"resData", res.data,"=======", resData);
        setSubApiResponse(resData);
      } else{ 
        setSubApiResponse(res.data);
      }

    });

  };

  const getCompLayout = () => {
    if(layoutData.length > 0){
      const rowLayoutData = layoutData.filter((row) => row.id == layoutId);
      if(rowLayoutData.length > 0){
        isOpen == false && setComponentLayout(rowLayoutData[0].componentLayout);
        isOpen == true && setSubLayoutData(rowLayoutData[0].componentLayout);
      }
    }
  }
  
  useEffect(() => {
    if(apiResponse.length > 0 && layoutData.length === 0){
      getLayoutData();
    } 
    if(apiResponse.length == 0) {
      getApiData();
    }
    getCompLayout();

  },[apiResponse.length, layoutData.length, subApiResponse.length]);
  
  return (
    <CarbonProvider>
        {/* <Heading title={name} divider={false} ml="8px"/> */}
        <GridContainer>
            {isOpen === false &&
              componentLayout.length > 0 && componentLayout.map((componentLayoutData, key) => (
                <>
                  <LayoutItemData handleOpen={handleOpen} isLayout="main" key={key} getLayoutcol={getLayoutcol} componentLayout={componentLayoutData} apiResponse={apiResponse} />
                </>
              ))
            }
            {isOpen === true && subApiResponse.length > 0 && <>
                <Link style={{ width : "100px"}} onClick={() => handleCancel()} icon="chevron_left_thick"> Back</Link>
                {subLayoutData.length > 0 && subLayoutData.map((componentLayoutData, key) => (
                <>
                  <LayoutItemData handleOpen={handleOpen} isLayout="subMain" key={key} getLayoutcol={getLayoutcol} componentLayout={componentLayoutData} apiResponse={subApiResponse} />
                </>
              ))}
          </>}
          </GridContainer>
    </CarbonProvider>
  )
};

export default DisplayReport;
