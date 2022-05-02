import * as React from 'react';
import { useCallback } from 'react';

const DraggableComponent = ({ component, handleDragStart }) => {
  const onDragStart = useCallback(() => handleDragStart(component), [component, handleDragStart]);

  return (
    <div
      className="card m-1 mw-100 align-items-center justify-content-center draggable-component"
      draggable
      onDragStart={onDragStart}
    >
      {component.name}
    </div>
  );
}

export default DraggableComponent;
