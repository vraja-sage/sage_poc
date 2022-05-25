import React, { useState, useEffect } from 'react';
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import { GridContainer } from "carbon-react/lib/components/grid";
import LayoutItemData from './LayoutItemData';
import Link from "carbon-react/lib/components/link";
import axios from 'axios';

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

  const getApiData = () => {
    try{
      axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getResponse?category=main_data`)
      .then(res => {
        setApiResponse(res.data);
      })
    } catch (err) {
      console.info("error",err);
    }
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

  const handleOpen = async (propsData, index, apiDataType) => {
    if(!propsData) return null;
    let { layoutId } = propsData; 
    if(!layoutId) return null;

    setIsOpen(true);
    //setPageIndex(0);
    const getDataUrl = apiResponse[0][apiDataType][index]; 
    console.info(getDataUrl,"getDataUrl.dataUrl",getDataUrl.data_url)
    setLayoutId(layoutId);
      await axios.get(getDataUrl.data_url)
      .then(res => {
          setSubApiResponse(res.data);
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
              Object.keys(componentLayout).length > 0 && Object.keys(componentLayout).map((componentLayoutKey, key) => (
                <>
                  <LayoutItemData handleOpen={handleOpen} isLayout="main" key={key} getLayoutcol={getLayoutcol} apiDataType={componentLayoutKey} componentLayout={componentLayout[componentLayoutKey]} apiResponse={apiResponse} />
                </>
              ))
            }
            {isOpen === true && subApiResponse.length > 0 && <>
                <Link style={{ width : "100px"}} onClick={() => handleCancel()} icon="chevron_left_thick"> Back</Link>
                {Object.keys(subLayoutData).length > 0 && Object.keys(subLayoutData).map((componentLayoutKey, key) => (
                <>
                  <LayoutItemData handleOpen={handleOpen} isLayout="subMain" key={key} getLayoutcol={getLayoutcol} apiDataType={componentLayoutKey}  componentLayout={subLayoutData[componentLayoutKey]} apiResponse={subApiResponse} />
                </>
              ))}
          </>}
          </GridContainer>
    </CarbonProvider>
  )
};

export default DisplayReport;
