import { ClubDepth } from "./BidTable";

export const AskTable = ({ asks }: { asks: Array<{ price: string; quantity: string }> }) => {
    let currentTotal = 0;
    
    const relevantAsks = ClubDepth(asks)
    relevantAsks.reverse();

    const asksWithTotal = relevantAsks.map(({ price, quantity }) => {
        currentTotal += Number(quantity);
        return { price, quantity, total: currentTotal };
    });

    const maxTotal = relevantAsks.reduce((acc, { quantity }) => acc + Number(quantity), 0);
    asksWithTotal.reverse();

    return (
        <div className="h-[40%] overflow-scroll">
            {asksWithTotal.map(({ price, quantity, total }) => (
                <Ask 
                    maxTotal={maxTotal} 
                    key={price+quantity} 
                    price={price} 
                    quantity={quantity} 
                    total={total} 
                />
            ))}
        </div>
    );
};

function Ask({ price, quantity, total, maxTotal }: { 
    price: string; 
    quantity: number; 
    total: number; 
    maxTotal: number 
}) {
    return (
        <>
        <div style={{
            display: "flex",
            position: "relative",
            width: "100%",
            backgroundColor: "transparent",
            overflow: "hidden",
    
            marginBottom:"2px"
        }}>
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${(100 * total) / maxTotal}%`,
                height: "100%",
                background: "rgba(228, 75, 68, 0.325)",
                
                transition: "width 0.3s ease-in-out",
            }}></div>
            <div className="flex justify-between text-xs w-full p-1">
                <div>{String(price)}</div>
                <div>{String(quantity)}</div>
                
                <div>{String(total?.toFixed(2))}</div>
            </div>
        </div>
        </>
    );
} 