import { IResource } from "../models/IResourceModel";
import { filter,map,random } from "lodash";

export interface IDeleteResourcePayload{
    id:number;
}

  export interface IResourcPayload {
    resource: Partial<IResource>;
  }
  
  
  

const mockResourceData = new Array(10).fill(0).map((v,i)=>({
    id:i,
    title: `Post ${i}`
}))

let data = mockResourceData;

export const fetchResources = async ():Promise<IResource[]> =>{
    await  new Promise((resolve) =>setTimeout(resolve,1000));
    return data ?? [];
}


export const deleteResources = async (id: number): Promise<void> => {
    console.log(`Mock delete for id: ${id}`,id);
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulating async operation
    data = data.filter(item => item.id !== id);
    console.log(`Post deletion, remaining items: `, data.length);
};


export const editResource = async (resource: Partial<IResource>): Promise<void> => {
  console.log(`Attempting to edit resource with id: ${resource.id}`, resource);
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
  const index = data.findIndex(item => item.id === resource.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...resource };
    console.log(`Successfully updated resource with id: ${resource.id}`);
  } else {
    throw new Error(`Resource with id: ${resource.id} not found`);
  }
};


  
  export const addNewResource = async ({
  resource,
}: IResourcPayload): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const maxId = data.reduce((max, item) => Math.max(max, item.id), 0);
  const newId = maxId + 1;

  data.push({
    ...resource,
    id: newId,
    title: resource.title || "Default Title", // Provide a default title if undefined
    
  });

  console.log("utils Add New ",data);
};




