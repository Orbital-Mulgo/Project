import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

export class Login extends Component {
    state = {
        username: "",
        password: "",
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { username, password } = this.state;
        return (
            <div
                className="login bg-image"
                style={{
                    backgroundImage:
                        "url('../../../static/images/loginbackground.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <div
                    className="col-md-6 m-auto"
                    style={{
                        position: "absolute",
                        left: "25%",
                        top: "7.5%",
                        width: "678px",
                        font: "16px Arial",
                    }}
                >
                    <div
                        className="card card-body mt-5"
                        style={{
                            background: "rgba(255, 255, 255, 0.5)",
                            color: "black",
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <img
                                src="../../../static/images/mulgologo.png"
                                width="131"
                                height="150"
                                alt="Mulgo Logo"
                            />
                        </div>
                        <p className="text-center">
                            Sign in to enjoy all the Mulgo tunes you love.
                        </p>
                        <form
                            onSubmit={this.onSubmit}
                            style={{
                                textAlign: "center",
                            }}
                        >
                            <div
                                className="form-group"
                                style={{
                                    margin: "0 0 20px 150px",
                                    width: "50%",
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
                                    }}
                                />
                            </div>

                            <div
                                className="form-group"
                                style={{
                                    margin: "0 0 20px 150px",
                                    width: "50%",
                                }}
                            >
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
                                    }}
                                />
                            </div>

                            <div
                                className="form-group"
                                style={{
                                    marginBottom: "20px",
                                }}
                            >
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{
                                        backgroundColor: "#FF3399",
                                        width: "225px",
                                        height: "45px",
                                        borderRadius: "40px",
                                        color: "black",
                                        fontSize: "18px",
                                    }}
                                >
                                    Login
                                </button>
                            </div>
                            <div
                                style={{
                                    borderTop: "1px solid black",
                                    padding: "20px",
                                    width: "50%",
                                    margin: "0 auto",
                                }}
                            >
                                <p>
                                    Don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        style={{
                                            color: "#FF3399",
                                        }}
                                    >
                                        Register
                                    </Link>
                                </p>
                            </div>
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

export default connect(mapStateToProps, { login })(Login);
