import React from 'react';
import InputFullSalary from './components/InputFullSalary';
import InputReadOnly from './components/InputReadOnly';
import ProgressBarSalary from './components/ProgressBarSalary';


function App() {
  return (
    <div>
      <InputFullSalary />
      <InputReadOnly />
      <ProgressBarSalary />
    </div>
  );
}

export default App;
