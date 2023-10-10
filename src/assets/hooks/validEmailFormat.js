export default function validEmailFormat(email) {
  const emailRegex =
    /(?<user>\w+[!#$%&'*+\-/=?^_`{|]{0,1}\w+)@(?<domain>[a-zA-Z]+[-.]?[a-zA-Z0-9]+)\.(?<top>[a-zA-Z]{2,3})/g;
  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
};