import React, { useState } from "react";

export default function DynamicForm (props) {
  const [ rowField , setRowField] = useState({});

  const onSubmit = e => {
    e.preventDefault();
    if (props.onSubmit) props.onSubmit(rowField);
  };

  const onChange = (e, key, type = "single") => {
    console.log(rowField, `${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      setRowField({...rowField , [key]: e.target.value });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      // let found = rowField[key]
      //   ? rowField[key].find(d => d === e.target.value)
      //   : false;

      // if (found) {
      //   let data = rowField[key].filter(d => {
      //     return d !== found;
      //   });
      //   setRowField({
      //     [key]: data
      //   });
      // } else {
        console.log("found", key, rowField[key]);
        // setRowField({
        //   [key]: [e.target.value, ...rowField[key]]
        // });
        let others = rowField[key] ? [...rowField[key]] : [];
        setRowField({
          [key]: [e.target.value, ...others]
        });
      //}
    }
  };

  const renderForm = () => {
    let model = props.model;
    let defaultValues = props.defaultValues;

    let formUI = model.map(m => {
      let key = m.key;
      let type = m.type || "text";
      let props = m.props || {};
      let name = m.name || m.key;
      let value = m.value;

      let target = key;
      value = rowField[target] || "";

      let input = (
        <input
          {...props}
          className="form-input"
          type={type}
          key={key}
          name={name}
          value={value}
          onChange={e => {
            onChange(e, target);
          }}
        />
      );

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
                  onChange(e, o.name);
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
            <option
              {...props}
              className="form-input"
              key={o.key}
              value={o.value}
            >
              {o.value}
            </option>
          );
        });

        //console.log("Select default: ", value);
        input = (
          <select
            value={value}
            onChange={e => {
              onChange(e, m.key);
            }}
          >
            {input}
          </select>
        );
      }

      if (type == "checkbox") {
        input = m.options.map(o => {
          //let checked = o.value == value;
          let checked = false;
          if (value && value.length > 0) {
            checked = value.indexOf(o.value) > -1 ? true : false;
          }
          //console.log("Checkbox: ", checked);
          return (
            <React.Fragment key={"cfr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                onChange={e => {
                  onChange(e, m.key, "multiple");
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });

        input = <div className="form-group-checkbox">{input}</div>;
      }

      return (
        <div key={"g" + key} className="form-group">
          <label className="form-label" key={"l" + key} htmlFor={key}>
            {m.label}
          </label>
          {input}
        </div>
      );
    });
    return formUI;
  };


  let title = props.title || "SAGE Report Data";

  return (
    <div className={props.className}>
      <h3 className="form-title">{title}</h3>
      <form
        className="dynamic-form"
        onSubmit={e => {
          onSubmit(e);
        }}
      >
        {renderForm()}
        <div className="form-actions">
          <button type="submit">Create Layout</button>
        </div>
      </form>
    </div>
  );
}
