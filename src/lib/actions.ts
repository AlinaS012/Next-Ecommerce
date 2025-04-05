"use server";


export const updateUser = async (formData: FormData) => {

  const id = formData.get("id") as string;
  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  console.log(username)

  try {
    // Code to update user

    // console.log(response)
  } catch (err) {
    console.log(err);
  }
};
