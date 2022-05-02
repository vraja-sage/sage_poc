import { find as _find } from "lodash";
import React, { useCallback, useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectors, setLayoutView } from "../app/reducer";
import DraggableComponent from "./DraggableComponent";
import LayoutItem from "./LayoutItem";

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

  const onDrop = useCallback(
    (layouts, item, e) => {
      setlayout((prev) =>
        mapLayout(prev, layouts).concat({
          ...item,
          i: new Date().getTime().toString(),
          component,
          isDraggable: undefined
        })
      );
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
                <LayoutItem componentLayout={componentLayout} />
              </div>
            ))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
