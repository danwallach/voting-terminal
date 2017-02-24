import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import "../../node_modules/roboto-fontface/css/roboto/roboto-fontface.css";
import "../../node_modules/material-design-icons/iconfont/material-icons.css";
import "../material.css";
import "../material.js";
import ResearcherPicker from '../ResearcherPicker';
import SanFranciscoDesign from '../SanFranciscoDesign';
import Candidate from '../Candidate';
import CandidateTable from '../CandidateTable';

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
    <Candidate name="Barack Obama" party="Democratic" />
  ))

storiesOf('CandidateTable', module)
  .add('default', () => (
    <CandidateTable choiceNo={1} candidates={[{"name": "Barack Obama", "party": "Democratic"}]} />
  ))
