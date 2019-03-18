import React from 'react';
import { shallow, mount, render } from 'enzyme';

import SearchBar from '../components/NavigationBar/SearchBar';

describe('Navigation Bar', () => {
   it('displays main categories', () => {
      const wrapper = shallow(<SearchBar />);
      expect(wrapper.exists('.search-bar__button')).toEqual(true);
   });
});
