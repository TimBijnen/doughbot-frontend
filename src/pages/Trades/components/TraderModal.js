import { useState, useCallback } from "react"
import { Badge, Modal } from "react-bootstrap"
import axios from "axios"
import { useEffect } from "react"

const useTrader = (tid, loadLogs) => {
    const [ logs, setLogs ] = useState()
    const getLogs = useCallback(async () => {
        const { data } = await axios.get(`/api/trader/${tid}/logs?levels=INFO|WARNING|ERROR|CRITICAL`)
        const logs = data.map( d => [d.slice(0, 19), d.slice(20, 29), d.slice(29)])
        setLogs(logs)
    }, [tid])

    useEffect( () => {
        let loop
        if ( loadLogs ) {
            loop = setInterval(getLogs, 1000)
        }
        return () => {
            loop && clearInterval(loop)
        }
    }, [loadLogs, getLogs])
    
    return [
        { logs },
        { getLogs },
    ]
}


const bgColors = {
    'INFO': 'info',
    'CRITICAL': 'danger',
    'WARNING': 'warning',
    'ERROR': 'danger',
}




const TraderModal = ({ showDetailed, setShowDetailed, tid, name }) => {
    const [ { logs } ] = useTrader(tid, showDetailed)

    
    return (
    <Modal show={showDetailed} dialogClassName="float-end">
        <Modal.Header closeButton onHide={(e) => setShowDetailed(false)}>
            {name}
        </Modal.Header>
        <Modal.Body>
            {/* <p>{`Is ${ active ? '' : 'not' } active`}</p> */}
            {/* <p>{`Is ${ connected ? '' : 'not' } connected`}</p> */}
            {/* <Button variant={parseInt(props.strategy_id, 10) === 1 ? 'success' : 'secondary'} onClick={ () => setStrategy(1) }>
                1
            </Button>
            <Button variant={parseInt(props.strategy_id, 10) === 2 ? 'success' : 'secondary'} onClick={ () => setStrategy(2) }>
                2
            </Button>
            <Button variant={parseInt(props.strategy_id, 10) === 3 ? 'success' : 'secondary'} onClick={ () => setStrategy(3) }>
                3
            </Button> */}
            <ul className="w-100"  style={{fontSize: 12}}>
                {/* {console.log(logs)} */}
                { (logs || []).map((l) => {
                    return <li className="w-100 mb-1" style={{listStyle: "none"}}>
                        {/* <div classname="text-faded" style={{fontSize: 9}}>{l[0]}</div> */}
                        <Badge className="text-start d-block" style={{whiteSpace: 'break-spaces'}} bg={bgColors[l[1].replaceAll(' ', '')]}>
                            {l[2]}
                        </Badge>
                    </li>
                })}
            </ul>
        </Modal.Body>
        <Modal.Footer>
            {/* <Button variant={active ? 'success' : 'secondary'} onClick={ () => setActive(true) }>
                Activate
            </Button>
            <Button variant={!active ? 'warning' : 'secondary'} onClick={ () => setActive(false) }>
                Deactivate
            </Button> */}
        </Modal.Footer>

    </Modal>
    )
}

export default TraderModal