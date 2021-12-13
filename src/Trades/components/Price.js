const Price = ( prices ) => {
    return (
        <div>
            { prices.s && <div>Sell price { prices.s.toFixed(8) } ({(100 - prices.s / prices.b * 100).toFixed(2)}%)</div> }
            { prices.be && <div>Break even price { prices.be.toFixed(8) } ({(100 - prices.be / prices.b * 100).toFixed(2)}%)</div> }
            { prices.b && <div>Buy price { prices.b.toFixed(8) }</div> }
            { prices.rb && <div>Rebuy price { prices.rb.toFixed(8) } ({(100 - prices.rb / prices.b * 100).toFixed(2)}%)</div> }
            { prices.c && <div>Cancel price { prices.c.toFixed(8) } ({(100 - prices.c / prices.b * 100).toFixed(2)}%)</div> }
        </div>
    )
}

export default Price