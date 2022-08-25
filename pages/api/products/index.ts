import extractSheets from "spreadsheet-to-json"
import { GoogleSpreadsheet } from 'google-spreadsheet'


const doc = new GoogleSpreadsheet(process.env.SHEET_ID);




//within the get: 
extractSheets(
    {
      // your google spreadhsheet key
      spreadsheetKey: "abch54Ah75feBqKGiUjITgE9876Ypb0yE-abc",
      // your google oauth2 credentials or API_KEY
      credentials: require("./google-generated-creds.json"),
      // optional: names of the sheets you want to extract
      sheetsToExtract: ["Customers", "Invoices"],
      // optional: custom function to parse the cells
      formatCell: formatCell
    },
    function(err, data) {
      console.log("Customers: ", data.Customers);
      console.log("Invoices: ", data.Invoices);
    }
  )