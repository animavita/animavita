const mergeRuleInResolvers = (rule, resolvers, exceptions) => {
  /* Removes resolvers that are in exceptions and apply the rule to all others */
  let newResolvers = resolvers
    .filter(resolver => !exceptions.includes(resolver))
    .map(resolver => ({ [`${resolver}`]: rule }));

  /* Assign in only one object */
  newResolvers = Object.assign({}, ...newResolvers);
  return newResolvers;
};

/* Apply middleware rule in all resolvers of the 'type' received  */
export const applyMiddlewareRule = (rule, type, exceptions = []) => {
  /* Transform resolvers queries in array */
  let resolvers = type instanceof Object ? Object.keys(type) : [];

  resolvers = mergeRuleInResolvers(rule, resolvers, exceptions);
  return resolvers;
};
