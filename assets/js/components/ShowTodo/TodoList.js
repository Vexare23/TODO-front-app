import React from "react";
import PropTypes from "prop-types";

export default function TodoList(props) {
    const {todoInfo} = props;

    return (
        <tbody>
        {todoInfo.map((todoInfo) => {
            return (
                <tr key = {todoInfo.id}>
                    <td><center>{todoInfo.datetime}</center></td>
                    <td><center>{todoInfo.name}</center></td>
                    <td><center>{todoInfo.description}</center></td>
                    <td><center>{todoInfo.assignedTo}</center></td>
                </tr>
            );})}
        </tbody>
    );
}

TodoList.propTypes = {
    todoInfo: PropTypes.array.isRequired,
};
