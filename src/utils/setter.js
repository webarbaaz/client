export const onInputChange = (e, setter) => {
  const { value, name } = e.target;
  setter((ps) => ({ ...ps, [name]: value }))
}

export const onNestedInputChange = (e,setter) => {
  const { value, name } = e.target;
  const [target, index, targetName] = name.split('-'); // Extract target and index from input name
  setter(prevCourse => ({
    ...prevCourse,
    [target]: [
      ...prevCourse[target].slice(0, index), // Copy elements before the changed one
      { ...prevCourse[target][index], [targetName]: value }, // Update the changed element
      ...prevCourse[target].slice(parseInt(index, 10) + 1) // Copy elements after the changed one
    ]
  }));
};
