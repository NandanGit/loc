export interface Loc {
  /** 
   * English
   */
  headerEnglish: string;

  /** 
   * Spanish
   */
  headerSpanish: string;

  /** 
   * French
   */
  headerFrench: string;

  /** 
   * Learn React
   */
  bodyLearnReact: string;

  /** 
   * Edit {filename} and save to reload.
   */
  bodyEditAndSave: (filename: string) => string;

  /** 
   * Know More
   */
  bodyKnowMore: string;
}