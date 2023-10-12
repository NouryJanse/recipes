import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteContact } from "~/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  // const formData = await request.formData();
  // const updates = Object.fromEntries(formData);
  await deleteContact(params.contactId);
  return redirect(`/`);
};
