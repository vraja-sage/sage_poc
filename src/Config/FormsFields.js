export const FormFields = [
  { key: "reportHeader", label: "Report Header",  type: "text", props: { required: true } },
  { key: "date", label: "date", type: "text" },
  {
    key: "reportStatus",
    label: "Report Status",
    type: "select",
    value: "InProgress",
    options: [
      { key: "InProgress", label: "InProgress", value: "InProgress" },
      { key: "Completed", label: "Completed", value: "Completed" },
      { key: "Pending", label: "Pending", value: "Pending" }
    ]
  },
  { key: "reportTitle", label: "Title", type: "text" },
  { key: "nationalIN", label: "National Insurance Number", type: "text" },
  { key: "extraData", label: "More Data", type: "text" },
  { key: "dueIn", label: "Due In", type: "text" },
  { key: "sDeadline", label: "Submission deadline", type: "text" },
  { 
    key: "action", label: "Submit update to HMRC", type: "overLay",  
    props: { 
      pre : "",
      post : "",
      actionAPI : "",
      isValidationNeed : ""
    }
  },
  // {
  //   key: "rating",
  //   label: "Rating",
  //   type: "number",
  //   props: { min: 0, max: 5 }
  // },
  // {
  //   key: "gender",
  //   label: "Gender",
  //   type: "radio",
  //   options: [
  //     { key: "male", label: "Male", name: "gender", value: "male" },
  //     {
  //       key: "female",
  //       label: "Female",
  //       name: "gender",
  //       value: "female"
  //     }
  //   ]
  // },
  // { key: "qualification", label: "Qualification" },
  // {
  //   key: "city",
  //   label: "City",
  //   type: "select",
  //   value: "Kerala",
  //   options: [
  //     { key: "mumbai", label: "Mumbai", value: "Mumbai" },
  //     { key: "bangalore", label: "Bangalore", value: "Bangalore" },
  //     { key: "kerala", label: "Kerala", value: "Kerala" }
  //   ]
  // },
  // {
  //   key: "skills",
  //   label: "Skills",
  //   type: "checkbox",
  //   options: [
  //     { key: "reactjs", label: "ReactJS", value: "reactjs" },
  //     { key: "angular", label: "Angular", value: "angular" },
  //     { key: "vuejs", label: "VueJS", value: "vuejs" }
  //   ]
  // }
]