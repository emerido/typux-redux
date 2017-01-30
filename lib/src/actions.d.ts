import { Dispatch } from "react-redux";
export declare function attachAction<T extends Function>(dispatch: Dispatch<any>, action: T): T;
