import { find as _find } from "lodash";
import React, { useCallback, useState, useEffect } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import Dialog from "carbon-react/lib/components/dialog";
import Typography from "carbon-react/lib/components/typography";
import JSONFormatter from 'json-formatter-js'
import Form from "carbon-react/lib/components/form";
import Button from "carbon-react/lib/components/button";
import Textbox from "carbon-react/lib/components/textbox";
import { FilterableSelect, Option } from "carbon-react/lib/components/select";
import Heading from "carbon-react/lib/components/heading";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { saveAs } from 'file-saver';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectors, setLayoutView } from "../app/reducer";
import DraggableComponent from "./DraggableComponent";
import LayoutItemConfig from "./LayoutItemConfig";
import axios from 'axios';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const droppingItem = {
  i: "__dropping-elem__",
  w: 5,
  h: 6
};

const ConfigurationPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  let { id } = useParams();

  const view = useAppSelector(selectors.getViewById(id));
  const draggableComponents = useAppSelector(selectors.getComponents);

  const [layout, setlayout] = useState(
    view ? view.componentLayout : []
  );
  const [component, setComponent] = useState();
  const [isCompoOpen, setIsCompoOpen] = useState(false);
  const [preInput, setPreInput] = useState({});
  const [fields, setFields] = useState([{ value: null }]);
  const [tableData, setTableData] = useState({});
  const [ isShowField, setIsShowField] = useState(false);
  const [ displayCategory, setDisplayCategory] = useState([]);
  const [ allCategory, setAllCategory] = useState([]);
  let cName = (component && component.name) || "";

  const mapLayout = useCallback(
    (currentLayout , newLayout ) => {
      return currentLayout.map((componentLayout) => {
        const found = _find(newLayout, ["i", componentLayout.i]);
        return { ...componentLayout, ...found };
      });
    },
    []
  );

  const handleDragStart = useCallback((dragComponent) => {
    setComponent(dragComponent);
  }, []);

  useEffect(() => {
    try{
      axios.get(`https://627a2ffe73bad506858431bb.mockapi.io/api/v1/getCategory`)
      .then(res => {
        setAllCategory(res.data[0]);
      });
    } catch (err) {
      console.info("error",err);
    }
  }, []);
  
  const updateInputValue = (e) => {
    let comp = component;
    if(component.props && Object.keys(component.props).length > 0 ) {
      comp.props[e.target.name] = e.target.value;
    } else{
      comp = { ...component, props : { [e.target.name] : e.target.value }};
    }
    if(e.target.name === "dataMethod") {
        let isShowFieldshow = e.target.value === "api" ? false : true;
        setIsShowField(isShowFieldshow);
        getDisplayCategory(comp);
        console.info("e.target.value",e.target.value);
    }
    setComponent(comp);
  }
  const onDropEle = (layouts, item, e, compAdd) => {
    setIsCompoOpen(true);
    setPreInput({ layouts, item, e, compAdd })
  }

  function getPCategory (objData) {
    let pCat = Object.keys(allCategory);
    let pCatRow = "";
    pCat.pop("id");
    console.info(allCategory,"pCat",pCat, "objData", objData)
    pCat.forEach((value) => {
      const isFound = allCategory[value].filter(element => element.category == objData.category );
      if(isFound.length > 0){
        pCatRow = value;
        return;
      } 
    });
    console.info("pCatRow",pCatRow);
    return pCatRow;
  }
  const onSaveInput = () => {
    const {  layouts, item, e, compAdd } = preInput;
    if(cName === "Table") {
      const { iValue } = tableData;
      let { dataMethod, colValue, dCategory } = component.props || {};
      if(dCategory){
        let pCategory = getPCategory(dCategory);
        dCategory = pCategory.concat(".", dCategory.category);
      }
      let comp = { ...component, props : { dCategory, dataMethod, "colValue" : colValue, "tableHeader" : iValue, "tableContent" : fields }};
      setlayout((prev) =>
      mapLayout(prev, layouts).concat({
        ...item,
        i: new Date().getTime().toString(),
        component: comp,
        isDraggable: undefined
      })
    );
      setIsCompoOpen(false);
      setTableData({});
      setFields([{ value: null }]);
      setIsShowField(false);
    } else {
      if((component.props && component.props.dCategory)){
        let pCategory = getPCategory(component.props.dCategory);
        component.props.dCategory = pCategory.concat(".", component.props.dCategory.category);
      }
      setlayout((prev) =>
        mapLayout(prev, layouts).concat({
          ...item,
          i: new Date().getTime().toString(),
          component,
          isDraggable: undefined
        })
      );
      setIsCompoOpen(false);
      setIsShowField(false);
    }
   
  }

  const onDrop = useCallback(
    (layouts, item, e) => {
      onDropEle(layouts, item, e, component);      
    },
    [component, mapLayout]
  );

  const onRemoveItem = useCallback((i) => {
    setlayout((prev) => prev.filter((l) => l.i !== i));
  }, []);

  const onLayoutChange = useCallback(
    (layouts) => {
      setlayout((prev) => mapLayout(prev, layouts));
    },
    [mapLayout]
  );

  const handleSave = useCallback(() => {
    if (view) {
      dispatch(setLayoutView({ ...view, componentLayout: layout }));
    }
    history.push("/");
  }, [dispatch, history, view, layout]);

  if (!view) {
    return <Redirect push to="/" />;
  }

  function handleChange(i, event) {
    if(i == "TH") {
      const newValues = {
        ...tableData,
        [event.target.name]: event.target.value
      } 
      setTableData(newValues);
    } else {
      const values = [...fields];
      values[i].value = event.target.value;
      setFields(values);
    }
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i , 1);
    setFields(values);
  }

  const handleDownload = () => {
    let data = localStorage.getItem('persist:views'); 
    if(data !== undefined) { 
      let jsonFile = JSON.parse(data); 
      if(jsonFile.views) {
        let jData = JSON.parse(jsonFile.views);
      var blobConfig = new Blob([JSON.stringify(jData, null, 4)], {
        type: 'application/json;charset=utf-8'
      });
    
      saveAs(blobConfig, "newLayout.json");
      }
    } 
   
  } 
  const onCancelOverlay = () => {
    setIsShowField(false);
    setIsCompoOpen(false)
  }

 function getCategory (...arg) {
    let category = arg.map(row => { 
      return allCategory[row];
    });
    if(category.length > 1) {
      let mergeCat = [...category[0],...category[1]];
      setDisplayCategory(mergeCat);
    } else if(category.length > 0){
      setDisplayCategory(category[0]);
    }
  }

  const getDisplayCategory = (key) => {
    switch(key.name){
        case "Table" : 
          getCategory("Body", "Common");
          break;
        case "Card": 
          getCategory("Container");
          break;
        case "Heading":  
          getCategory("Header");
          break;
        case "HeadingWithPill": 
          getCategory("Header");
          break;
        case "SubHeading": 
          getCategory("Header");
          break;
        case "Button": 
          getCategory("Body");
          break;
        case "Link": 
          getCategory("Summary");
          break;
        case "Typography": 
          getCategory("Summary");
          break;
    }
  }

  let { dataMethod } = component || {};
  return (
    <div className="row justify-content-between">
      <div className="col-2 p-0">
        <h4 className="mb-4 pb-3 border-bottom">Components</h4>
        <div className="row d-flex flex-column">
          {draggableComponents.map((component) => (
            <DraggableComponent
              key={component.id}
              component={component}
              handleDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
      <div className="col-12 col-sm-9">
        <div className="row mb-4 pb-2 border-bottom justify-content-between">
          <h4 className="col p-0">Configuration Screen - {view.name}</h4>
          <div className="col-2 text-end p-0">
            <button className="btn" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className="col-2 text-end p-0">
            <button className="btn" onClick={handleDownload}>
              Download DSL
            </button>
          </div>
        </div>
        <div className="row">
          <ResponsiveReactGridLayout
            className="layout border p-0"
            cols={{ lg: 24 }}
            layouts={{ lg: layout }}
            breakpoints={{ lg: 0 }}
            rowHeight={7}
            compactType={null}
            isDroppable
            onDrop={onDrop}
            onLayoutChange={onLayoutChange}
            droppingItem={droppingItem}
          >
            {layout.map((componentLayout) => (
              <div
                key={componentLayout.i}
                className="card overflow-hidden bg-light justify-content-center align-items-center"
              >
                <span
                  role="button"
                  className="remove position-absolute end-0 p-1 top-0"
                  onClick={() => onRemoveItem(componentLayout.i)}
                >
                  x
                </span>
                <LayoutItemConfig componentLayout={componentLayout} />
              </div>
            ))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
      {isCompoOpen && <>
        <Dialog open={true} >
            <Typography mb={1} variant="h2">{component.name}</Typography>
            <Form stickyFooter={true}  leftSideButtons={<Button onClick={() => onCancelOverlay()}>Cancel</Button>} saveButton={<Button buttonType="primary" onClick={() => onSaveInput()} type="submit">
                  Save
                </Button>}>
             
              <FilterableSelect name="colValue" label="Column Display" onChange={updateInputValue}>
                <Option text="4" value="4" />
                <Option text="6" value="6" />
                <Option text="8" value="8" />
                <Option text="12" value="12" />
              </FilterableSelect>

              <FilterableSelect name="dataMethod" label="Which method you want ?" onChange={ updateInputValue}>
                  <Option text="Dynamic From API" value="api" />
                  <Option text="Static With Dynamic From API" value="staticapi" />
              </FilterableSelect>

              {isShowField === true && cName != "Table" && <Textbox label="Placeholder Value" name="iValue" onChange={(e) => updateInputValue(e)} />}

              {cName == "Button" && <> 
              <FilterableSelect id="controlled" name="buttonType" label="Button Type" onChange={updateInputValue}>
                <Option text="primary" value="primary" />
                <Option text="secondary" value="secondary" />
                <Option text="dashed" value="dashed" />
                <Option text="tertiary" value="tertiary" />
              </FilterableSelect>
              </>}
              {isShowField === false && <> 
              <FilterableSelect id="category" name="dCategory" label="Display Data Category" onChange={updateInputValue}>
                {displayCategory.length > 0 && displayCategory.map(row => <Option text={row.category} value={row} /> )}           
              </FilterableSelect>
              </>}
              {isShowField === true && cName == "Table" && <> 
                <Heading title="Table Header" divider={false} />
                <Textbox name="iValue" onChange={(e) => handleChange("TH" , e)} />
                <Heading title="Table Content" divider={false} />
                {fields.map((field, idx) => {
                  return (
                      <div key={`${field}-${idx}`}>
                      <Textbox
                        type="text"
                        onChange={e => handleChange(idx, e)}
                        inputIcon ="delete"
                        value={field.value}
                        iconOnClick = {() => handleRemove(idx)}
                      />
                      </div>
                  );
                })}

                <Button buttonType="primary" onClick={() => handleAdd()} iconType="add" size="small" ml={2}>
                    Add 
                </Button>
              </>}
            </Form>
          </Dialog>
      </>}
      <div className="sage-fotter" style={{ height : "100px"}}></div>
    </div>
  );
};

export default ConfigurationPage;
