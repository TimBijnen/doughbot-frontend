import useTrades from "./hooks/trades"

const Page = () => {
    const [ { items } ] = useTrades()

    return (
        <>
            {
                items.map( ( i ) => (
                    <div>
                        { i.order_id } { i.type } { i.coin } { i.original_qty } { i.executed_qty } { i.cancelled ? "Inactive" : "Active"}
                    </div>
                ) )
            }
        </>
    )
}

export default Page