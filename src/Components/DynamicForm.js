import React, { useState } from "react";
import Textbox from "carbon-react/lib/components/textbox";
import Fieldset from "carbon-react/lib/components/fieldset";
import CarbonProvider from "carbon-react/lib/components/carbon-provider";
import Form from "carbon-react/lib/components/form";
import Box from "carbon-react/lib/components/box";
import { FilterableSelect, Option } from "carbon-react/lib/components/select";
import Button from "carbon-react/lib/components/button";
import ButtonToggle from "carbon-react/lib/components/button-toggle";
import ButtonToggleGroup from "carbon-react/lib/components/button-toggle-group";
import DialogAction from './DialogAction';

export default function DynamicForm (props) {
  const [isOpen , setIsOpen] = useState(false);
  const [overlayData , setOverlayData] = useState({});

  const getActionData = (m, rootKey) => {
    let propData = { m , rootKey}
    setOverlayData(propData)
    setIsOpen(true);
  }
  const renderForm = () => {
    let { model, rootKey, onChange, defaultValues } = props;
    //console.info("defaultValues",defaultValues);
    let formUI = model.map(m => {
      let key = m.key;
      let type = m.type || "text";
      let props = m.props || {};
      let name = m.name || m.key;
      let value = m.value;

      let target = key;

      let input = (
      <Textbox 
        {...props}
        className="form-input"
        type={type}
        key={key}
        name={name}
        // value={value}
        label={m.label} labelInline labelWidth={30} 
        onChange={e => {
          onChange(e, target, rootKey, m);
        }}
      />);

      if (type == "radio") {
        input = m.options.map(o => {
          let checked = o.value == value;
          return (
            <React.Fragment key={"fr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                onChange={e => {
                  props.onChange(e, o.name);
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }

      if (type == "select") {
        input = m.options.map(o => {
          let checked = o.value == value;
          //console.log("select: ", o.value, value);
          return (
            <Option 
              {...props}
              className="form-input"
              text={o.key}
              value={o.value}
            />
          );
        });

        //console.log("Select default: ", value);
        input = (
          <FilterableSelect onChange={e => {
              onChange(e, target, rootKey, m);
            }}  label={m.label} labelInline openOnFocus>
          {/* <FilterableSelect label={m.label} labelInline openOnFocus> */}
            {input}
          </FilterableSelect>
        );
      }

      // if (type == "checkbox") {
      //   input = m.options.map(o => {
      //     //let checked = o.value == value;
      //     let checked = false;
      //     if (value && value.length > 0) {
      //       checked = value.indexOf(o.value) > -1 ? true : false;
      //     }
      //     //console.log("Checkbox: ", checked);
      //     return (
      //       <React.Fragment key={"cfr" + o.key}>
      //         <input
      //           {...props}
      //           className="form-input"
      //           type={type}
      //           key={o.key}
      //           name={o.name}
      //           checked={checked}
      //           value={o.value}
      //           onChange={e => {
      //             props.onChange(e, m.key, "multiple");
      //           }}
      //         />
      //         <label key={"ll" + o.key}>{o.label}</label>
      //       </React.Fragment>
      //     );
      //   });

      //   input = <div className="form-group-checkbox">{input}</div>;
      // }

      if(key == "action") {
        return (
          <Box m={1} p={1} >
            <Button onClick={() => getActionData(m, rootKey)}buttonType="tertiary" ml="calc(30% - 24px)">
              {m.label} - Create Button Action
            </Button>
          </Box>
        )
      }

      return (
        <div key={"g" + key} className="form-group">
         <Box m={1} p={1} >
            {input}
          </Box>
        </div>
      );
    });
    return formUI;
  };

  return (
    <>
    <Box m={1} p={1} >
      {isOpen && <DialogAction onChange={props.overlayOnChange} overlayData={overlayData} setIsOpen={setIsOpen}/>}
      {renderForm()}
    </Box>
    </>
  );
}
