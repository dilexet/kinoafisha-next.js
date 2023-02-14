export function convertStringAvatar(name: string) {
  const nameArray = name.split(" ");
  let avatarString = "U";
  if (nameArray.length === 1) {
    avatarString = nameArray[0][0];
  } else if (nameArray.length === 2) {
    avatarString = `${nameArray[0][0]}${nameArray[1][0]}`;
  }

  return avatarString.toUpperCase();
}