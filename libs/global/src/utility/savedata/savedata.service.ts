import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import async from 'async';
import { VerifyTabsService } from 'apps/realtime/src/services/verify-tabs/verify-tabs.service';

@Injectable()
export class SavedataService {
  // Add your methods and logic here
  private counter: number = 0;
  private readonly queue;
  private activeData = new Map<number, { lastUpdate: any, currentPageData: any[]; pageNumber: number }>();
  constructor() {
    this.queue = async.queue(async (task, callback) => {
      // console.log('Task Start')
      try {
        await task();
      } catch (error) {

      }
      // console.log('Task Complete')
      callback();
    }, 1);

    this.queue.drain(() => {
    });
  }

  private getSessionState(nSisid: number, sessions) {
    if (!sessions.has(nSisid)) {
      sessions.set(nSisid, {
        sessionDate: '',
        currentPageData: [],
        pageNumber: 1,
      });
    }
    return sessions.get(nSisid);
  }

  public async saveData(msg: any, sessions, folerName: string, calculatedPage: any, currentSessionLines?: number) {
    // return;

    this.queue.push(async () => {
      await this.saveDataFinal(msg, sessions, folerName, calculatedPage, currentSessionLines);
    });

  }



  async saveDataFinal(msg: any, sessions, folerName: string, calculatedPage: any, currentSessionLines?: number): Promise<boolean> {
    try {
      debugger;
      this.counter++
      console.log(this.counter, 'TCP Data:', msg.p);
      if (!currentSessionLines) {
        currentSessionLines = 25;
      }
      if (!msg || !msg.d || !msg.d.length) return false;
      let sessionState = this.getSessionState(msg.date, sessions);
      if (calculatedPage !== sessionState.pageNumber) {
        debugger;
        await this.writeJSONToFile(sessionState.currentPageData, `./${folerName}/dt_${msg.date}/page_${sessionState.pageNumber}.json`)
        sessionState.currentPageData = await this.readPageData(msg.date, calculatedPage);
        console.log('\n\r\n\rCLEARING OLS DATA for page')
        sessionState.pageNumber = calculatedPage;
      }
      await this.pushDataToArray(msg, sessionState, folerName, currentSessionLines);
    } catch (error) {
      console.error('error at saveData', error);
    }
    return true;
  }

  async saveSessionPageData(data: any, folerName: string, pageNumber: any, sessionId: number) {
    this.queue.push(async () => {
      await this.writeJSONToFile(data, `./${folerName}/dt_${sessionId}/page_${pageNumber}.json`);
    });
  }

  public async saveLostData(data: any, pageNumber: any, sessionId: number) {
    try {
      if (sessionId && data && pageNumber) {
        this.writeJSONToFile(data, `./data/dt_${sessionId}/page_${pageNumber}.json`);
      }
    } catch (error) {
      console.log('error at saveLostData', error);
    }
  }

  async pushDataToArray(msg: any, sessionState: any, folerName: string, currentSessionLines: number): Promise<boolean> {
    try {
      debugger;
      let crLine;
      if (msg.d && msg.d?.length) {

        for (let y of msg.d) {
          if (!y) {
            y = [];
          }
          if (y.length && y[2] !== undefined) {
            let vl: any = (y[2] / currentSessionLines) + 1;
            let tmpPg = parseInt(vl)
            if (tmpPg == sessionState.pageNumber) {
              let vl2: any = ((y[2] % currentSessionLines));
              crLine = parseInt(vl2);

              // try {
              //   const tabs = await this.verifyTab.verify(y[1]);
              //   if (tabs?.length) {
              //     y[7] = tabs;
              //   }
              // } catch (error) {
              //   console.log('error at verifyTab', error);
              // }

              sessionState.currentPageData[crLine] = y;
            }
          }
        }
        try {
          sessionState.currentPageData = Array.from(sessionState.currentPageData, item => item === undefined ? [] : item);
        } catch (error) {
        }

        try {

          if (sessionState.currentPageData.length && sessionState.currentPageData.findIndex(a => a?.length == 0) > -1) {
            debugger;
            console.log('Blank Recorrds')
          }
        } catch (error) {

        }

        await this.writeJSONToFile(sessionState.currentPageData, `./${folerName}/dt_${msg.date}/page_${sessionState.pageNumber}.json`)
      }
    } catch (error) {
    }
    return true;
  }
  /*async pushDataToArray(msg: any, sessionState: any, folderName: string, currentSessionLines: number): Promise<boolean> {
    try {
      let crLine;
      if (msg.d && Array.isArray(msg.d)) {
        for (let y of msg.d) {
          if (!y || y.length < 3) continue; // Validate `y` and ensure it has at least 3 elements.

          let lineIndex = y[2];
          if (lineIndex !== undefined && typeof lineIndex === "number") {
            const tmpPg = Math.ceil(lineIndex / currentSessionLines); // Determine the page number.
            if (tmpPg === sessionState.pageNumber) {
              crLine = lineIndex % currentSessionLines; // Determine the line index within the page.
              sessionState.currentPageData[crLine] = y; // Assign data to the calculated line index.
            }
          }
        }

        // Replace undefined entries in currentPageData with empty arrays.
        sessionState.currentPageData = Array.from(sessionState.currentPageData || [], (item) =>
          item === undefined ? [] : item
        );

        // Optional: Debugging check for empty entries.
        const emptyIndex = sessionState.currentPageData.findIndex((a) => Array.isArray(a) && a.length === 0);
        if (emptyIndex > -1) {
          console.warn(`Empty entry found at index: ${emptyIndex}`);
        }

        // Save the data to a file.
        const filePath = `./${folderName}/dt_${msg.date}/page_${sessionState.pageNumber}.json`;
        await this.writeJSONToFile(sessionState.currentPageData, filePath);
      }
    } catch (error) {
      console.error('Error in pushDataToArray:', error); // Log any errors.
      return false; // Indicate failure.
    }

    return true; // Indicate success.
  }*/
  async writeJSONToFile(obj, filePath): Promise<boolean> {
    try {
      const fullPath = path.resolve(filePath);
      const dirPath = path.dirname(fullPath);
      await fs.mkdir(dirPath, { recursive: true });
      const jsonData = JSON.stringify(obj, null, 2);
      await fs.writeFile(fullPath, jsonData);
      // console.log("JSON successfully written to", fullPath);
    } catch (err) {
      console.error("Error writing file:", err);
    }
    return true;
  }



  convertToFrame(timestamp) {
    try {
      // console.log(timestamp);
      if (!timestamp) return '';
      // Convert the timestamp into frames (assuming 30 frames per second)
      const [hours, minutes, seconds, frames] = timestamp.split(':').map(Number);
      return ((hours * 3600 + minutes * 60 + seconds) * 30) + frames;
    } catch (error) {
      return ''
    }
  }

  removeTimestampsInRange(timestamps, range) {
    const [startRange, endRange] = range.map(this.convertToFrame);

    return timestamps.filter(([timestamp]) => {
      const currentFrame = this.convertToFrame(timestamp);
      return currentFrame < startRange || currentFrame > endRange;
    });
  }

  convertAsciiToVisibleString(asciiArray: number[]): string {
    return asciiArray.map(code => {
      if (code === 17)
        return '&emsp;'; // Using a right arrow tab symbol as a placeholder
      return String.fromCharCode(code);
    }).join('');
  }

  saveLiveFeedData(msg, sessions, folder) {
    this.queue.push(async () => {
      await this.addLiveFeedData(msg, sessions, folder);
    });
  }




  async addLiveFeedData(res, sessions, folder): Promise<boolean> {
    let formattedData
    try {
      const parsedData = res.d || [];
      // formattedData = parsedData.map((item: any) => ({
      //   time: item[0] || '',
      //   asciiValue: item[1] || [],
      //   lines: [this.convertAsciiToVisibleString(item[1] || [])], // Convert ASCII values to text
      //   lineIndex: item[2] || 0,
      //   formate: item[3] || 'FL'
      // }));
      formattedData = parsedData.map((item: any) => ([item[0] || "00:00:00:00", item[1] || [], item[2], item[3], item[4], item[5], item[6]]));

    } catch (error) {
      console.log(error);
    }
    try {
      formattedData = formattedData || [];
      formattedData = formattedData.filter(a => a[2] > -1)
    } catch (error) {
      console.log(error);
    }
    await this.updateFeedData(formattedData, res);
    return true;
  }



  async updateFeedData(formattedData, res): Promise<boolean> {


    try {

      for (let item of formattedData) {
        const lineNo = 25;
        const pageIndex = Math.floor(item[2] / lineNo);
        const lineIndex = item[2] % lineNo;



        // let storeData = await this.readPageData(res.date, pageIndex + 1);
        let storeData = await this.getActiveValue(res.date, pageIndex + 1);
        if (!storeData) {
          storeData = []
        }


        let page = storeData;
        page[lineIndex] = item;


        try {
          if (page.includes(undefined)) {
            page = Array.from(page, (item, index) => item === undefined ? [
              '00:00:00:00',
              [],
              index
            ] : item);
          }
        } catch (error) {
          console.log(error);

        }


        this.setActiveVaue(res.date, pageIndex + 1, page);

        await this.writeJSONToFile(page, `./data/dt_${res.date}/page_${pageIndex + 1}.json`);

      }


    } catch (error) {
      console.log(error);
    }




    return true;
  }


  ////// REFRESH 


  public async saveRefresh(msg: any, sessions) {

    this.queue.push(async () => {
      await this.saveRefreshData(msg, sessions);
    });
  }

  async saveRefreshData(msg, sessions): Promise<boolean> {
    try {
      // this.counter++
      // console.log(this.counter, 'TCP Refresh Data:');
      const alldata = await this.readSessionJson(msg, sessions);

      let newData = this.removeTimestampsInRange(alldata, [msg.start, msg.end]);

      if (msg.newLines && msg.newLines.length) {
        newData.push(...msg.newLines);
      }

      // let sessionState = this.getSessionState(msg.date, sessions);

      try {
        newData = newData.sort((a, b) => {
          return this.convertToFrame(a[0]) - this.convertToFrame(b[0]);
        });
      } catch (error) {
        console.error(error);
      }
      const pages = [];
      const totalPagges = Math.floor(newData.length / (25)) + 1;
      for (let i = 0; totalPagges > i; i++) {
        const pageData = newData.slice(i * 25, (i + 1) * 25);
        // savePageData toLocal
        await this.writeJSONToFile(pageData, `./data/dt_${msg.nSesid}/page_${(i + 1)}.json`);
        try {
          if (this.currentActivePage(msg.nSesid) == ((i + 1))) {
            this.setActiveVaue(msg.nSesid, (i + 1), pageData);
            // this.deleteActiveValue(msg.nSesid)
          }
        } catch (error) {
        }

      }

    } catch (error) {
      console.log(error);
    }

    return true;
  }

  async readSessionJson(msg, sessions): Promise<any[]> {
    const directoryPath = `./data/dt_${msg.nSesid}`; // Adjust path as needed
    const combinedData = [];
    try {
      // Read all files in the directory
      const files = await fs.readdir(directoryPath);

      // Filter only JSON files
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      // const jsonFiles = files
      //   // .filter(file => file.endsWith('.json'))
      //   .sort((a, b) => {
      //     const pageA = parseInt(a.match(/page_(\d+)\.json/)?.[1] || '0', 10);
      //     const pageB = parseInt(b.match(/page_(\d+)\.json/)?.[1] || '0', 10);
      //     return pageA - pageB;
      //   });



      for (const file of jsonFiles) {
        const filePath = path.join(directoryPath, file);

        // Read the JSON file content
        const fileContent = await fs.readFile(filePath, 'utf8');

        // Parse and combine the JSON data
        combinedData.push(...JSON.parse(fileContent));
      }

      return combinedData; // Return combined JSON data
    } catch (error) {
      console.log(error);
      return []
    }

  }


  /*
    async saveRefreshData(msg, sessions): Promise<boolean> {
      try {
        console.log('REFRESH REC', msg.startPage)
        const startPage = (msg.startPage > 0) ? (msg.startPage) : 1
        const alldata = await this.readSessionJson(msg, sessions, startPage);
  
        let newData = this.removeTimestampsInRange(alldata, [msg.start, msg.end]);
  
        if (msg.newLines && msg.newLines.length) {
          newData.push(...msg.newLines);
        }
  
        // let sessionState = this.getSessionState(msg.date, sessions);
  
        try {
          newData = newData.sort((a, b) => {
            return this.convertToFrame(a[0]) - this.convertToFrame(b[0]);
          });
        } catch (error) {
          console.error(error);
        }
        const pages = [];
        const totalPagges = Math.floor(newData.length / (25)) + 1;
        for (let i = 0; totalPagges > i; i++) {
          const pg = startPage + (i);
          console.log('REFRESHING PAGE', pg)
          const pageData = newData.slice(i * 25, (i + 1) * 25);
          // savePageData toLocal
          await this.writeJSONToFile(pageData, `./data/dt_${msg.nSesid}/page_${pg}.json`);
          try {
            if (this.currentActivePage(msg.nSesid) == (pg)) {
              this.setActiveVaue(msg.nSesid, pg, pageData);
              // this.deleteActiveValue(msg.nSesid)
            }
          } catch (error) {
          }
  
        }
  
      } catch (error) {
        console.log(error);
      }
  
      return true;
    }
  
    async readSessionJson(msg, sessions, startPage: number): Promise<any[]> {
      const directoryPath = `./data/dt_${msg.nSesid}`; // Adjust path as needed
      const combinedData = [];
      try {
        // Read all files in the directory
        const files = await fs.readdir(directoryPath);
  
        // Filter only JSON files
        // const jsonFiles = files.filter(file => file.endsWith('.json'));
        const jsonFiles = files
          // .filter(file => file.endsWith('.json'))
          .sort((a, b) => {
            // Extract page numbers and sort numerically
            const pageA = parseInt(a.match(/page_(\d+)\.json/)?.[1] || '0', 10);
            const pageB = parseInt(b.match(/page_(\d+)\.json/)?.[1] || '0', 10);
            return pageA - pageB;
          });
  
        const filteredFiles = jsonFiles.filter(file => {
          const pageNumber = parseInt(file.match(/page_(\d+)\.json/)?.[1] || '0', 10);
          return pageNumber >= startPage;
        });
        console.log('FILTERD LENGTH', filteredFiles.length)
  
        for (const file of filteredFiles) {
          const filePath = path.join(directoryPath, file);
  
          // Read the JSON file content
          const fileContent = await fs.readFile(filePath, 'utf8');
  
          // Parse and combine the JSON data
          combinedData.push(...JSON.parse(fileContent));
        }
  
        return combinedData; // Return combined JSON data
      } catch (error) {
        console.log(error);
        return []
      }
  
    }
  
  */


  async readPageData(sessionId, pageno): Promise<any> {
    try {
      const filePath = `./data/dt_${sessionId}/page_${pageno}.json`;
      const fileContent = await fs.readFile(filePath, 'utf8');
      return JSON.parse(fileContent) || [];
    } catch (error) {
    }
    return [];
  }


  ////////////////// SET ACTIVE


  setActiveVaue(sessionId: number, pageNumber: number, data: any) {
    this.activeData.set(sessionId, {
      lastUpdate: new Date(),
      currentPageData: data,
      pageNumber: pageNumber,
    });
  }

  async getActiveValue(sessionId: number, pageNumber: number): Promise<any[]> {
    if (this.activeData.has(sessionId)) {
      const page = this.activeData.get(sessionId);
      if (page) {
        if (page.pageNumber == pageNumber) {
          return page?.currentPageData || [];
        }
      }
    }
    return await this.readPageData(sessionId, pageNumber);
  }

  deleteActiveValue(sessionId: number) {
    this.activeData.delete(sessionId);
  }


  currentActivePage(sessionId: number) {
    if (this.activeData.has(sessionId)) {
      const page = this.activeData.get(sessionId);
      return page?.pageNumber || 0;
    }
    return 0
  }

}