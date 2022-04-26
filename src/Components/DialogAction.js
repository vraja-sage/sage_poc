import React, { useState } from "react";
import Dialog from "carbon-react/lib/components/dialog";
import Button from "carbon-react/lib/components/button";
import Form from "carbon-react/lib/components/form";
import Typography from "carbon-react/lib/components/typography";
import Textbox from "carbon-react/lib/components/textbox";
import RadioButtonGroup from "carbon-react/lib/components/radio-button";
import RadioButton from "carbon-react/lib/components/radio-button";
import { FilterableSelect, Option } from "carbon-react/lib/components/select";

export default function DialogAction ({ onChange, setIsOpen, overlayData }) {
    let { m , rootKey } = overlayData;
    let { props, key : subKey, label : subLabel } = m;
    console.info("overlayData",overlayData);
    return <>
            
            <Dialog open={true} onCancel={() => setIsOpen(false)} title="Button Actions Data" subtitle="">
              <Form stickyFooter={true} leftSideButtons={<Button onClick={() => setIsOpen(false)}>Cancel</Button>} saveButton={<Button buttonType="primary" onClick={() => setIsOpen(false)}>
                    Save
                  </Button>}>
                  {Object.keys(props).map((rowkey, index) => {
                      let { label, type, options } = props[rowkey];
                      let rowObj = {  rootKey, subKey, rowkey, label, subLabel};
                      if(type === "text") {
                        return (<Textbox 
                          className="form-input"
                          type={type}
                          key={rowkey}
                          // name={name}
                          // value={value}
                          label={label} labelInline labelWidth={30} 
                          onChange={e => {
                            onChange(e, rowObj );
                          }}
                        />)
                      }
                      if(type == "select") {
                        let input = options.map(o => {
                          // let checked = o.value == value;
                          //console.log("select: ", o.value, value);
                          return (
                            <Option 
                              className="form-input"
                              text={o.key}
                              value={o.value}
                            />
                          );
                        });
                        return (
                          <FilterableSelect  onChange={e => {
                            onChange(e, rowObj );
                          }} label={label} labelInline openOnFocus>
                            {input}
                          </FilterableSelect>
                        )
                      }
                    
                  }
                    )}
              </Form>
            </Dialog>
          </>;
  }