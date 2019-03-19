import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { Basket } from '../components/NavigationBar/Basket';

describe('Basket', () => {
   const basketItems = [];
   const wrapper = shallow(<Basket basketItems={basketItems} />);
   it('should not display basket counter when empty', () => {
      expect(wrapper.instance().renderBasketCounter(basketItems)).toBeNull();
   });
   it('should not display basket total when empty', () => {
      expect(wrapper.instance().renderBasketTotal(basketItems)).toBeNull();
   });
   it('should display message when empty', () => {
      expect(wrapper.exists('span.basket__empty-message')).toBe(true);
   });
   it('should not display checkout button when empty', () => {
      expect(wrapper.instance().renderCheckoutButton(basketItems)).toBeNull();
   });
});

describe('Basket', () => {
   const basketItems = [
      { _id: 'a351', productPrice: '23.20', productName: 'hello kitty' },
      { _id: 'e9f9g', productPrice: '66.66', productName: 'nom nom' },
      { _id: 's9gnke', productPrice: '75.2', productName: 'beep beep' }
   ];
   it('matches the snapshot when it contains items', () => {
      const tree = renderer.create(<Basket basketItems={basketItems} />).toJSON();
      expect(tree).toMatchSnapshot();
   });
   it('displays 3 thumbnails, one per BasketItem', () => {
      const wrapper = mount(<Basket basketItems={basketItems} />);
      expect(wrapper.find('.basket-item img')).toHaveLength(3);
   });
});
