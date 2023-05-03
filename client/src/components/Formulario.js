import {Alert, Col, Form, Input, Row} from "antd";
import Button from "antd-button-color";

function Formulario({
                        botao,
                        eventoTeclado,
                        cadastrar,
                        selecionado,
                        cancelar,
                        remover,
                        atualizar,
                        mensagemResposta,
                        status
                    }) {
    return (
        <>
            {mensagemResposta === undefined || mensagemResposta === "" ? (<Alert className="alert"/>) :
                !status ? (
                    <Alert className="alert" style={{display: "flex"}}
                           message={mensagemResposta} type="error" showIcon
                       />) : (
                    <Alert className="alert" style={{display: "flex"}}
                           message={mensagemResposta} type="success" showIcon
                      />)
            }
            <Form
                fields={[
                    {
                        name: ["nome"],
                        value: selecionado?.nome,
                    },
                    {
                        name: ["marca"],
                        value: selecionado?.marca,
                    },
                ]}
                name="form-produto"
                style={{
                    margin: "1rem auto",
                    textAlign: "center",
                    maxWidth: "40%",
                }}
            >
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[
                        {
                            required: true,
                            message: "Digite o nome do produto!",
                        },
                    ]}
                >
                    <Input placeholder="Nome" name="nome" onChange={eventoTeclado}/>
                </Form.Item>
                <Form.Item
                    label="Marca"
                    name="marca"
                    rules={[
                        {
                            required: true,
                            message: "Digite a marca do produto!",
                        },
                    ]}
                >
                    <Input placeholder="Marca" name="marca" onChange={eventoTeclado}/>
                </Form.Item>
                {botao ? (
                    <Row>
                        <Col>
                            <Button id="btn-cadastrar" onClick={cadastrar} type="primary">
                                Cadastrar
                            </Button>
                        </Col>
                    </Row>
                ) : (
                    <Row
                        style={{
                            justifyContent: "center",
                        }}
                    >
                        <Col>
                            <Button
                                onClick={atualizar}
                                style={{backgroundColor: "#faad14"}}
                                type="primary"
                            >
                                Alterar
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={remover} type="primary" danger>
                                Remover
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={cancelar} type="primary">
                                Cancelar
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </>
    )
        ;
}

export default Formulario;
