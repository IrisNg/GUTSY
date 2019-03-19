import React from 'react';
import { shallow } from 'enzyme';
import { Introduction } from '../components/Homepage/Introduction';


describe('Introduction', () => {
   it('should display page header', () => {
      const wrapper = shallow(<Introduction />);
      expect(wrapper.find('h1.introduction__header').text()).toContain('it’s on Gutsy.');
   });
   it('should display 2 images in the catalog', () => {
      const wrapper = shallow(<Introduction />);
      expect(wrapper.find('.introduction__catalog img')).toHaveLength(2);
   });
});
