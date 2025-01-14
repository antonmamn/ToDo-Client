import React, { ReactNode } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DragDropContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  );
};

export default DragDropContext;
