import React, { Component } from 'react'

export default class InputFullSalary extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="center-align">Cálculo Salário</h1>
                <div className="row alingDivPrincipal">
                    <form className="col s12">
                        <div className="row">
                            <label className=" green-text text-darken-2" htmlFor="input_text">Salário bruto</label>
                            <input id="input_text" type="number" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
