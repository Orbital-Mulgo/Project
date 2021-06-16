import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage({
                passwordNotMatch: "Passwords do not match",
            });
        } else {
            const newUser = {
                username,
                password,
                email,
            };
            this.props.register(newUser);
        }
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { username, email, password, password2 } = this.state;
        return (
            <div className="login bg-image" style={{
                backgroundImage:
                    "url('../../../static/images/loginbackground.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "fixed",
                top: "0",
                left: "0",
                height: "100vh",
                width: "100vw",
            }}>
                <div className="col-md-6 m-auto"
                    style={{
                        position: "absolute",
                        left: "24%",
                        top: "1.5%",
                        width: "678px",
                        font: "16px Arial",
                    }}
                >
                    <div className="card card-body mt-5"
                        style={{
                            background: "rgba(255, 255, 255, 0.5)",
                            color: "black",
                        }}>
                        <div style={{
                            textAlign: "center",
                            //marginBottom: "5px"
                        }}>
                            <img
                                src="../../../static/images/mulgologo2.png"
                                width="125"
                                height="120"
                                alt="Mulgo Logo"
                            />
                        </div>
                        <p className="text-center">
                            Register to explore more Mulgo tunes.
                        </p>
                        <form
                            onSubmit={this.onSubmit}
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <div className="form-group"
                                style={{
                                    margin: "0 0 7px 150px",
                                    width: "70%",
                                }}
                            >
                                <input
                                    className="form-control"
                                    type="text"
                                    name="username"
                                    onChange={this.onChange}
                                    value={username}
                                    placeholder="Username"
                                    style={{
                                        borderRadius: "40px",
                                        border: "1px solid",
                                        width: "350px",
                                        height: "45px"
                                    }}
                                />
                            </div>
                            <div className="form-group"
                                style={{
                                    margin: "0 0 7px 150px",
                                    width: "70%",
                                }}>
                                <input
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    onChange={this.onChange}
                                    value={email}
                                    placeholder="Email Address"
                                    style={{
                                        borderRadius: "40px",
                                        border: "1px solid",
                                        width: "350px",
                                        height: "45px",
                                    }}
                                />
                            </div>
                            <div className="form-group"
                                style={{
                                    margin: "0 0 7px 150px",
                                    width: "70%",
                                }}>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                    value={password}
                                    placeholder="Password"
                                    style={{
                                        borderRadius: "40px",
                                        border: "1px solid",
                                        width: "350px",
                                        height: "45px",
                                    }}
                                />
                            </div>
                            <div className="form-group"
                                style={{
                                    margin: "0 0 15px 150px",
                                    width: "70%",
                                }}>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password2"
                                    onChange={this.onChange}
                                    value={password2}
                                    placeholder="Confirm Password"
                                    style={{
                                        borderRadius: "40px",
                                        border: "1px solid",
                                        width: "350px",
                                        height: "45px",
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary"
                                    style={{
                                        backgroundColor: "#FF3399",
                                        width: "225px",
                                        height: "45px",
                                        borderRadius: "40px",
                                        color: "black",
                                        fontSize: "17px",
                                        marginBottom: "15px",
                                    }}
                                >
                                    Register
                            </button>
                            </div>
                            <p style={{
                                padding: "2px",
                                width: "50%",
                                margin: "0 auto",
                            }}>
                                Already have an account?{" "}
                                <Link to="/login"
                                    style={{
                                        color: "#FF3399",
                                    }}>
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
