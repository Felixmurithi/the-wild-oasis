import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// this component replicates is a forn hook that automates many of the html attributes of forms such as submiting, validation disabliong fields, events and in react allows for the direct handling of fields withiut creating states and controlling each field to check for changes as controlled components

// why cabinToEdit != {}, why is it an error

// creating and editing cabin form
// 1. this component receves a cabintoEdit object and  the close function from Modal because the component is opened by modal
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  //2, checks wether its an edit sesssion by destrring the id- if its being edited it will come from the cabin row data
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  //3. editing is made possible by the fact that onclicking edit cabin, the cabin to edit Id is passed and on doing that the form hook is able to get the values of the currently diplsyaed cabin and load them into the form fields-execpt imagess

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  //use form hook to get values without using controlled component
  //1. register inputs, resetthe form, get the
  //2. validate- many options (some boilerplate check below) and add error message incase the validate fails
  // 3 submit handling at handleSubmit which returns tow functions <Form onSubmit={handleSubmit(onSubmit, onError)}>
  const { errors } = formState;
  // 4. receive the normal event hanlder such as onChange, onBlur, onClick

  const { isEditing, editCabin } = useEditCabin();
  const { isCreating, createCabin } = useCreateCabin();

  //creating and editing cabin form
  //4. diabled form entries when creating a new one or editing while react query is doing its work
  const isWorking = isCreating || isEditing;

  //5. submit data depending one the wther its an edit session or not
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // data names have to be indentical names to the row created in supabase
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

    // console.log(data);
  }
  function onError(errors) {
    // console.log(errors); error monitoring service ??
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="Maximum Capacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be atleast one" },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "price has to be greater than 0" },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            //use form hook to get values without using controlled component
            //5. boiler plate of validate here.
            // there is a bug here- sometimes teh validation is off the rails and how does or work isnt there a better option
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          // type="file"- see at the styled component
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
