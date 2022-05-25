[
    {
     "id": "1",
     "name": "MainLayout",
     "componentLayout": {
      "Heading_1652935656": {
       "id": 1,
       "type": "Heading",
       "props": {
        "colValue": "6",
        "dataMethod": "api"
       }
      },
      "Heading_1652935657": {
       "id": 1,
       "type": "Heading",
       "props": {
           "colValue": "6",
           "data": { "header" : "Quarter 2 Right" }
       }
      },
      "HeadingWithPill_1652935658": {
       "id": 2,
       "type": "HeadingWithPill",
       "props": {
           "data": {
               "header" : "26 April - 4 July 2022",
               "pills" : "In Progress"
           }
       }
       },
      "Card_1652935660": {
       "id": 4,
       "type": "Card",
       "props": {
           "colValue": "6",
           "data": { 
               "header" : "WonderLand Cakes",  
               "listOne" : "National Insurance Number: #NINO",
               "listTwo" : "Cash basic",
               "listThree" : "Sole trader"
           }
       }
       },
      "Card_1652935674": {
       "id": 4,
       "type": "Card",
       "props": {
           "colValue": "6",
           "data": { 
               "header" : "Due in #days days",  
               "listOne" : "Submission deadline 4 August 2022"
           },
           "grid": {
               "justifySelf": "end",
               "alignSelf": "end"
           }
       }
      },
      "Table_1652935684": {
       "id": 5,
       "type": "Table",
       "props": {
        "colValue": "12",
        "tableHeader": [ 
           { "label" : "Business Income" },
           { "label" :  "" }
       ],
        "tableContent": [
         {
               "value" : [ "Construction Industry", "#TBI1" ]
         },
         {
               "value": [ "Wages, Salaries", "#TBI2" ]
         },
         {
               "value" : [ "Total net Profit", "#TBI3" ]
         }
        ]
       }
      },
      "Table_1652935699": {
       "id": 5,
       "type": "Table",
       "props": {
        "colValue": "12",
        "tableHeader": [ 
           { "label" :  "Business Expenses" }, 
           { "label" :  "Total Expenses" }, 
           { "label" :  "Total disallowable" }
       ],
        "tableContent": [
         {
           "value" : ["Construction Industry", "#TE2", "#TD2" ],
           "props": {
               "layoutId": 2
           }
         },
         {
               "value": [ "Wages, Salaries", "#TE3" , "#TD3" ],
               "props": {
                   "layoutId": 2
               }
         },
         {
               "value": ["Car,Van and travel expenses" , "#TE4",  "#TD4"]
         },
         {
               "value": ["Rent , power costs", "#TE5", "#TD5"]
         },
         {
               "value": ["Phone, fax, office costs", "#TE6", "#TD6"]
         },
         {
               "value": ["Total expenses", "#TE7", "#TD7"]
         }
        ]
       }
      },
      "Table_1652935711": {
       "id": 5,
       "type": "Table",
       "props": {
       "colValue": "12",
       "tableHeader": [
            { "label" :  "Net Profit or loss" },
            { "label" :  "" }
           ],
        "tableContent": [
         {
          "value": [ "Total net Profit",  "#TNP" ]
         }
        ]
       }
      },
      "Button_1652935734": {
       "id": 6,
       "type": "Button",
       "props": {
        "data": "Save",
        "colValue": "12",
        "buttonType": "primary",
        "size": "small"
       }
      }
     }
    },
    {
     "id": "2",
     "name": "SubLayout",
     "componentLayout": {
      "Heading_1652935701": {
       "id": 1,
       "type": "Heading",
       "props": {
        "colValue": "12",
        "dataMethod": "api"
       }
      },
      "HeadingWithPill_1652935708": {
       "id": 2,
       "type": "HeadingWithPill",
       "props": {
        "colValue": "12",
        "dataMethod": "api"
       }
      },
      "Card_1652935711": {
       "id": 4,
       "type": "Card",
       "props": {
        "colValue": "6",
        "dataMethod": "api"
       }
      },
      "Card_1652935716": {
       "id": 4,
       "type": "Card",
       "props": {
        "colValue": "6",
        "dataMethod": "api"
       }
      },
      "Table_1652935719": {
       "id": 5,
       "type": "Table",
       "props": {
        "dataMethod": "api",
        "colValue": "12"
       }
      },
      "Button_1652935721": {
       "id": 6,
       "type": "Button",
       "props": {
        "colValue": "12",
        "value": "Save",
        "buttonType": "primary"
       }
      }
     }
    }
   ]