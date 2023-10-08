import React from 'react';
import ComponentRoutes from './routes';
import {ContextStateProvider} from './Context'

function App() {

  return (
    <div className="App container  mx-auto px-4 lg:px-8 xl:px-20 2xl:px-96">
      <div className='border border-sky-400'>
      <ContextStateProvider>
      <ComponentRoutes /> 
      </ContextStateProvider>
      </div>
    </div>
  );
}

export default App;
