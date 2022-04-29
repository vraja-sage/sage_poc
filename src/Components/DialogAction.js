import React, { useState } from "react";
import Dialog from "carbon-react/lib/components/dialog";
import Button from "carbon-react/lib/components/button";
import Form from "carbon-react/lib/components/form";
import Typography from "carbon-react/lib/components/typography";
import Textbox from "carbon-react/lib/components/textbox";
import { FilterableSelect, Option } from "carbon-react/lib/components/select";

export default function DialogAction ({ onChange, setIsOpen, overlayData }) {
    let { m , rootKey, type } = overlayData;
  
    let { props, key : subKey, label : subLabel } = m;

    let title = type === "action" ? "Button Actions Data" : "Table Header Definition";
    const [fields, setFields] = useState([{ value: null }]);

    function handleChange(i, event) {
      const values = [...fields];
      values[i].value = event.target.value;
      setFields(values);
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

    const saveData = () => {
      type === "section" && onChange(fields, overlayData );
      setIsOpen(false);
    } 
    return <>
            
            <Dialog open={true} onCancel={() => setIsOpen(false)} title={title} subtitle="">
              <Form stickyFooter={true} leftSideButtons={<Button onClick={() => setIsOpen(false)}>Cancel</Button>} saveButton={<Button buttonType="primary" onClick={() => saveData()}>
                    Save
                  </Button>}>
                    {(type === "action") ? <> {Object.keys(props).map((rowkey, index) => {
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
                    
                    })}</> : 
                      <>
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
                      </>
                    }
              </Form>
            </Dialog>
          </>;
  }