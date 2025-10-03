export class SessionManager {
  /*
    // private sessionData = new Map<number, { data: sessionData[]; }>();
    private sessionData = new Map<number, Map<number, any[]>>();
    //methods
    hasPage = (session: number, page: number): boolean => !!(this.sessionData[session] && this.sessionData[session][page]);
    getPageData = (session: number, page: number): any[] | null => {
      return this.sessionData[session]?.[page] || [];
    }
    setPageData = (session: number, page: number, data: any[]): void => {
      if (!this.sessionData.has(session)) {
        this.sessionData.set(session, new Map());
      }
      const sessionPages = this.sessionData.get(session)!;
      sessionPages.set(page, data);
    };*/

  private sessionData: { [session: number]: { [page: number]: any[] } } = {};

  // Check if a specific session and page exist
  hasPage = (session: number, page: number): boolean => {
    try {
      return !!(this.sessionData[session] && this.sessionData[session][page]);
    } catch (error) {
      console.error("Error in hasPage:", error);
      return false;
    }
  };

  // Check if a session exists
  hasSession = (session: number): boolean => {
    try {
      return !!(this.sessionData[session]);
    } catch (error) {
      return false;
    }
  }

  // Retrieve data for a specific session and page
  getPageData = (session: number, page: number): any[] | null => {
    try {
      return this.sessionData[session]?.[page] || [];
    } catch (error) {
      console.error("Error in getPageData:", error);
      return null;
    }
  };

  // Set data for a specific session and page
  setPageData = (session: number, page: number, data: any[]): void => {
    try {
      this.sessionData[session] = this.sessionData[session] || {}; // Ensure session exists
      this.sessionData[session][page] = data; // Set the page data
    } catch (error) {
      console.error("Error in setPageData:", error);
    }
  };



  // Retrieve all data for a specific session
  getSessionData = (session: number): { [page: number]: any[] } | null => {
    try {
      return this.sessionData[session] || [];
    } catch (error) {
      console.error("Error in getSessionData:", error);
      return null;
    }
  };



  // Delete a specific page from a session
  deletePageData = (session: number, page: number): boolean => {
    try {
      if (page === -1) {
        // Clear all pages for the session
        delete this.sessionData[session];
        return true;
      }
      if (this.sessionData[session]?.[page]) {
        delete this.sessionData[session][page]; // Remove the page
        // Cleanup empty sessions
        if (Object.keys(this.sessionData[session]).length === 0) {
          delete this.sessionData[session];
        }
        return true; // Page successfully deleted
      }
      return false; // Page does not exist
    } catch (error) {
      console.error("Error in deletePageData:", error);
      return false;
    }
  };

}
