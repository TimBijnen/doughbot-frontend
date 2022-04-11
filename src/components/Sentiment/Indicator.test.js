import Indicator from "./Indicator"
import { screen, render  } from "@testing-library/react"

describe( "Test Indicator", () => {
    test( "danger", () => {
        render( <Indicator label="1h" value={ 12.8 } /> )
        expect( screen.getByTitle( "indicator" ).className ).toBe("text-white bg-danger")
    } )

    test( "warning", () => {
        render( <Indicator label="1h" value={ 99.8 } /> )
        expect( screen.getByTitle( "indicator" ).className ).toBe("text-dark bg-warning")
    } )

    test( "info", () => {
        render( <Indicator label="1h" value={ 109.8 } /> )
        expect( screen.getByTitle( "indicator" ).className ).toBe("text-white bg-info")
    } )

    test( "success", () => {
        render( <Indicator label="1h" value={ 119.8 } /> )
        expect( screen.getByTitle( "indicator" ).className ).toBe("text-white bg-success")
    } )

})

