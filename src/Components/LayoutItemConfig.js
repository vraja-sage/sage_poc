import React from 'react';
import Button from "carbon-react/lib/components/button";
import { GridContainer, GridItem } from "carbon-react/lib/components/grid";
import {FlatTable,FlatTableHead,FlatTableRow,FlatTableHeader, FlatTableBody, FlatTableCell} from "carbon-react/lib/components/flat-table";
import Pill from "carbon-react/lib/components/pill";
import SplitButton from "carbon-react/lib/components/split-button";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import {
  Card,
  CardRow,
  CardFooter,
  CardColumn,
} from "carbon-react/lib/components/card";
import Typography, {
  List,
  ListItem,
} from "carbon-react/lib/components/typography";
import Heading from "carbon-react/lib/components/heading";

const LayoutItemConfig = ({ componentLayout }) => {
  return (
    <>
      {componentLayout.component && 
      <> 
        <Card >
          <CardRow>
            <CardColumn >
              <Heading title={componentLayout.component.name} divider={false} />
              <Typography fontSize="16px" m={0}>
                {componentLayout.component.props ? componentLayout.component.props.iValue : "No Place Holder"}
                {componentLayout.component.props && componentLayout.component.props.iButtonType ? " | "+componentLayout.component.props.iButtonType: null}
              </Typography>
            </CardColumn>
          </CardRow>
        </Card>
      </>}
    </>
  )
};

export default LayoutItemConfig;
