import { AppThunk } from "../../apiActions/interface";

export interface DropdownState {
  state: string | null; 
  areaBlock: string | null; 
  suburb: string | null; 
  status: string | null; 
  }

  export interface DropdownItem {
    label: string;
    value: string;
  }


  export interface DropdownConfig {
    name: string;
    placeholder: string;
    action?: (stateId: any) => AppThunk; 
    items?: DropdownItem[]; 
  }
  

 export interface DropdownItemVal {
    label: string;
    value: string;
  }
  


  export interface CustomDropdownProps {
    name: keyof DropdownState; // This should match the keys of DropdownState
    placeholder: string;
    zIndex: number;
  }