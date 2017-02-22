import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ResearcherPicker from '../ResearcherPicker';

storiesOf('ResearcherPicker', module)
  .add('default', () => (
    <ResearcherPicker />
  ))
