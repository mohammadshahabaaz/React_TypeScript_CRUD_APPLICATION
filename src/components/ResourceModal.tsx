import React, { useEffect, useState } from 'react';
import { IResource } from '../models/IResourceModel'; // Adjust the import path as needed
import { Modal, Button, Form, Input } from 'antd';
import { Mode } from './Resources';

interface IProps {
  show: boolean;
  handleClose: () => void;
  onSave: (resource: Partial<IResource>) => void;
  resource: Partial<IResource>;
  mode: string;
}

export const ResourceModal: React.FC<IProps> = ({ show, handleClose, onSave, resource, mode }) => {
  const [localResource, setLocalResource] = useState<Partial<IResource>>(resource);
  const [form] = Form.useForm();

  console.log("localResource",localResource)

  useEffect(() => {
    setLocalResource(resource);

    // console.log("ResourceModal",resource)
    
    form.setFieldsValue({...resource}); // Update form fields when resource prop changes
    
  }, [resource, form]);

  const onFormSubmit = () => {
    form
      .validateFields()
      .then((values: Partial<IResource>) => {
        if (mode === Mode.EDIT && resource.id) {
            onSave({ ...values, id: resource.id });
          } else if(mode === Mode.NEW) {
            onSave(values);
          }
        handleClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={`${mode} Modal`}
      visible={show}
      onCancel={handleClose}
      footer={[
        <Button key="back" onClick={handleClose}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={onFormSubmit}>
          Save Changes
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={localResource}
        onFinish={onFormSubmit}
      >
        <Form.Item
          name="title"
          label="Resource"
          rules={[{ required: true, message: 'Please input the resource title!' }]}
        >
            
          <Input placeholder="Resource" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
