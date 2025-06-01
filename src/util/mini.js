
export const titleMap = {
    kleague: "K리그",
    epl: "EPL",
    bundesliga: "분데스리가",
    laliga: "라리가",
    free: "자유게시판"
};

export const reverseTitleMap = Object.fromEntries(
  Object.entries(titleMap).map(([key, value]) => [value, key])
);
