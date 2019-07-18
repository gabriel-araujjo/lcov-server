module.exports.parseCoverage = function parseCoverage(history, branch) {
  // if no branch don't worry about parsing for a particular one

  const data = [[], []];
  history.forEach(function(history) {
    const { git, source_files } = history;
    if(branch ? (branch === (git.branch || git.git_branch)) : true) {
      let Total = 0;
      let TotalLines = 0;

      source_files.forEach((file) => {
        const {lines={hit: 0, found: 0}} = file;

        if(lines) {
          TotalLines += lines.hit;
          Total += lines.found;
        }
      });

      data[0].push(Total);
      data[1].push(TotalLines);
    }
  });

  // If there is only one data point
  // add another that is the same value to make a line
  if(data[0].length == 1) {
      data[0].push(data[0][0]);
      data[1].push(data[1][0]);
  }

  return data;
};
