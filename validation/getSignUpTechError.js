module.exports = function getSignUpTechError(techInterestedIn) {
  if (techInterestedIn !== 3) {
    return "Please select 3 technologies.";
  }
  return "";
};
