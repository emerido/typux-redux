import { Dispatch } from "react-redux";
export declare function attachAction<T extends Function>(dispatch: Dispatch<any>, action: T): T;
export declare const ACTION: symbol;
export declare const Action: (name: string) => ClassDecorator;
export declare function getActionName(type: any): any;
export declare function getActionMessage(name: string): Function;
