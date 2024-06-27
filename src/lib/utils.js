export const isSubscriptionExpired = (dateString) => {
  const givenDate = new Date(dateString);
  const currentDate = new Date();

  return givenDate < currentDate;
};
