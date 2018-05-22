import React from 'react';
import { configure, shallow, mount,   } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddProduct } from './AddProducts';
import card from '../../components/UI/card/card';
import { MemoryRouter } from 'react-router-dom'
import { render } from 'react-dom';
jest.mock('react-dom');
configure({adapter: new Adapter()});

describe('<AddProduct />', () => {
    let wrapper;

    beforeEach( () =>{
        wrapper = shallow(<AddProduct></AddProduct>);
    });
    
    it('should render the card when its load', () =>{
       // expect(wrapper.find(card)).toHaveLength(1);
       expect(render).toHaveBeenCalledWith(
        <AddProduct />, 'element-node'
      );
      expect(render).toHaveBeenCalledTimes(1);
    });
})