import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';
import Button from '../UI/Buttons/Buttons';

configure( {adapter: new Adapter()});

describe('<Header /> component', () =>{
    it('Should render header in the dashboard page', () =>{
        const wrapper = shallow(<Header />);
        expect(wrapper.find(".navbar")).toHaveLength(1);
    })
});