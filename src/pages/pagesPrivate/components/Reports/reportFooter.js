export default function reportFooter(currentPage, pageCount) {
  return [
    {
      text: `${currentPage} / ${pageCount}`,
      alignment: 'right',
      fontSize: 9,
      margin: [0, 10, 20, 0],
    },
  ];
}
