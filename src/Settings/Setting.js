import { Form, Row } from "react-bootstrap"

const Setting = ( { label, value, updateSetting } ) => {
    const onCheck = () => {
        updateSetting( label, !value )
    }

    return (
        <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" checked={ value } label={ label } onChange={ onCheck } />
            </Form.Group>
        </Row>
    )
}

export default Setting