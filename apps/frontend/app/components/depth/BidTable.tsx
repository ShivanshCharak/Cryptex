
import { TTradeInfo } from "@/app/utils/types";
export const BidTable = ({ bids }: { bids: Array<TTradeInfo> }) => {
    
    let currentTotal = 0;

    const priceChecker = new Map<string, number>()
    const relevantBids = ClubDepth(bids)

    const bidsWithTotal = relevantBids.map(({ price, quantity }) => {
        currentTotal += Number(quantity);
        return { price, quantity, total: currentTotal };
    });


    const maxTotal = relevantBids.reduce((acc, { quantity }) => acc + Number(quantity), 0);

    return (
        <div className="h-[40%] overflow-scroll">
            {bidsWithTotal?.map(({ price, quantity, total }, index) => (
                <Bid
                    maxTotal={maxTotal}
                    total={total}
                    key={index}
                    price={price}
                    quantity={quantity}
                />
            ))}
        </div>
    );
};

function Bid({ price, quantity, total, maxTotal }: {
    price: number;
    quantity: number;
    total: number;
    maxTotal: number
}) {
    return (
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
                padding: "20px",
                background: "rgba(1, 167, 129, 0.325)",
                transition: "width 0.3s ease-in-out",
            }}></div>
            <div className="flex justify-between text-xs w-full p-1">
                <div>{String(price)}</div>
                <div>{String(quantity)}</div>
                <div>{String(total.toFixed(2))}</div>
            </div>
        </div>
    );
}



export function ClubDepth(allBids: TTradeInfo[]) {
    // <Price, quantity>

    const priceChecker = new Map<number, number>()
    allBids.forEach((bid) => {
        if (priceChecker.has(bid.price)) {
            const quantity = priceChecker.get(bid.price) || 0

            const sum = quantity + Number(bid.quantity)
            priceChecker.set(bid.price, Number(sum))

        } else {
            priceChecker.set(bid.price, Number(bid.quantity))
        }
    })
    let bidsArr = Array.from(priceChecker.entries()).map(([price, quantity]) => ({
        price,
        quantity
    }))
    return bidsArr



} 