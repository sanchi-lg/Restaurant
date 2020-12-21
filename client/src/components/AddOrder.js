import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export class AddOrder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: "", quantity: "", total: "", items: [], rate: ""
        }
    }
    componentDidMount() {
        if (!localStorage.getItem('loginid')) {
            alert("Login first")
            this.props.history.push("/login")
        }
        else {
            axios.get(`http://localhost:9000/getitems`)
                .then(res => {
                    this.setState({ items: res.data })
                })
        }
    }

    submit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:9000/addorder/${localStorage.getItem('loginid')}`, this.state)

            .then(res => {
                alert(res.data.mssg)

                if (res.data.err == 0) {
                    this.props.history.push("/")
                }
                else {

                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    handle = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value }, async () => {

            if (name == "item") {
                await axios.get(`http://localhost:9000/getitemrate/${value}`)
                    .then(res => {
                        this.setState({ rate: res.data })

                    })
                    .catch(err => { console.log(err); })
            }
            this.handlet()
        })

    }

    handlet = () => {
        if (this.state.rate == "" || this.state.quantity == "") {
        }
        else {
            this.setState({ total: this.state.rate * this.state.quantity }, () => {
                document.querySelector('[name=total]').value = this.state.total

            }


            )

        }
    }
    render() {
        return (
            <div style={{ width: "70%", margin: "auto", marginTop: "80px" }}>
                <form className="new order" onSubmit={this.submit}>
                    <fieldset style={{ padding: "5px", borderWidth: "0.1px", borderRadius: "3px" }}>
                        <legend style={{ marginTop: "10px", marginBottom: "17px", color: "blue", fontSize: "large" }}>Add Order</legend>                   <div>
                            <label>Item</label>
                            <select name="item" onChange={this.handle} required>
                                <option value="">Select</option>
                                {this.state.items.map(v =>
                                    <option value={v}>{v}</option>
                                )}
                            </select>                        </div>


                        <div>
                            <br />
                            <label>Quantity</label>
                            <input type="number" name="quantity" onChange={this.handle} required />
                        </div>
                        <br />
                        <div>
                            <label>Total Amount</label>

                            <input type="text" name="total" value={this.state.total} required />
                        </div>

                        <button>Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default AddOrder
