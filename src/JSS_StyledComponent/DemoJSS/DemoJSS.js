import React, { Component } from 'react';
import { Button, SmallButton } from '../Components/Button';
import { StyledLink } from '../Components/Link';
import { TextField } from '../Components/TextField'

class DemoJSS extends Component {
  render() {
    return (
      <div>
        <Button className="button_style" primary>Tú Khỉ</Button>
        <SmallButton>Min</SmallButton>
        <StyledLink>protukhi</StyledLink>
        <TextField inputColor="red"></TextField>
      </div>
    );
  }
}

export default DemoJSS;