// // import React, { useState } from "react";
// // import { Button, Spin, Table, Tag, message,Popconfirm } from "antd";
// // import { useGetResource } from "../hooks/resource";
// // import { useDeleteResource } from "../hooks/ResourceMutation";
// // import { map } from "lodash";
// // import { ToastNofication } from "./AntNotification";
// // import { AddEdit } from "./UIComponents/AddEdit";
// // import { ResourceModal } from "./ResourceModal";
// // import { IResource } from "../models/IResourceModel";


// export const Resources: React.FC = () => {

//     const { data, isLoading, error, refetch } = useGetResource();
//     const onSuccess = () => refetch(); // Trigger refetch on successful deletion
//     const { deleteResourceById } = useDeleteResource(onSuccess);

//   const handleDelete = async (id: number) => {
//     await deleteResourceById(id);
//     // message.success('Click on Yes');
//     ToastNofication({
//         type: 'success',
//         message: 'Operation Successful',
//         description: `You have successfully Deleted ${id}.`,
//       });
//   };
//   const cancel = () => {
//     // message.error('Cancelled');
//     ToastNofication({
//         type: 'info',
//         message: 'Operation Successful',
//         description: 'You have Cancelled.',
//       });
//   };

//     const [pagination, setPagination] = useState({
//         current: 1,
//         pageSize: 10,
//     });

//     const handleTableChange = (newPagination:any) => {
//         setPagination({
//             ...pagination,
//             current: newPagination.current,
//             pageSize: newPagination.pageSize,
//         });
//     };

//     const columns = [
//         {
//             title: 'Index',
//             dataIndex: 'index',
//             key: 'index',
//             render: (text:any, record:any, index:number) => ((pagination.current - 1) * pagination.pageSize) + index + 1,
//         },
//         {
//             title: 'Title',
//             dataIndex: 'title',
//             key: 'title',
//             render: (text: any) => <Tag>{text}</Tag>,
//         },
//         {
//             title: 'Edit',
//             key: 'edit',
//             render: (_: any, record:any) => (
//                 <Button type="primary" onClick={() => handleEdit(record)}>
//                     Edit
//                 </Button>
//             ),
//         },
//         {
//             title: 'Delete',
//             key: 'delete',
//             render: (_: any, record:any) => (
//                 <Popconfirm
//         title="Are you sure to delete this task?"
//         onConfirm={(e) => handleDelete(record.id)} // Pass record.id here
//         onCancel={cancel}
//         okText="Yes"
//         cancelText="No"
//       >
//         <Button danger>Delete</Button>
//       </Popconfirm>
//                 // <Button danger disabled={isLoading}  onClick={() => handleDelete(record.id)}>
//                 //     Delete
//                 // </Button>
//             ),
//         },
//     ];

//     const handleEdit = (record:any) => {
//         console.log("Edit record", record);
//     };


//     if (isLoading) {
//         return (
//             <div style={{ textAlign: 'center', marginTop: '20%' }}>
//                 <Spin size="large" />
//                 <div>Please Wait. It's loading.</div>
//             </div>
//         );
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }


//     return (
//         <div>
//             <div>
//             <h2>Resources</h2>
            
//             <Table 
//                 columns={columns} 
//                 dataSource={map(data,(item, index) => ({ ...item, key: item.id }))}
//                 pagination={{
//                     current: pagination.current,
//                     pageSize: pagination.pageSize,
//                     total: data?.length,
//                 }}
//                 onChange={handleTableChange}
//             />
//         </div>
//         </div>
//     );
// };
