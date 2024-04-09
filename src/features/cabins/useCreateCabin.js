import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

//mutation hook need when editing contents handled by react query

//the createCabin functiion from useCreateCabin is returned by the mutate function received from  useMutation hook- this hook needs an object which includes { muationFn async function that handles mutations- craeteEditCabin, onSUcesss: function, onError: function }
// the createEditCabin function from services/apiCabins.js
// the object also takes a function on sucess the handles actions after the data is received succesfully
// data names have to be indentical names to the row created in supabase
// when calling the mutate functions ie Create Cabin, on Sucsess function can be passed again- what about on Error??

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isCreating, createCabin };
}
