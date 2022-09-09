export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Score",
    accessor: "score",

    getProps: (state, rowInfo, column) => ({
      style: {
        backgroundColor:
          rowInfo.row.score <= 70
            ? "red"
            : rowInfo.row.score >= 90
            ? "green"
            : "",
      },
    }),
  },
  {
    Header: "DurationInDays",
    accessor: "durationInDays",
  },
  {
    Header: "BugsCount",
    accessor: "bugsCount",
  },
  {
    Header: "madeDadeline",
    accessor: (d) => d.madeDadeline.toString(),
  },
];
