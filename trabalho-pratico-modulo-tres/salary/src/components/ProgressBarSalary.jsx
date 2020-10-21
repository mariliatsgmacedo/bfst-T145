import React, { Component } from 'react'

export default class ProgressBarSalary extends Component {
    render() {
        return (
            <div className="container largeProgressBar
            largeProgressBar
            largeProgressBar">
                <div className="row  ">
                    <div className="col s3 progress barProgressInss">
                        <div className="determinate "></div>
                    </div>
                    <div className="col s3 progress barProgressIrpf">
                        <div className="determinate "></div>
                    </div>
                    <div className="col s3 progress barProgressInssSliquido">
                        <div className="determinate "></div>
                    </div>
                </div>

            </div>
        )
    }
}
