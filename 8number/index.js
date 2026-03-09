function check() {
  const nums = [];
  for (let i = 1; i <= 8; i++) {
    const val = parseInt(document.getElementById(`box${i}`).value);
    if (isNaN(val) || val < 1 || val > 8) {
      alert("Please fill all boxes with numbers from 1 to 8.");
      return;
    }
    nums[i] = val;
  }

  // Check for uniqueness
  const uniqueNums = new Set(nums.slice(1));
  if (uniqueNums.size !== 8) {
    alert("Each number from 1 to 8 must be used exactly once.");
    return;
  }

  // Adjacency map (1-indexed)
  const adj = {
    1: [2, 3, 4],
    2: [1, 3, 5, 6],
    3: [1, 2, 4, 5, 6, 7],
    4: [1, 3, 6, 7],
    5: [2, 3, 6, 8],
    6: [2, 3, 4, 5, 7, 8],
    7: [3, 4, 6, 8],
    8: [5, 6, 7],
  };

  for (let i = 1; i <= 8; i++) {
    const currentVal = nums[i];
    const neighbors = adj[i];
    for (const neighborIdx of neighbors) {
      const neighborVal = nums[neighborIdx];
      if (Math.abs(currentVal - neighborVal) === 1) {
        alert(`Rule Violated! Box ${i} (value ${currentVal}) and Box ${neighborIdx} (value ${neighborVal}) are adjacent and consecutive.`);
        return;
      }
    }
  }

  alert("Congratulations! You solved the puzzle!");
}
