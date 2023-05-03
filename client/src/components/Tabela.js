/* eslint-disable jsx-a11y/anchor-is-valid */
import {Button, Table} from "antd";
import React from "react";

function Tabela({produtos, selecionar}) {
    const {Column} = Table;

    return (
        <Table dataSource={produtos}>
            <Column title="#" dataIndex="codigo" key="codigo"/>
            <Column title="Nome" dataIndex="nome" key="nome"/>
            <Column title="Marca" dataIndex="marca" key="marca"/>

            <Column
                title="Selecionar"
                key="selecionar"
                render={(record) => (
                    <Button
                        type="primary"
                        id="btn-selecionar"
                        onClick={() => {
                            selecionar(record);
                        }}
                        style={{backgroundColor: "#006d75"}}
                    >
                        Selecionar
                    </Button>
                )}
            />
        </Table>
    );
}

export default Tabela;
