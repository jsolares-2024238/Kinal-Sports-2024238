import { create } from "zustand";
import { getFields,
         createField as createFieldRequest,
        updateField as updateFieldRequest,
        deleteField as deleteFieldRequest
     } from "../../../shared/apis/admin";

export const useFieldsStore = create((set, get) =>({
    fields: [],
    loading: false,
    error: null,

    getFields: async () =>{
        try{
            set({loading: true, error: null})
            const response = await getFields();
            const fields = response.data?.data ?? response.data ?? [];

            set({
                fields,
                loading: false,
            })
        }catch(err){
            set({
                error: err.response?.data?.message || "Error al listar canchas",
                loading: false,
            })
        }
    },

    createField: async (formData) => {
        try {
            set({loading: true, error: null})

            const response = await createFieldRequest(formData);
            const newField = response.data?.data ?? response.data;

            set({
                fields: newField ? [newField, ...get().fields] : get().fields,
                loading: false
            })
        } catch (err) {
            set({
                loading:false,
                error: err.response?.data?.message || "Error al crear la cancha"
            })
        }
    },
updateField: async (id, formData) => {
        try{
            set({ loading: true, error: null});
            const response = await updateFieldRequest(id, formData);
            const updatedField = response.data?.data ?? response.data;
            set({
                fields: get().fields.map((field) =>
                    field._id === id ? updatedField : field,
                ),
                loading: false,
            })
        }catch (err) {
            set({
                loading: false,
                error: err.response?.data?.message || "Error al actualizar la cancha",
            })
        }
    },
 
    deleteField: async (id) =>{
        try{
            set({loading: true, error: null});
            await deleteFieldRequest(id);
            set({
                fields: get().fields.filter((field) => field._id !== id),
                loading: false,
            })
        }catch(err){
            set({
                loading: false,
                error: err.response?.data?.message || "Error al eliminar la cancha",
            })
        }
    }
}))