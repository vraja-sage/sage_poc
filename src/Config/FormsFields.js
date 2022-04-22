export const FormFields = {
  PageHeader : [],
  PageTitle : [
    // {
    //   key: "Component",
    //   label: "Carbon Component",
    //   type: "select",
    //   value: "h1",
    //   options: [
    //     { key: "h1", label: "h1", value: "h1" },
    //     { key: "h2", label: "h2", value: "h2" },
    //   ]
    // },
    {
      key: "gridLevel",
      label: "Grid Level",
      type: "select",
      value: "2",
      options: [
        { key: "2", label: "2", value: "2" },
        { key: "4", label: "4", value: "4" },
        { key: "6", label: "6", value: "6" },
        { key: "8", label: "8", value: "8" },
        { key: "10", label: "10", value: "10" },
        { key: "12", label: "12", value: "12" }
      ]
    },
    { key: "reportHeader", label: "Report Header",  type: "text", props: { required: true } },
    { key: "date", label: "Date", type: "text" },
    {
      key: "reportStatus",
      label: "Report Status",
      type: "select",
      value: "Open",
      options: [
        { key: "InProgress", label: "InProgress", value: "InProgress" },
        { key: "Completed", label: "Completed", value: "Completed" },
        { key: "Open", label: "Open", value: "Open" }
      ]
    },
  ],
  Reportcontainer : [
    // {
    //   key: "Component",
    //   label: "Carbon Component",
    //   type: "select",
    //   value: "h1",
    //   options: [
    //     { key: "h1", label: "h1", value: "h1" },
    //     { key: "h2", label: "h2", value: "h2" },
    //   ]
    // },
    {
      key: "gridLevel",
      label: "Grid Level",
      type: "select",
      value: "2",
      options: [
        { key: "2", label: "2", value: "2" },
        { key: "4", label: "4", value: "4" },
        { key: "6", label: "6", value: "6" },
        { key: "8", label: "8", value: "8" },
        { key: "10", label: "10", value: "10" },
        { key: "12", label: "12", value: "12" }
      ]
    },
    { key: "reportTitle", label: "Title", type: "text" },
    { key: "nationalIN", label: "National Insurance Number", type: "text" },
    { key: "extraData", label: "More Data", type: "text" },
    { key: "dueIn", label: "Due In", type: "text" },
    { key: "sDeadline", label: "Submission deadline", type: "text" },
    { 
      key: "action", label: "Submit update to HMRC", type: "button", value : "Open",  
      props: {
        pre :  { key: "preAction", label: "Pre Action", type: "text" },
        post :  { key: "postAction", label: "Post Action", type: "text" },
        actionAPI :  { key: "actionAPI", label: "Action API", type: "text" },
        isValidationNeed : {
          key: "isValidationNeed",
          label: "Is Validation Need",
          type: "select",
          value: "No",
          options: [
            { key: "Yes", label: "Yes", value: "Yes" },
            { key: "No", label: "No", value: "NO" },
          ]
        },
      }
    },
  ],
  // ReportHeader : [],
  ReportBody : [
    // {
    //   key: "Component",
    //   label: "Carbon Component",
    //   type: "select",
    //   value: "table",
    //   options: [
    //     { key: "table", label: "table", value: "table" },
    //   ]
    // },
    {
      key: "gridLevel",
      label: "Grid Level",
      type: "select",
      value: "2",
      options: [
        { key: "2", label: "2", value: "2" },
        { key: "4", label: "4", value: "4" },
        { key: "6", label: "6", value: "6" },
        { key: "8", label: "8", value: "8" },
        { key: "10", label: "10", value: "10" },
        { key: "12", label: "12", value: "12" }
      ]
    },
    { key: "apiURL", label: "API URL", type: "text" },
  ],
  // "ReportSummary" : [],
  // "ReportActions" : [],
  // "PageFotter" : []
};