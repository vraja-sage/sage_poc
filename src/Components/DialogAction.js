import React, { useState } from "react";
import Dialog from "carbon-react/lib/components/dialog";
import Button from "carbon-react/lib/components/button";
import Form from "carbon-react/lib/components/form";
import Typography from "carbon-react/lib/components/typography";
import Textbox from "carbon-react/lib/components/textbox";
import RadioButtonGroup from "carbon-react/lib/components/radio-button";
import RadioButton from "carbon-react/lib/components/radio-button";
import { FilterableSelect, Option } from "carbon-react/lib/components/select";

export default function DialogAction ({ isOpen, setIsOpen, overlayData }) {
  
    return <>
            
            <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Button Actions Data" subtitle="">
              <Form stickyFooter={true} leftSideButtons={<Button onClick={() => setIsOpen(false)}>Cancel</Button>} saveButton={<Button buttonType="primary" type="submit">
                    Save
                  </Button>}>
                  {Object.keys(overlayData).map((key, index) => {
                      let { label, type, options } = overlayData[key];
                      if(type === "text") {
                        return (<Textbox 
                          className="form-input"
                          type={type}
                          key={key}
                          // name={name}
                          // value={value}
                          label={label} labelInline labelWidth={30} 
                          // onChange={e => {
                          //   props.onChange(e, target);
                          // }}
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
                          // <RadioButtonGroup name="inline-group" onChange={() => console.log("change")} legend={label} inline ml="10">
                          //   <RadioButton id="inline-radio-1" value="radio1" label="Yes" />
                          //   <RadioButton id="inline-radio-2" value="radio2" label="No" />
                          // </RadioButtonGroup>
                          <FilterableSelect label={label} labelInline openOnFocus>
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