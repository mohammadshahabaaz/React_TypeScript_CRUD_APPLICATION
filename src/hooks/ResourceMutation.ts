// useDeleteResource.ts
import { useState, useCallback } from 'react';
import { addNewResource, deleteResources,editResource,IResourcPayload,IDeleteResourcePayload } from '../Utils/apiUtils';
import { IResource } from '../models/IResourceModel';

interface UseDeleteResourceResult {
  isLoading: boolean;
  error: Error | null;
  deleteResourceById: (id: number) => Promise<void>;
  // addResourceFn: (id: number) => Promise<void>
}
interface UseAddResourceResult {
  isLoading: boolean;
  error: Error | null;
  addResource: (resource: Partial<IResource>) => Promise<void>;
}

interface UseEditResourceResult {
  isLoading: boolean;
  error: Error | null;
  editNewResource: (id: number, resource: Partial<IResource>) => Promise<void>;
}

export function useDeleteResource(onSuccess: () => void): UseDeleteResourceResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteResourceById = useCallback(async (id: number): Promise<void> => {
    setIsLoading(true);
    console.log(`Attempting to delete resource with id: ${id}`,id);
    try {
      await deleteResources(id);
      console.log(`Successfully deleted resource with id: ${id}`,id);
      onSuccess();
    } catch (error) {
      setError(error as Error);
      console.error(`Error deleting resource with id: ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  return { isLoading, error, deleteResourceById };
}
export function useAddResource(onSuccess: () => void): UseAddResourceResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addResource = useCallback(async (resource: Partial<IResource>): Promise<void> => {
    setIsLoading(true);
    try {
      await addNewResource({resource});
      console.log(`Successfully added resource`, resource);
      onSuccess();
    } catch (error) {
      setError(error as Error);
      console.error(`Error adding resource:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  return { isLoading, error, addResource };
}




export function useEditResource(onSuccess: () => void): UseEditResourceResult {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const editNewResource = useCallback(async (id: number, resource: Partial<IResource>): Promise<void> => {
    setIsLoading(true);
    try {
      
      await editResource(resource);
      console.log(`Successfully updated resource with id: ${id}`, resource);
      onSuccess();
    } catch (error) {
      setError(error as Error);
      console.error(`Error updating resource with id: ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  return { isLoading, error, editNewResource };
}