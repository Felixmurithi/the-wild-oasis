import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  //get all cabins
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(" Cabins could not be found");
  }

  return cabins;
}

//1. Receives the newcabin data/ cabin to edit data from the form togetether with the ID if it exists that is it being edited.

export async function createEditCabin(newcabin, id) {
  //2. To process the image it Checks wether the cabin has an image starting with supabaseUrl, a newcabin will resultin hasImagepath being false
  const hasImagePath = newcabin.image?.startsWith?.(supabaseUrl);

  // in the case of a new image upload the cabin image.name is created, if its not new the image part will be replaced with undefined (but wont be used in any case). the replace all ("/", "") is a standard way of ensuring that the name passed doesnt create errors because "/" would indicatete a filepath
  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // if its not a new newcabin the image path is created by attaching the supabase url and imageName
  const imagePath = hasImagePath
    ? newcabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //3. To process the create cabin or edit cabin, a base query variable for referencing the cabins table in supabase is created
  let query = supabase.from("cabins");

  // the id passed is used to determine whether to insert or update
  // create (insert cabin)-if no id- its created as a new row on the cabin table, and the image (newcabin.image) as imagePath
  if (!id) query = query.insert([{ ...newcabin, image: imagePath }]);

  //edit-if id exists (update cabin at id position), the data at that id popsition in the cabins table is updated using the newcabi  and imagePath passed which is still the same if there was no new upload and differenet if a new image was uploaded.
  if (id) query = query.update({ ...newcabin, image: imagePath }).eq("id", id);

  // the edit or create is done by async awaiting the query with the insert or update part added
  const { data, error } = await query.select().single(); // whta is this single ??

  if (error) throw new Error("Cabin could not be created");

  //4. image upload if cabin cabin table insertion or update was succesful check wether the image:imagePath exists in the table and if its exits return
  if (hasImagePath) return data;

  // if not  upload the image to supbase storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newcabin.image);

  // 5. if there was a storage error revert the old image name- anotehr way of doing this would be referencing the images stored or only uploading the image if the storage was sucssefully
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(" cabin couldnt be created");
  }

  return data;
}

export async function deleteCabin(id) {
  //delet cabin at ID position
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
}
