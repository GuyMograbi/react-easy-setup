import {render} from 'react-dom';
import {AppRoutes} from './AppRoutes.tsx'
import * as React from 'react';


window.addEventListener('DOMContentLoaded', ()=>{
  render(
    <AppRoutes/>, 
    document.getElementById('root')
  );
});
