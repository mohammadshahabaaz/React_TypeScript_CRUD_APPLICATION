import React, { useState } from 'react';
import { Button } from 'antd';
import { ResourceModal } from '../ResourceModal'; // Adjust the import path as needed
import { IResource } from '../../models/IResourceModel'; // Adjust the import path as needed

export const AddEdit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resource, setResource] = useState<Partial<IResource>>({}); // Example state for the resource
  const [mode, setMode] = useState<'add' | 'edit'>('add'); // Manage modal mode

  const handleSaveResource = (resource: Partial<IResource>) => {
    console.log('Resource saved:', resource);
    // Implement save logic here
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        {mode === 'add' ? 'Add Resource' : 'Edit Resource'}
      </Button>
      <ResourceModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        onSave={handleSaveResource}
        resource={resource}
        mode={mode}
      />
    </>
  );
};


