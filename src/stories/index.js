import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';

import ResearcherPicker from '../ResearcherPicker';
import SanFranciscoDesign from '../SanFranciscoDesign';
import Candidate from '../Candidate';
import CandidateTable from '../CandidateTable';
import Checkbox from '../components/Checkbox';
import CheckboxLabel from '../components/CheckboxLabel';
import FormField from '../components/FormField';

import "../../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../../node_modules/material-design-icons/iconfont/material-icons.css";
import "../../node_modules/material-components-web/dist/material-components-web.min.css";
import "../material.css";
import "../material.js";
import "./index.css"

storiesOf('ResearcherPicker', module)
  .add('default', () => (
    <ResearcherPicker />
  ))

storiesOf('SanFranciscoDesign', module)
  .add('default', () => (
    <SanFranciscoDesign />
  ))

storiesOf('Candidate', module)
  .add('default', () => (
    <Candidate candidate={{"name": "Barack Obama", "party": "Democratic", "term": "2009–2017"}} />
  ))

storiesOf('CandidateTable', module)
  .add('default', () => (
    <CandidateTable choiceNo={1} candidates={[{"name": "Barack Obama", "party": "Democratic", "term": "2009–2017"}]} />
  ))

storiesOf('Checkbox', module)
  .add('default', () => (
    <FormField>
      <Checkbox id="default-checkbox" />
      <CheckboxLabel for="default-checkbox">
        Label
      </CheckboxLabel>
    </FormField>
  ))
