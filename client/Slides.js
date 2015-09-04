import React, { Component, Children } from 'react';


class Slides extends Component {
    render() {
        const wrappedChildren = Children.map(this.props.children, (child) => {
            return (
                <div className="wrapped-child">
                    {child}
                </div>
            );
        });
        return (
            <div className="slide-container">
                {wrappedChildren}
            </div>
        );
    }
}

export default Slides