let { describe, it } = global;
// import * as jest from 'jest';
import React from 'react';
// import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Welcome from '../app/scripts/Welcome';

//
describe('Welcome (Snapshot)', () => {
  it('Welcome renders hello world', () => {
    const component = renderer.create(<Welcome />);
    const json = component.toJSON();
    console.log('this is json', json);
    expect(json).toMatchSnapshot();
  });
});
  
