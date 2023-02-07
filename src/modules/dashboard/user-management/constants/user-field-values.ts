export const UserFieldUpdateValues = {
  id: "",
  name: "",
  email: "",
  roleId: "",
};

export const UserFieldCreateValues = {
  name: "",
  email: "",
  roleId: "",
  password: "",
};

export type UserFieldUpdateType = typeof UserFieldUpdateValues;
export type UserFieldCreateType = typeof UserFieldCreateValues;
