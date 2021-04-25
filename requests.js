const fetchPuzzle = async () => {
  const response = await fetch('//puzzle.mead.io/puzzle?wordCount=2')
  if (response.status === 200) {
    const data = await response.json()
    return data.puzzle
  } else {
    throw new Error('unable to fetch the data')
  }
};

