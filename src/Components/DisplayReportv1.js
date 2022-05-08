import React, { useCallback, useMemo, useState } from 'react';
import { Pencil } from 'react-bootstrap-icons';
import { Responsive, WidthProvider } from "react-grid-layout";
import { Link } from 'react-router-dom';
import LayoutItemData from './LayoutItemData';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const rowHeights = { lg: 5, md: 3, sm: 2, xs: 1 };
const cols = { lg: 24, md: 24, sm: 24, xs: 24 };
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 };

const DisplayReport = ({ view, apiResponse }) => {
  const staticView = useMemo(() => view.componentLayout.map(layout => ({ ...layout, static: true })), [view.componentLayout]);

  const [height, setHeight] = useState(rowHeights.lg);

  const onBreakpointChange = useCallback((newBreakpoint) => {
    setHeight(rowHeights[newBreakpoint])
  }, [setHeight]);

  console.info("staticView",staticView);
  return (
    <>
          {view.name}

          <ResponsiveReactGridLayout
            className="layout border"
            cols={cols}
            layouts={{ lg: staticView }}
            breakpoints={breakpoints}
            rowHeight={height}
            onBreakpointChange={onBreakpointChange}
            measureBeforeMount={false}
          >
            {
              staticView.map(componentLayout => (
                <div key={componentLayout.i} className="static card overflow-hidden bg-light justify-content-center align-items-center">
                  <LayoutItemData componentLayout={componentLayout} apiResponse={apiResponse} />
                </div>
              ))
            }
          </ResponsiveReactGridLayout>
    </>
  )
};

export default DisplayReport;
