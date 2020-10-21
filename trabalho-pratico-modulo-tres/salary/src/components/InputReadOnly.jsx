import React, { Component } from 'react'

export default class InputReadOnly extends Component {
    render() {
        return (
            <div  className="container">
                <div className="row inputRead" >
                    <form className="col s12">
                        <div className="col s3 m3 l3">
                            <label  htmlFor="input_text">Base INSS</label>
                            <input  id="input_text" readOnly />
                        </div>
                        <div className=" col s3 m3 l3">
                            <label  htmlFor="input_text">Desconto INSS</label>
                            <input id="input_text" readOnly />
                        </div>
                        <div className="col s3 m3 l3">
                            <label  htmlFor="input_text">Base IRPF</label>
                            <input id="input_text" readOnly />
                        </div>
                        <div className="col s3 m3 l3">
                            <label  htmlFor="input_text">Desconto IRPF</label>
                            <input id="input_text" readOnly />
                        </div>
                    </form>
                </div>
                <div className="row">
                    <form className="col s3 ">
                        <div className="row ">
                            <label  htmlFor="input_text">Salário líquido</label>
                            <input id="input_text" readOnly />
                        </div>
                    </form>
                </div>


            </div>
        )
    }
}
