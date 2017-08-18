import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardDiv = styled.div`
    font: 'Roboto';
    font-weight: 300;
    display: flex;
    flex-direction: column;
    margin: 1em 0em 1em 1em;

    &:hover { filter: brightness(0.9) }
`;

class Card extends Component {
    render() {
        let price = '$' + this.props.card.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

        return (
            <CardDiv>
                <img src={this.props.card.url}
                    height="340" 
                    width="240" 
                    alt={this.props.card.alt} 
                />

                {price}
            </CardDiv>
        );
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired
};
  
export default Card;