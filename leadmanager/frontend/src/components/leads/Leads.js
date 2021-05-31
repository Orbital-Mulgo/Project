import React, { Component, Fragment } from "react";

// In order to work with redux from any component, you need to use "connect"
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, deleteLead } from "../../actions/leads";

export class Leads extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getLeads();
    }

    render() {
        return (
            <Fragment>
                <h2>Song list</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Song Title</th>
                            <th>Album</th>
                            <th>Song Duration</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.leads.map((lead) => (
                            <tr key={lead.id}>
                                <td>{lead.id}</td>
                                <td>{lead.name}</td>
                                <td>{lead.email}</td>
                                <td>{lead.message}</td>
                                <td>
                                    <button
                                        onClick={this.props.deleteLead.bind(
                                            this,
                                            lead.id
                                        )}
                                        className="btn btn-danger btn-sm"
                                    >
                                        {" "}
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    leads: state.leads.leads, // state.(leadReducer).(object)
});

export default connect(mapStateToProps, { getLeads, deleteLead })(Leads);
