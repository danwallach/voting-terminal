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
import "../index.css"

const candidates = [{
  "name": "Barack Obama",
  "party": "Democratic",
  "term": "2009–2017",
}];

const candidate = candidates[0];

storiesOf('ResearcherPicker', module)
  .add('default', () => (
    <ResearcherPicker />
  ))

storiesOf('SanFranciscoDesign', module)
  .add('default', () => (
    <SanFranciscoDesign />
  ))

storiesOf('CandidateTable', module)
  .add('default', () => (
    <CandidateTable choiceNo={1} candidates={candidates} />
  ))
  .add('disabled', () => (
    <CandidateTable choiceNo={1} candidates={candidates} disabled={true}/>
  ))
  .add('inFocus', () => (
    <CandidateTable choiceNo={1} candidates={candidates} inFocus={true}/>
  ))

storiesOf('Candidate', module)
  .add('default', () => (
    <Candidate candidate={candidate} />
  ))
  .add('disabled', () => (
    <Candidate candidate={candidate} disabled={true} />
  ))
  .add('bold', () => (
    <Candidate candidate={candidate} checked={true} bold={true} />
  ))
  .add('bold disabled', () => (
    <Candidate candidate={candidate} checked={true} bold={true} disabled={true} />
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
  .add('checked', () => (
    <FormField>
      <Checkbox id="default-checkbox" checked={true}/>
      <CheckboxLabel for="default-checkbox">
        Label
      </CheckboxLabel>
    </FormField>
  ))
  .add('disabled', () => (
    <FormField>
      <Checkbox id="default-checkbox" disabled={true}/>
      <CheckboxLabel for="default-checkbox">
        Label
      </CheckboxLabel>
    </FormField>
  ))
  .add('checked disabled', () => (
    <FormField>
      <Checkbox id="default-checkbox" checked={true} disabled={true}/>
      <CheckboxLabel for="default-checkbox">
        Label
      </CheckboxLabel>
    </FormField>
  ))
