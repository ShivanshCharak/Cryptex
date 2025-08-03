import { UTCTimestamp } from "lightweight-charts";

export enum ChartType{
    CANDLESTICK='candlestick',
    AREA ='area',
    BASELINE='baseline',
    Line='line'
}

export interface ChartData{
    time:UTCTimestamp,
    value?:number,
    open?:number,
    high?:number,
    low?:number,
    close?:number
}

export interface GridOptions{
    vertLines:{visible:boolean, color?:string},
    horzLines:{visible:boolean,color?:string}
}
export interface LayoutOptions{
    background: string,
    textColor:string
}
export interface toolTipOptions{
    enabled: boolean;
    backgroundColor?:string;
    textColor?:string;
    borderRadius?:string
}
export interface ChartConfig{
    container: HTMLDivElement;
    toolTip?:HTMLDivElement;
    layout?:LayoutOptions,
    grid?: GridOptions,
    toolTipOptions?:toolTipOptions,
    autoSize?:boolean,
    rightPriceScale?:{
        visible:boolean,
        entireTextOnly?: boolean,
        borderVisible?:boolean
    }
}