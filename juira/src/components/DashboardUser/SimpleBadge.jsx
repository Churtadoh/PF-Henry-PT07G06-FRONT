import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2
    },
    customBadge: {
        //backgroundColor: "#00AFD7",
        backgroundColor: "var(--primaryColor)",
        color: "white"
    }
});

function SimpleBadge(props) {
    const { classes, number } = props;
    return (
        <div>
            <Badge
                classes={{ badge: classes.customBadge }}
                className={classes.margin}
                badgeContent={number}
            >
                <MailIcon />
            </Badge>
        </div>
    );
}

SimpleBadge.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleBadge);