import React from 'react';
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import Pill from "carbon-react/lib/components/pill";
import SplitButton from "carbon-react/lib/components/split-button";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import Heading from "carbon-react/lib/components/heading";

const LayoutItem = ({ componentLayout }) => {
  return (
    <span className="text">
      {componentLayout.component ? componentLayout.component.name : componentLayout.i}
    </span>
  )
};

export default LayoutItem;
