import React, { Component } from 'react'
import LineChart from 'react-linechart'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Bar, Line, Pie } from 'react-chartjs-2'

export class Reports extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orders: []
        }
    }


    componentDidMount() {
        if (!localStorage.getItem('loginid')) {
            alert("Login first")
            this.props.history.push("/login")
        }
        else {
            axios.get(`http://localhost:9000/orders/${localStorage.getItem('loginid')}`)
                .then(res => {

                    this.setState({ orders: res.data })
                })
                .catch(err => { console.log(err); })
        }
    }

    render() {


        var points = []

        var pointspie = [{ x: 0, y: "Tea" }, { x: 0, y: "Coffee" }, { x: 0, y: "Samosa" }, { x: 0, y: "Cake" }]

        var pointsbar = [{ x: 0, y: "Tea" }, { x: 0, y: "Coffee" }, { x: 0, y: "Samosa" }, { x: 0, y: "Cake" }]

        this.state.orders.map(o => {
            var item = o.item
            var date = o.date
            var quantity = parseInt(o.quantity)
            if (points.length == 0) {
                points.push({ x: date, y: quantity })

            }

            points.forEach((value, index) => {
                if (value.x == date) {

                    value.y = value.y + quantity
                    return
                }
                if (index == points.length - 1) {
                    points.push({ x: date, y: quantity })
                }
            })



        })


        pointspie.forEach((value, index) => {
            this.state.orders.map(o => {

                if (value.y == o.item) {
                    value.x = value.x + parseInt(o.quantity)
                }
            })
        })

        pointsbar.forEach((value, index) => {
            this.state.orders.map(o => {
                if (value.y == o.item) {
                    value.x = value.x + parseInt(o.total)
                }
            })
        })




        var labels = []
        var datas = []
        var labelp = []
        var datap = []
        var labelb = []
        var datab = []


        points.forEach(v => {
            labels.push(v.x)
            datas.push(v.y)
        })

        pointsbar.forEach(v => {
            labelb.push(v.y)
            datab.push(v.x)
        })

        pointspie.forEach(v => {
            labelp.push(v.y)
            datap.push(v.x)
        })


        const state = {
            labels: labels,
            datasets: [{
                label: "Total sale per date",
                fill: false,
                data: datas,
                borderColor: "brown",
                borderWidth: 1
            }]
        }

        const statepie = {
            labels: labelp,
            datasets: [{
                backgroundColor: ["red", "green", "yellow", "orange"],
                data: datap
            }]
        }

        const statebar = {
            labels: labelb,
            datasets: [{
                label: "Product wise sales",
                data: datab,
                borderColor: "blue",
                borderWidth: 1

            }]
        }

        return (
            <div>
                <div style={{ fontSize: "large", color: "purple", textAlign: "center", marginBottom: "30px", marginTop: "30px" }}>Reports</div>

                {/* <LineChart width={400} height={400} data={data} xLabel="Date" yLabel="Total Sale" isDate={true} hideLines={false}/> */}
                <div style={{ margin: "40px auto", width: "50%", marginBottom: "90px" }}>
                    <Line data={state} />

                </div>
                <div style={{ margin: "40px auto", width: "50%", marginBottom: "90px" }}>
                    <p style={{ textAlign: 'center', color: "grey", fontSize: "small" }}> Products sold by quantity</p>
                    <Pie data={statepie} />

                </div>
                <div style={{ margin: "40px auto", width: "50%", marginBottom: "90px" }}>
                    <Bar data={statebar} />


                </div>
            </div>

        )
    }
}

export default Reports
