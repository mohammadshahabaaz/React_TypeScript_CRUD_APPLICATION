import React, { useState } from "react";
import { Button, Spin, Table, Tag, Popconfirm, message } from "antd";
import { find, map } from "lodash";
import { useGetResource } from "../hooks/resource";
import { useAddResource, useDeleteResource, useEditResource } from "../hooks/ResourceMutation";
import { IResource } from "../models/IResourceModel";
import { ResourceModal } from "./ResourceModal";
import { ToastNofication } from "./AntNotification";

export enum Mode {
  NEW = "New",
  EDIT = "Edit",
}

export const Resources: React.FC = () => {
  const { data, isLoading, error, refetch } = useGetResource();
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [showModal, setShowModal] = useState(false);
  const [resource, setResource] = useState<Partial<IResource>>({});
  const [mode, setMode] = useState<Mode>(Mode.NEW);


  const { deleteResourceById } = useDeleteResource(() => refetch());

  const {addResource} = useAddResource(() => refetch())

  const {editNewResource} = useEditResource(() => refetch());

//   const handleShow = (id?: number) => {
//     const resourceToEdit = id ? data?.find(item => item.id === id) : {};
//     setResource(resourceToEdit || {});
//     setMode(id ? Mode.EDIT : Mode.NEW);
//     setShowModal(true);
//   };

  const handleShow = (id?: number, mode: Mode = Mode.NEW) => {
    // Explicitly ensure foundResource is never undefined by using {} as a fallback
    const foundResource = id ? find(data, { id }) || {} : {};
    
    setResource(foundResource as Partial<IResource>);
    // console.log("FoundResource",foundResource)
    setMode(mode);
    setShowModal(true);
};
// const handleShow = (id?: number, mode: Mode = Mode.NEW) => {
//     setShowModal(true);
//     setResource(id === undefined ? {} : find(data, d => d.id === id) || {});
//     setMode(mode);
// }

  const handleDelete = async (id: number) => {
    await deleteResourceById(id);
    ToastNofication({
      type: 'success',
      message: 'Operation Successful',
      description: `You have successfully Deleted resource ID: ${id}.`,
    });
  };

  const handleTableChange = (newPagination: any) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const onSave = async (res: Partial<IResource>) => {
    // Assuming `editMutate` and `addNewMutate` are defined and work similarly to `deleteResourceById`
    // Implement your add or edit logic here

    if (mode === Mode.EDIT && res.id) {
        console.log('Updating resource', res);
        await editNewResource(res.id, res); // Use res.id here
        handleClose();
        refetch();}
         else if(mode === Mode.NEW) {
        console.log('Adding new resource', res);
        await addResource(res);
        handleClose();
            refetch()
        // Implement the add logic here
        // For example: await addResourceApiCall(res);
      }
    
      setShowModal(false);
      refetch();
     
  };

  const handleClose = () => setShowModal(false);

  const columns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => ((pagination.current - 1) * pagination.pageSize) + index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: IResource) => (
        <>
          <Button type="primary" onClick={() => handleShow(record.id, Mode.EDIT)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this resource?"
            onConfirm={() => handleDelete(record.id)}
            onCancel={() => ToastNofication({ type: 'info', message: 'Operation Cancelled', description: 'Deletion cancelled.' })}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (isLoading) return <Spin tip="Loading resources..." style={{ textAlign: 'center', marginTop: '20%' }} />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Resources</h2>
      <Button type="primary" onClick={() => handleShow(undefined, Mode.NEW)}>Add Resource</Button>
      <Table 
        columns={columns} 
        dataSource={map(data, (item, index) => ({ ...item, key: item.id }))}
        pagination={{ current: pagination.current, pageSize: pagination.pageSize, total: data?.length }}
        onChange={handleTableChange}
      />
      <ResourceModal
        mode={mode}
        show={showModal}
        handleClose={handleClose}
        onSave={onSave}
        resource={resource}
      />
    </div>
  );
};
