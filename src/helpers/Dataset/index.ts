import fetch from 'unfetch';
import {DataviewRequest, DataviewResponse } from "./dataview.js";

// be wrapped by the framework wrappers
export class DatasetLoader {
    // options class???
    constructor(
      datasetQuery: DatasetQuery, datasetOptions: DatasetOptions) {
       new DatasetLoaderCoreCreater(datasetQuery, datasetOptions);
    }
  }
  
  export class DatasetLoaderCoreCreater {
    public dataset: Dataset = new Dataset;
    private datasetQuery: DatasetQuery;
    private datasetOptions: DatasetOptions;
    public constructor( 
      datasetQuery: DatasetQuery, 
      datasetOptions: DatasetOptions) {
        this.datasetQuery = datasetQuery;
        this.datasetOptions = datasetOptions;
    }

    public load() : Promise<DataviewResponse> {
      return this.get();
    }
  
    // call read service and get the data by datasource name
    private get() : Promise<DataviewResponse> 
    {
        return new Promise((resolve) => {

          fetch(this.datasetOptions.readServiceUrl,
            {
              //mode: "cors",
              method: "post",
              headers: {
                'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(
              {
                dataviews: this.datasetQuery.dataviewRequests
              }
            )
          })
          .then((res: { json: () => any; }) => res.json()).then((data: DataviewResponse) => {
            console.log(data);
            resolve(data as DataviewResponse)
          })
        });
    }
  }
  
  export class DatasetQuery {
    useMockData: boolean = false;
    dataviewRequests: DataviewRequest[] = [];
  }
  
  export class DatasetOptions {
    readServiceUrl: string = '';
  }
  
  export class Dataset {
    name: string = '';
    tables: Array<DataTable> = [];
  }
  
  export class DataTable {
    tableName: string;
    dataColumns: Array<DataColumn>;
    dataRows: Array<string>;
    constructor(tableName: string, dataColumns: Array<DataColumn>, dataRows: Array<string>) {
      this.tableName = tableName;
      this.dataColumns = dataColumns;
      this.dataRows = dataRows;
    }
  }
  
  export class DataColumn {
    columnName: string;
    caption: string = '';
    ordinal: number = 0;
    defaultValue: string = '';
    constructor(columnName: string) {
      this.columnName = columnName;
    }
  }