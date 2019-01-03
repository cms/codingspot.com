import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardText from "react-md/lib/Cards/CardText";
import { TinyLetter, Email, Submit } from 'react-tinyletter';

class MailingList extends Component {
  render() {
    return (
      <div className="md-grid mobile-fix">
        <Card className="md-grid md-cell--8">
          <h2>Welcome to CodingSpot.com</h2>
          <CardText>
            <h3>Keep in touch, subscribe to my mailing list!</h3>
            <p>
              I will contact you once in a while with misc. information on front-end development,
              Javascript, React, VueJS and other modern technologies.
            </p>
            <TinyLetter list="codingspot">
              <Email />
              <Submit />
            </TinyLetter>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default MailingList;
