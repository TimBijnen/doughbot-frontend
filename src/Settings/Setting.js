import { Form, Row } from "react-bootstrap"

const Setting = ( { label, value, rule, updateSetting } ) => {
    const onCheck = () => {
        updateSetting( label, !value )
    }

    return (
        <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" checked={ value } label={ `${ label } ${ rule || "" }` } onChange={ onCheck } />
            </Form.Group>
        </Row>
    )
}

export default Setting