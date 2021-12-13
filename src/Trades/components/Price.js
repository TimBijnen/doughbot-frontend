const Price = ( prices ) => {
    return (
        <div>
            { prices.s && <div>Sell price { prices.s.toFixed(8) } ({(prices.s / prices.b).toFixed(5)})</div> }
            { prices.be && <div>Break even price { prices.be.toFixed(8) } ({(prices.be / prices.b).toFixed(5)})</div> }
            { prices.b && <div>Buy price { prices.b.toFixed(8) }</div> }
            { prices.rb && <div>Rebuy price { prices.rb.toFixed(8) } ({(prices.rb / prices.b).toFixed(5)})</div> }
            { prices.c && <div>Cancel price { prices.c.toFixed(8) } ({(prices.c / prices.b).toFixed(5)})</div> }
        </div>
    )
}

export default Price